import { Grid } from "@material-ui/core";
import { shade } from "polished";
import styled from "styled-components";

import { ReactComponent as EditIconSVG } from "../../../../../assets/icons/edit.svg";

export const Container = styled.div`
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  padding: 2.4rem;
`;

export const Title = styled.h2`
  font-weight: bold;
  font-size: 1.8rem;
  text-transform: uppercase;
  color: #6e54ff;
  margin-bottom: 2rem;
`;

export const TableHead = styled(Grid)`
  background: #f2f3f5;
  border-radius: 7.5px;
  padding: 1rem 0;
  margin: 2.5rem 0 1rem;
`;

export const HeadField = styled(Grid)`
  color: #6e54ff;
  font-weight: 900;
  padding: 0 2.5rem;
  font-size: 1.3rem;
`;

export const TableBody = styled.div``;

export const TableRow = styled(Grid)`
  & + div {
    border-top: 1px solid #ddd7e6;
  }
`;

export const BodyField = styled(Grid)`
  padding: 2rem 2.5rem;
  display: flex;

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

export const DropdownItem = styled.button`
  font-size: 1.2rem;
  padding: 1.2rem 0;
  width: 100%;
  background: none;
  border: none;
  transition: background 0.3s;
  border-radius: 5px;

  color: #4f6872;

  &:hover {
    background: rgba(0, 0, 0, 0.04);
  }
`;
