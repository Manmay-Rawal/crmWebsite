import { createBrowserRouter } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Navbar from "./pages/Navbar";
import Home from "./pages/Home";
import LoginOTP from "./pages/LoginOTP";
import AdminDashboard from "./pages/Admin/AdminDashboard";

export let routes = createBrowserRouter([
  {
    path: "/",
    element:(<>
     <Navbar />
      <Home/>
    </>),
  },
  {
    path: "/login",
    element: (<>
      <Navbar />
      <Login />
    </>)
  },
  {
    path: "/admin-dashboard",
    element: (<>
      <Navbar />
      <AdminDashboard />
    </>)
  },
  {
    path: "/loginotp",
    element: (<>
      <LoginOTP/>
    </>)
  },
  {
    path: "/signup",
    element: (<>
      
      <SignUp />
    </>)
  },

  {
    path: "*",
    element: <div>Page Not Found</div>,
  },
]);
