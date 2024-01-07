import React from "react";
import WebcamComponent from "./Webcam";
import Image from "next/image";
import sampleImage from "../../../public/sample.jpg";
import sampleImage2 from "../../../public/sample2.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const ImageComponent = () => {
  const Images = [sampleImage, sampleImage2];
  return (
    <>
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
      >
        {Images.map((image) => (
          <SwiperSlide>
            <Image src={image} alt="" />
          </SwiperSlide>
        ))}
      </Swiper>
      <WebcamComponent />
    </>
  );
};

export default ImageComponent;
