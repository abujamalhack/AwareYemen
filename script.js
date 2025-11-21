// Loading Screen
window.addEventListener('load', function() {
    const loadingScreen = document.getElementById('loadingScreen');
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 2000);
});

// Navigation
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Header scroll effect
const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Animate stats counter
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-count'));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            element.textContent = target + (element.getAttribute('data-count') === '264' ? '' : '');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + (element.getAttribute('data-count') === '264' ? '' : '');
        }
    }, 16);
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Animate stats
            if (entry.target.id === 'stats') {
                const statNumbers = document.querySelectorAll('.stat-number');
                statNumbers.forEach(number => {
                    animateCounter(number);
                });
            }
            
            // Add animation class
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe sections
document.querySelectorAll('.section, .stats, .hero-content, .service-card, .team-card').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// Terminal typing effect
function initTerminal() {
    const terminal = document.querySelector('.hacker-terminal');
    if (!terminal) return;
    
    const commands = [
        'whoami',
        'status --security',
        'scan --threats',
        'protect --community',
        'help --awareness'
    ];
    
    const outputs = [
        'Yemeni_Cyber_Team - واعي',
        '✓ النظام آمن | ✓ الحماية نشطة',
        '✓ لا توجد تهديدات نشطة | ✓ المجتمع آمن',
        '✓ الحماية مفعلة | ✓ التوعية مستمرة',
        'Available commands: whoami, status, scan, protect, help'
    ];
    
    let commandIndex = 0;
    
    function typeNextCommand() {
        if (commandIndex >= commands.length) {
            commandIndex = 0;
        }
        
        const commandLine = document.querySelector('.command');
        const outputLine = document.querySelector('.output');
        const cursor = document.querySelector('.blinking-cursor');
        
        if (commandLine && outputLine) {
            // Type command
            commandLine.textContent = '';
            typeText(commandLine, commands[commandIndex], () => {
                setTimeout(() => {
                    // Show output
                    outputLine.textContent = '';
                    typeText(outputLine, outputs[commandIndex], () => {
                        setTimeout(() => {
                            commandIndex++;
                            typeNextCommand();
                        }, 2000);
                    });
                }, 500);
            });
        }
    }
    
    function typeText(element, text, callback) {
        let index = 0;
        element.textContent = '';
        
        const timer = setInterval(() => {
            element.textContent += text[index];
            index++;
            
            if (index >= text.length) {
                clearInterval(timer);
                if (callback) callback();
            }
        }, 50);
    }
    
    // Start typing after a delay
    setTimeout(typeNextCommand, 3000);
}

// Initialize terminal when page loads
document.addEventListener('DOMContentLoaded', initTerminal);

// Form handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Simulate form submission
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i><span>جاري الإرسال...</span>';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            // Show success message
            alert('شكراً لتواصلكم مع منصة واعي! سنرد عليكم في أقرب وقت ممكن.');
            
            // Reset form
            this.reset();
            
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Particle animation enhancement
function enhanceParticles() {
    const particles = document.querySelectorAll('.particle');
    particles.forEach(particle => {
        // Randomize initial positions and animations
        const randomX = Math.random() * 100;
        const randomY = Math.random() * 100;
        const randomDelay = Math.random() * 5;
        const randomDuration = 3 + Math.random() * 4;
        
        particle.style.left = randomX + '%';
        particle.style.top = randomY + '%';
        particle.style.animationDelay = randomDelay + 's';
        particle.style.animationDuration = randomDuration + 's';
    });
}

// Initialize particles
document.addEventListener('DOMContentLoaded', enhanceParticles);

// Add scroll progress indicator (optional)
function addScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: var(--gradient);
        z-index: 1001;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const winHeight = window.innerHeight;
        const docHeight = document.documentElement.scrollHeight;
        const scrollTop = window.pageYOffset;
        const scrollPercent = (scrollTop / (docHeight - winHeight)) * 100;
        
        progressBar.style.width = scrollPercent + '%';
    });
}

// Initialize scroll progress
addScrollProgress();

// Add keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl+K or Cmd+K to focus search (if added later)
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        // Focus search input if exists
        const searchInput = document.querySelector('input[type="search"]');
        if (searchInput) {
            searchInput.focus();
        }
    }
    
    // Escape to close mobile menu
    if (e.key === 'Escape') {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Performance optimization: Lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Add service worker for PWA (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Add to homescreen prompt (for PWA)
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    // Stash the event so it can be triggered later
    deferredPrompt = e;
    
    // Show install prompt (you can customize this)
    setTimeout(() => {
        // You can show a custom install button here
        console.log('App can be installed');
    }, 5000);
});

// Cyber theme color changer (optional)
function initThemeChanger() {
    const themeButtons = document.createElement('div');
    themeButtons.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 20px;
        display: flex;
        gap: 10px;
        z-index: 1000;
    `;
    
    const themes = [
        { name: 'أزرق', primary: '#0066cc', secondary: '#00cc88' },
        { name: 'أرجواني', primary: '#8B5CF6', secondary: '#06B6D4' },
        { name: 'أحمر', primary: '#DC2626', secondary: '#EA580C' }
    ];
    
    themes.forEach(theme => {
        const btn = document.createElement('button');
        btn.textContent = theme.name;
        btn.style.cssText = `
            padding: 5px 10px;
            background: ${theme.primary};
            border: none;
            border-radius: 5px;
            color: white;
            cursor: pointer;
            font-size: 12px;
        `;
        
        btn.addEventListener('click', () => {
            document.documentElement.style.setProperty('--primary', theme.primary);
            document.documentElement.style.setProperty('--primary-dark', adjustColor(theme.primary, -20));
            document.documentElement.style.setProperty('--primary-light', adjustColor(theme.primary, 20));
            document.documentElement.style.setProperty('--secondary', theme.secondary);
            document.documentElement.style.setProperty('--secondary-dark', adjustColor(theme.secondary, -20));
        });
        
        themeButtons.appendChild(btn);
    });
    
    document.body.appendChild(themeButtons);
}

// Helper function to adjust color brightness
function adjustColor(color, percent) {
    const num = parseInt(color.replace('#', ''), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) + amt;
    const G = (num >> 8 & 0x00FF) + amt;
    const B = (num & 0x0000FF) + amt;
    
    return '#' + (
        0x1000000 +
        (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
        (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
        (B < 255 ? B < 1 ? 0 : B : 255)
    ).toString(16).slice(1);
}

// Uncomment the line below if you want to enable theme changer
// initThemeChanger();

console.log(`
    🛡️  منصة واعي - الفريق السيبراني اليمني
    ----------------------------------------
    تم تحميل الموقع بنجاح!
    
    المميزات:
    ✓ تصميم سيبراني احترافي
    ✓ تأثيرات بصرية مذهلة  
    ✓ متجاوب مع جميع الأجهزة
    ✓ سريع وخفيف
    ✓ آمن ومحمي
    
    Developer: 𝐴𝑏𝑢 𝐽𝑎𝑚𝑎𝑙 𝐻𝑎𝑐𝑘
    فريق واعي - حماة المجتمع الرقمي
`);
