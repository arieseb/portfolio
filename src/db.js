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

// Endpoint GET pour récupérer les articles avec pagination
app.get('/data', (req, res) => {
  const page = req.query.page || 1;
  const limit = parseInt(req.query.limit) ||3;
  const offset = (page - 1) * limit;
  const query = 'SELECT * FROM article LIMIT ? OFFSET ?';
  db.query(query, [limit, offset], (error, results) => {
    if (error) {
      console.error('Erreur lors de la requête SELECT : ', error.message);
      res.status(500).json({ error: 'Erreur lors de la requête SELECT.' });
    } else {
      res.status(200).json(results);
    }
  });
});

// Endpoint GET pour récupérer les tags
app.get('/tags', (req, res) => {
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
  const date = new Date(Date.now());
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hour = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  const formattedDate = `${year}-${month}-${day} ${hour}:${minutes}:${seconds}`;
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

    // Inscription en base de données
    const createQuery = 'INSERT INTO article (title, tag, filename, date) VALUES (?, ?, ?, ?)';
    db.query(createQuery, [fields.title, fields.tag, fileName, formattedDate], (error, results) => {
      if (error) {
        console.error('Erreur lors de la requête CREATE : ', error.message);
        res.status(500).json({ error: 'Erreur lors de la requête CREATE' });
      } else {
        res.status(200).json(results);
      }
    });

    // Copie du fichier .md
    const uploadPath = form.uploadDir + '//' + files.file.originalFilename;
    fs.copyFile(`${files.file.filepath}`, uploadPath, (error) => {      
      if (error) {
      //console.error('Erreur lors de la copie du fichier : ', error);
      } else {
        console.log('Fichier copié avec succès');
    }});
  });
});

//Endpoint POST pour modifier un billet
app.post('/update', (req, res) => {
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

    // Inscription en base de données
    const createQuery = 'UPDATE article SET title = ?, tag = ?, filename = ? WHERE id = ?';
    db.query(createQuery, [fields.title, fields.tag, fileName, fields.idToUpdate], (error, results) => {
      if (error) {
        console.error('Erreur lors de la requête UPDATE : ', error.message);
        res.status(500).json({ error: 'Erreur lors de la requête UPDATE' });
      } else {
        res.status(200).json(results);
      }
    });

    // Copie du fichier .md
    const uploadPath = form.uploadDir + files.file.originalFilename;
    fs.copyFile(`${files.file.filepath}`, uploadPath, (error) => {      if (error) {
      //console.error('Erreur lors de la copie du fichier : ', error);
    } else {
      console.log('Fichier copié avec succès');
    }});

    // Suppression de l'ancien fichier
    const fileToDeletePath = form.uploadDir + '/' + fields.oldFileName;
    fs.unlink(fileToDeletePath, (error) => {
      if (error) {
        console.error('Erreur lors de la suppression du fichier : ', error);
      } else {
        console.log('Fichier supprimé avec succès');
      }
    });
  });
});

//Endpoint POST pour supprimer un billet
app.post('/delete', (req, res) => {
  const form = new formidable.IncomingForm({ uploadDir: '../public/Articles/', keepExtensions: true });

  form.parse(req, (err, fields, files) => {
    if (err) {
      console.error('Erreur lors de l\'analyse du formulaire : ', err);
      res.status(500).json({ error: 'Erreur lors de l\'analyse du formulaire' });
      return;
    }

    // Inscription en base de données
    const createQuery = 'DELETE FROM article WHERE id = ?';
    db.query(createQuery, [fields.idToDelete], (error, results) => {
      if (error) {
        console.error('Erreur lors de la requête UPDATE : ', error.message);
        res.status(500).json({ error: 'Erreur lors de la requête UPDATE' });
      } else {
        res.status(200).json(results);
      }
    });

    // Suppression de l'ancien fichier
    const fileToDeletePath = form.uploadDir + '/' + fields.oldFileName;
    fs.unlink(fileToDeletePath, (error) => {
      if (error) {
        console.error('Erreur lors de la suppression du fichier : ', error);
      } else {
        console.log('Fichier supprimé avec succès');
      }
    });
  });
});

app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur le port ${port}`);
});
