// ===========================================
// RETOS ENFRENTADOS Y SOLUCIONES - JAVASCRIPT
// Animaciones y efectos interactivos
// ===========================================

class RetosPage {
  constructor() {
    this.init();
  }
  
  init() {
    this.setupScrollAnimations();
    this.setupCardInteractions();
    this.setupSectionAnimations();
    this.updateTime();
    console.log('✅ Página de Retos y Soluciones inicializada');
  }
  
  // Animaciones al hacer scroll
  setupScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, {
      threshold: 0.2,
      rootMargin: '0px 0px -50px 0px'
    });
    
    // Observar tarjetas de retos
    document.querySelectorAll('.reto-card').forEach(card => {
      observer.observe(card);
    });
    
    // Observar sección resumen
    const summarySection = document.querySelector('.summary-section');
    if (summarySection) {
      observer.observe(summarySection);
    }
  }
  
  // Interacciones con las tarjetas
  setupCardInteractions() {
    const cards = document.querySelectorAll('.reto-card');
    
    cards.forEach(card => {
      // Efecto 3D al mover el mouse
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const percentX = (x - centerX) / centerX;
        const percentY = (y - centerY) / centerY;
        
        const tiltX = percentY * 5;
        const tiltY = -percentX * 5;
        
        card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-10px)`;
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }
  
  // Animaciones de secciones challenge/solution
  setupSectionAnimations() {
    const challengeSections = document.querySelectorAll('.challenge-section');
    const solutionSections = document.querySelectorAll('.solution-section');
    
    // Animar secciones de desafío
    challengeSections.forEach((section, index) => {
      section.style.opacity = '0';
      section.style.transform = 'translateX(-30px)';
      section.style.transition = `all 0.6s ease ${index * 0.2}s`;
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            section.style.opacity = '1';
            section.style.transform = 'translateX(0)';
          }
        });
      }, { threshold: 0.3 });
      
      observer.observe(section);
    });
    
    // Animar secciones de solución
    solutionSections.forEach((section, index) => {
      section.style.opacity = '0';
      section.style.transform = 'translateX(30px)';
      section.style.transition = `all 0.6s ease ${0.4 + (index * 0.2)}s`;
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            section.style.opacity = '1';
            section.style.transform = 'translateX(0)';
          }
        });
      }, { threshold: 0.3 });
      
      observer.observe(section);
    });
  }
  
  // Actualizar hora
  updateTime() {
    const updateClock = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const timeString = `${hours}:${minutes}`;
      
      const timeElement = document.getElementById('time-menu');
      if (timeElement) {
        timeElement.textContent = timeString;
      }
    };
    
    updateClock();
    setInterval(updateClock, 60000);
  }
}

// ===========================================
// RESULT TAGS ANIMATION
// ===========================================

function animateResultTags() {
  const tags = document.querySelectorAll('.result-tag');
  
  tags.forEach((tag, index) => {
    tag.style.opacity = '0';
    tag.style.transform = 'scale(0.8)';
    tag.style.transition = `all 0.4s ease ${index * 0.1}s`;
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            tag.style.opacity = '1';
            tag.style.transform = 'scale(1)';
          }, index * 100);
        }
      });
    }, { threshold: 0.5 });
    
    observer.observe(tag);
    
    // Animación de flotación continua
    const floatAnimation = `float-tag-${index}`;
    const keyframes = `
      @keyframes ${floatAnimation} {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-5px); }
      }
    `;
    
    const styleSheet = document.styleSheets[0];
    styleSheet.insertRule(keyframes, styleSheet.cssRules.length);
    
    tag.style.animation = `${floatAnimation} 3s ease-in-out infinite`;
    tag.style.animationDelay = `${index * 0.3}s`;
  });
}

// ===========================================
// ARROW DIVIDER ANIMATION
// ===========================================

function animateArrowDividers() {
  const arrows = document.querySelectorAll('.arrow-divider i');
  
  arrows.forEach(arrow => {
    arrow.addEventListener('mouseenter', () => {
      arrow.style.transform = 'translateY(10px) scale(1.2)';
      arrow.style.color = 'var(--orange)';
    });
    
    arrow.addEventListener('mouseleave', () => {
      arrow.style.transform = '';
      arrow.style.color = 'var(--yellow)';
    });
  });
}

// ===========================================
// SECTION LABELS INTERACTION
// ===========================================

function setupSectionLabels() {
  const labels = document.querySelectorAll('.section-label');
  
  labels.forEach(label => {
    label.addEventListener('mouseenter', () => {
      label.style.transform = 'scale(1.1) rotate(2deg)';
    });
    
    label.addEventListener('mouseleave', () => {
      label.style.transform = 'scale(1) rotate(0deg)';
    });
  });
}

// ===========================================
// SMOOTH SCROLL
// ===========================================

function setupSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// ===========================================
// PARALLAX EFFECT
// ===========================================

function setupParallaxEffect() {
  let ticking = false;
  
  document.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const scrolled = window.pageYOffset;
        
        // Efecto parallax en hero icon
        const heroIcon = document.querySelector('.hero-icon');
        if (heroIcon) {
          heroIcon.style.transform = `translateY(${scrolled * 0.1}px)`;
        }
        
        // Efecto parallax en summary icon
        const summaryIcon = document.querySelector('.summary-icon');
        if (summaryIcon) {
          heroIcon.style.transform = `translateY(${-scrolled * 0.05}px) rotateY(${scrolled * 0.5}deg)`;
        }
        
        ticking = false;
      });
      
      ticking = true;
    }
  });
}

// ===========================================
// KEYBOARD SHORTCUTS
// ===========================================

function setupKeyboardShortcuts() {
  document.addEventListener('keydown', (e) => {
    // Scroll suave con flechas
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      window.scrollBy({ top: -100, behavior: 'smooth' });
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      window.scrollBy({ top: 100, behavior: 'smooth' });
    }
    
    // Ir arriba con Home
    if (e.key === 'Home') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    // Ir abajo con End
    if (e.key === 'End') {
      e.preventDefault();
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }
  });
  
  console.log('⌨️ Atajos de teclado habilitados');
}

// ===========================================
// BADGE ANIMATION
// ===========================================

function animateBadges() {
  const badges = document.querySelectorAll('.reto-badge');
  
  badges.forEach(badge => {
    badge.addEventListener('mouseenter', () => {
      badge.style.transform = 'scale(1.15) rotate(-2deg)';
      badge.style.boxShadow = '0 8px 20px rgba(239, 68, 68, 0.6)';
    });
    
    badge.addEventListener('mouseleave', () => {
      badge.style.transform = 'scale(1) rotate(0deg)';
      badge.style.boxShadow = '0 4px 12px rgba(239, 68, 68, 0.4)';
    });
  });
}

// ===========================================
// CHALLENGE/SOLUTION PULSE EFFECT
// ===========================================

function setupPulseEffect() {
  const challengeSections = document.querySelectorAll('.challenge-section');
  const solutionSections = document.querySelectorAll('.solution-section');
  
  // Pulso en secciones de desafío al hacer hover
  challengeSections.forEach(section => {
    section.addEventListener('mouseenter', () => {
      section.style.transform = 'scale(1.02)';
    });
    
    section.addEventListener('mouseleave', () => {
      section.style.transform = 'scale(1)';
    });
  });
  
  // Pulso en secciones de solución al hacer hover
  solutionSections.forEach(section => {
    section.addEventListener('mouseenter', () => {
      section.style.transform = 'scale(1.02)';
    });
    
    section.addEventListener('mouseleave', () => {
      section.style.transform = 'scale(1)';
    });
  });
}

// ===========================================
// INITIALIZATION
// ===========================================

document.addEventListener('DOMContentLoaded', () => {
  console.log('🚀 Inicializando Retos Enfrentados y Soluciones...');
  
  // Inicializar página principal
  new RetosPage();
  
  // Inicializar efectos adicionales
  animateResultTags();
  animateArrowDividers();
  setupSectionLabels();
  setupSmoothScroll();
  setupParallaxEffect();
  setupKeyboardShortcuts();
  animateBadges();
  setupPulseEffect();
  
  console.log('✨ Página completamente cargada');
  console.log('📱 Responsive activo');
  console.log('🎨 Animaciones funcionando');
  console.log('🏔️ 2 retos documentados');
});

// ===========================================
// PERFORMANCE OPTIMIZATION
// ===========================================

// Reducir animaciones en dispositivos de bajo rendimiento
if (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2) {
  document.body.classList.add('reduce-animations');
  console.log('⚡ Modo de rendimiento activado');
}