import "../components/Css/profile.css";
import { useEffect, useState, useRef } from "react";
import Navbar from "../components/Navbar";
import { FaRegEdit } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import { gettingPosts } from "../features/gettingPostsSlice";
import { loggedInUserInfo } from "../features/loggedInUserInfoSlice";
import { changingUserImg } from "../features/changeUserImageSlice";
import convertToaBase64 from "../components/ConvertToaBase64";
import Post from "../components/Post";
import "../components/Css/animation.css";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.userInfo);
  const getPost = useSelector((state) => state.getPost);

  const [postdata, setpostData] = useState();
  const inputRef = useRef(null);
  const [data, setdata] = useState({ name: "", description: "", image: "" });

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);

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

  useEffect(() => {
    dispatch(gettingPosts()).then((e) => {
      setpostData(e.payload.post);
    });
  }, [data]);

  const updateProfileImg = async (image) => {
    dispatch(changingUserImg(image));
    setdata({ ...data, image: image });
  };

  const onChangeImgInput = (e) => {
    convertToaBase64(e, updateProfileImg);
  };

  const onChangeImg = () => {
    inputRef.current.click();
  };
  document.title = "Profile";

  return (
    <div className="profileCon flex flex-col min-h-[100vh] w-[100%] profileCon font-roboto">
      <Navbar />

      <div className="mt-12 min-[600px]:px-5 flex w-[100%] justify-center items-center flex-col gap-y-[60px] max-[600px]:pb-[50px] pb-[15px] max-lg:items-center">
        {userInfo.loading ? (
          <Loader />
        ) : (
          <>
            <aside className="profileContainer">
              <Link
                to={"/editingdescription"}
                className="editInfo pt-2 -mb-7 w-[100%] justify-end px-4 cursor-pointer text-[20px] flex"
              >
                <FaRegEdit />
              </Link>
              {!data ? (
                <Loader />
              ) : (
                <div className="imgSubCon">
                  <img
                    src={data.image}
                    alt="profilePicture"
                    className="profileImage cursor-pointer"
                    onClick={onChangeImg}
                  />
                  <p className="content">Change Picture</p>
                </div>
              )}
              <article className="textContainer px-2">
                <p className="name font-sans">{data.name}</p>
                <p className="desc px-3">{data.description}</p>
              </article>
              <input
                type="file"
                accept="image/*"
                onChange={onChangeImgInput}
                className="hidden"
                ref={inputRef}
              />
            </aside>

            <div className="">
              {getPost.loading ? (
                <Loader />
              ) : postdata == undefined || postdata == "" || postdata == [] ? (
                getPost.loading ? (
                  <Loader />
                ) : (
                  <p>{`You haven't created any post`}</p>
                )
              ) : (
                postdata.map((postData) => {
                  return (
                    <Post
                      key={postData._id}
                      mainData={postData}
                      profileimg={data.image}
                      edit={true}
                      setMainData={setpostData}
                    />
                  );
                })
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
