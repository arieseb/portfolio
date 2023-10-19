import { useEffect, useState } from "react";
import axios from "axios";


const DeleteForm = () => {
  const [articles, setArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState('newfile.md');
  const [selectedId, setSelectedId] = useState(1);
  const [filenameToIdMap, setFilenameToIdMap] = useState({});
  const [formData, setFormData] = useState({ file: null, });
  const [confirmation, setConfirmation] = useState('');

  const fetchData = async () => {
    try {
      const response = await axios.get('https://codeninja.fr/articles');
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
      const response = await axios.post('https://codeninja.fr/delete', data);
      setConfirmation('Le billet a bien été supprimé.')
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
    <div className='bg-stone-700 p-6 rounded-xl mt-2'>
      <h2 className='text-xl font-bold mb-2'>Supprimer un billet</h2>
      <form encType='multipart/form-data' onSubmit={handleSubmit} className='flex flex-col min-w-min lg:w-96 items-center'>
        <label htmlFor="delete-select" className='hidden'>Billet à supprimer</label>
        <select name="delete-select" id="delete-select" onChange={handleSelectChange} defaultValue='' className="select select-bordered w-full rounded-xl">
        <option value='' disabled>Billet à supprimer</option>  
          {articles.map(item => {
            return(<option key={item.id} value={item.filename}>{item.title}</option>);
          })}
        </select>
        <button type="submit" className="btn btn-neutral-focus mt-4 rounded-xl normal-case w-1/2">Supprimer !</button>
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

export default DeleteForm;