import { useRef, useState } from "react";
import "./Css/post.css";
import { RxCross2 } from "react-icons/rx";
import convertToaBase64 from "./ConvertToaBase64";
import { CgSoftwareUpload } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import { editingPost } from "../features/updatePostSlice";
import "./Css/button.css";

const UpdatePostComponent = ({ data, closeModal, setData }) => {
  const dispatch = useDispatch();
  const editPost = useSelector((state) => state.editPost);

  const [content, setcontent] = useState({
    content: data.paragraph,
  });
  const [postimg, setpostimg] = useState({ postImage: data.postImage });
  const inputRef = useRef(null);

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

  const onUpdate = () => {
    if (
      postimg.postImage == undefined ||
      postimg.postImage == "" ||
      postimg.postImage == []
    ) {
      dispatch(
        editingPost({
          id: data._id,
          content: content.content,
          postImg: "",
        })
      ).then(async (e) => {
        await setData(e.payload);
        closeModal();
      });
    } else {
      dispatch(
        editingPost({
          id: data._id,
          content: content.content,
          postImg: postimg.postImage,
        })
      ).then(async (e) => {
        await setData(e.payload);
        closeModal();
      });
    }
  };

  return (
    <main
      style={{ marginBottom: "0px", paddingBottom: "1.7rem" }}
      className="task max-[470px]:w-[100%] hover:shadow-none"
    >
      <div className="tags">
        <div className="flex items-center gap-x-[6px]">
          <img
            src={data.profilePicture}
            alt="Profile"
            className="w-[40px] h-[40px] rounded-[100%]"
          />
          <div className="">
            <h1 className="text-[14px] font-semibold text-white">
              {data.name}
            </h1>
            <p className="-mt-[2px] text-[13px] h-[19.5px] overflow-hidden">
              {data.description}
            </p>
          </div>
        </div>
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
        className="bg-transparent w-[100%] focus:outline-none my-[1.5rem] text-[16px] text-[#e4e4e4] resize-none"
        placeholder="What Do You Want To Talk About?"
      />
      <div className="w-[100%] h-[1px] bg-[#b9b9b9] opacity-20 my-4 rounded-lg"></div>
      <div className="stats flex gap-x-[5px] justify-between">
        <button
          className={`w-[30%] flex justify-center gap-3  bg-gray-500 text-white mt-3 py-[10px] ${
            content.content.length < 10 && "bg-sky-800"
          } hover:bg-gray-700 transition-colors rounded-3xl font-semibold text-[17px]`}
          disabled={content.content.length < 10}
          onClick={() => {
            closeModal();
          }}
        >
          Cancel
        </button>
        <button
          className={`w-[30%] flex justify-center gap-3 bg-sky-600 text-white mt-3 py-[10px] ${
            content.content.length < 10 && "bg-sky-800"
          } hover:bg-sky-800 transition-colors rounded-3xl font-semibold text-[17px]`}
          disabled={content.content.length < 10}
          onClick={onUpdate}
        >
          {editPost.loading === true ? (
            <>
              <div className="loader"></div>
            </>
          ) : (
            "Update"
          )}
        </button>
      </div>
    </main>
  );
};

export default UpdatePostComponent;
