import { useEffect, useState } from "react";
import Button from "../components/Button";
import Line from "../components/Line";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../features/loginSlice";
import Error from "../components/Error";
import Logo from "../assets/Logo.png";
import "../components/Css/animation.css";

const Login = () => {
  const [data, setdata] = useState({ email: "", password: "" });
  const [user, setuser] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onChange = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value });
  };
  const apidata = useSelector((state) => {
    return state.login;
  });
  const onsubmit = async (e) => {
    e.preventDefault();
    await dispatch(
      login({
        email: data.email,
        password: data.password,
      })
    );
    setuser(true);
    setTimeout(() => {
      setuser(false);
    }, 5000);
  };
  useEffect(() => {
    if (user === true && apidata.user.success === true) {
      localStorage.setItem("token", apidata.user.authtoken);
      navigate("/home");
    }
    if (localStorage.getItem("token")) {
      navigate("/home");
    }
  });
  document.title = "Login";

  return (
    <div className="loginCon lg:h-[100vh] w-[100%] flex flex-col items-center justify-center font-roboto">
      <Error user={user} apidata={apidata} />
      <Link className="cursor-pointer absolute top-0 py-4" to={"/"}>
        <img src={Logo} alt="Logo" className="w-[200px]" />
      </Link>
      <div className="w-[100%] flex lg:items-center justify-evenly max-lg:mt-[70px]">
        <h1 className="text-[22px] max-lg:hidden">
          Welcome Again To Our Platform, Login To Use The Platform
        </h1>
        <form
          onSubmit={onsubmit}
          action=""
          className={`bg-[#242526] rounded-lg max-lg:m-5 max-sm:w-[100%] sm:w-[50%] lg:w-[28%] pt-5 max-sm:px-5 px-8 flex flex-col justify-evenly gap-6 shadow-2xl shadow-slate-800`}
        >
          <div className="flex flex-col">
            <label htmlFor="email" className="py-1">
              Email
            </label>
            <input
              value={data.email}
              onChange={onChange}
              type="email"
              className="bg-[#3a3c3b] outline outline-1 outline-[#3a3c3b] hover:bg-[#444645] hover:outline-[#444645] rounded-sm w-[100%] px-3 py-[2px] hover:outline-2 focus:outline-[#4f504f] focus:outline-2 focus:bg-[#3e4140]"
              id="email"
              name="email"
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="py-1">
              Password
            </label>
            <input
              value={data.password}
              onChange={onChange}
              type="password"
              className="bg-[#3a3c3b] outline outline-1 outline-[#3a3c3b] hover:bg-[#444645] hover:outline-[#444645] rounded-sm w-[100%] px-3 py-[2px] hover:outline-2 focus:outline-[#4f504f] focus:outline-2 focus:bg-[#3e4140]"
              id="password"
              required
              name="password"
              minLength={6}
            />
          </div>
          <Button value="Login" apidata={apidata} />
          <Line />
          <h2 className="text-center mb-8">
            Create New Account?{" "}
            <Link to="/" className="text-[#0a7dd3]">
              Sign Up
            </Link>
          </h2>
        </form>
      </div>
    </div>
  );
};

export default Login;
