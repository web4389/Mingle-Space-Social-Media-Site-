import { configureStore } from "@reduxjs/toolkit";
import createAccount from "../../features/signupSlice";
import editDescription from "../../features/editingDescSlice";
import Login from "../../features/loginSlice";
import getPosts from "../../features/gettingPostsSlice";
import getAllPosts from "../../features/gettingAllPostsSlice";
import userInfo from "../../features/loggedInUserInfoSlice";
import changeUserImg from "../../features/changeUserImageSlice";
import searchUserSlice from "../../features/searchUserSlice";
import specificUserPost from "../../features/specificUsersPostSlice";
import searchValue from "../../features/otherUserInfoSlice";
import createPost from "../../features/createPostSlice";
import specificPost from "../../features/SpecificPostSlice";
import editPost from "../../features/updatePostSlice";
import DeletePost from "../../features/DeletePostSlice";

export const store = configureStore({
  reducer: {
    creatingAccount: createAccount,
    editDescription: editDescription,
    login: Login,
    getPost: getPosts,
    getAllPosts: getAllPosts,
    userInfo: userInfo,
    changeUserImg: changeUserImg,
    searchUser: searchUserSlice,
    specificUserPost: specificUserPost,
    searchValue: searchValue,
    createPost: createPost,
    specificPost: specificPost,
    editPost: editPost,
    deletePost: DeletePost,
  },
});
