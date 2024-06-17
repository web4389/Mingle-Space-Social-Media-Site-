import "./Css/post.css";
import { PiDotsThreeBold } from "react-icons/pi";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useRef, useState } from "react";
import { CiClock2 } from "react-icons/ci";
import UpdatePostComponent from "./UpdatePostComponent";
import DeletePost from "./DeletePost";

const Post = ({ mainData, profileimg, edit, setMainData }) => {
  const editModalRef = useRef();
  const deleteModalRef = useRef();
  const [postInfo, setpostInfo] = useState(false);
  const [data, setdata] = useState(mainData);
  const onEdit = () => {
    if (postInfo) {
      setpostInfo(false);
    }
    if (!postInfo) {
      setpostInfo(true);
    }
  };
  const onEditAlternative = () => {
    if (postInfo) {
      setpostInfo(false);
    }
  };

  const onPostEdit = async () => {
    editModalRef.current.showModal();
  };

  const closeEditModal = () => {
    editModalRef.current.close();
  };
  const onDeletePost = async () => {
    deleteModalRef.current.showModal();
  };
  const closeDeleteModal = () => {
    deleteModalRef.current.close();
  };

  return (
    <main
      className="task max-[470px]:w-[100%] font-roboto"
      onClick={onEditAlternative}
    >
      <dialog ref={editModalRef} className="bg-[#272727] rounded-[8px] ">
        <UpdatePostComponent
          data={data}
          closeModal={closeEditModal}
          setData={setdata}
        />
      </dialog>
      <dialog ref={deleteModalRef} className="bg-[#272727] rounded-[8px]">
        <DeletePost
          data={data}
          closeModal={closeDeleteModal}
          setMainData={setMainData}
        />
      </dialog>
      <div className="tags">
        <div className="flex items-center gap-x-[6px]">
          <img
            src={profileimg ? profileimg : data.profilePicture}
            alt=""
            className="w-[40px] h-[40px] rounded-[100%]"
          />
          <div className="">
            <h1 className="text-[14px] font-[600] font-sans text-white">
              {data.name}
            </h1>
            <p className="-mt-[2px] text-[13px] h-[19.5px] overflow-hidden">
              {data.description}
            </p>
          </div>
        </div>
        {edit == true ? (
          <>
            <div className="">
              <PiDotsThreeBold
                className="text-[27px] cursor-pointer"
                onClick={onEdit}
              />
            </div>
            <div
              className={`postInfo absolute w-[250px] border bg-[#272727] z-[3] border-[#b9b9b96c] border-solid py-2 max-[470px]:right-0 max-[470px]:mr-[13%] min-[470px]:ml-[140px] mt-[140px] ${
                postInfo ? "" : "hidden"
              }`}
            >
              <div
                className="flex items-center gap-x-[5px] w-[100%] cursor-pointer hover:bg-[#3b3b3b] p-3"
                onClick={onPostEdit}
              >
                <FaRegEdit className="text-[17px]" />
                <h1 className="text-white">Edit</h1>
              </div>
              <div
                className="flex items-center gap-x-[5px] w-[100%] cursor-pointer hover:bg-[#3b3b3b] p-3"
                onClick={onDeletePost}
              >
                <MdDelete className="text-[17px]" />
                <h1 className="text-white">Delete</h1>
              </div>
            </div>
          </>
        ) : (
          ""
        )}
      </div>
      <div className="w-[100%] h-[1px] bg-[#b9b9b9] opacity-20 my-4 rounded-lg"></div>
      {data.postImage && (
        <div className="w-[100%] my-5 cursor-pointer">
          <img
            src={data.postImage}
            alt=""
            className="h-[540px] max-[460px]:h-[400px] object-cover rounded w-[100%]"
          />
        </div>
      )}
      <p className="my-[1.2rem] text-[14px]">{data.paragraph}</p>
      <div className="w-[100%] h-[1px] bg-[#b9b9b9] opacity-20 my-4 rounded-lg"></div>
      <div className="stats flex gap-x-[5px]">
        <CiClock2 className="text-[17px]" />
        {data.date.msg} {data.date.day} {data.date.month}, {data.date.year}
      </div>
    </main>
  );
};

export default Post;
