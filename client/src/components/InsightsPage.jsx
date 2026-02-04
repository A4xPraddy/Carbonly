import { useState, useEffect, useMemo } from "react";
import BarGraph from "./charts/BarGraph";
import Navbar from "./Navbar";
import API from "../api/config";

const InsightsPage = () => {
  const [insightsData, setInsightsData] = useState();

  const chartData = useMemo(() => {
    return insightsData
      ? Object.entries(insightsData.comparison).map(([key, value]) => {
          console.log(value);
          return {
            category: key.charAt(0).toUpperCase() + key.slice(1),
            user: value.user,
            public: value.public,
          };
        })
      : [];
  }, [insightsData]);
  console.log(chartData);

  const totalPercentBelow = useMemo(() => {
    return insightsData
      ? (
          ((insightsData.comparison.total.public -
            insightsData.comparison.total.user) /
            insightsData.comparison.total.public) *
          100
        ).toFixed(1)
      : 0;
  }, [insightsData]);

  useEffect(() => {
    getInsights();
  }, []);

  const getInsights = async () => {
    let { data } = await API.get("/insights");
    console.log(data);
    setInsightsData(data);
  };

  console.log(insightsData);

  return (
    <div className="min-h-screen bg-gray-100 ">
      <Navbar />
      {insightsData && (
        <div className="max-w-6xl mx-auto px-4 space-y-8 py-8">
          {/* Header */}
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold text-gray-800">
              Your Carbon Insights
            </h1>
            <p className="text-lg text-gray-500">
              Personalized recommendations and impact analysis based on your
              tracked activities
            </p>
          </div>

          {/* Compliments */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {insightsData.complements.map((c, i) => (
              <div
                key={i}
                className="bg-white border-2 border-gray-300 rounded-lg p-6 flex gap-4"
              >
                <div className="w-12 h-12 rounded-lg px-2 bg-green-600 flex items-center justify-center text-white text-2xl">
                  ✓
                </div>
                <p className="text-gray-800">{c}</p>
              </div>
            ))}
          </div>

          {/* Bar Graph */}
          <div className="bg-white border-2 border-gray-300 rounded-lg p-4">
            <h2 className="text-gray-800 text-xl font-semibold mb-4">
              Your Emissions vs Public Average
            </h2>
            <BarGraph data={chartData} />
          </div>

          {/* Suggestions */}
          <div>
            <h2 className="text-gray-800 text-2xl font-bold mb-4">
              Recommendations to Reduce Your Footprint
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {insightsData.suggestions.map((s, i) => (
                <div
                  key={i}
                  className="bg-white border-2 border-gray-300 rounded-lg p-6 flex gap-4"
                >
                  <div className="w-10 h-10 px-2 rounded-full bg-green-600 flex items-center justify-center text-white font-semibold">
                    {i + 1}
                  </div>
                  <p className="text-gray-800 text-sm">{s}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Impact */}
          <div>
            <h2 className="text-gray-800 text-2xl font-bold mb-4">
              Put Your Impact in Perspective
            </h2>
            <div className="space-y-3">
              {insightsData.impact.map((i, idx) => (
                <div
                  key={idx}
                  className="bg-white border-2 border-gray-300 rounded-lg p-4 flex gap-4"
                >
                  <div className="w-8 h-8 px-2 rounded-full bg-blue-400 flex items-center justify-center text-white font-bold text-sm">
                    {idx + 1}
                  </div>
                  <p className="text-gray-800 text-sm">{i}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Total Emissions */}
          <div className="bg-green-600 border-2 border-green-600 rounded-lg p-8 text-center text-white space-y-3">
            <h3 className="text-2xl font-bold">Your Total Emissions</h3>
            <div className="text-5xl font-bold">
              {insightsData.comparison.total.user} kg CO2
            </div>
            <p className="text-white text-opacity-90 text-base">
              You're {totalPercentBelow}% below the public average
            </p>
            <p className="text-white text-opacity-80 text-sm mt-4 max-w-lg mx-auto">
              Keep tracking your activities and follow the recommendations above
              to continue reducing your carbon footprint.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default InsightsPage;
