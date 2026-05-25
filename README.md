# FRC 9427 iDeer 團隊官方網站 - 學生維護與部署手冊 🦌⚙️

歡迎來到 **FRC 9427 iDeer**（新北市立樹林高中機器人隊）的官方網站專案！
本專案採用無編譯負擔的 **純 HTML5、CSS3（Vanilla CSS）與原生 JavaScript (Vanilla JS)** 打造。加載速度極快、架構直觀，且具備極佳的網頁安全性，非常便於未來的學弟妹們傳承、維護與擴充。

---

## 📂 專案檔案結構目錄

```text
FRC9427_Web/
├── .gitignore                      # Git 排除系統垃圾、本機快取與敏感設定
├── README.md                       # 本維護手冊
├── index.html                      # 官方首頁 (團隊定位、核心精神、探索版塊導覽)
├── news.html                       # 歷屆新聞 & 獎項 (榮譽戰績、大事記時間軸)
├── resources.html                  # 新手資源庫 (CAD、程式、電控、機械學習卡片)
├── robots.html                     # 歷屆競賽機器人 (機器規格諸元、策略、機構拆解)
├── sponsors.html                   # 贊助商專區 (分級贊助名單、贊助 Perks、合作 CTA)
├── contact.html                    # 聯繫我們 (社群卡片連結、安全的客戶端表單、彈出式 Modal)
└── assets/
    ├── css/
    │   └── style.css               # 核心樣式表 (設計系統 Tokens、動畫、自適應響應配置)
    └── js/
        └── main.js                 # 全局腳本 (響應式選單、滾動進入動畫、資源動態篩選、安全表單校驗)
```

---

## 🎨 視覺主題色與樣式自訂

我們為 iDeer 打造了與隊服一致的 **「Cyber-Navy & Yellow」** 黃藍 6:4 科技發光風格。如果未來隊服的黃色或藍色比例有所更動，只需要調整 `assets/css/style.css` 最上方的 CSS 變數（Variables）即可瞬間改變全站風格！

```css
/* 請於 assets/css/style.css 的 :root 區塊內進行修改 */
:root {
  --bg-dark: #ffd600;               /* 全局 60% 科技黃色畫布 */
  --bg-dark-navy: #050c1e;          /* 40% 沉穩皇家深藍色主架構 */
  --primary-yellow: #ffd600;        /* 隊服 signature 黃色 (金黃色) */
  --primary-yellow-glow: rgba(255, 214, 0, 0.45); /* 黃色發光光暈 */
  --accent-royal: #1565c0;          /* 皇家藍 (隊服輔助色) */
  --accent-cyber: #00e5ff;          /* 科技霓虹電光藍 (細節發光點綴) */
}
```

---

## 📝 內容更新指引 (學生如何新增內容)

### 1. 如何新增「新聞或大事記」(`news.html`)
打開 `news.html`，在 `class="timeline"` 區塊內部，複製一組 `.timeline-item`。
- **注意交替佈局**：奇數個請使用 `timeline-item-left`，偶數個請使用 `timeline-item-right`。
```html
<!-- 複製並修改以下區塊即可新增一個時間軸節點 -->
<div class="timeline-item timeline-item-left reveal">
  <div class="timeline-dot"></div>
  <div class="timeline-content">
    <div class="timeline-date">西元 202X 年 X 月</div>
    <h3>大事記標題</h3>
    <p>在這裡寫下具體的活動內容、得獎細節或新聞報導摘要...</p>
  </div>
</div>
```

### 2. 如何新增「新手學習資源」(`resources.html`)
打開 `resources.html`，在 `class="resources-grid"` 區塊內新增一個 `.resource-item`。
- **篩選類別標記**：請務必在 `data-category` 屬性填入對應的分類（`programming`、`cad`、`electrical`、`mechanical`、`rules`），如此一來按上方篩選按鈕時，原生 JavaScript 才會正確顯示/隱藏該卡片。
```html
<div class="resource-item reveal" data-category="程式分類或CAD等">
  <div class="glass-card resource-card">
    <span class="resource-category">小標題 / 例如：Onshape</span>
    <h3 class="feature-title">學習手冊名稱</h3>
    <p class="feature-desc">在此處填寫該學習手冊的簡短介紹或自學重點摘要，吸引新社員點選閱讀。</p>
    <div class="resource-meta">
      <span>難易度: 適合新手</span>
      <span class="glow-text-yellow">PDF 檔案 / 影片連結</span>
    </div>
  </div>
</div>
```

### 3. 如何更新「歷屆機器人諸元」(`robots.html`)
打開 `robots.html`，在 `class="robots-container"` 內複製一組 `.robot-row` 區塊。
- 圖片上傳：未來拍了精美的機器人實體照或 CAD 渲染圖，請儲存至 `assets/images/`，並將代碼中 `<div class="robot-media">` 內的 SVG 線圖替換為傳統的 `<img>` 標籤：
  ```html
  <div class="robot-media">
    <img src="assets/images/2026_robot.png" alt="2026 競賽機器人實體照片" style="width: 100%; height: 100%; object-fit: cover;">
  </div>
  ```

---

## 🚀 部署至 GitHub Pages (完全免費且極速加載)

GitHub Pages 是 FRC 隊伍最常用的靜態網頁代管方案，步驟非常簡單：

1. **建立 GitHub 遠端倉庫**
   - 登入團隊的 GitHub 帳號，新建一個名為 `FRC9427_Web` 的 **Public（公開）** 儲存庫。
2. **上傳程式碼**
   - 在本機專案目錄下打開終端機（PowerShell 或 Git Bash），依序執行以下 Git 指令將程式碼推送至 GitHub：
     ```bash
     # 本專案已幫您配置好 Git 初始化
     git remote add origin https://github.com/zongyandeng/FRC9427_Web.git
     git branch -M main
     git add .
     git commit -m "feat: init premium iDeer website framework"
     git push -u origin main
     ```
3. **開啟 GitHub Pages 服務**
   - 打開網頁上的該 GitHub 儲存庫頁面，點選上方的 **Settings（設定）**。
   - 在左側選單點擊 **Pages**。
   - 在 **Build and deployment** 下的 **Source**，確認選擇為 `Deploy from a branch`。
   - 在 **Branch** 選單選擇 `main`，資料夾選擇 `/ (root)`，然後點擊右側的 **Save（儲存）** 按鈕。
4. **大功告成！**
   - 等待約 1 到 2 分鐘，重新整理該頁面，GitHub 就會為您生成一個專屬的網址（例如：`https://zongyandeng.github.io/FRC9427_Web/`），全隊與全球的夥伴就可以瞬間瀏覽這款極具質感的官方網站了！

---

## 🔒 網頁安全防護聲明 (TODO: security)

作為專業的資訊團隊，本專案嚴格遵守資安防範：
1. **防止 XSS 攻擊**：全站的原生 JavaScript 操作嚴禁使用任何 `innerHTML` 分配。動態處理文字一律使用安全的 `textContent`，防止惡意指令注入。
2. **拒絕阻塞對話框**：禁用影響效能與體驗的 `alert()` / `confirm()`，彈出視窗皆使用自製的 UI Modal，以優雅非阻塞式的方式提示使用者。

---

## 🤖 AI 協同開發與 `.cursorrules` 規範

本專案配置有專屬的 `.cursorrules` 設定檔，旨在為協同開發的 AI 助手提供明確的開發標準與設計約束。如果您使用 Cursor、Windsurf 或其他支援此設定的 AI 編輯器進行開發，AI 助手將會自動遵循以下開發規範，以確保產出程式碼的品質與未來學弟妹傳承的便利性：

1. **語言與溝通偏好**：AI 與您的所有對話、回覆、程式碼註解及文件一律使用 **繁體中文 (台灣)**。
2. **純 Vanilla 技術棧限制**：為維持網頁極速加載與學弟妹維護的便利度，嚴格限制使用純 HTML5, CSS3 與原生 JavaScript，嚴禁在無特殊需求下引入 React, Vue 或 Tailwind CSS。
3. **美學設計與 CSS 變數規範**：AI 會嚴格採用 `assets/css/style.css` 中定義的 **「Cyber-Navy & Yellow」** 黃藍 6:4 科技發光風格設計新元素，並保持磨砂玻璃質感（`.glass-card`）、發光（glow）與微動畫的 premium 視覺效果。
4. **高安全性防護**：原生 JavaScript 處理動態內容時，嚴禁使用 `innerHTML` 以防範 XSS 攻擊，必須使用安全的 `textContent`；同時禁用阻塞式 `alert()`，必須使用專案自製的 Modal。
5. **Git 與 GitHub 自動同步**：每次代碼變更且本機驗證無誤後，AI 會主動執行 Git commit 並 Push 至 GitHub 倉庫 (`origin main`)，以確保程式碼即時同步。
