// DIAGNÓSTICO EDUCATIVO - JAVASCRIPT
class DiagnosticoPage {
  constructor() {
    this.currentSlide = 0;
    this.totalSlides = 5; // 5 imágenes en el carrusel
    this.zoomLevel = 1;
    this.init();
  }
  
  init() {
    this.setupCarousel();
    this.setupImageViewer();
    this.setupModal();
    this.updateTime();
    console.log('✅ Página de Diagnóstico inicializada');
  }
  
  setupCarousel() {
    const track = document.getElementById('spectacularTrack');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const thumbnails = document.querySelectorAll('.thumbnail');
    
    if (!track) return;
    
    prevBtn?.addEventListener('click', () => this.prevSlide());
    nextBtn?.addEventListener('click', () => this.nextSlide());
    
    thumbnails.forEach((thumb, index) => {
      thumb.addEventListener('click', () => this.goToSlide(index));
    });
    
    // Keyboard
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') this.prevSlide();
      if (e.key === 'ArrowRight') this.nextSlide();
    });
    
    // Touch
    let touchStartX = 0;
    track.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].clientX;
    });
    
    track.addEventListener('touchend', (e) => {
      const touchEndX = e.changedTouches[0].clientX;
      const diff = touchStartX - touchEndX;
      if (Math.abs(diff) > 50) {
        diff > 0 ? this.nextSlide() : this.prevSlide();
      }
    });
    
    this.updateCarousel();
  }
  
  goToSlide(index) {
    this.currentSlide = index;
    this.updateCarousel();
  }
  
  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
    this.updateCarousel();
  }
  
  prevSlide() {
    this.currentSlide = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
    this.updateCarousel();
  }
  
  updateCarousel() {
    const track = document.getElementById('spectacularTrack');
    const thumbnails = document.querySelectorAll('.thumbnail');
    const progressBar = document.querySelector('.progress-bar');
    
    if (track) {
      track.style.transform = `translateX(-${this.currentSlide * 100}%)`;
    }
    
    thumbnails.forEach((thumb, index) => {
      thumb.classList.toggle('active', index === this.currentSlide);
    });
    
    if (progressBar) {
      progressBar.style.width = `${((this.currentSlide + 1) / this.totalSlides) * 100}%`;
    }
  }
  
  setupImageViewer() {
    const mainImage = document.getElementById('mainImage');
    const zoomBtns = document.querySelectorAll('.zoom-btn');
    
    zoomBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const action = btn.dataset.action;
        if (action === 'in') this.zoomLevel = Math.min(3, this.zoomLevel + 0.2);
        if (action === 'out') this.zoomLevel = Math.max(1, this.zoomLevel - 0.2);
        if (action === 'reset') this.zoomLevel = 1;
        mainImage.style.transform = `scale(${this.zoomLevel})`;
      });
    });
  }
  
  setupModal() {
    const mainImage = document.getElementById('mainImage');
    const fullscreenBtn = document.getElementById('fullscreenBtn');
    const modal = document.getElementById('fullscreenModal');
    const modalImage = document.getElementById('modalImage');
    const modalClose = document.getElementById('modalClose');
    const carouselImages = document.querySelectorAll('.item-image');
    
    fullscreenBtn?.addEventListener('click', () => {
      modal.classList.add('active');
      modalImage.src = mainImage.src;
    });
    
    carouselImages.forEach(img => {
      img.addEventListener('click', () => {
        const imgSrc = img.querySelector('img').src;
        modal.classList.add('active');
        modalImage.src = imgSrc;
      });
    });
    
    modalClose?.addEventListener('click', () => {
      modal.classList.remove('active');
    });
    
    modal?.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
      }
    });
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
    setInterval(updateClock, 60000);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  console.log('🚀 Inicializando Diagnóstico Educativo...');
  new DiagnosticoPage();
  console.log('✨ Página completamente cargada');
});

if (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2) {
  document.body.classList.add('reduce-animations');
  console.log('⚡ Modo de rendimiento activado');
}