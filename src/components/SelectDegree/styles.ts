import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;

  > * + * {
    margin-left: 1.6rem;
  }
`;

export const DegreeButton = styled.button<{ isSelected: boolean }>`
  width: 12rem;
  height: 4.2rem;
  border: none;
  background-color: ${({ isSelected }) =>
    isSelected ? "var(--destaques_e_btns)" : "var(--branco)"};
  color: ${({ isSelected }) =>
    isSelected ? "var(--branco)" : "var(--cinza_icones)"};

  font-size: 1.8rem;
  font-weight: 700;

  border-radius: 9999px;

  display: flex;
  align-items: center;
  justify-content: center;

  > svg {
    width: 2.4rem;
  }

  > svg,
  > svg path {
    stroke: ${({ isSelected }) =>
      isSelected ? "var(--branco)" : "var(--cinza_icones)"};
  }

  > * + * {
    margin-left: 1.6rem;
  }
`;
