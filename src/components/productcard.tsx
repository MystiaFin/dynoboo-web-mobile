import Rating from "../assets/product/rating.png";
import Star from "../assets/product/star.png";
import Cart from "../assets/product/cart.png";
import React from "react";

interface ProductCardProps {
  name: string;
  price: string;
  image: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ name, price, image }) => {
  const rating = 5;

  return (
    <div className="flex flex-col mb-5">
      <div className="relative">
        <img
          src={image}
          alt="Product"
          className="w-[110px] h-[120px] rounded-lg relative"
        />
        <div className="absolute top-0 left-0 bg-[#3E733D] m-1 rounded-md text-white font-bold px-2 py-1 text-xs">
          NEW
        </div>
        <img src={Cart} className="absolute bottom-0 right-0" />
      </div>

      {/* Display stars based on rating */}
      <div className="flex items-center mt-2 mb-2">
        {Array.from({ length: rating }).map((_, index) => (
          <img key={index} src={Star} alt="Star" className="w-5 h-5" />
        ))}
      </div>
      <span className="pl-1">{name}</span>
      <span className="pr-3 text-right">{price}</span>
      <img src={Rating} alt="Rating" className="max-w-8" />
    </div>
  );
};

export default ProductCard;
