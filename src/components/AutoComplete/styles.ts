import { shade } from "polished";
import styled, { css } from "styled-components";

interface AutoCompleteContentProps {
  open: boolean;
  width?: string;
}

export const Container = styled.div`
  position: relative;
  display: inline-block;
  width: 100%;
`;

export const AutoCompleteContent = styled.div<AutoCompleteContentProps>`
  display: none;
  position: absolute;
  background-color: #fff;
  border: 1px solid #ddd7e5;

  margin-top: 0.4rem;
  margin-bottom: 2rem;
  z-index: 1;

  border-radius: 10px;

  max-height: 20rem;
  overflow: auto;

  ::-webkit-scrollbar {
    width: 8px;
    height: 6px;
  }
  ::-webkit-scrollbar-thumb {
    background: #6e54ff;
    border-radius: 8px;
    cursor: pointer;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: ${shade(0.2, "#6e54ff")};
  }
  ::-webkit-scrollbar-track {
    background: none;
    border: none;
  }

  width: 100%;

  ${({ open }) =>
    open &&
    css`
      display: flex;
      flex-direction: column;

      padding: 1rem;

      align-items: center;
    `}
`;

export const DropdownItem = styled.button`
  font-size: 1.3rem;
  padding: 1.6rem 0;
  width: 100%;
  background: none;
  border: none;
  transition: background 0.3s;
  border-radius: 5px;

  color: #4f6872;

  &:hover {
    background: rgba(0, 0, 0, 0.04);
  }
`;
