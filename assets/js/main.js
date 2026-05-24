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
        // Safe, non-PII, generic developers debug log
        console.log('Form validated successfully.'); 

        // Display premium success overlay modal securely
        if (successModal) {
          successModal.classList.add('active');
        }

        // Reset form safely
        contactForm.reset();
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
    <a href="index.html" class="logo" id="logoLink">
      <!-- Mechanical Robot Deer Head SVG -->
      <svg viewBox="0 0 100 100" aria-label="FRC 9427 iDeer Brand Emblem">
        <!-- Antlers (Gold / Yellow Accent) -->
        <path class="deer-horn" d="M35 35 C25 20, 15 25, 10 15 M30 28 C20 18, 25 10, 18 5 M32 32 C28 25, 32 15, 26 8" stroke-linecap="round" />
        <path class="deer-horn" d="M65 35 C75 20, 85 25, 90 15 M70 28 C80 18, 75 10, 82 5 M68 32 C72 25, 68 15, 74 8" stroke-linecap="round" />
        <!-- Head Base (Charcoal Steel) -->
        <polygon points="50,85 25,50 35,42 50,48 65,42 75,50" stroke="var(--text-white)" stroke-width="2" stroke-linejoin="round" />
        <!-- Forehead Crest (Gold Accent) -->
        <polygon points="50,48 40,44 50,60 60,44" stroke="var(--primary-yellow)" stroke-width="2" fill="var(--primary-yellow-dim)" stroke-linejoin="round" />
        <!-- Glowing Eyes (Cyber Cyan) -->
        <polygon class="deer-glow-eye" points="38,53 43,51 45,55 40,57" />
        <polygon class="deer-glow-eye" points="62,53 57,51 55,55 60,57" />
        <!-- Nose / Mouth Mechanical Detail -->
        <line x1="50" y1="72" x2="50" y2="85" stroke="var(--text-white)" stroke-width="2" />
        <line x1="45" y1="78" x2="55" y2="78" stroke="var(--primary-yellow)" stroke-width="1.5" />
      </svg>
      <div class="logo-text">FRC<span>9427</span></div>
    </a>

    <!-- Hamburger mobile toggle -->
    <button class="hamburger" id="navToggle" aria-label="切換導覽選單">
      <span></span>
      <span></span>
      <span></span>
    </button>

    <!-- Desktop / Mobile Nav Links -->
    <nav class="nav-menu" id="navMenu">
      <a href="index.html" class="nav-link ${isHome}" id="navHome">首頁</a>
      <a href="news.html" class="nav-link ${isNews}" id="navNews">歷屆新聞 / 獎項</a>
      <a href="resources.html" class="nav-link ${isResources}" id="navResources">新手資源</a>
      <a href="robots.html" class="nav-link ${isRobots}" id="navRobots">歷屆機器</a>
      <a href="sponsors.html" class="nav-link ${isSponsors}" id="navSponsors">贊助商專區</a>
      <a href="contact.html" class="btn-nav ${isContact}" id="navContact">聯繫我們</a>
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
        <svg viewBox="0 0 100 100" fill="none" stroke-linecap="round">
          <path d="M35 35 C25 20, 15 25, 10 15 M30 28 C20 18, 25 10, 18 5 M32 32 C28 25, 32 15, 26 8" stroke="var(--primary-yellow)" stroke-width="3" />
          <path d="M65 35 C75 20, 85 25, 90 15 M70 28 C80 18, 75 10, 82 5 M68 32 C72 25, 68 15, 74 8" stroke="var(--primary-yellow)" stroke-width="3" />
          <polygon points="50,85 25,50 35,42 50,48 65,42 75,50" stroke="var(--text-white)" stroke-width="3" />
        </svg>
        <div class="logo-text">FRC<span>9427</span></div>
      </div>
      <p class="footer-desc">新北市立樹林高中機器人隊官方網站。激發工程創意，探索機器人技術，塑造未來領袖。</p>
    </div>

    <div class="footer-links-col">
      <h4>快速連結</h4>
      <ul class="footer-links">
        <li><a href="index.html">首頁</a></li>
        <li><a href="news.html">歷屆新聞 / 獎項</a></li>
        <li><a href="resources.html">新手資源庫</a></li>
        <li><a href="robots.html">歷屆競賽機器</a></li>
        <li><a href="sponsors.html">贊助合作</a></li>
      </ul>
    </div>

    <div class="footer-links-col">
      <h4>聯絡資訊</h4>
      <ul class="footer-links">
        <li>信箱: <a href="mailto:contact@shsh.ntpc.edu.tw">contact@shsh.ntpc.edu.tw</a></li>
        <li>地址: 新北市樹林區大安路216號</li>
        <li>學校: 新北市立樹林高中</li>
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
