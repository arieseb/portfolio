import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import PageTitle from '../Components/PageTitle';
import LoggedIn from '../Components/LoggedIn';

function Admin() {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if(loading) return;
    if(!user) return navigate("/blog");
    if(user.uid !== "G0PCAqbZQpOIDwOQxVscuUFhUZ43") return navigate("/blog");
  }, [navigate, user, loading]);

  return (
    <>
      <div>
        <LoggedIn></LoggedIn>
      </div>
      <main>
        <PageTitle title="Panneau d'administration"/>
      </main>
    </>
  );
}

export default Admin;