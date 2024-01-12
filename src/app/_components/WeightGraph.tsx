import React, { useState, useEffect, useRef } from "react";
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
      {children}
    </dialog>
  );
};

const WeightGraph = ({ weights, targetWeight }: WeightGraphProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [selectedGraph, setSelectedGraph] = useState<React.ReactNode | null>(
    null,
  );

  const handleGraphClick = (graphComponent: React.ReactNode) => {
    setSelectedGraph(graphComponent);
    setIsDialogOpen(true);
  };
  return (
    <>
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
      >
        <SwiperSlide
          onClick={() =>
            handleGraphClick(
              <WeightDataGraph weights={weights} targetWeight={targetWeight} />,
            )
          }
        >
          <WeightDataGraph weights={weights} targetWeight={targetWeight} />
        </SwiperSlide>
        <SwiperSlide
          onClick={() => handleGraphClick(<BodyFatGraph weights={weights} />)}
        >
          <BodyFatGraph weights={weights} />
        </SwiperSlide>
      </Swiper>
      <FullscreenDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      >
        {selectedGraph}
      </FullscreenDialog>
    </>
  );
};

export default WeightGraph;
