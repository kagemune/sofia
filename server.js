const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Crear pool de conexiones (mejor performance)
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'tu_base_de_datos',
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

app.listen(port, () => {
    console.log(`Servidor Express en http://localhost:${port}`);
});