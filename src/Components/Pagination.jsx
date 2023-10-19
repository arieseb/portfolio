const Pagination = ({ currentPage, articleLength, onClickPrevious, onClickNext, articlesPerPage }) => {
  return (
    <nav aria-label='Pagination' className='flex justify-center items-center mb-4'>
      <button
        onClick={onClickPrevious} 
        disabled={currentPage === 1} 
        className="btn btn-xs sm:btn-sm md:btn-md btn-neutral mt-4 me-2 lg:me-6 rounded-xl normal-case lg:w-48"
        aria-label="Page précédente"
      >
        Page précédente
      </button>
      <span className='mt-3 font-semibold'>Page {currentPage}</span>
      <button 
        onClick={onClickNext} 
        disabled={articleLength < articlesPerPage} 
        className="btn btn-xs sm:btn-sm md:btn-md btn-neutral mt-4 ms-2 lg:ms-6 rounded-xl normal-case lg:w-48"
        aria-label="Page suivante"
      >
        Page suivante
      </button>
    </nav> 
  );
};

export default Pagination;