const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'game_db'
});

db.connect(err => {
    if (err) throw err;
    console.log('MySQL conectado...');
});

// Rota para obter todos os álbuns
app.get('/api/games', (req, res) => {
    const sql = 'SELECT * FROM games';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Rota para obter detalhes de um álbum específico
app.get('/api/game/:id', (req, res) => {
    const sql = 'SELECT * FROM games WHERE game_id = ?';
    db.query(sql, [req.params.id], (err, results) => {
        if (err) throw err;
        const game = results[0];

        const sqlPersonagens = 'SELECT * FROM personagens WHERE game_id = ?';
        db.query(sqlPersonagens, [req.params.id], (err, personagens) => {
            if (err) throw err;
            res.json({ ...game, personagens });
        });
    });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
