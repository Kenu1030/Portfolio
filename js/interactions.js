/**
 * Modern Portfolio Interactions & Animations
 * Handles scroll effects, animations, and interactive elements
 */

// ==================== SCROLL PROGRESS INDICATOR ====================
function initScrollProgress() {
  const scrollProgress = document.querySelector('.scroll-progress');
  if (!scrollProgress) return;

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    scrollProgress.style.width = scrollPercent + '%';
  });
}

// ==================== SCROLL-BASED NAVBAR EFFECTS ====================
function initNavbarEffects() {
  const header = document.querySelector('.site-header');
  const navLinks = document.querySelectorAll('.nav-link');
  
  if (!header) return;

  let lastScrollY = 0;
  let isScrolling = false;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    
    // Update navbar transparency based on scroll
    if (scrollY > 50) {
      header.classList.add('scrolled');
      header.style.backdropFilter = 'blur(12px)';
    } else {
      header.classList.remove('scrolled');
      header.style.backdropFilter = 'blur(0px)';
    }

    lastScrollY = scrollY;
  });

  // Active nav link on scroll
  window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section[id]');

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (scrollY >= sectionTop - 200) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').slice(1) === current) {
        link.classList.add('active');
      }
    });
  });
}

// ==================== TYPING ANIMATION ====================
function initTypingEffect() {
  const typingElement = document.querySelector('[data-scroll-type="typing"]');
  if (!typingElement) return;

  const text = typingElement.textContent;
  typingElement.textContent = '';
  
  let index = 0;
  const speed = 30; // Milliseconds per character

  function typeCharacter() {
    if (index < text.length) {
      typingElement.textContent += text.charAt(index);
      index++;
      setTimeout(typeCharacter, speed);
    }
  }

  // Start typing after a short delay
  setTimeout(typeCharacter, 500);
}

// ==================== SCROLL-TRIGGERED ANIMATIONS ====================
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        // Optional: stop observing after animation
        // observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all elements with data-scroll attribute
  document.querySelectorAll('[data-scroll]').forEach(el => {
    observer.observe(el);
  });
}

// ==================== PARALLAX SCROLLING EFFECT ====================
function initParallax() {
  const blobs = document.querySelectorAll('.animated-bg-blob');
  if (blobs.length === 0) return;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    
    blobs.forEach((blob, index) => {
      const speed = 0.5 + index * 0.1;
      blob.style.transform = `translateY(${scrollY * speed}px)`;
    });
  });
}

// ==================== CARD HOVER EFFECTS ====================
function initCardHoverEffects() {
  const cards = document.querySelectorAll('.card');

  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transition = 'all 400ms cubic-bezier(0.34, 1.56, 0.64, 1)';
      card.style.transform = 'translateY(-12px) rotateX(2deg)';
      
      const overlay = card.querySelector('.card-overlay');
      if (overlay) {
        overlay.style.opacity = '1';
      }
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0) rotateX(0deg)';
      
      const overlay = card.querySelector('.card-overlay');
      if (overlay) {
        overlay.style.opacity = '0';
      }
    });
  });
}

// ==================== MOUSE-FOLLOWING GLOW EFFECT ====================
function initMouseGlow() {
  const buttons = document.querySelectorAll('.button');
  
  buttons.forEach(button => {
    button.addEventListener('mousemove', (e) => {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const style = `radial-gradient(circle 80px at ${x}px ${y}px, rgba(251, 207, 232, 0.4), transparent)`;
      button.style.backgroundImage = style;
    });

    button.addEventListener('mouseleave', () => {
      button.style.backgroundImage = '';
    });
  });
}

// ==================== STAGGERED ANIMATIONS ====================
function addStaggeredAnimations() {
  const cards = document.querySelectorAll('.card');
  cards.forEach((card, index) => {
    card.style.setProperty('--stagger-delay', `${index * 100}ms`);
  });

  const highlights = document.querySelectorAll('.hero-highlights li');
  highlights.forEach((item, index) => {
    item.style.setProperty('--stagger-delay', `${200 + index * 100}ms`);
  });
}

// ==================== INITIALIZE ALL EFFECTS ====================
function initAllEffects() {
  // Wait for DOM to be fully loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initScrollProgress();
      initNavbarEffects();
      initTypingEffect();
      initScrollAnimations();
      initParallax();
      initCardHoverEffects();
      initMouseGlow();
      addStaggeredAnimations();
    });
  } else {
    initScrollProgress();
    initNavbarEffects();
    initTypingEffect();
    initScrollAnimations();
    initParallax();
    initCardHoverEffects();
    initMouseGlow();
    addStaggeredAnimations();
  }
}

// ==================== SMOOTH SCROLL BEHAVIOR ====================
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#' || href === '#top') return;
      
      e.preventDefault();
      const target = document.querySelector(href);
      
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// ==================== PERFORMANCE: REQUEST ANIMATION FRAME ====================
let ticking = false;
function updateOnScroll() {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      // Update all scroll-based effects here
      ticking = false;
    });
    ticking = true;
  }
}

window.addEventListener('scroll', updateOnScroll);

// ==================== INIT ====================
initAllEffects();
initSmoothScroll();
