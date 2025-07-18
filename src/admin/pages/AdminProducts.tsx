import { useState, useEffect } from "react";
import { NavLink } from "react-router";
import Placeholder from "../../assets/product/placeholder.png";
import ProductCard from "../components/adminproductcard";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
}

interface ApiProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[] | null;
}

const ProductPage = () => {
  const [productList, setProductList] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/api/products/get`,
        );
        if (!res.ok) {
          throw new Error(`Failed to fetch products: ${res.status}`);
        }
        const data: ApiProduct[] = await res.json();
        const formatted: Product[] = data.map((product) => ({
          id: product.id,
          name: product.name,
          price: product.price,
          image:
            product.images && product.images.length > 0
              ? product.images[0]
              : Placeholder,
        }));
        setProductList(formatted);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError(error instanceof Error ? error.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleProductDelete = (productId: string) => {
    setProductList((prevList) =>
      prevList.filter((product) => product.id !== productId),
    );
  };

  const renderContent = () => {
    if (loading) {
      return <p className="text-lg">Loading products...</p>;
    }

    if (error) {
      return <p className="text-red-500 text-lg">Error: {error}</p>;
    }

    if (productList.length === 0) {
      return <p className="text-lg text-gray-500">No products available</p>;
    }

    return (
      <div className="flex flex-wrap px-3 py-5 gap-3 justify-center items-center">
        {productList.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            price={product.price}
            image={product.image}
            onDelete={handleProductDelete}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="container mx-auto p-4">
      <NavLink to="/admin/new-product">
        <span className="inline-flex items-center justify-center w-12 h-12 bg-green-600 text-white rounded hover:bg-green-700 transition text-3xl">
          +
        </span>
      </NavLink>
      <div className="flex justify-center items-center min-h-[200px]">
        {renderContent()}
      </div>
    </div>
  );
};

export default ProductPage;
