import { onAuthStateChanged } from "firebase/auth";
import { useState, useEffect, useCallback } from "react";
import { Navbar, Product } from "../../components";
import { auth, fs } from "../../config/configFirebase";
import { doc, getDoc } from "firebase/firestore";

import "./home.scss";

const Home = () => {
  const [user, setUser] = useState(null);
  const authState = useCallback(()=>{
    onAuthStateChanged(auth, async ({ uid }) => {
      const docRef = doc(fs, "users", uid);
      const docSnap = await getDoc(docRef);
      if (docSnap) {
        setUser(docSnap.data().FullName);
      } else {
        console.log("No such document!");
      }
    });
  },[]) ;
  useEffect(() => {
    authState();
  }, [authState]);

  return (
    <>
      <header className="home__header">
        <Navbar user={user} />
      </header>
      <main className="home__main">
        <Product />
      </main>
      <footer className="home__footer">&copy;copyright by mahmoud</footer>
    </>
  );
};

export default Home;
