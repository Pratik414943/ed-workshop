import Link from "next/link"; 
const Navbar = () => {
  return (
    <>
      <nav className="navbar">
        <ul>
          <li className="nav-links logo">
            {/* <img src="assets/logo.svg" alt="Logo" />  */}
            <Link href={"/"}><i class="fa-solid fa-wave-square"></i><span className="home-txt">Home</span></Link>
          </li>
        </ul>
        <ul>
          <li className="nav-links">
            <Link href="/components/Feed"> Feed </Link>
          </li>
          <li className="nav-links">
            <Link href="/components/Sem" > Resources </Link>
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
      {/* <div className="hr-orange"></div>  */}
      <hr />
    </>
  );
};

export default Navbar;
