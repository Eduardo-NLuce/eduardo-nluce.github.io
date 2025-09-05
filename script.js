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
        const fileName = this.getAttribute('data-file');
        alert(`Downloading ${fileName}...\n\nIn a real implementation, this would download your file.`);
        
        // Para descargas reales, necesitarías:
        // window.location.href = `downloads/${fileName}`;
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
