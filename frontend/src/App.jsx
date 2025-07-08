import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import RootLayout from "./RootLayout";
import Splash from "./pages/Splash.jsx";
import About from "./pages/About.jsx";
import Spots from "./pages/Spots.jsx";
import Search from "./pages/Search.jsx";
import Spot from "./pages/Spot.jsx";
import Fish from "./pages/Fish.jsx";
import Lure from "./pages/Lure.jsx";
import NotFound from "./pages/NotFound.jsx"
import {
   spotLoader,
   fishLoader,
   lureLoader,
} from "./utils/actions/api.jsx";

const router = createBrowserRouter([
   {
      path: "/",
      element: <RootLayout />,
      children: [
         {
            index: true,
            element: <Splash />,
         },
         {
            path: "/spots",
            element: <Spots />,
         },
         {
            path: "/spots/:id",
            element: <Spot />,
            loader: spotLoader,
         },
         {
            path: "/fish-species",
            element: <Search key="fish" type="fish" />,
         },
         {
            path: "/fish-species/:id",
            element: <Fish />,
            loader: fishLoader,
         },
         {
            path: "/lures",
            element: <Search key="lures" type="lures" />,
         },
         {
            path: "/lures/:id",
            element: <Lure />,
            loader: lureLoader,
         },
         {
            path: "/about",
            element: <About />,
         },
         {
            path: "*",
            element: <NotFound/>
         },
      ],
   },
]);

createRoot(document.getElementById("root")).render(
   <StrictMode>
      <RouterProvider router={router} />
   </StrictMode>
);
