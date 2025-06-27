import { NavLink } from "react-router";
import Logo from "../../assets/logo.png";

const Navbar = () => {
  return (
    <div className="fixed h-screen py-24 bg-green-nav/96 w-48 p-4 text-white">
      <nav className="flex flex-col justify-between items-center h-full">
        <img src={Logo} alt="Logo" className="mb-8 w-24 h-auto" />
        <ul className="space-y-8 text-lg">
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
        <button>Logout</button>
      </nav>
    </div>
  );
};

export default Navbar;
