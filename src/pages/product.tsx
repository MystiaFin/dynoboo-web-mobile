import HomeSliders from "../components/homesliders";
import ProductCard from "../components/productcard";
import Placeholder from "../assets/product/placeholder.png";

const Product = () => {
  const productList = [
    { id: 1, name: "Product 1", price: "$10", image: Placeholder },
    { id: 2, name: "Product 2", price: "$20", image: Placeholder },
    { id: 3, name: "Product 3", price: "$30", image: Placeholder },
    { id: 4, name: "Product 4", price: "$40", image: Placeholder },
    { id: 5, name: "Product 5", price: "$50", image: Placeholder },
  ];
  return (
    <main className="pt-24">
      <HomeSliders />
      <section className="flex flex-wrap px-3 py-5 gap-3 justify-center align-center">
        {productList.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </section>
    </main>
  );
};

export default Product;
