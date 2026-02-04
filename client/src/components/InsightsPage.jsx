import { useState, useEffect, useMemo } from "react";
import BarGraph from "./charts/BarGraph";
import Navbar from "./Navbar";
import API from "../api/config";
import Loader from "./Loader";

let dummyInsight = {
  suggestions: [
    "Consider opting for locally sourced and seasonal produce to further reduce your food miles and associated emissions.",
    "Explore alternative transportation methods like public transit, cycling, or carpooling for shorter distances to minimize car usage.",
  ],
  complements: [
    "Your choice of vegetarian food significantly lowers your dietary carbon footprint compared to meat-heavy diets. Keep up the great work!",
    "Your overall CO2 emissions for transport are commendable and well below typical averages.",
  ],
  comparison: {
    food: {
      public: 20,
      user: 12,
      note: "Excellent! Your food-related emissions are well below the public average, indicating sustainable dietary choices for the past 2 days.",
    },
    transport: {
      public: 10,
      user: 2.4,
      note: "Your transport emissions are significantly lower than the public average over the past 2 days. This suggests efficient commuting or eco-friendly travel habits.",
    },
    total: {
      public: 30,
      user: 14.4,
      note: "Overall, your CO2 emissions are considerably lower than the general public's average over the last 2 days. Keep up the great work!",
    },
  },
  impact: [
    "Your total CO2 emissions of 14.4 kg over the last two days are equivalent to driving a typical gasoline car for approximately 120 kilometers.",
    "This amount of CO2 is comparable to what a mature tree absorbs in about 250 days.",
    "Your emissions are roughly equivalent to the CO2 released from producing 175 standard 500ml plastic bottles.",
    "It's also similar to the energy required to power an average 60W incandescent light bulb for approximately 480 hours.",
    "Your two-day CO2 footprint is about the same as the emissions generated from producing half a kilogram of beef.",
  ],
};

const InsightsPage = () => {
  const [insightsData, setInsightsData] = useState();
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
    getInsights();
  }, []);

  const getInsights = async () => {
    try {
      let { data } = await API.get("/insights");
      setInsightsData(data);
    } catch (e) {
      setLoading(false);
      console.log(e);
    }

    setLoading(false);
  };

  console.log(insightsData);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 ">
      <Navbar />
      <Loader loading={loading} />
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
      {!insightsData && !loading && (
        <div className="flex-1 flex items-center justify-center text-gray-600">
          No insights available. Please log more activities to generate or try
          again tomorrow for more insights.
        </div>
      )}
    </div>
  );
};

export default InsightsPage;
