import styled, { keyframes } from "styled-components";

export default function Loading() {
  return (
    <Container>
      <Spinner />
    </Container>
  );
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const rotate = keyframes`
from {
  transform: rotate(0deg);
}
to {
  transform: rotate(360deg);
}
`;

const Spinner = styled.div`
  width: 100px;
  height: 100px;
  border: 10px solid grey;
  border-top-color: #fff;
  border-radius: 50%;
  animation: ${rotate} 1s linear infinite;
`;
