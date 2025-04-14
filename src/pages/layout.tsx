import { Outlet } from "react-router";
import Hamburger from "../components/hamburger";

const layout = () => {
  return (
    <>
      <Hamburger />
      <Outlet />
    </>
  );
};

export default layout;
