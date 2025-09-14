// ===== Navbar Scroll =====
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  if (navbar) {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  }
});

// ===== Section Reveal on Scroll =====
const sections = document.querySelectorAll('section');
window.addEventListener('scroll', () => {
  sections.forEach(section => {
    const top = section.getBoundingClientRect().top;
    if(top < window.innerHeight - 100){
      section.classList.add('visible');
    }
  });
});

// ===== Gallery Masonry Layout & Scroll =====
document.addEventListener('DOMContentLoaded', () => {
  const gallerySlide = document.querySelector('.gallery-slide');
  let slideIndex = 0;

  window.scrollGallery = function(dir) {
    if (!gallerySlide) return;
    const width = gallerySlide.children[0].offsetWidth + 10; // gap adjustment
    slideIndex += dir;
    if(slideIndex < 0) slideIndex = 0;
    if(slideIndex > gallerySlide.children.length - 3) slideIndex = gallerySlide.children.length - 3;
    gallerySlide.style.transform = `translateX(${-width * slideIndex}px)`;
  };
});

// ===== Lightbox =====
const lightbox = document.getElementById('lightbox');
let currentSlide = 0;

const galleryItems = document.querySelectorAll('.gallery-item img');

window.openLightbox = function(index) {
  if (!lightbox || galleryItems.length === 0) return;
  currentSlide = index;
  const src = galleryItems[index].getAttribute('src');

  lightbox.style.display = 'block';
  if (src.includes('video')) {
    lightbox.innerHTML = `
      <span class="lightbox-close" onclick="closeLightbox()">&times;</span>
      <span class="lightbox-prev" onclick="changeSlide(-1)">&#10094;</span>
      <video class="lightbox-content" controls autoplay src="${src}"></video>
      <span class="lightbox-next" onclick="changeSlide(1)">&#10095;</span>
    `;
  } else {
    lightbox.innerHTML = `
      <span class="lightbox-close" onclick="closeLightbox()">&times;</span>
      <span class="lightbox-prev" onclick="changeSlide(-1)">&#10094;</span>
      <img class="lightbox-content" src="${src}" alt="Expanded view">
      <span class="lightbox-next" onclick="changeSlide(1)">&#10095;</span>
    `;
  }
};

window.closeLightbox = function() {
  if (lightbox) lightbox.style.display = 'none';
};

window.changeSlide = function(dir) {
  let nextIndex = currentSlide + dir;
  if (nextIndex < 0) nextIndex = 0;
  if (nextIndex > galleryItems.length - 1) nextIndex = galleryItems.length - 1;
  openLightbox(nextIndex);
  currentSlide = nextIndex;
};
