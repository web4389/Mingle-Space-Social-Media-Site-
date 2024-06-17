import "./Css/navbar.css";
import { Link } from "react-router-dom";
import { CgAdd } from "react-icons/cg";
import { MdOutlineLogout } from "react-icons/md";
import { IoPersonCircleOutline } from "react-icons/io5";
import { GoSearch } from "react-icons/go";
import { AiOutlineHome } from "react-icons/ai";
import { useRef } from "react";
import Logout from "./Logout";
import Logo from "../assets/Logo.png";

const Navbar = () => {
  const LogOut = useRef();

  const onLogout = async () => {
    LogOut.current.showModal();
  };
  const closeLogoutModal = () => {
    LogOut.current.close();
  };
  return (
    <div className="navCon flex max-[768px]:justify-center justify-between pt-[15px] items-center px-7">
      <Link className="cursor-pointer z-[12]" to={"/home"}>
        <img src={Logo} alt="Logo" className="w-[200px]" />
      </Link>
      <dialog ref={LogOut} className="bg-[#272727] rounded-[8px] ">
        <Logout closeModal={closeLogoutModal} />
      </dialog>
      <div className="w-[100%] max-[768px]:fixed max-[768px]:left-0 max-[768px]:bottom-0 z-10  min-[768px]:absolute flex min-[768px]:justify-center left-0">
        <div className="button-container max-[768px]:navCon">
          <Link to={"/home"} className="button text-[20px]">
            <AiOutlineHome />
          </Link>
          <Link to={"/search"} className="button text-[20px]">
            <GoSearch />
          </Link>
          <Link to={"/createpost"} className="button text-[20px]">
            <CgAdd />
          </Link>
          <Link to={"/profile"} className="button text-[20px]">
            <IoPersonCircleOutline />
          </Link>
          <Link
            onClick={onLogout}
            className="button text-[20px] min-[768px]:hidden"
          >
            <MdOutlineLogout />
          </Link>
        </div>
      </div>

      <button className="Btn z-[12]" id="logout" onClick={onLogout}>
        <Link className="sign">
          <svg viewBox="0 0 512 512">
            <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path>
          </svg>
        </Link>
        <div className="text">Logout</div>
      </button>
    </div>
  );
};

export default Navbar;
