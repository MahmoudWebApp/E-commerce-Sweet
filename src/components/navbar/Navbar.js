import { Link } from "react-router-dom";
import "./navbar.scss";
const Navbar = () => {
  return (
    <nav className="nav">
      <div className="nav__logo">
        <Link to="/" className="nav__link">
          logo
        </Link>
      </div>
      <ul className="nav__list">
        <li className="nav__item">
          <Link to="/signup" className="nav__link nav__link-signup">
            signup
          </Link>
        </li>
        <li className="nav__item">
          <Link to="/login" className="nav__link">
            login
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
