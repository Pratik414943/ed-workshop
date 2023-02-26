import Link from "next/link"; 
import ThirdSem from "./ThirdSem"

const Navbar = () => {
  return (
    <>
      <nav className="navbar">
        <ul>
          <li className="nav-links logo">
            {/* <img src="assets/logo.svg" alt="Logo" />  */}
            <i class="fa-solid fa-wave-square"></i>
          </li>
        </ul>
        <ul>
          <li className="nav-links">
            <Link href="/"> Home </Link>
          </li>
          <li className="nav-links">
            <Link href="/ThirdSem" passHref legacyBehavior> Resources </Link>
          </li>
          <li className="nav-links">
            <Link href="/Chat"> Chat </Link>
          </li>
          <li className="nav-links">
            <Link href="/About"> About </Link>
          </li>
          <li className="nav-links">
            <Link href="/Support"> Support </Link>
          </li>
          <li>
            <i className="fa-solid fa-bars"></i>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
