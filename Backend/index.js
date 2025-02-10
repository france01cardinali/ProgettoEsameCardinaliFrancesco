require('dotenv').config();
const express = require('express');
const mysql = require("mysql2");
const cors = require('cors')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = express()
const port = 3000

app.use(cors());
app.use(express.json());

//app.use(express.static('public'))
// Crea la connessione al database
const connessione = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'magazzino',
});

// Connessione al database
connessione.connect((err) => {
  if (err) {
    console.error('Errore nel tentativo di connessione:', err);
    res.status(500).json({ error: "Errore di connessione al database" });
    return;
  }
  console.log('Connessione stabilita correttamente.');
})

//visualizza i movimenti 
app.get('/api/visualizzazionemovimeti',authenticateToken, (req, res) => {
  connessione.query('SELECT * FROM movimenti' ,(err, results) => {
    if (err) {
      console.error('Errore nella query:', err);
      res.status(500).json({ error: "Errore nell'esecuzione della query" });
    } else {
      console.log('Dati ricevuti:', results);
      res.json(results);
    }

  });
});

//creazione movimenti
app.post('/api/creazionemovimenti',authenticateToken,(req, res) => {
  const {idprodotto,  quantita, idutente} = req.body;
  connessione.query('INSERT INTO movimenti (prodotto_id, quantita, utente_id) VALUES (?, ?, ?)', [idprodotto,  quantita, idutente], (err, results) => {
    if (err) {
      console.error('Errore nella query:', err);
      res.status(500).json({ error: "Errore nell'esecuzione della query" });
    } else {
      console.log('Dati ricevuti:', results);
      res.json({ message: 'Creazione avvenuta con successo' });
    }
  });




});





//visualizzazione prodotti
app.get('/api/visualizzazione',authenticateToken ,(req, res) => {
  connessione.query('SELECT * FROM prodotti' ,(err, results) => {
    if (err) {
      console.error('Errore nella query:', err);
      res.status(500).json({ error: "Errore nell'esecuzione della query" });
    } else {
      console.log('Dati ricevuti:', results);
      res.json(results);
    }
  });




});




//creazione prodotto
app.post('/api/creazione',authenticateToken,(req, res) => {
  const {nome,  codice, quantita} = req.body;
  connessione.query('INSERT INTO prodotti (nome, codice, quantita) VALUES (?, ?, ?)', [nome,  codice, quantita], (err, results) => {
    if (err) {
      console.error('Errore nella query:', err);
      res.status(500).json({ error: "Errore nell'esecuzione della query" });
    } else {
      console.log('Dati ricevuti:', results);
      res.json({ message: 'Creazione avvenuta con successo' });
    }
  });




});

//eliminazione prodotto
app.post('/api/eliminazione',authenticateToken,(req, res) => {
  const {id} = req.body;
  connessione.query('DELETE FROM prodotti WHERE id = ? ', [id], (err, results) => {
    if (err) {
      console.error('Errore nella query:', err);
      res.status(500).json({ error: "Errore nell'esecuzione della query" });
    } else {
      console.log('Dati ricevuti:', results);
      res.json({ message: 'Registrazione avvenuta con successo' });
    }
  });




});

//carico prodotto
app.post('/api/carico',authenticateToken,(req, res) => {
  const {id,  quantita} = req.body;
  console.log(id, quantita);
  connessione.query('UPDATE prodotti SET quantita = quantita + ? WHERE id = ?', [quantita,  id], (err, results) => {
    if (err) {
      console.error('Errore nella query:', err);
      res.status(500).json({ error: "Errore nell'esecuzione della query" });
    } else {
      console.log('Dati ricevuti:', results);
      res.json({ message: 'Carico avvenuto con successo' });
    }
  });




});


//scarico prodotto
app.post('/api/scarico',authenticateToken,(req, res) => {
  const {id,  quantita} = req.body;
  console.log(id, quantita);
  connessione.query('UPDATE prodotti SET quantita = quantita - ? WHERE id = ?', [quantita,  id], (err, results) => {
    if (err) {
      console.error('Errore nella query:', err);
      res.status(500).json({ error: "Errore nell'esecuzione della query" });
    } else {
      console.log('Dati ricevuti:', results);
      res.json({ message: 'Scarico avvenuto con successo' });
    }
  });




});





//registrazione utente
app.post('/api/registrazione', async (req, res) => {
  const { nome, cognome, email, password} = req.body;

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  // Esegui la query
  connessione.query('INSERT INTO utenti ( Nome, Cognome, Email, Password) VALUES (?, ?, ?, ?)', [  nome, cognome, email, hashedPassword], (err, results) => {
    if (err) {
      console.error('Errore nella query:', err);
      res.status(500).json({ error: "Errore nell'esecuzione della query" });
    } else {
      console.log('Dati ricevuti:', results);
      res.json({ message: 'Registrazione avvenuta con successo' });
    }
  });


})


//login utente
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  connessione.query('SELECT * FROM utenti WHERE email = ?', [email], (err, results) => {
    if (err) {
      console.error('Errore nella query:', err);
      return res.status(500).json({ error: "Errore nell'esecuzione della query" });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: 'Credenziali non valide' });
    }
    
    const user = results[0];
    // Verifica la password usando bcrypt
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        
        return res.status(500).json({ message: 'Errore nella verifica della password' });
      }

      if (!isMatch) {
        return res.status(401).json({ message: 'Credenziali non valide' });
      }

      // Genera un token JWT per l'utente
      const token = jwt.sign({ id: user.id, email: user.email }, 'secret_key', { expiresIn: '1h' });

      return res.status(200).json({ message: 'Login riuscito', token });
    });
  });
});

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return res.sendStatus(401)
    
  jwt.verify(token,'secret_key', (err, user) => {
    if (err) return res.sendStatus(403)
    req.user = user
    next()
  })
}





app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
}) 
