// Configuración y operaciones con la base de datos
class Database {
    constructor() {
        // Configuración de conexión a la base de datos
        // En un entorno real, esto se conectaría a un backend
        // Por ahora simulamos una base de datos con localStorage
        this.dbName = 'inventario_db';
        this.init();
    }
    
    init() {
        // Inicializar la base de datos simulada
        if (!localStorage.getItem(this.dbName)) {
            this.resetDatabase();
        }
    }
    
    resetDatabase() {
        // Crear estructura inicial de la base de datos
        const db = {
            usuarios: [
                {
                    id: 1,
                    username: 'admin',
                    password: this.hashPassword('admin123'),
                    nombre: 'Administrador',
                    email: 'admin@inventario.com',
                    rol: 'admin',
                    activo: 1,
                    fecha_creacion: new Date().toISOString(),
                    ultimo_login: null
                }
            ],
            materiales: [],
            categorias: [
                { id: 1, nombre: 'Electrónicos', descripcion: 'Componentes y dispositivos electrónicos', activo: 1 },
                { id: 2, nombre: 'Herramientas', descripcion: 'Herramientas manuales y eléctricas', activo: 1 },
                { id: 3, nombre: 'Suministros', descripcion: 'Suministros de oficina y limpieza', activo: 1 }
            ],
            proveedores: [
                { id: 1, nombre: 'Proveedor A', contacto: 'Juan Pérez', telefono: '123456789', email: 'juan@proveedora.com', direccion: 'Calle 123', activo: 1, fecha_creacion: new Date().toISOString() },
                { id: 2, nombre: 'Proveedor B', contacto: 'María García', telefono: '987654321', email: 'maria@proveedorb.com', direccion: 'Avenida 456', activo: 1, fecha_creacion: new Date().toISOString() }
            ],
            movimientos_inventario: []
        };
        
        localStorage.setItem(this.dbName, JSON.stringify(db));
    }
    
    // Métodos para usuarios
    async getUserByUsername(username) {
        const db = this.getDatabase();
        return db.usuarios.find(user => user.username === username && user.activo === 1);
    }
    
    async createUser(userData) {
        const db = this.getDatabase();
        const newId = db.usuarios.length > 0 ? Math.max(...db.usuarios.map(u => u.id)) + 1 : 1;
        
        const newUser = {
            id: newId,
            username: userData.username,
            password: this.hashPassword(userData.password),
            nombre: userData.nombre,
            email: userData.email,
            rol: 'usuario',
            activo: 1,
            fecha_creacion: new Date().toISOString(),
            ultimo_login: null
        };
        
        db.usuarios.push(newUser);
        this.saveDatabase(db);
        
        return newUser;
    }
    
    async updateUserLogin(userId) {
        const db = this.getDatabase();
        const user = db.usuarios.find(u => u.id === userId);
        if (user) {
            user.ultimo_login = new Date().toISOString();
            this.saveDatabase(db);
        }
    }
    
    // Métodos para materiales
    async getMateriales() {
        const db = this.getDatabase();
        return db.materiales.filter(m => m.activo === 1);
    }
    
    async getMaterialById(id) {
        const db = this.getDatabase();
        return db.materiales.find(m => m.id === id && m.activo === 1);
    }
    
    async createMaterial(materialData) {
        const db = this.getDatabase();
        const newId = db.materiales.length > 0 ? Math.max(...db.materiales.map(m => m.id)) + 1 : 1;
        
        const newMaterial = {
            id: newId,
            nombre: materialData.nombre,
            categoria: materialData.categoria,
            cantidad: materialData.cantidad || 0,
            unidad: materialData.unidad,
            proveedor: materialData.proveedor,
            precio: materialData.precio || 0,
            stock_minimo: materialData.stock_minimo || 0,
            stock_maximo: materialData.stock_maximo || 0,
            ubicacion: materialData.ubicacion || '',
            codigo_barras: materialData.codigo_barras || '',
            fecha_creacion: new Date().toISOString(),
            fecha_actualizacion: new Date().toISOString(),
            activo: 1
        };
        
        db.materiales.push(newMaterial);
        this.saveDatabase(db);
        
        return newMaterial;
    }
    
    async updateMaterial(id, materialData) {
        const db = this.getDatabase();
        const materialIndex = db.materiales.findIndex(m => m.id === id);
        
        if (materialIndex !== -1) {
            db.materiales[materialIndex] = {
                ...db.materiales[materialIndex],
                ...materialData,
                fecha_actualizacion: new Date().toISOString()
            };
            
            this.saveDatabase(db);
            return db.materiales[materialIndex];
        }
        
        return null;
    }
    
    async deleteMaterial(id) {
        const db = this.getDatabase();
        const materialIndex = db.materiales.findIndex(m => m.id === id);
        
        if (materialIndex !== -1) {
            db.materiales[materialIndex].activo = 0;
            this.saveDatabase(db);
            return true;
        }
        
        return false;
    }
    
    // Métodos para movimientos
    async getMovimientos() {
        const db = this.getDatabase();
        return db.movimientos_inventario;
    }
    
    async createMovimiento(movimientoData) {
        const db = this.getDatabase();
        const newId = db.movimientos_inventario.length > 0 ? 
            Math.max(...db.movimientos_inventario.map(m => m.id)) + 1 : 1;
        
        const newMovimiento = {
            id: newId,
            material_id: movimientoData.material_id,
            tipo_movimiento: movimientoData.tipo_movimiento,
            cantidad: movimientoData.cantidad,
            cantidad_anterior: movimientoData.cantidad_anterior,
            cantidad_nueva: movimientoData.cantidad_nueva,
            motivo: movimientoData.motivo || '',
            usuario: movimientoData.usuario,
            fecha_movimiento: new Date().toISOString()
        };
        
        db.movimientos_inventario.push(newMovimiento);
        this.saveDatabase(db);
        
        return newMovimiento;
    }
    
    // Métodos para categorías
    async getCategorias() {
        const db = this.getDatabase();
        return db.categorias.filter(c => c.activo === 1);
    }
    
    // Métodos para proveedores
    async getProveedores() {
        const db = this.getDatabase();
        return db.proveedores.filter(p => p.activo === 1);
    }
    
    // Métodos auxiliares
    getDatabase() {
        return JSON.parse(localStorage.getItem(this.dbName) || '{}');
    }
    
    saveDatabase(db) {
        localStorage.setItem(this.dbName, JSON.stringify(db));
    }
    
    hashPassword(password) {
        // En un entorno real, esto debería usar un algoritmo seguro como bcrypt
        // Por ahora, usamos un hash simple para demostración
        let hash = 0;
        for (let i = 0; i < password.length; i++) {
            const char = password.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convertir a entero de 32 bits
        }
        return hash.toString();
    }
    
    // Método para simular conexión con servidor/API
    async executeQuery(query, params = []) {
        // En un entorno real, esto enviaría la consulta a un backend
        // Por ahora, simulamos una respuesta después de un delay
        return new Promise((resolve) => {
            setTimeout(() => {
                // Simular procesamiento de consulta
                console.log('Ejecutando consulta:', query, params);
                resolve({ success: true, data: [] });
            }, 100);
        });
    }
}

// Crear instancia global de la base de datos
window.database = new Database();