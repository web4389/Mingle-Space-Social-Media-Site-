import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

const Signup = lazy(() => import("./pages/Signup"));
const Home = lazy(() => import("./pages/Home"));
const Profile = lazy(() => import("./pages/Profile"));
const SearchUser = lazy(() => import("./pages/SearchUser"));
const Login = lazy(() => import("./pages/Login"));
const EditingDescription = lazy(() => import("./pages/EditingDescription"));
const CreatePost = lazy(() => import("./pages/CreatePost"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/editingdescription",
    element: <EditingDescription />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/search",
    element: <SearchUser />,
  },
  {
    path: "/createpost",
    element: <CreatePost />,
  },
]);
