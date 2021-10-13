import styled from "styled-components";
import Title from "../../../components/Title";

export const HomeGrid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 3fr 1fr;
  gap: 3.2rem;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

export const AssessmentStatusFlex = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2.4rem;
`;

export const AsessmentTeam = styled.span`
  font-size: 1.5rem;
`;

export const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const AssessmentsFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 1.6rem;
  padding-top: 1.6rem;
  border-top: 1px solid var(--claro_linhas);
`;

export const AssessmentAmount = styled.span`
  font-size: 10rem;
  font-weight: 700;
  color: var(--cinza_icones);
`;

export const AssessmentHighlights = styled.div`
  > * + * {
    border-top: 1px solid var(--claro_linhas);
  }
`;

export const AssessmentFinishRateContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2.4rem 0;
`;

export const BlackTitle = styled(Title).attrs({ as: "h4" })`
  color: var(--textos);
`;

export const AlertContainer = styled.div`
  display: flex;
  align-items: center;

  span {
    margin-left: 0.8rem;
    color: var(--cinza_icones);
    font-size: 1.4rem;
  }
`;

export const AssessmentFinishRate = styled.strong`
  color: var(--destaques_e_btns);
  font-size: 4.4rem;
`;

export const StatusContainer = styled.div`
  padding: 4rem 0;

  > * + * {
    margin-top: 1.6rem;
  }
`;

export const StatusProgressContainer = styled.div`
  & + & {
    margin-top: 1.6rem;
  }
  h4 {
    margin-bottom: 0.8rem;
  }
`;

export const StatusProgress = styled.div`
  display: flex;

  > *:first-child {
    flex: 1;
  }

  > span {
    font-size: 1.8rem;
  }

  > * + * {
    margin-left: 2.4rem;
  }
`;

export const PriorityContainer = styled.div`
  display: flex;
  justify-content: center;
`;
