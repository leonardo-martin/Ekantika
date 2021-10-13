import styled from "styled-components";
import {
  AccordionSummary as MUIAccordionSummary,
  Accordion as MUIAccordion,
  AccordionDetails as MUIAccordionDetails,
} from "@material-ui/core";
import { lighten } from "polished";

export const AccordionSummary = styled(MUIAccordionSummary)`
  padding: 0 1rem;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
`;

export const Accordion = styled(MUIAccordion)`
  box-shadow: none;

  &,
  &.MuiAccordion-rounded:last-child {
    border-radius: 10px;
  }

  &.Mui-expanded {
    border: 1px solid var(--destaques_e_btns);

    ${AccordionSummary} {
      background: ${lighten(0.3, "#6e54ff")};
    }
  }
`;

export const AccordionDetails = styled(MUIAccordionDetails)`
  padding: 0 1rem;
`;
