// ===========================================
// PROPUESTA DE MEJORA - JAVASCRIPT
// Animaciones de tabla y elementos interactivos
// ===========================================

class MejoraPage {
  constructor() {
    this.init();
  }
  
  init() {
    this.setupScrollAnimations();
    this.setupTableAnimations();
    this.updateTime();
    console.log('✅ Página de Propuesta de Mejora inicializada');
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
    
    // Observar filas de la tabla
    document.querySelectorAll('.tabla-fila').forEach(fila => {
      observer.observe(fila);
    });
  }
  
  // Animaciones especiales para la tabla
  setupTableAnimations() {
    const filas = document.querySelectorAll('.tabla-fila');
    
    filas.forEach((fila, index) => {
      // Animación hover especial
      fila.addEventListener('mouseenter', () => {
        const objetivoCell = fila.querySelector('.objetivo-cell');
        const accionCell = fila.querySelector('.accion-cell');
        
        if (objetivoCell) {
          objetivoCell.style.transform = 'translateX(5px)';
        }
        if (accionCell) {
          accionCell.style.transform = 'translateX(-5px)';
        }
      });
      
      fila.addEventListener('mouseleave', () => {
        const objetivoCell = fila.querySelector('.objetivo-cell');
        const accionCell = fila.querySelector('.accion-cell');
        
        if (objetivoCell) {
          objetivoCell.style.transform = 'translateX(0)';
        }
        if (accionCell) {
          accionCell.style.transform = 'translateX(0)';
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
// HIGHLIGHT BOXES ANIMATION
// ===========================================

function animateHighlightBoxes() {
  const boxes = document.querySelectorAll('.highlight-box');
  
  boxes.forEach((box, index) => {
    box.style.opacity = '0';
    box.style.transform = 'translateY(20px)';
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            box.style.transition = `all 0.5s ease ${index * 0.15}s`;
            box.style.opacity = '1';
            box.style.transform = 'translateY(0)';
          }, 200);
        }
      });
    }, { threshold: 0.3 });
    
    observer.observe(box);
  });
}

// ===========================================
// OBJETIVO NÚMEROS PULSE
// ===========================================

function setupNumeroPulse() {
  const numeros = document.querySelectorAll('.objetivo-numero');
  
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
// ACCION BADGES ANIMATION
// ===========================================

function animateAccionBadges() {
  const badges = document.querySelectorAll('.accion-badge');
  
  badges.forEach((badge, index) => {
    badge.style.opacity = '0';
    badge.style.transform = 'scale(0.8)';
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            badge.style.transition = `all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55) ${index * 0.2}s`;
            badge.style.opacity = '1';
            badge.style.transform = 'scale(1)';
          }, 400);
        }
      });
    }, { threshold: 0.5 });
    
    observer.observe(badge);
  });
}

// ===========================================
// SECTION ICONS ANIMATION
// ===========================================

function animateSectionIcons() {
  const icons = document.querySelectorAll('.section-icon');
  
  icons.forEach(icon => {
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
        
        // Efecto parallax en impacto icon
        const impactoIcon = document.querySelector('.impacto-icon');
        if (impactoIcon) {
          impactoIcon.style.transform = `translateY(${-scrolled * 0.05}px) rotate(${scrolled * 0.1}deg)`;
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
// IMPACTO SECTION ANIMATION
// ===========================================

function setupImpactoAnimation() {
  const impactoSection = document.querySelector('.impacto-section');
  
  if (impactoSection) {
    impactoSection.style.opacity = '0';
    impactoSection.style.transform = 'scale(0.9)';
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            impactoSection.style.transition = 'all 1s cubic-bezier(0.34, 1.56, 0.64, 1)';
            impactoSection.style.opacity = '1';
            impactoSection.style.transform = 'scale(1)';
          }, 200);
        }
      });
    }, { threshold: 0.2 });
    
    observer.observe(impactoSection);
  }
}

// ===========================================
// JUSTIFICACIÓN FADE IN
// ===========================================

function setupJustificacionAnimation() {
  const justificacionSection = document.querySelector('.justificacion-section');
  
  if (justificacionSection) {
    justificacionSection.style.opacity = '0';
    justificacionSection.style.transform = 'translateY(30px)';
    
    setTimeout(() => {
      justificacionSection.style.transition = 'all 0.8s ease';
      justificacionSection.style.opacity = '1';
      justificacionSection.style.transform = 'translateY(0)';
    }, 300);
  }
}

// ===========================================
// OBJETIVO ICONS INTERACTION
// ===========================================

function setupObjetivoIconsInteraction() {
  const objetivoIcons = document.querySelectorAll('.objetivo-icon');
  
  objetivoIcons.forEach(icon => {
    icon.addEventListener('mouseenter', () => {
      icon.style.transform = 'scale(1.2) rotate(10deg)';
    });
    
    icon.addEventListener('mouseleave', () => {
      icon.style.transform = 'scale(1) rotate(0deg)';
    });
  });
}

// ===========================================
// INITIALIZATION
// ===========================================

document.addEventListener('DOMContentLoaded', () => {
  console.log('🚀 Inicializando Propuesta de Mejora...');
  
  // Inicializar página principal
  new MejoraPage();
  
  // Inicializar efectos adicionales
  animateHighlightBoxes();
  setupNumeroPulse();
  animateAccionBadges();
  animateSectionIcons();
  setupParallaxEffect();
  setupSmoothScroll();
  setupKeyboardShortcuts();
  setupImpactoAnimation();
  setupJustificacionAnimation();
  setupObjetivoIconsInteraction();
  
  console.log('✨ Página completamente cargada');
  console.log('📱 Responsive activo');
  console.log('🎨 Animaciones de tabla activas');
  console.log('💡 Propuesta de mejora documentada');
  console.log('🎯 3 objetivos específicos');
  console.log('⚡ 3 acciones concretas');
});

// ===========================================
// PERFORMANCE OPTIMIZATION
// ===========================================

// Reducir animaciones en dispositivos de bajo rendimiento
if (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2) {
  document.body.classList.add('reduce-animations');
  console.log('⚡ Modo de rendimiento activado');
}