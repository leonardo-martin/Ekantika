import styled from "styled-components";

export const Button = styled.button`
  height: 3.2rem;
  width: 3.2rem;
  font-size: 1.6rem;
  color: var(--branco);
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  font-weight: 700;

  background-color: var(--claro_linhas);

  & + & {
    margin-left: 4rem;

    ::before,
    ::after {
      content: "";
      display: block;
      border-radius: 9999px;

      height: 0.5rem;
      width: 0.5rem;
      background-color: var(--claro_linhas);

      position: relative;
      left: -2.25rem;
    }

    ::after {
      left: -5rem;
    }
  }
`;

export const Wrapper = styled.nav<{ currentStep?: number }>`
  display: flex;

  > ${Button}:nth-child(-n + ${({ currentStep: pageNumber }) => pageNumber}) {
    background-color: var(--destaques_e_btns);

    ::before,
    ::after {
      content: " ";
      background-color: var(--destaques_e_btns);
    }
  }
`;
