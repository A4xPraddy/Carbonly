import { useLayoutEffect } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5percent from "@amcharts/amcharts5/percent";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

const PieChart = ({ data }) => {
  useLayoutEffect(() => {
    const root = am5.Root.new("pieChartDiv");

    root.setThemes([am5themes_Animated.new(root)]);

    const chart = root.container.children.push(
      am5percent.PieChart.new(root, {
        layout: root.verticalLayout,
      }),
    );

    const series = chart.series.push(
      am5percent.PieSeries.new(root, {
        valueField: "value",
        categoryField: "category",
      }),
    );

    series.labels.template.set("forceHidden", true);
    series.ticks.template.set("forceHidden", true);

    const chartData = Object.entries(data).map(([category, value]) => ({
      category,
      value,
    }));

    series.data.setAll(chartData);
    series.appear(1500, 100);

    return () => root.dispose();
  }, [data]);

  return (
    <div
      id="pieChartDiv"
      className="charts flex-1 min-w-60 bg-white rounded-lg"
      style={{ height: "400px" }}
    />
  );
};

export default PieChart;
