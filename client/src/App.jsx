import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Home from "../pages/home/Home";
function App() {
  const Layout = () => {
    return (
      <div className="app">
        <Navbar />
        <Outlet />
        <Footer />
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
          element: <Home />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
