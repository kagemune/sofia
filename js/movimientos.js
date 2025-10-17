// Gestión de movimientos de inventario
class MovimientosManager {
    constructor() {
        this.movimientos = [];
        this.materiales = [];
        this.init();
    }
    
    async init() {
        await this.loadMovimientos();
        await this.loadMateriales();
        this.setupEventListeners();
        this.renderMovimientos();
        this.populateMaterialSelect();
    }
    
    async loadMovimientos() {
        try {
            this.movimientos = await database.getMovimientos();
        } catch (error) {
            console.error('Error al cargar movimientos:', error);
        }
    }
    
    async loadMateriales() {
        try {
            this.materiales = await database.getMateriales();
        } catch (error) {
            console.error('Error al cargar materiales:', error);
        }
    }
    
    setupEventListeners() {
        // Configurar formulario de movimiento
        const movimientoForm = document.getElementById('movimientoForm');
        if (movimientoForm) {
            movimientoForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleMovimientoSubmit();
            });
        }
        
        // Configurar filtros
        const filterTipo = document.getElementById('filterTipo');
        if (filterTipo) {
            filterTipo.addEventListener('change', () => {
                this.filterMovimientos();
            });
        }
        
        const filterMaterial = document.getElementById('filterMaterial');
        if (filterMaterial) {
            filterMaterial.addEventListener('change', () => {
                this.filterMovimientos();
            });
        }
    }
    
    populateMaterialSelect() {
        const materialSelect = document.getElementById('materialSelect');
        const filterMaterial = document.getElementById('filterMaterial');
        
        if (materialSelect) {
            materialSelect.innerHTML = '<option value="">Seleccionar material</option>';
            this.materiales.forEach(material => {
                const option = document.createElement('option');
                option.value = material.id;
                option.textContent = material.nombre;
                materialSelect.appendChild(option);
            });
        }
        
        if (filterMaterial) {
            filterMaterial.innerHTML = '<option value="">Todos los materiales</option>';
            this.materiales.forEach(material => {
                const option = document.createElement('option');
                option.value = material.id;
                option.textContent = material.nombre;
                filterMaterial.appendChild(option);
            });
        }
    }
    
    async handleMovimientoSubmit() {
        const formData = new FormData(document.getElementById('movimientoForm'));
        const materialId = parseInt(formData.get('material_id'));
        const tipo = formData.get('tipo_movimiento');
        const cantidad = parseFloat(formData.get('cantidad'));
        const motivo = formData.get('motivo');
        
        // Obtener material
        const material = this.materiales.find(m => m.id === materialId);
        if (!material) {
            this.showMessage('Material no encontrado', 'error');
            return;
        }
        
        // Calcular nueva cantidad
        let cantidadNueva = material.cantidad;
        if (tipo === 'entrada') {
            cantidadNueva += cantidad;
        } else if (tipo === 'salida') {
            if (material.cantidad < cantidad) {
                this.showMessage('No hay suficiente stock para realizar esta salida', 'error');
                return;
            }
            cantidadNueva -= cantidad;
        } else if (tipo === 'ajuste') {
            cantidadNueva = cantidad;
        }
        
        // Crear movimiento
        const movimientoData = {
            material_id: materialId,
            tipo_movimiento: tipo,
            cantidad: cantidad,
            cantidad_anterior: material.cantidad,
            cantidad_nueva: cantidadNueva,
            motivo: motivo,
            usuario: window.app.currentUser.username
        };
        
        try {
            // Actualizar cantidad del material
            await database.updateMaterial(materialId, { cantidad: cantidadNueva });
            
            // Registrar movimiento
            await database.createMovimiento(movimientoData);
            
            this.showMessage('Movimiento registrado exitosamente', 'success');
            document.getElementById('movimientoForm').reset();
            
            // Recargar datos
            await this.loadMovimientos();
            await this.loadMateriales();
            this.renderMovimientos();
            
        } catch (error) {
            console.error('Error al registrar movimiento:', error);
            this.showMessage('Error al registrar movimiento', 'error');
        }
    }
    
    renderMovimientos() {
        const tbody = document.getElementById('movimientosTableBody');
        if (!tbody) return;
        
        tbody.innerHTML = '';
        
        this.movimientos.forEach(movimiento => {
            const material = this.materiales.find(m => m.id === movimiento.material_id);
            const tr = document.createElement('tr');
            
            tr.innerHTML = `
                <td>${new Date(movimiento.fecha_movimiento).toLocaleString()}</td>
                <td>${material ? material.nombre : 'Material no encontrado'}</td>
                <td>
                    <span class="badge ${this.getTipoBadgeClass(movimiento.tipo_movimiento)}">
                        ${this.getTipoText(movimiento.tipo_movimiento)}
                    </span>
                </td>
                <td>${movimiento.cantidad}</td>
                <td>${movimiento.cantidad_anterior}</td>
                <td>${movimiento.cantidad_nueva}</td>
                <td>${movimiento.motivo || '-'}</td>
                <td>${movimiento.usuario}</td>
            `;
            
            tbody.appendChild(tr);
        });
    }
    
    filterMovimientos() {
        const tipo = document.getElementById('filterTipo').value;
        const materialId = document.getElementById('filterMaterial').value;
        
        let filtered = this.movimientos;
        
        if (tipo) {
            filtered = filtered.filter(m => m.tipo_movimiento === tipo);
        }
        
        if (materialId) {
            filtered = filtered.filter(m => m.material_id === parseInt(materialId));
        }
        
        this.renderFilteredMovimientos(filtered);
    }
    
    renderFilteredMovimientos(movimientos) {
        const tbody = document.getElementById('movimientosTableBody');
        if (!tbody) return;
        
        tbody.innerHTML = '';
        
        movimientos.forEach(movimiento => {
            const material = this.materiales.find(m => m.id === movimiento.material_id);
            const tr = document.createElement('tr');
            
            tr.innerHTML = `
                <td>${new Date(movimiento.fecha_movimiento).toLocaleString()}</td>
                <td>${material ? material.nombre : 'Material no encontrado'}</td>
                <td>
                    <span class="badge ${this.getTipoBadgeClass(movimiento.tipo_movimiento)}">
                        ${this.getTipoText(movimiento.tipo_movimiento)}
                    </span>
                </td>
                <td>${movimiento.cantidad}</td>
                <td>${movimiento.cantidad_anterior}</td>
                <td>${movimiento.cantidad_nueva}</td>
                <td>${movimiento.motivo || '-'}</td>
                <td>${movimiento.usuario}</td>
            `;
            
            tbody.appendChild(tr);
        });
    }
    
    getTipoText(tipo) {
        const tipos = {
            'entrada': 'Entrada',
            'salida': 'Salida',
            'ajuste': 'Ajuste'
        };
        
        return tipos[tipo] || tipo;
    }
    
    getTipoBadgeClass(tipo) {
        const classes = {
            'entrada': 'badge-success',
            'salida': 'badge-danger',
            'ajuste': 'badge-warning'
        };
        
        return classes[tipo] || 'badge-secondary';
    }
    
    showMessage(message, type) {
        // Implementar mostrar mensajes
        console.log(`${type}: ${message}`);
    }
}