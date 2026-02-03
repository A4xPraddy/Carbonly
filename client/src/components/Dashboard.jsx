import React from "react";
import Navbar from "./Navbar";
import { useEffect, useState } from "react";
import API from "../api/config";
import ActivityInput from "./ActivityInput";

const Dashboard = () => {
  const [types, setTypes] = useState([]);
  const [showInputModal, setShowInputModal] = useState(false);

  const durations = ["day", "week", "month"];
  const [duration, setDuration] = useState("day");

  const [activities, setActivities] = useState([]);

  useEffect(() => {
    getTypes();
  }, []);

  useEffect(() => {
    getActivites();
  }, [duration]);

  console.log(activities);

  const getActivites = async () => {
    try {
      let response = await API.get(`/activity?duration=${duration}`);
      setActivities(response.data.data);
    } catch (e) {
      alert("Something went wrong");
    }
  };

  const getTypes = async () => {
    let response = await API.get("/type");
    if (response.status === 200) {
      setTypes(response.data.data);
    }
  };

  return (
    <div className="bg-background/20 h-svh flex  flex-col">
      <Navbar />
      <div className="p-12 flex-1 relative border-box">
        <div className="flex gap-2">
          {durations.map((e) => {
            const [firstChar, ...restChars] = e;
            return (
              <button
                onClick={() => {
                  setDuration(e);
                }}
                className={`px-6 py-2 border cursor-pointer ${e === duration ? "border-text bg-text text-white" : "border-text "} rounded-md `}
              >
                {firstChar.toUpperCase()}
                {restChars}
              </button>
            );
          })}
        </div>
        <div className="grid gap-2 mt-12">
          {activities.map((activity) => (
            <div
              key={activity._id}
              className="bg-white rounded-lg border border-gray-200 p-4 flex justify-between items-center"
            >
              <div>
                <h3 className="text-sm font-semibold text-gray-800 capitalize">
                  {activity.type} · {activity.subType}
                </h3>
                <p className="text-xs text-gray-500">
                  {new Date(activity.date).toDateString()}
                </p>
              </div>

              <div className="text-sm text-gray-600">
                Consumption:{" "}
                <span className="font-medium text-gray-800">
                  {activity.consumption}
                </span>
              </div>

              <div className="text-right">
                <p className="text-sm font-semibold text-green-600">
                  {activity.co2} kg CO₂
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="absolute z-20 bottom-12 items-end right-12 flex flex-col gap-4">
          {showInputModal && <ActivityInput data={types} />}

          <button
            onClick={() => {
              setShowInputModal(!showInputModal);
            }}
            className="w-6 h-6 p-6 text-xl cursor-pointer rounded-full bg-white shadow-md flex items-center justify-center"
          >
            {showInputModal ? "X" : "+"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
