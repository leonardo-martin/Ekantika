import styled, { css } from "styled-components";

const colorSchemes = {
  primary: "var(--destaques_e_btns)",
  secondary: "var(--cinza_icones)",
  yellow: "var(--amarelo)",
  green: "var(--verde)",
};

type ColorSchemes = keyof typeof colorSchemes;

const variants = {
  outline: (colorScheme: ColorSchemes) => css`
    border: 1px solid ${colorSchemes[colorScheme]};
    color: ${colorSchemes[colorScheme]};
  `,

  filled: (colorScheme: ColorSchemes) => css`
    color: white;
    background-color: ${colorSchemes[colorScheme]};
  `,
};

export interface LabelContainerProps {
  colorScheme?: ColorSchemes;
  variant?: keyof typeof variants;
}

export const LabelContainer = styled.span<LabelContainerProps>`
  ${({ colorScheme = "primary", variant = "outline" }) => css`
    ${variants[variant](colorScheme)}
  `}

  font-weight: 700;
  padding: 0.6rem 2rem;
  border-radius: 9999px;
`;
