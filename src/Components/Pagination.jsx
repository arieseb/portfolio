const Pagination = ({ currentPage, articleLength, onClickPrevious, onClickNext, articlesPerPage }) => {
  return (
    <nav aria-label='Pagination' className='flex justify-center items-center mb-4'>
      <button
        onClick={onClickPrevious} 
        disabled={currentPage === 1} 
        className="btn btn-neutral mt-4 me-6 rounded-xl normal-case w-48"
        aria-label="Page précédente"
      >
        Page précédente
      </button>
      <span className='mt-3 font-semibold'>Page {currentPage}</span>
      <button 
        onClick={onClickNext} 
        disabled={articleLength < articlesPerPage} 
        className="btn btn-neutral mt-4 ms-6 rounded-xl normal-case w-48"
        aria-label="Page suivante"
      >
        Page suivante
      </button>
    </nav> 
  );
};

export default Pagination;