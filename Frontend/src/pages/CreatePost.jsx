import Navbar from "../components/Navbar";
import CreatePostComponent from "../components/CreatePostComponent";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);
  document.title = "Create Post";
  return (
    <div className="flex flex-col min-h-[100vh] w-[100%] font-roboto">
      <Navbar />
      <div className="mt-12 max-sm:px-[6px] flex w-[100%] justify-center items-center max-[600px]:pb-[50px] pb-[15px]">
        <CreatePostComponent />
      </div>
    </div>
  );
};

export default CreatePost;
