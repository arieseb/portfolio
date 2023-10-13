import React, { useState } from 'react';
import axios from 'axios';

const CreateForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    tag: '',
    file: null,
  });

  const handleInputChange = (event) => {
    const { name, value, type } = event.target;
    const newValue = type === 'file' ? event.target.files[0] : value;
    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData();
    data.append('title', formData.title);
    data.append('tag', formData.tag);
    data.append('file', formData.file);

    try {
      const response = await axios.post('http://localhost:3355/create', data);
      console.log('Réponse du serveur : ', response.data);
    } catch (error) {
      console.error('Erreur lors de la soumission du formulaire : ', error);
    }
  }

  return (
    <>
      <h2>Poster un nouveau billet :</h2>
      <form encType='multipart/form-data' onSubmit={handleSubmit}>
        <label htmlFor='title'>Titre : </label>
        <input type='text' name='title' id='title' onChange={handleInputChange} required></input>
        <label htmlFor='tag'>Tag : </label>
        <input type='text' name='tag' id='tag' onChange={handleInputChange} required></input>
        <label htmlFor='file'>Fichier Markdown : </label>
        <input type='file' name='file' id='file' onChange={handleInputChange} required></input>
        <button type="submit">Valider</button>
      </form>
    </>
  );
};

export default CreateForm;