import { shade } from "polished";
import styled, { css } from "styled-components";

import { ReactComponent as ArrowDown } from "../../assets/icons/arrow-down.svg";
import { ReactComponent as ArrowUp } from "../../assets/icons/arrow-up.svg";

interface DropdownBtnProps {
  width?: string;
  open: boolean;
  fullRounded?: boolean;
}

interface DropdownContentProps {
  open: boolean;
  width?: string;
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
  background-color: #fff;
  color: #000;

  font-size: 1.3rem;
  border: 1px solid #ddd7e5;
  cursor: pointer;

  width: ${({ width }) => (width ? width : "15rem")};

  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 1.2rem;

  border-radius: ${({ fullRounded = true }) => (fullRounded ? "20px" : "10px")};
`;

export const DropdownContent = styled.div<DropdownContentProps>`
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

  width: ${({ width }) => (width ? width : "15rem")};

  ${({ open }) =>
    open &&
    css`
      display: flex;
      flex-direction: column;

      padding: 1rem;

      align-items: center;
    `}
`;

export const ArrowDownIcon = styled(ArrowDown)`
  path {
    fill: #4f6872;
  }
`;

export const ArrowUpIcon = styled(ArrowUp)`
  path {
    fill: #4f6872;
  }
`;

export const IconContainer = styled.div`
  display: flex;
  width: 3.3rem;
  justify-content: flex-end;
`;

export const PlaceHolderText = styled.p`
  color: #b1aabb;
`;
