import { useState, useEffect } from "react";
import { toast } from "sonner";

interface CartItem {
  id: string;
  quantity: number;
  price: number;
  product: {
    id: string;
    name: string;
    description: string;
    price: number;
    images: string[] | null;
  };
}

interface CartData {
  id: number | null;
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  createdAt?: string;
  updatedAt?: string;
}

const Cart = () => {
  const [cart, setCart] = useState<CartData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const formatIDR = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const fetchCart = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/items/`,
        {
          method: "GET",
          credentials: "include",
        },
      );

      const result = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Please log in to view your cart");
        }
        throw new Error(
          result.error || `HTTP error! status: ${response.status}`,
        );
      }

      if (result.success) {
        setCart(result.cart);
      } else {
        throw new Error(result.error || "Failed to fetch cart");
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
      setError(error instanceof Error ? error.message : "Failed to fetch cart");
      toast.error(
        error instanceof Error ? error.message : "Failed to fetch cart",
      );
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (itemId: string, newQuantity: number) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/items/update/${itemId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ quantity: newQuantity }),
        },
      );

      const result = await response.json();

      if (result.success) {
        toast.success("Quantity updated successfully");
        fetchCart(); // Refresh cart data
      } else {
        throw new Error(result.error || "Failed to update quantity");
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to update quantity",
      );
    }
  };

  const removeItem = async (itemId: string) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/items/delete/${itemId}`,
        {
          method: "DELETE",
          credentials: "include",
        },
      );

      const result = await response.json();

      if (result.success) {
        toast.success("Item removed from cart");
        fetchCart();
      } else {
        throw new Error(result.error || "Failed to remove item");
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to remove item",
      );
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto p-4">
        <div className="flex justify-center items-center min-h-[400px]">
          <p className="text-lg">Loading cart...</p>
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
            onClick={fetchCart}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className="container mx-auto p-4 pt-20">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg mb-4">Your cart is empty</p>
          <a
            href="/product"
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg inline-block"
          >
            Continue Shopping
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 pt-20">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cart.items.map((item) => (
            <div
              key={item.id}
              className="bg-white border rounded-lg p-4 flex gap-4"
            >
              {/* Product Image */}
              <div className="w-24 h-24 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                <img
                  src={item.product.images?.[0] || "/placeholder.png"}
                  alt={item.product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Product Details */}
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-2">
                  {item.product.name}
                </h3>
                <p className="text-gray-600 text-sm mb-2">
                  {item.product.description}
                </p>
                <p className="text-green-600 font-bold">
                  {formatIDR(item.product.price)}
                </p>
              </div>

              {/* Quantity Controls */}
              <div className="flex flex-col items-end gap-2">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                    className="w-8 h-8 rounded border flex items-center justify-center hover:bg-gray-50 disabled:opacity-50"
                  >
                    -
                  </button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="w-8 h-8 rounded border flex items-center justify-center hover:bg-gray-50"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => removeItem(item.id)}
                  className="text-red-500 hover:text-red-700 text-sm"
                >
                  Remove
                </button>

                <p className="text-sm font-medium">
                  {formatIDR(parseFloat(item.price.toString()) * item.quantity)}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Cart Summary */}
        <div className="bg-white border rounded-lg p-6 h-fit">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>

          <div className="space-y-2 mb-4">
            <div className="flex justify-between">
              <span>Items ({cart.totalItems}):</span>
              <span>{formatIDR(cart.totalPrice)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping:</span>
              <span>Free</span>
            </div>
            <hr className="my-2" />
            <div className="flex justify-between font-bold text-lg">
              <span>Total:</span>
              <span className="text-green-600">
                {formatIDR(cart.totalPrice)}
              </span>
            </div>
          </div>

          <button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
