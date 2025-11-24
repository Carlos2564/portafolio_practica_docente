// ===========================================
// APRENDIZAJES OBTENIDOS - JAVASCRIPT
// Animaciones inspiradoras y emotivas
// ===========================================

class AprendizajesPage {
  constructor() {
    this.init();
  }
  
  init() {
    this.setupScrollAnimations();
    this.setupCardInteractions();
    this.setupReflexionAnimation();
    this.updateTime();
    console.log('✅ Página de Aprendizajes Obtenidos inicializada');
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
    
    // Observar tarjetas de aprendizaje
    document.querySelectorAll('.aprendizaje-card').forEach(card => {
      observer.observe(card);
    });
    
    // Observar secciones
    const reflexionSection = document.querySelector('.reflexion-section');
    if (reflexionSection) {
      observer.observe(reflexionSection);
    }
    
    const cierreSection = document.querySelector('.cierre-section');
    if (cierreSection) {
      observer.observe(cierreSection);
    }
  }
  
  // Interacciones con las tarjetas
  setupCardInteractions() {
    const cards = document.querySelectorAll('.aprendizaje-card');
    
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
        
        const tiltX = percentY * 8;
        const tiltY = -percentX * 8;
        
        card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-15px) scale(1.02)`;
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }
  
  // Animación especial para la reflexión
  setupReflexionAnimation() {
    const reflexionQuote = document.querySelector('.reflexion-quote');
    
    if (reflexionQuote) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            reflexionQuote.style.opacity = '0';
            reflexionQuote.style.transform = 'scale(0.95)';
            
            setTimeout(() => {
              reflexionQuote.style.transition = 'all 1s ease';
              reflexionQuote.style.opacity = '1';
              reflexionQuote.style.transform = 'scale(1)';
            }, 200);
          }
        });
      }, { threshold: 0.3 });
      
      observer.observe(reflexionQuote);
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
// TAGS ANIMATION
// ===========================================

function animateTags() {
  const allTags = document.querySelectorAll('.tag');
  
  allTags.forEach((tag, index) => {
    tag.style.opacity = '0';
    tag.style.transform = 'scale(0.8) translateY(10px)';
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            tag.style.transition = `all 0.4s ease ${index * 0.1}s`;
            tag.style.opacity = '1';
            tag.style.transform = 'scale(1) translateY(0)';
          }, 100);
        }
      });
    }, { threshold: 0.5 });
    
    observer.observe(tag);
  });
}

// ===========================================
// HIGHLIGHT BOXES ANIMATION
// ===========================================

function animateHighlightBoxes() {
  const boxes = document.querySelectorAll('.highlight-box');
  
  boxes.forEach((box, index) => {
    box.style.opacity = '0';
    box.style.transform = 'translateX(-30px)';
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            box.style.transition = `all 0.5s ease ${index * 0.15}s`;
            box.style.opacity = '1';
            box.style.transform = 'translateX(0)';
          }, 200);
        }
      });
    }, { threshold: 0.3 });
    
    observer.observe(box);
  });
}

// ===========================================
// CARD NUMBERS ANIMATION
// ===========================================

function animateCardNumbers() {
  const numbers = document.querySelectorAll('.card-number');
  
  numbers.forEach(number => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          number.style.animation = 'numberPulse 2s ease-in-out infinite';
        }
      });
    }, { threshold: 0.5 });
    
    observer.observe(number);
  });
  
  // Agregar keyframes dinámicamente
  const style = document.createElement('style');
  style.textContent = `
    @keyframes numberPulse {
      0%, 100% { transform: scale(1); opacity: 0.05; }
      50% { transform: scale(1.1); opacity: 0.15; }
    }
  `;
  document.head.appendChild(style);
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
        
        // Efecto parallax en reflexion icon
        const reflexionIcon = document.querySelector('.reflexion-icon');
        if (reflexionIcon) {
          reflexionIcon.style.transform = `translateY(${-scrolled * 0.05}px) scale(${1 + scrolled * 0.0001})`;
        }
        
        // Efecto parallax en cierre icon
        const cierreIcon = document.querySelector('.cierre-icon');
        if (cierreIcon) {
          cierreIcon.style.transform = `rotate(${scrolled * 0.1}deg)`;
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
// QUOTE TYPING EFFECT
// ===========================================

function setupQuoteEffect() {
  const quoteTexts = document.querySelectorAll('.reflexion-text');
  
  quoteTexts.forEach(text => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          text.style.opacity = '0';
          
          setTimeout(() => {
            text.style.transition = 'opacity 1.5s ease';
            text.style.opacity = '1';
          }, 300);
        }
      });
    }, { threshold: 0.3 });
    
    observer.observe(text);
  });
}

// ===========================================
// CARD ICON ROTATION
// ===========================================

function setupIconRotation() {
  const icons = document.querySelectorAll('.card-icon');
  
  icons.forEach(icon => {
    icon.addEventListener('mouseenter', () => {
      icon.style.transform = 'rotateY(360deg) scale(1.15)';
    });
    
    icon.addEventListener('mouseleave', () => {
      icon.style.transform = 'rotateY(0deg) scale(1)';
    });
  });
}

// ===========================================
// CIERRE SECTION INTERACTION
// ===========================================

function setupCierreInteraction() {
  const cierreSection = document.querySelector('.cierre-section');
  
  if (cierreSection) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          cierreSection.style.transform = 'scale(0.95)';
          
          setTimeout(() => {
            cierreSection.style.transition = 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)';
            cierreSection.style.transform = 'scale(1)';
          }, 100);
        }
      });
    }, { threshold: 0.3 });
    
    observer.observe(cierreSection);
  }
}

// ===========================================
// INITIALIZATION
// ===========================================

document.addEventListener('DOMContentLoaded', () => {
  console.log('🚀 Inicializando Aprendizajes Obtenidos...');
  
  // Inicializar página principal
  new AprendizajesPage();
  
  // Inicializar efectos adicionales
  animateTags();
  animateHighlightBoxes();
  animateCardNumbers();
  setupParallaxEffect();
  setupSmoothScroll();
  setupKeyboardShortcuts();
  setupQuoteEffect();
  setupIconRotation();
  setupCierreInteraction();
  
  console.log('✨ Página completamente cargada');
  console.log('📱 Responsive activo');
  console.log('🎨 Animaciones inspiradoras activas');
  console.log('🎓 3 aprendizajes clave documentados');
  console.log('💭 Reflexión personal incluida');
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