import { useState, useEffect } from "react";
import { fetchHolidays } from "../api/request";

const initialStateIsHolidays = Array.from({ length: 13 }, () => Array.from({ length: 32 }, () => false));

export default function useHoliday(year) {
  const [isHolidays, setIsHolidays] = useState(initialStateIsHolidays);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    initializeHolidaysThisYear();

    async function initializeHolidaysThisYear() {
      const MONTHS = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
      const promises = MONTHS.map((month) => fetchHolidays({ year, month }));
      const responses = await Promise.all(promises);
      const itemElements = await parseXmlResponsesToItemElements(responses);
      const dateStrings = extractTextFromItemElements(itemElements);
      const holidays = extractDatesFromDateStrings(dateStrings);
      const updatedIsHolidays = markHolidays(holidays, isHolidays);
      setIsHolidays(updatedIsHolidays);
      setIsLoading(false);
    }
  }, []);
  return [isHolidays, isLoading];
}

function markHolidays(holidays, isHolidays) {
  const updatedIsHolidays = isHolidays.slice();
  holidays.forEach((holiday) => {
    const [month, date] = holiday;
    updatedIsHolidays[month][date] = true;
  });
  return updatedIsHolidays;
}

function extractDatesFromDateStrings(dateStrings) {
  return dateStrings.map((dateString) => {
    const [_, rest] = dateString.split("Y");
    const month = Number(rest.slice(4, 6));
    const date = Number(rest.slice(6, 8));
    return [month, date];
  });
}

function extractTextFromItemElements(itemElements) {
  return itemElements.map(({ textContent }) => textContent);
}

async function parseXmlResponsesToItemElements(xmlResponses) {
  const itemElements = [];
  for (const response of xmlResponses) {
    const resText = await response.text();
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(resText, "application/xml");
    const items = [...xmlDoc.documentElement.querySelectorAll("item")];
    itemElements.push(...items);
  }
  return itemElements;
}
