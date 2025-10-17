// Manejo de autenticación de usuarios
class AuthManager {
    constructor() {
        this.init();
    }
    
    init() {
        // Configurar formularios de login y registro
        this.setupLoginForm();
        this.setupRegisterForm();
    }
    
    setupLoginForm() {
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleLogin();
            });
        }
    }
    
    setupRegisterForm() {
        const registerForm = document.getElementById('registerForm');
        if (registerForm) {
            registerForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleRegister();
            });
        }
    }
    
    async handleLogin() {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        try {
            const user = await database.getUserByUsername(username);
            
            if (user && user.password === database.hashPassword(password)) {
                // Actualizar último login
                await database.updateUserLogin(user.id);
                
                // Guardar usuario en localStorage
                const { password, ...userWithoutPassword } = user;
                localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
                
                // Redirigir al dashboard
                window.location.href = 'dashboard.html';
            } else {
                this.showMessage('Usuario o contraseña incorrectos', 'error');
            }
        } catch (error) {
            console.error('Error durante el login:', error);
            this.showMessage('Error al iniciar sesión', 'error');
        }
    }
    
    async handleRegister() {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const nombre = document.getElementById('nombre').value;
        const email = document.getElementById('email').value;
        
        // Validaciones
        if (password !== confirmPassword) {
            this.showMessage('Las contraseñas no coinciden', 'error');
            return;
        }
        
        if (password.length < 6) {
            this.showMessage('La contraseña debe tener al menos 6 caracteres', 'error');
            return;
        }
        
        try {
            // Verificar si el usuario ya existe
            const existingUser = await database.getUserByUsername(username);
            if (existingUser) {
                this.showMessage('El nombre de usuario ya está en uso', 'error');
                return;
            }
            
            // Crear nuevo usuario
            const newUser = await database.createUser({
                username,
                password,
                nombre,
                email
            });
            
            this.showMessage('Usuario registrado exitosamente. Ahora puedes iniciar sesión.', 'success');
            
            // Redirigir al login después de 2 segundos
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 2000);
            
        } catch (error) {
            console.error('Error durante el registro:', error);
            this.showMessage('Error al registrar usuario', 'error');
        }
    }
    
    showMessage(message, type) {
        // Crear elemento de mensaje
        const messageEl = document.createElement('div');
        messageEl.className = `alert alert-${type === 'error' ? 'error' : 'success'}`;
        messageEl.textContent = message;
        
        // Insertar antes del formulario
        const form = document.querySelector('form');
        form.parentNode.insertBefore(messageEl, form);
        
        // Eliminar mensaje después de 5 segundos
        setTimeout(() => {
            messageEl.remove();
        }, 5000);
    }
}

// Inicializar el administrador de autenticación
document.addEventListener('DOMContentLoaded', () => {
    new AuthManager();
});