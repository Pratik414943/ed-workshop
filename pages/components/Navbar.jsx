import Link from "next/link";
import { Select } from "@chakra-ui/react";

const Navbar = () => {
  return (
    <>
      <nav className="navbar">
        <ul>
          <li className="nav-links logo">
            {/* <img src="assets/logo.svg" alt="Logo" />  */}
            <Link href={"/"}>
              <i class="fa-solid fa-wave-square"></i>
              <span className="home-txt">Home</span>
            </Link>
          </li>
        </ul>
        <ul>
          <li className="nav-links">
            <Link href="/components/Feed"> Feed </Link>
          </li>
          <li className="nav-links">
            {/* <Select placeholder="Resources">
              <option value="option1" href="/components/Sem">
                3rd Sem
              </option>
              <option value="option2">
              4th Sem
              </option>
              <option value="option3">
              5th Sem
              </option>
              <option value="option4" >
              6th Sem
              </option>
            </Select> */}
            <Link href={"/components/Sem"}>Resources</Link>
          </li>
          <li className="nav-links">
            <Link href="/components/Chat"> Chat </Link>
          </li>
          <li className="nav-links">
            <Link href="/components/About"> About </Link>
          </li>
          <li className="nav-links">
            <Link href="/components/Login"> Login </Link>
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
