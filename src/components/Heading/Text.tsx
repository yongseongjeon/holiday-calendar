import styled from "styled-components";

interface SpanProps {
  size: string;
  weight: string;
  color: string;
}

interface TextProps extends SpanProps {
  value: string;
}

export default function Text({ size, weight, color, value }: TextProps) {
  return (
    <Span size={size} weight={weight} color={color}>
      {value}
    </Span>
  );
}

const Span = styled.span<SpanProps>`
  font-size: ${({ size }) => size};
  font-weight: ${({ weight }) => weight};
  color: ${({ color }) => color};
`;
