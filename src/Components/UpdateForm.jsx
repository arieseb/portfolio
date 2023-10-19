import { useEffect, useState } from "react";
import axios from "axios";

const UpdateForm = () => {
  const [articles, setArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState('newfile.md');
  const [selectedId, setSelectedId] = useState(1);
  const [filenameToIdMap, setFilenameToIdMap] = useState({});
  const [downloadLink, setDownloadLink] = useState('#')
  const [confirmation, setConfirmation] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    tag: '',
    file: null,
  });

  const fetchData = async () => {
    try {
      const response = await axios.get('https://codeninja.fr/articles');
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
      const response = await axios.post('https://codeninja.fr/update', data);
      setConfirmation('Le billet a bien été modifié.')
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
    <div className='bg-stone-700 p-6 rounded-xl mt-2'>
      <h2 className='text-xl font-bold mb-2'>Modifier un billet : </h2>
      <form encType='multipart/form-data' onSubmit={handleSubmit} className='flex flex-col min-w-min lg:w-96 items-center'>
        <label htmlFor="update-select" className='hidden'>Billet à modifier</label>
        <select name="update-select" id="update-select" onChange={handleSelectChange} defaultValue='' className="select select-bordered w-full rounded-xl">
          <option value='' disabled>Billet à modifier</option>
          {articles.map(item => {
            return(<option key={item.id} value={item.filename}>{item.title}</option>);
          })}
        </select>
        <label htmlFor='newTitle' className='hidden'>Titre</label>
        <input type='text' name='newTitle' id='newTitle' onChange={handleInputChange}  placeholder='Titre' required className="input input-bordered input-sm mt-2 rounded-xl w-full"></input>
        <label htmlFor='newTag' className='hidden'>Tag</label>
        <input type='text' name='newTag' id='newTag' onChange={handleInputChange}  placeholder='Tag' required className="input input-bordered input-sm mt-2 rounded-xl w-full"></input>
        <a id='download-link' href={downloadLink} download className="btn btn-neutral-focus my-4 rounded-xl normal-case w-2/3">Télécharger l'article existant</a>
        <label htmlFor='newFile' className='hidden'>Fichier modifié</label>
        <input type='file' name='newFile' id='newFile' onChange={handleInputChange} required className="file-input file-input-bordered mt-2 rounded-xl"></input>
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

export default UpdateForm;