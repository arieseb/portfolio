import { Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from '../firebase';
import codeninja_logo from '../Assets/codeninja_logo.png';
import codeninja_title from '../Assets/codeninja_title.png';
import LoggedIn from "./LoggedIn";

const Menu = () => {
  const [user] = useAuthState(auth);

  return (
    <nav className="navbar bg-stone-700">
      <div className="navbar-start">
        <Link to='/'>
          <img src={codeninja_logo} alt="Logo Codeninja" width='150' />
          </Link>
        <Link to='/'>
          <img src={codeninja_title} alt="Titre Codeninja"/>    
        </Link>
      </div>
      <div className="navbar-center">
        <ul className="menu menu-horizontal hidden lg:flex">
          <li className="text-2xl">
            <Link to="/" className="rounded-xl">Blog</Link>
          </li>
          <li className="text-2xl">
            <Link to="/portfolio" className="rounded-xl">Portfolio</Link>
          </li>
          <li className="text-2xl">
            <Link to="/about" className="rounded-xl">À Propos</Link>
          </li>
          { !user ?
            <li className="text-2xl disabled pointer-events-none">
              <Link to="/admin" className="rounded-xl">Administration</Link>
            </li> :
            <li className="text-2xl">
            <Link to="/admin" className="rounded-xl">Administration</Link>
            </li> }
        </ul>
      </div>
      <div className="navbar-end">
        <LoggedIn />
        <div className="dropdown lg:hidden">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M4 6h16M4 12h8m-8 6h16" 
              />
            </svg>
          </label>
          <ul 
            tabIndex={0} 
            className="menu menu-sm dropdown-content mt-3 -ms-24 z-[1] p-2 shadow bg-base-100 rounded-box w-30"
          >
            <li className="text-2xl">
              <Link to="/">Blog</Link>
            </li>
            <li className="text-2xl">
              <Link to="/portfolio">Portfolio</Link>
            </li>
            <li className="text-2xl">
              <Link to="/about">À Propos</Link>
            </li>
            { !user ?
            <li className="text-2xl disabled pointer-events-none">
              <Link to="/admin">Administration</Link>
            </li> :
            <li className="text-2xl">
            <Link to="/admin">Administration</Link>
            </li> }
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Menu;