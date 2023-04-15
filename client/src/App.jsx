import Navbar from "./components/Navbar/Navbar";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Home from "./pages/home/Home";

import Register from "./pages/auth/Register";
import { useState } from "react";
import Login from "./pages/auth/Login";
import Profile from "./pages/profile/Profile";
import CreateFamily from "./pages/family/createFamily/CreateFamily";
import CreateSection from "./pages/sections/createSection/CreateSection";
import Family from "./pages/family/familyDetails/Family";
import SectionDetails from "./pages/sections/sectionDetails/SectionDetails";
import Sections from "./pages/sections/sections/Sections";
import AddMember from "./pages/family/addMember/AddMember";
import CreateProduct from "./pages/products/createProduct/CreateProduct";
import Cart from "./pages/cart/Cart";

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
              <Profile setShowNav={setShowNav} />
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
        {
          path: "/family/member",
          element: (
            <>
              <AddMember
                setShowNav={setShowNav}
                setShowFooter={setShowFooter}
              />
            </>
          ),
        },
        {
          path: "/section/create",
          element: (
            <>
              <CreateSection
                setShowNav={setShowNav}
                setShowFooter={setShowFooter}
              />
            </>
          ),
        },
        {
          path: "/section/:id",
          element: (
            <>
              <SectionDetails
                setShowNav={setShowNav}
                setShowFooter={setShowFooter}
              />
            </>
          ),
        },
        {
          path: "/section/:id/product/create",
          element: (
            <>
              <CreateProduct
                setShowNav={setShowNav}
                setShowFooter={setShowFooter}
              />
            </>
          ),
        },
        {
          path: "/family",
          element: (
            <>
              <Family setShowNav={setShowNav} setShowFooter={setShowFooter} />
            </>
          ),
        },
        {
          path: "/sections",
          element: (
            <>
              <Sections setShowNav={setShowNav} setShowFooter={setShowFooter} />
            </>
          ),
        },
        {
          path: "/cart",
          element: (
            <>
              <Cart setShowNav={setShowNav} setShowFooter={setShowFooter} />
            </>
          ),
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
