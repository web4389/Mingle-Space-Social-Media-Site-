import { useNavigate } from "react-router-dom";
import "./Css/animation.css";

const Logout = ({ closeModal }) => {
  const navigate = useNavigate();

  const onLogout = () => {
    closeModal();
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <main className="logoutCon px-[1.1rem] pt-[1.4rem] pb-[1.6rem] max-[470px]:w-[100%] w-[350px] hover:shadow-none">
      <div className="flex justify-center items-center flex-col px-16 text-center">
        <h1 className="text-[20px] mb-2 text-sky-500 font-bold">
          See you soon!
        </h1>
        <p className="mb-2 text-[16px] text-[#b8b8b8]">
          You are about to logout. Are you sure this is what you want ?{" "}
        </p>
      </div>
      <div className="flex justify-between">
        <button
          className={`w-[30%] flex justify-center gap-3  bg-gray-500 text-white mt-3 py-[10px] hover:bg-gray-700 transition-colors rounded-3xl font-semibold text-[17px]`}
          onClick={() => {
            closeModal();
          }}
        >
          Cancel
        </button>
        <button
          className={`w-[30%] flex justify-center gap-3 bg-sky-600 text-white mt-3 py-[10px] hover:bg-sky-800 transition-colors rounded-3xl font-semibold text-[17px]`}
          onClick={onLogout}
        >
          Logout
        </button>
      </div>
    </main>
  );
};

export default Logout;
