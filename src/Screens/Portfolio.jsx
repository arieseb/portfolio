import jsonData from '../Assets/sites.json';
import PageTitle from '../Components/PageTitle';
import SiteCard from '../Components/SiteCard';

function Portfolio() {
  const data = jsonData.sites;

  return (
    <main>
        <PageTitle title="Bienvenue sur mon portfolio"/>
        <div className='flex flex-col items-center gap-2'>
          <p className='w-6/12 mb-2'>
            Cette page est la vitrine de mes réalisations et de mes compétences. J'ai développé tous 
            les projets présentés ici en autonomie, ils reflètent mon savoir-faire. Hormis le CV, 
            vous les trouverez par ordre chronologique de développement, ce qui permet de mettre en 
            relief ma progression.
          </p>
          {data.map(site => (
            <article className="hero bg-neutral py-6 w-7/12 rounded-3xl" key={site.id}>
              <SiteCard
                siteTitle={site.siteTitle}
                imageName={site.imageName}
                description={site.description}
                siteLink={site.siteLink}
                shownLink={site.shownLink}
                stack={site.stack}
              />
            </article>
          ))}
        </div>
    </main>
  );
}

export default Portfolio;