import styled from "styled-components";
import { TablePagination as MUITablePagination } from "@material-ui/core";
import { Switch as MUISwitch, Toolbar as MUIToolbar } from "@material-ui/core";

import { Pagination as MUIPagination } from "@material-ui/lab";
import { shade } from "polished";

interface ContainerProps {
  borderBottom?: boolean;
}

export const Container = styled.div<ContainerProps>`
  table {
    border-spacing: 0;
    width: 100%;

    tr {
      :last-child {
        td {
          border-bottom: ${({ borderBottom }) => !borderBottom && "0"};
        }
      }
    }

    td {
      margin: 0;
      padding: 1.7rem 1rem;
      font-size: 1.3rem;
      border-bottom: 1px solid #ddd7e6;

      :last-child {
        border-right: 0;
      }
    }

    th {
      margin: 0;
      padding: 0.8rem 1rem;
      text-align: unset;
      background: #f2f3f5;

      font-size: 1.4rem;

      border-bottom: none;

      text-transform: uppercase;
      color: #6e54ff;
      font-weight: 900;
      line-height: inherit;

      :last-child {
        border-bottom-right-radius: 7.5px;
        border-top-right-radius: 7.5px;
      }
      :first-child {
        border-bottom-left-radius: 7.5px;
        border-top-left-radius: 7.5px;
      }
    }

    tbody::before {
      height: 0.8rem;
      display: block;
      content: "";
    }

    .MuiCheckbox-colorPrimary.Mui-checked {
      color: #6e54ff;
    }
  }
`;
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

export const Switch = styled(MUISwitch)`
  .MuiSwitch-colorPrimary.Mui-checked {
    color: #6e54ff;
  }
  span.MuiSwitch-track {
    background-color: #6e54ff !important;
  }
`;

export const Pagination = styled(MUIPagination)`
  div {
    font-size: 1.8rem;
    padding: 0 4px;

    width: 2.6rem;
    min-width: unset;
  }

  button {
    font-size: 1.5rem;
    height: 3rem;
    min-width: 3rem;
  }

  button.Mui-selected {
    background-color: #6e54ff;

    transition: background-color 0.3s;

    &:hover {
      background-color: ${shade(0.3, "#6e54ff")};
    }
  }
  svg {
    width: 2rem;
    height: 2rem;
  }
`;

export const Toolbar = styled(MUIToolbar)`
  width: 100%;
  justify-content: space-between;
  margin-bottom: 1rem;

  > div > p {
    font-size: 1.2rem;
    color: #4f6872;
    flex: none;
    margin-left: 1rem;
  }
`;

export const DropdownItem = styled.button`
  font-size: 1.3rem;
  padding: 1.6rem 0;
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
