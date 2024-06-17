import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import Post from "../components/Post";
import { gettingAllPosts } from "../features/gettingAllPostsSlice";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

const Home = () => {
  const navigate = useNavigate();
  const allPosts = useSelector((state) => {
    return state.getAllPosts;
  });
  const dispatch = useDispatch();
  const [postdata, setpostData] = useState();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
    dispatch(gettingAllPosts()).then((e) => {
      setpostData(e.payload.post);
    });
  }, []);
  document.title = "Home";

  return (
    <div className="flex flex-col min-h-[100vh] w-[100%] font-roboto">
      <Navbar />
      <div className="mt-12 flex w-[100%] justify-center items-center max-[600px]:pb-[50px] pb-[15px]">
        <div className="">
          {allPosts.loading ? (
            <Loader />
          ) : postdata == undefined ? (
            allPosts.loading ? (
              <Loader />
            ) : (
              <p>There Are No Posts</p>
            )
          ) : (
            postdata.map((postdata) => {
              return (
                <Post key={postdata._id} mainData={postdata} edit={false} />
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
