import homeLogo from "./assets/home/logo.png";
import homeBackground from "./assets/home/background.png";
const buttonStyle: string = "bg-white rounded-full px-8 py-4 font-medium";

const authImages = import.meta.glob("./assets/auth/*.{png,jpg,jpeg,svg}", {
  eager: true,
});

function App() {
  const authContent = Object.values(authImages);

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-cover bg-center bg-no-repeat -z-15"
      style={{ backgroundImage: `url(${homeBackground})` }}
    >
      <div className="flex flex-col justify-center items-center container mx-auto">
        <div className="flex flex-col justify-center items-center text-center">
          <div className="absolute w-64 h-64 rounded-full bg-white/30 blur-xl radial-gradient -z-10"></div>
          <h2 className="font-black text-4xl sm:text-2xl md:text-3xl mb-2 pb-[4%]">
            Welcome
          </h2>
          <h3 className="font-medium text-2xl mb-2 pb-[4%]">to</h3>
          <span className="px-2 py-1 rounded-full bg-white/50 font-medium text-2xl text-[#FAAC01] mb-2 pb-[4%]">
            DynooBoo Store
          </span>
        </div>
        <div className="flex justify-center">
          <img
            src={homeLogo}
            alt="Home Logo"
            className="w-[75%] h-auto mt-5 mb-5 pb-[4%]"
          />
        </div>
        <div className="flex justify-center items-center gap-4 pb-[4%]">
          <button className={buttonStyle}>Sign In</button>
          <button className={buttonStyle}>Sign up</button>
        </div>
        <span className="text-[#F7A600] font-bold text-center mt-4 pb-[4%]">
          Skip for now
        </span>
        <div className="flex justify-center items-center gap-4 mt-6 pb-[4%]">
          {authContent.map((icon: any, index) => (
            <a
              href="#"
              key={index}
              className="hover:opacity-80 transition-opacity pb-[4%]"
            >
              <img
                src={icon.default}
                alt={`Auth option ${index + 1}`}
                className="bg-white rounded-lg p-2 w-12 h-12 object-contain"
              />
            </a>
          ))}
        </div>
        <div className="absolute bottom-0 left-0 w-full h-[35%] bg-gradient-to-b from-white/40 to-transparent -z-10"></div>
      </div>
    </div>
  );
}
export default App;
