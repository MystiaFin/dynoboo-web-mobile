import { useState, useEffect } from "react";
import HomeSliders from "../components/homesliders";
import ProductCard from "../components/productcard";
import Placeholder from "../assets/product/placeholder.png";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

// API response interface to match your JSON structure
interface ApiProduct {
  id: number;
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

        // Map the API response to your Product interface
        const formatted: Product[] = data.map((product) => ({
          id: product.id,
          name: product.name,
          price: product.price,
          // Handle both null and empty array cases
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

  // Handle loading state
  if (loading) {
    return (
      <div>
        <HomeSliders />
        <div className="container mx-auto p-4">
          <div className="flex justify-center items-center min-h-[200px]">
            <p className="text-lg">Loading products...</p>
          </div>
        </div>
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <div>
        <HomeSliders />
        <div className="container mx-auto p-4">
          <div className="flex justify-center items-center min-h-[200px]">
            <p className="text-red-500 text-lg">Error: {error}</p>
          </div>
        </div>
      </div>
    );
  }

  // Handle empty state
  if (productList.length === 0) {
    return (
      <div>
        <HomeSliders />
        <div className="container mx-auto p-4">
          <div className="flex justify-center items-center min-h-[200px]">
            <p className="text-lg text-gray-500">No products available</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <HomeSliders />
      <div className="container mx-auto p-4">
        <div className="flex flex-wrap px-3 py-5 gap-3 justify-center items-center">
          {productList.map((product) => (
            <ProductCard
              key={product.id}
              name={product.name}
              price={product.price}
              image={product.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
