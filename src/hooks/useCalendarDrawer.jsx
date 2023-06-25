import { useEffect } from "react";
import * as Plot from "@observablehq/plot";
import * as d3 from "d3";

function useCalendarDrawer({ dates, containerRef, isHolidays }) {
  useEffect(() => {
    const start = d3.utcDay.offset(d3.min(dates, ({ date }) => date));
    const end = d3.utcDay.offset(d3.max(dates, ({ date }) => date));
    const plot = Plot.plot({
      width: 1920,
      height: 300,
      padding: 0,
      x: { axis: null },
      fy: { axis: null },
      y: {
        tickFormat: (d) => {
          if (d === -1) return;
          return Plot.formatWeekday("ko", "narrow")(d % 7);
        },
        tickSize: 0,
      },
      marks: [
        Plot.cell(dates, {
          x: ({ date }) => d3.utcWeek.count(d3.utcYear(date), date),
          y: ({ date }) => date.getUTCDay(),
          fill: ({ isHoliday }) => (isHoliday ? "#eb4d4b" : "#ecf0f1"),
          inset: 1,
        }),
        Plot.text(dates, {
          x: ({ date }) => d3.utcWeek.count(d3.utcYear(date), date),
          y: ({ date }) => date.getUTCDay(),
          text: ({ date }) => `${date.getUTCDate()}`,
          fontSize: "16",
        }),
        Plot.text(
          d3.utcMonths(d3.utcMonth(start), end).map(d3.utcMonday.ceil),
          calendar({ text: d3.utcFormat("%b"), frameAnchor: "middle", y: -1, fontSize: "16", fontWeight: 700 })
        ),
      ],
    });

    containerRef.current.append(plot);

    return () => plot.remove();
  }, [isHolidays]);
}

export default useCalendarDrawer;

function calendar({ date = Plot.identity, inset = 0.5, ...options } = {}) {
  let D;
  return {
    fy: { transform: (data) => (D = Plot.valueof(data, date, Array)).map((d) => d.getUTCFullYear()) },
    x: { transform: () => D.map((d) => d3.utcWeek.count(d3.utcYear(d), d)) },
    y: { transform: () => D.map((d) => d.getUTCDay()) },
    inset,
    ...options,
  };
}
