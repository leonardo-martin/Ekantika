import styled from 'styled-components';
import { ReactComponent as PlusIconSVG } from '../../../../assets/icons/plus.svg';
import { Switch as MUISwitch } from '@material-ui/core';

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;

  gap: 3.2rem;
`;

export const SpaceBetween = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const NoElement = styled.div`
  margin-top: 3.2rem;
  padding: 2.8rem 0;
  width: 100%;

  text-align: center;
  font-size: 1.5rem;

  color: var(--infos_inativas_bgs_brancos);
  border-radius: 20px;
  border: 1px dashed var(--infos_inativas_bgs_brancos);
`;

export const ElementsList = styled.div`
  max-height: 42rem;
  overflow-y: scroll;
  margin-top: 2.4rem;

  > * + * {
    border-top: 1px solid var(--claro_linhas);
  }
`;

export const Element = styled.button`
  background: var(--branco);
  border: none;
  padding: 1.6rem 2rem 1.6rem 0;

  font-size: 1.5rem;
  text-align: start;

  display: flex;
  align-items: center;

  > * + * {
    margin-left: 1.2rem;
  }

  span {
    flex: 1;
    color: var(--textos);
  }
`;

export const PlusIcon = styled(PlusIconSVG)`
  rect {
    fill: var(--destaques_e_btns);
  }

  path {
    stroke: var(--branco);
  }
`;

export const Answer = styled.div`
  background: #f2f3f5;
  padding: 3rem;
  margin: 3rem 0;
  border-radius: 15px;
`;

export const AnswerSubtitle = styled.h3`
  font-weight: bold;
  font-size: 15px;
  color: #324147;
  margin-bottom: 1rem;
`;

export const Switch = styled(MUISwitch)`
  .MuiSwitch-colorPrimary.Mui-checked {
    color: #6e54ff;
  }
  span.MuiSwitch-track {
    background-color: #6e54ff !important;
  }
`;
