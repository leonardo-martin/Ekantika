import styled from "styled-components";
import { Grid } from "@material-ui/core";

import { ReactComponent as MinusIcon } from "../../../../assets/icons/minus.svg";
import { ReactComponent as PlusIcon } from "../../../../assets/icons/plus.svg";

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

export const PercentageContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin: 1.5rem 0;
`;

export const ReduceControl = styled.button`
  border: none;
  background: transparent;
`;

export const IncreaseControl = styled.button`
  border: none;
  background: transparent;
`;

export const ReduceIcon = styled(MinusIcon)`
  border-radius: 50%;
  margin-right: 0.8rem;
`;

export const IncreaseIcon = styled(PlusIcon)`
  border-radius: 50%;
  margin-left: 0.8rem;
`;

export const MinMaxContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-top: 1.5rem;
`;

export const EvaluatorsGrid = styled(Grid)`
  display: flex;
  align-items: center;
  text-align: center;
  flex-direction: column;
  padding: 2rem 4rem !important;
  justify-content: space-between;

  & + div {
    border-left: 1px solid #ddd7e5;
  }
`;
