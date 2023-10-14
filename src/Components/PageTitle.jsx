const PageTitle = ({ title }) => {
  return (
    <span className="flex flex-col items-center my-4">
      <h1 className="text-3xl">{title}</h1>
    </span>
  );
}

export default PageTitle;