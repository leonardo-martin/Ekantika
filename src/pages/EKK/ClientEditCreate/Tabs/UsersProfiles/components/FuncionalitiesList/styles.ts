import styled from "styled-components";

import {
  Switch as MUISwitch,
  Checkbox as MuiCheckbox,
  Grid as MuiGrid,
} from "@material-ui/core";

export const Container = styled.div`
  width: 100%;
  margin-left: auto;
  margin-right: auto;
`;

export const RowGrid = styled(MuiGrid)`
  padding: 0 2rem;
  & + div {
    border-top: 1px solid #ddd7e6;
  }
`;

export const Title = styled.h2`
  font-size: 1.5rem;
  color: #324147;
  cursor: pointer;

  svg {
    margin-left: 1rem;
  }
`;

export const Description = styled.p`
  font-size: 1.5rem;
  color: #fff;

  line-height: 1.6rem;

  padding: 0.6rem;
`;

export const Switch = styled(MUISwitch)`
  .MuiSwitch-colorPrimary.Mui-checked {
    color: #6e54ff;
  }
  span.MuiSwitch-track {
    background-color: #6e54ff !important;
  }
`;

// export const Checkbox = styled(MuiCheckbox)`
//   &.Mui-disabled {
//     color: #c8c9e0 !important;
//   }
//   &.MuiCheckbox-colorPrimary.Mui-checked {
//     color: #6e54ff;
//   }
// `;
