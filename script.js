// Navegación entre secciones
document.addEventListener('DOMContentLoaded', function() {
    // Initialize navigation
    initializeNavigation();
    
    // Initialize project modals
    initializeProjectModals();
    
    // Initialize form handling
    initializeForms();
    
    // Initialize downloads
    initializeDownloads();
});

// Navigation system
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    
    // Set first section as active by default
    if (sections.length > 0 && !document.querySelector('section.active')) {
        sections[0].classList.add('active');
        navLinks[0].classList.add('active');
    }
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links and sections
            navLinks.forEach(el => el.classList.remove('active'));
            sections.forEach(el => el.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Show corresponding section
            const sectionId = this.getAttribute('data-section');
            const targetSection = document.getElementById(sectionId);
            
            if (targetSection) {
                targetSection.classList.add('active');
            }
            
            // Scroll to top
            window.scrollTo(0, 0);
        });
    });
}

// Project modal system
function initializeProjectModals() {
    // Create overlay element if it doesn't exist
    let overlay = document.querySelector('.project-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'project-overlay';
        document.body.appendChild(overlay);
    }
    
    // Function to open project
    function openProject(projectId) {
        const projectDetail = document.getElementById(`project-${projectId}`);
        if (projectDetail) {
            projectDetail.style.display = 'block';
            overlay.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
    }
    
    // Function to close project
    function closeProject() {
        const openProjects = document.querySelectorAll('.project-detail');
        openProjects.forEach(project => {
            project.style.display = 'none';
        });
        overlay.style.display = 'none';
        document.body.style.overflow = '';
    }
    
    // Event listeners for opening projects
    document.querySelectorAll('.clickable-project').forEach(item => {
        item.addEventListener('click', function(e) {
            // Prevent click if it's on a download button inside the project
            if (e.target.closest('a') || e.target.closest('button')) {
                return;
            }
            
            const projectId = this.getAttribute('data-project');
            if (projectId) {
                openProject(projectId);
            }
        });
    });
    
    // Event listeners for closing projects
    document.querySelectorAll('.close-project').forEach(button => {
        button.addEventListener('click', closeProject);
    });
    
    // Close when clicking on overlay
    overlay.addEventListener('click', closeProject);
    
    // Close with ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeProject();
        }
    });
}

// Form handling
function initializeForms() {
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic validation
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const message = document.getElementById('message');
            
            let isValid = true;
            
            // Reset previous errors
            document.querySelectorAll('.error-message').forEach(el => el.remove());
            document.querySelectorAll('.form-group').forEach(el => el.classList.remove('error'));
            
            // Validate name
            if (!name.value.trim()) {
                showError(name, 'Please enter your name');
                isValid = false;
            }
            
            // Validate email
            if (!email.value.trim() || !isValidEmail(email.value)) {
                showError(email, 'Please enter a valid email address');
                isValid = false;
            }
            
            // Validate message
            if (!message.value.trim()) {
                showError(message, 'Please enter your message');
                isValid = false;
            }
            
            if (isValid) {
                // Simulate form submission
                simulateFormSubmission(this);
            }
        });
    }
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Show error message
function showError(input, message) {
    const formGroup = input.closest('.form-group');
    formGroup.classList.add('error');
    
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.style.color = '#dc3545';
    errorElement.style.fontSize = '14px';
    errorElement.style.marginTop = '5px';
    errorElement.textContent = message;
    
    formGroup.appendChild(errorElement);
}

// Simulate form submission
function simulateFormSubmission(form) {
    const submitBtn = form.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    
    // Show loading state
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        alert('Thank you for your message! I will get back to you soon.');
        form.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 1500);
}

// Download handling
function initializeDownloads() {
    document.querySelectorAll('.download-btn').forEach(btn => {
        if (!btn.hasAttribute('href')) {
            btn.addEventListener('click', function() {
                const fileName = this.closest('.download-item').querySelector('h3').textContent;
                alert(`Download would start for: ${fileName}\n\nIn a real implementation, this would download the actual file.`);
            });
        }
    });
}

// Image fallback handling
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.onerror = function() {
            this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkZGRkIi8+CiAgPHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OTk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPlByb2plY3QgSW1hZ2U8L3RleHQ+Cjwvc3ZnPg==';
            this.alt = 'Image not available';
        };
    });
});
