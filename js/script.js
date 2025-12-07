document.addEventListener('DOMContentLoaded', () => {
    // 1. Loading Animation
    const loader = document.getElementById('loader');
    const loaderText = document.getElementById('loader-text');
    
    // Fade in text
    setTimeout(() => {
        loaderText.classList.remove('opacity-0');
    }, 300);

    // Remove loader
    setTimeout(() => {
        loader.classList.add('opacity-0');
        setTimeout(() => {
            loader.style.visibility = 'hidden';
        }, 800);
    }, 2000);

    // 2. Typing Animation in Hero
    const textToType = "Fashion. Lifestyle. Art.";
    const typingElement = document.getElementById('typing-text');
    let charIndex = 0;

    function typeWriter() {
        if (charIndex < textToType.length) {
            typingElement.innerHTML += textToType.charAt(charIndex);
            charIndex++;
            setTimeout(typeWriter, 100);
        }
    }
    // Start typing after loader clears
    setTimeout(typeWriter, 2500);

    // 3. Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('nav-blur', 'border-neutral-800');
            navbar.classList.remove('border-transparent');
        } else {
            navbar.classList.remove('nav-blur', 'border-neutral-800');
            navbar.classList.add('border-transparent');
        }
    });

    // 4. Scroll Reveal (Fade Up)
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

    // 5. Parallax Hero
    const heroBg = document.getElementById('hero-bg');
    window.addEventListener('scroll', () => {
        const scrollPos = window.scrollY;
        heroBg.style.transform = `translateY(${scrollPos * 0.5}px) scale(1.1)`;
    });

    // 6. Mobile Menu
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    let isMenuOpen = false;

    menuBtn.addEventListener('click', () => {
        isMenuOpen = !isMenuOpen;
        if (isMenuOpen) {
            mobileMenu.classList.remove('opacity-0', 'pointer-events-none');
            menuBtn.innerHTML = '<span class="iconify w-6 h-6" data-icon="lucide:x"></span>';
        } else {
            mobileMenu.classList.add('opacity-0', 'pointer-events-none');
            menuBtn.innerHTML = '<span class="iconify w-6 h-6" data-icon="lucide:menu"></span>';
        }
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            // Close menu when a link is clicked
            isMenuOpen = false;
            mobileMenu.classList.add('opacity-0', 'pointer-events-none');
            menuBtn.innerHTML = '<span class="iconify w-6 h-6" data-icon="lucide:menu"></span>';
        });
    });

    // 7. Portfolio Filter
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active state
            filterButtons.forEach(btn => {
                btn.classList.remove('active', 'text-white', 'border-b', 'border-white');
                btn.classList.add('text-neutral-500', 'hover:text-white', 'border-b', 'border-transparent', 'hover:border-neutral-700');
            });
            button.classList.add('active', 'text-white', 'border-b', 'border-white');
            button.classList.remove('text-neutral-500', 'border-transparent', 'hover:border-neutral-700');

            const filter = button.dataset.filter;
            
            galleryItems.forEach(item => {
                if (filter === 'all' || item.dataset.category === filter) {
                    item.style.display = 'block';
                    // Re-add fade-up class to trigger animation when visible
                    item.classList.add('fade-up', 'visible'); 
                } else {
                    item.style.display = 'none';
                    item.classList.remove('visible');
                }
            });
        });
    });

    // 8. 3D Tilt Effect for Service Cards
    const tiltCards = document.querySelectorAll('.tilt-card');
    
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width; // 0 to 1
            const y = (e.clientY - rect.top) / rect.height; // 0 to 1
            
            const tiltX = (y - 0.5) * 10; // -5 to 5 degrees
            const tiltY = (x - 0.5) * -10; // -5 to 5 degrees

            card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
        });
    });

    // 9. Testimonial Slider
    const slides = document.querySelectorAll('.testimonial-slide');
    const dotButtons = document.querySelectorAll('.flex.justify-center.gap-2 button');
    let currentSlide = 0;

    window.showSlide = function(index) {
        slides[currentSlide].classList.remove('opacity-100');
        slides[currentSlide].classList.add('opacity-0', 'pointer-events-none');
        dotButtons[currentSlide].classList.remove('bg-white');
        dotButtons[currentSlide].classList.add('bg-neutral-700');

        currentSlide = index;

        slides[currentSlide].classList.add('opacity-100');
        slides[currentSlide].classList.remove('opacity-0', 'pointer-events-none');
        dotButtons[currentSlide].classList.add('bg-white');
        dotButtons[currentSlide].classList.remove('bg-neutral-700');
    }

    // 10. Lightbox Functionality
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.getElementById('lightbox-close');

    window.openLightbox = function(item) {
        const imgSrc = item.querySelector('img').src;
        lightboxImg.src = imgSrc;
        lightbox.classList.remove('opacity-0', 'pointer-events-none');
        lightbox.classList.add('opacity-100');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    }

    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target.id === 'lightbox') {
            closeLightbox();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('opacity-100')) {
            closeLightbox();
        }
    });

    function closeLightbox() {
        lightbox.classList.remove('opacity-100');
        lightbox.classList.add('opacity-0', 'pointer-events-none');
        document.body.style.overflow = '';
    }

    // 11. Form Submission (Demo)
    document.getElementById('contact-form').addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Thank you for your message! This is a demo form and the submission feature is inactive.');
        // Clear form fields after "submission"
        e.target.reset();
    });
});