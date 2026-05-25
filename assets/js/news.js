/**
 * FRC 9427 iDeer - 歷屆新聞 & 獎項動態渲染模組
 * 設計美學：Midnight Navy 與金黃色霓虹光暈，毛玻璃卡片自適應 Grid 佈局
 */

// 14 張從 FRC 9427 iDeer 官方 YouTube 頻道上精確抓取的真實影片封面縮圖 (完美落實方案 A)
const PREMIUM_IMAGES = [
  "https://img.youtube.com/vi/gyb7woZFOAI/hqdefault.jpg", // iDeer 團隊參賽真實影片截圖
  "https://img.youtube.com/vi/Iia60blYUXE/hqdefault.jpg", // iDeer 官方 Like a Deer MV 縮圖
  "https://img.youtube.com/vi/3hcP0lzrybU/hqdefault.jpg", // 2025 機器人 Zephyr 發表影片縮圖
  "https://img.youtube.com/vi/zNt2UkwO9gw/hqdefault.jpg", // iDeer 比賽精華影片封面
  "https://img.youtube.com/vi/cG-z_vTeyp0/hqdefault.jpg", // 團隊參賽現場回顧縮圖
  "https://img.youtube.com/vi/pk_J7Pp_Ehs/hqdefault.jpg", // iDeer 機器人傳動與電控配置縮圖
  "https://img.youtube.com/vi/JUu4h5PwJaE/hqdefault.jpg", // FRC 台灣大賽隊伍真實合影
  "https://img.youtube.com/vi/5P5DFO7Ry0o/hqdefault.jpg", // 樹林高中 iDeer 隊伍日常研發影片封面
  "https://img.youtube.com/vi/qbTGLrCF16w/hqdefault.jpg", // 團隊出征世界大賽授旗儀式縮圖
  "https://img.youtube.com/vi/JoyeqFqjIeM/hqdefault.jpg", // iDeer 競賽機器人操控與調試畫面
  "https://img.youtube.com/vi/qI7DogPocPc/hqdefault.jpg", // 學生在賽場上的真實互動縮圖
  "https://img.youtube.com/vi/KFAxo9GQPUo/hqdefault.jpg", // iDeer 團隊 STEM 社區推廣活動縮圖
  "https://img.youtube.com/vi/Q9q8MaRaCVo/hqdefault.jpg", // 2024 Rookie All-Star 頒獎典禮截圖
  "https://img.youtube.com/vi/3KbH438oagc/hqdefault.jpg"  // iDeer 年度機器人機構設計藍圖與發表
];

// 歷屆新聞 & 榮譽資料庫 (共 68 篇)
const NEWS_DATA = [
  // ==========================================
  // 2025-2026 賽季 (35篇)
  // ==========================================
  // -- 晉級世界賽 --
  {
    title: "新北學Bar/新北戰隊休士頓寫歷史！ 🏆 臺灣 FRC 史上最亮眼戰績出爐！",
    url: "https://www.facebook.com/share/p/1DsHwa9Xda/",
    source: "新北學Bar",
    season: "2025-2026",
    category: "world",
    date: "2026-05"
  },
  {
    title: "Pchome新聞網/新北FRC機器人世界賽傳捷報！",
    url: "https://news.pchome.com.tw/living/twpowernews/20260512/index-17785552871155447009.html",
    source: "PChome新聞網",
    season: "2025-2026",
    category: "world",
    date: "2026-05"
  },
  {
    title: "國立教育廣播電台/新北6校挺進FRC世界決賽 展現推動科技教育扎實成果",
    url: "https://tw.news.yahoo.com/share/939c4a75-f929-3904-a0bc-871434501feb",
    source: "國立教育廣播電台",
    season: "2025-2026",
    category: "world",
    date: "2026-05"
  },
  {
    title: "台灣好新聞/新北6校挺進FRC世界決賽",
    url: "https://tw.news.yahoo.com/share/e8eaeee5-488a-3d16-8e68-c7cfa5fc7b2c",
    source: "台灣好新聞",
    season: "2025-2026",
    category: "world",
    date: "2026-05"
  },
  {
    title: "勁報/新北FRC機器人世界賽傳捷報",
    url: "https://twpowernews.com/news_pagein.php?iType=1010&n_id=291077",
    source: "勁報",
    season: "2025-2026",
    category: "world",
    date: "2026-05"
  },
  {
    title: "台灣新生報/新北6校遠征美國機器人界奧運 創歷年最佳成績",
    url: "https://tw.news.yahoo.com/share/89ad2909-a271-3568-a1d3-8424ba68de5d",
    source: "台灣新生報",
    season: "2025-2026",
    category: "world",
    date: "2026-05"
  },
  {
    title: "自由時報/新北學子FRC大展身手 奪分區聯盟亞軍、全明星進步獎、團隊永續獎",
    url: "https://news.ltn.com.tw/news/NewTaipei/breakingnews/5433745",
    source: "自由時報",
    season: "2025-2026",
    category: "world",
    date: "2026-05"
  },
  {
    title: "聯合新聞/新北6校挺進FRC世界決賽",
    url: "https://udn.com/news/story/6898/9497329",
    source: "聯合新聞網",
    season: "2025-2026",
    category: "world",
    date: "2026-05"
  },
  {
    title: "中央社/FIRST世界機器人冠軍賽 台灣學子抱回7獎項歷年最多",
    url: "https://www.cna.com.tw/news/ahel/202605040028.aspx",
    source: "中央社",
    season: "2025-2026",
    category: "world",
    date: "2026-05"
  },
  {
    title: "經濟日報/FIRST世界機器人冠軍賽 台灣學子抱回7獎項",
    url: "https://money.udn.com/money/story/5599/9479870?from=edn_related_storybottom",
    source: "經濟日報",
    season: "2025-2026",
    category: "world",
    date: "2026-05"
  },
  {
    title: "華視新聞網/FIRST世界機器人冠軍賽 台灣學子抱回7獎項",
    url: "https://news.cts.com.tw/cna/international/202605/202605043027087.html",
    source: "華視新聞網",
    season: "2025-2026",
    category: "world",
    date: "2026-05"
  },
  {
    title: "中華民國僑務委員會/FIRST世界機器人冠軍賽 台灣學子抱回7獎項歷年最多",
    url: "https://www.ocac.gov.tw/OCAC/SubSites/Pages/Detail.aspx?site=9d57e4be-aebc-4975-80fb-12c2f7434864&nodeid=1264&pid=86003071",
    source: "僑務委員會",
    season: "2025-2026",
    category: "world",
    date: "2026-05"
  },
  {
    title: "商業週刊/抱回7大獎，創歷年之最！台灣學生組15支隊伍闖機器人界奧運",
    url: "https://www.businessweekly.com.tw/international/blog/3021283",
    source: "商業周刊",
    season: "2025-2026",
    category: "world",
    date: "2026-05"
  },
  {
    title: "美南新聞/台灣學子閃耀休士頓！ 2026 FIRST 機器人世界賽展現 STEM 教育深耕成果",
    url: "https://scdaily.com/post/95342",
    source: "美南新聞",
    season: "2025-2026",
    category: "world",
    date: "2026-05"
  },
  {
    title: "Pchome新聞網/FIRST世界機器人冠軍賽 台灣學子抱回7獎項",
    url: "https://news.pchome.com.tw/internation/cna/20260504/index-17778579518113618011.html",
    source: "PChome新聞網",
    season: "2025-2026",
    category: "world",
    date: "2026-05"
  },

  // -- 土耳其區賽獲獎 --
  {
    title: "新北市訊：台灣第一次新北3隊FRC戰隊橫掃土耳其區賽 獲冠亞軍 挺進世界總決賽",
    url: "https://www.ntpc.edu.tw/home.jsp?id=d127e0ce0f4f407b&act=be4f48068b2b0031&dataserno=842423c73f8951ace57afd0797665786",
    source: "新北市政府教育局",
    season: "2025-2026",
    category: "regional",
    date: "2026-03"
  },
  {
    title: "大成報：新北3隊FRC戰隊創佳績 橫掃土耳其區賽、前進世界總決賽",
    url: "https://greatnews.com.tw/news_pagein.php?iType=1010&n_id=309974",
    source: "大成報",
    season: "2025-2026",
    category: "regional",
    date: "2026-03"
  },
  {
    title: "勁報：新北FRC戰隊橫掃土耳其區賽 優異表現挺進世界總決賽",
    url: "https://twpowernews.com/news_pagein.php?iType=1010&n_id=288826",
    source: "勁報",
    season: "2025-2026",
    category: "regional",
    date: "2026-03"
  },
  {
    title: "PChome新聞：新北FRC戰隊橫掃土耳其區賽 優異表現挺進世界總決賽",
    url: "https://news.pchome.com.tw/living/twpowernews/20260316/index-17736393056037847009.html",
    source: "PChome新聞網",
    season: "2025-2026",
    category: "regional",
    date: "2026-03"
  },
  {
    title: "中時新聞：國際科技競賽傳捷報 新北FRC機器人戰隊挺進世界總決賽",
    url: "https://www.chinatimes.com/realtimenews/20260316002549-260421?ctrack=pc_main_rtime_p01&chdtv",
    source: "中時新聞網",
    season: "2025-2026",
    category: "regional",
    date: "2026-03"
  },
  {
    title: "風傳媒：新北3隊FRC戰隊橫掃土耳其區賽 獲冠亞軍挺進世界總決賽!",
    url: "https://www.storm.mg/article/11112150",
    source: "風傳媒",
    season: "2025-2026",
    category: "regional",
    date: "2026-03"
  },
  {
    title: "Yahoo新聞：臺灣首次新北3隊FRC戰隊 挺進世界總決賽",
    url: "https://tw.news.yahoo.com/%E8%87%BA%E7%81%A3%E9%A6%96%E6%AC%A1%E6%96%B0%E5%8C%973%E9%9A%8Afrc%E6%88%B0%E9%9A%8A-%E6%8C%BA%E9%80%B2%E4%B8%96%E7%95%8C%E7%B8%BD%E6%B1%BA%E8%B3%BD-063743833.html",
    source: "Yahoo新聞",
    season: "2025-2026",
    category: "regional",
    date: "2026-03"
  },
  {
    title: "國立教育廣播電台：臺灣首次新北3隊FRC戰隊 挺進世界總決賽",
    url: "https://www.ner.gov.tw/CultureNews/Content/?id=26031614374321984",
    source: "國立教育廣播電台",
    season: "2025-2026",
    category: "regional",
    date: "2026-03"
  },

  // -- 特殊選才榜單 --
  {
    title: "在地就學成效卓越 新北115學年度特殊選才表現優異",
    url: "https://today.line.me/tw/v3/article/DR0NOqw?utm_source=lineshare",
    source: "LINE TODAY",
    season: "2025-2026",
    category: "education",
    date: "2026-01"
  },
  {
    title: "打破學習框架！新北「在地就學大聯盟」開花結果 115學年度特殊選才表現優異",
    url: "https://www.thehubnews.net/archives/591159",
    source: "民生電子報",
    season: "2025-2026",
    category: "education",
    date: "2026-01"
  },
  {
    title: "大學特殊選才陸續放榜 新北259生報名156人錄取",
    url: "http://news.ltn.com.tw/amp/news/life/breakingnews/5319520",
    source: "自由時報",
    season: "2025-2026",
    category: "education",
    date: "2026-01"
  },
  {
    title: "教育新聞-新北在地就學成效卓越 115學年度特殊選才表現優異",
    url: "https://www.ntpc.edu.tw/home.jsp?id=d127e0ce0f4f407b&act=be4f48068b2b0031&dataserno=4b1fe313910568a489a00a0c7ce5d51f",
    source: "新北市政府教育局",
    season: "2025-2026",
    category: "education",
    date: "2026-01"
  },
  {
    title: "在地就學成效卓越 新北115學年度特殊選才表現優異",
    url: "https://twpowernews.com/news_pagein.php?n_id=287056",
    source: "勁報",
    season: "2025-2026",
    category: "education",
    date: "2026-01"
  },
  {
    title: "新北大學特殊選才 錄取率近六成",
    url: "https://tw.news.yahoo.com/%E6%96%B0%E5%8C%97%E5%A4%A7%E5%AD%B8%E7%89%B9%E6%AE%8A%E9%81%B8%E6%89%8D-%E9%8C%84%E5%8F%96%E7%8E%87%E8%BF%91%E5%85%AD%E6%88%90-132507206.html",
    source: "Yahoo新聞",
    season: "2025-2026",
    category: "education",
    date: "2026-01"
  },
  {
    title: "打破學習框架！新北「在地就學大聯盟」開花結果 115學年度特殊選才表現優異",
    url: "https://news.pchome.com.tw/society/thehubnews/20260124/index-76919180798827306002.html",
    source: "PChome新聞網",
    season: "2025-2026",
    category: "education",
    date: "2026-01"
  },
  {
    title: "特殊選才放榜 新北社區高中成績亮眼",
    url: "http://mdnkids.com/content.asp?Link_String_=241O00000LIDNIE",
    source: "國語日報",
    season: "2025-2026",
    category: "education",
    date: "2026-01"
  },

  // -- AI圓夢 --
  {
    title: "新北「圓夢D-Maker計畫」揭曉 5校青年獲選孵夢半年",
    url: "https://udn.com/news/story/7323/9221949",
    source: "聯合新聞網",
    season: "2025-2026",
    category: "dream",
    date: "2025-12"
  },
  {
    title: "新北「圓夢D-Maker」從關懷特教生到環保 5組高中職生提案獲3萬基金",
    url: "https://news.ltn.com.tw/news/life/breakingnews/5287402",
    source: "自由時報",
    season: "2025-2026",
    category: "dream",
    date: "2025-12"
  },
  {
    title: "助攻新北青年以行動創造改變 新北「圓夢D-Maker」決選揭曉 打造青年孵夢生態系!",
    url: "https://www.storm.mg/article/11090145",
    source: "風傳媒",
    season: "2025-2026",
    category: "dream",
    date: "2025-12"
  },
  {
    title: "新北「圓夢D-Maker」決選揭曉 5組獲3萬元實作基金",
    url: "https://www.chinatimes.com/realtimenews/20251223004038-260421",
    source: "中時新聞網",
    season: "2025-2026",
    category: "dream",
    date: "2025-12"
  },

  // ==========================================
  // 2024-2025 賽季 (28篇)
  // ==========================================
  // -- 臺灣區賽 --
  {
    title: "FRC機器人臺灣大賽榮耀揭曉 新北祭出百萬獎金衝刺休士頓世界舞台。(中華新聞雲)",
    url: "https://www.cdns.com.tw/articles/1180488",
    source: "中華新聞雲",
    season: "2024-2025",
    category: "regional",
    date: "2025-03"
  },
  {
    title: "FRC機器人臺灣賽揭曉，四隊挺進世界總決賽，新北市樹林高中全國獲獎數最多。（國語日報）",
    url: "https://www.mdnkids.com/content.asp?Link_String_=233B00000MWTOEI",
    source: "國語日報",
    season: "2024-2025",
    category: "regional",
    date: "2025-03"
  },
  {
    title: "FRC機器人臺灣大賽榮耀揭曉新北學子衝刺世界舞台。(Line Today)",
    url: "https://today.line.me/tw/v2/article/DR9wvqp",
    source: "LINE TODAY",
    season: "2024-2025",
    category: "regional",
    date: "2025-03"
  },
  {
    title: "FRC機器人臺灣大賽榮耀揭曉 新北祭出百萬獎金衝刺休士頓世界舞台! (風傳媒)",
    url: "https://www.storm.mg/localarticle/5336872",
    source: "風傳媒",
    season: "2024-2025",
    category: "regional",
    date: "2025-03"
  },
  {
    title: "FRC機器人臺灣大賽榮耀揭曉 新北祭出百萬獎金前往休士頓。(教廣)",
    url: "https://www.ner.gov.tw/news/67ce7f64a3912e0023d8873",
    source: "國立教育廣播電台",
    season: "2024-2025",
    category: "regional",
    date: "2025-03"
  },
  {
    title: "FRC機器人臺灣大賽榮耀揭曉新北學子衝刺世界舞台(Line Today)",
    url: "https://today.line.me/tw/v2/article/x2Llqpr",
    source: "LINE TODAY",
    season: "2024-2025",
    category: "regional",
    date: "2025-03"
  },

  // -- 晉級世界賽 --
  {
    title: "新北市四校勇闖休士頓 展現機器人實力(大成報)",
    url: "https://www.greatnews.com.tw/news_pagein.php?iType=1010&n_id=301064",
    source: "大成報",
    season: "2024-2025",
    category: "world",
    date: "2025-04"
  },
  {
    title: "新北4校勇闖休士頓FRC世界決賽 侯友宜授旗加碼百萬獎金衝冠(台灣好新聞)",
    url: "https://tw.news.yahoo.com/新北4校勇闖休士頓frc世界決賽-侯友宜授旗加碼百萬獎金衝冠-032443681.html",
    source: "Yahoo新聞 / 台灣好新聞",
    season: "2024-2025",
    category: "world",
    date: "2025-04"
  },
  {
    title: "新北4校脫穎而出 勇闖休士頓FRC世界大賽 (LINE TODAY)",
    url: "https://today.line.me/tw/v2/article/2D53O08",
    source: "LINE TODAY",
    season: "2024-2025",
    category: "world",
    date: "2025-04"
  },
  {
    title: "新北4校勇闖休士頓FRC世界決賽 市長侯友宜授旗加碼百萬獎金(教廣)",
    url: "https://www.ner.gov.tw/news/67f5feacfbcfa30022d1db63",
    source: "國立教育廣播電台",
    season: "2024-2025",
    category: "world",
    date: "2025-04"
  },
  {
    title: "全國晉級最多！新北4 校勇闖休士頓FRC 世界決賽 侯友宜授旗加碼百萬獎金衝冠 (風傳媒)",
    url: "https://www.storm.mg/localarticle/5353803",
    source: "風傳媒",
    season: "2024-2025",
    category: "world",
    date: "2025-04"
  },
  {
    title: "新北4校脫穎而出 勇闖休士頓FRC世界大賽(青年日報)",
    url: "https://tw.news.yahoo.com/新北4校脫穎而出-勇闖休士頓frc世界大賽-160000989.html",
    source: "Yahoo新聞 / 青年日報",
    season: "2024-2025",
    category: "world",
    date: "2025-04"
  },
  {
    title: "新北四校闖世界賽 競逐FRC最高榮譽(PChome)",
    url: "https://news.m.pchome.com.tw/living/twpowernews/20250409/index-17441647551832747009.html",
    source: "PChome新聞網",
    season: "2024-2025",
    category: "world",
    date: "2025-04"
  },
  {
    title: "教育新聞-全國晉級最多！新北4校勇闖休士頓FRC世界決賽 侯友宜授旗加碼百萬獎金衝冠(市府)",
    url: "https://www.ntpc.edu.tw/home.jsp?id=d127e0ce0f4f407b&act=be4f48068b2b0031&dataserno=a7673163936595141a0f32c44bb16674&mserno=cdfca8f4e3eeb6df81e43a5af771c42f",
    source: "新北市政府教育局",
    season: "2024-2025",
    category: "world",
    date: "2025-04"
  },
  {
    title: "新北教育廣播電台專訪 iDeer",
    url: "https://www.ner.gov.tw/program/61bc3184a5b2330007bd9f26/682460e4dc1f7700222c9a7f",
    source: "國立教育廣播電台",
    season: "2024-2025",
    category: "world",
    date: "2025-04"
  },

  // -- 科研計畫 --
  {
    title: "2-1新北市科展成果發表！50件作品參賽 18件獲最佳研究獎 (中時)",
    url: "https://www.chinatimes.com/realtimenews/20241230002347-260405?chdtv",
    source: "中時新聞網",
    season: "2024-2025",
    category: "research",
    date: "2024-12"
  },
  {
    title: "2-2從實驗室到舞臺 新北學生科研獎助展現無限科學潛力 (教廣)",
    url: "https://www.ner.gov.tw/news/67723b1d19e6450023e1f5a6",
    source: "國立教育廣播電台",
    season: "2024-2025",
    category: "research",
    date: "2024-12"
  },
  {
    title: "2-3新北學生科學研究獎 助展現無限科學潛力 (Yahoo新聞)",
    url: "https://tw.news.yahoo.com/%E6%96%B0%E5%8C%97%E5%AD%B8%E7%94%9F%E7%A7%91%E5%AD%B8%E7%A0%94%E7%A9%B6%E7%8D%8E-%E5%8A%A9%E5%B1%95%E7%8F%BE%E7%84%A1%E9%99%90%E7%A7%91%E5%AD%B8%E6%BD%9B%E5%8A%9B-045123035.html",
    source: "Yahoo新聞",
    season: "2024-2025",
    category: "research",
    date: "2024-12"
  },
  {
    title: "3-1新北與美國紐澤西州合作 跨校交流建立國際夥伴關係 (教廣)",
    url: "https://www.ner.gov.tw/news/67722d4dbeeac8002367d14b",
    source: "國立教育廣播電台",
    season: "2024-2025",
    category: "research",
    date: "2024-12"
  },

  // -- AI圓夢 --
  {
    title: "1-1新北「圓夢D-Maker」揭曉 5校學子勇闖社會議題 (中時)",
    url: "https://www.chinatimes.com/realtimenews/20241230003431-260405?chdtv",
    source: "中時新聞網",
    season: "2024-2025",
    category: "dream",
    date: "2024-12"
  },
  {
    title: "1-2新北圓夢計畫 用創意關懷社會 (中時)",
    url: "https://www.chinatimes.com/newspapers/20241231000541-260107?chdtv",
    source: "中時報系",
    season: "2024-2025",
    category: "dream",
    date: "2024-12"
  },
  {
    title: "1-3圓夢D-Maker落幕 5組入選 (自由)",
    url: "https://news.ltn.com.tw/news/NewTaipei/paper/1684950",
    source: "自由時報",
    season: "2024-2025",
    category: "dream",
    date: "2024-12"
  },
  {
    title: "1-4 VERY GOOD! 新北圓夢計畫揭曉23 萬總獎金得主 青年實踐社會議題展現創意 (風傳媒)",
    url: "https://www.storm.mg/localarticle/5301321",
    source: "風傳媒",
    season: "2024-2025",
    category: "dream",
    date: "2024-12"
  },
  {
    title: "1-5新北夢想資助計畫 5隊出爐 (Yahoo新聞)",
    url: "https://tw.news.yahoo.com/%E6%96%B0%E5%8C%97%E5%A4%A5%E5%A5%A7%E8%B3%87%E8%A8%88%E7%95%AB-5%E9%9A%8A%E5%87%BA%E7%88%90-124155830.html",
    source: "Yahoo新聞",
    season: "2024-2025",
    category: "dream",
    date: "2024-12"
  },
  {
    title: "1-1今年新增AI類別 新北高中職圓夢計畫開放報名(聯合)",
    url: "https://udn.com/news/story/6885/8858744",
    source: "聯合新聞網",
    season: "2024-2025",
    category: "dream",
    date: "2024-06"
  },
  {
    title: "1-2新北啟動高中職圓夢計畫 增設AI創夢(國語)",
    url: "https://www.mdnkids.com/search_content.asp?sn=22212&keyword_=%E6%96%B0%E5%8C%97",
    source: "國語日報",
    season: "2024-2025",
    category: "dream",
    date: "2024-06"
  },
  {
    title: "1-3 新北圓夢計畫第三屆啟動 邀青年提案實踐夢想(教廣)",
    url: "https://www.ner.gov.tw/news/686cd4e94996c700233e93f0",
    source: "國立教育廣播電台",
    season: "2024-2025",
    category: "dream",
    date: "2024-06"
  },
  {
    title: "1-4 新北圓夢計畫第三屆啟動 邀青年提案實踐夢想(Yahoo新聞)",
    url: "https://tw.news.yahoo.com/%E6%96%B0%E5%8C%97%E5%9C%93%E5%A4%A2%E8%A8%88%E7%95%AB%E7%AC%AC%E4%B8%89%E5%B1%86%E5%95%9F%E5%8B%95-%E9%82%80%E9%9D%92%E5%B9%B4%E6%8F%90%E6%A1%88%E5%AF%A6%E8%B8%90%E5%A4%A2%E6%83%B3-083045224.html",
    source: "Yahoo新聞",
    season: "2024-2025",
    category: "dream",
    date: "2024-06"
  },

  // ==========================================
  // 2023-2024 賽季 (5篇)
  // ==========================================
  {
    title: "【自由時報】全國第一隊 樹林高中機器人團隊4月中將前進休士頓競逐世界冠軍",
    url: "https://news.ltn.com.tw/news/life/breakingnews/4617019",
    source: "自由時報",
    season: "2023-2024",
    category: "world",
    date: "2024-03"
  },
  {
    title: "【YAHOO新聞】樹林高中FRC澳洲區域賽全明星新秀獎前進休士頓世界賽",
    url: "https://ynews.page.link/DJPBc",
    source: "Yahoo新聞",
    season: "2023-2024",
    category: "regional",
    date: "2024-03"
  },
  {
    title: "【台灣好新聞】樹林高中 FRC 澳洲區域賽全明星新秀獎 前進休士頓世界賽",
    url: "https://news.owlting.com/articles/645165",
    source: "台灣好新聞",
    season: "2023-2024",
    category: "regional",
    date: "2024-03"
  },
  {
    title: "【理財周刊】樹林高中FRC澳洲區域賽全明星新秀獎 前進休士頓世界賽",
    url: "https://www.moneyweekly.com.tw/ArticleData/Info/Article/140502",
    source: "理財周刊",
    season: "2023-2024",
    category: "regional",
    date: "2024-03"
  },
  {
    title: "【LINE TODAY】樹林高中FRC澳洲區域賽全明星新秀獎 前進休士頓世界賽",
    url: "https://liff.line.me/1454987169-1WAXAP3K/v2/article/7NRl6Kn?utm_source=lineshare",
    source: "LINE TODAY",
    season: "2023-2024",
    category: "regional",
    date: "2024-03"
  }
];

// 分頁設定與狀態
let currentFilter = "all";
let currentSeason = "all";
let visibleCount = 9;
const CARDS_PER_PAGE = 9;

// 當頁面加載完成時啟動
document.addEventListener("DOMContentLoaded", () => {
  initNewsPage();
});

function initNewsPage() {
  renderFilters();
  renderNews();
  setupEventListeners();
}

// 渲染篩選控制 Tabs
function renderFilters() {
  const container = document.getElementById("news-filters-placeholder");
  if (!container) return;

  container.innerHTML = `
    <div class="filter-tabs-container">
      <div class="filter-group">
        <span class="filter-label">依賽季篩選</span>
        <div class="filter-tabs" id="season-tabs">
          <button class="filter-tab active" data-season="all">全部賽季</button>
          <button class="filter-tab" data-season="2025-2026">2025-2026 賽季</button>
          <button class="filter-tab" data-season="2024-2025">2024-2025 賽季</button>
          <button class="filter-tab" data-season="2023-2024">2023-2024 賽季</button>
        </div>
      </div>
      
      <div class="filter-group" style="margin-top: 15px;">
        <span class="filter-label">依主題分類</span>
        <div class="filter-tabs" id="category-tabs">
          <button class="filter-tab active" data-category="all">全部主題</button>
          <button class="filter-tab" data-category="world">晉級世界賽</button>
          <button class="filter-tab" data-category="regional">區域大賽/區賽</button>
          <button class="filter-tab" data-category="education">特殊選才/科展</button>
          <button class="filter-tab" data-category="dream">AI圓夢計畫</button>
        </div>
      </div>
    </div>
  `;
}

// 動態生成並渲染新聞卡片
function renderNews() {
  const grid = document.getElementById("dynamic-news-grid");
  const loadMoreBtn = document.getElementById("load-more-btn");
  if (!grid) return;

  // 根據篩選條件過濾資料
  const filteredData = NEWS_DATA.filter(item => {
    const seasonMatch = currentSeason === "all" || item.season === currentSeason;
    let categoryMatch = false;

    if (currentFilter === "all") {
      categoryMatch = true;
    } else if (currentFilter === "education") {
      categoryMatch = item.category === "education" || item.category === "research";
    } else {
      categoryMatch = item.category === currentFilter;
    }

    return seasonMatch && categoryMatch;
  });

  // 如果沒有任何符合的報導
  if (filteredData.length === 0) {
    grid.innerHTML = `
      <div class="no-news-message" style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; color: var(--text-gray); font-size: 1.1rem; background: var(--bg-card); border-radius: 12px; border: var(--border-glow);">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="width: 48px; height: 48px; margin-bottom: 16px; stroke: var(--primary-yellow); opacity: 0.8;">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="12"></line>
          <line x1="12" y1="16" x2="12.01" y2="16"></line>
        </svg>
        <p>目前尚無該篩選條件下的新聞報導，敬請期待後續精彩動態！</p>
      </div>
    `;
    if (loadMoreBtn) loadMoreBtn.style.display = "none";
    return;
  }

  // 截取當前應顯示的長度
  const displayData = filteredData.slice(0, visibleCount);
  
  // 生成卡片 HTML
  grid.innerHTML = displayData.map((item, index) => {
    // 優先使用該篇新聞指定的專屬照片，若無則自動指派一張真實影片縮圖 (維護極簡防呆設計)
    const coverImage = item.image || PREMIUM_IMAGES[(index + item.title.length) % PREMIUM_IMAGES.length];
    
    // 主題中文化標籤
    let categoryTag = "團隊新聞";
    if (item.category === "world") categoryTag = "🏆 晉級世界賽";
    else if (item.category === "regional") categoryTag = "🤖 區域賽獲獎";
    else if (item.category === "education") categoryTag = "🎓 特殊選才";
    else if (item.category === "research") categoryTag = "🔬 學生科研";
    else if (item.category === "dream") categoryTag = "✨ AI 圓夢計畫";

    return `
      <a href="${item.url}" target="_blank" rel="noopener noreferrer" class="news-card reveal active" style="display: flex; flex-direction: column;">
        <div class="news-card-image-wrapper">
          <img src="${coverImage}" class="news-card-img" alt="${item.title}" loading="lazy">
          <span class="news-card-tag">${categoryTag}</span>
        </div>
        <div class="news-card-body">
          <div class="news-card-meta">
            <span class="news-card-source">${item.source}</span>
            <span class="news-card-date">${item.date || item.season}</span>
          </div>
          <h3 class="news-card-title">${item.title}</h3>
          <span class="news-card-link-text">閱讀完整報導 
            <svg viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round" style="width: 14px; height: 14px; stroke: var(--primary-yellow); stroke-width: 2.5;"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
          </span>
        </div>
      </a>
    `;
  }).join("");

  // 觸發 scroll 動畫監聽 (結合既有的 main.js 卷動顯現功能)
  if (window.reveal) {
    window.reveal();
  }

  // 控管「載入更多」按鈕的顯示狀態
  if (loadMoreBtn) {
    if (visibleCount >= filteredData.length) {
      loadMoreBtn.style.display = "none";
    } else {
      loadMoreBtn.style.display = "inline-flex";
    }
  }
}

// 綁定動態事件監聽
function setupEventListeners() {
  // 監聽賽季 Tabs
  document.addEventListener("click", (e) => {
    const seasonTab = e.target.closest("#season-tabs .filter-tab");
    if (seasonTab) {
      document.querySelectorAll("#season-tabs .filter-tab").forEach(tab => tab.classList.remove("active"));
      seasonTab.classList.add("active");
      currentSeason = seasonTab.getAttribute("data-season");
      visibleCount = CARDS_PER_PAGE; // 重置顯示頁數
      renderNews();
    }
  });

  // 監聽主題 Tabs
  document.addEventListener("click", (e) => {
    const categoryTab = e.target.closest("#category-tabs .filter-tab");
    if (categoryTab) {
      document.querySelectorAll("#category-tabs .filter-tab").forEach(tab => tab.classList.remove("active"));
      categoryTab.classList.add("active");
      currentFilter = categoryTab.getAttribute("data-category");
      visibleCount = CARDS_PER_PAGE; // 重置顯示頁數
      renderNews();
    }
  });

  // 監聽「載入更多」按鈕
  const loadMoreBtn = document.getElementById("load-more-btn");
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener("click", () => {
      visibleCount += CARDS_PER_PAGE;
      renderNews();
    });
  }
}
