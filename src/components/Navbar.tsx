const hamburgerStyle: string =
  "mb-[6px] w-[28px] h-[8px] block bg-[#3A603B] rounded-r-xs";

const Navbar = () => {
  return (
    <div className="font-secondary">
      {/* Hamburger Menu Button */}
      <div className="flex mt-[10%] items-center gap-7">
        <button className="flex flex-col items-center justify-center">
          {[0, 1, 2].map((index) => (
            <span key={index} className={hamburgerStyle}></span>
          ))}
        </button>
        <div className="flex flex-col mb-2">
          <span>DynoBoo Logo</span>
          <span className="text-xs">Slogan</span>
        </div>
      </div>
      <nav></nav>
    </div>
  );
};

export default Navbar;
