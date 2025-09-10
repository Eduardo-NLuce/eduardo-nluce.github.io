// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    // Your credentials
    const ADMIN_CREDENTIALS = {
        username: 'eluce',
        password: 'SabrinaCarpenter'
    };

    // Navigation
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links and sections
            navLinks.forEach(l => l.classList.remove('active'));
            sections.forEach(s => s.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Show corresponding section
            const sectionId = this.getAttribute('data-section');
            document.getElementById(sectionId).classList.add('active');
            
            // Scroll to top
            window.scrollTo(0, 0);
        });
    });
    
    // Project modals
    const clickableProjects = document.querySelectorAll('.clickable-project');
    const projectOverlay = document.querySelector('.project-overlay');
    const projectDetails = document.querySelectorAll('.project-detail');
    const closeButtons = document.querySelectorAll('.close-project');
    
    clickableProjects.forEach(project => {
        project.addEventListener('click', function() {
            const projectId = this.getAttribute('data-project');
            const projectDetail = document.getElementById(`project-${projectId}`);
            
            // Show overlay and project detail
            projectOverlay.style.display = 'block';
            projectDetail.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Close modals
    function closeModals() {
        projectOverlay.style.display = 'none';
        projectDetails.forEach(detail => {
            detail.style.display = 'none';
        });
        document.body.style.overflow = 'auto';
    }
    
    projectOverlay.addEventListener('click', closeModals);
    closeButtons.forEach(button => {
        button.addEventListener('click', closeModals);
    });
    
    // Prevent project detail from closing when clicking inside it
    projectDetails.forEach(detail => {
        detail.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    });
    
    // Download buttons
    const downloadBtns = document.querySelectorAll('.download-btn');
    downloadBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            alert('Download functionality would be implemented here. In a real application, this would download the actual file.');
        });
    });
    
    // Contact form
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! In a real application, this would be sent to a server.');
            this.reset();
        });
    }
    
    // Check if admin access is requested via URL
    if (window.location.href.includes('adminluce')) {
        showAdminPanel();
    }
    
    // Admin functionality
    const adminPanel = document.getElementById('adminPanel');
    const loginModal = document.getElementById('loginModal');
    const adminTabs = document.querySelectorAll('.admin-tab');
    const adminContents = document.querySelectorAll('.admin-content');
    const loginBtn = document.getElementById('login-btn');
    const logoutBtn = document.getElementById('logout');
    const closeLoginBtn = document.getElementById('close-login');
    const closeAdminBtn = document.querySelector('.close-admin');
    const projectForm = document.getElementById('project-form');
    const textForm = document.getElementById('text-form');
    const downloadForm = document.getElementById('download-form');
    const publishProjectBtn = document.getElementById('publish-project');
    const publishTextBtn = document.getElementById('publish-text');
    const publishDownloadBtn = document.getElementById('publish-download');
    const exportDataBtn = document.getElementById('export-data');
    const importDataBtn = document.getElementById('import-data-btn');
    const importDataInput = document.getElementById('import-data');
    
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('adminLoggedIn') === 'true';
    
    // Initialize admin if needed
    if (window.location.href.includes('adminluce')) {
        if (isLoggedIn) {
            adminPanel.classList.add('active');
            loadContent();
        } else {
            loginModal.classList.add('active');
        }
    }
    
    // Event listeners for admin
    adminTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Update active tab
            adminTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Show corresponding content
            adminContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === `${tabId}-admin`) {
                    content.classList.add('active');
                }
            });
        });
    });
    
    // Login functionality
    loginBtn.addEventListener('click', function() {
        const username = document.getElementById('login-username').value;
        const password = document.getElementById('login-password').value;
        
        // Authentication with credentials
        if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
            localStorage.setItem('adminLoggedIn', 'true');
            loginModal.classList.remove('active');
            adminPanel.classList.add('active');
            loadContent();
            updatePortfolioDisplay();
            updateTextsDisplay();
            updateDownloadsDisplay();
        } else {
            alert('Invalid credentials. Please try again.');
        }
    });
    
    // Close login modal
    closeLoginBtn.addEventListener('click', function() {
        loginModal.classList.remove('active');
        window.history.replaceState({}, document.title, window.location.pathname);
    });
    
    // Close admin panel
    closeAdminBtn.addEventListener('click', function() {
        adminPanel.classList.remove('active');
        window.history.replaceState({}, document.title, window.location.pathname);
    });
    
    // Logout functionality
    logoutBtn.addEventListener('click', function() {
        localStorage.setItem('adminLoggedIn', 'false');
        adminPanel.classList.remove('active');
        window.history.replaceState({}, document.title, window.location.pathname);
    });
    
    // Project form submission
    if (projectForm) {
        projectForm.addEventListener('submit', function(e) {
            e.preventDefault();
            saveProject(false);
        });
    }
    
    // Text form submission
    if (textForm) {
        textForm.addEventListener('submit', function(e) {
            e.preventDefault();
            saveText(false);
        });
    }
    
    // Download form submission
    if (downloadForm) {
        downloadForm.addEventListener('submit', function(e) {
            e.preventDefault();
            saveDownload(false);
        });
    }
    
    // Publish buttons
    if (publishProjectBtn) {
        publishProjectBtn.addEventListener('click', function() {
            saveProject(true);
        });
    }
    
    if (publishTextBtn) {
        publishTextBtn.addEventListener('click', function() {
            saveText(true);
        });
    }
    
    if (publishDownloadBtn) {
        publishDownloadBtn.addEventListener('click', function() {
            saveDownload(true);
        });
    }
    
    // Export data
    if (exportDataBtn) {
        exportDataBtn.addEventListener('click', exportData);
    }
    
    // Import data
    if (importDataBtn) {
        importDataBtn.addEventListener('click', function() {
            importDataInput.click();
        });
    }
    
    if (importDataInput) {
        importDataInput.addEventListener('change', importData);
    }
    
    // Function to show admin panel
    function showAdminPanel() {
        document.body.style.overflow = 'hidden';
    }
    
    // Function to save project
    function saveProject(publish) {
        const title = document.getElementById('project-title').value;
        const description = document.getElementById('project-description').value;
        const meta = document.getElementById('project-meta').value;
        const imageUrl = document.getElementById('project-image-url').value;
        const details = document.getElementById('project-details').value;
        
        if (!title || !description) {
            alert('Please fill in all required fields (title and description).');
            return;
        }
        
        // Get existing projects or initialize empty array
        const projects = JSON.parse(localStorage.getItem('portfolioProjects')) || [];
        
        // Create project object
        const project = {
            id: Date.now(),
            title,
            description,
            meta,
            imageUrl,
            details,
            published: publish,
            createdAt: new Date().toISOString()
        };
        
        projects.push(project);
        localStorage.setItem('portfolioProjects', JSON.stringify(projects));
        
        alert(`Project ${publish ? 'published' : 'saved'} successfully!`);
        projectForm.reset();
        loadContent();
        updatePortfolioDisplay();
    }
    
    // Function to save text
    function saveText(publish) {
        const title = document.getElementById('text-title').value;
        const content = document.getElementById('text-content').value;
        const meta = document.getElementById('text-meta').value;
        
        if (!title || !content) {
            alert('Please fill in all required fields (title and content).');
            return;
        }
        
        // Get existing texts or initialize empty array
        const texts = JSON.parse(localStorage.getItem('portfolioTexts')) || [];
        
        // Create text object
        const text = {
            id: Date.now(),
            title,
            content,
            meta,
            published: publish,
            createdAt: new Date().toISOString()
        };
        
        texts.push(text);
        localStorage.setItem('portfolioTexts', JSON.stringify(texts));
        
        alert(`Text ${publish ? 'published' : 'saved'} successfully!`);
        textForm.reset();
        loadContent();
        updateTextsDisplay();
    }
    
    // Function to save download
    function saveDownload(publish) {
        const title = document.getElementById('download-title').value;
        const description = document.getElementById('download-description').value;
        const file = document.getElementById('download-file').value;
        
        if (!title || !description) {
            alert('Please fill in all required fields (title and description).');
            return;
        }
        
        // Get existing downloads or initialize empty array
        const downloads = JSON.parse(localStorage.getItem('portfolioDownloads')) || [];
        
        // Create download object
        const download = {
            id: Date.now(),
            title,
            description,
            file,
            published: publish,
            createdAt: new Date().toISOString()
        };
        
        downloads.push(download);
        localStorage.setItem('portfolioDownloads', JSON.stringify(downloads));
        
        alert(`Download ${publish ? 'published' : 'saved'} successfully!`);
        downloadForm.reset();
        loadContent();
        updateDownloadsDisplay();
    }
    
    // Load content for listing
    function loadContent() {
        loadProjects();
        loadTexts();
        loadDownloads();
    }
    
    function loadProjects() {
        const projectsList = document.getElementById('projects-list');
        const projects = JSON.parse(localStorage.getItem('portfolioProjects')) || [];
        
        if (!projectsList) return;
        
        projectsList.innerHTML = '';
        
        if (projects.length === 0) {
            projectsList.innerHTML = '<p>No projects yet.</p>';
            return;
        }
        
        projects.forEach(project => {
            const projectEl = document.createElement('div');
            projectEl.className = `content-item ${project.published ? 'published' : 'draft'}`;
            projectEl.innerHTML = `
                <h4>${project.title} ${project.published ? '(Published)' : '(Draft)'}</h4>
                <p>${project.meta || 'No metadata'}</p>
                <div class="content-actions">
                    <button class="admin-btn" onclick="editProject(${project.id})">Edit</button>
                    <button class="admin-btn secondary" onclick="togglePublishProject(${project.id}, ${!project.published})">
                        ${project.published ? 'Unpublish' : 'Publish'}
                    </button>
                    <button class="admin-btn secondary" onclick="deleteProject(${project.id})">Delete</button>
                </div>
            `;
            projectsList.appendChild(projectEl);
        });
    }
    
    function loadTexts() {
        const textsList = document.getElementById('texts-list');
        const texts = JSON.parse(localStorage.getItem('portfolioTexts')) || [];
        
        if (!textsList) return;
        
        textsList.innerHTML = '';
        
        if (texts.length === 0) {
            textsList.innerHTML = '<p>No texts yet.</p>';
            return;
        }
        
        texts.forEach(text => {
            const textEl = document.createElement('div');
            textEl.className = `content-item ${text.published ? 'published' : 'draft'}`;
            textEl.innerHTML = `
                <h4>${text.title} ${text.published ? '(Published)' : '(Draft)'}</h4>
                <p>${text.meta || 'No metadata'}</p>
                <div class="content-actions">
                    <button class="admin-btn" onclick="editText(${text.id})">Edit</button>
                    <button class="admin-btn secondary" onclick="togglePublishText(${text.id}, ${!text.published})">
                        ${text.published ? 'Unpublish' : 'Publish'}
                    </button>
                    <button class="admin-btn secondary" onclick="deleteText(${text.id})">Delete</button>
                </div>
            `;
            textsList.appendChild(textEl);
        });
    }
    
    function loadDownloads() {
        const downloadsList = document.getElementById('downloads-list');
        const downloads = JSON.parse(localStorage.getItem('portfolioDownloads')) || [];
        
        if (!downloadsList) return;
        
        downloadsList.innerHTML = '';
        
        if (downloads.length === 0) {
            downloadsList.innerHTML = '<p>No downloads yet.</p>';
            return;
        }
        
        downloads.forEach(download => {
            const downloadEl = document.createElement('div');
            downloadEl.className = `content-item ${download.published ? 'published' : 'draft'}`;
            downloadEl.innerHTML = `
                <h4>${download.title} ${download.published ? '(Published)' : '(Draft)'}</h4>
                <p>${download.description || 'No description'}</p>
                <div class="content-actions">
                    <button class="admin-btn" onclick="editDownload(${download.id})">Edit</button>
                    <button class="admin-btn secondary" onclick="togglePublishDownload(${download.id}, ${!download.published})">
                        ${download.published ? 'Unpublish' : 'Publish'}
                    </button>
                    <button class="admin-btn secondary" onclick="deleteDownload(${download.id})">Delete</button>
                </div>
            `;
            downloadsList.appendChild(downloadEl);
        });
    }
    
    // Update portfolio display with saved projects
    function updatePortfolioDisplay() {
        const portfolioGrid = document.querySelector('.portfolio-grid');
        const projects = JSON.parse(localStorage.getItem('portfolioProjects')) || [];
        
        // Clear existing items except the first two (which are hardcoded in HTML)
        const itemsToRemove = portfolioGrid.querySelectorAll('.portfolio-item:not(.clickable-project)');
        itemsToRemove.forEach(item => item.remove());
        
        // Add saved projects (only published ones)
        projects.filter(p => p.published).forEach(project => {
            const portfolioItem = document.createElement('div');
            portfolioItem.className = 'portfolio-item';
            
            portfolioItem.innerHTML = `
                <div class="project-image clickable-project" data-project="custom-${project.id}">
                    <img src="${project.imageUrl || 'https://via.placeholder.com/600x400/112240/64ffda?text=Project+Image'}" alt="${project.title}">
                    <div class="overlay">
                        <h2>${project.title}</h2>
                        <p>${project.meta || ''}</p>
                        <div class="click-hint">↗ Click for details</div>
                    </div>
                </div>
            `;
            
            portfolioItem.querySelector('.project-image').addEventListener('click', function() {
                // Create and show a modal for this project
                showProjectModal(project);
            });
            
            portfolioGrid.appendChild(portfolioItem);
        });
    }
    
    // Update texts display with saved texts
    function updateTextsDisplay() {
        const textsList = document.querySelector('.texts-list');
        const texts = JSON.parse(localStorage.getItem('portfolioTexts')) || [];
        
        // Clear existing items
        textsList.innerHTML = '';
        
        // Add saved texts (only published ones)
        texts.filter(t => t.published).forEach(text => {
            const textItem = document.createElement('div');
            textItem.className = 'text-item';
            
            textItem.innerHTML = `
                <h3>${text.title}</h3>
                <div class="text-content">
                    <p>${text.content}</p>
                    ${text.meta ? `<span class="meta">${text.meta}</span>` : ''}
                </div>
            `;
            
            // Make text items clickable to expand/collapse
            textItem.addEventListener('click', function() {
                this.classList.toggle('active');
            });
            
            textsList.appendChild(textItem);
        });
    }
    
    // Update downloads display with saved downloads
    function updateDownloadsDisplay() {
        const downloadsList = document.querySelector('.downloads-list');
        const downloads = JSON.parse(localStorage.getItem('portfolioDownloads')) || [];
        
        // Clear existing items
        downloadsList.innerHTML = '';
        
        // Add saved downloads (only published ones)
        downloads.filter(d => d.published).forEach(download => {
            const downloadItem = document.createElement('div');
            downloadItem.className = 'download-item';
            
            downloadItem.innerHTML = `
                <div>
                    <h3>${download.title}</h3>
                    <p>${download.description}</p>
                </div>
                <button class="download-btn">Download</button>
            `;
            
            // Add download functionality
            downloadItem.querySelector('.download-btn').addEventListener('click', function(e) {
                e.stopPropagation();
                if (download.file) {
                    window.open(download.file, '_blank');
                } else {
                    alert('No file associated with this download.');
                }
            });
            
            downloadsList.appendChild(downloadItem);
        });
    }
    
    // Show project modal
    function showProjectModal(project) {
        const projectOverlay = document.querySelector('.project-overlay');
        const projectDetail = document.createElement('div');
        projectDetail.className = 'project-detail';
        
        projectDetail.innerHTML = `
            <div class="project-header">
                <h3>${project.title}</h3>
                <button class="close-project">×</button>
            </div>
            
            <div class="project-content">
                <p class="project-meta">${project.meta || ''}</p>
                
                <div class="project-description">
                    ${project.details || `<p>${project.description}</p>`}
                </div>
            </div>
        `;
        
        document.body.appendChild(projectDetail);
        projectOverlay.style.display = 'block';
        projectDetail.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Add close event
        const closeBtn = projectDetail.querySelector('.close-project');
        closeBtn.addEventListener('click', function() {
            projectOverlay.style.display = 'none';
            projectDetail.remove();
            document.body.style.overflow = 'auto';
        });
        
        // Close when clicking outside
        projectOverlay.addEventListener('click', function() {
            projectOverlay.style.display = 'none';
            projectDetail.remove();
            document.body.style.overflow = 'auto';
        });
        
        // Prevent closing when clicking inside modal
        projectDetail.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }
    
    // Export data function
    function exportData() {
        const data = {
            projects: JSON.parse(localStorage.getItem('portfolioProjects')) || [],
            texts: JSON.parse(localStorage.getItem('portfolioTexts')) || [],
            downloads: JSON.parse(localStorage.getItem('portfolioDownloads')) || []
        };
        
        const dataStr = JSON.stringify(data, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
        
        const exportFileDefaultName = 'portfolio-data.json';
        
        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
    }
    
    // Import data function
    function importData(e) {
        const file = e.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = function(e) {
            try {
                const data = JSON.parse(e.target.result);
                
                if (data.projects) localStorage.setItem('portfolioProjects', JSON.stringify(data.projects));
                if (data.texts) localStorage.setItem('portfolioTexts', JSON.stringify(data.texts));
                if (data.downloads) localStorage.setItem('portfolioDownloads', JSON.stringify(data.downloads));
                
                alert('Data imported successfully!');
                loadContent();
                updatePortfolioDisplay();
                updateTextsDisplay();
                updateDownloadsDisplay();
            } catch (error) {
                alert('Error importing data: ' + error.message);
            }
        };
        reader.readAsText(file);
    }
    
    // Make functions available globally
    window.editProject = function(id) {
        const projects = JSON.parse(localStorage.getItem('portfolioProjects')) || [];
        const project = projects.find(p => p.id === id);
        
        if (project) {
            document.getElementById('project-title').value = project.title;
            document.getElementById('project-description').value = project.description;
            document.getElementById('project-meta').value = project.meta || '';
            document.getElementById('project-image-url').value = project.imageUrl || '';
            document.getElementById('project-details').value = project.details || '';
            
            // Switch to projects tab
            document.querySelector('[data-tab="projects"]').click();
        }
    };
    
    window.togglePublishProject = function(id, publish) {
        const projects = JSON.parse(localStorage.getItem('portfolioProjects')) || [];
        const projectIndex = projects.findIndex(p => p.id === id);
        
        if (projectIndex !== -1) {
            projects[projectIndex].published = publish;
            localStorage.setItem('portfolioProjects', JSON.stringify(projects));
            loadProjects();
            updatePortfolioDisplay();
        }
    };
    
    window.deleteProject = function(id) {
        if (confirm('Are you sure you want to delete this project?')) {
            let projects = JSON.parse(localStorage.getItem('portfolioProjects')) || [];
            projects = projects.filter(p => p.id !== id);
            localStorage.setItem('portfolioProjects', JSON.stringify(projects));
            loadProjects();
            updatePortfolioDisplay();
        }
    };
    
    window.editText = function(id) {
        const texts = JSON.parse(localStorage.getItem('portfolioTexts')) || [];
        const text = texts.find(t => t.id === id);
        
        if (text) {
            document.getElementById('text-title').value = text.title;
            document.getElementById('text-content').value = text.content;
            document.getElementById('text-meta').value = text.meta || '';
            
            // Switch to texts tab
            document.querySelector('[data-tab="texts"]').click();
        }
    };
    
    window.togglePublishText = function(id, publish) {
        const texts = JSON.parse(localStorage.getItem('portfolioTexts')) || [];
        const textIndex = texts.findIndex(t => t.id === id);
        
        if (textIndex !== -1) {
            texts[textIndex].published = publish;
            localStorage.setItem('portfolioTexts', JSON.stringify(texts));
            loadTexts();
            updateTextsDisplay();
        }
    };
    
    window.deleteText = function(id) {
        if (confirm('Are you sure you want to delete this text?')) {
            let texts = JSON.parse(localStorage.getItem('portfolioTexts')) || [];
            texts = texts.filter(t => t.id !== id);
            localStorage.setItem('portfolioTexts', JSON.stringify(texts));
            loadTexts();
            updateTextsDisplay();
        }
    };
    
    window.editDownload = function(id) {
        const downloads = JSON.parse(localStorage.getItem('portfolioDownloads')) || [];
        const download = downloads.find(d => d.id === id);
        
        if (download) {
            document.getElementById('download-title').value = download.title;
            document.getElementById('download-description').value = download.description;
            document.getElementById('download-file').value = download.file || '';
            
            // Switch to downloads tab
            document.querySelector('[data-tab="downloads"]').click();
        }
    };
    
    window.togglePublishDownload = function(id, publish) {
        const downloads = JSON.parse(localStorage.getItem('portfolioDownloads')) || [];
        const downloadIndex = downloads.findIndex(d => d.id === id);
        
        if (downloadIndex !== -1) {
            downloads[downloadIndex].published = publish;
            localStorage.setItem('portfolioDownloads', JSON.stringify(downloads));
            loadDownloads();
            updateDownloadsDisplay();
        }
    };
    
    window.deleteDownload = function(id) {
        if (confirm('Are you sure you want to delete this download?')) {
            let downloads = JSON.parse(localStorage.getItem('portfolioDownloads')) || [];
            downloads = downloads.filter(d => d.id !== id);
            localStorage.setItem('portfolioDownloads', JSON.stringify(downloads));
            loadDownloads();
            updateDownloadsDisplay();
        }
    };
    
    // Initial content load
    updatePortfolioDisplay();
    updateTextsDisplay();
    updateDownloadsDisplay();
});
