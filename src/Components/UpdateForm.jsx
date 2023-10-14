import { useEffect, useState } from "react";
import axios from "axios";

const UpdateForm = () => {
  const [articles, setArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState('newfile.md');
  const [selectedId, setSelectedId] = useState(1);
  const [filenameToIdMap, setFilenameToIdMap] = useState({});
  const [downloadLink, setDownloadLink] = useState('#')
  const [formData, setFormData] = useState({
    title: '',
    tag: '',
    file: null,
  });

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3355/data');
      setArticles(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des articles', error);
    }
  };

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
    data.append('oldFileName', selectedArticle);
    data.append('idToUpdate', selectedId);
    data.append('title', formData.newTitle);
    data.append('tag', formData.newTag);
    data.append('file', formData.newFile);

    try {
      const response = await axios.post('http://localhost:3355/update', data);
      console.log('Réponse du serveur : ', response.data);
      fetchData();
    } catch (error) {
      console.error('Erreur lors de la soumission du formulaire : ', error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const articleFile = `/Articles/${selectedArticle}`;
    setDownloadLink(articleFile);
  }, [selectedArticle]);

  useEffect(() => {
    const map = {};
    articles.forEach(item => {
      map[item.filename] = item.id;
    });
    setFilenameToIdMap(map);
  }, [articles]);

  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedArticle(selectedValue);
    setSelectedId(filenameToIdMap[selectedValue]);
  };

  return(
    <>
      <h2>Modifier un billet : </h2>
      <form encType='multipart/form-data' onSubmit={handleSubmit}>
        <label htmlFor="update-select">Billet à modifier : </label>
        <select name="update-select" id="update-select" onChange={handleSelectChange}>
          {articles.map(item => {
            return(<option key={item.id} value={item.filename}>{item.title}</option>);
          })}
        </select>
        <label htmlFor='new-title'>Titre : </label>
        <input type='text' name='newTitle' id='newTitle' onChange={handleInputChange} required></input>
        <label htmlFor='new-tag'>Tag : </label>
        <input type='text' name='newTag' id='newTag' onChange={handleInputChange} required></input>
        <a id='download-link' href={downloadLink} download>Télécharger l'article existant</a>
        <label htmlFor='newFile'>Fichier modifié : </label>
        <input type='file' name='newFile' id='newFile' onChange={handleInputChange} required></input>
        <button type="submit">Valider</button>
      </form>
    </>
  );
};

export default UpdateForm;