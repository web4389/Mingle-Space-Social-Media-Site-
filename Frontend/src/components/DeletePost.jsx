import "./Css/post.css";
import { useDispatch, useSelector } from "react-redux";
import { DeletingPost } from "../features/DeletePostSlice";

const DeletePost = ({ data, closeModal, setMainData }) => {
  const dispatch = useDispatch();
  const deletePost = useSelector((state) => state.deletePost);

  const onDelete = () => {
    dispatch(DeletingPost(data._id)).then(async (e) => {
      await setMainData(e.payload.post);
      closeModal();
    });
  };

  return (
    <main
      className="task max-[470px]:w-[100%] hover:shadow-none"
      style={{ marginBottom: "0px", paddingBottom: "1.7rem" }}
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

      {data.postImage && (
        <div className="w-[100%] mt-5 cursor-pointer">
          <img
            src={data.postImage}
            alt=""
            className="h-[540px] max-[460px]:h-[400px] object-cover rounded w-[100%]"
          />
        </div>
      )}

      <p className="bg-transparent w-[100%] focus:outline-none my-[1.5rem] text-[15px] text-[#e4e4e4] resize-none">
        {data.paragraph}
      </p>
      <div className="w-[100%] h-[1px] bg-[#b9b9b9] opacity-20 my-4 rounded-lg"></div>
      <div className="stats flex gap-x-[5px] justify-between">
        <button
          className={`w-[30%] flex justify-center gap-3  bg-gray-500 text-white mt-3 py-[10px] hover:bg-gray-700 transition-colors rounded-3xl font-semibold text-[17px]`}
          onClick={() => {
            closeModal();
          }}
        >
          Cancel
        </button>
        <button
          className={`w-[30%] flex justify-center gap-3 bg-sky-600 text-white mt-3 py-[10px] hover:bg-sky-800
          } hover:bg-sky-800 transition-colors rounded-3xl font-semibold text-[17px]`}
          onClick={onDelete}
        >
          {deletePost.loading === true ? (
            <>
              <div className="loader"></div>
            </>
          ) : (
            "Delete"
          )}
        </button>
      </div>
    </main>
  );
};

export default DeletePost;
