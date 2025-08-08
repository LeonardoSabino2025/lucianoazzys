// main.js - Luciano Azzys Portfolio

document.addEventListener('DOMContentLoaded', () => {
    // 1. Loading Screen Animation
    const loadingScreen = document.getElementById('loading');
    if (loadingScreen) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                loadingScreen.classList.add('fade-out');
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 800); // tempo da transição em CSS
            }, 500); // 0.5s de delay para exibir o texto de carregamento
        });
    }

    // 2. Hero Section Slideshow
    const slides = document.querySelectorAll('.slide');
    if (slides.length > 0) {
        let currentSlide = 0;
        const slideInterval = setInterval(nextSlide, 5000); // muda a cada 5 segundos

        function nextSlide() {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }
    }

    // 3. Hamburger Menu Toggle
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
        
        // Close menu when a link is clicked (for mobile)
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    hamburger.classList.remove('active');
                }
            });
        });
    }

    // 4. Navbar & Smooth Scrolling
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');

    if (navbar) {
        function updateNavbar() {
            // Navbar Scrolled Effect
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }

            // Scrollspy - Highlight active link
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop - navbar.offsetHeight - 20;
                const sectionHeight = section.clientHeight;
                if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.href.includes(current)) {
                    link.classList.add('active');
                }
            });
        }

        window.addEventListener('scroll', updateNavbar);
        window.addEventListener('load', updateNavbar);

        // Smooth scroll for internal links
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetId);
                if (targetSection) {
                    window.scrollTo({
                        top: targetSection.offsetTop - navbar.offsetHeight,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // 5. Video Playback Controls for Portfolio Section
    const videoItems = document.querySelectorAll('.portfolio-item');
    videoItems.forEach(item => {
        const video = item.querySelector('video');
        const playButton = item.querySelector('.play-button');

        if (!video || !playButton) return;

        // Show/hide play button and play/pause video on click
        const toggleVideoPlayback = () => {
            if (video.paused) {
                video.play();
                playButton.classList.add('hidden');
            } else {
                video.pause();
                playButton.classList.remove('hidden');
            }
        };

        // Listen for clicks on the play button
        playButton.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleVideoPlayback();
        });

        // Listen for clicks on the entire video item to play/pause
        item.addEventListener('click', () => {
            toggleVideoPlayback();
        });

        // Show play button when video ends
        video.addEventListener('ended', () => {
            playButton.classList.remove('hidden');
        });

        // Pause other videos when a new one starts
        video.addEventListener('play', () => {
            document.querySelectorAll('video').forEach(otherVideo => {
                if (otherVideo !== video && !otherVideo.paused) {
                    otherVideo.pause();
                    const otherPlayButton = otherVideo.closest('.portfolio-item')?.querySelector('.play-button');
                    if (otherPlayButton) {
                        otherPlayButton.classList.remove('hidden');
                    }
                }
            });
        });
    });

    // 6. WhatsApp CTA Animation
    const homeSection = document.getElementById('home');
    const whatsappCta = document.getElementById('whatsapp-cta');

    if (homeSection && whatsappCta) {
        const observerCallback = (entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) {
                    whatsappCta.classList.add('is-fixed');
                } else {
                    whatsappCta.classList.remove('is-fixed');
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, {
            root: null,
            threshold: 0.1
        });

        observer.observe(homeSection);
    }
});