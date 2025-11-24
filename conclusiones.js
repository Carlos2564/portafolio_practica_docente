// ===========================================
// RECURSOS TECNOLÓGICOS APLICADOS - JAVASCRIPT
// Animaciones y elementos interactivos
// ===========================================

class ConclusionesPage {
  constructor() {
    this.init();
  }
  
  init() {
    this.setupScrollAnimations();
    this.setupCardAnimations();
    this.updateTime();
    console.log('✅ Página de Conclusiones y Valoración inicializada');
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
    
    // Observar tarjetas de reconocimiento
    document.querySelectorAll('.reconocimiento-card').forEach(card => {
      observer.observe(card);
    });
  }
  
  // Animaciones de tarjetas
  setupCardAnimations() {
    const caracteristicas = document.querySelectorAll('.caracteristica-item');
    
    caracteristicas.forEach((item, index) => {
      item.style.opacity = '0';
      item.style.transform = 'translateY(30px)';
      
      setTimeout(() => {
        item.style.transition = `all 0.5s ease ${index * 0.15}s`;
        item.style.opacity = '1';
        item.style.transform = 'translateY(0)';
      }, 500);
    });
    
    const transformacionItems = document.querySelectorAll('.transformacion-item');
    
    transformacionItems.forEach(item => {
      item.addEventListener('mouseenter', () => {
        const icon = item.querySelector('.transformacion-icon');
        if (icon) {
          icon.style.transform = 'scale(1.2) rotate(10deg)';
        }
      });
      
      item.addEventListener('mouseleave', () => {
        const icon = item.querySelector('.transformacion-icon');
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
// IMPACTO ITEMS ANIMATION
// ===========================================

function animateImpactoItems() {
  const items = document.querySelectorAll('.impacto-item');
  
  items.forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'scale(0.8)';
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            item.style.transition = `all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55) ${index * 0.15}s`;
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
// APRENDIZAJE NUMEROS PULSE
// ===========================================

function setupNumeroPulse() {
  const numeros = document.querySelectorAll('.aprendizaje-numero');
  
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
  console.log('🚀 Inicializando Conclusiones y Valoración Aplicados...');
  
  // Inicializar página principal
  new ConclusionesPage();
  
  // Inicializar efectos adicionales
  animateSectionIcons();
  animateImpactoItems();
  setupParallaxEffect();
  setupSmoothScroll();
  setupKeyboardShortcuts();
  setupNumeroPulse();
  
  console.log('✨ Página completamente cargada');
  console.log('📱 Responsive activo');
  console.log('🎨 Animaciones activas');
  console.log('⭐ Valoración sumamente positiva');
  console.log('🏆 2 reconocimientos documentados');
  console.log('💭 Teoría convertida en convicción');
});

// ===========================================
// PERFORMANCE OPTIMIZATION
// ===========================================

// Reducir animaciones en dispositivos de bajo rendimiento
if (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2) {
  document.body.classList.add('reduce-animations');
  console.log('⚡ Modo de rendimiento activado');
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

/* ═══════════════════════════════════════════════════════════
   🚀 FOOTER ESPECTACULAR - JAVASCRIPT
   Código reutilizable para todos los archivos
   ════════════════════════════════════════════════════════════ */

class SpectacularFooter {
  constructor() {
    this.init();
  }
  
  init() {
    this.createParticles();
    this.setupScrollToTop();
    this.setupAnimations();
    this.updateYear();
    console.log('✨ Footer espectacular cargado');
  }
  
  // Crear partículas flotantes
  createParticles() {
    const bg = document.querySelector('.footer-animated-bg');
    if (!bg) return;
    
    const particleCount = 20;
    
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'footer-particle';
      
      // Posición aleatoria
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      
      // Delay aleatorio
      particle.style.animationDelay = `${Math.random() * 15}s`;
      
      // Duración aleatoria
      particle.style.animationDuration = `${15 + Math.random() * 10}s`;
      
      bg.appendChild(particle);
    }
  }
  
  // Setup scroll to top button
  setupScrollToTop() {
    const scrollBtn = document.querySelector('.scroll-to-top');
    if (!scrollBtn) return;
    
    // Mostrar/ocultar botón según scroll
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 300) {
        scrollBtn.classList.add('visible');
      } else {
        scrollBtn.classList.remove('visible');
      }
    });
    
    // Click para ir arriba
    scrollBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
  
  // Setup animaciones al hacer visible
  setupAnimations() {
    const footerItems = document.querySelectorAll('.footer-item');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.animation = 'fadeInUp 0.6s ease-out';
        }
      });
    }, { threshold: 0.1 });
    
    footerItems.forEach(item => observer.observe(item));
    
    // Efecto hover en items
    footerItems.forEach(item => {
      item.addEventListener('mouseenter', () => {
        const icon = item.querySelector('.footer-item-icon');
        if (icon) {
          icon.style.transform = 'scale(1.2) rotate(10deg)';
        }
      });
      
      item.addEventListener('mouseleave', () => {
        const icon = item.querySelector('.footer-item-icon');
        if (icon) {
          icon.style.transform = 'scale(1) rotate(0deg)';
        }
      });
    });
  }
  
  // Actualizar año automáticamente
  updateYear() {
    const yearElements = document.querySelectorAll('.current-year');
    const currentYear = new Date().getFullYear();
    
    yearElements.forEach(el => {
      el.textContent = currentYear;
    });
  }
}

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new SpectacularFooter();
  });
} else {
  new SpectacularFooter();
}

// Easter egg: Konami code
(function() {
  const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
  let konamiIndex = 0;
  
  document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex]) {
      konamiIndex++;
      if (konamiIndex === konamiCode.length) {
        activateEasterEgg();
        konamiIndex = 0;
      }
    } else {
      konamiIndex = 0;
    }
  });
  
  function activateEasterEgg() {
    const footer = document.querySelector('.spectacular-footer');
    if (footer) {
      footer.style.animation = 'rainbow 2s linear';
      setTimeout(() => {
        footer.style.animation = '';
      }, 2000);
    }
    console.log('🎉 ¡Easter Egg activado!');
  }
})();

// Agregar animación rainbow al CSS si se activa
const style = document.createElement('style');
style.textContent = `
  @keyframes rainbow {
    0% { filter: hue-rotate(0deg); }
    100% { filter: hue-rotate(360deg); }
  }
`;
document.head.appendChild(style);