import styled, { css } from "styled-components";

import { Grid } from "@material-ui/core";
import { shade } from "polished";

import { ReactComponent as EditIconSVG } from "../../../../../assets/icons/edit.svg";
import { ReactComponent as RemoveIconSVG } from "../../../../../assets/icons/trash.svg";

interface TableRowProps {
  active?: string;
}
interface BodyFieldProps {
  active?: string;
}

export const Container = styled.div`
  & + div {
    border-top: 1px solid #ddd7e6;
  }
`;

export const TableRow = styled(Grid)<TableRowProps>`
  ${({ active }) =>
    active &&
    css`
      background: #f6f7fb;
      border: 1px solid #6e54ff;
      border-radius: 10px;
    `}
`;

export const BodyField = styled(Grid)<BodyFieldProps>`
  padding: 2rem 2.5rem;
  display: flex;
  align-items: center;

  font-size: 1.5rem;
  color: #324147;
`;

export const EditIcon = styled(EditIconSVG)`
  background: #f2f3f5;
  border-radius: 50%;
  width: 3rem;
  height: 3rem;
  padding: 0.4rem;
  margin-left: auto;

  transition: background 0.3s;

  cursor: pointer;

  margin-right: 0.8rem;

  &:hover {
    background: ${shade(0.1, "#f2f3f5")};
  }
`;

export const RemoveIcon = styled(RemoveIconSVG)`
  background: #fff;
  border-radius: 50%;
  width: 3rem;
  height: 3rem;
  padding: 0.4rem;
  margin-left: auto;

  transition: background 0.3s;

  cursor: pointer;

  margin-right: 1.5rem;

  &:hover {
    background: ${shade(0.1, "#fff")};
  }
`;

export const ConcluirBtn = styled.button`
  border: none;
  background: none;
  margin-right: 0.8rem;

  font-style: normal;
  font-weight: 900;
  font-size: 1.3rem;
  color: #6e54ff;
`;
