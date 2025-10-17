const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const path = require('path');



const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Crear pool de conexiones (mejor performance)
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'dazz',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Ruta con async/await
app.get('/usuarios', async (req, res) => {
    try {
        const [rows] = await pool.execute('SELECT * FROM usuarios');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Insertar con async/await
app.post('/usuarios', async (req, res) => {
    try {
        const { nombre, email } = req.body;
        const [result] = await pool.execute(
            'INSERT INTO usuarios (nombre, email) VALUES (?, ?)',
            [nombre, email]
        );
        res.json({ 
            id: result.insertId, 
            nombre, 
            email 
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});
app.get('/dashboard', async (req, res) => {
    try {
    const [stats] = await pool.execute('SELECT COUNT(*) AS total_productos FROM insumos');
    const [price] = await pool.execute('SELECT SUM(precio) AS valor_inventario FROM insumos');
    const [category] = await pool.execute('SELECT categoria, COUNT(*) AS total_por_categoria FROM insumos GROUP BY categoria');

    
    res.json({
        total_productos: stats[0].total_productos,
        valor_inventario: price[0].valor_inventario,
        total_por_categoria: category
    });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
app.get('/productos', async (req, res) => {
    try {
        const [rows] = await pool.execute('SELECT * FROM insumos');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }       
});


app.listen(port, () => {
    console.log(`Servidor Express en http://localhost:${port}`);
});