import styled, { css } from "styled-components";

import { ReactComponent as ArrowDown } from "../../../assets/icons/arrow-down.svg";
import { ReactComponent as ArrowUp } from "../../../assets/icons/arrow-up.svg";

interface DropdownBtnProps {
  width?: string;
  open: boolean;
}

interface DropdownContentProps {
  open: boolean;
}

export const Container = styled.div`
  position: relative;
  display: inline-block;
`;

export const UserImg = styled.img`
  width: 3.3rem;
  height: 3.3rem;
  border-radius: 50%;
  margin: 0.4rem 0 0.4rem 0.6rem;
`;

export const DropdownBtn = styled.button<DropdownBtnProps>`
  background-color: rgba(255, 255, 255, 0.1);
  color: #fff;

  font-size: 1.3rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  cursor: pointer;

  width: ${({ width }) => (width ? width : "15rem")};

  display: flex;
  align-items: center;
  justify-content: space-between;

  border-radius: 20px;

  svg {
    width: 1rem;
    height: 0.8rem;
  }

  ${({ open }) =>
    open &&
    css`
      background-color: #fff;
      color: #6e54ff;

      border-bottom-left-radius: unset;
      border-bottom-right-radius: unset;

      border: 1px solid rgba(255, 255, 255);
    `}
`;

export const DropdownContent = styled.div<DropdownContentProps>`
  display: none;
  position: absolute;
  background-color: #fff;
  z-index: 1;

  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;

  ${({ open }) =>
    open &&
    css`
      display: flex;
      flex-direction: column;

      width: 100%;
      padding: 1rem;

      align-items: center;
    `}
`;

export const ArrowDownIcon = styled(ArrowDown)`
  margin: 0.4rem 0.8rem 0.4rem 0;
`;

export const ArrowUpIcon = styled(ArrowUp)`
  margin: 0.4rem 0.8rem 0.4rem 0;
`;

export const IconContainer = styled.div`
  display: flex;
  width: 3.3rem;
  justify-content: flex-end;
`;
