document.addEventListener('DOMContentLoaded', () => {
  // =========================================================================
  // 【動態組件注入】動態生成並嵌入 Header 與 Footer (DRY 軟體設計原則實踐)
  // =========================================================================
  injectHeaderAndFooter();

  // =========================================================================
  // 【滾動視覺特效與導航列樣式切換】
  // 當網頁向下捲動超過 50px 時，為 Header 加上 .scrolled 類別，啟用毛玻璃與陰影深色背景
  // =========================================================================
  const header = document.querySelector('header');
  
  const handleScroll = () => {
    if (header) {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }
  };

  window.addEventListener('scroll', handleScroll);
  handleScroll(); // 網頁重新加載時立即執行一次，以防頁面停留在已捲動的位置

  // =========================================================================
  // 【行動版導航抽屜選單 (Hamburger Drawer)】
  // 控制行動版三條線按鈕的點擊旋轉展開，以及行動版導航面板的拉出與收回
  // =========================================================================
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      // 切換展開狀態 Class
      hamburger.classList.toggle('open');
      navMenu.classList.toggle('open');
    });

    // 點擊導航連結後自動收起行動版選單，防止阻擋使用者視線
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navMenu.classList.remove('open');
      });
    });
  }

  // =========================================================================
  // 【進入畫面卷動揭示動畫 (Entrance Scroll Reveal Animations)】
  // 基於高性能原生 IntersectionObserver 監聽元素進入視窗 15% 時，加上 .active 觸發 CSS 漸顯動畫
  // =========================================================================
  const revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window && revealElements.length > 0) {
    const observerOptions = {
      root: null, // 以視窗為邊界 (viewport)
      threshold: 0.15, // 元素露出 15% 時觸發
      rootMargin: '0px 0px -50px 0px' // 底部預留 50px 偏移量以獲得更平滑的視覺觀感
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target); // 動畫完成後即解除監聽，節省系統資源
        }
      });
    }, observerOptions);

    revealElements.forEach(element => {
      revealObserver.observe(element);
    });
  } else {
    // 針對不支援 IntersectionObserver 的古老瀏覽器之退回防呆安全機制：直接顯示所有元素
    revealElements.forEach(element => {
      element.classList.add('active');
    });
  }

  // =========================================================================
  // 【學習資源分類交互過濾器 (Resource Categories Interactive Filter)】
  // 點選 resources.html 中的分類 Tab，動態顯示/隱藏對應種類的卡片項目
  // =========================================================================
  const tabButtons = document.querySelectorAll('.tab-btn');
  const resourceItems = document.querySelectorAll('.resource-item');

  if (tabButtons.length > 0 && resourceItems.length > 0) {
    tabButtons.forEach(button => {
      button.addEventListener('click', () => {
        // 切換 Active 樣式
        tabButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const selectedCategory = button.getAttribute('data-filter');

        resourceItems.forEach(item => {
          const itemCategory = item.getAttribute('data-category');

          // 如果選取 'all' 或分類相符，則顯示；否則隱藏
          if (selectedCategory === 'all' || itemCategory === selectedCategory) {
            item.classList.remove('hidden');
          } else {
            item.classList.add('hidden');
          }
        });
      });
    });
  }

  // =========================================================================
  // 【聯絡表單安全校驗與郵件發送控制器 (Secure Contact Form Validation & Modal)】
  // 進行安全校驗，並整合 Web3Forms 郵件提交服務，提供流暢的防呆提交與自定義 Modal 提示體驗
  // =========================================================================
  const contactForm = document.getElementById('contactForm');
  const successModal = document.getElementById('successModal');
  const closeModalBtn = document.getElementById('closeModalBtn');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault(); // 阻斷瀏覽器預設跳轉行為，改以 AJAX/Fetch 非同步安全提交
      
      let isFormValid = true;

      // 1. 驗證姓名欄位 (Name Validation)
      const nameInput = document.getElementById('contactName');
      const nameError = document.getElementById('nameError');
      if (nameInput) {
        if (nameInput.value.trim().length < 2) {
          showError(nameInput, nameError);
          isFormValid = false;
        } else {
          hideError(nameInput, nameError);
        }
      }

      // 2. 驗證電子信箱欄位 (Email Regex Validation)
      const emailInput = document.getElementById('contactEmail');
      const emailError = document.getElementById('emailError');
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (emailInput) {
        if (!emailRegex.test(emailInput.value.trim())) {
          showError(emailInput, emailError);
          isFormValid = false;
        } else {
          hideError(emailInput, emailError);
        }
      }

      // 3. 驗證留言訊息內容 (Message Content Validation)
      const messageInput = document.getElementById('contactMessage');
      const messageError = document.getElementById('messageError');
      if (messageInput) {
        if (messageInput.value.trim().length < 10) {
          showError(messageInput, messageError);
          isFormValid = false;
        } else {
          hideError(messageInput, messageError);
        }
      }

      if (isFormValid) {
        // 4. 讀取 Web3Forms Access Key
        const accessKeyInput = contactForm.querySelector('input[name="access_key"]');
        const hasAccessKey = accessKeyInput && accessKeyInput.value && accessKeyInput.value.trim() !== 'YOUR_ACCESS_KEY_HERE';

        if (hasAccessKey) {
          const isEn = document.documentElement.lang === 'en';
          
          // 顯示提交中狀態 (提升使用者提交時的即時 UI 反饋體驗)
          const submitBtn = contactForm.querySelector('button[type="submit"]');
          const submitBtnSpan = submitBtn.querySelector('span');
          const originalText = submitBtnSpan ? submitBtnSpan.innerText : (isEn ? 'Secure Submit Message' : '安全提交訊息');
          
          if (submitBtn) {
            submitBtn.disabled = true;
            if (submitBtnSpan) submitBtnSpan.innerText = isEn ? 'Sending message...' : '訊息傳送中...';
            submitBtn.style.opacity = '0.7';
            submitBtn.style.cursor = 'not-allowed';
          }

          const formData = new FormData(contactForm);
          // 加入額外的預設欄位，供 Web3Forms 發送的信件格式美化與主旨標記
          formData.append('subject', isEn ? 'New Contact Message - FRC 9427 Web' : '新聯絡訊息 - FRC 9427 官方網站');
          formData.append('from_name', nameInput.value.trim());

          // 發送非同步 POST 請求到 Web3Forms 端點
          fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            body: formData
          })
          .then(response => response.json())
          .then(data => {
            // 還原提交按鈕原本的可點擊狀態與文字
            if (submitBtn) {
              submitBtn.disabled = false;
              if (submitBtnSpan) submitBtnSpan.innerText = originalText;
              submitBtn.style.opacity = '';
              submitBtn.style.cursor = '';
            }

            if (data.success) {
              // 成功發送：打開成功的毛玻璃彈出視窗並清空重置表單
              if (successModal) {
                successModal.classList.add('active');
              }
              contactForm.reset();
            } else {
              alert(isEn ? ('Failed to send message: ' + (data.message || 'Unknown error')) : ('發送郵件失敗：' + (data.message || '未知錯誤')));
            }
          })
          .catch(error => {
            // 例外處理：還原按鈕狀態並在 console 印出錯誤
            if (submitBtn) {
              submitBtn.disabled = false;
              if (submitBtnSpan) submitBtnSpan.innerText = originalText;
              submitBtn.style.opacity = '';
              submitBtn.style.cursor = '';
            }
            console.error('Error sending message via Web3Forms:', error);
            alert(isEn 
              ? 'An error occurred while sending your message. Please try again later or email us directly at slshfrc@slsh.ntpc.edu.tw.' 
              : '訊息傳送時發生錯誤，請稍後再試，或直接發送郵件至 slshfrc@slsh.ntpc.edu.tw。');
          });
        } else {
          // 模擬模式 (若未設定 Access Key，則在 console 輸出驗證成功，並彈出模擬成功視窗)
          console.log('Form validated successfully (Simulation Mode).'); 

          // 顯示模擬成功的 Modal 彈窗
          if (successModal) {
            successModal.classList.add('active');
          }

          // 重設表單
          contactForm.reset();
        }
      }
    });
  }

  // 關閉成功彈出視窗的控制邏輯
  if (closeModalBtn && successModal) {
    // 點選「確認關閉」按鈕
    closeModalBtn.addEventListener('click', () => {
      successModal.classList.remove('active');
    });

    // 點選 Modal 背景灰色毛玻璃遮罩區域
    successModal.addEventListener('click', (e) => {
      if (e.target === successModal) {
        successModal.classList.remove('active');
      }
    });
  }

  // 驗證錯誤狀態提示控制輔助函數
  function showError(inputElement, errorElement) {
    inputElement.classList.add('invalid');
    if (errorElement) {
      errorElement.style.display = 'block';
    }
  }

  function hideError(inputElement, errorElement) {
    inputElement.classList.remove('invalid');
    if (errorElement) {
      errorElement.style.display = 'none';
    }
  }

  // =========================================================================
  // 【全網頁靜態 Header / Footer 統一注入引擎 (injectHeaderAndFooter)】
  // 動態尋找網頁中的佔位標籤，並將導覽列與頁尾自動渲染注入，大幅降低 HTML 重複代碼，利於全局修改
  // =========================================================================
  function injectHeaderAndFooter() {
    const headerPlaceholder = document.getElementById('header-placeholder');
    const footerPlaceholder = document.getElementById('footer-placeholder');

    if (headerPlaceholder) {
      // 讀取當前 HTML 檔案在 placeholder 設定的 active 頁面屬性 (用以高亮當前導航標籤)
      const activePage = headerPlaceholder.getAttribute('data-active') || 'home';
      
      const isHome = activePage === 'home' ? 'active' : '';
      const isNews = activePage === 'news' ? 'active' : '';
      const isResources = activePage === 'resources' ? 'active' : '';
      const isRobots = activePage === 'robots' ? 'active' : '';
      const isSponsors = activePage === 'sponsors' ? 'active' : '';
      const isContact = activePage === 'contact' ? 'active' : '';

      const headerHtml = `
<header id="mainHeader">
  <div class="nav-container">
    <div class="logo-wrapper">
      <a href="index.html" class="logo" id="logoLink">
        <img src="assets/images/logo.png" alt="FRC 9427 iDeer Logo">
        <div class="logo-text">FRC<span>9427</span></div>
      </a>
      <button id="lang-btn" class="lang-switch-btn" aria-label="Switch Language">English</button>
    </div>

    <!-- 行動版選單三條線按鈕 -->
    <button class="hamburger" id="navToggle" aria-label="切換導覽選單">
      <span></span>
      <span></span>
      <span></span>
    </button>

    <!-- 電腦桌機端 / 行動端導覽選單清單 -->
    <nav class="nav-menu" id="navMenu">
      <a href="index.html" class="nav-link ${isHome}" id="navHome" data-i18n="nav.home">首頁</a>
      <a href="news.html" class="nav-link ${isNews}" id="navNews" data-i18n="nav.news">歷屆新聞 / 獎項</a>
      <a href="resources.html" class="nav-link ${isResources}" id="navResources" data-i18n="nav.resources">新手資源</a>
      <a href="robots.html" class="nav-link ${isRobots}" id="navRobots" data-i18n="nav.robots">歷屆機器</a>
      <a href="sponsors.html" class="nav-link ${isSponsors}" id="navSponsors" data-i18n="nav.sponsors">贊助商專區</a>
      <a href="contact.html" class="btn-nav ${isContact}" id="navContact" data-i18n="nav.contact">聯繫我們</a>
    </nav>
  </div>
</header>
      `;
      headerPlaceholder.outerHTML = headerHtml;
    }

    if (footerPlaceholder) {
      const footerHtml = `
<footer id="mainFooter">
  <div class="footer-container">
    <div class="footer-brand">
      <div class="footer-logo">
        <img src="assets/images/logo.png" alt="FRC 9427 iDeer Logo">
        <div class="logo-text">FRC<span>9427</span></div>
      </div>
      <p class="footer-desc" data-i18n="footer.desc">新北市立樹林高中機器人隊官方網站。激發工程創意，探索機器人技術，塑造未來領袖。</p>
    </div>

    <div class="footer-links-col">
      <h4 data-i18n="footer.quickLinks">快速連結</h4>
      <ul class="footer-links">
        <li><a href="index.html" data-i18n="nav.home">首頁</a></li>
        <li><a href="news.html" data-i18n="nav.news">歷屆新聞 / 獎項</a></li>
        <li><a href="resources.html" data-i18n="footer.resourcesLib">新手資源庫</a></li>
        <li><a href="robots.html" data-i18n="footer.robotsGallery">歷屆競賽機器</a></li>
        <li><a href="sponsors.html" data-i18n="footer.sponsorsCollab">贊助合作</a></li>
      </ul>
    </div>

    <div class="footer-links-col">
      <h4 data-i18n="footer.contactTitle">聯絡資訊</h4>
      <ul class="footer-links">
        <li><span data-i18n="footer.email">信箱:</span> <a href="mailto:slshfrc@slsh.ntpc.edu.tw">slshfrc@slsh.ntpc.edu.tw</a></li>
        <li data-i18n="footer.address">地址: 新北市樹林區大安路216號</li>
        <li data-i18n="footer.school">學校: 新北市立樹林高中</li>
      </ul>
    </div>
  </div>

  <div class="footer-copyright">
    <p>&copy; 2026 FRC 9427 iDeer. All Rights Reserved. </p>
    <p>Designed with <span>&hearts;</span> for STEM Education</p>
  </div>
</footer>
      `;
      footerPlaceholder.outerHTML = footerHtml;
    }
  }
});
