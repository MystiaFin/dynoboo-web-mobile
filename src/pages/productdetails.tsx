import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { toast } from "sonner";
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
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

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

  const handleAddToCart = async () => {
    if (!product) return;

    setIsAddingToCart(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/items/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            productId: product.id,
            quantity: quantity,
          }),
        },
      );

      const result = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          toast.error("Please log in to add items to cart");
          navigate("/login");
          return;
        }
        throw new Error(
          result.error || `HTTP error! status: ${response.status}`,
        );
      }

      if (result.success) {
        toast.success(
          `${quantity} ${product.name}${quantity > 1 ? "s" : ""} added to cart!`,
        );
        setQuantity(1);
      } else {
        throw new Error(result.error || "Failed to add item to cart");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to add item to cart",
      );
    } finally {
      setIsAddingToCart(false);
    }
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
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

          {/* Quantity Selector */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Quantity
            </label>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => handleQuantityChange(quantity - 1)}
                disabled={quantity <= 1}
                className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                -
              </button>
              <span className="text-lg font-medium min-w-[2rem] text-center">
                {quantity}
              </span>
              <button
                onClick={() => handleQuantityChange(quantity + 1)}
                className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50"
              >
                +
              </button>
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            disabled={isAddingToCart}
            className="w-full bg-[#3E733D] hover:bg-[#2d5a2c] text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isAddingToCart ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Adding...
              </>
            ) : (
              <>
                <img src={Cart} alt="Cart" className="w-5 h-5" />
                Add {quantity} to Cart
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
