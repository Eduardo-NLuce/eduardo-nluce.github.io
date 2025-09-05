// Navegación entre secciones
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Remover clase active de todos los links y secciones
        document.querySelectorAll('.nav-link').forEach(el => el.classList.remove('active'));
        document.querySelectorAll('section').forEach(el => el.classList.remove('active'));
        
        // Agregar clase active al link clickeado
        this.classList.add('active');
        
        // Mostrar la sección correspondiente
        const sectionId = this.getAttribute('data-section');
        document.getElementById(sectionId).classList.add('active');
        
        // Scroll to top
        window.scrollTo(0, 0);
    });
});

// Manejo del formulario de contacto
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validación básica
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        if (!name || !email || !message) {
            alert('Please fill all fields');
            return;
        }
        
        // Simular envío (en producción conectarías con un servicio)
        alert('Thank you for your message. I will get back to you soon.');
        this.reset();
    });
}

// Manejo de descargas
document.querySelectorAll('.download-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        alert('Download would start in a real implementation.');
    });
});

// Cargar imágenes placeholder si no hay imágenes propias
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.onerror = function() {
            this.src = 'https://images.unsplash.com/photo-1513584684374-8bab748fbf90?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80';
            this.alt = 'Project image placeholder';
        };
    });
});

// Sistema de proyectos clickeables
document.addEventListener('DOMContentLoaded', function() {
    // Crear overlay de fondo
    const overlay = document.createElement('div');
    overlay.className = 'project-overlay';
    document.body.appendChild(overlay);
    
    // Función para abrir proyecto
    function openProject(projectId) {
        const projectDetail = document.getElementById(`project-${projectId}`);
        if (projectDetail) {
            projectDetail.style.display = 'block';
            overlay.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Prevenir scroll
        }
    }
    
    // Función para cerrar proyecto
    function closeProject() {
        const openProject = document.querySelector('.project-detail[style="display: block;"]');
        if (openProject) {
            openProject.style.display = 'none';
        }
        overlay.style.display = 'none';
        document.body.style.overflow = ''; // Permitir scroll again
    }
    
    // Event listeners para abrir
    document.querySelectorAll('.clickable-project').forEach(item => {
        item.addEventListener('click', function(e) {
            if (!e.target.closest('.close-project')) {
                const projectId = this.getAttribute('data-project');
                openProject(projectId);
            }
        });
    });
    
    // Event listeners para cerrar
    document.querySelectorAll('.close-project').forEach(button => {
        button.addEventListener('click', closeProject);
    });
    
    // Cerrar al hacer clic en el overlay
    overlay.addEventListener('click', closeProject);
    
    // Cerrar con tecla ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeProject();
        }
    });
});
