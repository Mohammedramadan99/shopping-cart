import Navbar from "./components/Navbar/Navbar";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Home from "./pages/home/Home";

import Register from "./pages/auth/Register";
import { useState } from "react";
import Login from "./pages/auth/Login";
import Profile from "./pages/profile/Profile";
import CreateFamily from "./pages/createFamily/CreateFamily";
function App() {
  const [showNav, setShowNav] = useState(true);
  const [showFooter, setShowFooter] = useState(true);
  const Layout = () => {
    return (
      <div className="app">
        {showNav && <Navbar />}
        <Outlet />
      </div>
    );
  };
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: (
            <>
              <Home setShowNav={setShowNav} setShowFooter={setShowFooter} />
            </>
          ),
        },
        {
          path: "/login",
          element: (
            <>
              <Login setShowNav={setShowNav} setShowFooter={setShowFooter} />
            </>
          ),
        },
        {
          path: "/register",
          element: (
            <>
              <Register setShowNav={setShowNav} setShowFooter={setShowFooter} />
            </>
          ),
        },
        {
          path: "/profile",
          element: (
            <>
              <Profile />
            </>
          ),
        },
        {
          path: "/family/create",
          element: (
            <>
              <CreateFamily
                setShowNav={setShowNav}
                setShowFooter={setShowFooter}
              />
            </>
          ),
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
