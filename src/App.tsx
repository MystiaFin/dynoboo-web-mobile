import "./App.css";
import homeLogo from "./assets/landingAuth/logo.png";
import homeBackground from "./assets/landingAuth/background.png";
import { NavLink } from "react-router";
import AuthGoogle from "./assets/auth/google.svg";
const buttonStyle: string = "bg-white rounded-full px-7 py-3 font-medium";

function App() {
  return (
    <main
      className="font-secondary fixed inset-0 flex items-center justify-center bg-cover bg-center bg-no-repeat -z-15"
      style={{ backgroundImage: `url(${homeBackground})` }}
    >
      <div className="flex flex-col justify-center items-center container mx-auto">
        <header className="flex flex-col justify-center items-center text-center">
          <div className="absolute w-64 h-64 rounded-full bg-white/30 blur-xl radial-gradient -z-10"></div>
          <h2 className="font-black text-3xl sm:text-2xl md:text-3xl mb-2">
            Welcome
          </h2>
          <h3 className="font-medium text-xl mb-2">to</h3>
          <span className="px-3 py-2 rounded-full bg-white/50 font-medium text-xl text-[#FAAC01] mb-2">
            DynooBoo Store
          </span>
        </header>
        <section className="flex justify-center">
          <img
            src={homeLogo}
            alt="Home Logo"
            className="w-52 h-auto mt-5 mb-2 pb-2"
          />
        </section>
        <div className="flex justify-center items-center gap-4 pb-[4%]">
          <button className={buttonStyle}>Sign In</button>
          <button className={buttonStyle}>Sign up</button>
        </div>
        <span className="text-[#F7A600] font-bold text-center mt-4 pb-[4%]">
          <NavLink to="/landing">
            <span className="cursor-pointer">Skip for now</span>
          </NavLink>
        </span>
        <footer className="flex px-4 py-2 bg-white flex-row justify-center items-center rounded-full gap-2">
          <img src={AuthGoogle} className="w-10 h-10" />
          <span>Sign in with Google</span>
        </footer>
        <div className="absolute bottom-0 left-0 w-full h-[35%] bg-gradient-to-b from-white/40 to-transparent -z-10"></div>
      </div>
    </main>
  );
}
export default App;
