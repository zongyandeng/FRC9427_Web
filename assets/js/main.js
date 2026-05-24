document.addEventListener('DOMContentLoaded', () => {
  // ==========================================
  // SCROLL EFFECTS & NAVBAR
  // ==========================================
  const header = document.querySelector('header');
  
  const handleScroll = () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
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
});
