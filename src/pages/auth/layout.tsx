import { Outlet, NavLink } from "react-router";
import { useLocation } from "react-router-dom";
import Background from "../../assets/landingAuth/background.png";
import Logo from "../../assets/landingAuth/logo.png";

const AuthLayout = () => {
  const location = useLocation();
  const isSignIn = location.pathname === "/signin";

  return (
    <main
      className="fixed inset-0 flex items-center justify-center bg-cover bg-center bg-no-repeat -z-15"
      style={{ backgroundImage: `url(${Background})` }}
    >
      <div className="top-[-220px] absolute w-128 h-128 rounded-full -z-10 bg-[radial-gradient(circle,_#D9D9D9_0%,_#ACF154B2_100%)]"></div>
      <section className="flex flex-col justify-start items-center mt-24 min-h-[600px] w-full max-w-[500px]">
        <img src={Logo} alt="Home Logo" className="w-52 h-auto mt-2 mb-6" />
        <div
          className="flex gap-12 py-1 px-4 border border-[#FAAC01] rounded-lg font-black text-2xl transition-all duration-700"
          style={{
            backgroundImage:
              "linear-gradient(to right, #F7F8AA 0%, white 45%, white 55%, #F7F8AA 100%)",
            backgroundSize: "200% 100%",
            backgroundPosition: isSignIn ? "0% 0%" : "100% 0%",
          }}
        >
          <NavLink to="/signin">Sign In</NavLink>
          <NavLink to="/signup">Sign Up</NavLink>
        </div>

        <div className="mt-10 w-full">
          <Outlet />
        </div>
      </section>
      <div className="fixed bg-[linear-gradient(to_top,_rgba(247,248,170,1)_0%,_rgba(247,248,170,0.5)_40%,_rgba(255,255,255,0.5)_100%)] w-full h-86 bottom-0 rounded-2xl -z-20"></div>
    </main>
  );
};

export default AuthLayout;
