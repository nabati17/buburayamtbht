
        // ===== DARK MODE =====
        const html = document.documentElement;
        const darkToggles = [document.getElementById('darkToggle'), document.getElementById('darkToggleMobile')];
        const darkIcon = document.getElementById('darkIcon');

        // Load saved preference
        if (localStorage.getItem('theme') === 'dark') {
            html.classList.add('dark');
        }

        function updateDarkIcon() {
            const isDark = html.classList.contains('dark');
            if (darkIcon) {
                darkIcon.setAttribute('icon', isDark ? 'lucide:moon' : 'lucide:sun');
            }
        }
        updateDarkIcon();

        darkToggles.forEach(btn => {
            if (!btn) return;
            btn.addEventListener('click', () => {
                html.classList.toggle('dark');
                localStorage.setItem('theme', html.classList.contains('dark') ? 'dark' : 'light');
                updateDarkIcon();
            });
        });

        // ===== NAVBAR SCROLL =====
        const navbar = document.getElementById('navbar');
        window.addEventListener('scroll', () => {
            navbar.classList.toggle('navbar-scrolled', window.scrollY > 60);
        });

        // ===== MOBILE MENU =====
        const mobileMenu = document.getElementById('mobileMenu');
        const mobileOverlay = document.getElementById('mobileOverlay');
        document.getElementById('mobileToggle').addEventListener('click', () => {
            mobileMenu.classList.add('open');
            mobileOverlay.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        });
        function closeMobile() {
            mobileMenu.classList.remove('open');
            mobileOverlay.classList.add('hidden');
            document.body.style.overflow = '';
        }
        document.getElementById('mobileClose').addEventListener('click', closeMobile);
        mobileOverlay.addEventListener('click', closeMobile);
        document.querySelectorAll('.mobile-link').forEach(l => l.addEventListener('click', closeMobile));

        // ===== SCROLL ANIMATIONS =====
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); });
        }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });
        document.querySelectorAll('.fade-up, .fade-left, .fade-right').forEach(el => observer.observe(el));

        // ===== TESTIMONIAL SLIDER =====
        const sliderTrack = document.getElementById('sliderTrack');
        const dots = document.querySelectorAll('.slider-dot');
        let currentSlide = 0;
        const totalSlides = 2;

        function goToSlide(index) {
            currentSlide = index;
            sliderTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
            dots.forEach((dot, i) => {
                dot.classList.toggle('bg-gold-400', i === currentSlide);
                dot.classList.toggle('bg-gold-400/30', i !== currentSlide);
                dot.style.width = i === currentSlide ? '24px' : '12px';
                dot.style.height = '12px';
                dot.style.borderRadius = '999px';
            });
        }
        document.getElementById('prevBtn').addEventListener('click', () => goToSlide(currentSlide === 0 ? totalSlides - 1 : currentSlide - 1));
        document.getElementById('nextBtn').addEventListener('click', () => goToSlide(currentSlide === totalSlides - 1 ? 0 : currentSlide + 1));
        dots.forEach((dot, i) => dot.addEventListener('click', () => goToSlide(i)));
        goToSlide(0);

        let autoSlide = setInterval(() => goToSlide(currentSlide === totalSlides - 1 ? 0 : currentSlide + 1), 5000);
        [document.getElementById('prevBtn'), document.getElementById('nextBtn'), ...dots].forEach(el => el.addEventListener('click', () => {
            clearInterval(autoSlide);
            autoSlide = setInterval(() => goToSlide(currentSlide === totalSlides - 1 ? 0 : currentSlide + 1), 5000);
        }));

        // ===== NEWSLETTER =====
        document.getElementById('newsletterForm').addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('newsletterEmail').value;
            if (email) {
                const msg = document.getElementById('newsletterMsg');
                msg.textContent = '✓ Terima kasih! Anda berhasil subscribe.';
                msg.className = 'mt-3 text-sm text-green-400';
                msg.classList.remove('hidden');
                document.getElementById('newsletterEmail').value = '';
                showToast('Berhasil Subscribe!', 'Anda akan mendapat info terbaru dari kami.');
                setTimeout(() => msg.classList.add('hidden'), 5000);
            }
        });

        // ===== TOAST =====
        function showToast(title, msg) {
            const toast = document.getElementById('toast');
            document.getElementById('toastTitle').textContent = title;
            document.getElementById('toastMsg').textContent = msg;
            toast.style.transform = 'translateX(0)';
            setTimeout(() => { toast.style.transform = 'translateX(120%)'; }, 3500);
        }

        // ===== SMOOTH SCROLL =====
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) window.scrollTo({ top: target.getBoundingClientRect().top + window.pageYOffset - 80, behavior: 'smooth' });
            });
        });

        // ===== ACTIVE NAV =====
        const sections = document.querySelectorAll('section[id]');
        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(section => { if (window.pageYOffset >= section.offsetTop - 120) current = section.getAttribute('id'); });
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('text-gold-500');
                link.classList.add('text-brown-600');
                if (link.getAttribute('href') === '#' + current) {
                    link.classList.add('text-gold-500');
                    link.classList.remove('text-brown-600');
                }
            });
        });