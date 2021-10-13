import styled from "styled-components";
import { shade } from "polished";

import { ReactComponent as TrashSVG } from "../../../../assets/icons/trash.svg";

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;

  gap: 2.4rem;

  > *:nth-child(3) {
    grid-column: 1 / -1;
  }
`;

export const HStack = styled.div`
  display: flex;
  width: 100%;

  > * {
    flex: 1;
  }

  > * + * {
    margin-left: 1.6rem;
  }
`;

export const MembersTable = styled.div`
  margin-top: 4rem;
`;

export const MembersTableRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 4.8rem;
  align-items: center;
  gap: 1.6rem;
  padding: 0.8rem 0;
`;

export const MembersTableRowData = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 3fr 2fr 2fr 4.8rem;

  font-size: 1.5rem;
`;

export const Delete = styled(TrashSVG)`
  background: #f2f3f5;
  border-radius: 50%;
  width: 4rem;
  height: 4rem;
  padding: 0.4rem;

  transition: background 0.3s;

  cursor: pointer;

  margin-right: 0.8rem;

  &:hover {
    background: ${shade(0.1, "#f2f3f5")};
  }
`;

export const MembersTableRowDataDetails = styled.div`
  padding: 2.4rem 2.8rem;

  width: 100%;

  > * + * {
    margin-top: 3.2rem;
  }
`;

export const SquadInfo = styled.div`
  display: flex;
  align-items: center;

  > * + * {
    margin-left: 0.8rem;
  }
`;

export const SquadTitle = styled.h2`
  font-weight: 700;
  font-size: 1.5rem;
  display: inline-block;
  text-transform: uppercase;

  color: var(--cinza_icones);

  span {
    color: var(--destaques_e_btns);
  }
`;
