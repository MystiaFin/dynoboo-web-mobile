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
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${homeBackground})` }}
    >
      <div className="flex flex-col justify-center container mx-auto px-4 pt-5">
        <div className="flex flex-col justify-center items-center text-center mt-6">
          <h2 className="font-black text-4xl sm:text-2xl md:text-3xl mb-2">
            Welcome
          </h2>
          <h3 className="font-medium text-2xl mb-2">to</h3>
          <span className="px-2 py-1 rounded-full bg-white/50 font-medium text-2xl text-[#FAAC01] mb-2">
            DynooBoo Store
          </span>
        </div>
        <div className="flex justify-center">
          <img
            src={homeLogo}
            alt="Home Logo"
            className="w-[80%] h-auto sm:max-w-xs"
          />
        </div>
        <div className="flex justify-center items-center gap-4">
          <button className={buttonStyle}>Sign In</button>
          <button className={buttonStyle}>Sign up</button>
        </div>
        <span className="text-[#F7A600] font-bold text-center mt-4">
          Skip for now
        </span>
        <div className="flex justify-center items-center gap-4 mt-6">
          {authContent.map((icon: any, index) => (
            <a
              href="#"
              key={index}
              className="hover:opacity-80 transition-opacity"
            >
              <img
                src={icon.default}
                alt={`Auth option ${index + 1}`}
                className="bg-white rounded-lg p-2 w-12 h-12 object-contain"
              />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
export default App;
