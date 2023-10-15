import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import PageTitle from '../Components/PageTitle';
import CreateForm from '../Components/CreateForm';
import UpdateForm from '../Components/UpdateForm';
import DeleteForm from '../Components/DeleteForm';

function Admin() {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if(loading) return;
    if(!user) return navigate("/");
    if(user.uid !== "G0PCAqbZQpOIDwOQxVscuUFhUZ43") return navigate("/");
  }, [navigate, user, loading]);

  return (
    <>
      <main>
        <PageTitle title="Panneau d'administration"/>
        <div className='flex justify-center mt-8'>
          <section className='flex flex-col flex-wrap 2xl:flex-row justify-center items-center gap-3 bg-stone-800 py-10 w-10/12 rounded-2xl'>
            <CreateForm />
            <UpdateForm />
            <DeleteForm />
          </section>
        </div>
      </main>
    </>
  );
}

export default Admin;