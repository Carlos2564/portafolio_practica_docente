// ===========================================
// EVALUACIÓN Y RETROALIMENTACIÓN - JAVASCRIPT
// Animaciones de reconocimiento y validación
// ===========================================

class EvaluacionPage {
  constructor() {
    this.init();
  }
  
  init() {
    this.setupScrollAnimations();
    this.setupCardAnimations();
    this.setupFormulaAnimation();
    this.updateTime();
    console.log('✅ Página de Evaluación y Retroalimentación inicializada');
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
    
    // Observar evaluaciones externas
    document.querySelectorAll('.evaluacion-externa').forEach(card => {
      observer.observe(card);
    });
  }
  
  // Animaciones de tarjetas
  setupCardAnimations() {
    const evaluacionCard = document.querySelector('.evaluacion-card');
    
    if (evaluacionCard) {
      evaluacionCard.style.opacity = '0';
      evaluacionCard.style.transform = 'scale(0.95)';
      
      setTimeout(() => {
        evaluacionCard.style.transition = 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)';
        evaluacionCard.style.opacity = '1';
        evaluacionCard.style.transform = 'scale(1)';
      }, 200);
    }
    
    // Animar highlights
    const highlights = document.querySelectorAll('.highlight-item');
    highlights.forEach((item, index) => {
      item.style.opacity = '0';
      item.style.transform = 'translateY(20px)';
      
      setTimeout(() => {
        item.style.transition = `all 0.5s ease ${index * 0.1}s`;
        item.style.opacity = '1';
        item.style.transform = 'translateY(0)';
      }, 500);
    });
  }
  
  // Animación especial para la fórmula del éxito
  setupFormulaAnimation() {
    const formulaSuccess = document.querySelector('.formula-success');
    
    if (formulaSuccess) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const items = formulaSuccess.querySelectorAll('.formula-item, .formula-plus, .formula-equals, .formula-result');
            
            items.forEach((item, index) => {
              item.style.opacity = '0';
              item.style.transform = 'scale(0)';
              
              setTimeout(() => {
                item.style.transition = 'all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
                item.style.opacity = '1';
                item.style.transform = 'scale(1)';
              }, index * 200);
            });
          }
        });
      }, { threshold: 0.3 });
      
      observer.observe(formulaSuccess);
    }
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
// RECONOCIMIENTOS ANIMATION
// ===========================================

function animateReconocimientos() {
  const tags = document.querySelectorAll('.reconocimiento-tag');
  
  tags.forEach((tag, index) => {
    tag.style.opacity = '0';
    tag.style.transform = 'scale(0.8)';
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            tag.style.transition = `all 0.4s ease ${index * 0.08}s`;
            tag.style.opacity = '1';
            tag.style.transform = 'scale(1)';
          }, 300);
        }
      });
    }, { threshold: 0.5 });
    
    observer.observe(tag);
  });
}

// ===========================================
// EVALUADOR AVATARS ANIMATION
// ===========================================

function animateAvatars() {
  const avatars = document.querySelectorAll('.evaluador-avatar');
  
  avatars.forEach(avatar => {
    avatar.style.opacity = '0';
    avatar.style.transform = 'scale(0) rotate(-180deg)';
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            avatar.style.transition = 'all 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
            avatar.style.opacity = '1';
            avatar.style.transform = 'scale(1) rotate(0deg)';
          }, 200);
        }
      });
    }, { threshold: 0.5 });
    
    observer.observe(avatar);
  });
}

// ===========================================
// VALORACIÓN BADGES PULSE
// ===========================================

function setupBadgesPulse() {
  const badges = document.querySelectorAll('.valoracion-badge');
  
  badges.forEach(badge => {
    badge.addEventListener('mouseenter', () => {
      badge.style.transform = 'scale(1.15) rotate(5deg)';
    });
    
    badge.addEventListener('mouseleave', () => {
      badge.style.transform = 'scale(1) rotate(0deg)';
    });
    
    // Pulso automático
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setInterval(() => {
            badge.style.transform = 'scale(1.1)';
            setTimeout(() => {
              badge.style.transform = 'scale(1)';
            }, 200);
          }, 3000);
        }
      });
    }, { threshold: 0.5, triggerOnce: true });
    
    observer.observe(badge);
  });
}

// ===========================================
// QUOTE TYPING EFFECT
// ===========================================

function setupQuoteEffect() {
  const quotes = document.querySelectorAll('.quote-text');
  
  quotes.forEach(quote => {
    quote.style.opacity = '0';
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            quote.style.transition = 'opacity 1.5s ease';
            quote.style.opacity = '1';
          }, 400);
        }
      });
    }, { threshold: 0.3 });
    
    observer.observe(quote);
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
          heroIcon.style.transform = `translateY(${scrolled * 0.1}px) rotateY(${scrolled * 0.5}deg)`;
        }
        
        // Efecto parallax en sintesis icon
        const sintesisIcon = document.querySelector('.sintesis-icon');
        if (sintesisIcon) {
          sintesisIcon.style.transform = `scale(${1 + scrolled * 0.0001}) rotate(${scrolled * 0.05}deg)`;
        }
        
        ticking = false;
      });
      
      ticking = true;
    }
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
// SÍNTESIS FINAL ANIMATION
// ===========================================

function setupSintesisAnimation() {
  const sintesisSection = document.querySelector('.sintesis-final');
  
  if (sintesisSection) {
    sintesisSection.style.opacity = '0';
    sintesisSection.style.transform = 'scale(0.9)';
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            sintesisSection.style.transition = 'all 1s cubic-bezier(0.34, 1.56, 0.64, 1)';
            sintesisSection.style.opacity = '1';
            sintesisSection.style.transform = 'scale(1)';
          }, 200);
        }
      });
    }, { threshold: 0.2 });
    
    observer.observe(sintesisSection);
  }
}

// ===========================================
// CARD ICON INTERACTION
// ===========================================

function setupCardIconInteraction() {
  const cardIcons = document.querySelectorAll('.card-icon');
  
  cardIcons.forEach(icon => {
    icon.addEventListener('mouseenter', () => {
      icon.style.transform = 'scale(1.15) rotate(10deg)';
    });
    
    icon.addEventListener('mouseleave', () => {
      icon.style.transform = 'scale(1) rotate(0deg)';
    });
  });
}

// ===========================================
// EVALUACIONES EXTERNAS STAGGER
// ===========================================

function setupExternasStagger() {
  const externas = document.querySelectorAll('.evaluacion-externa');
  
  externas.forEach((externa, index) => {
    externa.style.opacity = '0';
    externa.style.transform = index % 2 === 0 ? 'translateX(-50px)' : 'translateX(50px)';
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            externa.style.transition = 'all 0.8s ease';
            externa.style.opacity = '1';
            externa.style.transform = 'translateX(0)';
          }, index * 200);
        }
      });
    }, { threshold: 0.2 });
    
    observer.observe(externa);
  });
}

// ===========================================
// INITIALIZATION
// ===========================================

document.addEventListener('DOMContentLoaded', () => {
  console.log('🚀 Inicializando Evaluación y Retroalimentación...');
  
  // Inicializar página principal
  new EvaluacionPage();
  
  // Inicializar efectos adicionales
  animateReconocimientos();
  animateAvatars();
  setupBadgesPulse();
  setupQuoteEffect();
  setupParallaxEffect();
  setupSmoothScroll();
  setupKeyboardShortcuts();
  setupSintesisAnimation();
  setupCardIconInteraction();
  setupExternasStagger();
  
  console.log('✨ Página completamente cargada');
  console.log('📱 Responsive activo');
  console.log('🎨 Animaciones de reconocimiento activas');
  console.log('🏆 Autoevaluación documentada');
  console.log('👥 2 evaluadores externos registrados');
  console.log('⭐ Fórmula del éxito visualizada');
});

// ===========================================
// PERFORMANCE OPTIMIZATION
// ===========================================

// Reducir animaciones en dispositivos de bajo rendimiento
if (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2) {
  document.body.classList.add('reduce-animations');
  console.log('⚡ Modo de rendimiento activado');
}