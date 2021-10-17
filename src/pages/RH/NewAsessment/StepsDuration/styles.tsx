import styled from "styled-components";
import { Grid } from "@material-ui/core";

export const Grid1 = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;

  gap: 3.2rem;

  > *:nth-child(1) {
    grid-column: 1 / -2;
  }

  > *:nth-child(2) {
    grid-column: 1 / -4;
  }
`;


export const Container = styled.div`
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  padding: 2.4rem;
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

export const EvaluatorsGrid = styled(Grid)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  > * {
    margin-top: 1.8rem;
  }

  & + div {
    border-left: 1px solid #ddd7e5;
  }
`;
