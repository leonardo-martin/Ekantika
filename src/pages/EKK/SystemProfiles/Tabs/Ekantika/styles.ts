import styled from "styled-components";
import {
  Accordion as MUIAccordion,
  AccordionSummary as MUIAccordionSummary,
} from "@material-ui/core";
import { ReactComponent as ArrowDown } from "../../../../../assets/icons/arrow-down.svg";

export const Container = styled.div`
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  padding: 2.4rem;
`;

export const Title = styled.h2`
  font-weight: bold;
  font-size: 1.8rem;
  text-transform: uppercase;
  color: #6e54ff;
  margin-bottom: 1.5rem;
`;

export const SubTitle = styled.h3`
  font-weight: 900;
  font-size: 1.3rem;
  text-transform: uppercase;
  color: #324147;
`;

export const Text = styled.p`
  font-size: 1.4rem;
  color: #324147;
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
    padding: 0;
  }

  .MuiGrid-root.MuiGrid-container {
    margin: 0;
  }

  .MuiCollapse-root {
    padding: 0px 16px;
  }

  .MuiAccordionSummary-content {
    margin: 0;
  }

  .MuiGrid-spacing-xs-3 > .MuiGrid-item {
    padding: 13px;
  }
`;

export const AccordionSummary = styled(MUIAccordionSummary)`
  .MuiAccordionSummary-content {
    position: relative;
    padding: 0 2rem;
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
