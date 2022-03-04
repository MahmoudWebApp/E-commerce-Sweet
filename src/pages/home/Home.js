import { Navbar, Product } from "../../components";
import './home.scss';

const Home = () => {
  return (
    <>
      <header className="home__header">
        <Navbar />
      </header>
      <main className="home__main">
        <Product />
      </main>
      <footer className="home__footer">
        copyright by mahmoud
      </footer>
    </>
  );
};

export default Home;
