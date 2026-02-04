import { useMemo } from "react";
import Navbar from "./Navbar";
import { useEffect, useState } from "react";
import API from "../api/config";
import ActivityInput from "./ActivityInput";
import { getCategoryAggregate, getDateAggregate } from "../utils/Aggregate";
import LineChart from "./charts/LineChart";
import PieChart from "./charts/PieChart";
import Table from "./Table";
import { Link } from "react-router-dom";
import { FileChartLine } from "lucide-react";

const Dashboard = () => {
  const [types, setTypes] = useState([]);
  const [showInputModal, setShowInputModal] = useState(false);

  const durations = ["day", "week", "month"];
  const [duration, setDuration] = useState("week");

  const [activities, setActivities] = useState([]);

  const categoryAggregatedData = useMemo(() => {
    return getCategoryAggregate(activities);
  }, [activities]);

  const dateAggregatedData = useMemo(() => {
    return getDateAggregate(activities);
  }, [activities]);

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
    <div className="bg-background/20 min-h-svh flex  flex-col">
      <Navbar />
      <div className="p-12 flex-1 relative border-box">
        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            {durations.map((e, i) => {
              const [firstChar, ...restChars] = e;
              return (
                <button
                  key={i}
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
          <Link
            to="/dashboard/insights"
            className="flex gap-2 border border-text transition-all duration-300 px-6 py-3 rounded-md hover:bg-gray-500 hover:text-white"
          >
            <p>Generate Insights</p>
            <FileChartLine />
          </Link>
        </div>

        {activities.length > 0 ? (
          <div className="flex my-6 gap-6">
            <PieChart data={categoryAggregatedData} />
            {duration !== "day" && <LineChart data={dateAggregatedData} />}
          </div>
        ) : (
          <div className="my-6">No Activites recorded within this duration</div>
        )}
        <Table data={activities} />
        <div className="fixed z-20 bottom-12 items-end right-12 flex flex-col gap-4">
          {showInputModal && <ActivityInput data={types} />}

          <button
            onClick={() => {
              setShowInputModal(!showInputModal);
            }}
            className="w-6 h-6 p-6 text-xl cursor-pointer rounded-full bg-gray-400 text-white shadow-md flex items-center justify-center"
          >
            {showInputModal ? "X" : "+"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
