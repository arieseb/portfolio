import MarkdownViewer from "./MarkdownViewer";
import logos from '../Assets/logos/logos';

const Articles = ({ articles }) => {
  return(
    <section className='flex flex-col items-center gap-2 lg:w-6/12 m-2 '>            
      {articles.map(item => {
        const date = new Date(item.date);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hour = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const formattedDate = `${day}/${month}/${year} à ${hour}:${minutes}`;

        return (
          <article key={item.id} className='card bg-neutral mb-2 rounded-xl w-full text-sm lg:text-base'>
            <div className='card-body'>
              <div className='flex justify-between'>
                <h2 className='card-title text-base lg:text-lg'>{item.title}</h2>
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
              <MarkdownViewer fileName={item.filename} /> 
              <div className='flex flex-col items-end'>
                <p className='text-sm text-stone-500'>{`Publié le ${formattedDate}`}</p>  
              </div>
            </div>
          </article>
        );
      })}   
    </section>
  );
};

export default Articles;