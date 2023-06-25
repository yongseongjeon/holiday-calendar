import { useNavigate } from "react-router-dom";
import Button from "./Button";

interface CreateCalendarButtonProps {
  year: string;
}

export default function CreateCalendarButton({ year }: CreateCalendarButtonProps) {
  const navigate = useNavigate();

  const handleClickButton = () => {
    if (!validateYear(year)) {
      alert("2004년 ~ 2024년 사이의 연도를 입력해주세요.");
      return;
    }
    navigate(`/calendarDrawing/${year}`);
  };

  const validateYear = (year: string) => {
    // 공휴일 API 호출 가능한 연도는 2004 ~ 2024
    const MIN_YEAR = 2004;
    const MAX_YEAR = 2024;
    return Number(year) >= MIN_YEAR && Number(year) <= MAX_YEAR;
  };

  return <Button type="button" value="캘린더 생성하기" onClick={handleClickButton} />;
}
