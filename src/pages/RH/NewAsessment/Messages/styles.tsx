import styled from "styled-components";
import { TablePagination as MUITablePagination } from "@material-ui/core";

export const TablePagination = styled(MUITablePagination)`
  width: 100%;
  display: flex;
  border: none;

  > div {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-top: 0.6rem;

    > p {
      font-size: 1.4rem;
    }

    .MuiTablePagination-spacer {
      display: none;
    }
  }
`;

export const Container = styled.div`
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  padding: 2.4rem;
`;

export const Text = styled.div`
  font-weight: bold;
  font-size: 1.5rem;
  color: #4f6872;
  margin-left: 1rem;
`;
