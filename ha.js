document.querySelectorAll('.nav-links a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const sectionId = this.getAttribute('href').substring(1);
      document.querySelector(`#${sectionId}`).scrollIntoView({
        behavior: 'smooth'
      });
      document.querySelector('.nav-links').classList.remove('active');
    });
  });
 
  function showVideo() {
    document.getElementById("videoOverlay").style.display = "flex";
  }

  function hideVideo() {
    const overlay = document.getElementById("videoOverlay");
    const iframe = document.getElementById("ytVideo");

    overlay.style.display = "none";

    // Reset lại video để dừng phát
    iframe.src = iframe.src;
  }


  document.querySelector('.hamburger').addEventListener('click', () => {
    document.querySelector('.nav-links').classList.toggle('active');
  });
  const dishTrack = document.querySelector('.dish-track');
const dishCards = document.querySelectorAll('.dish-card');
const totalCards = dishCards.length;
const visibleCards = 5;
let currentDishIndex = 0;

function updateDishSlider() {
  const offset = currentDishIndex * (100 / visibleCards);
  dishTrack.style.transform = `translateX(-${offset}%)`;
}

function startDishSlideshow() {
  setInterval(() => {
    currentDishIndex++;
    if (currentDishIndex >= totalCards - visibleCards + 1) {
      currentDishIndex = 0;
      dishTrack.style.transition = 'none'; // Disable transition for instant reset
      updateDishSlider();
      // Force reflow to apply transition again
      dishTrack.offsetHeight;
      dishTrack.style.transition = 'transform 0.5s ease-in-out';
    } else {
      updateDishSlider();
    }
  }, 3000);
}

// Start the slideshow
startDishSlideshow();

  const cards = document.querySelectorAll('.service-card, .contact-form, .content');
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add(entry.target.classList.contains('content') ? 'show' : 'visible');
        } else if (entry.target.classList.contains('content')) {
          entry.target.classList.remove('show');
        }
      });
    },
    { threshold: 0.2 }
  );

  cards.forEach(card => observer.observe(card));

  document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault();
    alert('Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm.');
    this.reset();
  });