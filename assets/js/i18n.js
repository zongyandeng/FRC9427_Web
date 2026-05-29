// i18n.js - FRC 9427 官方網站全新多國語言 (i18n) 翻譯引擎
// 基於您設定之 Fallback 安全機制、Console 紅字開發警告防呆機制實作。

// 支援的語系與語系快取
const translations = {
  zh: null, // 繁體中文（直接還原 HTML 原生中文）
  en: null  // 英文
};

let currentLang = localStorage.getItem('preferred-lang') || 'zh';

// 載入語系 JSON 檔
async function loadLanguage(lang) {
  if (lang === 'zh') return {}; // 中文直接使用 HTML 內建預設文字，不需額外發送 Fetch 請求
  if (translations[lang]) return translations[lang];
  
  try {
    const response = await fetch(`./locales/${lang}.json`);
    if (!response.ok) {
      throw new Error(`HTTP 錯誤! 狀態碼: ${response.status}`);
    }
    translations[lang] = await response.json();
    return translations[lang];
  } catch (error) {
    console.error(`[i18n] 無法載入語系檔: locales/${lang}.json`, error);
    return {};
  }
}

// 執行全網頁翻譯
async function translatePage(lang) {
  currentLang = lang;
  localStorage.setItem('preferred-lang', lang);
  
  const dict = await loadLanguage(lang);
  const elements = document.querySelectorAll('[data-i18n]');
  
  elements.forEach(el => {
    const key = el.getAttribute('data-i18n');
    const isInput = el.tagName === 'INPUT' || el.tagName === 'TEXTAREA';
    
    // 1. 【安全備份機制】先備份 HTML 原本內建的繁中預設文字/Placeholder，作為最強 Fallback 備援
    if (isInput) {
      if (!el.dataset.defaultPlaceholder) {
        el.dataset.defaultPlaceholder = el.getAttribute('placeholder') || '';
      }
    } else {
      if (!el.dataset.defaultText) {
        el.dataset.defaultText = el.textContent.trim();
      }
    }
    
    // 2. 切回中文 (zh) 時，直接無條件還原 HTML 原生中文，保證 0 錯誤、0 延遲
    if (lang === 'zh') {
      if (isInput) {
        el.setAttribute('placeholder', el.dataset.defaultPlaceholder);
      } else {
        el.textContent = el.dataset.defaultText;
      }
      return;
    }
    
    // 3. 從語系 JSON 當中取得對應翻譯值（支援 "nav.home" 遞迴巢狀 Key）
    const translatedText = getNestedValue(dict, key);
    
    if (translatedText !== undefined && translatedText !== null) {
      if (isInput) {
        el.setAttribute('placeholder', translatedText);
      } else {
        el.textContent = translatedText;
      }
    } else {
      // 4. 【最強 Fallback 防呆】如果 en.json 漏掉 Key，保留 HTML 原本中文，絕不變空白或消失
      if (isInput) {
        el.setAttribute('placeholder', el.dataset.defaultPlaceholder);
      } else {
        el.textContent = el.dataset.defaultText;
      }
      
      // 5. 【醒目紅字 Console 開發警告】提醒開發者補上對應的語系 Key
      console.warn(
        `%c[i18n Warning] 語系檔 [locales/${lang}.json] 缺少 Key: "${key}"，已自動還原為預設文字: "${isInput ? el.dataset.defaultPlaceholder : el.dataset.defaultText}"`, 
        "color: #ff3333; font-weight: bold; background: #ffe6e6; padding: 3px 8px; border-radius: 4px; border: 1px solid #ffcccc; font-family: monospace;"
      );
    }
  });
  
  // 更新網頁 HTML 根標籤的 lang 屬性，極大有利於瀏覽器適配與 SEO 搜尋引擎最佳化
  document.documentElement.lang = lang === 'zh' ? 'zh-Hant' : 'en';
  
  // 更新翻譯按鈕本身的文字顯示
  updateLangButtonText(lang);
}

// 輔助函式：讀取巢狀 JSON 物件 (例如將 "nav.home" 解析為 dict.nav.home)
function getNestedValue(obj, path) {
  if (!obj || !path) return undefined;
  return path.split('.').reduce((acc, part) => acc && acc[part], obj);
}

// 更新切換語系按鈕的文字狀態
function updateLangButtonText(lang) {
  const langBtn = document.getElementById('lang-btn');
  if (langBtn) {
    // 中文介面時按鈕顯示 English，英文介面時按鈕顯示 繁體中文
    langBtn.textContent = lang === 'zh' ? 'English' : '繁體中文';
  }
}

// 初始化與事件監聽
document.addEventListener('DOMContentLoaded', async () => {
  // 首次翻譯初始化
  await translatePage(currentLang);
  
  // 綁定切換語言按鈕點擊事件 (Header 動態注入後會自動適用)
  // 使用事件代理 (Event Delegation) 確保動態注入的按鈕能 100% 綁定事件
  document.addEventListener('click', (e) => {
    const langBtn = e.target.closest('#lang-btn');
    if (langBtn) {
      const nextLang = currentLang === 'zh' ? 'en' : 'zh';
      translatePage(nextLang);
      
      // 觸發自定義 'languagechange' 事件以重繪如 news.html 等動態內容
      window.dispatchEvent(new Event('languagechange'));
    }
  });
});
