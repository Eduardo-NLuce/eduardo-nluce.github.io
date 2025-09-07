document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeProjectModals();
    initializeForms();
    initializeDownloads();
});

function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all
            navLinks.forEach(el => el.classList.remove('active'));
            sections.forEach(el => el.classList.remove('active'));
            
            // Add active to clicked
            this.classList.add('active');
            
            const sectionId = this.getAttribute('data-section');
            const targetSection = document.getElementById(sectionId);
            
            if (targetSection) {
                targetSection.classList.add('active');
            }
            
            window.scrollTo(0, 0);
        });
    });
}

function initializeProjectModals() {
    const overlay = document.querySelector('.project-overlay');
    
    function openProject(projectId) {
        const modal = document.getElementById(`project-${projectId}`);
        if (modal) {
            modal.style.display = 'block';
            overlay.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
    }
    
    function closeAllModals() {
        document.querySelectorAll('.project-detail').forEach(modal => {
            modal.style.display = 'none';
        });
        overlay.style.display = 'none';
        document.body.style.overflow = '';
    }
    
    // Open projects
    document.querySelectorAll('.clickable-project').forEach(item => {
        item.addEventListener('click', function(e) {
            if (!e.target.closest('a') && !e.target.closest('button')) {
                const projectId = this.getAttribute('data-project');
                openProject(projectId);
            }
        });
    });
    
    // Close buttons
    document.querySelectorAll('.close-project').forEach(btn => {
        btn.addEventListener('click', closeAllModals);
    });
    
    // Close on overlay click
    overlay.addEventListener('click', closeAllModals);
    
    // Close with ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeAllModals();
        }
    });
}

function initializeForms() {
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            if (!name || !email || !message) {
                alert('Please fill in all fields');
                return;
            }
            
            alert('Thank you for your message! I will get back to you soon.');
            this.reset();
        });
    }
}

function initializeDownloads() {
    document.querySelectorAll('.download-btn').forEach(btn => {
        if (!btn.hasAttribute('href')) {
            btn.addEventListener('click', function() {
                alert('Download functionality would be implemented here');
            });
        }
    });
}

// Image fallback
document.querySelectorAll('img').forEach(img => {
    img.onerror = function() {
        this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzY2NiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIG5vdCBmb3VuZDwvdGV4dD48L3N2Zz4=';
    };
});
