import { useAuthState } from "react-firebase-hooks/auth";
import {auth, logOut} from '../firebase';
import Login from "./Login";


const LoggedIn = () => {
  const [user] = useAuthState(auth);

  return (
  <>
    {!user ? <Login /> :
      <div className="me-6 flex flex-col items-center">
        <p className="hidden lg:flex">Connecté avec le compte : </p>
        <p className="text-white hidden lg:flex">{user?.email}</p>
        <button onClick={logOut} className="btn btn-neutral-focus mt-2 rounded-xl normal-case hidden md:flex">Déconnexion</button>
      </div>
    }
  </>
  );
}

export default LoggedIn;