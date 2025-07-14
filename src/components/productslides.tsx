import { useState, useEffect, useRef, TouchEvent } from "react";

interface ProductImage {
  id: number;
  src: string;
  alt: string;
}

interface ProductDetailCarouselProps {
  images?: ProductImage[];
}

export default function ProductDetailCarousel({
  images,
}: ProductDetailCarouselProps) {
  const defaultImages: ProductImage[] = [
    {
      id: 1,
      src: "https://via.placeholder.com/400x400/3B82F6/FFFFFF?text=Product+1",
      alt: "Product view 1",
    },
    {
      id: 2,
      src: "https://via.placeholder.com/400x400/EF4444/FFFFFF?text=Product+2",
      alt: "Product view 2",
    },
    {
      id: 3,
      src: "https://via.placeholder.com/400x400/10B981/FFFFFF?text=Product+3",
      alt: "Product view 3",
    },
    {
      id: 4,
      src: "https://via.placeholder.com/400x400/F59E0B/FFFFFF?text=Product+4",
      alt: "Product view 4",
    },
  ];

  const productImages = images || defaultImages;
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  const moveToIndex = (index: number): void => {
    if (index < 0 || index >= productImages.length) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
  };

  const goToSlide = (index: number): void => {
    moveToIndex(index);
  };

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>): void => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: TouchEvent<HTMLDivElement>): void => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (): void => {
    const deltaX = touchStartX.current - touchEndX.current;
    if (deltaX > 50 && currentIndex < productImages.length - 1) {
      moveToIndex(currentIndex + 1); // Swipe left
    } else if (deltaX < -50 && currentIndex > 0) {
      moveToIndex(currentIndex - 1); // Swipe right
    }
  };

  useEffect(() => {
    const handleTransitionEnd = (): void => {
      setIsTransitioning(false);
    };

    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener("transitionend", handleTransitionEnd);
    }

    return () => {
      if (carousel) {
        carousel.removeEventListener("transitionend", handleTransitionEnd);
      }
    };
  }, [currentIndex, productImages.length]);

  return (
    <div className="relative w-full max-w-md mx-auto">
      {/* Main carousel container */}
      <div
        className="relative overflow-hidden rounded-lg shadow-lg bg-white"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          ref={carouselRef}
          className="flex transition-transform duration-300 ease-in-out"
          style={{
            transform: `translateX(${-100 * currentIndex}%)`,
            transition: isTransitioning
              ? "transform 300ms ease-in-out"
              : "none",
          }}
        >
          {productImages.map((image, index) => (
            <div
              key={`${image.id}-${index}`}
              className="flex-shrink-0 w-full aspect-square bg-gray-100"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover"
                draggable={false}
              />
            </div>
          ))}
        </div>

        {/* Image counter */}
        <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded-full text-sm">
          {currentIndex + 1} / {productImages.length}
        </div>
      </div>

      {/* Thumbnail strip (optional) */}
      <div className="flex justify-center space-x-2 mt-4 overflow-x-auto pb-2">
        {productImages.map((image, index) => (
          <button
            key={image.id}
            onClick={() => goToSlide(index)}
            className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
              index === currentIndex
                ? "border-blue-500 ring-2 ring-blue-200"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover"
              draggable={false}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
