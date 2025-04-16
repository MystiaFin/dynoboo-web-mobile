import { useState, useEffect, useRef, TouchEvent } from "react";

interface CarouselItem {
  id: number;
  content: string;
  color: string;
}

export default function InfiniteCarousel() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  const items: CarouselItem[] = [
    { id: 1, content: "Slide 1", color: "bg-blue-500" },
    { id: 2, content: "Slide 2", color: "bg-red-500" },
    { id: 3, content: "Slide 3", color: "bg-green-500" },
  ];

  const extendedItems: CarouselItem[] = [
    ...items.slice(-1),
    ...items,
    ...items.slice(0, 1),
  ];

  const moveToIndex = (index: number): void => {
    setIsTransitioning(true);
    setCurrentIndex(index);
  };

  const handlePrev = (): void => {
    moveToIndex(currentIndex - 1);
  };

  const handleNext = (): void => {
    moveToIndex(currentIndex + 1);
  };

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>): void => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: TouchEvent<HTMLDivElement>): void => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (): void => {
    const deltaX = touchStartX.current - touchEndX.current;
    if (deltaX > 50) {
      handleNext(); // Swipe left
    } else if (deltaX < -50) {
      handlePrev(); // Swipe right
    }
  };

  useEffect(() => {
    const handleTransitionEnd = (): void => {
      setIsTransitioning(false);

      if (currentIndex === -1) {
        setCurrentIndex(items.length - 1);
      } else if (currentIndex === items.length) {
        setCurrentIndex(0);
      }
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
  }, [currentIndex, items.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isTransitioning) {
        handleNext();
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [isTransitioning]);

  return (
    <div
      className="relative w-full max-w-lg mx-auto overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div
        ref={carouselRef}
        className="flex transition-transform duration-300 ease-in-out"
        style={{
          transform: `translateX(${-100 * (currentIndex + 1)}%)`,
          transition: isTransitioning ? "transform 300ms ease-in-out" : "none",
        }}
      >
        {extendedItems.map((item, index) => (
          <div
            key={`${item.id}-${index}`}
            className={`flex-shrink-0 w-full h-[200px] flex items-center justify-center text-white text-2xl font-bold ${item.color}`}
          >
            {item.content}
          </div>
        ))}
      </div>
    </div>
  );
}
