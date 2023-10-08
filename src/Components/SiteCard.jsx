import images from '../Assets/images';

const SiteCard = ({ siteTitle, imageName, description, siteLink, shownLink, stack }) => {
  const imagePath = images[imageName];

  return(
    <>
      <h2>{siteTitle}</h2>
      <a href={siteLink}>
        <img src={imagePath} alt={siteTitle} width="500px"/>
      </a>
      <p>{description}</p>
      <a href={siteLink}>{shownLink}</a>
      <ul>
        {stack.map(tech => (
          <li key={tech}>{tech}</li>
        ))}
      </ul>
    </>
  );
}

export default SiteCard;