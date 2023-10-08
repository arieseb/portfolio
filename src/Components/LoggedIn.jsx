import { useAuthState } from "react-firebase-hooks/auth";
import {auth, logOut} from '../firebase';
import Login from "./Login";


const LoggedIn = () => {
  const [user] = useAuthState(auth);

  return (
  <>
    {!user ? <Login /> :
      <div>
        <p>Connecté avec le compte : </p>
        <span>{user?.email}</span>
        <button onClick={logOut}>Déconnexion</button>
      </div>
    }
  </>
  );
}

export default LoggedIn;