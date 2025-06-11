 const video = document.querySelector("#intro video");

  // Khi video kết thúc → ẩn intro, hiện nội dung chính
  video.addEventListener("ended", () => {
    document.getElementById("intro").style.display = "none";
    document.getElementById("main-content").style.display = "block";
    document.body.style.overflow = "auto";
  });
// Đảm bảo DOM đã được tải hoàn tất trước khi thực thi script

document.addEventListener('DOMContentLoaded', () => {
    // Khởi tạo các chức năng 
    initSlider();
    initDestinationCarousel();
    initMobileMenu();
});

/**
 * Khởi tạo slider chính trên hero section
 */
function initSlider() {
    const slideDots = document.querySelectorAll('.slide-dot');
    const heroImage = document.querySelector('.hero-image img');
    const heroContent = document.querySelector('.hero-content');
    
    // Danh sách ảnh cho slider - điểm đến nổi bật ở Việt Nam
    const images = [
        'phở.jpg',
        'huebun.jpg',
        'banhxeo.jpg',
    ];
    
    // Thiết lập overlay để làm tối hình ảnh và làm nổi bật nội dung
    const heroImageContainer = document.querySelector('.hero-image');
    const overlay = document.createElement('div');
    overlay.className = 'hero-overlay';
    overlay.style.position = 'absolute';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.4)';
    overlay.style.zIndex = '1';
    heroImageContainer.appendChild(overlay);
    
    // Đưa hero content lên trên overlay
    if (heroContent) heroContent.style.zIndex = '2';
    
    // Thiết lập trạng thái active cho dot đầu tiên
    let currentSlide = 0;
    
    // Chuẩn bị hình ảnh trước để tránh giật khi chuyển slide
    function preloadImages() {
        for (let i = 0; i < images.length; i++) {
            const img = new Image();
            img.src = images[i];
        }
    }
    
    preloadImages();
    
    // Xử lý sự kiện click vào các dots
    slideDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            // Cập nhật trạng thái active
            slideDots.forEach(d => d.classList.remove('active'));
            dot.classList.add('active');
            
            // Thay đổi ảnh với hiệu ứng fade
            heroImage.style.opacity = '0';
            setTimeout(() => {
                heroImage.src = images[index];
                currentSlide = index;
                setTimeout(() => {
                    heroImage.style.opacity = '1';
                }, 50);
            }, 300);
        });
    });
    
    // Auto slide mỗi 5 giây
    setInterval(() => {
        currentSlide = (currentSlide + 1) % images.length;
        
        // Cập nhật active dot
        slideDots.forEach(d => d.classList.remove('active'));
        slideDots[currentSlide].classList.add('active');
        
        // Thay đổi ảnh với hiệu ứng fade
        heroImage.style.opacity = '0';
        setTimeout(() => {
            heroImage.src = images[currentSlide];
            setTimeout(() => {
                heroImage.style.opacity = '1';
            }, 50);
        }, 300);
    }, 5000);
}

/**
 * Khởi tạo carousel cho phần destinations
 */
function initDestinationCarousel() {
    const destinations = document.querySelectorAll('.destination-card');
    const prevBtn = document.querySelector('.nav-arrow.prev');
    const nextBtn = document.querySelector('.nav-arrow.next');
    const slider = document.querySelector('.destinations-slider');
    
    // Số lượng destinations hiển thị trên mỗi lần scroll
    let visibleItems = getVisibleItems();
    let currentIndex = 0;
    
    // Thiết lập số lượng destinations dựa trên kích thước màn hình
    function getVisibleItems() {
        if (window.innerWidth > 1200) return 4;
        if (window.innerWidth > 992) return 3;
        if (window.innerWidth > 768) return 2;
        return 1;
    }
    
    // Cập nhật số lượng destinations khi thay đổi kích thước màn hình
    window.addEventListener('resize', () => {
        visibleItems = getVisibleItems();
        updateCarousel();
    });
    
    // Xử lý next button
    nextBtn.addEventListener('click', () => {
        if (currentIndex < destinations.length - visibleItems) {
            currentIndex++;
            updateCarousel();
        }
    });
    
    // Xử lý prev button
    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    });
    
    // Cập nhật hiển thị carousel
    function updateCarousel() {
        // Kích thước mỗi destination card và gap
        const itemWidth = destinations[0].offsetWidth;
        const gap = 24; // 1.5rem gap giữa các items
        
        // Tính toán khoảng cách cần scroll
        const translateX = currentIndex * (itemWidth + gap);
        
        // Áp dụng transform
        slider.style.transform = `translateX(-${translateX}px)`;
        
        // Cập nhật trạng thái của các nút
        prevBtn.style.opacity = currentIndex > 0 ? '1' : '0.5';
        nextBtn.style.opacity = currentIndex < destinations.length - visibleItems ? '1' : '0.5';
    }
    
    // Thiết lập styling cần thiết cho carousel
    function setupCarouselStyling() {
        // Thiết lập style cho slider container
        slider.style.display = 'flex';
        slider.style.transition = 'transform 0.3s ease';
        slider.style.gap = '1.5rem';
        slider.style.width = 'max-content';  // Đảm bảo container đủ rộng
        
        // Cài đặt style cho mỗi card
        destinations.forEach(card => {
            card.style.width = `calc((100vw - 4rem - 4.5rem) / 4)`;  // Tính toán width phù hợp cho desktop
            card.style.minWidth = '250px';  // Đặt min-width để đảm bảo card không quá nhỏ
            card.style.flex = '0 0 auto';  // Ngăn cards co giãn
            
            // Đảm bảo các hình ảnh có kích thước đồng nhất
            const img = card.querySelector('img');
            if (img) img.style.height = '180px';
        });
        
        // Đặt responsive cho card width
        function updateCardWidths() {
            const containerWidth = slider.parentElement.offsetWidth - 4.5*16; // Trừ đi padding và gap
            let cardWidth;
            
            if (window.innerWidth > 1200) cardWidth = containerWidth / 4;
            else if (window.innerWidth > 992) cardWidth = containerWidth / 3;
            else if (window.innerWidth > 768) cardWidth = containerWidth / 2;
            else cardWidth = containerWidth;
            
            destinations.forEach(card => {
                card.style.width = `${cardWidth}px`;
            });
            
            // Reset carousel position when resizing
            currentIndex = 0;
            updateCarousel();
        }
        
        // Cập nhật kích thước khi resize
        window.addEventListener('resize', updateCardWidths);
        
        // Khởi tạo kích thước ban đầu
        updateCardWidths();
        
        // Khởi tạo trạng thái nút
        updateCarousel();
    }
    
    // Khởi tạo styling
    setupCarouselStyling();
    
    // Hỗ trợ touch swipe cho thiết bị di động
    let touchStartX = 0;
    let touchEndX = 0;
    
    slider.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    slider.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50; // Ngưỡng để xác định swipe
        
        if (touchEndX < touchStartX - swipeThreshold) {
            // Swipe sang trái -> next slide
            if (currentIndex < destinations.length - visibleItems) {
                currentIndex++;
                updateCarousel();
            }
        }
        
        if (touchEndX > touchStartX + swipeThreshold) {
            // Swipe sang phải -> previous slide
            if (currentIndex > 0) {
                currentIndex--;
                updateCarousel();
            }
        }
    }
}

/**
 * Xử lý hiệu ứng active cho link trong menu
 */
function initNavigation() {
    const navLinks = document.querySelectorAll('.main-nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Xóa class active từ tất cả links
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Thêm class active cho link được click
            link.classList.add('active');
        });
    });
    
    // Thêm event scroll để đánh dấu section active khi scroll
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY + 100;
        
        document.querySelectorAll('section[id]').forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                document.querySelector(`.main-nav a[href="#${sectionId}"]`)?.classList.add('active');
            } else {
                document.querySelector(`.main-nav a[href="#${sectionId}"]`)?.classList.remove('active');
            }
        });
    });
}

/**
 * Hiển thị thông báo khi nhấn nút đặt tour
 */
function initBookingButtons() {
    const bookButtons = document.querySelectorAll('.btn');
    
    bookButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            if (button.textContent.includes('ĐẶT TOUR') || button.textContent.includes('ĐẶT NGAY')) {
                e.preventDefault();
                alert('Cảm ơn bạn đã quan tâm! Chức năng đặt tour sẽ sớm được cập nhật. Vui lòng liên hệ hotline 1900 1234 để được tư vấn.');
            }
        });
    });
}

// Mobile Menu Functionality
function initMobileMenu() {
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const sidebar = document.querySelector('.sidebar');
    const closeIcon = document.querySelector('.sidebar .close-icon');
    
    if (!hamburgerMenu || !sidebar || !closeIcon) return;
    
    // Tạo overlay
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    document.body.appendChild(overlay);
    
    // Mở sidebar
    hamburgerMenu.addEventListener('click', () => {
        sidebar.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Ngăn scroll
    });
    
    // Đóng sidebar
    function closeSidebar() {
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = ''; // Cho phép scroll lại
    }
    
    closeIcon.addEventListener('click', closeSidebar);
    overlay.addEventListener('click', closeSidebar);
    
    // Đóng sidebar khi nhấp vào liên kết
    const sidebarLinks = document.querySelectorAll('.sidebar ul li a');
    sidebarLinks.forEach(link => {
        link.addEventListener('click', closeSidebar);
    });
}

// Khởi tạo các chức năng khác
initNavigation();
initBookingButtons();

