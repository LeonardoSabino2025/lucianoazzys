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
                }, 800); // Tempo da transição em CSS
            }, 500); // 0.5s de delay para exibir o texto de carregamento
        });
    }

    // 2. Hero Section Slideshow
    const slides = document.querySelectorAll('.slide');
    if (slides.length > 0) {
        let currentSlide = 0;
        setInterval(() => {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }, 5000); // Muda a cada 5 segundos
    }

    // 3. Hamburger Menu Toggle
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        // Fecha o menu ao clicar em um link (para mobile)
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
    const blurOverlay = document.getElementById('blur-overlay');

    if (navbar) {
        function updateNavbar() {
            // Efeito de rolagem na Navbar
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }

            // Scrollspy - Destaca o link ativo
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

        // Rolagem suave para links internos COM EFEITO DE DESFOQUE
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetId);
                if (targetSection) {
                    
                    // 1. Ativa o desfoque
                    if (blurOverlay) {
                        blurOverlay.classList.add('active');
                    }

                    // 2. Faz a rolagem suave
                    window.scrollTo({
                        top: targetSection.offsetTop - navbar.offsetHeight,
                        behavior: 'smooth'
                    });

                    // 3. Desativa o desfoque após um breve período
                    setTimeout(() => {
                        if (blurOverlay) {
                            blurOverlay.classList.remove('active');
                        }
                    }, 500); // O tempo (500ms) deve ser um pouco maior que a sua transição no CSS
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

        const toggleVideoPlayback = () => {
            if (video.paused) {
                video.play();
                playButton.classList.add('hidden');
            } else {
                video.pause();
                playButton.classList.remove('hidden');
            }
        };

        playButton.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleVideoPlayback();
        });

        item.addEventListener('click', () => {
            toggleVideoPlayback();
        });

        video.addEventListener('ended', () => {
            playButton.classList.remove('hidden');
        });

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

    // 7. Testimonials Carousel Navigation com Animação 3D
    const testimonialsCarousel = document.querySelector('.testimonials-carousel');
    const prevArrow = document.querySelector('.slider-arrow.prev');
    const nextArrow = document.querySelector('.slider-arrow.next');
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const gap = 48; // Corresponde a 3rem

    if (testimonialsCarousel && prevArrow && nextArrow && testimonialCards.length > 0) {
        const cardWidth = testimonialCards[0].offsetWidth;
        let currentIndex = 0;
        let isAnimating = false;

        // Função para aplicar animação 3D
        const animateCard = (card, direction = 'next') => {
            if (!card) return;
            
            // Remove classes anteriores
            card.classList.remove('slide-rotate-ver-r-fwd', 'slide-rotate-ver-l-fwd');
            
            // Aplica a classe de animação baseada na direção
            if (direction === 'next') {
                card.classList.add('slide-rotate-ver-r-fwd');
            } else {
                card.classList.add('slide-rotate-ver-l-fwd');
            }
            
            // Remove a classe após a animação
            setTimeout(() => {
                card.classList.remove('slide-rotate-ver-r-fwd', 'slide-rotate-ver-l-fwd');
            }, 500);
        };

        // Navegação para próximo card
        nextArrow.addEventListener('click', () => {
            if (isAnimating) return;
            isAnimating = true;

            const currentCard = testimonialCards[currentIndex];
            animateCard(currentCard, 'next');

            setTimeout(() => {
                testimonialsCarousel.scrollBy({
                    left: cardWidth + gap,
                    behavior: 'smooth'
                });
                
                currentIndex = (currentIndex + 1) % testimonialCards.length;
                isAnimating = false;
            }, 100);
        });

        // Navegação para card anterior
        prevArrow.addEventListener('click', () => {
            if (isAnimating) return;
            isAnimating = true;

            const currentCard = testimonialCards[currentIndex];
            animateCard(currentCard, 'prev');

            setTimeout(() => {
                testimonialsCarousel.scrollBy({
                    left: -(cardWidth + gap),
                    behavior: 'smooth'
                });
                
                currentIndex = currentIndex === 0 ? testimonialCards.length - 1 : currentIndex - 1;
                isAnimating = false;
            }, 100);
        });
    }

   // 8. Glitter Animation for Testimonials Section - Ajustado
    const testimonialsSection = document.querySelector('.testimonials');
    if (testimonialsSection) {
        const glitterCount = 40; // AUMENTADO: Mais partículas para um efeito mais intenso

        const createGlitter = () => {
            const particle = document.createElement('div');
            particle.classList.add('glitter-particle');

            // Escolha aleatória entre dourado e prateado
            if (Math.random() > 0.5) {
                particle.classList.add('gold');
                particle.style.background = 'var(--accent-primary)';
            } else {
                particle.classList.add('silver');
            }

            // Posição inicial aleatória na horizontal e um pouco acima do topo
            const startPosition = Math.random() * 100;
            particle.style.left = `${startPosition}vw`;
            particle.style.top = `-${Math.random() * 20}px`; // Inicia um pouco acima do topo

            const size = Math.random() * 2 + 1; // Tamanhos um pouco menores
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.animationDuration = `${Math.random() * 6 + 4}s`; // Duração entre 4 e 10 segundos
            particle.style.animationDelay = `${Math.random() * 3}s`; // Delay inicial

            testimonialsSection.appendChild(particle);

            particle.addEventListener('animationend', () => {
                particle.remove();
            });
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                        return;
                    }
                    // Cria uma quantidade maior de glitters quando a seção está visível
                    for (let i = 0; i < glitterCount; i++) {
                        setTimeout(createGlitter, i * 200); // Intervalo menor para criar mais rapidamente
                    }
                }
            });
        }, { threshold: 0.1 });

        observer.observe(testimonialsSection);
    }


        // 9. Scroll Suave para links da navegação
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });    

});