import styled from "styled-components";

interface ContainerProps {
  borderRadius?: string;
}

interface InputTextProps {
  borderRadius?: string;
}

export const Container = styled.div<ContainerProps>`
  border-radius: ${({ borderRadius }) =>
    borderRadius ? borderRadius : "10px"};
  border: 1px solid #ddd7e5;
  width: 100%;

  display: flex;
  align-items: center;

  & + div {
    margin-top: 1rem;
  }

  svg {
    margin: 0 0.3rem 0 1.1rem;
    path {
      fill: #4f6872;
    }
  }
`;

export const TextareaText = styled.textarea<InputTextProps>`
  flex: 1;
  border: 0;
  color: #324147;
  height: 100%;
  background: transparent;
  width: 100%;
  padding: 1.2rem;
  font-size: 1.3rem;
  border-radius: ${({ borderRadius }) =>
    borderRadius ? borderRadius : "10px"};

  &::placeholder {
    color: #b1aabb;
  }

  &:focus {
    outline: none;
  }
`;
