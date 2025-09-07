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
// Add these functions to your existing script.js

function initializeBlog() {
    const blogPosts = document.querySelectorAll('.blog-post');
    const blogModal = document.getElementById('blog-modal');
    const blogOverlay = document.querySelector('.blog-modal-overlay');
    const closeBlogModal = document.querySelector('.blog-close-modal');

    // Blog content data
    const blogContent = {
        'sustainable-architecture': {
            title: 'The Future of Sustainable Architecture',
            date: 'May 15, 2023',
            category: 'Architectural Review',
            content: `
                <p>The architectural landscape is undergoing a profound transformation as sustainability becomes the cornerstone of modern design. This shift is not merely about incorporating green technologies but represents a fundamental rethinking of how we conceptualize, construct, and inhabit our built environment.</p>

                <h3>Material Innovation</h3>
                <p>Recent advancements in material science have introduced groundbreaking sustainable options. Cross-laminated timber (CLT) is revolutionizing construction with its carbon-negative properties, while mycelium-based composites offer biodegradable alternatives to traditional insulation materials. These innovations are challenging conventional construction methodologies and paving the way for truly circular architecture.</p>

                <h3>Energy Integration</h3>
                <p>Building-integrated photovoltaics (BIPV) have evolved from mere functional elements to integral design components. Modern BIPV systems seamlessly blend with architectural surfaces while generating renewable energy. Combined with smart grid technology, buildings are transitioning from energy consumers to proactive energy managers within urban ecosystems.</p>

                <h3>Biophilic Design Principles</h3>
                <p>The integration of nature into architectural design has demonstrated significant benefits for both environmental performance and human wellbeing. Living walls, green roofs, and strategic natural ventilation systems create microclimates that reduce energy consumption while enhancing occupant health and productivity.</p>

                <p>As we look to the future, sustainable architecture will continue to evolve through the integration of AI-driven design optimization, advanced material science, and a deeper understanding of ecological systems. The buildings of tomorrow will not only minimize their environmental impact but actively contribute to ecosystem restoration and community resilience.</p>
            `
        },
        'minimalism-architecture': {
            title: 'Minimalism in Modern Architecture',
            date: 'March 22, 2023',
            category: 'Design Quarterly',
            content: `
                <p>Minimalism in architecture represents more than an aesthetic choice; it embodies a philosophical approach to design that emphasizes essence over excess, quality over quantity, and experience over ornamentation.</p>

                <h3>Historical Context</h3>
                <p>The minimalist movement in architecture emerged as a reaction against the decorative excesses of postmodernism. Drawing inspiration from traditional Japanese design, Bauhaus principles, and modernist masters like Mies van der Rohe, minimalism sought to strip architecture down to its essential elements.</p>

                <h3>Key Principles</h3>
                <ul>
                    <li><strong>Simplicity of Form:</strong> Clean lines and geometric purity</li>
                    <li><strong>Material Honesty:</strong> Celebration of natural materials in their authentic state</li>
                    <li><strong>Spatial Clarity:</strong> Thoughtful organization of space and light</li>
                    <li><strong>Functional Integrity:</strong> Every element serves a purpose</li>
                </ul>

                <h3>Contemporary Applications</h3>
                <p>Modern minimalist architecture has evolved to incorporate sustainable practices and smart technology. The emphasis on simplicity now extends to energy efficiency, with passive design strategies and integrated technology becoming inherent to the minimalist ethos.</p>

                <p>Today's minimalist architecture demonstrates that less can indeed be more—more sustainable, more meaningful, and more responsive to human needs.</p>
            `
        },
        'computational-heritage': {
            title: 'Computational Design in Heritage Conservation',
            date: 'January 8, 2023',
            category: 'Digital Heritage Journal',
            content: `
                <p>The integration of computational design methodologies into heritage conservation represents a paradigm shift in how we approach the preservation and restoration of historical structures.</p>

                <h3>Digital Documentation</h3>
                <p>Advanced scanning technologies, including LiDAR and photogrammetry, enable the creation of precise digital twins of heritage structures. These digital models serve as both documentation and analytical tools, allowing conservators to monitor structural health and plan interventions with unprecedented accuracy.</p>

                <h3>Parametric Analysis</h3>
                <p>Computational tools enable the analysis of structural behavior under various conditions, helping predict how historical materials will respond to environmental changes and conservation treatments. This predictive capability is revolutionizing preventive conservation strategies.</p>

                <h3>Custom Fabrication</h3>
                <p>Digital fabrication technologies allow for the precise recreation of damaged or missing architectural elements. From 3D-printed replacement pieces to CNC-milled structural components, computational design ensures historical accuracy while utilizing modern materials and techniques.</p>

                <p>The marriage of computational design and heritage conservation is creating new possibilities for preserving our architectural legacy while respecting historical authenticity.</p>
            `
        },
        'soft-robotics': {
            title: 'Soft Robotics in Adaptive Architecture',
            date: 'November 12, 2022',
            category: 'Robotic Architecture Review',
            content: `
                <p>Soft robotics represents a revolutionary approach to creating architectural systems that can dynamically respond to environmental conditions and user needs through biomimetic principles and flexible material systems.</p>

                <h3>Principles of Soft Robotics</h3>
                <p>Unlike traditional rigid robotics, soft robotic systems utilize compliant materials that can undergo large deformations. This flexibility allows for organic movement patterns and adaptive behaviors that mirror natural systems.</p>

                <h3>Architectural Applications</h3>
                <ul>
                    <li><strong>Responsive Facades:</strong> Building skins that adapt to sunlight and temperature</li>
                    <li><strong>Adaptive Interior Spaces:</strong> Rooms that reconfigure based on usage patterns</li>
                    <li><strong>Interactive Installations:</strong> Architectural elements that respond to human presence</li>
                    <li><strong>Emergency Response Systems:</strong> Structures that can modify themselves in crisis situations</li>
                </ul>

                <h3>Material Innovations</h3>
                <p>Advanced materials including shape-memory alloys, electroactive polymers, and pneumatic artificial muscles enable the creation of architectural systems that can change form, texture, and permeability in response to environmental stimuli.</p>

                <p>The integration of soft robotics into architecture promises to create buildings that are not static objects but dynamic, living systems that continuously adapt to serve their inhabitants and environment.</p>
            `
        }
    };

    // Open blog post
    blogPosts.forEach(post => {
        post.addEventListener('click', function(e) {
            if (!e.target.closest('.blog-read-more') && !e.target.closest('a')) {
                const postId = this.getAttribute('data-post');
                openBlogPost(postId);
            }
        });

        // Read more button
        const readMoreBtn = post.querySelector('.blog-read-more');
        if (readMoreBtn) {
            readMoreBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                const postId = post.getAttribute('data-post');
                openBlogPost(postId);
            });
        }
    });

    function openBlogPost(postId) {
        const content = blogContent[postId];
        if (content) {
            document.getElementById('blog-modal-title').textContent = content.title;
            document.getElementById('blog-modal-date').textContent = content.date;
            document.getElementById('blog-modal-category').textContent = content.category;
            document.getElementById('blog-modal-content').innerHTML = content.content;
            
            blogModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
    }

    // Close modal
    function closeModal() {
        blogModal.style.display = 'none';
        document.body.style.overflow = '';
    }

    closeBlogModal.addEventListener('click', closeModal);
    blogOverlay.addEventListener('click', closeModal);

    // Close with ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && blogModal.style.display === 'block') {
            closeModal();
        }
    });
}

// Initialize blog when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeBlog();
});
