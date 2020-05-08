import React, { useRef, useEffect, useState } from "react";
import "../App.css";
import * as d3 from "d3";

export default function Array() {
  const svgRef = useRef();
  const w = 600;
  const h = 600;
  const padding = 0;
  const [dataset, setDataset] = useState([]);

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
    console.log(dataset[0]);
    const xScale = d3
      .scaleLinear()
      .domain([0, d3.max(dataset, (d) => d[0])])
      .range([padding, w - padding]);

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
      .attr("x", (d, i) => i * 2.183)
      .attr("y", (d) => yScale(d[1]))
      .attr("width", 2)
      .attr("height", (d, i) => d[1])
      .attr("fill", "skyblue")
      .style("border", "1px solid black")
      .attr("class", "bar")
      .append("title")
      .text((d) => `$${d[1]} Billion`);
  });
  return (
    <div className="bg">
      <div className="container">
        <svg ref={svgRef} className="chart" />
      </div>
    </div>
  );
}
