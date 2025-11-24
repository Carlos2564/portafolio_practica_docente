// ===========================================
// EVIDENCIAS - MODERN CAROUSEL
// JavaScript dinámico y responsive para 8 slides
// ===========================================

// Variables globales
let carousel;

// Funciones globales para los botones (DEBEN ESTAR PRIMERO)
function nextSlide() {
  if (carousel) carousel.nextSlide();
}

function prevSlide() {
  if (carousel) carousel.prevSlide();
}

function goToSlide(slideNumber) {
  if (carousel) carousel.goToSlide(slideNumber);
}

class ModernCarousel {
  constructor() {
    this.currentSlide = 1;
    this.totalSlides = 8; // 8 evidencias
    this.isAnimating = false;
    this.autoplayInterval = null;
    this.autoplayDelay = 5000; // 5 segundos
    
    this.track = document.getElementById('carouselTrack');
    this.slides = document.querySelectorAll('.carousel-slide');
    this.dots = document.querySelectorAll('.dot');
    this.currentSlideElement = document.querySelector('.current-slide');
    this.progressBar = document.getElementById('progressBar');
    
    this.init();
  }
  
  init() {
    // Validar que todos los elementos necesarios existen
    if (!this.track) {
      console.error('❌ Error: No se encontró el track del carrusel');
      return;
    }
    
    if (this.slides.length === 0) {
      console.error('❌ Error: No se encontraron slides');
      return;
    }
    
    console.log(`✅ Carrusel encontrado con ${this.slides.length} slides`);
    
    this.updateCarousel();
    this.setupEventListeners();
    this.startAutoplay();
    this.preloadImages();
    this.updateTime();
    console.log('✅ Carrusel de evidencias inicializado correctamente');
  }
  
  setupEventListeners() {
    // Teclado
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') this.prevSlide();
      if (e.key === 'ArrowRight') this.nextSlide();
    });
    
    // Touch/Swipe para móviles
    let touchStartX = 0;
    let touchEndX = 0;
    
    this.track.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    this.track.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      this.handleSwipe(touchStartX, touchEndX);
    }, { passive: true });
    
    // Pausar autoplay al hover
    const carouselSection = document.getElementById('modern-carousel');
    if (carouselSection) {
      carouselSection.addEventListener('mouseenter', () => this.stopAutoplay());
      carouselSection.addEventListener('mouseleave', () => this.startAutoplay());
    }
    
    // Visibilidad de la página
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.stopAutoplay();
      } else {
        this.startAutoplay();
      }
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
  
  nextSlide() {
    if (this.isAnimating) return;
    
    this.currentSlide++;
    if (this.currentSlide > this.totalSlides) {
      this.currentSlide = 1;
    }
    
    this.updateCarousel();
    this.resetAutoplay();
  }
  
  prevSlide() {
    if (this.isAnimating) return;
    
    this.currentSlide--;
    if (this.currentSlide < 1) {
      this.currentSlide = this.totalSlides;
    }
    
    this.updateCarousel();
    this.resetAutoplay();
  }
  
  goToSlide(slideNumber) {
    if (this.isAnimating || slideNumber === this.currentSlide) return;
    
    this.currentSlide = slideNumber;
    this.updateCarousel();
    this.resetAutoplay();
  }
  
  updateCarousel() {
    this.isAnimating = true;
    
    // Actualizar slides
    this.slides.forEach((slide, index) => {
      slide.classList.remove('active', 'prev', 'next');
      
      const slideNumber = index + 1;
      
      if (slideNumber === this.currentSlide) {
        slide.classList.add('active');
      } else if (slideNumber === this.currentSlide - 1 || 
                 (this.currentSlide === 1 && slideNumber === this.totalSlides)) {
        slide.classList.add('prev');
      } else if (slideNumber === this.currentSlide + 1 || 
                 (this.currentSlide === this.totalSlides && slideNumber === 1)) {
        slide.classList.add('next');
      }
    });
    
    // Actualizar dots
    this.dots.forEach((dot, index) => {
      dot.classList.toggle('active', index + 1 === this.currentSlide);
    });
    
    // Actualizar contador
    if (this.currentSlideElement) {
      this.currentSlideElement.textContent = this.currentSlide;
    }
    
    // Actualizar progress bar
    const progress = (this.currentSlide / this.totalSlides) * 100;
    if (this.progressBar) {
      this.progressBar.style.width = progress + '%';
    }
    
    // Animación del track
    const offset = -(this.currentSlide - 1) * 100;
    if (this.track) {
      this.track.style.transform = `translateX(${offset}%)`;
    }
    
    // Log para debugging
    console.log(`📍 Evidencia actual: ${this.currentSlide}/${this.totalSlides}`);
    
    // Esperar a que termine la animación
    setTimeout(() => {
      this.isAnimating = false;
    }, 800);
  }
  
  startAutoplay() {
    this.stopAutoplay(); // Limpiar cualquier interval existente
    
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
  
  preloadImages() {
    // Precargar imágenes de las slides para mejor rendimiento
    this.slides.forEach((slide) => {
      const img = slide.querySelector('.slide-image');
      if (img && img.dataset.src) {
        img.src = img.dataset.src;
      }
      
      // Manejar error de carga de imágenes
      if (img) {
        img.addEventListener('error', () => {
          this.createPlaceholderImage(img, slide);
        });
        
        // Si la imagen ya tiene un error, crear placeholder inmediatamente
        if (img.complete && img.naturalWidth === 0) {
          this.createPlaceholderImage(img, slide);
        }
      }
    });
  }
  
  createPlaceholderImage(imgElement, slide) {
    const slideNumber = parseInt(slide.dataset.slide);
    const wrapper = imgElement.parentElement;
    
    // Crear canvas con gradiente
    const canvas = document.createElement('canvas');
    canvas.width = 1000;
    canvas.height = 500;
    const ctx = canvas.getContext('2d');
    
    // Gradientes de colores para 8 evidencias
    const gradients = [
      ['#667eea', '#764ba2'],
      ['#f093fb', '#f5576c'],
      ['#4facfe', '#00f2fe'],
      ['#43e97b', '#38f9d7'],
      ['#fa709a', '#fee140'],
      ['#30cfd0', '#330867'],
      ['#a8edea', '#fed6e3'],
      ['#ff9a9e', '#fecfef'],
    ];
    
    const [color1, color2] = gradients[(slideNumber - 1) % gradients.length];
    
    const gradient = ctx.createLinearGradient(0, 0, 1000, 500);
    gradient.addColorStop(0, color1);
    gradient.addColorStop(1, color2);
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 1000, 500);
    
    // Patrón decorativo
    ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
    for (let i = 0; i < 40; i++) {
      ctx.beginPath();
      ctx.arc(
        Math.random() * 1000,
        Math.random() * 500,
        Math.random() * 70 + 40,
        0,
        Math.PI * 2
      );
      ctx.fill();
    }
    
    // Icono de evidencia
    ctx.fillStyle = 'white';
    ctx.font = 'bold 120px "Font Awesome 6 Free"';
    ctx.textAlign = 'center';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
    ctx.shadowBlur = 30;
    ctx.fillText('📸', 500, 200);
    
    // Texto
    ctx.font = 'bold 56px Rubik, Arial, sans-serif';
    ctx.fillText(`Evidencia ${slideNumber}`, 500, 300);
    
    ctx.font = '28px Rubik, Arial, sans-serif';
    ctx.fillText('Documentación de práctica docente', 500, 350);
    
    imgElement.src = canvas.toDataURL();
    if (wrapper) {
      wrapper.classList.remove('loading');
    }
  }
  
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
    setInterval(updateClock, 60000); // Actualizar cada minuto
  }
}

// ===========================================
// PARALLAX EFFECT FOR IMAGES
// ===========================================

function initParallaxEffect() {
  const slides = document.querySelectorAll('.carousel-slide');
  
  slides.forEach(slide => {
    const imageWrapper = slide.querySelector('.slide-image-wrapper');
    
    if (!imageWrapper) return;
    
    slide.addEventListener('mousemove', (e) => {
      if (!slide.classList.contains('active')) return;
      
      const rect = slide.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const percentX = (x - centerX) / centerX;
      const percentY = (y - centerY) / centerY;
      
      const moveX = percentX * 15;
      const moveY = percentY * 15;
      
      imageWrapper.style.transform = `
        translateY(-5px) 
        scale(1.02) 
        perspective(1000px) 
        rotateY(${moveX * 0.5}deg) 
        rotateX(${-moveY * 0.5}deg)
      `;
    });
    
    slide.addEventListener('mouseleave', () => {
      imageWrapper.style.transform = '';
    });
  });
}

// ===========================================
// ANIMATED COUNTER
// ===========================================

function animateCounter() {
  const counterElement = document.querySelector('.carousel-counter');
  
  if (!counterElement) return;
  
  setInterval(() => {
    counterElement.style.transform = 'scale(1.1)';
    setTimeout(() => {
      counterElement.style.transform = 'scale(1)';
    }, 200);
  }, 5000);
}

// ===========================================
// KEYBOARD SHORTCUTS INFO
// ===========================================

function showKeyboardShortcuts() {
  console.log('⌨️ Atajos de teclado:');
  console.log('   ← Flecha izquierda: Evidencia anterior');
  console.log('   → Flecha derecha: Siguiente evidencia');
  console.log('   1-8: Clic en dots para ir a evidencia específica');
}

// ===========================================
// INITIALIZATION
// ===========================================

document.addEventListener('DOMContentLoaded', () => {
  console.log('🚀 Inicializando carrusel de evidencias...');
  
  // Verificar que los elementos existen
  const track = document.getElementById('carouselTrack');
  const slides = document.querySelectorAll('.carousel-slide');
  const dots = document.querySelectorAll('.dot');
  
  console.log('📋 Elementos encontrados:');
  console.log('  - Track:', track ? '✅' : '❌');
  console.log('  - Slides:', slides.length);
  console.log('  - Dots:', dots.length);
  
  // Inicializar carrusel principal
  carousel = new ModernCarousel();
  
  // Inicializar efectos adicionales
  initParallaxEffect();
  animateCounter();
  
  // Mostrar información de atajos
  showKeyboardShortcuts();
  
  console.log('🎨 Carrusel de evidencias listo');
  console.log('📱 Totalmente responsive');
  console.log('✨ Con animaciones suaves y efectos modernos');
  console.log('📸 8 evidencias disponibles');
  
  // Test de las funciones globales
  console.log('🧪 Probando funciones globales:');
  console.log('  - nextSlide:', typeof nextSlide === 'function' ? '✅' : '❌');
  console.log('  - prevSlide:', typeof prevSlide === 'function' ? '✅' : '❌');
  console.log('  - goToSlide:', typeof goToSlide === 'function' ? '✅' : '❌');
});

// ===========================================
// PERFORMANCE OPTIMIZATION
// ===========================================

// Usar requestAnimationFrame para animaciones suaves
let ticking = false;

function optimizeAnimations() {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      ticking = false;
    });
    ticking = true;
  }
}

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