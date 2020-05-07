import React, { useState } from "react";
import "../App.css";
import * as d3 from "d3";

export default function Array() {
  const [dataset, setDataset] = useState([12, 31, 22, 17, 25, 18, 29, 14, 9]);
  const w = 500;
  const h = 100;

  const svg = d3
    .select("#root")
    .append("svg")
    .attr("width", w)
    .attr("height", h);

  svg
    .selectAll("rect")
    .data(dataset)
    .enter()
    .append("rect")
    .attr("x", (d, i) => i * 25)
    .attr("y", (d) => h - 3 * d)
    .attr("width", 20)
    .attr("height", (d) => 3 * d);

  function handleClick() {
    let data = [...dataset];

    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data.length; j++) {
        if (data[j] > data[j + 1]) {
          const temp = data[j];
          data[j] = data[j + 1];
          data[j + 1] = temp;
        }
      }
    }
    setDataset(data);
  }

  return (
    <div>
      <svg />
      <button className="button" onClick={handleClick}>
        Sort
      </button>
    </div>
  );
}
