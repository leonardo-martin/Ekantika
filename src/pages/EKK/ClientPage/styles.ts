import { shade } from "polished";
import styled, { css } from "styled-components";
import { ReactComponent as GoBackIconSVG } from "../../../assets/icons/go-back.svg";
import { ReactComponent as EditIconSVG } from "../../../assets/icons/edit.svg";
import { ReactComponent as RemoveIconSVG } from "../../../assets/icons/trash.svg";

import { Grid as MUIGrid } from "@material-ui/core";

interface FieldProps {
  isRootCompany: boolean;
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
  padding: 3.2rem 2.4rem;

  max-width: 1920px !important;
`;

export const IconsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
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

export const GobackDiv = styled.div`
  display: flex;
  align-items: center;
`;

export const GoBackIcon = styled(GoBackIconSVG)`
  background: #fff;
  border-radius: 50%;
  width: 2.8rem;
  height: 2.8rem;
  padding: 0.6rem;
  margin-bottom: 2rem;

  transition: background 0.3s;

  cursor: pointer;

  margin-right: 0.8rem;

  &:hover {
    background: ${shade(0.1, "#fff")};
  }
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

export const ModalTitle = styled.h1`
  color: #6e54ff;
  font-size: 1.8rem;
  font-weight: 900;
  margin-bottom: 2rem;
`;

export const ModalContainer = styled.div`
  width: 50rem;
`;

export const TableHead = styled(MUIGrid)`
  border-radius: 10px;
  margin: 2rem 0;
  padding: 1rem 2rem 1rem 7rem;
  align-items: center;
  background: #f2f3f5;
`;

export const HierarchyWrapper = styled(MUIGrid)`
  border-radius: 10px;
  margin-bottom: 1rem;
  padding: 1rem 2rem 1rem 7rem;
  align-items: center;
  border: 1px solid #ddd7e6;
`;

export const Toolbar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const HierarchyName = styled.h2`
  color: #6e54ff;
  font-weight: 900;
  font-size: 1.3rem;
  text-transform: uppercase;
`;

export const ModalDescription = styled.p`
  margin: 1rem 0 2.5rem;

  font-size: 1.5rem;
  color: #4f6872;
`;

export const IdField = styled.p<FieldProps>`
  font-size: 1.3rem;
  text-transform: uppercase;

  color: ${({ isRootCompany }) => (isRootCompany ? "#6e54ff" : "#324147")};
  font-weight: ${({ isRootCompany }) => (isRootCompany ? "900" : "normal")};
`;

export const TypeField = styled.p<FieldProps>`
  color: ${({ isRootCompany }) => (isRootCompany ? "#6e54ff" : "#324147")};

  font-weight: 900;
  font-size: 1.3rem;
  text-transform: uppercase;
`;

export const NameField = styled.p<FieldProps>`
  color: ${({ isRootCompany }) => (isRootCompany ? "#6e54ff" : "#324147")};

  font-weight: ${({ isRootCompany }) => (isRootCompany ? "900" : "normal")};
  font-size: 1.3rem;
  text-transform: uppercase;
`;

export const CnpjField = styled.p<FieldProps>`
  color: ${({ isRootCompany }) => (isRootCompany ? "#6e54ff" : "#324147")};

  font-weight: ${({ isRootCompany }) => (isRootCompany ? "900" : "normal")};
  font-size: 1.3rem;
  text-transform: uppercase;
`;
