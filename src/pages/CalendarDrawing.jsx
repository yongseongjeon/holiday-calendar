import { useRef } from "react";
import { useParams } from "react-router-dom";
import Text from "../components/Heading/Text";
import { styled } from "styled-components";
import useHoliday from "../hooks/useHoliday";
import useCalendar from "../hooks/useCalendar";

function CalendarDrawing() {
  const containerRef = useRef();
  const params = useParams();
  const year = Number(params.year);
  const isHolidays = useHoliday(year);
  const dates = createDates(year, isHolidays);
  useCalendar({ dates, containerRef, isHolidays });

  return (
    <>
      <div ref={containerRef} />
      <Content>
        <Text size="2rem" weight="700" color="black" value={`${year}년도의 공휴일은 총 ${getTotalHolidayCnt(isHolidays)}일입니다.`} />
      </Content>
    </>
  );
}

export default CalendarDrawing;

const Content = styled.div`
  display: flex;
  padding: 3rem;
`;

function createDates(year, isHolidays) {
  return getAllDates(year).map((dateObj) => {
    const month = dateObj.getMonth() + 1;
    const date = dateObj.getDate();
    const day = dateObj.getDay();
    const isSaturday = day === 6;
    const isSunday = day === 0;
    const isHoliday = isSaturday || isSunday || isHolidays[month][date];
    return {
      date: dateObj,
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
      if (isAlreadyExistDate) break;
      dates.push(date);
    }
  }
  return dates;
}

function getTotalHolidayCnt(isHolidays) {
  return isHolidays.reduce((prev, row) => {
    return prev + row.filter((x) => x).length;
  }, 0);
}
