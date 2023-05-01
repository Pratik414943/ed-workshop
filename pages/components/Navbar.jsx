import Link from "next/link";
import { Select } from "@chakra-ui/react";
import { useSession, signIn, signOut } from "next-auth/react";
import { Avatar, AvatarBadge, AvatarGroup } from "@chakra-ui/react";

const Navbar = () => {
  const { data: session } = useSession();
  return (
    <>
      <nav className="navbar">
        <ul>
          <li className="nav-links logo">
            <Link href={"/"}>
              <i className="fa-solid fa-wave-square"></i>
              <span className="home-txt">Home</span>
            </Link>
          </li>
        </ul>
        <ul>
          <li className="nav-links">
            <Link href="/Feed"> Feed </Link>
          </li>
          <li className="nav-links dropdown">
            <a className="dropbtn">Resources</a>
            <div className="dropdown-content">
              <Link href="/Sem3"> Sem 3 </Link>
              <Link href="/Sem4"> Sem 4 </Link>
              <Link href="/Sem5"> Sem 5 </Link>
              <Link href="/Sem6"> Sem 6 </Link>
            </div>
          </li>
          <li className="nav-links">
            <Link href="/Chat"> Chat </Link>
          </li>
          <li className="nav-links">
            <Link href="/About"> About </Link>
          </li>

          {!session && (
            <li className="nav-links" onClick={() => signIn("google")}>
              {" "}
              Login{" "}
            </li>
          )}
          {session && (
            <li className="nav-links" onClick={() => signOut()}>
              {" "}
              LogOut{" "}
            </li>
          )}
          <li>
            <i className="fa-solid fa-bars"></i>
          </li>
        </ul>
      </nav>
      <div className="hr-orange"></div>
      {/* <hr /> */}
    </>
  );
};

export default Navbar;
