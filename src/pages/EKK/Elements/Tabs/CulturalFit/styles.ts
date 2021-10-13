import styled from "styled-components";
import { shade } from "polished";

import { ReactComponent as EditIconSVG } from "../../../../../assets/icons/edit.svg";
import { ReactComponent as CopyIconSVG } from "../../../../../assets/icons/copy.svg";
import { ReactComponent as RemoveIconSVG } from "../../../../../assets/icons/trash.svg";
import { ReactComponent as HierarchyIconSVG } from "../../../../../assets/icons/hierarchy.svg";
import { ReactComponent as ArrowDown } from "../../../../../assets/icons/arrow-down.svg";

import {
  Accordion as MUIAccordion,
  AccordionSummary as MUIAccordionSummary,
  TablePagination as MUITablePagination,
  Switch as MUISwitch,
} from "@material-ui/core";

export const Container = styled.div`
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  padding: 2.4rem;

  .groupIcon {
    background: #000;
  }
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

export const HierarchyIcon = styled(HierarchyIconSVG)`
  border-radius: 50%;
  width: 3rem;
  height: 3rem;
  padding: 0.4rem;

  path {
    stroke: #6e54ff;
  }
  margin-left: 0.8rem;
`;

export const ModalContainer = styled.div`
  overflow-y: auto;
  max-height: 80vh;
  min-width: 65rem;
  width: 55vw;

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
`;

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

export const Accordion = styled(MUIAccordion)`
  box-shadow: none;
  border: 1px solid #ddd7e6;
  border-radius: 15px;

  &:before {
    display: none !important;
  }

  .MuiAccordionSummary-content {
    height: 100%;
  }

  .MuiAccordionSummary-root.Mui-expanded {
    min-height: 48px;
  }

  .MuiAccordionSummary-content.Mui-expanded {
    margin: 0;
  }

  .MuiAccordionSummary-root .MuiIconButton-root {
    display: none;
  }

  .MuiAccordionDetails-root {
    padding: 0 0 16px 16px;
  }

  .MuiGrid-root.MuiGrid-container {
    margin: 0;
  }

  .MuiCollapse-root {
    padding: 0 1.5rem 1.5rem;
  }

  .MuiAccordionSummary-content {
    margin: 0;
  }

  .MuiGrid-spacing-xs-3 > .MuiGrid-item {
    padding: 13px;
  }

  .MuiCollapse-hidden {
    padding: 0 !important;
  }
`;

export const AccordionSummary = styled(MUIAccordionSummary)`
  .MuiAccordionSummary-content {
    position: relative;
    padding: 0 2rem 0 0;
  }
`;

export const ArrowDownIcon = styled(ArrowDown)`
  position: absolute;
  justify-content: center;
  top: 37%;
  right: 0;

  width: 1rem;
  height: 1rem;

  path {
    fill: #4f6872;
  }
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  margin-left: auto;
`;

export const AccordionTitle = styled.p`
  font-weight: bold;
  font-size: 1.5rem;
  color: #6e54ff;
  display: flex;
  align-items: center;
`;

export const NodeTitle = styled.p`
  font-weight: bold;
  font-size: 1.5rem;
  color: #6e54ff;
  display: flex;
  align-items: center;
  margin-left: 1.5rem;
`;
