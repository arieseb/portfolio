import '../App.css';
import jsonData from '../Assets/sites.json';
import PageTitle from '../Components/PageTitle';
import SiteCard from '../Components/SiteCard';

function Portfolio() {
  const data = jsonData.sites;

  return (
    <main>
        <PageTitle title="Bienvenue sur mon portfolio"/>
        {data.map(site => (
          <div key={site.id}>
            <SiteCard
              siteTitle={site.siteTitle}
              imageName={site.imageName}
              description={site.description}
              siteLink={site.siteLink}
              shownLink={site.shownLink}
              stack={site.stack}
            />
          </div>
        ))}
    </main>
  );
}

export default Portfolio;