import dynoRight from "../assets/landing/dyno-right.png";
import dynoLeft from "../assets/landing/dyno-left.png";
import { NavLink } from "react-router";

const Landing = () => {
  return (
    <main className="font-secondary">
      <section className="ml-[8%] flex flex-col">
        <h1 className="mt-[45%] font-bold text-4xl mb-4 text-[#5a7e51]">
          Handmade
        </h1>
        <h2 className="font-bold text-5xl text-[#3A603B] ">Craftshop</h2>
        <button className="mt-[40%] w-38 h-13 bg-[#3A603B] text-white py-3 px-6 rounded-full font-bold">
          <NavLink to="/product">
            <span className="cursor-pointer">Order Now</span>
          </NavLink>
        </button>
      </section>
      <section>
        <img
          src={dynoRight}
          alt="Dyno Right"
          className="absolute right-0 bottom-0 -z-1"
        />
        <img
          src={dynoLeft}
          alt="Dyno Left"
          className="absolute left-0 bottom-0 -z-1"
        />
      </section>
    </main>
  );
};

export default Landing;
