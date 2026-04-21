// script.js
document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('button.md\\:hidden');
    const navLinksContainer = document.querySelector('.hidden.md\\:flex');
    
    if (mobileMenuBtn && navLinksContainer) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinksContainer.classList.toggle('hidden');
            navLinksContainer.classList.toggle('mobile-nav-active');
        });
    }

    // Active Link Management
    const navLinks = document.querySelectorAll('header nav a[href^="#"]');
    const navUnderline = document.getElementById('nav-underline');
    let isScrollingManual = false;
    
    function setActiveLink(clickedLink, isManual = false) {
        if (isManual) isScrollingManual = true;
        if (isScrollingManual && !isManual) return; // Prevent ScrollSpy from overriding manual click during animation

        navLinks.forEach(link => {
            link.classList.remove('text-[#43e0cf]', 'font-bold');
            link.classList.add('text-slate-400', 'font-medium');
        });
        clickedLink.classList.add('text-[#43e0cf]', 'font-bold');
        clickedLink.classList.remove('text-slate-400', 'font-medium');

        // Animate Sliding Underline
        if (navUnderline && clickedLink.parentElement.id === 'desktop-nav') {
            navUnderline.style.opacity = '1';
            navUnderline.style.width = `${clickedLink.offsetWidth}px`;
            navUnderline.style.left = `${clickedLink.offsetLeft}px`;
        }

        if (isManual) {
            setTimeout(() => { isScrollingManual = false; }, 1000);
        }
    }

    // Initialize position and handle resize
    window.addEventListener('load', () => {
        const initialLink = document.querySelector('header nav a[href="#hero"]');
        if (initialLink) setActiveLink(initialLink);
    });

    window.addEventListener('resize', () => {
        const activeLink = document.querySelector('header nav a.text-\\[\\#43e0cf\\]');
        if (activeLink) setActiveLink(activeLink);
    });

    // Smooth scroll and click handler
    navLinks.forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                setActiveLink(this, true);
                
                if (navLinksContainer.classList.contains('mobile-nav-active')) {
                    navLinksContainer.classList.add('hidden');
                    navLinksContainer.classList.remove('mobile-nav-active');
                }
            }
        });
    });

    // Intersection Observer for silky smooth ScrollSpy
    const observerOptions = {
        root: null,
        rootMargin: '-40% 0px -40% 0px',
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                const matchingLink = document.querySelector(`header nav a[href="#${id}"]`);
                if (matchingLink) setActiveLink(matchingLink);
            }
        });
    }, observerOptions);

    document.querySelectorAll('section[id]').forEach(section => {
        observer.observe(section);
    });

    // Slider initialization
    initProjectSliders();

    // Form submission simulation
    const contactForm = document.querySelector('form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button[type="submit"]');
            const originalText = btn.innerText;
            btn.innerText = 'Sending...';
            btn.classList.add('opacity-80');
            btn.disabled = true;

            setTimeout(() => {
                btn.innerText = 'Message Sent!';
                btn.classList.remove('opacity-80');
                btn.classList.add('bg-green-500');
                
                contactForm.reset();

                setTimeout(() => {
                    btn.innerText = originalText;
                    btn.classList.remove('bg-green-500');
                    btn.disabled = false;
                }, 3000);
            }, 1500);
        });
    }
});

function initProjectSliders() {
    const sliders = document.querySelectorAll('.slider-container');
    
    sliders.forEach(slider => {
        const slides = slider.querySelectorAll('.slide');
        let currentSlide = 0;
        let slideInterval;

        function showSlide(index) {
            slides.forEach(s => s.classList.remove('active'));
            slides[index].classList.add('active');
            currentSlide = index;
        }

        function nextSlide() {
            let next = (currentSlide + 1) % slides.length;
            showSlide(next);
        }

        function startAutoPlay() {
            slideInterval = setInterval(nextSlide, 3000);
        }

        startAutoPlay();
    });
}

// Experience Modal Data
const experienceData = {
    'sixdreams': {
        title: 'Six Dreams',
        role: 'Flutter Developer',
        responsibilities: [
            'Developed complex custom UI widgets using CustomClipper to deliver unique design requirements.',
            'Implemented responsive UI and custom widgets, ensuring seamless user experience across mobile devices.',
            'Designed and integrated the transaction details feature, handling both UI and functional aspects.',
            'Designed and integrated the Private Contest feature, handling both UI and functional aspects.'
        ]
    },
    'belivmart': {
        title: 'Kuvi Technomart LLP',
        role: 'Flutter Developer',
        responsibilities: [
            'Rebuilt the entire application from scratch with a new <span class="text-primary font-bold">UI</span> using <span class="text-primary font-bold">Flutter</span> and <span class="text-primary font-bold">Dart</span>.',
            'Utilized <span class="text-primary font-bold">Provider</span> for state management to ensure efficient data handling and smooth <span class="text-primary font-bold">UI</span> updates.',
            'Developed and managed key features including cart, order history, and order cancellation.',
            'Implemented complex <span class="text-primary font-bold">online/offline</span> status logic and real-time <span class="text-primary font-bold">notification</span> handling for delivery agents.',
            'Designed and developed <span class="text-primary font-bold">shift-based features</span> ensuring accurate scheduling and management.'
        ]
    }
};

function openExperienceModal(companyId) {
    const data = experienceData[companyId];
    if (!data) return;

    const modal = document.getElementById('expModal');
    const content = document.getElementById('modalContent');
    
    content.innerHTML = `
        <div class="mb-8">
            <h3 class="text-4xl font-black text-primary mb-2">${data.title}</h3>
            <p class="text-on-surface-variant font-medium tracking-widest uppercase text-sm">${data.role}</p>
        </div>
        <ul class="space-y-6">
            ${data.responsibilities.map(item => `
                <li class="flex gap-4 group">
                    <span class="text-primary mt-1 flex-shrink-0">
                        <span class="material-symbols-outlined">check_circle</span>
                    </span>
                    <span class="text-lg text-on-surface leading-relaxed">${item}</span>
                </li>
            `).join('')}
        </ul>
    `;
    
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closeExperienceModal() {
    const modal = document.getElementById('expModal');
    modal.classList.add('hidden');
    document.body.style.overflow = 'auto';
}

function openContactModal() {
    const modal = document.getElementById('contactModal');
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closeContactModal() {
    const modal = document.getElementById('contactModal');
    modal.classList.add('hidden');
    document.body.style.overflow = 'auto';
}

// Project Modal Data
const projectData = {
    'hungryfill': {
        title: 'Hungry Fill',
        description: 'HungryFill is a food delivery application that provides users with a convenient platform to order food and manage their orders through a cart facility. Users can track their recent orders, add favorite restaurants, and manage their wishlists.',
        techStack: 'Dart, Flutter, Bloc, Firebase, Google Map, Razorpay, Clean Architecture'
    }
};

function openProjectModal(projectId) {
    const data = projectData[projectId];
    if (!data) return;

    const modal = document.getElementById('expModal');
    const content = document.getElementById('modalContent');
    
    content.innerHTML = `
        <div class="mb-8">
            <h3 class="text-4xl font-black text-primary mb-6">${data.title}</h3>
            <div class="bg-primary/5 p-8 rounded-3xl border border-primary/10 relative overflow-hidden group">
                <div class="absolute -right-10 -top-10 w-32 h-32 bg-primary/5 rounded-full blur-2xl"></div>
                <p class="text-on-surface text-xl leading-relaxed font-medium relative z-10">
                    ${data.description}
                </p>
            </div>
        </div>
        <div class="mt-8">
            <div class="flex flex-wrap gap-3">
                ${data.techStack.split(',').map(tech => `
                    <span class="px-5 py-2.5 bg-primary/10 text-primary border border-primary/20 rounded-xl text-sm font-black tracking-tight hover:bg-primary/20 transition-all cursor-default shadow-sm lowercase">
                        ${tech.trim()}
                    </span>
                `).join('')}
            </div>
        </div>
    `;
    
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}
