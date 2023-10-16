import React, { useState, useEffect, useCallback, useMemo } from 'react';
import PageTitle from '../Components/PageTitle';
import MarkdownViewer from '../Components/MarkdownViewer';
import axios from 'axios';
import logos from '../Assets/logos/logos';

function Blog() {
  const [articles, setArticles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [articlesPerPage] = useState(3);
  const [tags, setTags] = useState([]);

  const tagCounts = useMemo(() => {
    const counts = {};
    tags.forEach(item => {
      const tag = item.tag;
      counts[tag] = (counts[tag] || 0) + 1;
    });
    return counts;
  }, [tags]);

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:3355/data?page=${currentPage}&limit=${articlesPerPage}`);
      setArticles(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des articles', error);
    }
  }, [articlesPerPage, currentPage]);

  useEffect(() => {
    async function fetchTags(){
      try {
        const tagResponse = await axios.get('http://localhost:3355/tags');
        setTags(tagResponse.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des atags', error);
      }
    }
    fetchTags();
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      <main>
        <PageTitle title="Bienvenue sur mon blog"/>
        <div className='flex justify-center mb-4'>
          <p className='w-6/12'>
            Ce blog a pour but de partager mes découvertes, mes réflexions et tous types 
            d'élucubrations plus ou moins pertinentes ayant de près ou de loin un rapport avec
            le monde du développement web. Vous y trouverez des snippets, des méthodes, parfois du
            contenu plus léger mais jamais de prosélytisme pour un framework ou un langage en 
            particulier.
          </p>
        </div>
        <div className='flex justify-center gap-8'>
          <section className='flex flex-col items-center gap-2 w-6/12'>
            {articles.map(item => {
              const date = new Date(item.date);
              const year = date.getFullYear();
              const month = String(date.getMonth() + 1).padStart(2, '0');
              const day = String(date.getDate()).padStart(2, '0');
              const hour = String(date.getHours()).padStart(2, '0');
              const minutes = String(date.getMinutes()).padStart(2, '0');
              const formattedDate = `${day}/${month}/${year} à ${hour}:${minutes}`;

              return (
                <article key={item.id} className='card bg-neutral mb-2 rounded-xl w-full'>
                  <div className='card-body'>
                    <div className='flex justify-between'>
                      <h2 className='card-title'>{item.title}</h2>
                      { !logos[item.tag] ?
                        <p className='badge badge-neutral-200 p-3 rounded-xl'>{item.tag}</p> :
                        <img 
                          src={logos[item.tag]} 
                          alt={item.tag} 
                          title={item.tag} 
                          width='28'
                          height='28' 
                          className='w-7 h-7'
                        />
                      }
                    </div>
                    <MarkdownViewer fileName={item.filename}/> 
                    <div className='flex flex-col items-end'>
                      <p className='text-sm text-stone-500'>{`Publié le ${formattedDate}`}</p>  
                    </div>
                  </div>
                </article>
              );
            })}   
          </section>
          <aside className='bg-neutral-900 p-6 rounded-xl h-fit w-2/12'>
            <ul className='flex flex-col'>
              {Object.entries(tagCounts).map(([tag, count]) => (
                <li key={tag} className='mb-2'>
                  <a href='/' className='flex'>
                    {logos[tag] && (
                      <img
                        src={logos[tag]}
                        alt={tag}
                        title={tag}
                        width='25'
                        className='me-2 max-h-6'
                      />
                    )}
                    {count === 1 ? 
                    <span className='min-w-fit'>{`${tag} (${count} article)`}</span> :
                    <span className='min-w-fit'>{`${tag} (${count} articles)`}</span>
                    }  
                  </a>     
                </li>
              ))}
            </ul>
          </aside>
        </div>
        <nav aria-label='Pagination' className='flex justify-center items-center mb-4'>
          <button
            onClick={() => setCurrentPage(currentPage - 1)} 
            disabled={currentPage === 1} 
            className="btn btn-neutral mt-4 me-6 rounded-xl normal-case w-48"
            aria-label="Page précédente"
          >
            Page précédente
          </button>
          <span className='mt-3 font-semibold'>Page {currentPage}</span>
          <button 
            onClick={() => setCurrentPage(currentPage + 1)} 
            disabled={articles.length < articlesPerPage} 
            className="btn btn-neutral mt-4 ms-6 rounded-xl normal-case w-48"
            aria-label="Page suivante"
          >
            Page suivante
          </button>
        </nav>     
      </main>
    </>
  );
}

export default Blog;