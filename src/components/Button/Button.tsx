import styled from "styled-components";
import Text from "../Heading/Text";

export default function Button({ value, onClick }: any) {
  return (
    <StyledButton onClick={onClick}>
      <Text size="1.2rem" color="white" weight="700" value={value} />
    </StyledButton>
  );
}

const StyledButton = styled.button`
  height: 3rem;
  background-color: #3498db;
`;
