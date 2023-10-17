import PageTitle from '../Components/PageTitle';
import portrait from '../Assets/tof.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faGamepad, 
  faDiceD20,
  faCode,
  faCube,
  faGhost,
  faMountain,
  faHandFist,
  faShrimp,
  faBug,
  faPaperPlane
} from '@fortawesome/free-solid-svg-icons';
import Footer from '../Components/Footer';

const About = () => {
  return(
    <>
      <main className='mb-4'>
        <PageTitle title="À propos de moi"/>
        <section className='flex flex-col items-center gap-2'>
          <article className='w-6/12 bg-base-300 rounded-xl p-6'>
            <h2 className='text-xl font-bold mb-6'>Qui suis-je ?</h2>
            <div className='flex'>
              <p className='px-2'>
                Je suis Sébastien THOMAS-GIRARD et, il n'y a pas encore si longtemps, j'étais un 
                technicien de laboratoire hospitalier spécialisé dans l'anatomie pathologique (la recherche 
                histologique de cellules carcinomateuses) et la métrologie (la vérification et 
                l'étalonnage d'instruments de mesure).<br/>
                <br/>
                Avec les années, j'ai eu le sentiment qu'il était temps pour moi d'aller vers de nouveaux
                horizons et j'ai réalisé un bilan de compétences en 2022.<br/>
                <br/>
                Par la suite, je me suis formé et j'ai obtenu le titre professionnel de développeur 
                web et web mobile en septembre 2023.
              </p>
              <img src={portrait} alt='Mon portrait' width='250' className='rounded-[50%]'/>
            </div>
          </article>
          <article className='w-6/12 bg-base-300 rounded-xl p-6'>
            <h2 className='text-xl font-bold mb-6'>Pourquoi suis-je devenu développeur ?</h2>
            <p className='px-2'>
              Alors que j'avais une quinzaine d'années, mes parents ont acheté un ordinateur et j'ai
              découvert Internet. Nous étions au milieu des années 1990, ce n'était pas l'Internet que 
              nous connaissons maintenant mais il était néanmoins déjà magique.<br/>
              Oui, même avec un modem 56K, il fallait simplement être un peu patient.<br/>
              <br/>
              J'ai commencé à démonter les unités centrales pour voir comment c'était dedans, pour 
              comprendre quel composant faisait quoi. Puis j'ai modifié mes configurations et j'ai fini 
              par monter moi-même mes ordinateurs à partir de pièces détachées quelques temps après.<br/>
              <br/>
              J'ai toujours cherché à programmer, que ce soit des mods pour DOOM en DECORATE ou des 
              scripts pour maintenir les serveurs que j'avais mis en place pour héberger services et 
              jeux pour mon groupe d'amis.<br/>
              <br/>
              C'est assez naturellement, avec ce passif de bidouilleur autodidacte et passionné, que 
              je me suis tourné vers une formation de développeur web à l'issue de mon bilan de compétences.
            </p>
          </article>
          <article className='w-6/12 bg-base-300 rounded-xl p-6'>
            <h2 className='text-xl font-bold mb-6'>Quelles sont mes passions ?</h2>
            <p className='mb-2 px-2'>
              Toujours à la recherche de nouvelles connaissances, je me suis découvert avec les années 
              une multitude de passions et marottes dans divers domaines :
            </p>
            <ul  className='ms-10 px-2 min-w-fit'>
              <li className='flex'>
                <FontAwesomeIcon icon={faGamepad} className='mt-1 me-3'/>
                Les jeux vidéos
              </li>
              <li className='flex mt-1'>
                <FontAwesomeIcon icon={faDiceD20} className='mt-1 me-4'/>
                Le jeu de rôle sur table
              </li>
              <li className='flex mt-1'>
                <FontAwesomeIcon icon={faCode} className='mt-1 -ms-1 me-4'/>
                La programmation
              </li>
              <li className='flex mt-1'>
                <FontAwesomeIcon icon={faCube} className='mt-1 me-4'/>
                L'impression 3D
              </li>
              <li className='flex mt-1'>
                <FontAwesomeIcon icon={faGhost} className='mt-1 me-5'/>
                Le cinéma d'épouvante
              </li>
              <li className='flex mt-1'>
                <FontAwesomeIcon icon={faMountain} className='mt-1 me-4'/>
                La culture japonaise
              </li>
              <li className='flex mt-1'>
                <FontAwesomeIcon icon={faHandFist} className='mt-1 me-4'/>
                Les arts martiaux
              </li>
              <li className='flex mt-1'>
                <FontAwesomeIcon icon={faBug} className='mt-1 me-4'/>
                Le naturalisme
              </li>
              <li className='flex mt-1'>
                <FontAwesomeIcon icon={faShrimp} className='mt-1 me-4'/>
                L'aquariophilie...
              </li>
            </ul>
            <p className='mt-2 px-2'>
              Cette liste n'est absolument pas exhaustive et sera sans aucun doute amenée à croître à l'avenir.
            </p>
          </article>
          <article className='w-6/12 bg-base-300 rounded-xl p-6'>
            <h2 className='text-xl font-bold mb-6'>Me contacter</h2>
            <p className='mb-2 px-2'>
              Vous avez un projet à me soumettre ? Vous souhaitez me recruter ?<br/>
              Contactez-moi par e-mail et rencontrons-nous pour en discuter.
            </p>
            <div className='flex justify-center'>
              <a
                href='mailto:admin@codeninja.fr' 
                className='m-2 p-2 btn btn-lg btn-neutral-focus normal-case rounded-xl'
              >
                <FontAwesomeIcon icon={faPaperPlane} />
                Envoyez-moi un e-mail
              </a>
            </div>
          </article>        
        </section>
      </main>
      <Footer />
    </>
  );
}

export default About;