import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-stone-700 h-24 w-full">
      <div className='flex items-center justify-center h-full'>
        <button className="text-xl" onClick={scrollToTop}>
          <FontAwesomeIcon icon={faArrowUp} className='me-2'/>
          <span>Retour en haut de page</span>
          <FontAwesomeIcon icon={faArrowUp} className='ms-2'/>
        </button>
      </div>
    </footer>
  );
};

export default Footer;