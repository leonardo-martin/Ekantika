import styled, { css } from "styled-components";

export const inputLabelDirections = {
  vertical: () => css`
    margin-bottom: 1.2rem;
  `,
  horizontal: () => css`
    margin-right: 1.2rem;
  `,
};

export interface InputLabelProps {
  direction?: keyof typeof inputLabelDirections;
}

const InputLabel = styled.label<InputLabelProps>`
  display: block;
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--textos);

  ${({ direction = "vertical" }) => inputLabelDirections[direction]}
`;

export default InputLabel;
