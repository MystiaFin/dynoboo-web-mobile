import { Outlet } from "react-router";
import Hamburger from "../components/hamburger";

const layout = () => {
  return (
    <div>
      <Hamburger />
      <Outlet />
    </div>
  );
};

export default layout;
