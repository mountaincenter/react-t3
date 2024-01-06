import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import type { Weight } from "@/app/types";
import WeightDataGraph from "./WeightDataGraph";
import BodyFatGraph from "./BodyFatGraph";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface WeightGraphProps {
  weights: Weight[];
  targetWeight?: number | null;
}

const WeightGraph = ({ weights, targetWeight }: WeightGraphProps) => {
  return (
    <Swiper
      modules={[Navigation, Pagination]}
      spaceBetween={50}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
    >
      <SwiperSlide>
        <WeightDataGraph weights={weights} targetWeight={targetWeight} />
      </SwiperSlide>
      <SwiperSlide>
        <BodyFatGraph weights={weights} />
      </SwiperSlide>
    </Swiper>
  );
};

export default WeightGraph;
