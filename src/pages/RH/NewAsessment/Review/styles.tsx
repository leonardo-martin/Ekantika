import styled from "styled-components";

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;

  gap: 2.4rem;
`;

export const Container = styled.div`
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  padding: 2.4rem;
  > * {
    padding-bottom: 3rem;
    padding-top: 3rem;
    border-bottom: 1px solid #cdcdcd;
  }
  > *:last-child {
    padding-bottom: 0;
    border-bottom: none;
  }
`;

export const Title = styled.div`
  font-weight: bold;
  font-size: 1.8rem;
  text-transform: uppercase;
  color: #6e54ff;
  margin-bottom: 1.5rem;
`;

export const Text = styled.div`
  font-weight: bold;
  font-size: 1.5rem;
  color: #4f6872;
`;

export const Text2 = styled.div`
  font-size: 2.5rem;
`;

export const HStack = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  width: 100%;
`;

export const MembersTable = styled.div`
  margin-top: 4rem;
  
`;

export const MembersTableRow = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  align-items: center;
  gap: 1.6rem;
  padding: 1.4rem 1rem;
  border-bottom: 1px solid #cdcdcd;
  :last-child {
    border-bottom: none;
  }
`;

export const MembersTableRowData = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 2fr 1fr;

  font-size: 1.5rem;
  
`;

export const GradeTable = styled.div`
  margin-top: 4rem;  
`;

export const GradeTableRow = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  align-items: center;
  gap: 1.6rem;
  padding: 1.4rem 1rem;
  border-bottom: 1px solid #cdcdcd;
  :last-child {
    border-bottom: none;
  }
`;

export const GradeTableRowData = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 4fr 1fr;

  font-size: 1.5rem;
`;

export const DegreeButton = styled.div`
  width: 12rem;
  height: 4.2rem;
  border: none;
  background-color: var(--destaques_e_btns);
  color: var(--branco);

  font-size: 1.8rem;
  font-weight: 700;

  border-radius: 9999px;

  display: flex;
  align-items: center;
  justify-content: center;

  > svg {
    width: 2.4rem;
  }

  > svg,
  > svg path {
    stroke: var(--branco);
  }

  > * + * {
    margin-left: 1.6rem;
  }
`;

export const ReviewTable = styled.div`
  margin-top: 4rem;  
`;

export const ReviewTableRow = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  align-items: center;
  gap: 1.6rem;
  padding: 1.4rem 1rem;
  border-bottom: 1px solid #cdcdcd;
  :last-child {
    border-bottom: none;
  }
`;

export const ReviewTableRowData = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;

  font-size: 1.5rem;
`;