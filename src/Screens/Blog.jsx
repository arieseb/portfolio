import React, { useState, useEffect } from 'react';
import PageTitle from '../Components/PageTitle';
import MarkdownViewer from '../Components/MarkdownViewer';
import axios from 'axios';


function Blog() {
  const [articles, setArticles] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3355/data');
      setArticles(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des articles', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <main>
        <PageTitle title="Bienvenue sur mon blog"/>
        {articles.map(item => {
          return (
            <article key={item.id}>
              <h3>{item.title}</h3>
              <p>{item.tag}</p>
              <MarkdownViewer fileName={item.filename} /> 
              <p>{item.date}</p>
            </article>
          );
        })}        
      </main>
    </>
  );
}

export default Blog;