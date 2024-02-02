import React, { useState } from "react";
import DaySelector from "./DaySelector";
import type { User } from "@/app/types";

import useDateSelection from "../_hooks/useDateSelection";

import SelectedMeal from "./SelectedMeal";

interface MealPhotoProps {
  user: User;
}

interface TabButtonProps {
  isSelected: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

const TabButton = ({ isSelected, onClick, children }: TabButtonProps) => (
  <button
    className={`flex-grow py-2 text-center transition duration-300 ease-in-out ${
      isSelected
        ? "border-b-2 border-blue-500 text-gray-700"
        : "text-gray-700 hover:bg-gray-100"
    }`}
    onClick={onClick}
  >
    {children}
  </button>
);

const MealPhoto: React.FC<MealPhotoProps> = ({ user }) => {
  const { selectedDay, handleDayChange } = useDateSelection();
  const [selectedTab, setSelectedTab] = useState("breakfast");

  const tabs = [
    { key: "breakfast", label: "朝食" },
    { key: "lunch", label: "昼食" },
    { key: "dinner", label: "夕食" },
    { key: "snack", label: "間食" },
  ];
  return (
    <>
      <DaySelector selectedDay={selectedDay} onDayChange={handleDayChange} />
      <div className="p-4">
        <div className="mb-4 flex">
          {tabs.map((tab) => (
            <TabButton
              key={tab.key}
              isSelected={selectedTab === tab.key}
              onClick={() => setSelectedTab(tab.key)}
            >
              {tab.label}
            </TabButton>
          ))}
        </div>
      </div>
      <div>
        <SelectedMeal
          selectedMeal={selectedTab}
          selectedDay={selectedDay}
          user={user}
        />
      </div>
    </>
  );
};

export default MealPhoto;
