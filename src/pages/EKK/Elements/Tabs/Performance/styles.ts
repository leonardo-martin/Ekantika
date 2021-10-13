import styled from "styled-components";
import { shade } from "polished";

import { ReactComponent as EditIconSVG } from "../../../../../assets/icons/edit.svg";
import { ReactComponent as CopyIconSVG } from "../../../../../assets/icons/copy.svg";
import { ReactComponent as RemoveIconSVG } from "../../../../../assets/icons/trash.svg";

import { Switch as MUISwitch } from "@material-ui/core";
import { TablePagination as MUITablePagination } from "@material-ui/core";

export const Container = styled.div`
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  padding: 2.4rem;
`;

export const IconsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

export const EditIcon = styled(EditIconSVG)`
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
`;

export const CopyIcon = styled(CopyIconSVG)`
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
`;

export const RemoveIcon = styled(RemoveIconSVG)`
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
`;

export const ModalContainer = styled.div``;

export const ModalTitle = styled.h2`
  font-weight: bold;
  font-size: 1.8rem;
  text-transform: uppercase;
  color: #6e54ff;
`;

export const ModalSubtitle = styled.h3`
  font-weight: bold;
  font-size: 15px;
  color: #324147;
  margin-bottom: 1rem;
`;

export const Switch = styled(MUISwitch)`
  .MuiSwitch-colorPrimary.Mui-checked {
    color: #6e54ff;
  }
  span.MuiSwitch-track {
    background-color: #6e54ff !important;
  }
`;

export const ModalDescription = styled.p`
  margin: 1rem 0 2.5rem;

  font-size: 1.5rem;
  color: #4f6872;
`;

export const TablePagination = styled(MUITablePagination)`
  width: 100%;
  display: flex;
  border: none;

  > div {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-top: 0.6rem;

    > p {
      font-size: 1.4rem;
    }

    .MuiTablePagination-spacer {
      display: none;
    }
  }
`;
