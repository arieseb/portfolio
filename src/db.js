const express = require('express');
const formidable = require('formidable');
const fs = require('fs');
const mysql = require('mysql');
const app = express();
const port = 3355;

app.use(express.json());

// Informations de connexion à la base de données
const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'blog',
});

// Middleware pour activer CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Connexion à la base de données
db.connect((error) => {
  if (error) {
    console.error('Erreur de connexion à la base de données : ', error.message);
    return;
  }
  console.log('Connecté à la base de données');
});

// Endpoint GET pour récupérer des données
app.get('/data', (req, res) => {
  db.query('SELECT * FROM article', (error, results) => {
    if (error) {
      console.error('Erreur lors de la requête SELECT : ', error.message);
      res.status(500).json({ error: 'Erreur lors de la requête SELECT.' });
    } else {
      res.status(200).json(results);
    }
  });
});

// Endpoint POST pour créer un nouveau billet
app.post('/create', (req, res) => {
  const form = new formidable.IncomingForm({ uploadDir: '../public/Articles/', keepExtensions: true });
  let  fileName = '';

  form.on('file', (field, file) => {
    file.filepath = `${form.uploadDir}`;
    fileName = file.newFilename;
  });

  form.parse(req, (err, fields, files) => {
    if (err) {
      console.error('Erreur lors de l\'analyse du formulaire : ', err);
      res.status(500).json({ error: 'Erreur lors de l\'analyse du formulaire' });
      return;
    }
    console.log(fields);
    console.log(files);

    // Inscription en base de données
    const createQuery = 'INSERT INTO article (title, tag, filename, date) VALUES (?, ?, ?, ?)';
    db.query(createQuery, [fields.title, fields.tag, fileName, Date.now()], (error, results) => {
      if (error) {
        console.error('Erreur lors de la requête CREATE : ', error.message);
        res.status(500).json({ error: 'Erreur lors de la requête CREATE' });
      } else {
        res.status(200).json(results);
      }
    });

    // Copie du fichier .md
    const uploadPath = form.uploadDir + files.file.originalFilename;
    fs.copyFile(`${files.file.filepath}`, uploadPath, (error) => {
      if (error) {
        //console.error('Erreur lors de la copie du fichier : ', error);
      } else {
        console.log('Fichier copié avec succès');
      }
    });
  });
});

app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur le port ${port}`);
});
