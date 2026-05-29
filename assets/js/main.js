document.addEventListener('DOMContentLoaded', () => {
  // ==========================================
  // DYNAMIC COMPONENT INJECTION (DRY Refactoring)
  // ==========================================
  injectHeaderAndFooter();

  // ==========================================
  // SCROLL EFFECTS & NAVBAR
  // ==========================================
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
  handleScroll(); // Trigger immediately in case page is refreshed while scrolled down

  // ==========================================
  // MOBILE NAVIGATION DRAWER
  // ==========================================
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      navMenu.classList.toggle('open');
    });

    // Close menu when clicking navigation links
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navMenu.classList.remove('open');
      });
    });
  }

  // ==========================================
  // ENTRANCE SCROLL REVEAL ANIMATIONS
  // ==========================================
  const revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window && revealElements.length > 0) {
    const observerOptions = {
      root: null, // viewport
      threshold: 0.15, // trigger when 15% of element is visible
      rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target); // Stop observing once animated
        }
      });
    }, observerOptions);

    revealElements.forEach(element => {
      revealObserver.observe(element);
    });
  } else {
    // Fallback if browser doesn't support IntersectionObserver
    revealElements.forEach(element => {
      element.classList.add('active');
    });
  }

  // ==========================================
  // RESOURCE CATEGORIES INTERACTIVE FILTER
  // ==========================================
  const tabButtons = document.querySelectorAll('.tab-btn');
  const resourceItems = document.querySelectorAll('.resource-item');

  if (tabButtons.length > 0 && resourceItems.length > 0) {
    tabButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Toggle active class on buttons
        tabButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const selectedCategory = button.getAttribute('data-filter');

        resourceItems.forEach(item => {
          const itemCategory = item.getAttribute('data-category');

          if (selectedCategory === 'all' || itemCategory === selectedCategory) {
            item.classList.remove('hidden');
          } else {
            item.classList.add('hidden');
          }
        });
      });
    });
  }

  // ==========================================
  // SECURE CONTACT FORM VALIDATION & MODAL
  // ==========================================
  const contactForm = document.getElementById('contactForm');
  const successModal = document.getElementById('successModal');
  const closeModalBtn = document.getElementById('closeModalBtn');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault(); // Stop default form submit to handle client-side securely
      
      let isFormValid = true;

      // Validate Name
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

      // Validate Email
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

      // Validate Message
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
        // 讀取 Web3Forms Access Key
        const accessKeyInput = contactForm.querySelector('input[name="access_key"]');
        const hasAccessKey = accessKeyInput && accessKeyInput.value && accessKeyInput.value.trim() !== 'YOUR_ACCESS_KEY_HERE';

        if (hasAccessKey) {
          const isEn = document.documentElement.lang === 'en';
          
          // 顯示提交中狀態 (提升使用者體驗)
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
          // 加入一些預設欄位供 Web3Forms 郵件格式化使用
          formData.append('subject', isEn ? 'New Contact Message - FRC 9427 Web' : '新聯絡訊息 - FRC 9427 官方網站');
          formData.append('from_name', nameInput.value.trim());

          fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            body: formData
          })
          .then(response => response.json())
          .then(data => {
            // 還原按鈕狀態
            if (submitBtn) {
              submitBtn.disabled = false;
              if (submitBtnSpan) submitBtnSpan.innerText = originalText;
              submitBtn.style.opacity = '';
              submitBtn.style.cursor = '';
            }

            if (data.success) {
              // 成功發送：顯示彈出視窗並重置表單
              if (successModal) {
                successModal.classList.add('active');
              }
              contactForm.reset();
            } else {
              alert(isEn ? ('Failed to send message: ' + (data.message || 'Unknown error')) : ('發送郵件失敗：' + (data.message || '未知錯誤')));
            }
          })
          .catch(error => {
            // 還原按鈕狀態
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
          // 模擬成功模式 (沒有填寫 Access Key)
          console.log('Form validated successfully (Simulation Mode).'); 

          // 顯示成功彈窗
          if (successModal) {
            successModal.classList.add('active');
          }

          // 重設表單
          contactForm.reset();
        }
      }
    });
  }

  // Close success modal securely
  if (closeModalBtn && successModal) {
    closeModalBtn.addEventListener('click', () => {
      successModal.classList.remove('active');
    });

    // Close on click outside modal content
    successModal.addEventListener('click', (e) => {
      if (e.target === successModal) {
        successModal.classList.remove('active');
      }
    });
  }

  // Helper validation styling functions
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

  // ==========================================
  // DYNAMIC HEADER AND FOOTER INJECTION LOGIC
  // ==========================================
  function injectHeaderAndFooter() {
    const headerPlaceholder = document.getElementById('header-placeholder');
    const footerPlaceholder = document.getElementById('footer-placeholder');

    if (headerPlaceholder) {
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

    <!-- Hamburger mobile toggle -->
    <button class="hamburger" id="navToggle" aria-label="切換導覽選單">
      <span></span>
      <span></span>
      <span></span>
    </button>

    <!-- Desktop / Mobile Nav Links -->
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
