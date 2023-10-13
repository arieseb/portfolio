import { useEffect, useState } from "react";
import axios from "axios";

const UpdateForm = () => {
  const [articles, setArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState('newfile.md');
  const [downloadLink, setDownloadLink] = useState('#')

  useEffect(() => {
    axios.get('http://localhost:3355/data')
      .then(response => {
        setArticles(response.data);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des articles', error);
      });
  }, []);

  useEffect(() => {
    const articleFile = `/Articles/${selectedArticle}`;
    setDownloadLink(articleFile);
  }, [selectedArticle]);

  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedArticle(selectedValue);
  };

  return(
    <>
      <h2>Modifier un billet : </h2>
      <form method='GET' action="/update">
        <label htmlFor="update-select">Billet à modifier : </label>
        <select name="update-select" id="update-select" onChange={handleSelectChange}>
          {articles.map(item => {
            return(<option key={item.id} value={item.filename}>{item.title}</option>);
          })}
        </select>
        <a id='download-link' href={downloadLink} download>Télécharger l'article existant</a>
        <label htmlFor='new-file'>Fichier modifié : </label>
        <input type='file' name='new-file' id='new-file'></input>
        <button type="submit">Valider</button>
      </form>
    </>
  );
};

export default UpdateForm;