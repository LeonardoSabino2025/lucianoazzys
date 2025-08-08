// main.js - Luciano Azzys Portfolio

document.addEventListener('DOMContentLoaded', () => {

    // 1. Loading Screen Animation
    const loadingScreen = document.getElementById('loading');
    window.addEventListener('load', () => {
        if (loadingScreen) {
            setTimeout(() => {
                loadingScreen.classList.add('fade-out');
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 800); // tempo da transição em CSS
            }, 500); // 0.5s de delay para exibir o texto de carregamento
        }
    });

    // 2. Hero Section Slideshow
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;
    const slideInterval = setInterval(nextSlide, 5000); // muda a cada 5 segundos

    function nextSlide() {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }

    // 3. Hamburger Menu Toggle
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

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

    // 4. Navbar & Smooth Scrolling
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');

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
            const sectionTop = section.offsetTop - navbar.offsetHeight - 20; // ajuste de offset
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
});

// Video Playback Controls for Portfolio Section
const videoItems = document.querySelectorAll('.portfolio-item');

videoItems.forEach(item => {
    const video = item.querySelector('video');
    const playButton = item.querySelector('.play-button');

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
        e.stopPropagation(); // Prevents the click from bubbling up to the parent item
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
                otherVideo.closest('.portfolio-item').querySelector('.play-button').classList.remove('hidden');
            }
        });
    });
});

// Animação do botão "Fale Comigo"
document.addEventListener('DOMContentLoaded', () => {
    const homeSection = document.getElementById('home');
    const whatsappCta = document.getElementById('whatsapp-cta');

    if (!homeSection || !whatsappCta) return;

    // Função que define o que acontece quando a seção 'home' entra ou sai da tela
    const observerCallback = (entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                // Se a seção 'home' não está visível, adiciona a classe fixa
                whatsappCta.classList.add('is-fixed');
            } else {
                // Se a seção 'home' está visível, remove a classe fixa
                whatsappCta.classList.remove('is-fixed');
            }
        });
    };

    // Cria o IntersectionObserver
    const observer = new IntersectionObserver(observerCallback, {
        root: null, // O viewport
        threshold: 0.1 // Gatilho de 10% da visibilidade da seção
    });

    // Começa a observar a seção 'home'
    observer.observe(homeSection);
=======
// main.js - Luciano Azzys Portfolio

document.addEventListener('DOMContentLoaded', () => {

    // 1. Loading Screen Animation
    const loadingScreen = document.getElementById('loading');
    window.addEventListener('load', () => {
        if (loadingScreen) {
            setTimeout(() => {
                loadingScreen.classList.add('fade-out');
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 800); // tempo da transição em CSS
            }, 500); // 0.5s de delay para exibir o texto de carregamento
        }
    });

    // 2. Hero Section Slideshow
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;
    const slideInterval = setInterval(nextSlide, 5000); // muda a cada 5 segundos

    function nextSlide() {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }

    // 3. Hamburger Menu Toggle
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

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

    // 4. Navbar & Smooth Scrolling
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');

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
            const sectionTop = section.offsetTop - navbar.offsetHeight - 20; // ajuste de offset
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
});

// Video Playback Controls for Portfolio Section
const videoItems = document.querySelectorAll('.portfolio-item');

videoItems.forEach(item => {
    const video = item.querySelector('video');
    const playButton = item.querySelector('.play-button');

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
        e.stopPropagation(); // Prevents the click from bubbling up to the parent item
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
                otherVideo.closest('.portfolio-item').querySelector('.play-button').classList.remove('hidden');
            }
        });
    });
});

// Animação do botão "Fale Comigo"
document.addEventListener('DOMContentLoaded', () => {
    const homeSection = document.getElementById('home');
    const whatsappCta = document.getElementById('whatsapp-cta');

    if (!homeSection || !whatsappCta) return;

    // Função que define o que acontece quando a seção 'home' entra ou sai da tela
    const observerCallback = (entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                // Se a seção 'home' não está visível, adiciona a classe fixa
                whatsappCta.classList.add('is-fixed');
            } else {
                // Se a seção 'home' está visível, remove a classe fixa
                whatsappCta.classList.remove('is-fixed');
            }
        });
    };

    // Cria o IntersectionObserver
    const observer = new IntersectionObserver(observerCallback, {
        root: null, // O viewport
        threshold: 0.1 // Gatilho de 10% da visibilidade da seção
    });

    // Começa a observar a seção 'home'
    observer.observe(homeSection);
>>>>>>> 4e6d54d4c41d980778cca3fec2b47c3f0075bed8
});