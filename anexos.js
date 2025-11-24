// ===========================================
// ANEXOS - CARRUSELES 3D ESPECTACULARES
// Sistema de carruseles independientes con efectos 3D
// ===========================================

class Carousel3D {
  constructor(carouselId, trackId, indicatorsId) {
    this.carousel = document.getElementById(carouselId);
    this.track = document.getElementById(trackId);
    this.indicatorsContainer = document.getElementById(indicatorsId);
    this.slides = [];
    this.currentIndex = 0;
    this.isAnimating = false;
    this.autoplayInterval = null;
    this.autoplayDelay = 5000;
    
    this.init();
  }
  
  init() {
    if (!this.track) return;
    
    this.slides = Array.from(this.track.querySelectorAll('.carousel-slide'));
    
    if (this.slides.length === 0) return;
    
    this.setupSlides();
    this.createIndicators();
    this.setupEventListeners();
    this.updateSlides();
    this.startAutoplay();
    
    console.log(`✅ Carrusel ${this.carousel.id} inicializado con ${this.slides.length} slides`);
  }
  
  setupSlides() {
    // No configurar posiciones 3D iniciales, lo haremos dinámicamente
    this.slides.forEach((slide, index) => {
      // Click en slide para ir a ella
      slide.addEventListener('click', () => {
        if (index !== this.currentIndex) {
          this.goToSlide(index);
        }
      });
    });
  }
  
  updateSlides() {
    this.slides.forEach((slide, index) => {
      const indicators = this.indicatorsContainer.querySelectorAll('.indicator-dot');
      const position = index - this.currentIndex;
      
      if (index === this.currentIndex) {
        // Slide activa: CENTRADA Y GRANDE
        slide.style.transform = `
          translate(-50%, -50%)
          translate3d(0, 0, 0)
          rotateY(0deg)
          scale(1)
        `;
        slide.style.opacity = '1';
        slide.style.zIndex = '10';
        slide.style.pointerEvents = 'auto';
        slide.style.filter = 'brightness(1) blur(0px)';
        if (indicators[index]) indicators[index].classList.add('active');
      } else {
        // Slides laterales: pequeñas y a los lados
        const offsetX = position * 550; // Separación horizontal
        const offsetZ = -300; // Profundidad
        const rotation = position * 15; // Rotación leve
        const scale = 0.7; // Más pequeñas
        
        slide.style.transform = `
          translate(-50%, -50%)
          translate3d(${offsetX}px, 0, ${offsetZ}px)
          rotateY(${-rotation}deg)
          scale(${scale})
        `;
        slide.style.opacity = '0.5';
        slide.style.zIndex = Math.abs(position) > 1 ? '0' : '5';
        slide.style.pointerEvents = Math.abs(position) > 1 ? 'none' : 'auto';
        slide.style.filter = 'brightness(0.6) blur(2px)';
        if (indicators[index]) indicators[index].classList.remove('active');
      }
    });
  }
  
  createIndicators() {
    if (!this.indicatorsContainer) return;
    
    this.indicatorsContainer.innerHTML = '';
    
    this.slides.forEach((_, index) => {
      const dot = document.createElement('div');
      dot.className = 'indicator-dot';
      if (index === 0) dot.classList.add('active');
      
      dot.addEventListener('click', () => {
        this.goToSlide(index);
      });
      
      this.indicatorsContainer.appendChild(dot);
    });
  }
  
  setupEventListeners() {
    const prevBtn = this.carousel.querySelector('.carousel-btn.prev');
    const nextBtn = this.carousel.querySelector('.carousel-btn.next');
    
    if (prevBtn) {
      prevBtn.addEventListener('click', () => this.prevSlide());
    }
    
    if (nextBtn) {
      nextBtn.addEventListener('click', () => this.nextSlide());
    }
    
    // Pausar autoplay al hover
    this.carousel.addEventListener('mouseenter', () => this.stopAutoplay());
    this.carousel.addEventListener('mouseleave', () => this.startAutoplay());
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        this.prevSlide();
      } else if (e.key === 'ArrowRight') {
        this.nextSlide();
      }
    });
    
    // Touch events para móvil
    let touchStartX = 0;
    let touchEndX = 0;
    
    this.carousel.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    });
    
    this.carousel.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      this.handleSwipe(touchStartX, touchEndX);
    });
  }
  
  handleSwipe(startX, endX) {
    const swipeThreshold = 50;
    const diff = startX - endX;
    
    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        this.nextSlide();
      } else {
        this.prevSlide();
      }
    }
  }
  
  goToSlide(index) {
    if (this.isAnimating || index === this.currentIndex) return;
    
    this.isAnimating = true;
    this.currentIndex = index;
    this.updateSlides();
    
    setTimeout(() => {
      this.isAnimating = false;
    }, 800);
    
    this.resetAutoplay();
  }
  
  nextSlide() {
    const nextIndex = (this.currentIndex + 1) % this.slides.length;
    this.goToSlide(nextIndex);
  }
  
  prevSlide() {
    const prevIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
    this.goToSlide(prevIndex);
  }
  
  startAutoplay() {
    if (this.autoplayInterval) return;
    
    this.autoplayInterval = setInterval(() => {
      this.nextSlide();
    }, this.autoplayDelay);
  }
  
  stopAutoplay() {
    if (this.autoplayInterval) {
      clearInterval(this.autoplayInterval);
      this.autoplayInterval = null;
    }
  }
  
  resetAutoplay() {
    this.stopAutoplay();
    this.startAutoplay();
  }
  
  // Método para agregar imágenes dinámicamente
  addImage(imageUrl, caption) {
    const slideHTML = `
      <div class="carousel-slide">
        <div class="slide-content">
          <div class="slide-image-placeholder">
            <img src="${imageUrl}" alt="${caption}" />
          </div>
          <div class="slide-caption">
            <p>${caption}</p>
          </div>
        </div>
      </div>
    `;
    
    this.track.insertAdjacentHTML('beforeend', slideHTML);
    this.init(); // Re-inicializar
  }
}

// ===========================================
// CLOCK UPDATE
// ===========================================

function updateTime() {
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

// ===========================================
// PARALLAX EFFECTS
// ===========================================

function setupParallaxEffects() {
  let ticking = false;
  
  document.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const scrolled = window.pageYOffset;
        
        // Efecto parallax en hero icon
        const heroIcon = document.querySelector('.hero-icon');
        if (heroIcon) {
          heroIcon.style.transform = `translateY(${scrolled * 0.1}px) rotate(${scrolled * 0.1}deg)`;
        }
        
        // Efecto parallax en divider icon
        const dividerIcon = document.querySelector('.divider-icon');
        if (dividerIcon) {
          dividerIcon.style.transform = `scale(${1 + scrolled * 0.0001}) rotate(${scrolled * 0.2}deg)`;
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
    // Scroll suave con Page Up/Down
    if (e.key === 'PageUp') {
      e.preventDefault();
      window.scrollBy({ top: -window.innerHeight, behavior: 'smooth' });
    } else if (e.key === 'PageDown') {
      e.preventDefault();
      window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
    }
    
    // Ir arriba con Home
    if (e.key === 'Home' && !e.ctrlKey) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    // Ir abajo con End
    if (e.key === 'End' && !e.ctrlKey) {
      e.preventDefault();
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }
  });
  
  console.log('⌨️ Atajos de teclado habilitados');
}

// ===========================================
// INITIALIZATION
// ===========================================

let carousel1, carousel2;

document.addEventListener('DOMContentLoaded', () => {
  console.log('🚀 Inicializando Anexos con Carruseles 3D...');
  
  // Inicializar carruseles
  carousel1 = new Carousel3D('carousel1', 'track1', 'indicators1');
  carousel2 = new Carousel3D('carousel2', 'track2', 'indicators2');
  
  // Inicializar efectos
  updateTime();
  setupParallaxEffects();
  setupSmoothScroll();
  setupKeyboardShortcuts();
  
  console.log('✨ Página completamente cargada');
  console.log('📱 Responsive activo');
  console.log('🎨 Carruseles 3D activos');
  console.log('⌨️ Controles: Flechas, Click, Swipe');
  console.log('🔄 Autoplay activado (5s)');
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
// FUNCIÓN GLOBAL PARA AGREGAR IMÁGENES
// ===========================================

/**
 * Función para agregar imágenes a los carruseles
 * 
 * Uso:
 * addImageToCarousel(1, 'ruta/imagen.jpg', 'Descripción de la imagen')
 * addImageToCarousel(2, 'ruta/imagen2.jpg', 'Descripción de la feria')
 */
function addImageToCarousel(carouselNumber, imageUrl, caption) {
  if (carouselNumber === 1 && carousel1) {
    carousel1.addImage(imageUrl, caption);
  } else if (carouselNumber === 2 && carousel2) {
    carousel2.addImage(imageUrl, caption);
  } else {
    console.warn(`Carrusel ${carouselNumber} no encontrado`);
  }
}

// Hacer la función global
window.addImageToCarousel = addImageToCarousel;

console.log('📸 Para agregar imágenes usa: addImageToCarousel(1, "ruta.jpg", "Descripción")');

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