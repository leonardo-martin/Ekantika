import { shade } from "polished";
import styled, { css } from "styled-components";

import { ReactComponent as EditIconSVG } from "../../../../../assets/icons/edit.svg";
import { ReactComponent as RemoveIconSVG } from "../../../../../assets/icons/trash.svg";

interface HierarchyLevelProps {
  isRoot: boolean;
}

interface EditIconProps {
  isRoot: boolean;
}

interface RemoveIconProps {
  isRoot: boolean;
}

export const Container = styled.div`
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  padding: 2.4rem;
`;

export const Toolbar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

export const ModalContainer = styled.div`
  padding: 0.7rem 1rem;
  width: 35vw;
`;

export const ModalTitle = styled.h2`
  font-weight: bold;
  font-size: 1.8rem;
  text-transform: uppercase;

  color: #6e54ff;
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

export const IconsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-left: auto;
`;

export const EditIcon = styled(EditIconSVG)<EditIconProps>`
  background: #f2f3f5;
  border-radius: 50%;
  width: 3rem;
  height: 3rem;
  padding: 0.4rem;
  margin-right: 0.8rem;

  transition: background 0.3s;

  cursor: pointer;

  margin-right: 0.8rem;

  &:hover {
    background: ${shade(0.1, "#f2f3f5")};
  }

  ${({ isRoot }) =>
    isRoot &&
    css`
      path {
        stroke: #fff;
      }

      background: rgba(110, 84, 255, 0.6);

      &:hover {
        background: ${shade(0.1, "rgba(110, 84, 255, 0.6)")};
      }
    `};
`;

export const RemoveIcon = styled(RemoveIconSVG)<RemoveIconProps>`
  background: #f2f3f5;
  border-radius: 50%;
  width: 3rem;
  height: 3rem;
  padding: 0.4rem;

  transition: background 0.3s;

  cursor: pointer;

  margin-right: 0.8rem;

  &:hover {
    background: ${shade(0.1, "#f2f3f5")};
  }

  ${({ isRoot }) =>
    isRoot &&
    css`
      path {
        stroke: #fff;
      }

      background: rgba(110, 84, 255, 0.6);

      &:hover {
        background: ${shade(0.1, "rgba(110, 84, 255, 0.6)")};
      }
    `};
`;

export const ModalDescription = styled.p`
  margin: 1rem 0 2.5rem;

  font-size: 1.5rem;
  color: #4f6872;
`;

export const HierarchyWrapper = styled.div`
  display: flex;
  border-radius: 10px;
  margin-bottom: 2rem;
  padding: 1rem 2rem;
  align-items: center;
  border: 1px solid #ddd7e6;
`;

export const HierarchyLevel = styled.h3<HierarchyLevelProps>`
  font-weight: 900;
  font-size: 1.3rem;
  text-transform: uppercase;
  color: ${({ isRoot }) => (isRoot ? "#6E54FF" : "#324147")};
`;

export const HierarchyMain = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 15rem;
`;

export const HierarchyName = styled.h2`
  color: #6e54ff;
  font-weight: 900;
  font-size: 1.3rem;
  text-transform: uppercase;
`;

export const HierarchyManager = styled.p`
  font-size: 1.5rem;
  color: #324147;
`;
