// Configuración principal de la aplicación
class App {
    constructor() {
        this.currentUser = null;
        this.init();
    }
    
    init() {
        // Verificar si el usuario está autenticado
        this.checkAuthStatus();
        
        // Inicializar componentes según la página
        this.initPageSpecificFunctions();
    }
    
    checkAuthStatus() {
        const user = localStorage.getItem('currentUser');
        if (user) {
            this.currentUser = JSON.parse(user);
            
            // Si estamos en páginas de login/register y el usuario está autenticado, redirigir al dashboard
            if (window.location.pathname.includes('login.html') || 
                window.location.pathname.includes('register.html')) {
                window.location.href = 'dashboard.html';
            }
        } else {
            // Si estamos en páginas que requieren autenticación y no hay usuario, redirigir al login
            if (window.location.pathname.includes('dashboard.html') || 
                window.location.pathname.includes('gestion-materiales.html') ||
                window.location.pathname.includes('movimientos.html')) {
                window.location.href = 'login.html';
            }
        }
    }
    
    initPageSpecificFunctions() {
        const page = window.location.pathname.split('/').pop();
        
        switch(page) {
            case 'dashboard.html':
                this.initDashboard();
                break;
            case 'gestion-materiales.html':
                this.initMateriales();
                break;
            case 'movimientos.html':
                this.initMovimientos();
                break;
        }
    }
    
    initDashboard() {
        // Cargar estadísticas del dashboard
        this.loadDashboardStats();
        
        // Configurar navegación
        this.setupNavigation();
    }
    
    initMateriales() {
        // Inicializar gestión de materiales
        if (typeof MaterialesManager !== 'undefined') {
            this.materialesManager = new MaterialesManager();
        }
        
        this.setupNavigation();
    }
    
    initMovimientos() {
        // Inicializar gestión de movimientos
        if (typeof MovimientosManager !== 'undefined') {
            this.movimientosManager = new MovimientosManager();
        }
        
        this.setupNavigation();
    }
    
    setupNavigation() {
        // Configurar menú de navegación
        const navLinks = document.querySelectorAll('nav a');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                if (link.getAttribute('href') === '#logout') {
                    e.preventDefault();
                    this.logout();
                }
            });
        });
        
        // Mostrar información del usuario si está disponible
        if (this.currentUser && document.getElementById('userInfo')) {
            document.getElementById('userInfo').textContent = 
                `Bienvenido, ${this.currentUser.nombre || this.currentUser.username}`;
        }
    }
    
    loadDashboardStats() {
        // Cargar estadísticas del dashboard desde la base de datos
        // Esta función se implementará en database.js
        console.log('Cargando estadísticas del dashboard...');
    }
    
    logout() {
        localStorage.removeItem('currentUser');
        window.location.href = 'login.html';
    }
}

// Inicializar la aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    window.app = new App();
});