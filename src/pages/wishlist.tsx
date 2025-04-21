import Placeholder from "../assets/product/placeholder.png";
import WishItems from "../components/wishitems";

const WishList = () => {
  const itemsList = [
    {
      id: 1,
      name: "Item 1",
      brand: "Brand A",
      image: Placeholder,
      price: "10.000",
      normalprice: "15.000",
    },
  ];
  return (
    <div>
      <section className="flex flex-wrap px-3 py-5 gap-3 justify-center align-center">
        {itemsList.map((product) => (
          <WishItems key={product.id} {...product} />
        ))}
      </section>
    </div>
  );
};

export default WishList;
