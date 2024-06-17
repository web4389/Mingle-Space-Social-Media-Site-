import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { Suspense } from "react";
import Loader from "./components/Loader";

function App() {
  return (
    <div className="bg-[rgb(24,25,26)] min-h-screen flex items-center text-white">
      <Suspense
        fallback={
          <div className="w-[100%] flex justify-center items-center">
            <Loader />
          </div>
        }
      >
        <RouterProvider router={router} />
      </Suspense>
    </div>
  );
}

export default App;
