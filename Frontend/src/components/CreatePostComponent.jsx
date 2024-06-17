import { useEffect, useRef, useState } from "react";
import "./Css/post.css";
import { RxCross2 } from "react-icons/rx";
import convertToaBase64 from "./ConvertToaBase64";
import { CgSoftwareUpload } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import { loggedInUserInfo } from "../features/loggedInUserInfoSlice";
import { creatingPost } from "../features/createPostSlice";
import { useNavigate } from "react-router-dom";
import "./Css/button.css";
import Loader from "./Loader";

const CreatePostComponent = () => {
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.userInfo);
  const createPost = useSelector((state) => state.createPost);
  const dispatch = useDispatch();
  const [content, setcontent] = useState({ content: "" });
  const [postimg, setpostimg] = useState({ postImage: "" });
  const inputRef = useRef(null);
  const [data, setdata] = useState({ name: "", description: "", image: "" });
  useEffect(() => {
    dispatch(loggedInUserInfo()).then((e) => {
      const data = e.payload.user;
      setdata({
        name: data.name,
        description: data.description,
        image: data.profilePicture,
      });
    });
  }, []);

  const onChange = (e) => {
    setcontent({ content: e.target.value });
  };

  const savingPostImg = (img) => {
    setpostimg({ postImage: img });
  };

  const onChangeImgInput = (e) => {
    convertToaBase64(e, savingPostImg);
  };
  const onUpload = () => {
    inputRef.current.click();
  };

  const onDeleteImg = () => {
    setpostimg("");
  };
  const onReUpload = () => {
    inputRef.current.click();
  };

  const onPost = () => {
    dispatch(
      creatingPost({ content: content.content, postImg: postimg.postImage })
    ).then(() => {
      navigate("/profile");
    });
  };

  return (
    <main className="task max-[470px]:w-[100%] font-roboto">
      <div className="tags">
        {userInfo.loading || data.name == "" ? (
          <Loader />
        ) : (
          <div className="flex items-center gap-x-[6px]">
            <img
              src={data.image}
              alt="Profile"
              className="w-[40px] h-[40px] rounded-[100%]"
            />
            <div className="">
              <h1 className="text-[14px] font-semibold font-sans text-white">
                {data.name}
              </h1>
              <p className="-mt-[2px] text-[13px] h-[19.5px] overflow-hidden">
                {data.description}
              </p>
            </div>
          </div>
        )}
      </div>
      <div className="w-[100%] h-[1px] bg-[#b9b9b9] opacity-20 my-4 rounded-lg"></div>
      <div
        className={`w-[100%] flex justify-center gap-3 bg-sky-600 text-white py-[10px] rounded-md text-[17px] cursor-pointer ${
          postimg.postImage && "hidden"
        }`}
        onClick={onUpload}
        disabled
      >
        <button className="button text-[25px]">
          <CgSoftwareUpload />
        </button>
        <p>Choose An content img</p>
      </div>
      <input
        type="file"
        accept="image/*"
        onChange={onChangeImgInput}
        className="hidden"
        ref={inputRef}
      />
      {postimg.postImage && (
        <div className="w-[100%] mt-5 cursor-pointer">
          <div className="w-[100%] flex justify-end gap-x-[6px] mb-1">
            <CgSoftwareUpload
              className="text-[35px] bg-sky-600 rounded-[100%] p-1 text-white"
              onClick={onReUpload}
            />
            <RxCross2
              className="text-[35px] bg-sky-600 rounded-[100%] p-1 text-white"
              onClick={onDeleteImg}
            />
          </div>
          <img
            src={postimg.postImage}
            alt=""
            className="h-[540px] max-[460px]:h-[400px] object-cover rounded w-[100%]"
          />
        </div>
      )}
      <textarea
        value={content.content}
        onChange={onChange}
        rows={5}
        className="bg-transparent w-[100%] focus:outline-none my-[1.5rem] text-[17px] text-[#e4e4e4] resize-none"
        placeholder="What Do You Want To Talk About?"
      />
      <div className="w-[100%] h-[1px] bg-[#b9b9b9] opacity-20 my-4 rounded-lg"></div>
      <div className="stats flex gap-x-[5px]">
        <button
          className={`w-[100%] flex justify-center gap-3 bg-sky-600 text-white mt-3 py-[10px] ${
            content.content.length < 10 && "bg-sky-800"
          } hover:bg-sky-800 transition-colors rounded-3xl font-semibold text-[17px]`}
          disabled={content.content.length < 10}
          onClick={onPost}
        >
          {createPost.loading && <div className="loader my-0"></div>}
          Post
        </button>
      </div>
    </main>
  );
};

export default CreatePostComponent;
