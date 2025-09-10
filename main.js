// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
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
  
  // Make text items clickable to expand/collapse
  document.addEventListener('click', function(e) {
    if (e.target.closest('.text-item')) {
      const textItem = e.target.closest('.text-item');
      textItem.classList.toggle('active');
    }
  });
  
  // Load any saved content
  updatePortfolioDisplay();
  updateTextsDisplay();
  updateDownloadsDisplay();
});

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
                <img src="${project.imageUrl || 'https://via.placeholder.com/600x400/f5f5f5/333333?text=Project+Image'}" alt="${project.title}">
                <div class="overlay">
                    <h2>${project.title}</h2>
                    <p>${project.meta || ''}</p>
                    <div class="click-hint">Click for details</div>
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
