import Text from "../components/Text";
import styled from "styled-components";
import Input from "../components/Input";
import CreateCalendarButton from "../components/CreateCalendarButton";
import useInput from "../hooks/useInput";

function YearInput() {
  const [year, _, handleChangeInput] = useInput("");

  return (
    <Container>
      <Header>
        <Text size="1.7rem" weight="700" color="black" value="공휴일을 확인하고 싶은 연도를 입력해주세요"></Text>
        <Input value={year} onChange={handleChangeInput} />
      </Header>
      <CreateCalendarButton year={year} />
    </Container>
  );
}

export default YearInput;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
  padding: 1rem;
`;

const Header = styled.header`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;
