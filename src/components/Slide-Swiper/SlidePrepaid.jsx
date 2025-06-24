import React, { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card } from "@/components/ui/card";

const ImageCarousel = () => {
  const images = [
    "/pre-paid/src/assets/2011.jpg",
    "/pre-paid/src/assets/5011.jpg",
    "/pre-paid/src/assets/10011.jpg",
  ];
  // const images = [
  //     "/src/assets/2011.jpg",
  //     "/src/assets/5011.jpg",
  //     "/src/assets/10011.jpg",
  //   ];

  return (
    <div className="mt-6 w-full max-w-xs mx-auto px-4 flex justify-center items-center">
      <Carousel
        className="w-full"
        opts={{
          align: "center",
          loop: true,
        }}
      >
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index}>
              <Card className="overflow-hidden">
                <img
                  src={image}
                  alt={`Slide ${index + 1}`}
                  className="w-full h-auto object-cover"
                />
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-2" />
        <CarouselNext className="right-2" />
      </Carousel>
    </div>
  );
};

export default ImageCarousel;
