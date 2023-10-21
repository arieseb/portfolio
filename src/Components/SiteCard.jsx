import images from '../Assets/images';
import logos from '../Assets/logos/logos';

const SiteCard = ({ siteTitle, imageName, description, siteLink, shownLink, stack }) => {
  const imagePath = images[imageName];

  return(
    <div className='hero-content columns-2 flex-col xl:flex-row'>
      <figure className='px-6 xl:px-0'>
        <a href={siteLink}>
          <img src={imagePath} alt={siteTitle} className='rounded-xl shadow-2xl aspect-[56.25%] md:aspect-[894/541]'/>
        </a>
      </figure>
      <div className='xl:ps-6 w-3/4'>
        <h2 className='text-xl font-bold'>{siteTitle}</h2>
        <p className='py-6'>{description}</p>
        <ul className='flex flex-wrap items-center mb-6'>
          {stack.map(tech => (
            <li key={tech}>
            { !logos[tech] ?
              <p className='btn btn-outline btn-sm pointer-events-none normal-case me-1 mb-1 rounded-xl'>{tech}</p> :
              <img src={logos[tech]} alt={tech} title={tech} width='25' className='mt-1 me-2'/>
            } 
            </li>
          ))}
        </ul>
        {shownLink !== 'www.codeninja.fr' ?
          <a 
            href={siteLink} 
            className='btn btn-neutral-focus normal-case justify-self-center rounded-xl'
          >
            Aller sur {shownLink}
          </a> :
          <a 
            href={siteLink} 
            className='btn btn-info normal-case justify-self-center btn-disabled rounded-xl'
          >
            Rester sur {shownLink}
          </a>
        } 
      </div>
    </div>
  );
}

export default SiteCard;