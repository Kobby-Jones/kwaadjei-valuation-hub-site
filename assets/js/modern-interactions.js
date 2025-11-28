/* ========================================
   KWAADJEI VALUATION HUB - MODERN JS
   Interactive Features & Animations
   ======================================== */

(function($) {
  'use strict';

  /* ============================================
     1. PRELOADER
     ============================================ */
  $(window).on('load', function() {
    $('#js-preloader').delay(350).fadeOut('slow', function() {
      $(this).addClass('loaded');
    });
  });

  /* ============================================
     2. STICKY HEADER
     ============================================ */
  $(window).on('scroll', function() {
    const scroll = $(window).scrollTop();
    const header = $('.header-area');
    
    if (scroll >= 80) {
      header.addClass('header-sticky');
    } else {
      header.removeClass('header-sticky');
    }
  });

  /* ============================================
     3. MOBILE MENU TOGGLE
     ============================================ */
  $('.menu-trigger').on('click', function() {
    $(this).toggleClass('active');
    $('.nav').toggleClass('active');
    $('body').toggleClass('menu-open');
  });

  // Close menu when clicking outside
  $(document).on('click', function(e) {
    if (!$(e.target).closest('.main-nav').length) {
      $('.menu-trigger').removeClass('active');
      $('.nav').removeClass('active');
      $('body').removeClass('menu-open');
    }
  });

  // Close menu when clicking a link
  $('.nav li a').on('click', function() {
    if ($(window).width() < 992) {
      $('.menu-trigger').removeClass('active');
      $('.nav').removeClass('active');
      $('body').removeClass('menu-open');
    }
  });

  /* ============================================
     4. SMOOTH SCROLLING FOR ANCHOR LINKS
     ============================================ */
  $('a[href*="#"]').not('[href="#"]').not('[href="#0"]').on('click', function(e) {
    if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') &&
        location.hostname === this.hostname) {
      
      let target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      
      if (target.length) {
        e.preventDefault();
        const headerHeight = $('.header-area').outerHeight() || 80;
        
        $('html, body').animate({
          scrollTop: target.offset().top - headerHeight
        }, 800, 'swing');
      }
    }
  });

  /* ============================================
     5. SCROLL ANIMATIONS (FADE IN ON SCROLL)
     ============================================ */
  const animateOnScroll = () => {
    const elements = document.querySelectorAll('.fade-in-up, .slide-in-right');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });
    
    elements.forEach(element => {
      element.style.opacity = '0';
      element.style.transform = 'translateY(30px)';
      element.style.transition = 'all 0.8s ease';
      observer.observe(element);
    });
  };

  // Initialize scroll animations
  if ('IntersectionObserver' in window) {
    animateOnScroll();
  }

  /* ============================================
     6. ACTIVE MENU ITEM ON SCROLL
     ============================================ */
  $(window).on('scroll', function() {
    const scrollPos = $(window).scrollTop() + 100;
    
    $('.nav li a').each(function() {
      const currLink = $(this);
      const refElement = $(currLink.attr('href'));
      
      if (refElement.length && 
          refElement.position().top <= scrollPos && 
          refElement.position().top + refElement.height() > scrollPos) {
        $('.nav li a').removeClass('active');
        currLink.addClass('active');
      }
    });
  });

  /* ============================================
     7. COUNTER ANIMATION (IF YOU ADD STATS)
     ============================================ */
  const animateCounter = (element, start, end, duration) => {
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        element.textContent = end.toLocaleString();
        clearInterval(timer);
      } else {
        element.textContent = Math.floor(current).toLocaleString();
      }
    }, 16);
  };

  // Initialize counters when visible
  const initCounters = () => {
    const counters = document.querySelectorAll('.counter');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          const target = parseInt(counter.getAttribute('data-target'));
          animateCounter(counter, 0, target, 2000);
          observer.unobserve(counter);
        }
      });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => observer.observe(counter));
  };

  if ('IntersectionObserver' in window) {
    initCounters();
  }

  /* ============================================
     8. FORM VALIDATION
     ============================================ */
  const validateForm = (form) => {
    let isValid = true;
    
    form.find('input[required], textarea[required]').each(function() {
      const field = $(this);
      const value = field.val().trim();
      
      // Remove previous error
      field.removeClass('error');
      field.next('.error-message').remove();
      
      if (!value) {
        isValid = false;
        field.addClass('error');
        field.after('<span class="error-message" style="color: red; font-size: 0.875rem; display: block; margin-top: 0.25rem;">This field is required</span>');
      } else if (field.attr('type') === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          isValid = false;
          field.addClass('error');
          field.after('<span class="error-message" style="color: red; font-size: 0.875rem; display: block; margin-top: 0.25rem;">Please enter a valid email</span>');
        }
      }
    });
    
    return isValid;
  };

  // Contact form submission
  $('form#reservation-form').on('submit', function(e) {
    e.preventDefault();
    
    if (validateForm($(this))) {
      // Here you would normally send the form data to your server
      // For now, we'll just show a success message
      
      const formData = {
        name: $('#Name').val(),
        email: $('#Email').val(),
        phone: $('#Phone').val(),
        subject: $('#Subject').val(),
        message: $('#Message').val()
      };
      
      console.log('Form submitted:', formData);
      
      // Show success message
      $(this).html(`
        <div style="text-align: center; padding: 2rem; background: #f0f9f4; border-radius: 0.5rem;">
          <i class="fa fa-check-circle" style="font-size: 3rem; color: #4caf50; margin-bottom: 1rem;"></i>
          <h3 style="color: #1b5e20; margin-bottom: 0.5rem;">Thank You!</h3>
          <p style="color: #333;">Your message has been received. We'll get back to you within 24 hours.</p>
        </div>
      `);
    }
  });

  /* ============================================
     9. BACK TO TOP BUTTON
     ============================================ */
  const backToTop = $('<button>', {
    id: 'back-to-top',
    html: '<i class="fa fa-arrow-up"></i>',
    css: {
      position: 'fixed',
      bottom: '30px',
      right: '30px',
      width: '50px',
      height: '50px',
      background: 'linear-gradient(135deg, #1b5e20 0%, #2e7d32 100%)',
      color: '#fff',
      border: 'none',
      borderRadius: '50%',
      cursor: 'pointer',
      display: 'none',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '1.2rem',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
      zIndex: '999',
      transition: 'all 0.3s ease'
    }
  });

  $('body').append(backToTop);

  $(window).on('scroll', function() {
    if ($(this).scrollTop() > 300) {
      $('#back-to-top').fadeIn().css('display', 'flex');
    } else {
      $('#back-to-top').fadeOut();
    }
  });

  $('#back-to-top').on('click', function() {
    $('html, body').animate({ scrollTop: 0 }, 800);
  });

  $('#back-to-top').hover(
    function() {
      $(this).css({
        transform: 'translateY(-5px)',
        boxShadow: '0 8px 20px rgba(0, 0, 0, 0.25)'
      });
    },
    function() {
      $(this).css({
        transform: 'translateY(0)',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
      });
    }
  );

  /* ============================================
     10. LAZY LOADING IMAGES
     ============================================ */
  const lazyLoadImages = () => {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          imageObserver.unobserve(img);
        }
      });
    });
    
    images.forEach(img => imageObserver.observe(img));
  };

  if ('IntersectionObserver' in window) {
    lazyLoadImages();
  }

  /* ============================================
     11. PARALLAX EFFECT FOR HERO SECTIONS
     ============================================ */
  $(window).on('scroll', function() {
    const scrolled = $(window).scrollTop();
    $('.hero-banner').css('background-position', 'center ' + (scrolled * 0.5) + 'px');
  });

  /* ============================================
     12. CARD HOVER EFFECTS ENHANCEMENT
     ============================================ */
  $('.card, .item, .service-card, .experience-card, .team-card').hover(
    function() {
      $(this).css({
        transform: 'translateY(-8px)',
        transition: 'all 0.3s ease'
      });
    },
    function() {
      $(this).css({
        transform: 'translateY(0)',
        transition: 'all 0.3s ease'
      });
    }
  );

  /* ============================================
     13. SEARCH FUNCTIONALITY (FOR BLOG)
     ============================================ */
  $('.search-widget form').on('submit', function(e) {
    e.preventDefault();
    const searchTerm = $(this).find('input[type="text"]').val().toLowerCase();
    
    // This would normally send a request to search
    // For demo, we'll filter visible posts
    console.log('Searching for:', searchTerm);
    
    // You can implement actual search functionality here
  });

  /* ============================================
     14. TESTIMONIAL SLIDER (IF NEEDED)
     ============================================ */
  if ($('.testimonial-slider').length) {
    $('.testimonial-slider').slick({
      dots: true,
      arrows: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 5000,
      fade: true,
      cssEase: 'linear'
    });
  }

  /* ============================================
     15. ANIMATE ELEMENTS ON LOAD
     ============================================ */
  $(window).on('load', function() {
    // Add fade-in class to sections
    $('section').addClass('fade-in');
    
    // Stagger animation for cards
    $('.card, .item, .service-card').each(function(index) {
      $(this).css({
        animationDelay: (index * 0.1) + 's',
        animation: 'fadeInUp 0.6s ease forwards'
      });
    });
  });

  /* ============================================
     16. TOOLTIP INITIALIZATION (IF USING BOOTSTRAP)
     ============================================ */
  if (typeof bootstrap !== 'undefined') {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl);
    });
  }

  /* ============================================
     17. ACCORDION FUNCTIONALITY (IF NEEDED)
     ============================================ */
  $('.accordion-header').on('click', function() {
    const accordionItem = $(this).parent();
    const accordionContent = $(this).next('.accordion-content');
    
    // Close other items
    $('.accordion-item').not(accordionItem).removeClass('active');
    $('.accordion-content').not(accordionContent).slideUp();
    
    // Toggle current item
    accordionItem.toggleClass('active');
    accordionContent.slideToggle();
  });

  /* ============================================
     18. PREVENT BODY SCROLL WHEN MENU IS OPEN
     ============================================ */
  $('body').on('menuOpen menuClose', function() {
    if ($('body').hasClass('menu-open')) {
      $('body').css('overflow', 'hidden');
    } else {
      $('body').css('overflow', 'auto');
    }
  });

  /* ============================================
     19. ADD ANIMATION CLASSES TO ELEMENTS
     ============================================ */
  $(document).ready(function() {
    // Add animation classes to specific elements
    $('.section-heading').addClass('fade-in-up');
    $('.card, .item').addClass('fade-in-up');
    $('.service-card').addClass('fade-in-up');
    $('.experience-card').addClass('slide-in-right');
  });

  /* ============================================
     20. FORM INPUT FOCUS EFFECTS
     ============================================ */
  $('input, textarea').on('focus', function() {
    $(this).parent().addClass('focused');
  });

  $('input, textarea').on('blur', function() {
    if (!$(this).val()) {
      $(this).parent().removeClass('focused');
    }
  });

  /* ============================================
     21. NUMBER FORMATTING FOR PRICE/STATS
     ============================================ */
  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  $('.formatted-number').each(function() {
    const num = parseInt($(this).text());
    $(this).text(formatNumber(num));
  });

  /* ============================================
     22. COOKIE CONSENT (OPTIONAL)
     ============================================ */
  const showCookieConsent = () => {
    if (!localStorage.getItem('cookieConsent')) {
      const consent = $(`
        <div id="cookie-consent" style="
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          background: #1b5e20;
          color: white;
          padding: 1.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          z-index: 9998;
          box-shadow: 0 -4px 12px rgba(0,0,0,0.15);
        ">
          <p style="margin: 0; flex: 1;">
            We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.
          </p>
          <button id="accept-cookies" style="
            background: white;
            color: #1b5e20;
            border: none;
            padding: 0.75rem 1.5rem;
            border-radius: 0.5rem;
            font-weight: 600;
            cursor: pointer;
            margin-left: 1rem;
          ">
            Accept
          </button>
        </div>
      `);
      
      $('body').append(consent);
      
      $('#accept-cookies').on('click', function() {
        localStorage.setItem('cookieConsent', 'true');
        $('#cookie-consent').fadeOut(function() {
          $(this).remove();
        });
      });
    }
  };

  // Uncomment to enable cookie consent
  // showCookieConsent();

  /* ============================================
     23. PRINT FUNCTIONALITY
     ============================================ */
  $('.print-button').on('click', function() {
    window.print();
  });

  /* ============================================
     24. SHARE FUNCTIONALITY (FOR BLOG POSTS)
     ============================================ */
  $('.share-facebook').on('click', function(e) {
    e.preventDefault();
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank', 'width=600,height=400');
  });

  $('.share-twitter').on('click', function(e) {
    e.preventDefault();
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(document.title);
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank', 'width=600,height=400');
  });

  $('.share-linkedin').on('click', function(e) {
    e.preventDefault();
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank', 'width=600,height=400');
  });

  /* ============================================
     25. INITIALIZE EVERYTHING ON DOCUMENT READY
     ============================================ */
  console.log('Kwaadjei Valuation Hub - Modern Design Loaded ✓');

})(jQuery);
