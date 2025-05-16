
    const sections = document.querySelectorAll('.destination-section');
    const navDotsContainer = document.querySelector('.nav-dots');
    const previewBar = document.querySelector('.preview-bar');
    const sectionImages = Array.from(sections).map(section => section.style.backgroundImage);
    sections.forEach((_, index) => {
      const dot = document.createElement('div');
      dot.classList.add('nav-dot');
      dot.dataset.index = index;
      navDotsContainer.appendChild(dot);
    });

    // Initialize preview bar with current section's image and 3 next sections
    function updatePreviewBar(currentIndex) {
      // Set preview bar background to current section's image
      previewBar.style.backgroundImage = sectionImages[currentIndex];
      previewBar.innerHTML = ''; // Clear previous items

      // Add 3 next sections' images
      for (let i = 1; i <= 3; i++) {
        const nextIndex = (currentIndex + i) % sectionImages.length;
        const previewItem = document.createElement('div');
        previewItem.classList.add('preview-item');
        previewItem.style.backgroundImage = sectionImages[nextIndex];
        previewBar.appendChild(previewItem);
      }
    }

    // Set initial preview bar
    updatePreviewBar(0);

    // Intersection Observer for active slide, dots, and preview bar
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const section = entry.target;
        const index = Array.from(sections).indexOf(section);
        if (entry.isIntersecting) {
          section.classList.add('active');
          document.querySelectorAll('.nav-dot').forEach(dot => dot.classList.remove('active'));
          const activeDot = document.querySelector(`.nav-dot[data-index="${index}"]`);
          if (activeDot) activeDot.classList.add('active');
          // Update preview bar
          updatePreviewBar(index);
        } else {
          section.classList.remove('active');
        }
      });
    }, { threshold: 0.5 });

    sections.forEach(section => observer.observe(section));
    document.querySelectorAll('.nav-dot').forEach(dot => {
      dot.addEventListener('click', () => {
        const index = dot.dataset.index;
        sections[index].scrollIntoView({ behavior: 'smooth' });
      });
    });
    document.querySelectorAll('.filter-button').forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        const region = button.getAttribute('data-region');
        sections.forEach((section, index) => {
          const sectionRegion = section.getAttribute('data-region');
          if (region === 'all' || region === sectionRegion) {
            section.style.display = 'flex';   
            navDotsContainer.children[index].style.display = 'block';
          } else {
            section.style.display = 'none';
            navDotsContainer.children[index].style.display = 'none';
          }
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
        updatePreviewBar(0);
      });
    });

    document.getElementById('home').addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    function toggleMenu() {
  const nav = document.querySelector('.nav-links');
  nav.classList.toggle('active');
}