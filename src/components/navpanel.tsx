import AvatarPlaceholder from "../assets/navbar/avatar-placeholder.png";

const NavItems = ["Products", "Whishlist", "Order Catalog", "Contact Us"];
const listItems = NavItems.map((item, index) => (
  <li key={index} className="text-white mb-[35%] text-lg">
    {item}
  </li>
));

interface NavPanelState {
  isOpen: boolean;
  onClose: () => void;
}

const NavPanel = ({ isOpen, onClose }: NavPanelState) => {
  return (
    <aside
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-6"
          >
            <path
              fillRule="evenodd"
              d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <header className="flex flex-col items-center justify-center gap-2 mb-10 text-white">
          <img src={AvatarPlaceholder} alt="Avatar placeholder" />
          <span>Haven't signed yet?</span>
          <span className="cursor-pointer">Sign in / Sign up</span>
        </header>
        <nav>
          <ul className="">{listItems}</ul>
        </nav>
      </div>
    </aside>
  );
};

export default NavPanel;
