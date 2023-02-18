import { createBrowserRouter } from "react-router-dom";
import HomeLayout from "./components/layouts/HomeLayout";
import Home from "./routes/Home";
import NotFound from "./routes/NotFound";
import Users from "./routes/Users";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <NotFound />,
    children: [
      { path: "", element: <Home />, index: true },
      { path: "users", element: <Users /> },
    ],
  },
]);

export default router;
