import { useState } from "react";
import NavPanel from "./navpanel";
import { NavLink, useLocation } from "react-router";

import WishIcon from "../assets/navbar/whishlist.svg";
import CartIcon from "../assets/navbar/cart.svg";

const hamburgerStyle: string =
  "mb-[6px] w-[28px] h-[8px] block bg-[#3A603B] rounded-r-xs";

const Hamburger = () => {
  const location = useLocation();
  const isLandingPage = location.pathname === "/landing";

  const [isOpen, setIsOpen] = useState(false);

  const toggleNavPanel = () => {
    setIsOpen(!isOpen);
  };

  const closeNavPanel = () => {
    setIsOpen(false);
  };

  return (
    <main className="font-secondary">
      {/* Solid Background div */}
      <div className="fixed z-20 bg-[#ececea] w-full h-22"></div>

      <section
        className={`flex mt-[10%] items-center gap-7 fixed z-20 transition-transform duration-300 ease-in-out ${
          isOpen ? "-translate-x-full" : "translate-x-0"
        }`}
      >
        <button
          className="flex flex-col items-center justify-center"
          onClick={toggleNavPanel}
          aria-label="Toggle navigation menu"
        >
          {[0, 1, 2].map((index) => (
            <span key={index} className={hamburgerStyle}></span>
          ))}
        </button>
        <div className="flex flex-col mb-2">
          <span>DynoBoo Logo</span>
          <span className="text-xs">Slogan</span>
        </div>
      </section>

      <div
        className="flex items-center fixed right-0 mt-[10%] z-30 mr-3 gap-2"
        style={{ display: isLandingPage ? "none" : "flex" }}
      >
        <NavLink to="/wishlist">
          <img src={WishIcon} alt="wishlist" />
        </NavLink>
        <NavLink to="/cart">
          <img src={CartIcon} alt="order" className="pb-1" />
        </NavLink>
      </div>
      {/* Nav Panel */}
      <NavPanel isOpen={isOpen} onClose={closeNavPanel} />
    </main>
  );
};

export default Hamburger;
