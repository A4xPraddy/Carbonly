import React from "react";
import BarGraph from "./charts/BarGraph";
import Navbar from "./Navbar";

const insightsData = {
  suggestions: [
    "Consider carpooling or using public transportation for your daily commute to reduce emissions from car use.",
    "For short distances, try walking or cycling instead of driving, which can also benefit your health.",
    "If car use is essential, explore fuel-efficient vehicles or electric alternatives in the future to minimize your carbon footprint.",
    "Combine multiple errands into a single trip to reduce the frequency and length of your car journeys.",
  ],
  complements: [
    "Your current recorded emissions are very low, indicating a potentially sustainable lifestyle or a great start to tracking your environmental impact. Keep up the good work!",
    "By diligently tracking your transport activities, you are taking a crucial step towards understanding and actively reducing your carbon footprint.",
  ],
  comparison: {
    transport: { user: 1.2, public: 2.5 },
    food: { user: 0, public: 1 },
    home_energy: { user: 0, public: 2 },
    shopping: { user: 0, public: 0.5 },
    total: { user: 1.2, public: 6 },
  },
  impact: [
    "Your recorded emissions of 1.2 kg CO2 are equivalent to driving a typical gasoline car for about 5 miles (8 kilometers).",
    "This amount of CO2 is comparable to what's produced by charging an average smartphone roughly 120 times.",
    "It's also equivalent to the CO2 emitted during the production of approximately 12 standard 500ml plastic bottles.",
    "To power a 10-watt LED light bulb, this CO2 amount would last for approximately 300 hours.",
    "A single mature tree would absorb this amount of CO2 in about 3 weeks.",
  ],
};

const chartData = [
  {
    category: "Transport",
    user: insightsData.comparison.transport.user,
    public: insightsData.comparison.transport.public,
  },
  {
    category: "Food",
    user: insightsData.comparison.food.user,
    public: insightsData.comparison.food.public,
  },
  {
    category: "Home Energy",
    user: insightsData.comparison.home_energy.user,
    public: insightsData.comparison.home_energy.public,
  },
];

const InsightsPage = () => {
  const totalPercentBelow = (
    ((insightsData.comparison.total.public -
      insightsData.comparison.total.user) /
      insightsData.comparison.total.public) *
    100
  ).toFixed(1);

  return (
    <div className="min-h-screen bg-gray-100 ">
      <Navbar />
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
                <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center text-white font-semibold">
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
                <div className="w-8 h-8 rounded-full bg-blue-400 flex items-center justify-center text-white font-bold text-sm">
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
          <div className="text-5xl font-bold">1.2 kg CO2</div>
          <p className="text-white text-opacity-90 text-base">
            You're {totalPercentBelow}% below the public average
          </p>
          <p className="text-white text-opacity-80 text-sm mt-4 max-w-lg mx-auto">
            Keep tracking your activities and follow the recommendations above
            to continue reducing your carbon footprint.
          </p>
        </div>
      </div>
    </div>
  );
};

export default InsightsPage;
