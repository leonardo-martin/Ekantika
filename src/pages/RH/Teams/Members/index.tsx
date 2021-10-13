import Label from "../../../../components/Label";

import { IntegrantsContainer, Labels } from "./styles";

export interface MembersProps {
  activeCount: number;
  inactiveCount: number;
}

const Members = (props: MembersProps) => (
  <IntegrantsContainer>
    <span>{props.activeCount + props.inactiveCount}</span>
    <Labels>
      {!!props.activeCount && <Label>{props.activeCount} ativos</Label>}
      {!!props.inactiveCount && (
        <Label colorScheme="secondary">{props.inactiveCount} inativos</Label>
      )}
    </Labels>
  </IntegrantsContainer>
);

export default Members;
