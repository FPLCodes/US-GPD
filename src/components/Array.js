import React, { useState, useRef, useEffect } from "react";
import "../App.css";
import * as d3 from "d3";

export default function Array() {
  const w = 500;
  const h = 100;

  let arr = [];
  for (let i = 0; i < 9; i++) {
    arr.push(Math.round(Math.random() * 35));
  }

  const [dataset, setDataset] = useState(arr);
  const [count, setCount] = useState(dataset.length);
  const svgRef = useRef();

  useEffect(() => {
    if (count > 0) {
      let data = [...dataset];

      for (let i = 0; i < data.length; i++) {
        setTimeout(() => {
          for (let j = 0; j < data.length; j++) {
            if (data[j] > data[j + 1]) {
              let temp = data[j];
              data[j] = data[j + 1];
              data[j + 1] = temp;
              console.log(data);
            }
          }
          setDataset(data);
          d3.selectAll("rect").remove();
        }, i * 100);
      }
      setDataset(data);
      d3.selectAll("rect").remove();
      setCount(count - 1);
    }

    const svg = d3.select(svgRef.current);
    svg
      .append("svg")
      .attr("width", w)
      .attr("height", h)
      .selectAll("rect")
      .data(dataset)
      .enter()
      .append("rect")
      .attr("x", (d, i) => i * 25)
      .attr("y", (d) => h - 3 * d)
      .attr("width", 20)
      .attr("height", (d) => 3 * d);
  }, [dataset]);

  return (
    <div>
      <svg ref={svgRef} />
    </div>
  );
}
