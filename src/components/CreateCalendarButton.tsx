import { useNavigate } from "react-router-dom";
import Button from "./Button";

interface CreateCalendarButtonProps {
  year: string;
}

export default function CreateCalendarButton({ year }: CreateCalendarButtonProps) {
  const navigate = useNavigate();

  const handleClickButton = () => {
    navigate(`/calendarDrawing/${year}`);
  };

  return <Button type="button" value="캘린더 생성하기" onClick={handleClickButton} />;
}
