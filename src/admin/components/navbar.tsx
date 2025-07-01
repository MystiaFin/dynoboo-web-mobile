import { NavLink, useNavigate } from "react-router";
import { useState } from "react";
import Logo from "../../assets/logo.png";

const Navbar = () => {
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const buttonLogout = async () => {
    setIsLoggingOut(true);
    console.log("Logout button clicked");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/user/logout`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (response.ok) {
        console.log("Logout successful");
        navigate("/signin");
      } else {
        const errorData = await response.json();
        console.error("Logout failed:", errorData.error);
      }
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="fixed h-screen py-24 bg-green-nav/96 w-68 p-4 text-white">
      <nav className="flex flex-col justify-between items-center h-full">
        <img src={Logo} alt="Logo" className="mb-8 w-34 h-auto" />
        <ul className="space-y-8 text-xl">
          <li>
            <NavLink to="/admin">Dashboard</NavLink>
          </li>
          <li>
            <NavLink to="/admin/products">Products</NavLink>
          </li>
          <li>
            <NavLink to="/admin/orders">Orders</NavLink>
          </li>
        </ul>
        <button
          onClick={buttonLogout}
          disabled={isLoggingOut}
          className={`text-xl w-46 py-2 rounded-full cursor-pointer transition-colors ${
            isLoggingOut
              ? "bg-red-600 cursor-not-allowed"
              : "bg-red-800 hover:bg-red-700"
          }`}
        >
          {isLoggingOut ? "Logging out..." : "Logout"}
        </button>
      </nav>
    </div>
  );
};

export default Navbar;
