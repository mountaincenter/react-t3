import React, { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper/modules";
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

interface FullscreenDialogProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const FullscreenDialog = ({
  isOpen,
  onClose,
  children,
}: FullscreenDialogProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const toggleDialog = () => {
    if (isOpen && dialogRef.current) {
      dialogRef.current.showModal();
    } else if (dialogRef.current) {
      dialogRef.current.close();
    }
  };

  useEffect(() => {
    toggleDialog();
  }, [isOpen]);

  return (
    <dialog
      ref={dialogRef}
      className="fixed inset-0 overflow-auto bg-white p-4 md:p-8"
    >
      <div className="absolute right-0 top-0 p-4">
        <button onClick={onClose}>Close</button>
      </div>
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        loop={true}
      >
        {children}
      </Swiper>
    </dialog>
  );
};

const WeightGraph = ({ weights, targetWeight }: WeightGraphProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [, setSelectedGraphIndex] = useState<number>(0);

  const handleGraphClick = (index: number) => {
    setSelectedGraphIndex(index);
    setIsDialogOpen(true);
  };
  return (
    <>
      <Swiper
        modules={[Navigation, Pagination, A11y]}
        spaceBetween={50}
        navigation
        pagination={{ clickable: true }}
        loop={true}
      >
        <SwiperSlide>
          <WeightDataGraph
            weights={weights}
            targetWeight={targetWeight}
            onGraphClick={() => handleGraphClick(0)}
          />
        </SwiperSlide>
        <SwiperSlide>
          <BodyFatGraph
            weights={weights}
            onGraphClick={() => handleGraphClick(1)}
          />
        </SwiperSlide>
      </Swiper>
      <FullscreenDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      >
        <SwiperSlide>
          <WeightDataGraph weights={weights} targetWeight={targetWeight} />
        </SwiperSlide>
        <SwiperSlide>
          <BodyFatGraph weights={weights} />
        </SwiperSlide>
      </FullscreenDialog>
    </>
  );
};

export default WeightGraph;
