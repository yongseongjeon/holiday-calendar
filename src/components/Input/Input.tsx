import styled from "styled-components";

export default function Input({ value, onChange }: any) {
  return <StyledInput value={value} type="number" onChange={onChange} />;
}

const StyledInput = styled.input`
  width: 6rem;
  height: 1.5rem;
  font-size: 1.2rem;
  padding: 0.5rem;
`;
