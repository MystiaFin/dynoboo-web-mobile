import React from "react";
import { useNavigate } from "react-router";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  onDelete?: (productId: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  price,
  image,
  onDelete,
}) => {
  const navigate = useNavigate();

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();

    try {
      fetch(`${import.meta.env.VITE_API_BASE_URL}/api/products/delete/${id}`, {
        method: "DELETE",
        credentials: "include",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Failed to delete product: ${response.status}`);
          }
          return response.json();
        })
        .then(() => {
          console.log("Product deleted successfully");
          if (onDelete) {
            onDelete(id);
          }
        });
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleClick = () => {
    navigate(`/product/${id}`);
  };

  return (
    <main
      className="flex flex-col mb-5 cursor-pointer relative"
      onClick={handleClick}
    >
      <header className="relative">
        <img
          src={image}
          alt="Product"
          className="w-[110px] h-[120px] rounded-lg relative"
        />
        <div className="absolute top-0 left-0 bg-[#3E733D] m-1 rounded-md text-white font-bold px-2 py-1 text-xs">
          NEW
        </div>
      </header>

      <footer className="flex flex-col relative">
        <span className="pl-1">{name}</span>
        <span className="pr-3 text-right">{price}</span>

        <button
          onClick={handleDelete}
          className="absolute bottom-0 left-0 bg-red-500 hover:bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold transition-colors duration-200"
          aria-label="Delete product"
        >
          ×
        </button>
      </footer>
    </main>
  );
};

export default ProductCard;
