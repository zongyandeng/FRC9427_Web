# FRC 9427 iDeer 團隊官方網站 - 學生維護與部署手冊 🦌⚙️

歡迎來到 **FRC 9427 iDeer**（新北市立樹林高中機器人隊）的官方網站專案！

本專案採用無編譯負擔的 **純 HTML5、CSS3（Vanilla CSS）與原生 JavaScript (Vanilla JS)** 打造。加載速度極快、架構直觀，且具備極佳的網頁安全性，非常便於未來的學弟妹們傳承、維護與擴充。

本手冊是專為**「完全沒有程式背景、不懂寫程式」**的學弟妹們設計的保姆級維護指南。只要跟著手冊中的步驟一步一步操作，不論你是公關、行政還是新進社員，都能 100% 成功更新網站內容！

---

## 📂 專案檔案結構目錄

當你打開專案資料夾時，會看到以下檔案結構。不用擔心，平常你只需要修改標註有 `★` 的檔案即可：

```text
FRC9427_Web/
├── .gitignore                      # Git 排除系統垃圾、本機快取與敏感設定
├── README.md                       # ★ 本維護手冊 (你正在閱讀的這份檔案)
├── index.html                      # ★ 官方首頁 (團隊定位、核心精神、精選影片、探索版塊導覽)
├── news.html                       # ★ 歷屆新聞 & 獎項 (榮譽戰績、大事記時間軸，動態渲染)
├── resources.html                  # ★ 新手資源庫 (CAD、程式、電控、機械學習卡片，動態篩選)
├── robots.html                     # ★ 歷屆競賽機器人 (機器規格諸元、策略、機構拆解)
├── sponsors.html                   # ★ 贊助商專區 (分級贊助名單、贊助 Perks、合作 CTA)
├── contact.html                    # ★ 聯繫我們 (社群卡片連結、安全的客戶端表單、彈出式 Modal)
├── robots.txt                      # 搜尋引擎檢索引導
└── assets/
    ├── css/
    │   └── style.css               # ★ 核心樣式表 (設計系統 Tokens、動畫、全站視覺主題色)
    └── js/
        ├── main.js                 # 全局腳本 (響應式選單、滾動進入動畫、動態篩選)
        └── i18n.js                 # ★ 多國語言快取字典 (中英文切換的核心機制)
└── locales/
    └── en.json                     # ★ 多國語言英文主字典檔
```

---

## 🛠️ 第一章：維護準備 —— 非技術人員工具與基本常識

在動手修改網頁程式碼之前，我們需要準備好合適的工具，並了解一些最基本的防呆常識。

### 1. 推薦下載文字編輯器 (VS Code)
雖然用電腦內建的「記事本」也能修改網頁，但非常容易因為看錯字而改錯。我們強烈建議下載免費、專業且有中文介面的 **VS Code (Visual Studio Code)**。

*   **下載網址**：[https://code.visualstudio.com/](https://code.visualstudio.com/) (直接下載適用於 Windows 的版本安裝即可)。
*   **如何切換成繁體中文介面**：
    1. 打開 VS Code，點擊左側工具列最下方的四個方塊圖示（Extensions，快捷鍵 `Ctrl + Shift + X`）。
    2. 在搜尋框輸入 `Chinese`。
    3. 找到「**Chinese (Traditional) Language Pack for Visual Studio Code**」，點擊右側的 **Install** 安裝按鈕。
    4. 安裝後，VS Code 右下角會彈出重啟提示，點擊 **Restart**，編輯器就會變成親切的繁體中文了！

### 2. 如何在本機預覽修改後的網頁（雙軌指南）
當你修改完程式碼並存檔後，你會想在瀏覽器中看看效果。這裡有兩種預覽方法：

*   **方法 A：快速雙擊開啟法 (適合快速查看)**
    *   **操作**：直接在檔案總管中，對著你想看的網頁（例如 `index.html`）連按兩下，它就會在你的 Chrome 或 Edge 瀏覽器中開啟。
    *   > [!WARNING]
    *   > **CORS 跨來源存取限制警告**：因為網頁瀏覽器的安全保護機制（CORS 限制），直接雙擊開啟網頁時，瀏覽器會**阻止** JavaScript 讀取資料夾內的 `locales/en.json` 英文翻譯字典。此時，如果你在網頁上點擊「English」切換按鈕，網站會**自動啟用我們設計的「離線防呆高可用機制」**——讀取 `assets/js/i18n.js` 裡面的快取文字。這就是為什麼我們在第三章會要求大家在更新翻譯時必須「雙重寫入」的原因！
*   **方法 B：Live Server 插件預覽法 (極力推薦！完美無限制)**
    *   **操作**：
        1. 在 VS Code 左側工具列點擊 Extensions 擴充功能（四個方塊圖示）。
        2. 搜尋 `Live Server`，找到由 *Ritwick Dey* 開發的插件，點選 **Install** 安裝。
        3. 安裝完成後，用 VS Code 打開我們的專案資料夾。
        4. 在 VS Code 視窗的右下角會出現一個標示 **Go Live** 的發光小圖示，點擊它！
        5. 電腦會自動打開一個網頁視窗（網址會是 `http://127.0.5.1:5500/...`），此時網頁不僅能 **完美無限制地切換中英文（正常讀取 JSON 檔）**，而且只要你在 VS Code 裡修改程式碼並存檔，網頁就會**自動重新整理顯示最新效果**，不需要手動刷網頁！

### 🛡️ 新手避坑「程式防呆三鐵律」口訣
不會寫程式沒關係，只要在修改程式碼時默念以下三鐵律，就能保證 99% 不出錯：

```text
一、雙引號，要對稱。有開頭，必有結束。
二、半角逗，別漏掉。資料間，逗號隔開；最後一筆，通常不加。
三、HTML 籤，有頭尾。例如 <div> 必須配 </div>，切勿丟失斜線。
```
*   **注意**：所有在程式碼中輸入的符號（例如引號 `"`、括號 `{}` `[`、逗號 `,`、冒號 `:`），都必須是**英文半角輸入法**下的符號，絕對不能使用中文全角符號（例如：`“`、`，`、`：`），否則網頁會直接掛掉！

---

## 🎨 第二章：視覺主題色與樣式自訂

我們為 iDeer 打造了與隊服一致的 **「Cyber-Navy & Yellow」** 黃藍 6:4 科技發光風格。如果未來隊伍的黃色或藍色比例有所更動，只需要調整 `assets/css/style.css` 最上方的 CSS 變數（Variables）即可瞬間改變全站風格！

### 🔧 如何修改全站主題色？
1. 使用 VS Code 打開 [assets/css/style.css](file:///d:/MyDesktop/antigravity2.0/FRC9427_Web/assets/css/style.css)。
2. 在第 13 到 25 行左右，你會看到 `:root` 區塊，這裡定義了全站的「發光色彩 Tokens」：

```css
/* 請於 assets/css/style.css 的 :root 區塊內進行修改 */
:root {
  --bg-dark: #050c1e;               /* 1. 背景主深色 (Midnight Navy 夜空深藍，全站大畫布背景) */
  --bg-dark-navy: #09132d;          /* 2. 卡片與導覽列深色 (稍微亮一點的科技深藍，用於呈現層次感) */
  --primary-yellow: #ffd600;        /* 3. 隊服 Signature 金黃色 (主視覺色，如發光邊框、強調字) */
  --primary-yellow-glow: rgba(255, 214, 0, 0.45); /* 4. 黃色發光光暈的透明度 (用於按鈕與卡片霓虹發光效果) */
  --accent-royal: #1565c0;          /* 5. 皇家藍 (隊服輔助色，用於漸層色調與按鈕底色) */
  --accent-cyber: #00e5ff;          /* 6. 科技霓虹電光藍 (細節發光點綴，用於副要發光元素) */
}
```

3. 你只需要將對應變數的「色碼」（例如 `#ffd600`）修改為你想要的新色碼，存檔後，全站所有頁面的對應顏色就會在瞬間全部更新！

---

## 📝 第三章：網頁內容更新 —— 保姆級圖解步驟

本章節將手把手教你如何安全地新增與更動各個網頁的具體內容。

### 1. 如何更新「首頁精選影片」(`index.html`)
首頁中間有「影片精選與團隊紀錄」區塊，如果你在新賽季拍攝了精美的宣傳片，想要把 YouTube 影片放上首頁：

1. 打開 [index.html](file:///d:/MyDesktop/antigravity2.0/FRC9427_Web/index.html)。
2. 按 `Ctrl + F` 搜尋關鍵字 `class="highlights-grid"`。
3. 你會看到多個 `.video-card` 的結構。複製其中一組，或者修改現有的：
```html
<!-- 影片卡片範本 -->
<div class="glass-card video-card reveal">
  <div class="video-thumbnail-container">
    <!-- 1. 修改此處：將 gyb7woZFOAI 替換成你 YouTube 影片網址最後面的「影片ID」 -->
    <img class="video-thumbnail" src="https://img.youtube.com/vi/gyb7woZFOAI/maxresdefault.jpg" alt="影片封面圖" onerror="this.src='https://img.youtube.com/vi/gyb7woZFOAI/hqdefault.jpg';">
    <div class="video-play-btn">
      <svg viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
    </div>
    <!-- 2. 修改此處：將 gyb7woZFOAI 替換成與上面相同的「影片ID」 -->
    <iframe class="video-iframe" src="https://www.youtube.com/embed/gyb7woZFOAI?autoplay=1" allow="autoplay; encrypted-media" allowfullscreen></iframe>
  </div>
  <div class="video-info">
    <!-- 3. 修改此處：data-i18n 是翻譯標記，文字為預設中文標題 -->
    <h3 data-i18n="highlights.v1.title">2026 FRC 9427 iDeer 影響力影片 (Impact Video)</h3>
  </div>
</div>
```

---

### 2. 如何新增「新聞或大事記」(`news.html`)
我們的歷史時間軸是橫向平滑滾動的精美設計，當新的一年有重要事件要記錄：

1. 打開 [news.html](file:///d:/MyDesktop/antigravity2.0/FRC9427_Web/news.html)。
2. 按 `Ctrl + F` 搜尋 `class="timeline-horizontal-track"`。
3. 在此區塊內部，你會看到多個 `.timeline-node` 節點。
4. **注意佈局交替規則**：
    *   **奇數個節點**：文字卡片在上方，照片預留框在下方。
    *   **偶數個節點**：照片預留框在上方，文字卡片在下方。
5. **複製並修改以下對應的範本代碼**並貼在最右側（最後面）：

```html
<!-- 範本 A：奇數節點 (文字在上、照片在下) -->
<div class="timeline-node">
  <div class="node-top-container">
    <div class="timeline-card">
      <div class="timeline-card-body">
        <span class="timeline-node-date" data-i18n="news.timeline.n13.date">西元 202X 年 X 月</span>
        <h3 data-i18n="news.timeline.n13.title">在此寫入大事記中文標題</h3>
        <p data-i18n="news.timeline.n13.desc">在此寫入具體的活動內容、得獎細節或新聞報導摘要，字數建議保持在 80~120 字之間最佳。</p>
      </div>
    </div>
  </div>
  <div class="node-bottom-container">
    <div class="photo-placeholder">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>
      <span data-i18n="news.timeline.n13.photo">影像紀錄 (預留照片說明)</span>
    </div>
  </div>
</div>
```

---

### 3. 如何更動「新聞媒體報導資料庫」(`news.html` 中的 JS 數據庫)
在 `news.html` 的最下方，有一個極為壯觀的「媒體新聞報導牆」，這部分是由 JavaScript 陣列動態繪製出來的。

1. 打開 [news.html](file:///d:/MyDesktop/antigravity2.0/FRC9427_Web/news.html)。
2. 按 `Ctrl + G` 輸入 `488`（或按 `Ctrl + F` 搜尋 `const NEWS_DATA = [`）。
3. 你會看到一個大型的資料庫列表。在最上方（這樣新新聞才會出現在最前面）複製並貼上以下格式：

```javascript
  {
    title: "中文媒體來源/寫下這篇新聞報導的中文標題",
    titleEn: "English Source / Translate the news title into highly professional English here",
    sourceEn: "English Source Name (e.g. Liberty Times)",
    url: "https://...貼上該篇新聞報導的官方網頁超連結...",
    source: "中文媒體名稱 (例如：自由時報)",
    season: "2025-2026", // 賽季標記
    category: "regional", // 填入分類：regional (區域賽), world (世界賽), education (教育推廣)
    date: "2026-05", // 發表日期 (格式為 西元-月份)
    image: "assets/images/news/news_xxx.webp" // 圖片路徑 (選填，如果還沒有照片，系統會自動指派一張精美預設圖)
  }, // ★ 注意：這個結尾逗號絕對不能漏掉！
```

---

### 4. 如何更新「贊助商專區」(`sponsors.html`) ★重要補充★
當新年度有熱情的企業或團體給予我們資金、技術或材料支持時，我們需要將他們列上贊助牆：

1. 打開 [sponsors.html](file:///d:/MyDesktop/antigravity2.0/FRC9427_Web/sponsors.html)。
2. 目前贊助商已採用 **「無分級的統一 Grid 佈局」**。請按 `Ctrl + F` 搜尋關鍵字：
    *   ➡️ 搜尋 `class="sponsors-grid`
3. 找到此區塊後，直接在 `<div class="sponsors-grid">` 標籤內複製並新增一組 `.sponsor-card` 卡片（新增的卡片會自動排版並自適應各類螢幕大小）：

```html
<!-- 贊助商卡片標準範本 -->
<div class="sponsor-card">
  <!-- 1. 圖片 Logo 設定：請將 Logo 轉為 .webp 或 .png 格式，存入 assets/images/sponser/ 資料夾中，並在此修改檔名 -->
  <img class="sponsor-logo-img" src="assets/images/sponser/your_new_logo.webp" alt="企業中文名稱" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
  
  <!-- 2. 文字 Placeholder 安全降級機制：當上面的圖片加載失敗或尚未提供 Logo 時，網頁會自動優雅顯示以下文字區塊 -->
  <div class="sponsor-placeholder" style="display: none;">
    <div class="sponsor-logo-svg">
      <!-- 預設科技標籤 SVG 圖示 -->
      <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>
    </div>
    <div class="sponsor-info">
      <!-- 修改此處：寫入企業的中文與英文簡稱 -->
      <span class="sponsor-name-zh">全新贊助企業名稱</span>
      <span class="sponsor-name-en">New Sponsor Ltd.</span>
    </div>
  </div>
</div>
```

---

### 5. 如何新增「新手學習資源」(`resources.html`)
新手學習資源卡片具備強大的「動態按鈕分類篩選功能」：

1. 打開 [resources.html](file:///d:/MyDesktop/antigravity2.0/FRC9427_Web/resources.html)。
2. 按 `Ctrl + F` 搜尋 `class="resources-grid"`。
3. 在此區塊內複製並貼上一個新的資源卡片：

```html
<!-- 學習資源卡片範本 -->
<!-- 修改 data-category 屬性！必須為以下分類之一：programming (程式)、cad (3D建模)、electrical (電控)、mechanical (機械)、rules (安全與規則) -->
<div class="resource-item reveal" data-category="programming">
  <div class="glass-card resource-card">
    <!-- 1. 卡片頂端的小類別標記 -->
    <span class="resource-category">Java 控制學 / PID 演算法</span>
    <!-- 2. 學習手冊名稱 -->
    <h3 class="feature-title">PID 閉環路迴饋控制原理與調校</h3>
    <!-- 3. 卡片內文簡短介紹 -->
    <p class="feature-desc">手把手教新手如何使用 WPILib 內建的 PIDController 類別，精準控制 Swerve 底盤的轉向角度與馬達轉速，並實現滑順的自動定位。</p>
    <div class="resource-meta">
      <!-- 4. 難易度與下載標記 -->
      <span>難易度: 適合進階</span>
      <span class="glow-text-yellow"><a href="https://...貼上你的雲端硬碟PDF下載網址..." style="color: inherit; text-decoration: none;">下載 PDF 手冊 📥</a></span>
    </div>
  </div>
</div>
```

---

### 6. 如何更新「歷屆機器人諸元」(`robots.html`)
每年賽季結束後，我們需要上架新年度的機器人規格：

1. 打開 [robots.html](file:///d:/MyDesktop/antigravity2.0/FRC9427_Web/robots.html)。
2. 按 `Ctrl + F` 搜尋 `class="robots-container"`，在該區塊下方複製並貼上一組全新的 `.robot-row`：

```html
<!-- 新年度機器人欄位範本 -->
<div class="robot-row reveal">
  <div class="robot-info">
    <!-- 1. 填寫機器人年度與專屬名稱 -->
    <h2 class="robot-name">Zephyr (2025 年度戰機)</h2>
    <p class="robot-desc">在此寫下新年度機器人的總體定位與特點。例如：Zephyr 代表了我們設計工程的重大突破。針對 2025 REEFSCAPE 賽季，我們打造了三段式高效線性升降梯...</p>
    
    <div class="robot-specs">
      <!-- 2. 機構規格諸元填寫 -->
      <div class="spec-item"><strong>底盤系統 (Chassis):</strong> 4 輪獨立 Swerve 全向輪驅動 (MK4i)</div>
      <div class="spec-item"><strong>馬達配置 (Motors):</strong> Neo 無刷馬達 & Spark Flex 控制器</div>
      <div class="spec-item"><strong>核心機構 (Mechanism):</strong> 輕量化三級鋁擠升降梯、氣動夾爪與閉環定位</div>
      <div class="spec-item"><strong>賽事策略 (Strategy):</strong> REEF 珊瑚快速掛載、Barge 高空攀爬</div>
    </div>
  </div>
  
  <!-- 3. 機器人影像設定 (將 SVG 替換成實體照片) -->
  <div class="robot-media">
    <!-- 我們已將 SVG 佔位線圖預留，當拍了精美的實體照或 3D 渲染圖並轉成 WebP 存入 assets/images/ 後，請直接刪除 <svg>...</svg> 並改成以下 IMG 標籤： -->
    <img src="assets/images/2025_robot_zephyr.webp" alt="2025 戰機實體照片" style="width: 100%; height: 100%; object-fit: cover; border-radius: 12px;">
  </div>
</div>
```

---

## 🌏 第四章：多國語言 (i18n) 翻譯引擎維護與防呆

本網站具備 **100% 全面中/英文雙語切換功能**，這是藉由 `assets/js/i18n.js` 所驅動的。

### 🔑 為什麼要同時修改兩個檔案？（原理解析）
如第一章所述，當網頁在伺服器上（如上傳至 GitHub Pages）運行時，JavaScript 會自動去讀取外部的 `locales/en.json` 這個字典檔，並顯示英文。

但是，當學弟妹在自己電腦上**直接雙擊兩下打開網頁測試時**，瀏覽器會因為 CORS 跨來源限制拒絕讀取這個 `en.json`，這時網站會自動啟用「離線快取保障」——讀取 `assets/js/i18n.js` 裡面的 `translations.en` 物件。

因此，為保證網頁不論在「本機離線點開」還是「線上網址開啟」都能 **100% 正常顯示英文翻譯**，請務必遵循以下 **「雙重寫入三步驟」**：

---

### 📋 雙重寫入 100% 成功三步驟

#### 步驟 1：在 HTML 標籤上打上翻譯標記 (`data-i18n`)
當你在 HTML 中寫了一段中文文字，例如在 `sponsors.html` 中新增了一段話：
```html
<h3 data-i18n="sponsors.newTitle">新年度贊助招募中</h3>
```

#### 步驟 2：修改 `locales/en.json`（主英文翻譯字典）
使用 VS Code 打開 [locales/en.json](file:///d:/MyDesktop/antigravity2.0/FRC9427_Web/locales/en.json)。尋找到 `sponsors` 的巢狀區塊，並在裡面新增一行對應的 Key 與英文：
```json
  "sponsors": {
    "title": "Become Our Partner",
    "newTitle": "New Season Sponsorship Opportunities", // ★ 注意：這行結尾一定要有英文半角逗號！
    "desc": "..."
  }
```

#### 步驟 3：修改 `assets/js/i18n.js`（離線快取字典）
使用 VS Code 打開 [assets/js/i18n.js](file:///d:/MyDesktop/antigravity2.0/FRC9427_Web/assets/js/i18n.js)。在最上方的 `const translations = { en: { ... } }` 當中，尋找對應的巢狀結構並補上相同的 Key：
```javascript
        "sponsors": {
            "title": "Become Our Partner",
            "newTitle": "New Season Sponsorship Opportunities", // ★ 注意：這行結尾也一定要有英文半角逗號！
            "desc": "..."
        }
```

---

### 🚨 翻譯掛掉、網頁變空白時的排錯指引
非技術人員在修改 JSON 格式時，有 90% 的出錯機率是**「多加了逗號」**或**「少加了逗號」**。
例如：
```json
{
  "name": "iDeer",
  "number": 9427, // ★ 這是最後一筆資料，後面沒有大括號了，通常不能加逗號！(有些瀏覽器會解析出錯)
}
```
*   **如何定位錯誤**：
    1. 在網頁瀏覽器（如 Chrome）中按鍵盤最上方的 **F12**（或按右鍵選擇「檢查」）。
    2. 點選上方的 **Console（控制台）** 標籤頁。
    3. 如果有格式出錯，你會看到一行紅色的錯誤訊息，寫著 `Uncaught (in promise) SyntaxError: Unexpected token ... in JSON at position ...`。
    4. 訊息中通常會直接標示出錯誤發生在 `en.json` 或 `i18n.js` 的第幾行，你只需要回到該行將多餘的逗號刪除，或補上漏掉的逗號即可！

---

## 🔒 第五章：網頁安全防護聲明

為了維護團隊官方網站的專業形象與極致的網路安全防護，全站在編寫 JavaScript 代碼時嚴格遵循以下兩大防線：

1.  **防止 XSS (跨站腳本攻擊) 注入**：全站原生 JavaScript 操作在動態繪製文字時，**嚴格禁止使用 `innerHTML`**。所有文字一律使用安全的 **`textContent`** 分配，阻絕一切惡意指令的執行。
2.  **拒絕阻塞式對話框**：嚴禁使用會中斷使用者操作、影響美觀與效能的 `alert()` 或 `confirm()`，全站彈出提示與通知一律採用自製的精美 UI Modal (懸浮彈窗)，提供流暢滑順的體驗。

---

## ✉️ 第六章：聯絡表單發信設定 (Web3Forms)

本網站的聯絡表單已完美整合 **Web3Forms** 免費發信服務，解決了靜態網頁（如 GitHub Pages）無法直接使用後端發送郵件的痛點。

### 🔑 如何為新年度或新管理員變更收信信箱？
1.  **申請 Access Key (金鑰)**：
    前往 [Web3Forms 官網](https://web3forms.com/)，在首頁輸入想用來接收信件的隊伍官方信箱（例如：`slshfrc@slsh.ntpc.edu.tw`），點擊建立。系統會立即將一組 Access Key 寄送到該信箱。
2.  **更新網頁代碼**：
    打開 [contact.html](file:///d:/MyDesktop/antigravity2.0/FRC9427_Web/contact.html)，找到大約第 88 行的隱藏欄位：
    ```html
    <input type="hidden" name="access_key" value="這裡貼上您剛取得的 Access Key">
    ```
    將 `value` 的內容替換成您剛取得的金鑰，儲存後推送到 GitHub 即可。

> [!TIP]
> **安全演示與模擬模式 (Demo Mode)**：
> 若該欄位未填寫或保持預設的 `YOUR_ACCESS_KEY_HERE`，網頁將自動降級為「演示模擬模式」—— 提供完整的輸入校驗與精美成功彈窗，但**不會**真的發信，非常適合開發測試與無 Key 的離線演示！

---

## 🚀 第七章：部署至 GitHub Pages (極詳細 Git 指令步驟)

當你完成本機所有的修改與測試，並確認無誤後，你需要將檔案「推送（Push）」到 GitHub，這樣網路上的官方網站才會更新。

### 🔧 終極 Git 上傳「三部曲」極白話指引
不用害怕黑黑的終端機視窗，打開你的 **Command Prompt（命令提示字元）** 或 **VS Code 內建終端機**（按鍵盤 `Ctrl + ~` 組合鍵），依序輸入以下三個最常用的指令即可：

#### 步驟 1：暫存所有修改
```bash
git add .
```
*   **白話解釋**：告訴 Git：「我已經把資料夾修改好了，請把我剛剛所有的修改，全部打包放進暫存箱裡！」 (注意 `add` 與點 `.` 之間有一個空格)。

#### 步驟 2：提交修改並寫上備註
```bash
git commit -m "feat: 更新2026贊助商與新聞大事記"
```
*   **白話解釋**：把這個暫存箱用膠帶封起來，並在箱子外面用麥克筆寫上這一次修改的標題（`-m` 後面雙引號內的字，你可以改成自己這次修改的內容描述），以便以後隨時可以倒帶回來。

#### 步驟 3：推送上傳至 GitHub 遠端倉庫
```bash
git push
```
*   **白話解釋**：正式把這箱修改，透過網路發送到 GitHub 網站的遠端倉庫。
*   *備註*：如果是第一次在該台電腦上執行，GitHub 可能會跳出小視窗要求你登入帳號密碼進行授權確認，請照著畫面上的提示點擊登入授權即可！

---

### 🌐 GitHub Pages 線上自動部署設定
本專案已完美設定為 GitHub Pages 自動託管。上傳程式碼後，系統會自動在背景進行發佈：

1. 登入 GitHub，進入你的團隊儲存庫 `FRC9427_Web`。
2. 點選上方的 **Settings (設定)** ⚙️。
3. 在左側導覽列中，點擊 **Pages**。
4. 在 **Build and deployment** 底下的 **Branch**，確認選擇的是 `main` 且資料夾為 `/ (root)`。
5. 點擊 **Save (儲存)**。
6. 約等候 1~2 分鐘後，重新整理該頁面，最上方就會出現你專屬的官方網站公開網址（例如：`https://zongyandeng.github.io/FRC9427_Web/`）！

---

## 🤖 第八章：AI 協同開發與 `.cursorrules` 規範

本專案配置有專屬的 `.cursorrules` 設定檔，旨在為協同開發的 AI 助手提供明確的開發標準與設計約束。如果您使用 Cursor、Windsurf 或其他支援此設定的 AI 編輯器進行開發，AI 助手將會自動遵循以下開發規範，以確保產出程式碼的品質與未來學弟妹傳承的便利性：

1.  **語言與溝通偏好**：AI 與您的所有對話、回覆、程式碼註解及文件一律使用 **繁體中文 (台灣)**。
2.  **純 Vanilla 技術棧限制**：為維持網頁極速加載與學弟妹維護的便利度，嚴格限制使用純 HTML5, CSS3 與原生 JavaScript，嚴禁在無特殊需求下引入 React, Vue 或 Tailwind CSS。
3.  **美學設計與 CSS 變數規範**：AI 會嚴格採用 `assets/css/style.css` 中定義的 **「Cyber-Navy & Yellow」** 黃藍 6:4 科技發光風格設計新元素，並保持磨砂玻璃質感（`.glass-card`）、發光（glow）與微動畫的 premium 視覺效果。
4.  **高安全性防護**：原生 JavaScript 處理動態內容時，嚴禁使用 `innerHTML` 以防範 XSS 攻擊，必須使用安全的 `textContent`；同時禁用阻塞式 `alert()`，必須使用專案自製的 Modal。
5.  **Git 與 GitHub 自動同步**：每次代碼變更且本機驗證無誤後，AI 會主動執行 Git commit 並 Push 至 GitHub 倉庫 (`origin main`)，以確保程式碼即時同步。
6.  **圖片格式與歸檔規範**：如有放置照片或圖片需求，**必須先轉檔為 `.webp` 格式**，並存放至 `assets/images` 目錄（完整本機路徑：`D:\MyDesktop\antigravity2.0\FRC9427_Web\assets\images`）。若有需要，可在該目錄下建立子資料夾進行分類存放。
7.  **多國語言同步與雙語高可用規範**：本專案為中/英文雙語官方網站，嚴禁在英文介面下殘留中文字元。新增 HTML 文字元素時必須加上 `data-i18n="[模組].[功能]"`，並「同步雙重寫入」`locales/en.json` 與 `assets/js/i18n.js` 的 `translations.en` 物件中，確保離線高可用性。動態數據 (如 `NEWS_DATA` / `AWARDS_DATA` 項目) 亦必須同步具備完整中英欄位 (中文與 `*En` 對應欄位)。
8.  **多國語言 (i18n) 完整性審查與自動化驗證**：AI 助手會對 HTML 的 `data-i18n` 進行掃描並對比 `en.json`，找出缺失 Key、自動補齊道地翻譯並輸出排序好的全新 JSON。同時在每次推送 GitHub 前，**必須編寫並執行 Python 檢測腳本**，自動化掃描更新檔案以確保 100% 覆蓋率與零中文字元殘留，驗證無誤後自動 commit 並 Push 變更至 GitHub 倉庫。

### 🔑 AI 協同開發「黃金 Prompt 指令範本」(極重要 💡)
當你未來使用 **AI 助手（如 Antigravity / Cursor / Windsurf / ChatGPT）** 協助你更動網站功能或樣式時，**請在你的對話指令末尾，複製並貼上這段黃金防呆約束**，AI 就會完美遵守本專案的最高規格進行開發：

> [!IMPORTANT]
> #### 📋 請複製以下區塊貼給 AI：
> ```text
> ⚠️【重要 FRC 9427 官方網站翻譯防呆約束】⚠️
> 本專案是一個具備 100% 完整中/英文雙語切換機制的官方網站。不論你這次要幫我進行什麼樣的功能新增、HTML 變更、樣式調整或資料更新，都必須嚴格遵守以下多國語言 (i18n) 規範，絕不能在英文介面下殘留任何中文字元、符號或奇怪的中英混雜：
> 
> 1. 靜態文字更動：主動為 HTML 新增的中文文字分配唯一的 `data-i18n` 屬性（格式如 data-i18n="news.loadMoreBtn"）。同時且同步修改「locales/en.json」加入對應英文翻譯，並同步寫入「assets/js/i18n.js」中的預置離線快取「translations.en」物件中，以確保離線 file:/// 協定開啟時的 100% 高可用性。
> 
> 2. 動態數據更動：如果變更或新增了 news.html 中的「NEWS_DATA」新聞或「AWARDS_DATA」獎項資料庫，必須確保每一個新物件均「同時且同步」具備完整的中文字串（title, source, desc, region）與高品質、流暢地道的英文欄位（titleEn, sourceEn, descEn, regionEn）。絕不能漏掉英文欄位。
> 
> 3. 掃除隱藏中文：更動後，請主動掃描該網頁的 aria-label、alt 屬性與第三方媒體來源，確保在英文語系下皆呈現純英文。
> 
> 4. 驗證與 GitHub 上傳：請編寫並執行 Python 檢測腳本，對 news.html 等更新的檔案進行 100% 覆蓋率與零中文字元殘留的自動化掃描。變更驗證無誤後，請自動暫存、提交並 Push 變更至我的 GitHub 遠端倉庫。
> ```
