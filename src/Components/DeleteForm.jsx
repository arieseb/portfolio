import { useEffect, useState } from "react";
import axios from "axios";


const DeleteForm = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3355/data')
      .then(response => {
        setArticles(response.data);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des articles', error);
      });
  }, []);

  return (
    <>
      <h2>Supprimer un billet</h2>
      <form method="GET" action="/delete">
        <label htmlFor="delete-select">Billet à supprimer : </label>
        <select name="delete-select" id="delete-select">
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