import Navbar from "../components/Navbar";
import dynoRight from "../assets/landing/dyno-right.png";
import dynoLeft from "../assets/landing/dyno-left.png";

const Landing = () => {
  return (
    <div className="font-secondary">
      <Navbar />
      <div className="ml-[8%] mt-[14%] flex flex-col">
        <span className="font-bold text-4xl mb-4 text-[#5a7e51]">Handmade</span>
        <span className="font-bold text-6xl text-[#3A603B] ">Craftshop</span>
        <button className="mt-[40%] w-40 h-15 bg-[#3A603B] text-white py-3 px-8 rounded-full font-bold">
          Order Here
        </button>
      </div>
      <div>
        <img
          src={dynoRight}
          alt="Dyno Right"
          className="absolute right-0 bottom-0"
        />
        <img
          src={dynoLeft}
          alt="Dyno Left"
          className="absolute left-0 bottom-0"
        />
      </div>
    </div>
  );
};

export default Landing;
