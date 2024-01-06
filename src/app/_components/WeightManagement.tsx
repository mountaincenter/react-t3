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

const WeightManagement = ({ weights, user }: WeightManagementProps) => {
  const [selectedTab, setSelectedTab] = useState("diff");

  return (
    <div className="p-4">
      <div className="mb-4 flex ">
        <button
          className={`flex-grow py-2 text-center transition duration-300 ease-in-out ${
            selectedTab === "diff"
              ? "border-b border-blue-500 text-gray-700"
              : "text-gray-700 hover:bg-blue-100"
          }`}
          onClick={() => setSelectedTab("diff")}
        >
          体重差
        </button>
        <button
          className={`flex-grow  py-2 text-center transition duration-300 ease-in-out ${
            selectedTab === "graph"
              ? "border-b border-blue-500 text-gray-700"
              : "text-gray-700 hover:bg-blue-100"
          }`}
          onClick={() => setSelectedTab("graph")}
        >
          グラフ
        </button>
        <button
          className={`flex-grow  py-2 text-center transition duration-300 ease-in-out ${
            selectedTab === "dashboard"
              ? "border-b border-blue-500 text-gray-700"
              : "text-gray-700 hover:bg-blue-100"
          }`}
          onClick={() => setSelectedTab("dashboard")}
        >
          日別表
        </button>
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
