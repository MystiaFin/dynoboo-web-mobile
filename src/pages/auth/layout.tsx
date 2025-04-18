import { Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <div>
      hello there
      <Outlet />
    </div>
  );
};

export default AuthLayout;
