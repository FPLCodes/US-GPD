import React, { useRef, useEffect, useState } from "react";
import "../App.css";
import {
  select,
  scaleLinear,
  scaleTime,
  axisBottom,
  axisLeft,
  max,
  min,
} from "d3";

export default function Array() {
  const [dataset, setDataset] = useState([]);
  const svgRef = useRef();
  const padding = -1;
  const w = 800;
  const h = 500;

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json"
    )
      .then((response) => response.json())
      .then((response) => {
        setDataset(response.data);
      });
  }, []);

  useEffect(() => {
    const time = dataset.map((item) => new Date(item[0]));

    const maxDate = new Date(max(time));
    maxDate.setMonth(maxDate.getMonth() + 3);

    const xScale = scaleTime()
      .domain([min(time), maxDate])
      .range([padding, w - padding]);

    const yScale = scaleLinear()
      .domain([0, max(dataset, (d) => d[1])])
      .range([h, 0]);

    const svg = select(svgRef.current)
      .append("svg")
      .attr("width", w)
      .attr("height", h);

    svg
      .selectAll("rect")
      .data(dataset)
      .enter()
      .append("rect")
      .attr("x", (d, i) => xScale(time[i]))
      .attr("y", -h)
      .style("transform", "scale(1, -1)")
      .transition()
      .duration(1500)
      .attr("height", (d) => h - yScale(d[1]))
      .attr("width", 3)
      .attr("fill", "skyblue")
      .attr("class", "bar");

    svg
      .selectAll("rect")
      .append("title")
      .text((d) => `${d[0]}\n$${d[1]} Billion`);

    const xAxis = axisBottom(xScale);
    const yAxis = axisLeft(yScale);

    svg
      .append("g")
      .attr("transform", `translate(0, ${h - padding})`)
      .call(xAxis);

    svg.append("g").attr("transform", `translate(${padding}, 0)`).call(yAxis);
  });

  return (
    <div className="container">
      <svg ref={svgRef} className="chart">
        <text x="-40" y="-10" font-family="sans-serif" font-size="11px">
          (Billion)
        </text>
      </svg>
    </div>
  );
}
