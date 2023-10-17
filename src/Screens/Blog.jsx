import React, { useState, useEffect, useCallback, useMemo } from 'react';
import PageTitle from '../Components/PageTitle';
import Pagination from '../Components/Pagination';
import Articles from '../Components/Articles';
import Footer from '../Components/Footer';
import axios from 'axios';
import logos from '../Assets/logos/logos';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilterCircleXmark } from '@fortawesome/free-solid-svg-icons';

function Blog() {
  const [articles, setArticles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [articlesPerPage] = useState(3);
  const [tags, setTags] = useState([]);
  const [filterTag, setFilterTag] = useState(null);

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
    fetchData();
  }, [fetchData]);

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
  }, [articlesPerPage, currentPage]);

  const filterData = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:3355/filter?tag=${filterTag}&page=${currentPage}&limit=${articlesPerPage}`);
      setArticles(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des articles filtrés', error);
    }
  }, [articlesPerPage, currentPage, filterTag]);

  useEffect(() => {
    if (filterTag !== null) {
      filterData()
    }
  }, [filterTag, filterData]);

  const unfilterData = () => {
    setFilterTag(null);
    fetchData();
  }

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
          <Articles articles={articles}/>         
          <aside className='bg-neutral-900 p-6 rounded-xl h-fit w-2/12'>
            <ul className='flex flex-col'>
              <li className='mb-2'>
                <button onClick={unfilterData}>
                  <FontAwesomeIcon icon={faFilterCircleXmark} size='lg' className='me-2'/>
                  <span className='min-w-fit'>
                    {`Tous les articles (${tags.length} articles)`}
                  </span>
                </button>
              </li>
              {Object.entries(tagCounts).map(([tag, count]) => (
                <li key={tag} className='mb-2'>
                  <button onClick={() => setFilterTag(tag)} className='flex'>
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
                  </button>     
                </li>
              ))}
            </ul>
          </aside>
        </div>
        <Pagination 
          currentPage={currentPage}
          articleLength={articles.length}
          onClickPrevious={() => setCurrentPage(currentPage - 1)}
          onClickNext={() => setCurrentPage(currentPage + 1)}
          articlesPerPage={articlesPerPage}
        />
      </main>
      <Footer />
    </>
  );
}

export default Blog;