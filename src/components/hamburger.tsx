import { useState } from "react";
import NavPanel from "./navpanel";

const hamburgerStyle: string =
  "mb-[6px] w-[28px] h-[8px] block bg-[#3A603B] rounded-r-xs";

const Hamburger = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavPanel = () => {
    setIsOpen(!isOpen);
  };

  const closeNavPanel = () => {
    setIsOpen(false);
  };

  return (
    <div className="font-secondary">
      {/* Hamburger Menu Button */}
      <div
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
      </div>

      {/* Nav Panel */}
      <NavPanel isOpen={isOpen} onClose={closeNavPanel} />
    </div>
  );
};

export default Hamburger;
