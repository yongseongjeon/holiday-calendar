import { useState, useEffect } from "react";
import { fetchHolidays } from "../api/request";

const initalStateIsHolidays = Array.from({ length: 13 }, () => Array.from({ length: 32 }, () => false));

export default function useHoliday(year) {
  const [isHolidays, setIsHolidays] = useState(initalStateIsHolidays);

  useEffect(() => {
    const MONTHS = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
    MONTHS.forEach(updateIsHolidays);

    async function updateIsHolidays(month) {
      const xmlRes = await fetchHolidays({ year, month });
      const itemElements = await parseXmlResToItemElements(xmlRes);
      const updatedIsHolidays = markHolidays(itemElements, isHolidays);
      setIsHolidays(updatedIsHolidays);
    }
  }, []);
  return isHolidays;
}

async function parseXmlResToItemElements(xmlRes) {
  const resText = await xmlRes.text();
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(resText, "application/xml");
  return [...xmlDoc.documentElement.querySelectorAll("item")];
}

function markHolidays(itemElements, isHolidays) {
  const updatedIsHolidays = isHolidays.slice();
  itemElements.forEach(({ textContent }) => {
    // e.g. item.textContent = 01어린이날Y202305051
    const [_, rest] = textContent.split("Y");
    const month = Number(rest.slice(4, 6));
    const date = Number(rest.slice(6, 8));
    updatedIsHolidays[month][date] = true;
  });
  return updatedIsHolidays;
}
