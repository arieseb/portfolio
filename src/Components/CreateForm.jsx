import React, { useState } from 'react';
import axios from 'axios';

const CreateForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    tag: '',
    file: null,
  });
  const [confirmation, setConfirmation] = useState('');

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
      setConfirmation('Le billet a bien été créé.')
      console.log('Réponse du serveur : ', response.data);
    } catch (error) {
      console.error('Erreur lors de la soumission du formulaire : ', error);
    }
  }

  return (
    <div className='bg-stone-700 p-6 rounded-xl'>
      <h2 className='text-xl font-bold mb-2'>Poster un nouveau billet :</h2>
      <form encType='multipart/form-data' onSubmit={handleSubmit} className='flex flex-col min-w-min lg:w-96 items-center'>
        <label htmlFor='title' className='hidden'>Titre</label>
        <input type='text' name='title' id='title' onChange={handleInputChange} placeholder='Titre' required className="input input-bordered input-sm mt-2 rounded-xl w-full"></input>
        <label htmlFor='tag' className='hidden'>Tag</label>
        <input type='text' name='tag' id='tag' onChange={handleInputChange} placeholder='Tag' required className="input input-bordered input-sm mt-2 rounded-xl w-full"></input>
        <label htmlFor='file' className='hidden'>Fichier Markdown</label>
        <input type='file' name='file' id='file' onChange={handleInputChange} required className="file-input file-input-bordered mt-2 rounded-xl"></input>
        <button type="submit" className="btn btn-neutral-focus mt-4 rounded-xl normal-case w-1/2">Valider</button>
      </form>
        { confirmation ?
          <div className='bg-green-400 rounded-xl p-2 mt-2 flex justify-center'>
            <p className=' text-green-800 font-semibold'>{confirmation}</p>
          </div> :
          null
        }
    </div>
  );
};

export default CreateForm;