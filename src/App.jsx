import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from "./layouts/Main";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import ExplorePage from "./pages/ExplorePage";
import Error from "./pages/Error";
import Note from "./pages/Note";
import "react-quill-new/dist/quill.snow.css";
import AIChat from "./components/chat/AIChat";
import { UIProvider } from "./contexts/UIContext";

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
        element: <Note />,
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
    <UIProvider>
      <RouterProvider router={router} />
      <AIChat />
    </UIProvider>
  );
}

export default App;
