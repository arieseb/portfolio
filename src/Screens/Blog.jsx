import logo from '../logo.svg';
import '../App.css';
import PageTitle from '../Components/PageTitle';

function Blog() {
  return (
    <div className="App">
      <header className="App-header">
        <PageTitle title="Bienvenue sur mon blog"/>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default Blog;