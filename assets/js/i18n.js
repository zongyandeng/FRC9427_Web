// i18n.js - FRC 9427 官方網站全新多國語言 (i18n) 翻譯引擎
// 基於您設定之 Fallback 安全機制、Console 紅字開發警告防呆機制實作。

// 支援的語系與內建快取預設翻譯字典
// 包含內建核心英文語系，能 100% 避免在 file:/// 本地雙擊開啟時遭遇瀏覽器 CORS 跨來源存取安全限制，提供終極高可用性！
const translations = {
  zh: null, // 繁體中文（直接還原 HTML 原生中文）
  en: {
        "nav": {
            "home": "Home",
            "news": "News & Awards",
            "resources": "Rookie Resources",
            "robots": "Robots",
            "sponsors": "Sponsors",
            "contact": "Contact Us"
        },
        "footer": {
            "desc": "Official website of New Taipei Municipal Shulin High School Robotics Team. Inspiring engineering creativity, exploring robotics technology, shaping future leaders.",
            "quickLinks": "Quick Links",
            "resourcesLib": "Rookie Resources",
            "robotsGallery": "Robot Gallery",
            "sponsorsCollab": "Sponsorship",
            "contactTitle": "Contact Info",
            "email": "Email:",
            "address": "Address: No. 216, Da'an Rd., Shulin Dist., New Taipei City",
            "school": "School: New Taipei Municipal Shulin High School"
        },
        "hero": {
            "titleSchool": "New Taipei Municipal Shulin High School",
            "titleTeam": "FRC 9427 iDeer",
            "titleSuffix": "Robotics Team",
            "subtitle": "We are a technology team named after 'iDeer' (Creative Deer). Through building mechanisms, programming control logic, and promoting STEM education, we showcase high school students' creativity and infinite potential on the global FIRST stage!",
            "btnResources": "Explore Rookie Resources",
            "btnSupport": "Support Us / Sponsorship"
        },
        "highlights": {
            "title": "Video Highlights & Team Records",
            "desc": "Through exciting videos, witness the passionate journey and achievements of Team iDeer in developing robots and promoting STEM!",
            "watchNow": "Watch Now",
            "v1": {
                "title": "2026 FRC 9427 iDeer Impact Video"
            },
            "v2": {
                "title": "FRC 9427 | 2025 Season Records | SLSH iDEER"
            },
            "v3": {
                "title": "FIRST Team 9427 - Impact Video 2025"
            },
            "v4": {
                "title": "Team 9427 iDEER - 2025 REEFSCAPE Robot in 5 weeks"
            },
            "v5": {
                "title": "Like A Deer Music Video (2024 Southern Cross Regional)"
            },
            "v6": {
                "title": "SLSH FRC 9427 - Like a Deer MV (Pre-Season)"
            },
            "v7": {
                "title": "2025 New Taipei FRC Rookie Cup Opening Video"
            },
            "v8": {
                "title": "2024 FRC Robotics Taiwan Off-Season Recap Video"
            },
            "v9": {
                "title": "2024 FRC Robotics Taiwan Off-Season Promo Video"
            }
        },
        "values": {
            "tag": "Core Values",
            "title": "iDEER Core Values",
            "desc": "\"iDEER\" is not just our team name, but also the code of conduct and oath to society for every member. Click or hover on the letters below to explore our spiritual core:",
            "inspire": "Inspire",
            "develop": "Develop",
            "express": "Express",
            "empower": "Empower",
            "remember": "Remember",
            "inspireTitle": "Inspire",
            "inspireSub": "I will inspire myself and others by being prepared for new opportunities.",
            "inspireDesc": "We believe that influence comes from leading by example. At iDeer, we encourage everyone to equip themselves at all times, to bravely take the first step when facing sudden engineering challenges and learning opportunities, and to inspire our partners around us to move forward.",
            "developTitle": "Develop",
            "developSub": "I will develop my abilities, being strong and kind to everyone.",
            "developDesc": "The refinement of individual talent and the strength of the team are never built on arrogance. We learn to become strong on the path of engineering, programming, and project management, but we always maintain the greatest goodwill, patience, and tenderness towards rookies and everyone around us.",
            "expressTitle": "Express",
            "expressSub": "I will express being humble, responsible, and polite in everything I do.",
            "expressDesc": "On the FIRST stage, every word and action of the team members represents the team's brand. We require ourselves to integrate \"professionalism and politeness\" and \"responsibility\" into our daily behaviors, learning from others' strengths with extreme humility, and bravely assuming our own responsibilities.",
            "empowerTitle": "Empower",
            "empowerSub": "I will empower everyone around me by offering help and support whenever I can.",
            "empowerDesc": "The endowment of ability is not to show off oneself, but to illuminate others. Whether in the pit area of the competition or in local science communities, as long as we have sufficient knowledge and resources, iDeer is always happy to provide enthusiastic and selfless assistance to other teams or rookies stuck in difficulties.",
            "rememberTitle": "Remember",
            "rememberSub": "I will remember to say \"thank you\" and take nothing for granted.",
            "rememberDesc": "Every sponsorship, every guidance, and every support from parents and the school are backed by the silent dedication of countless people. We always keep \"gratitude\" in our hearts and say it out loud, being grateful for the resources we have, and cherishing every happy moment of playing and researching."
        },
        "impact": {
            "title": "Social Return & Influence",
            "desc": "We put the tenets of iDEER into practical action, striving to promote STEM popular science education, implement caring for the disadvantaged, and warm our society with gentle light.",
            "c1": {
                "title": "Girls in Tech Camps",
                "desc": "Breaking traditional stereotypes, we plan and host exclusive technology camps for girls, encouraging more female students from local middle and high schools to touch 3D modeling, mechanism design, and programming to cultivate future female STEM leaders."
            },
            "c2": {
                "title": "AI Assistive Device Dev",
                "desc": "Believing in tech with a warm heart, we combine AI image recognition and voice synthesis to develop exclusive tactile and visual assistive devices for special education schools, utilizing innovation to overcome physical barriers."
            },
            "c3": {
                "title": "Supporting Rookie Teams",
                "desc": "As FIRST technology mentors, we are happy to share Onshape design, WPILib sample code, and public relations experience. We actively visit other schools to help multiple rookie teams smoothly organize and compete."
            }
        },
        "hubs": {
            "title": "Explore Our Website",
            "desc": "Delve deeper into Team iDeer's operations, learning resources, and achievements through the sections below.",
            "c1": {
                "title": "News & Awards",
                "desc": "Track our honored battle achievements, school, and social news reports, and celebrate every growth moment with us.",
                "link": "Go to News Timeline"
            },
            "c2": {
                "title": "Rookie Resources",
                "desc": "Specially compiled introductory and advanced learning materials for FRC rookies and enthusiasts, covering CAD, WPILib, and assembly.",
                "link": "Get Engineering Library"
            },
            "c3": {
                "title": "Robot Gallery",
                "desc": "Showcasing our past years' hard work. Detailed breakdown of manipulators, intakes, chassis control, and season strategy specs.",
                "link": "View Robot Gallery"
            }
        },
        "index": {
            "sponsors": {
                "title": "Sponsorship Partners",
                "desc": "Deep gratitude to all enterprises and mentors who fully support our journey. You light up high school students' science and engineering dreams!",
                "btn": "Become Our Sponsor / Request Proposals"
            }
        },
        "about": {
            "title": "About Our Team",
            "desc": "iDeer represents the perfect combination of intelligence and creativity. Founded in New Taipei Municipal Shulin High School, we are dedicated to transforming academic theories into practical robotics engineering.",
            "missionTitle": "Our Mission",
            "missionDesc": "By participating in the FIRST Robotics Competition (FRC), we cultivate members' multi-faceted skills in mechanical design, electrical engineering, software programming, public relations, marketing, and project management. In the spirit of mutual cooperation, we achieve cross-disciplinary excellence.",
            "spiritTitle": "iDeer Creative Spirit",
            "spiritDesc": "\"iDeer\" is derived from \"Idea\" (creativity) and \"Deer\" (the representative animal of Shulin High School). It symbolizes agile thinking like a deer and fearless exploration spirit, always keeping continuous sparks of innovation when facing complex mechanisms and control logic challenges.",
            "badgeTitle": "Our Badge Concept",
            "badgeDesc": "Every geometric element of our team badge represents our care for the environment and pursuit of technological innovation.",
            "badgeConcept1Title": "The Deer - Eco-Tech Coexistence",
            "badgeConcept1Desc": "Taking the \"Deer\" image as the brand concept, inspired by the constructed wetland near our school——\"Lujiao Creek\". We expect members to learn how to feedback their knowledge to the natural environment while exploring technology, achieving sustainable coexistence of human, machine, and ecology.",
            "badgeConcept2Title": "The Leaf - Green Sustainability Commitment",
            "badgeConcept2Desc": "The \"Leaf\" in our badge conveys our team's green commitment in engineering and R&D. We persist in deep-rooting green energy, eco-friendly materials, energy-saving technologies, and environmental sustainability in our annual competition robot development and design principles.",
            "badgeConcept3Title": "The Bulb - Creative & Innovative Thinking",
            "badgeConcept3Desc": "The \"Bulb\" in our badge symbolizes sparks of thought and dissemination of wisdom. It reflects the team's pursuit of innovative thinking, and keeping endless passion, exploration, and dedication when facing tough mechanical control issues."
        },
        "sponsors": {
            "title": "Become Our Partner",
            "desc": "FRC competitions require substantial funding for mechanism materials, electronics procurement, and travel for international matches. Your support will be our strongest backing on the global stage!",
            "p1": {
                "title": "Corporate Brand Exposure",
                "desc": "Your corporate logo will be printed prominently on our competition robots, team uniforms, banners, and official website, receiving high-density brand exposure at major events and media platforms."
            },
            "p2": {
                "title": "Implementing CSR & ESG",
                "desc": "Support local high school engineering education and nurture future technology leaders. Your sponsorship perfectly implements the corporate commitment to educational development and social inclusion (CSR/ESG)."
            },
            "p3": {
                "title": "Deep Tech Exchange",
                "desc": "We embrace the engineering notebook spirit and are happy to share structural details and autonomous algorithms with sponsors. Through interacting with hands-on high schoolers, enterprises can discover potential engineering talents."
            },
            "listTitle": "Annual Sponsorship Partners",
            "listDesc": "Thanking all honorary groups and enterprises who have supported us. Your names will be engraved on the robot to fight alongside us!",
            "tier": {
                "titanium": "Titanium Partners (NT$100,000+)",
                "gold": "Gold Partners (NT$5,000+)",
                "silver": "Silver Partners (NT$20,000+)",
                "bronze": "Bronze & Affiliated Partners"
            },
            "partners": {
                "slshPa": "SLSH Parents Association",
                "ntpcEdu": "Education Bureau, NTPC",
                "ideerFund": "iDeer Project Fund"
            },
            "ctaTitle": "Request FRC 9427 Annual Sponsorship Proposal",
            "ctaDesc": "We are delighted to visit your enterprise for robot live demonstrations and presentations. Click below to contact us for proposal details!",
            "ctaBtn": "Get In Touch With Us"
        },
        "resources": {
            "title": "Rookie Engineering Resources",
            "desc": "Joining FRC is a challenging journey. We have compiled our accumulated engineering experience to help new members and peers quickly master core skills!",
            "tabAll": "All Resources",
            "tabProg": "Programming",
            "tabCad": "3D CAD Design",
            "tabElec": "Electronics",
            "tabMech": "Mechanical Assembly",
            "tabRules": "Game Rules & Safety",
            "r1": {
                "category": "Programming / Java",
                "title": "Introduction to WPILib Robot Control",
                "desc": "Introduction to FRC's official WPILib library. Learn how to control drivetrain motors, read limit switches, and set up basic pneumatics control logic using Java.",
                "difficulty": "Difficulty: Beginner",
                "tag": "Self-Study Guide"
            },
            "r2": {
                "category": "3D Design / Onshape",
                "title": "Onshape Cloud Modeling Guide",
                "desc": "Fundamentals of browser-based modeling in Onshape. Familiarize yourself with sketching, extruding features, and assembling standard FRC gearboxes and brackets.",
                "difficulty": "Difficulty: Beginner",
                "tag": "Video Tutorials"
            },
            "r3": {
                "category": "Electronics / Wiring",
                "title": "Standard Specifications for FRC Wiring",
                "desc": "Illustrating standard wiring and insulation for RoboRIO controller, PDP power distribution board, motor controllers, and the Radio with safety guidelines.",
                "difficulty": "Difficulty: Beginner",
                "tag": "PDF Manual"
            },
            "r4": {
                "category": "Mechanical / Transmission",
                "title": "Swerve Drivetrain Assembly & Debugging",
                "desc": "Assembly details of Swerve drive modules. Explaining gear mesh, bearing installation, encoder alignment, and chain tension adjustment techniques.",
                "difficulty": "Difficulty: Intermediate",
                "tag": "Practice Manual"
            },
            "r5": {
                "category": "Programming / Navigation",
                "title": "Autonomous Path Planning via PathPlanner",
                "desc": "In-depth guide to path design during the autonomous phase. How to use PathPlanner to draw spline trajectories and load them into WPILib for execution.",
                "difficulty": "Difficulty: Intermediate",
                "tag": "Core Tech"
            },
            "r6": {
                "category": "Game Rules / Safety",
                "title": "FRC Game Rules & Safety Guidelines",
                "desc": "Explore FIRST game structures, scoring rules, and crucial workshop safety codes (safety glasses, hand protection, and emergency stop switches).",
                "difficulty": "Difficulty: Beginner",
                "tag": "Game Guide"
            }
        },
        "robots": {
            "title": "Past Competition Robots",
            "desc": "Through engineering CAD design, mechanical simulation, and countless physical assembly tests, these are the mechanical crystals of Team iDeer's wisdom and sweat.",
            "spec": {
                "chassis": "Drivetrain",
                "motor": "Motors Power",
                "mechanism": "Core Mechanism",
                "strategy": "Match Strategy"
            },
            "r1": {
                "name": "Artemis (2024)",
                "desc": "'Artemis' is our first flagship competition robot. Equipped with a 4-wheel independent Swerve drive chassis, it glides smoothly through tight obstacles in CRESCENDO. Featuring a multi-angle tilting shooter, it precisely scores Notes into the high Speaker and climbs smoothly at endgame.",
                "specChassis": "Swerve Drive (MK4i)",
                "specMotor": "Kraken X60 & Falcon 500",
                "specMech": "Multi-stage intake & co-axial double-wheel shooter",
                "specStrat": "Speaker shooting & Chain climbing"
            },
            "r2": {
                "name": "Zephyr (2025)",
                "desc": "'Zephyr' represents a significant leap in our design engineering. For the complex 2025 REEFSCAPE tasks, we developed a lightweight 3-stage linear elevator topped with a precise pneumatic claw. This allows agile coral scoring at different REEF levels using high-precision limit switches and closed-loop control.",
                "specChassis": "Swerve Drive (MK4i Swerve)",
                "specMotor": "Neo Brushless Motors",
                "specMech": "Linear lift elevator mechanism & pneumatic claw",
                "specStrat": "REEF Coral fast scoring & Barge climbing"
            }
        },
        "awards": {
            "title": "Team Honors & Awards",
            "desc": "The milestones we wrote together through hard work and cooperation on the field. Gratitude to all members!"
        },
        "news": {
            "sectionTitle": "Media News Reports",
            "sectionDesc": "Excellent coverage of Team iDeer by major mainstream media and all sectors, witnessing our influence on the STEM path.",
            "loadMoreBtn": "Load More Articles",
            "loadMoreAwardsBtn": "View More Awards",
            "timeline": {
                "sectionTag": "History",
                "sectionTitle": "Team Growth Timeline",
                "sectionDesc": "From a simple initial idea to stepping onto the international competition stage, this is the exciting journey we wrote together.",
                "n1": {
                    "date": "September 2023",
                    "title": "iDeer Spark Ignited",
                    "desc": "Supported by SLSH and led by teachers, a group of science-loving students gathered to officially establish FRC team goals, naming it 'iDeer' (Creative Deer).",
                    "photo": "Team Photo (Reserved)"
                },
                "n2": {
                    "date": "November 2023",
                    "title": "Assigned FRC Official Team Number 9427",
                    "desc": "Completed FIRST registration and received our unique number 9427, representing SLSH's passion and the start of our journey to the global arena.",
                    "photo": "Team Photo (Reserved)"
                },
                "n3": {
                    "date": "Jan - Feb 2024",
                    "title": "First Build Season",
                    "desc": "Facing game challenges, team members worked continuously for six weeks on Onshape CAD, WPILib control coding, pneumatics, and wiring to deliver our first robot.",
                    "photo": "Build Season Photo (Reserved)"
                },
                "n4": {
                    "date": "March 2024",
                    "title": "FRC Regional Debut",
                    "desc": "First competing at the FRC Southern Cross Regional in Australia, Team 9427 iDeer demonstrated amazing teamwork and won the Highest Rookie Seed and Rookie All-Star Award.",
                    "photo": "Team on Field (Reserved)"
                },
                "n5": {
                    "date": "April 2024",
                    "title": "First Journey to Houston World Championship",
                    "desc": "As the Rookie All-Star representative from Australia, the team crossed the Pacific to Houston FRC World Championship, expanding our global horizons and tech skills.",
                    "photo": "World Championship Photo (Reserved)"
                },
                "n6": {
                    "date": "December 2024",
                    "title": "Science Fair & Dream Project Recognition",
                    "desc": "Our research won the 'Best Research Award' in New Taipei City Science Fair. The sustainability project was selected for 'Dream D-Maker Plan', securing dream funds for community STEM outreach.",
                    "photo": "Project Presentation (Reserved)"
                },
                "n7": {
                    "date": "Jan - Feb 2025",
                    "title": "2nd Gen Swerve Robot Build Season",
                    "desc": "Entering 2025, our engineering skyrocketed! Developed 'Zephyr' robot, fully adopting Swerve drive high-speed control, and optimized chassis design in Onshape.",
                    "photo": "Robot Dev Photo (Reserved)"
                },
                "n8": {
                    "date": "March 2025",
                    "title": "Awarded Game Industrial Design Award",
                    "desc": "At the 2025 FRC Regional, Team iDeer showed stunning craftsmanship and stability. High-speed performance and assembly quality earned the Industrial Design Award!",
                    "photo": "Award Moment (Reserved)"
                },
                "n9": {
                    "date": "April 2025",
                    "title": "Second Voyage to Houston World Championship",
                    "desc": "Qualified for the World Championship for the second consecutive year! We demonstrated tactical coordination and maturity, proving Taiwan students' STEM inheritance.",
                    "photo": "Houston Match Photo (Reserved)"
                },
                "n10": {
                    "date": "December 2025",
                    "title": "Consecutive Dream D-Maker Plan Winner",
                    "desc": "With excellent proposals to promote STEM popular science and root service in NTPC primary/middle schools, we won the award again, sowing science seeds.",
                    "photo": "STEM Outreach Photo (Reserved)"
                },
                "n11": {
                    "date": "March 2026",
                    "title": "Sweeping Victory at Turkey Regional",
                    "desc": "Competing at the Turkey Bosphorus Regional, our tech fully matured! glided through fields with speed and precision, winning the Regional Finalists and Engineering Inspiration!",
                    "photo": "Turkey Champion Photo (Reserved)"
                },
                "n12": {
                    "date": "May 2026",
                    "title": "Houston World Championship Peak Achievement",
                    "desc": "Traveling to Houston World Finals for the third time, FRC 9427 status reached perfection, winning Regional Finalists, Rising All-Star, and Team Sustainability Awards!",
                    "photo": "Houston Peak Photo (Reserved)"
                }
            }
        },
        "contact": {
            "title": "Contact Team iDeer",
            "desc": "Whether seeking sponsorships, academic exchanges, or joining our team as a member, feel free to reach out via the socials or form below!",
            "socialTitle": "Social Media & Email",
            "socialSubtext": "We regularly share first-hand updates, technical breakthroughs, and team fun on our socials. Follow and like us!",
            "igTitle": "Instagram Official",
            "fbTitle": "Facebook Page",
            "fbName": "SLSH FRC 9427 iDeer",
            "emailTitle": "Official Email",
            "formTitle": "Send Us a Message",
            "nameLabel": "Your Name",
            "namePlaceholder": "Enter your name...",
            "nameError": "Name must be at least 2 characters.",
            "emailLabel": "Email Address",
            "emailPlaceholder": "example@mail.com",
            "emailError": "Please enter a valid email address.",
            "msgLabel": "Your Message",
            "msgPlaceholder": "Write down your requests, cooperation suggestions or any messages...",
            "msgError": "Message must be at least 10 characters.",
            "submitBtn": "Secure Submit Message",
            "modalTitle": "Message Submitted Successfully",
            "modalDesc": "We have received your message! Our public relations team will reply to your proposal as soon as possible via email or social platforms.",
            "modalClose": "Confirm Close"
        }
    }
};

let currentLang = localStorage.getItem('preferred-lang') || 'zh';

// 載入語系 JSON 檔（具備本機 file 協定防呆與網路 Fetch 雙軌保障）
async function loadLanguage(lang) {
  if (lang === 'zh') return {}; // 中文直接使用 HTML 內建預設文字，不需額外發送 Fetch 請求
  
  // 優先嘗試發送 fetch 請求（以動態載入最新 en.json 檔）
  try {
    const response = await fetch(`./locales/${lang}.json`);
    if (response.ok) {
      const externalDict = await response.json();
      // 合併外部載入的翻譯到現有快取中
      translations[lang] = mergeObjects(translations[lang] || {}, externalDict);
      return translations[lang];
    }
  } catch (error) {
    // 捕獲 file:/// 協定的 CORS 跨來源限制錯誤，或網路不可達錯誤
    console.warn(`[i18n] 無法從伺服器載入 ${lang}.json 語系檔，將自動啟用內建預置語系防呆機制。`, error);
  }
  
  // 若 fetch 失敗（如本地雙擊 file:/// 開啟），無縫退回使用內建的快取預設字典，保證絕對可用
  return translations[lang] || {};
}

// 遞迴合併物件輔助函式
function mergeObjects(target, source) {
  for (const key in source) {
    if (source[key] && typeof source[key] === 'object') {
      if (!target[key]) target[key] = {};
      mergeObjects(target[key], source[key]);
    } else {
      target[key] = source[key];
    }
  }
  return target;
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

  // 根據當前語言和網頁檔名翻譯網頁 Title (達成 100% 全面中英文切換體驗)
  const pageTitleMap = {
    zh: {
      'index': 'FRC 9427 iDeer | 新北市立樹林高中機器人隊',
      'news': '歷屆新聞 & 獎項 | FRC 9427 iDeer',
      'resources': '新手資源庫 | FRC 9427 iDeer',
      'robots': '歷屆競賽機器人 | FRC 9427 iDeer',
      'sponsors': '贊助商專區 | FRC 9427 iDeer',
      'contact': '聯繫我們 | FRC 9427 iDeer'
    },
    en: {
      'index': 'FRC 9427 iDeer | SLSH Robotics Team',
      'news': 'News & Awards | FRC 9427 iDeer',
      'resources': 'Rookie Resources | FRC 9427 iDeer',
      'robots': 'Competition Robots | FRC 9427 iDeer',
      'sponsors': 'Sponsors | FRC 9427 iDeer',
      'contact': 'Contact Us | FRC 9427 iDeer'
    }
  };
  const path = window.location.pathname;
  let pageName = path.substring(path.lastIndexOf('/') + 1).replace('.html', '') || 'index';
  if (pageName === '') pageName = 'index';
  if (pageTitleMap[lang] && pageTitleMap[lang][pageName]) {
    document.title = pageTitleMap[lang][pageName];
  }
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
