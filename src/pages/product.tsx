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

const ProductPage = () => {
  // Fix: Properly type the state as Product[]
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

        const data = await res.json();

        // Map the API response to your Product interface
        const formatted: Product[] = data.map((product: any) => ({
          id: product.id,
          name: product.name,
          price: product.price,
          // Use the first image from the images array, fallback to placeholder
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
          <p>Loading products...</p>
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
          <p className="text-red-500">Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <HomeSliders />
      <div className="container mx-auto p-4">
        <div className="flex flex-wrap px-3 py-5 gap-3 justify-center align-center">
          {productList.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
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
