import { useEffect, useRef } from "react";
import * as Plot from "@observablehq/plot";
import * as d3 from "d3";
import { useParams } from "react-router-dom";

function CalendarDrawing() {
  const containerRef = useRef();
  const params = useParams();
  const year = Number(params.year);
  const dates = createDateArray(year);

  useEffect(() => {
    const plot = Plot.plot({
      width: 1920,
      height: 500,
      padding: 0,
      x: { axis: null },
      y: { tickFormat: Plot.formatWeekday("ko", "narrow"), tickSize: 0 },
      fy: { tickFormat: "" },
      marks: [
        Plot.cell(dates, {
          x: ({ date }) => d3.utcWeek.count(d3.utcYear(date), date),
          y: ({ date }) => date.getUTCDay(),
          fx: ({ date }) => date.getUTCFullYear(),
          fill: ({ isHoliday }) => (isHoliday ? "#e74c3c" : "#ecf0f1"),
          inset: 1,
        }),
        Plot.text(dates, {
          x: ({ date }) => d3.utcWeek.count(d3.utcYear(date), date),
          y: ({ date }) => date.getUTCDay(),
          fontWeight: "bold",
          fontSize: "16",
          text: ({ date }) => `${date.getUTCDate()}`,
          lineAnchor: "middle",
        }),
      ],
    });

    containerRef.current.append(plot);
    return () => plot.remove();
  }, []);

  return <div ref={containerRef} />;
}

export default CalendarDrawing;

function createDateArray(year) {
  const dates = getAllDates(year);
  return dates.map((date) => {
    const day = date.getDay();
    const isSaturday = day === 6;
    const isSunday = day === 0;
    const isHoliday = isSaturday || isSunday;
    return {
      date,
      isHoliday,
    };
  });
}

function getAllDates(year) {
  const dates = [];
  for (let month = 0; month <= 11; month += 1) {
    for (let day = 1; day <= 31; day += 1) {
      const date = new Date(Date.UTC(year, month, day));
      const isOverThisMonth = date.getFullYear() !== year || date.getMonth() !== month;
      const isAlreadyExistDate = dates.at(-1) === date;
      if (isOverThisMonth) break;
      if (isAlreadyExistDate) continue;
      dates.push(date);
    }
  }
  return dates;
}
