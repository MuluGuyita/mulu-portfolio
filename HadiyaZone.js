
// ============================================
// LANGUAGE TOGGLE FUNCTIONALITY
// ============================================

// Language toggle for header
document.querySelectorAll('.lang-option').forEach(option => {
    option.addEventListener('click', function() {
        const lang = this.getAttribute('data-lang');
        
        // Remove active class from all header language options
        document.querySelectorAll('.lang-option').forEach(opt => {
            opt.classList.remove('active');
        });
        
        // Add active class to clicked
        this.classList.add('active');
        
        // Update mobile sidebar language buttons
        document.querySelectorAll('.mobile-lang-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-lang') === lang) {
                btn.classList.add('active');
            }
        });
        
        // Switch language content
        setLanguage(lang);
    });
});

// Language toggle for mobile sidebar
document.querySelectorAll('.mobile-lang-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const lang = this.getAttribute('data-lang');
        
        // Update mobile buttons
        document.querySelectorAll('.mobile-lang-btn').forEach(b => {
            b.classList.remove('active');
        });
        this.classList.add('active');
        
        // Update header language toggle
        document.querySelectorAll('.lang-option').forEach(opt => {
            opt.classList.remove('active');
            if (opt.getAttribute('data-lang') === lang) {
                opt.classList.add('active');
            }
        });
        
        // Switch language
        setLanguage(lang);
    });
});

function setLanguage(lang) {
    // Show/hide language content
    const englishElements = document.querySelectorAll('.english');
    const amharicElements = document.querySelectorAll('.amharic');
    
    if (lang === 'en') {
        englishElements.forEach(el => {
            el.style.display = 'block' || 'flex' || 'inline';
        });
        amharicElements.forEach(el => {
            el.style.display = 'none';
        });
    } else {
        englishElements.forEach(el => {
            el.style.display = 'none';
        });
        amharicElements.forEach(el => {
            el.style.display = 'block' || 'flex' || 'inline';
        });
    }
}

// Initialize with English
setLanguage('en');

// ============================================
// LEFT-SIDE MOBILE SIDEBAR FUNCTIONALITY
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // Elements for mobile sidebar
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const mobileOverlay = document.querySelector('.mobile-menu-overlay');
    const mobileSidebar = document.querySelector('.mobile-sidebar');
    const mobileClose = document.querySelector('.mobile-sidebar-close');
    
    //OPEN mobile sidebar when menu icon is clicked
    if (mobileToggle) {
        mobileToggle.addEventListener('click', function() {
            console.log('Menu button clicked - opening sidebar');
            if (mobileOverlay) mobileOverlay.classList.add('active');
            if (mobileSidebar) mobileSidebar.classList.add('active');
            document.body.style.overflow = 'hidden';
        });

    } else {
        console.error('Mobile menu toggle button not found!');
    }
    // CLOSE mobile sidebar
    function closeMobileSidebar() {
        if (mobileOverlay) mobileOverlay.classList.remove('active');
        if (mobileSidebar) mobileSidebar.classList.remove('active');
        document.body.style.overflow = 'auto';
        
        // Close all dropdowns in sidebar
        document.querySelectorAll('.mobile-dropdown').forEach(item => {
            item.classList.remove('active');
        });
    }
    
    // Close button in sidebar
    if (mobileClose) {
        mobileClose.addEventListener('click', closeMobileSidebar);
    }
    
    // Close when clicking overlay
    if (mobileOverlay) {
        mobileOverlay.addEventListener('click', closeMobileSidebar);
    }
    
    // TOGGLE DROPDOWNS in mobile sidebar
    document.querySelectorAll('.mobile-dropdown-toggle').forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            const dropdown = this.parentElement;
            dropdown.classList.toggle('active');
            
            // Close other dropdowns
            document.querySelectorAll('.mobile-dropdown').forEach(item => {
                if (item !== dropdown) {
                    item.classList.remove('active');
                }
            });
        });
    });
    
    // Close sidebar when clicking a regular link (not dropdown toggle)
    document.querySelectorAll('.mobile-nav-link[href^="#"]').forEach(link => {
        link.addEventListener('click', function() {
            if (!this.classList.contains('mobile-dropdown-toggle')) {
                closeMobileSidebar();
            }
        });
    });    
    // Escape key to close sidebar
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileSidebar && mobileSidebar.classList.contains('active')) {
            closeMobileSidebar();
        }
    });
    
    // ============================================
    // DESKTOP DROPDOWN FUNCTIONALITY
    // ============================================
    
    // Desktop dropdown hover
    document.querySelectorAll('.dropdown').forEach(dropdown => {
        dropdown.addEventListener('mouseenter', function() {
            if (window.innerWidth > 992) {
                this.querySelector('.dropdown-menu').style.display = 'block';
            }
        });
        
        dropdown.addEventListener('mouseleave', function() {
            if (window.innerWidth > 992) {
                this.querySelector('.dropdown-menu').style.display = 'none';
            }
        });
    });
    
    // Mobile dropdown toggle for desktop nav (fallback)
    document.querySelectorAll('.dropdown > .nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            if (window.innerWidth <= 992) {
                e.preventDefault();
                const dropdown = this.parentElement;
                const menu = dropdown.querySelector('.dropdown-menu');
                
                // Close other dropdowns
                document.querySelectorAll('.dropdown').forEach(item => {
                    if (item !== dropdown) {
                        item.querySelector('.dropdown-menu').style.display = 'none';
                    }
                });
                
                // Toggle current dropdown
                if (menu.style.display === 'block') {
                    menu.style.display = 'none';
                } else {
                    menu.style.display = 'block';
                }
            }
        });
    });
    
    // Close desktop dropdowns when clicking outside (mobile)
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 992 && !e.target.closest('.dropdown')) {
            document.querySelectorAll('.dropdown-menu').forEach(menu => {
                menu.style.display = 'none';
            });
        }
    });
});

// ============================================
// ANIMATIONS & OTHER FUNCTIONALITY
// ============================================

// Animated counter for statistics
function animateCounter() {
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200;
    
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-count');
        const count = +counter.innerText;
        const increment = target / speed;
        
        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(() => animateCounter(), 1);
        } else {
            counter.innerText = target;
        }
    });
}

// Trigger counter animation when stats section is in view
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter();
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats');
if (statsSection) {
    observer.observe(statsSection);
}

// Fade-in animation on scroll
const fadeElements = document.querySelectorAll('.fade-in');
const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
            fadeObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

fadeElements.forEach(el => {
    fadeObserver.observe(el);
});






// Contact Form Validation and Submission
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Reset error messages
            clearErrors();
            
            // Get form values
            const fullName = document.getElementById('fullName').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();
            
            let isValid = true;
            
            // Validate Full Name
            if (!fullName) {
                showError('nameError', 'Full name is required');
                isValid = false;
            } else if (fullName.length < 2) {
                showError('nameError', 'Name must be at least 2 characters');
                isValid = false;
            }
            
            // Validate Email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email) {
                showError('emailError', 'Email address is required');
                isValid = false;
            } else if (!emailRegex.test(email)) {
                showError('emailError', 'Please enter a valid email address');
                isValid = false;
            }
            
            // Validate Phone (optional but format check)
            if (phone && !/^[\+]?[0-9\s\-\(\)]+$/.test(phone)) {
                showError('phoneError', 'Please enter a valid phone number');
                isValid = false;
            }
            
            // Validate Subject
            if (!subject) {
                showError('subjectError', 'Subject is required');
                isValid = false;
            }
            
            // Validate Message
            if (!message) {
                showError('messageError', 'Message is required');
                isValid = false;
            } else if (message.length < 10) {
                showError('messageError', 'Message must be at least 10 characters');
                isValid = false;
            }
            
            if (isValid) {
                // Show loading state
                const submitBtn = contactForm.querySelector('.submit-btn');
                const originalText = submitBtn.innerHTML;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                submitBtn.disabled = true;
                
                // Simulate form submission (Replace with actual AJAX call)
                setTimeout(() => {
                    // In a real implementation, you would use:
                    // fetch('/submit-form', { method: 'POST', body: new FormData(contactForm) })
                    
                    // Show success message
                    formMessage.className = 'form-message success';
                    formMessage.innerHTML = `
                        <i class="fas fa-check-circle"></i>
                        <span class="english">Thank you! Your message has been sent successfully. We'll contact you soon.</span>
                        <span class="amharic">አመሰግናለሁ! መልእክትዎ በተሳካ ሁኔታ ተልኳል። በቅርቡ እንገናኝዎታለን።</span>
                    `;
                    formMessage.style.display = 'block';
                    
                    // Reset button
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    
                    // Reset form after 5 seconds
                    setTimeout(() => {
                        contactForm.reset();
                        formMessage.style.display = 'none';
                    }, 5000);
                    
                    // Scroll to message
                    formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                    
                }, 1500); // Simulated delay
            }
        });
        
        // Reset form button
        const resetBtn = contactForm.querySelector('.reset-btn');
        if (resetBtn) {
            resetBtn.addEventListener('click', function() {
                clearErrors();
                formMessage.style.display = 'none';
            });
        }
        
        // Real-time validation
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                // Clear error when user starts typing
                const errorId = this.id + 'Error';
                const errorElement = document.getElementById(errorId);
                if (errorElement) {
                    errorElement.textContent = '';
                }
            });
        });
    }
    
    // Helper functions
    function showError(elementId, message) {
        const errorElement = document.getElementById(elementId);
        if (errorElement) {
            errorElement.textContent = message;
        }
    }
    
    function clearErrors() {
        const errorElements = document.querySelectorAll('.error-message');
        errorElements.forEach(element => {
            element.textContent = '';
        });
    }
    
    function validateField(field) {
        const value = field.value.trim();
        const fieldId = field.id;
        
        switch (fieldId) {
            case 'fullName':
                if (!value) {
                    showError('nameError', 'Full name is required');
                } else if (value.length < 2) {
                    showError('nameError', 'Name must be at least 2 characters');
                }
                break;
                
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!value) {
                    showError('emailError', 'Email address is required');
                } else if (!emailRegex.test(value)) {
                    showError('emailError', 'Please enter a valid email address');
                }
                break;
                
            case 'message':
                if (!value) {
                    showError('messageError', 'Message is required');
                } else if (value.length < 10) {
                    showError('messageError', 'Message must be at least 10 characters');
                }
                break;
        }
    }
});


// Simple Auto-Changing Image Slideshow
document.addEventListener('DOMContentLoaded', function() {
    // Get all elements
    const slideshow = document.querySelector('.image-slideshow');
    if (!slideshow) return;
    
    const slides = slideshow.querySelectorAll('.slide');
    const dots = slideshow.querySelectorAll('.dot');
    let currentIndex = 0;
    let slideInterval;
    
    // Function to show a specific slide
    function showSlide(index) {
        // Remove active class from all slides and dots
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Set new current index (with looping)
        currentIndex = (index + slides.length) % slides.length;
        
        // Add active class to current slide and dot
        slides[currentIndex].classList.add('active');
        dots[currentIndex].classList.add('active');
    }
    
    // Function to go to next slide
    function nextSlide() {
        showSlide(currentIndex + 1);
    }
    
    // Function to start automatic slideshow
    function startSlideshow() {
        // Clear any existing interval
        if (slideInterval) clearInterval(slideInterval);
        
        // Start new interval (change every 5 seconds)
        slideInterval = setInterval(nextSlide, 5000);
    }
    
    // Function to go to specific slide when dot is clicked
    function setupDotNavigation() {
        dots.forEach((dot, index) => {
            dot.addEventListener('click', function() {
                // Stop the auto-timer when user interacts
                clearInterval(slideInterval);
                
                // Go to the clicked slide
                showSlide(index);
                
                // Restart the timer after 5 seconds
                setTimeout(startSlideshow, 5000);
            });
        });
    }
    
    // Initialize the slideshow
    function initSlideshow() {
        // Show first slide
        showSlide(0);
        
        // Start automatic changing
        startSlideshow();
        
        // Setup dot navigation
        setupDotNavigation();
    }
    
    // Start everything
    initSlideshow();
    
    // Optional: Pause on hover (if you want)
    // slideshow.addEventListener('mouseenter', () => clearInterval(slideInterval));
    // slideshow.addEventListener('mouseleave', startSlideshow);
});
// Highlight current page in navigation
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-menu a');
    const currentPage = window.location.pathname.split('/').pop();
    
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        
        // Remove active class from all
        link.classList.remove('active');
        
        // Check if this link matches current page
        if (linkHref === currentPage || 
           (currentPage === 'hadiyazone.html' && linkHref.startsWith('#')) ||
           (currentPage === '' && linkHref === 'hadiyazone.html#home')) {
            link.classList.add('active');
        }
    });
});