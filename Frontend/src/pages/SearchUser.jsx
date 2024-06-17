import Search from "../components/Search";
import Navbar from "../components/Navbar";
import { searchingUser } from "../features/searchUserSlice";
import { specificUsersPost } from "../features/specificUsersPostSlice";
import "../components/Css/profile.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import Loader from "../components/Loader";
import Post from "../components/Post";
import { useNavigate } from "react-router-dom";
import "../components/Css/animation.css";

const SearchUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchValue = useSelector((state) => state.searchValue);
  const searchUser = useSelector((state) => state.searchUser);
  const specificUserPost = useSelector((state) => state.specificUserPost);
  const [usersInfo, setusersInfo] = useState();
  const [posts, setpost] = useState();

  useEffect(() => {
    if (searchValue.name) {
      dispatch(searchingUser(searchValue.name)).then((e) => {
        if (e.payload.success == true) {
          const id = e.payload.user[0]._id;
          const user = e.payload.user[0];
          setusersInfo({
            name: user.name,
            description: user.description,
            image: user.profilePicture,
          });
          dispatch(specificUsersPost(id)).then((e) => setpost(e.payload.post));
        } else if (e.payload.success == false) {
          setusersInfo();
        }
      });
    }
  }, [searchValue.name]);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);

  document.title = "Seacrh The User";
  return (
    <>
      <div className="seacrhCon flex flex-col min-h-[100vh] w-[100%] font-roboto">
        <Navbar />
        <div className="w-[100%] flex justify-center items-center flex-col mt-10">
          <Search />

          {searchUser.loading ? (
            <div className="mt-3">
              <Loader />
            </div>
          ) : usersInfo == "" || usersInfo == undefined ? (
            <p className="mt-10">Threre is no user with this name</p>
          ) : (
            <div className="searchedUser mt-12 min-[600px]:px-5 flex w-[100%] justify-center items-center flex-col gap-y-[60px] max-[600px]:pb-[50px] pb-[15px] max-lg:items-center">
              <aside className="profileContainer">
                {!usersInfo ? (
                  <Loader />
                ) : (
                  <div className="">
                    <img
                      src={usersInfo?.image}
                      alt="profilePicture"
                      className="profileImage cursor-pointer"
                    />
                  </div>
                )}
                <article className="textContainer px-2">
                  <p className="name font-sans">{usersInfo?.name}</p>
                  <p className="desc px-3">{usersInfo?.description}</p>
                </article>
              </aside>
              <div className="">
                {specificUserPost.loading ? (
                  <Loader />
                ) : posts == "" || posts == undefined ? (
                  specificUserPost.loading ? (
                    <Loader />
                  ) : (
                    <p>There Are No Posts By This User</p>
                  )
                ) : (
                  posts.map((posts) => {
                    return (
                      <Post
                        key={posts._id}
                        mainData={posts}
                        edit={false}
                        profileimg={usersInfo?.image}
                      />
                    );
                  })
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SearchUser;
