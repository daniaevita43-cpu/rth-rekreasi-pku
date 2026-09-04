const reportForm = document.getElementById('reportForm');
const bookingForm = document.getElementById('bookingForm');
const reportNotice = document.getElementById('reportNotice');
const bookingNotice = document.getElementById('bookingNotice');
const themeToggle = document.getElementById('themeToggle');
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
const revealItems = document.querySelectorAll('.reveal');

const revealOnScroll = () => {
  revealItems.forEach((item) => {
    const rect = item.getBoundingClientRect();
    if (rect.top < window.innerHeight - 70) {
      item.classList.add('visible');
    }
  });
};

const showNoticePopup = (notice, message = '', type = 'success') => {
  if (!notice) return;
  notice.classList.remove('show', 'success', 'error');
  notice.classList.add('show', type);
  notice.innerHTML = `
    <svg class="plant-modal-svg" viewBox="0 0 220 180" role="img" aria-label="Tanaman dalam pot kartun">
      <ellipse cx="110" cy="157" rx="78" ry="14" fill="rgba(30, 84, 45, 0.12)" />
      <path d="M56 100h108c8 0 16 7 16 16v26c0 10-8 18-18 18H58c-10 0-18-8-18-18v-26c0-9 8-16 16-16z" fill="#d98b58" />
      <path d="M45 95h130c8 0 15 7 15 15v5H30v-5c0-8 7-15 15-15z" fill="#c67545" />
      <path d="M68 96c18-22 32-33 42-33 10 0 21 8 33 26l-10 19c-13-9-27-11-47-10L68 96z" fill="#6ec262" />
      <path d="M111 81c5 21 5 38 0 55-7-9-12-20-15-35 5-9 10-15 15-20z" fill="#5ab957" />
      <path d="M132 90c18 8 29 20 35 39-18 0-30-6-43-18l8-21z" fill="#6ccf67" />
      <path d="M95 91c-19 7-31 19-38 37 17 2 30-1 42-12l-4-25z" fill="#78dc74" />
      <path d="M82 112c-5 18-6 27-4 39 11-8 18-20 22-34l-18-5z" fill="#57ba5c" />
      <path d="M130 117c8 16 12 27 14 39-14-6-21-18-25-34l11-5z" fill="#57ba5c" />
      <circle cx="84" cy="80" r="6" fill="#f7d94b" />
      <circle cx="137" cy="82" r="6" fill="#f7d94b" />
      <path d="M84 69c10-16 24-22 38-18 13 4 22 15 27 34-12-7-23-10-39-9-10 0-21 2-26-7z" fill="#4fbf50" opacity="0.95" />
      <path d="M96 82c9-13 17-18 30-18 9 0 17 3 24 7-3 13-11 20-24 26-12 3-18-7-30-15z" fill="#70d36c" opacity="0.9" />
      <path d="M63 100c0 0 14-20 32-30" stroke="#3c8d4c" stroke-width="4" stroke-linecap="round" fill="none" />
      <path d="M110 88c0 0 18-8 39-6" stroke="#3c8d4c" stroke-width="4" stroke-linecap="round" fill="none" />
      <path d="M90 126c0 0 8 8 20 8s20-8 20-8" stroke="#3c8d4c" stroke-width="4" stroke-linecap="round" fill="none" />
      <path d="M80 126h60" stroke="#8d5a39" stroke-width="5" stroke-linecap="round" opacity="0.7" />
    </svg>
  `;
  setTimeout(() => {
    notice.classList.remove('show');
  }, 3000);
};

const applyTheme = (theme) => {
  const isDark = theme === 'dark';
  document.body.classList.toggle('dark-mode', isDark);
  if (themeToggle) {
    themeToggle.textContent = isDark ? '🌙' : '☀️';
    themeToggle.setAttribute('aria-label', isDark ? 'Aktifkan mode light' : 'Aktifkan mode dark');
  }
};

const savedTheme = localStorage.getItem('themeMode');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

applyTheme(savedTheme || (prefersDark ? 'dark' : 'light'));

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const nextTheme = document.body.classList.contains('dark-mode') ? 'light' : 'dark';
    localStorage.setItem('themeMode', nextTheme);
    applyTheme(nextTheme);
  });
}

if (navToggle && navLinks) {
  const closeMobileMenu = () => {
    navLinks.classList.remove('is-open');
    navToggle.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  };

  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('is-open');
    navToggle.classList.toggle('is-open', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMobileMenu);
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 720) closeMobileMenu();
  });
}

const prepareFormNotice = (form, notice, title) => {
  if (!form) return;

  form.addEventListener('submit', async (event) => {
    const isValid = form.checkValidity();

    if (!isValid) {
      event.preventDefault();
      form.reportValidity();
      return;
    }

    event.preventDefault();

    try {
      const formData = Object.fromEntries(new FormData(form).entries());
      const response = await fetch(form.action, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Submission failed');
      }

      if (notice) {
        showNoticePopup(notice, '', 'success');
        form.reset();
      }
    } catch (error) {
      if (notice) {
        showNoticePopup(notice, '', 'error');
      }
    }
  });
};

prepareFormNotice(reportForm, reportNotice, 'Laporan RTH Riau');
prepareFormNotice(bookingForm, bookingNotice, 'Reservasi kegiatan warga');

const carousel = document.querySelector('[data-carousel]');

if (carousel) {
  const track = carousel.querySelector('.policy-track');
  const slides = Array.from(carousel.querySelectorAll('.policy-slide'));
  const dots = Array.from(carousel.querySelectorAll('.policy-dot'));
  const status = carousel.closest('.section').querySelector('.policy-status');
  const previousButton = carousel.querySelector('[data-carousel-prev]');
  const nextButton = carousel.querySelector('[data-carousel-next]');
  let activeIndex = 0;
  let autoPlay;

  const showSlide = (index) => {
    activeIndex = (index + slides.length) % slides.length;
    track.style.transform = `translateX(-${activeIndex * 100}%)`;
    slides.forEach((slide, slideIndex) => {
      const isActive = slideIndex === activeIndex;
      slide.classList.toggle('is-active', isActive);
      slide.setAttribute('aria-hidden', String(!isActive));
    });
    dots.forEach((dot, dotIndex) => {
      const isActive = dotIndex === activeIndex;
      dot.classList.toggle('is-active', isActive);
      dot.setAttribute('aria-selected', String(isActive));
    });
    if (status) status.textContent = `Slide ${activeIndex + 1} dari ${slides.length}`;
  };

  const restartAutoPlay = () => {
    window.clearInterval(autoPlay);
    autoPlay = window.setInterval(() => showSlide(activeIndex + 1), 6500);
  };

  previousButton.addEventListener('click', () => {
    showSlide(activeIndex - 1);
    restartAutoPlay();
  });
  nextButton.addEventListener('click', () => {
    showSlide(activeIndex + 1);
    restartAutoPlay();
  });
  dots.forEach((dot) => {
    dot.addEventListener('click', () => {
      showSlide(Number(dot.dataset.slideTo));
      restartAutoPlay();
    });
  });
  carousel.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') previousButton.click();
    if (event.key === 'ArrowRight') nextButton.click();
  });
  carousel.addEventListener('mouseenter', () => window.clearInterval(autoPlay));
  carousel.addEventListener('mouseleave', restartAutoPlay);
  carousel.addEventListener('focusin', () => window.clearInterval(autoPlay));
  carousel.addEventListener('focusout', (event) => {
    if (!carousel.contains(event.relatedTarget)) restartAutoPlay();
  });

  showSlide(0);
  restartAutoPlay();
}
