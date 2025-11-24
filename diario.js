// ===========================================
// DIARIO REFLEXIVO SEMANAL - JAVASCRIPT
// Animaciones y efectos interactivos
// ===========================================

class DiarioPage {
  constructor() {
    this.init();
  }
  
  init() {
    this.setupScrollAnimations();
    this.setupTimelineInteractions();
    this.updateTime();
    console.log('✅ Página de Diario Reflexivo inicializada');
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
    
    // Observar items del timeline
    document.querySelectorAll('.timeline-item').forEach(item => {
      observer.observe(item);
    });
    
    // Observar tarjetas extra
    document.querySelectorAll('.extra-card').forEach(card => {
      observer.observe(card);
    });
  }
  
  // Interacciones del timeline
  setupTimelineInteractions() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach((item, index) => {
      // Efecto de hover progresivo en la línea
      item.addEventListener('mouseenter', () => {
        const markerLine = item.querySelector('.marker-line');
        if (markerLine) {
          markerLine.style.background = `linear-gradient(to bottom, 
            var(--blue) 0%, 
            var(--purple) 50%, 
            rgba(139, 92, 246, 0.3) 100%)`;
        }
      });
      
      item.addEventListener('mouseleave', () => {
        const markerLine = item.querySelector('.marker-line');
        if (markerLine) {
          markerLine.style.background = `linear-gradient(to bottom, 
            var(--blue) 0%, 
            rgba(66, 165, 245, 0.3) 100%)`;
        }
      });
      
      // Animación de aparición con delay
      setTimeout(() => {
        item.style.opacity = '1';
        item.style.transform = 'translateY(0)';
      }, index * 150);
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
// TIMELINE PROGRESS TRACKING
// ===========================================

function setupTimelineProgress() {
  const timelineItems = document.querySelectorAll('.timeline-item');
  let completedCount = 0;
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains('completed')) {
        entry.target.classList.add('completed');
        completedCount++;
        
        const markerDot = entry.target.querySelector('.marker-dot');
        if (markerDot) {
          // Animación de check
          setTimeout(() => {
            markerDot.innerHTML = '<i class="fa-solid fa-check" style="color: white; font-size: 12px;"></i>';
            markerDot.style.display = 'flex';
            markerDot.style.alignItems = 'center';
            markerDot.style.justifyContent = 'center';
          }, 500);
        }
        
        console.log(`✅ Jornada completada: ${completedCount}/${timelineItems.length}`);
      }
    });
  }, {
    threshold: 0.8
  });
  
  timelineItems.forEach(item => observer.observe(item));
}

// ===========================================
// EXTRA CARDS ANIMATION
// ===========================================

function animateExtraCards() {
  const extraCards = document.querySelectorAll('.extra-card');
  
  extraCards.forEach((card, index) => {
    card.addEventListener('mouseenter', () => {
      // Efecto de brillo
      card.style.background = 'rgba(139, 92, 246, 0.15)';
      
      // Rotación del icono
      const icon = card.querySelector('.extra-card-icon');
      if (icon) {
        icon.style.transform = 'rotateY(360deg) scale(1.1)';
      }
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.background = 'rgba(255, 255, 255, 0.05)';
      
      const icon = card.querySelector('.extra-card-icon');
      if (icon) {
        icon.style.transform = 'rotateY(0deg) scale(1)';
      }
    });
    
    // Animación de entrada progresiva
    setTimeout(() => {
      card.classList.add('visible');
    }, 1000 + (index * 200));
  });
}

// ===========================================
// HIGHLIGHT BADGES ANIMATION
// ===========================================

function animateHighlightBadges() {
  const badges = document.querySelectorAll('.timeline-badge');
  
  badges.forEach(badge => {
    badge.addEventListener('mouseenter', () => {
      badge.style.transform = 'scale(1.15) rotate(2deg)';
    });
    
    badge.addEventListener('mouseleave', () => {
      badge.style.transform = 'scale(1) rotate(0deg)';
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
        
        // Efecto parallax en extra icon
        const extraIcon = document.querySelector('.extra-icon');
        if (extraIcon) {
          extraIcon.style.transform = `translateY(${-scrolled * 0.05}px) rotate(${scrolled * 0.1}deg)`;
        }
        
        ticking = false;
      });
      
      ticking = true;
    }
  });
}

// ===========================================
// TIMELINE ITEM COUNTER
// ===========================================

function addTimelineCounter() {
  const timelineItems = document.querySelectorAll('.timeline-item');
  
  timelineItems.forEach((item, index) => {
    const content = item.querySelector('.timeline-content');
    if (content) {
      // Agregar número de jornada como marca de agua
      const watermark = document.createElement('div');
      watermark.style.position = 'absolute';
      watermark.style.top = '10px';
      watermark.style.right = '10px';
      watermark.style.fontSize = '4rem';
      watermark.style.fontWeight = '900';
      watermark.style.color = 'rgba(255, 255, 255, 0.03)';
      watermark.style.pointerEvents = 'none';
      watermark.style.userSelect = 'none';
      watermark.textContent = `${index + 1}`;
      content.appendChild(watermark);
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
// HIGHLIGHT ITEMS INTERACTION
// ===========================================

function setupHighlightItems() {
  const highlightItems = document.querySelectorAll('.highlight-item');
  
  highlightItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
      item.style.transform = 'translateY(-5px) scale(1.05)';
      item.style.boxShadow = '0 8px 20px rgba(66, 165, 245, 0.4)';
    });
    
    item.addEventListener('mouseleave', () => {
      item.style.transform = 'translateY(0) scale(1)';
      item.style.boxShadow = 'none';
    });
  });
}

// ===========================================
// INITIALIZATION
// ===========================================

document.addEventListener('DOMContentLoaded', () => {
  console.log('🚀 Inicializando Diario Reflexivo Semanal...');
  
  // Inicializar página principal
  new DiarioPage();
  
  // Inicializar efectos adicionales
  setupTimelineProgress();
  animateExtraCards();
  animateHighlightBadges();
  setupSmoothScroll();
  setupParallaxEffect();
  addTimelineCounter();
  setupKeyboardShortcuts();
  setupHighlightItems();
  
  console.log('✨ Página completamente cargada');
  console.log('📱 Responsive activo');
  console.log('🎨 Timeline animado');
  console.log('⏱️ 5 jornadas documentadas');
});

// ===========================================
// PERFORMANCE OPTIMIZATION
// ===========================================

// Reducir animaciones en dispositivos de bajo rendimiento
if (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2) {
  document.body.classList.add('reduce-animations');
  console.log('⚡ Modo de rendimiento activado');
}