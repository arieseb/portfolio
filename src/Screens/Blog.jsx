
import '../App.css';
import PageTitle from '../Components/PageTitle';
import LoggedIn from '../Components/LoggedIn';

function Blog() {
  return (
    <>
      <div>
        <LoggedIn></LoggedIn>
      </div>
      <main>
        <PageTitle title="Bienvenue sur mon blog"/>
      </main>
    </>
  );
}

export default Blog;