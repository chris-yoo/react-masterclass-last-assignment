import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Coming from "./screens/Coming";
import Now from "./screens/Now";
import Home from "./screens/Popular";
import Popular from "./screens/Popular";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Popular />,
      },
      {
        path: "/popular/:movieId",
        element: <Popular />,
      },
      {
        path: "/coming-soon",
        element: <Coming />,
      },
      {
        path: "/now-playing",
        element: <Now />,
      },
    ],
  },
]);

export default router;
