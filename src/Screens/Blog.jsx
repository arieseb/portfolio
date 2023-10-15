import React, { useState, useEffect } from 'react';
import PageTitle from '../Components/PageTitle';
import MarkdownViewer from '../Components/MarkdownViewer';
import axios from 'axios';
import logos from '../Assets/logos/logos';


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
        <div className='flex flex-col items-center gap-2'>
          <p className='w-6/12 mb-2'>
              Ce blog a pour but de partager mes découvertes, mes réflexions et tous types 
              d'élucubrations plus ou moins pertinentes ayant de près ou de loin un rapport avec
              le monde du développement web. Vous y trouverez des snippets, des méthodes, parfois du
              contenu plus léger mais jamais de prosélytisme pour un framework ou un langage en 
              particulier.
          </p>

          {articles.map(item => {
            const date = new Date(item.date);
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            const hour = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');
            const formattedDate = `${day}/${month}/${year} à ${hour}:${minutes}`;

            return (
              <article key={item.id} className='card bg-neutral w-5/12 mb-2 rounded-xl'>
                <div className='card-body'>
                  <h2 className='card-title'>{item.title}</h2>
                  { !logos[item.tag] ?
                    <p className='badge badge-neutral-200 p-3 rounded-xl'>{item.tag}</p> :
                    <img src={logos[item.tag]} alt={item.tag} title={item.tag} width='25' className='max-w-[5%]'/>
                  }
                  <MarkdownViewer fileName={item.filename}/> 
                  <div className='flex flex-col items-end'>
                    <p className='text-sm text-stone-500'>{`Publié le ${formattedDate}`}</p>  
                  </div>
                </div>
              </article>
            );
          })}   
        </div>     
      </main>
    </>
  );
}

export default Blog;