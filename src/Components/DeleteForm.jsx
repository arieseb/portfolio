import { useEffect, useState } from "react";
import axios from "axios";


const DeleteForm = () => {
  const [articles, setArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState('newfile.md');
  const [selectedId, setSelectedId] = useState(1);
  const [filenameToIdMap, setFilenameToIdMap] = useState({});
  const [formData, setFormData] = useState({ file: null, });

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3355/data');
      setArticles(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des articles', error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData();
    data.append('oldFileName', selectedArticle);
    data.append('idToDelete', selectedId);

    try {
      const response = await axios.post('http://localhost:3355/delete', data);
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
    setFormData({...formData});
  };

  return (
    <>
      <h2>Supprimer un billet</h2>
      <form encType='multipart/form-data' onSubmit={handleSubmit}>
        <label htmlFor="delete-select">Billet à supprimer : </label>
        <select name="delete-select" id="delete-select" onChange={handleSelectChange}>
          {articles.map(item => {
            return(<option key={item.id} value={item.filename}>{item.title}</option>);
          })}
        </select>
        <button type="submit">Supprimer !</button>
      </form>
    </>
  );
};

export default DeleteForm;