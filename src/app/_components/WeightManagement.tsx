"use client";
import React, { useState } from "react";
import WeightDiff from "./WeightDiff";
import WeightDashboard from "./WeightDashboard";
import WeightGraph from "./WeightGraph";
import type { Weight, User } from "@/app/types";

interface WeightManagementProps {
  weights: Weight[];
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

const WeightManagement = ({ weights, user }: WeightManagementProps) => {
  const [selectedTab, setSelectedTab] = useState("diff");
  const tabs = [
    { key: "diff", label: "体重" },
    { key: "graph", label: "グラフ" },
    { key: "dashboard", label: "日別グラフ" },
  ];

  return (
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
      <div>
        {selectedTab === "diff" &&
          weights.length > 1 &&
          weights[0] &&
          weights[1] && (
            <WeightDiff recentWeight={weights[0]} previousWeight={weights[1]} />
          )}
        {selectedTab === "graph" && user && (
          <WeightGraph
            weights={weights}
            targetWeight={user.targetWeight ?? undefined}
          />
        )}
        {selectedTab === "dashboard" && (
          <WeightDashboard weights={weights} user={user} />
        )}
      </div>
    </div>
  );
};

export default WeightManagement;