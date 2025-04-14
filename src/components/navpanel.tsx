import AvatarPlaceholder from "../assets/navbar/avatar-placeholder.png";

const NavItems = ["Products", "Whishlist", "Order Catalog", "Contact Us"];
const listItems = NavItems.map((item, index) => (
  <li key={index} className="text-white mb-[50%] text-lg">
    {item}
  </li>
));

interface NavPanelState {
  isOpen: boolean;
  onClose: () => void;
}

const NavPanel = ({ isOpen, onClose }: NavPanelState) => {
  return (
    <div
      className={`fixed w-[54%] h-screen bg-[#3A603BF5]/96 top-0 transition-transform duration-300 ease-in-out z-30 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex flex-col justify-center items-center mt-[45%] gap-5">
        <button
          onClick={onClose}
          className="absolute top-0 right-0 p-4 text-white cursor-pointer hover:text-gray-300"
          aria-label="Close navigation panel"
        >
          close
        </button>
        <div className="flex flex-col items-center justify-center gap-2 mb-10 text-white">
          <img src={AvatarPlaceholder} alt="Avatar placeholder" />
          <span>Haven't signed yet?</span>
          <span className="cursor-pointer">Sign in / Sign up</span>
        </div>
        <nav>
          <ul className="">{listItems}</ul>
        </nav>
      </div>
    </div>
  );
};

export default NavPanel;
