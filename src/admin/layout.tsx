import { Outlet } from "react-router";
import Navbar from "./components/navbar";

const AdminLayout = () => {
  return (
    <div className="flex h-screen">
      <Navbar />
      <main className="">
        <div className="container ml-76 p-4">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
