import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import Star from "../assets/product/star.png";
import Cart from "../assets/product/cart.png";
import Placeholder from "../assets/product/placeholder.png";

interface ProductDetail {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[] | null;
}

const ProductDetails = () => {
  const { productid } = useParams<{ productid: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const rating = 5;

  const formatIDR = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  useEffect(() => {
    const fetchProduct = async () => {
      if (!productid) {
        setError("Product ID is required");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const res = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/api/products/${productid}`,
        );

        if (!res.ok) {
          if (res.status === 404) {
            throw new Error("Product not found");
          }
          throw new Error(`Failed to fetch product: ${res.status}`);
        }

        const data: ProductDetail = await res.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
        setError(error instanceof Error ? error.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productid]);

  const handleAddToCart = () => {
    if (product) {
      // Add to cart logic here
      console.log(`Added product ${product.id} to cart`);
    }
  };

  const handleBackToProducts = () => {
    navigate("/product");
  };

  if (loading) {
    return (
      <div className="container mx-auto p-4">
        <div className="flex justify-center items-center min-h-[400px]">
          <p className="text-lg">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4">
        <div className="flex flex-col justify-center items-center min-h-[400px]">
          <p className="text-red-500 text-lg mb-4">Error: {error}</p>
          <button
            onClick={handleBackToProducts}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Back
          </button>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto p-4">
        <div className="flex flex-col justify-center items-center min-h-[400px]">
          <p className="text-gray-500 text-lg mb-4">Product not found</p>
          <button
            onClick={handleBackToProducts}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  const images =
    product.images && product.images.length > 0
      ? product.images
      : [Placeholder];

  return (
    <div className="container mx-auto p-4 pt-20">
      <button
        onClick={handleBackToProducts}
        className="mb-4 text-blue-500 hover:text-blue-600 flex items-center"
      >
        ← Back
      </button>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Product Images */}
        <div className="flex-1">
          <div className="relative mb-4">
            <img
              src={images[selectedImageIndex]}
              alt={product.name}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>

          {/* Image Thumbnails */}
          {images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto">
              {images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${product.name} ${index + 1}`}
                  className={`w-20 h-20 object-cover rounded-lg cursor-pointer border-2 ${
                    selectedImageIndex === index
                      ? "border-blue-500"
                      : "border-gray-200"
                  }`}
                  onClick={() => setSelectedImageIndex(index)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>

          {/* Rating */}
          <div className="flex items-center mb-4">
            {Array.from({ length: rating }).map((_, index) => (
              <img key={index} src={Star} alt="Star" className="w-5 h-5" />
            ))}
            <span className="ml-2 text-gray-600">({rating}/5)</span>
          </div>

          {/* Price */}
          <div className="mb-6">
            <span className="text-4xl font-bold text-green-600">
              {formatIDR(product.price)}
            </span>
          </div>

          <div className="mb-6">
            <p className="text-gray-700 leading-relaxed">
              {product.description ||
                "No description available for this product."}
            </p>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="w-full bg-[#3E733D] hover:bg-[#2d5a2c] text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-colors"
          >
            <img src={Cart} alt="Cart" className="w-5 h-5" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
