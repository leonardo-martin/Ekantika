import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "@material-ui/core";
import styled from "styled-components";
import { lighten } from "polished";

import { ReactComponent as ArrowDownIcon } from "../../../../assets/icons/arrow-down.svg";
import { ReactComponent as ArrowUpIcon } from "../../../../assets/icons/arrow-up.svg";

export const ArrowUp = styled(ArrowUpIcon)`
  path {
    fill: #4f6872;
  }
`;

export const ArrowDown = styled(ArrowDownIcon)`
  path {
    fill: #4f6872;
  }
`;

export const CustomAccordionSummary = styled(AccordionSummary)`
  padding: 0 1rem;
`;

export const CustomAccordion = styled(Accordion)`
  box-shadow: none;
  overflow: hidden;

  &,
  &.MuiAccordion-rounded:last-child {
    border-radius: 10px;
  }

  &.Mui-expanded {
    border: 1px solid var(--destaques_e_btns);

    ${CustomAccordionSummary} {
      background: ${lighten(0.3, "#6e54ff")};
    }
  }
`;

export const CustomAccordionDetails = styled(AccordionDetails)`
  padding: 0 1rem;
`;

interface DataProps {
  inactive?: boolean;
}

export const Data = styled.div<DataProps>`
  display: grid;
  width: 100%;
  grid-template-columns: 8rem 3fr 2fr 1fr 1fr 1fr 48px;
  gap: 1.6rem;

  align-items: center;

  color: ${(props) =>
    props.inactive ? "var(--infos_inativas_bgs_brancos)" : "var(--textos)"};

  font-size: 1.4rem;
`;

export const MemberNameAndRoleContainer = styled.div`
  display: grid;
`;

export const MemberName = styled.span``;

export const MemberRole = styled.span`
  color: var(--infos_inativas_bgs_brancos);
  font-size: 1.2rem;
`;

export const NoMembersYet = styled.div`
  font-size: 1.4rem;
  padding: 4rem;
  text-align: center;

  color: var(--infos_inativas_bgs_brancos);
`;

export const MemberTeamsHistoryContainer = styled.div`
  padding: 2.4rem 8rem;
  width: 100%;
`;

export const MemberTeamsHistoryDataContainer = styled.div`
  padding: 1.6rem 1rem;
  display: grid;
  gap: 0.8rem;
`;

type MemberTeamsHistoryDataProps = {
  inactive?: boolean;
};

export const MemberTeamsHistoryData = styled.div<MemberTeamsHistoryDataProps>`
  display: grid;
  font-size: 1.3rem;
  text-transform: uppercase;
  grid-template-columns: 3fr 2fr 1fr 1fr 8rem;
  color: ${(props) =>
    props.inactive ? "var(--infos_inativas_bgs_brancos)" : "var(--textos)"};
`;
