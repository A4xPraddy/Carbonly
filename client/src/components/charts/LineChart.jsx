import { useLayoutEffect } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

const LineChart = ({ data }) => {
  useLayoutEffect(() => {
    if (!data) {
      return;
    }
    const root = am5.Root.new("lineChartDiv");

    root.setThemes([am5themes_Animated.new(root)]);

    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: true,
        panY: false,
        wheelX: "panX",
        wheelY: "zoomX",
      }),
    );

    chart.setAll({
      paddingTop: 20,
      paddingBottom: 20,
    });

    // X Axis (Date)
    const xAxis = chart.xAxes.push(
      am5xy.DateAxis.new(root, {
        baseInterval: { timeUnit: "day", count: 1 },
        renderer: am5xy.AxisRendererX.new(root, {}),
      }),
    );

    // Y Axis (Value)
    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {}),
        extraMin: 0.1,
        extraMax: 0.1,
      }),
    );

    // Line Series
    const series = chart.series.push(
      am5xy.LineSeries.new(root, {
        name: "Total",
        xAxis,
        yAxis,
        valueYField: "value",
        valueXField: "date",
        tooltip: am5.Tooltip.new(root, {
          labelText: "{valueY}",
        }),
      }),
    );

    chart.setAll({
      paddingTop: 40,
      paddingBottom: 40,
    });

    series.bullets.push(() =>
      am5.Bullet.new(root, {
        sprite: am5.Circle.new(root, {
          radius: 5,
          fill: series.get("stroke"),
          stroke: root.interfaceColors.get("background"),
          strokeWidth: 2,
          tooltipText: "{valueY}",
        }),
      }),
    );

    const chartData = Object.entries(data).map(([date, value]) => ({
      date: new Date(date).getTime(),
      value,
    }));

    series.data.setAll(chartData);

    series.appear(1000, 0);
    chart.appear(1000, 100);

    return () => root.dispose();
  }, [data]);

  return (
    <div
      id="lineChartDiv"
      className="charts min-w-60 bg-white rounded-lg flex-1"
      style={{ height: "400px" }}
    />
  );
};

export default LineChart;
