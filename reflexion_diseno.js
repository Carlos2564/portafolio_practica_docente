// ===========================================
// REFLEXIÓN SOBRE EL DISEÑO - JAVASCRIPT
// Animaciones reflexivas y elementos interactivos
// ===========================================

class ReflexionPage {
  constructor() {
    this.init();
  }
  
  init() {
    this.setupScrollAnimations();
    this.setupCardAnimations();
    this.updateTime();
    console.log('✅ Página de Reflexión sobre el Diseño inicializada');
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
    
    // Observar tarjetas de reflexión
    document.querySelectorAll('.reflexion-card').forEach(card => {
      observer.observe(card);
    });
  }
  
  // Animaciones de tarjetas
  setupCardAnimations() {
    const reflexionCards = document.querySelectorAll('.reflexion-card');
    
    reflexionCards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        const icon = card.querySelector('.reflexion-icon');
        if (icon) {
          icon.style.transform = 'scale(1.15) rotate(10deg)';
        }
      });
      
      card.addEventListener('mouseleave', () => {
        const icon = card.querySelector('.reflexion-icon');
        if (icon) {
          icon.style.transform = 'scale(1) rotate(0deg)';
        }
      });
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
// FODA ITEMS ANIMATION
// ===========================================

function animateFodaItems() {
  const fodaItems = document.querySelectorAll('.foda-item');
  
  fodaItems.forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'scale(0.8)';
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            item.style.transition = `all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55) ${index * 0.2}s`;
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, 200);
        }
      });
    }, { threshold: 0.5 });
    
    observer.observe(item);
  });
}

// ===========================================
// EFFICIENCY METRICS COUNTER
// ===========================================

function setupEfficiencyCounters() {
  const metrics = document.querySelectorAll('.efficiency-item');
  
  metrics.forEach(metric => {
    const valueNumber = metric.querySelector('.value-number');
    
    if (valueNumber) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Animación de aparición
            metric.style.opacity = '0';
            metric.style.transform = 'scale(0.8)';
            
            setTimeout(() => {
              metric.style.transition = 'all 0.5s ease';
              metric.style.opacity = '1';
              metric.style.transform = 'scale(1)';
            }, 300);
          }
        });
      }, { threshold: 0.5 });
      
      observer.observe(metric);
    }
  });
}

// ===========================================
// VISION STATEMENT ANIMATION
// ===========================================

function setupVisionAnimation() {
  const visionStatement = document.querySelector('.vision-statement');
  
  if (visionStatement) {
    visionStatement.style.opacity = '0';
    visionStatement.style.transform = 'scale(0.95)';
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            visionStatement.style.transition = 'all 1s cubic-bezier(0.34, 1.56, 0.64, 1)';
            visionStatement.style.opacity = '1';
            visionStatement.style.transform = 'scale(1)';
          }, 400);
        }
      });
    }, { threshold: 0.3 });
    
    observer.observe(visionStatement);
  }
}

// ===========================================
// COMMITMENT TAGS ANIMATION
// ===========================================

function animateCommitmentTags() {
  const tags = document.querySelectorAll('.commitment-tag');
  
  tags.forEach((tag, index) => {
    tag.style.opacity = '0';
    tag.style.transform = 'translateY(20px)';
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            tag.style.transition = `all 0.5s ease ${index * 0.1}s`;
            tag.style.opacity = '1';
            tag.style.transform = 'translateY(0)';
          }, 200);
        }
      });
    }, { threshold: 0.5 });
    
    observer.observe(tag);
  });
}

// ===========================================
// PILLARS ANIMATION
// ===========================================

function setupPillarsAnimation() {
  const pillars = document.querySelectorAll('.pillar-item, .pillar-plus, .pillar-equals');
  
  pillars.forEach((pillar, index) => {
    pillar.style.opacity = '0';
    pillar.style.transform = 'scale(0)';
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            pillar.style.transition = 'all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
            pillar.style.opacity = '1';
            pillar.style.transform = 'scale(1)';
          }, index * 150);
        }
      });
    }, { threshold: 0.3 });
    
    observer.observe(pillar);
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
          conclusionIcon.style.transform = `rotate(${scrolled * 0.2}deg) scale(${1 + scrolled * 0.0001})`;
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
// CONCLUSION ANIMATION
// ===========================================

function setupConclusionAnimation() {
  const conclusionSection = document.querySelector('.conclusion-final');
  
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
// REFLEXION NUMEROS PULSE
// ===========================================

function setupNumeroPulse() {
  const numeros = document.querySelectorAll('.reflexion-numero');
  
  numeros.forEach(numero => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setInterval(() => {
            numero.style.transform = 'scale(1.15)';
            setTimeout(() => {
              numero.style.transform = 'scale(1)';
            }, 200);
          }, 3000);
        }
      });
    }, { threshold: 0.5, triggerOnce: true });
    
    observer.observe(numero);
  });
}

// ===========================================
// INITIALIZATION
// ===========================================

document.addEventListener('DOMContentLoaded', () => {
  console.log('🚀 Inicializando Reflexión sobre el Diseño...');
  
  // Inicializar página principal
  new ReflexionPage();
  
  // Inicializar efectos adicionales
  animateFodaItems();
  setupEfficiencyCounters();
  setupVisionAnimation();
  animateCommitmentTags();
  setupPillarsAnimation();
  setupParallaxEffect();
  setupSmoothScroll();
  setupKeyboardShortcuts();
  setupConclusionAnimation();
  setupNumeroPulse();
  
  console.log('✨ Página completamente cargada');
  console.log('📱 Responsive activo');
  console.log('🎨 Animaciones reflexivas activas');
  console.log('💭 3 reflexiones documentadas');
  console.log('🧠 Análisis crítico completo');
});

// ===========================================
// PERFORMANCE OPTIMIZATION
// ===========================================

// Reducir animaciones en dispositivos de bajo rendimiento
if (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2) {
  document.body.classList.add('reduce-animations');
  console.log('⚡ Modo de rendimiento activado');
}