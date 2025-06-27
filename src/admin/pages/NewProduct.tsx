import { useState, useRef } from "react";
import { X, Upload, Loader2 } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { toast } from "sonner";

interface ImagePreview {
  file: File;
  id: string;
  preview: string;
}

const AdminNewProduct = () => {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const [productName, setProductName] = useState<string>("");
  const [productDescription, setProductDescription] = useState<string>("");
  const [productPrice, setProductPrice] = useState<string>("");
  const [productImages, setProductImages] = useState<ImagePreview[]>([]);
  const [isDragOver, setIsDragOver] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (authLoading) {
    return (
      <div className="p-6 flex justify-center items-center min-h-[400px]">
        <div className="flex items-center space-x-2">
          <Loader2 className="w-6 h-6 animate-spin" />
          <span>Loading...</span>
        </div>
      </div>
    );
  }
  if (!isAuthenticated) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <h2 className="text-lg font-semibold text-red-800 mb-2">
            Access Denied
          </h2>
          <p className="text-red-700">
            You must be logged in to access this page.
          </p>
        </div>
      </div>
    );
  }

  const handleFileSelect = (files: FileList | null) => {
    if (!files) return;

    const validFiles = Array.from(files).filter((file) => {
      return file.type.startsWith("image/") && file.size <= 5 * 1024 * 1024; // 5MB limit
    });

    const newImages: ImagePreview[] = validFiles.map((file) => ({
      file,
      id: Math.random().toString(36).substr(2, 9),
      preview: URL.createObjectURL(file),
    }));

    setProductImages((prev) => [...prev, ...newImages]);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFileSelect(e.target.files);
  };

  const removeImage = (id: string) => {
    setProductImages((prev) => {
      const imageToRemove = prev.find((img) => img.id === id);
      if (imageToRemove) {
        URL.revokeObjectURL(imageToRemove.preview);
      }
      return prev.filter((img) => img.id !== id);
    });
  };

  const resetForm = () => {
    setProductName("");
    setProductDescription("");
    setProductPrice("");
    // Clean up image previews
    productImages.forEach((img) => URL.revokeObjectURL(img.preview));
    setProductImages([]);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("name", productName);
      formData.append("description", productDescription);
      formData.append("price", productPrice);
      productImages.forEach((image) => {
        formData.append("images", image.file);
      });

      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/products/create`,
        {
          method: "POST",
          body: formData,
          credentials: "include",
        },
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.error || `HTTP error! status: ${response.status}`,
        );
      }

      if (result.success) {
        toast.success(`Product created with ${productImages.length} images`);
        resetForm();
      } else {
        throw new Error(result.error || "Failed to create product");
      }
    } catch (error) {
      console.error("Error creating product:", error);
      toast.error(
        `${error instanceof Error ? error.message : "Unknown error occurred"}`,
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    if (
      window.confirm("Are you sure you want to cancel? All data will be lost.")
    ) {
      resetForm();
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Add New Product</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Product Name *
          </label>
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            type="text"
            value={productName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setProductName(e.target.value)
            }
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Product Description
          </label>
          <textarea
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={3}
            value={productDescription}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setProductDescription(e.target.value)
            }
            placeholder="Optional description of the product"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Price *
          </label>
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            type="number"
            step="0.01"
            min="0.01"
            value={productPrice}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setProductPrice(e.target.value)
            }
            required
          />
        </div>

        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">
            Product Images
          </label>

          {/* File Upload Area */}
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              isDragOver
                ? "border-blue-500 bg-blue-50"
                : "border-gray-300 hover:border-gray-400"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileInputChange}
              className="hidden"
            />

            <div className="space-y-4">
              <div className="flex justify-center">
                <Upload className="w-12 h-12 text-gray-400" />
              </div>

              <div>
                <p className="text-lg font-medium text-gray-700">
                  Drop images here or click to select
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Support for multiple images (PNG, JPG, GIF up to 5MB each)
                </p>
              </div>

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              >
                Choose Files
              </button>
            </div>
          </div>

          {/* Image Previews */}
          {productImages.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-700">
                Selected Images ({productImages.length})
              </h3>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {productImages.map((image) => (
                  <div key={image.id} className="relative group">
                    <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                      <img
                        src={image.preview}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <button
                      type="button"
                      onClick={() => removeImage(image.id)}
                      className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                      <X className="w-4 h-4" />
                    </button>

                    <div className="mt-2 text-xs text-gray-500 truncate">
                      {image.file.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-end space-x-4 pt-6">
          <button
            type="button"
            onClick={handleCancel}
            disabled={isSubmitting}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={
              isSubmitting || !productName.trim() || !productPrice.trim()
            }
            className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Creating...</span>
              </>
            ) : (
              <span>Create Product ({productImages.length} images)</span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminNewProduct;
