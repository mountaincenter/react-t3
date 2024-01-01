import React from "react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import dynamic from "next/dynamic";

const FullCalendar = dynamic(
  () => import("@fullcalendar/react").then((mod) => mod.default),
  { ssr: false },
);

const Calendar = () => {
  return <FullCalendar plugins={[dayGridPlugin]} initialView="dayGridMonth" />;
};
export default Calendar;
