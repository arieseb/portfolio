import { Link } from "react-router-dom";

const Menu = () => {
  return (
    <ul>
      <li>
        <Link to="/">Portfolio</Link>
      </li>
      <li>
        <Link to="/blog">Blog</Link>
      </li>
    </ul>
  );
}

export default Menu;