import styled from "styled-components";

export const AddTeamMemberContainer = styled.div`
  max-width: 100%;

  @media (min-width: 1200px) {
    width: 96rem;
  }
`;

export const SelectMemberHStack = styled.div`
  display: grid;
  gap: 3rem;
`;

export const DropdownGrid = styled.div`
  display: flex;

  > * + * {
    margin-left: 3rem;
  }
`;

export const ScrollableMembersContainer = styled.div`
  max-height: 40rem;
  overflow-y: scroll;
`;

export const Member = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: 7rem 6rem 2fr 1fr 1fr;
  align-items: center;
  font-size: 1.4rem;
`;

export const SelectedMemberDetailsContainer = styled.div`
  padding: 2.4rem 7rem;
`;

export const SelectedTeamMemberAttributesGrid = styled.div`
  display: grid;
  gap: 3rem;
  grid-template-columns: repeat(3, 1fr);
`;

export const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-self: end;

  span {
    font-size: 1.4rem;
  }

  > * + * {
    margin-left: 1.6rem;
  }
`;
