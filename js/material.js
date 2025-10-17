// Gestión de materiales
class MaterialesManager {
    constructor() {
        this.materiales = [];
        this.init();
    }
    
    async init() {
        await this.loadMateriales();
        this.setupEventListeners();
        this.renderMateriales();
    }
    
    async loadMateriales() {
        try {
            this.materiales = await database.getMateriales();
        } catch (error) {
            console.error('Error al cargar materiales:', error);
        }
    }
    
    setupEventListeners() {
        // Configurar formulario de nuevo material
        const materialForm = document.getElementById('materialForm');
        if (materialForm) {
            materialForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleMaterialSubmit();
            });
        }
        
        // Configurar búsqueda
        const searchInput = document.getElementById('searchMaterial');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.filterMateriales(e.target.value);
            });
        }
    }
    
    async handleMaterialSubmit() {
        const formData = new FormData(document.getElementById('materialForm'));
        const materialData = {
            nombre: formData.get('nombre'),
            categoria: formData.get('categoria'),
            cantidad: parseFloat(formData.get('cantidad')) || 0,
            unidad: formData.get('unidad'),
            proveedor: formData.get('proveedor'),
            precio: parseFloat(formData.get('precio')) || 0,
            stock_minimo: parseFloat(formData.get('stock_minimo')) || 0,
            stock_maximo: parseFloat(formData.get('stock_maximo')) || 0,
            ubicacion: formData.get('ubicacion'),
            codigo_barras: formData.get('codigo_barras')
        };
        
        try {
            await database.createMaterial(materialData);
            this.showMessage('Material creado exitosamente', 'success');
            document.getElementById('materialForm').reset();
            await this.loadMateriales();
            this.renderMateriales();
        } catch (error) {
            console.error('Error al crear material:', error);
            this.showMessage('Error al crear material', 'error');
        }
    }
    
    renderMateriales() {
        const tbody = document.getElementById('materialesTableBody');
        if (!tbody) return;
        
        tbody.innerHTML = '';
        
        this.materiales.forEach(material => {
            const tr = document.createElement('tr');
            
            // Determinar clase según nivel de stock
            if (material.cantidad <= material.stock_minimo) {
                tr.className = 'low-stock';
            } else if (material.cantidad >= material.stock_maximo && material.stock_maximo > 0) {
                tr.className = 'high-stock';
            }
            
            tr.innerHTML = `
                <td>${material.nombre}</td>
                <td>${material.categoria}</td>
                <td>${material.cantidad} ${material.unidad}</td>
                <td>${material.proveedor}</td>
                <td>$${material.precio.toFixed(2)}</td>
                <td>${material.ubicacion || '-'}</td>
                <td>
                    <button class="btn btn-small" onclick="materialesManager.editMaterial(${material.id})">Editar</button>
                    <button class="btn btn-small btn-danger" onclick="materialesManager.deleteMaterial(${material.id})">Eliminar</button>
                </td>
            `;
            
            tbody.appendChild(tr);
        });
    }
    
    filterMateriales(searchTerm) {
        const filtered = this.materiales.filter(material => 
            material.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
            material.categoria.toLowerCase().includes(searchTerm.toLowerCase()) ||
            material.proveedor.toLowerCase().includes(searchTerm.toLowerCase())
        );
        
        this.renderFilteredMateriales(filtered);
    }
    
    renderFilteredMateriales(materiales) {
        const tbody = document.getElementById('materialesTableBody');
        if (!tbody) return;
        
        tbody.innerHTML = '';
        
        materiales.forEach(material => {
            const tr = document.createElement('tr');
            
            if (material.cantidad <= material.stock_minimo) {
                tr.className = 'low-stock';
            } else if (material.cantidad >= material.stock_maximo && material.stock_maximo > 0) {
                tr.className = 'high-stock';
            }
            
            tr.innerHTML = `
                <td>${material.nombre}</td>
                <td>${material.categoria}</td>
                <td>${material.cantidad} ${material.unidad}</td>
                <td>${material.proveedor}</td>
                <td>$${material.precio.toFixed(2)}</td>
                <td>${material.ubicacion || '-'}</td>
                <td>
                    <button class="btn btn-small" onclick="materialesManager.editMaterial(${material.id})">Editar</button>
                    <button class="btn btn-small btn-danger" onclick="materialesManager.deleteMaterial(${material.id})">Eliminar</button>
                </td>
            `;
            
            tbody.appendChild(tr);
        });
    }
    
    async editMaterial(id) {
        // Implementar edición de material
        console.log('Editando material con ID:', id);
    }
    
    async deleteMaterial(id) {
        if (confirm('¿Estás seguro de que quieres eliminar este material?')) {
            try {
                await database.deleteMaterial(id);
                this.showMessage('Material eliminado exitosamente', 'success');
                await this.loadMateriales();
                this.renderMateriales();
            } catch (error) {
                console.error('Error al eliminar material:', error);
                this.showMessage('Error al eliminar material', 'error');
            }
        }
    }
    
    showMessage(message, type) {
        // Implementar mostrar mensajes (similar a AuthManager)
        console.log(`${type}: ${message}`);
    }
}