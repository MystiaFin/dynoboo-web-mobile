interface WishItemsProps {
  id: number;
  name: string;
  brand: string;
  normalprice: string;
  price: string;
  image: string;
  isNew: boolean;
}

const WishItems: React.FC<WishItemsProps> = ({
  id,
  name,
  brand,
  normalprice,
  price,
  image,
  isNew, // Assuming isNew is not used in this component
}) => {
  return (
    <main className="w-full mt-[20%] flex flex-row mb-5 justify-between items-center">
      <section className="flex gap-2">
        <img src={image} alt="Product" className="" />
        <div className="flex flex-col">
          <span
            className={`bg-gray-300 w-[45px] py-1 text-center rounded-md text-xs font-bold ${
              isNew ? "flex" : "hidden"
            }`}
          >
            BARU
          </span>
          <h3 className="font-extralight">{brand}</h3>
          <h2>{name}</h2>
          <span className="font-light">{id}</span>
          <button className="flex justify-center bg-white shadow-md w-[35px] h-[35px] rounded-full items-center mt-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
              />
            </svg>
          </button>
        </div>
      </section>
      <div className="flex flex-col justify-end">
        <span className="text-red-500 text-right font-bold">Rp{price}</span>
        <span className="text-xs font-light">
          Harga Normal: Rp.{normalprice}
        </span>
      </div>
    </main>
  );
};

export default WishItems;
