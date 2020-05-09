import React, { useRef, useEffect, useState } from "react";
import "../App.css";
import * as d3 from "d3";

export default function Array() {
  const [dataset, setDataset] = useState([]);
  const svgRef = useRef();
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

    const maxDate = new Date(d3.max(time));
    maxDate.setMonth(maxDate.getMonth() + 3);

    const xScale = d3
      .scaleTime()
      .domain([d3.min(time), maxDate])
      .range([0, w + 1]);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(dataset, (d) => d[1])])
      .range([h, 0]);

    const svg = d3
      .select(svgRef.current)
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
      .attr("width", 3.2)
      .style("transform", "scale(1, -1)")
      .attr("class", "bar")
      .attr("fill", "skyblue")
      .on("mouseover", (d, i) => {
        svg
          .selectAll(".tooltip")
          .data([d])
          .join((enter) => enter.append("text"))
          .attr("class", "tooltip")
          .text(`${d[0]}`)
          .attr("x", 60)
          .attr("y", 50)
          .attr("opacity", 1)
          .attr("font-size", 22)
          .attr("font-family", "Jost");
        svg
          .selectAll(".tooltip1")
          .data([d])
          .join((enter) => enter.append("text"))
          .attr("class", "tooltip")
          .attr("x", 60)
          .attr("y", 80)
          .text(`$${d[1]} Billion`)
          .attr("opacity", 1)
          .attr("font-size", 22)
          .attr("font-family", "Jost");
      })
      .transition()
      .duration(1500)
      .attr("height", (d) => h - yScale(d[1]));

    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    svg.append("g").attr("transform", `translate(0, ${h})`).call(xAxis);
    svg.append("g").attr("transform", `translate(-1, 0)`).call(yAxis);
  }, [dataset]);

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
