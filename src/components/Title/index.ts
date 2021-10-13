import styled, { css } from "styled-components";

const titleModifiers = {
  size: {
    medium: () => css`
      font-size: 1.8rem;
    `,
    small: () => css`
      font-size: 1.3rem;
    `,
  },
};

interface TitleProps {
  size?: keyof typeof titleModifiers.size;
}

const Title = styled.h2<TitleProps>`
  ${({ size = "medium" }) => css`
    font-weight: bold;
    text-transform: uppercase;
    color: #6e54ff;
    margin-bottom: 2rem;

    ${titleModifiers.size[size]()}
  `}
`;

export default Title;
