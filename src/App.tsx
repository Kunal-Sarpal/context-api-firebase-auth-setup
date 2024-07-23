import { app } from './Firebase';
import { Link, Route, Routes, useNavigate,  } from 'react-router-dom';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { useEffect, useState } from 'react';

const auth = getAuth(app);

function App() {
   const navigate = useNavigate()
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const handleLog = () =>{
    signOut(auth);
    navigate("/Signin")
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      setLoading(false); // Loading state is done
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // You can replace this with a spinner or loading component
  }

  return (

      <div>
        <nav className='border-2 p-4 shadow-lg gap-10 flex items-center'>
          <Link to="/" className='text-yellow-600 focus:border-red-400 focus:border-2'>Home</Link>
          {user ? (
            <button onClick={handleLog} >Logout</button>
          ) : (
            <>
              <Link to="/SignIn" className='text-yellow-600 focus:border-red-400 focus:border-2'>SignIn</Link>
              <Link to="/SignUp" className='text-yellow-600 focus:border-red-400 focus:border-2'>Signup</Link>
            </>
          )}
        </nav>

        <Routes>
          <Route path="/SignUp" element={<Signup />} />
          <Route path="/SignIn" element={<Signin />} />
          <Route path="/" element={<div>Hello Home Page</div>} />
        </Routes>
      </div>
  
  );
}

export default App;
