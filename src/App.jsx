import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from "./layouts/Main";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import ExplorePage from "./pages/ExplorePage";
import Error from "./pages/Error";
import Notes from "./pages/Notes";
import "react-quill-new/dist/quill.snow.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/explore",
        element: <ExplorePage />,
      },
      {
        path: "/notes/:id",
        element: <Notes />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
