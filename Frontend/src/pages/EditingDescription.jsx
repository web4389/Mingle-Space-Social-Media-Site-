import { useState, useEffect } from "react";
import Button from "../components/Button";
import { editingDescription } from "../features/editingDescSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Error from "../components/Error";
import Navbar from "../components/Navbar";
import "../components/Css/animation.css";
import { loggedInUserInfo } from "../features/loggedInUserInfoSlice";

const EditingDescription = () => {
  const [data, setdata] = useState({ name: "", description: "" });
  const [user, setuser] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user === true && apidata.user.success === true) {
      navigate("/profile");
    }
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
  });

  useEffect(() => {
    dispatch(loggedInUserInfo()).then((e) => {
      const data = e.payload.user;
      setdata({
        name: data.name,
        description: data.description,
      });
    });
  }, []);

  const onChange = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value });
  };
  const apidata = useSelector((state) => {
    return state.editDescription;
  });
  const onsubmit = async (e) => {
    e.preventDefault();
    await dispatch(
      editingDescription({ name: data.name, description: data.description })
    );
    setuser(true);
    setTimeout(() => {
      setuser(false);
    }, 5000);
  };
  useEffect(() => {
    if (user === true && apidata.user.success === true) {
      navigate("/profile");
    }
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
  });
  document.title = "Edit Your Description";

  return (
    <div className="DescCon lg:h-[100vh] w-[100%] flex flex-col items-center justify-center font-roboto">
      <Error user={user} apidata={apidata} />
      <div className="w-[100%] absolute top-0">
        <Navbar />
      </div>
      <div className="w-[100%] flex lg:items-center justify-evenly max-lg:mt-[70px]">
        <h1 className="text-[22px] max-lg:hidden">Enter Your Information</h1>
        <form
          onSubmit={onsubmit}
          action=""
          className={`bg-[#242526] rounded-lg max-lg:m-5 max-sm:w-[100%] sm:w-[50%] lg:w-[28%] py-5 max-sm:px-5 px-8 flex flex-col justify-evenly gap-6 shadow-2xl shadow-slate-800`}
        >
          <div className="flex flex-col">
            <label htmlFor="name" className="py-1">
              Name
            </label>
            <input
              value={data.name}
              onChange={onChange}
              type="text"
              className="bg-[#3a3c3b] outline outline-1 outline-[#3a3c3b] hover:bg-[#444645] hover:outline-[#444645] rounded-sm w-[100%] px-3 py-[2px] hover:outline-2 focus:outline-[#4f504f] focus:outline-2 focus:bg-[#3e4140]"
              id="name"
              name="name"
              required
              minLength={3}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="description" className="py-2">
              Description
            </label>
            <textarea
              value={data.description}
              onChange={onChange}
              rows={5}
              type="text"
              className="bg-[#3a3c3b] hover:bg-[#444645] resize-none rounded-md w-[100%] px-3 py-[2px]"
              id="description"
              name="description"
              required
              minLength={10}
              maxLength={1000}
            />
          </div>

          <Button value="Conform" apidata={apidata} />
        </form>
      </div>
    </div>
  );
};

export default EditingDescription;
