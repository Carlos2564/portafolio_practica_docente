// ===========================================
// INSTRUMENTOS APLICADOS Y RESULTADOS - JAVASCRIPT
// Animaciones profesionales para presentación de datos
// ===========================================

class InstrumentosPage {
  constructor() {
    this.init();
  }
  
  init() {
    this.setupScrollAnimations();
    this.setupCardInteractions();
    this.setupSectionAnimations();
    this.updateTime();
    console.log('✅ Página de Instrumentos y Resultados inicializada');
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
    
    // Observar tarjetas de resultados
    document.querySelectorAll('.result-card').forEach(card => {
      observer.observe(card);
    });
    
    // Observar tarjetas de docente
    document.querySelectorAll('.teacher-card').forEach(card => {
      observer.observe(card);
    });
    
    // Observar sección de conclusión
    const conclusionSection = document.querySelector('.conclusion-section');
    if (conclusionSection) {
      observer.observe(conclusionSection);
    }
  }
  
  // Interacciones con las tarjetas
  setupCardInteractions() {
    const resultCards = document.querySelectorAll('.result-card');
    
    resultCards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        const icon = card.querySelector('.result-icon');
        if (icon) {
          icon.style.transform = 'scale(1.15) rotate(5deg)';
        }
      });
      
      card.addEventListener('mouseleave', () => {
        const icon = card.querySelector('.result-icon');
        if (icon) {
          icon.style.transform = 'scale(1) rotate(0deg)';
        }
      });
    });
    
    const teacherCards = document.querySelectorAll('.teacher-card');
    
    teacherCards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        const icon = card.querySelector('.teacher-icon');
        if (icon) {
          icon.style.transform = 'scale(1.1) rotate(-5deg)';
        }
      });
      
      card.addEventListener('mouseleave', () => {
        const icon = card.querySelector('.teacher-icon');
        if (icon) {
          icon.style.transform = 'scale(1) rotate(0deg)';
        }
      });
    });
  }
  
  // Animaciones de secciones
  setupSectionAnimations() {
    const encuestaSections = document.querySelectorAll('.encuesta-section');
    
    encuestaSections.forEach((section, index) => {
      section.style.opacity = '0';
      section.style.transform = index % 2 === 0 ? 'translateX(-50px)' : 'translateX(50px)';
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            section.style.transition = 'all 0.8s ease';
            section.style.opacity = '1';
            section.style.transform = 'translateX(0)';
          }
        });
      }, { threshold: 0.1 });
      
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
// TAGS ANIMATION
// ===========================================

function animateTags() {
  const allTags = document.querySelectorAll('.mini-tag, .split-tag, .result-tag');
  
  allTags.forEach((tag, index) => {
    tag.style.opacity = '0';
    tag.style.transform = 'scale(0.8)';
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            tag.style.transition = `all 0.4s ease ${index * 0.05}s`;
            tag.style.opacity = '1';
            tag.style.transform = 'scale(1)';
          }, 100);
        }
      });
    }, { threshold: 0.5 });
    
    observer.observe(tag);
  });
}

// ===========================================
// PERCENTAGE ANIMATION
// ===========================================

function animatePercentage() {
  const percentageBadges = document.querySelectorAll('.percentage-badge');
  
  percentageBadges.forEach(badge => {
    const percentageElement = badge.querySelector('.percentage');
    
    if (percentageElement) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            let count = 0;
            const target = 50;
            const duration = 1500;
            const increment = target / (duration / 16);
            
            const counter = setInterval(() => {
              count += increment;
              if (count >= target) {
                count = target;
                clearInterval(counter);
              }
              percentageElement.textContent = Math.round(count) + '%';
            }, 16);
          }
        });
      }, { threshold: 0.5 });
      
      observer.observe(badge);
    }
  });
}

// ===========================================
// SECTION ICONS ANIMATION
// ===========================================

function animateSectionIcons() {
  const sectionIcons = document.querySelectorAll('.section-icon');
  
  sectionIcons.forEach(icon => {
    icon.style.opacity = '0';
    icon.style.transform = 'scale(0) rotate(-180deg)';
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            icon.style.transition = 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)';
            icon.style.opacity = '1';
            icon.style.transform = 'scale(1) rotate(0deg)';
          }, 200);
        }
      });
    }, { threshold: 0.3 });
    
    observer.observe(icon);
  });
}

// ===========================================
// SPLIT DIVIDER ANIMATION
// ===========================================

function animateSplitDivider() {
  const dividers = document.querySelectorAll('.split-divider');
  
  dividers.forEach(divider => {
    divider.style.opacity = '0';
    divider.style.transform = 'scaleY(0)';
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            divider.style.transition = 'all 1s ease';
            divider.style.opacity = '1';
            divider.style.transform = 'scaleY(1)';
          }, 400);
        }
      });
    }, { threshold: 0.3 });
    
    observer.observe(divider);
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
        
        // Efecto parallax en conclusion icon
        const conclusionIcon = document.querySelector('.conclusion-icon');
        if (conclusionIcon) {
          conclusionIcon.style.transform = `scale(${1 + scrolled * 0.0001})`;
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
// BADGES PULSE EFFECT
// ===========================================

function setupBadgesPulse() {
  const badges = document.querySelectorAll('.insight-badge, .percentage-badge');
  
  badges.forEach(badge => {
    badge.addEventListener('mouseenter', () => {
      badge.style.transform = 'scale(1.1)';
    });
    
    badge.addEventListener('mouseleave', () => {
      badge.style.transform = 'scale(1)';
    });
  });
}

// ===========================================
// CONCLUSION SECTION ANIMATION
// ===========================================

function setupConclusionAnimation() {
  const conclusionSection = document.querySelector('.conclusion-section');
  
  if (conclusionSection) {
    conclusionSection.style.opacity = '0';
    conclusionSection.style.transform = 'scale(0.9)';
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            conclusionSection.style.transition = 'all 1s cubic-bezier(0.34, 1.56, 0.64, 1)';
            conclusionSection.style.opacity = '1';
            conclusionSection.style.transform = 'scale(1)';
          }, 200);
        }
      });
    }, { threshold: 0.2 });
    
    observer.observe(conclusionSection);
  }
}

// ===========================================
// RESULT ICONS ROTATION
// ===========================================

function setupIconsInteraction() {
  const icons = document.querySelectorAll('.result-icon, .teacher-icon, .split-icon');
  
  icons.forEach(icon => {
    icon.style.transition = 'transform 0.3s ease';
  });
}

// ===========================================
// INITIALIZATION
// ===========================================

document.addEventListener('DOMContentLoaded', () => {
  console.log('🚀 Inicializando Instrumentos Aplicados y Resultados...');
  
  // Inicializar página principal
  new InstrumentosPage();
  
  // Inicializar efectos adicionales
  animateTags();
  animatePercentage();
  animateSectionIcons();
  animateSplitDivider();
  setupSmoothScroll();
  setupParallaxEffect();
  setupKeyboardShortcuts();
  setupBadgesPulse();
  setupConclusionAnimation();
  setupIconsInteraction();
  
  console.log('✨ Página completamente cargada');
  console.log('📱 Responsive activo');
  console.log('🎨 Animaciones de datos activas');
  console.log('📊 Resultados de encuestas documentados');
  console.log('👥 Encuesta a estudiantes: 4 categorías');
  console.log('👨‍🏫 Encuesta a docente: 5 aspectos');
});

// ===========================================
// PERFORMANCE OPTIMIZATION
// ===========================================

// Reducir animaciones en dispositivos de bajo rendimiento
if (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2) {
  document.body.classList.add('reduce-animations');
  console.log('⚡ Modo de rendimiento activado');
}