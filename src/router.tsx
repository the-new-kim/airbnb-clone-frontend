import { createBrowserRouter } from "react-router-dom";
import HomeLayout from "./components/layouts/HomeLayout";
import GithubConfirm from "./routes/GithubConfirm";
import Home from "./routes/Home";
import NotFound from "./routes/NotFound";
import RoomDetail from "./routes/RoomDetail";
import UploadRoom from "./routes/UploadRoom";
import Users from "./routes/Users";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <NotFound />,
    children: [
      { path: "", element: <Home />, index: true },
      { path: "users", element: <Users /> },
      { path: "rooms/:roomPk", element: <RoomDetail /> },
      {
        path: "rooms/upload",
        element: <UploadRoom />,
      },
      {
        path: "social",
        children: [{ path: "github", element: <GithubConfirm /> }],
      },
    ],
  },
]);

export default router;
