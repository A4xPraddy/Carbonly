import React, { useLayoutEffect, useRef } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

const BarGraph = ({ data }) => {
  const chartRef = useRef(null);

  useLayoutEffect(() => {
    const root = am5.Root.new(chartRef.current);

    root.setThemes([am5themes_Animated.new(root)]);

    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        wheelX: "none",
        wheelY: "none",
      }),
    );

    // X-axis
    const xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: "category",
        renderer: am5xy.AxisRendererX.new(root, { minGridDistance: 30 }),
      }),
    );
    xAxis.data.setAll(data);

    // Y-axis
    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {}),
      }),
    );

    // User series
    const userSeries = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: "Your Emissions",
        xAxis,
        yAxis,
        valueYField: "user",
        categoryXField: "category",
        fill: am5.color(0x2ecc71),
        stroke: am5.color(0x2ecc71),
      }),
    );
    userSeries.data.setAll(data);

    // Public series
    const publicSeries = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: "Public Average",
        xAxis,
        yAxis,
        valueYField: "public",
        categoryXField: "category",
        fill: am5.color(0x5dade2),
        stroke: am5.color(0x5dade2),
      }),
    );
    publicSeries.data.setAll(data);

    chart.set("cursor", am5xy.XYCursor.new(root, {}));

    return () => {
      root.dispose();
    };
  }, [data]);

  return (
    <div
      ref={chartRef}
      className="charts"
      style={{ width: "100%", height: "300px" }}
    ></div>
  );
};

export default BarGraph;
