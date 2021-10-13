import styled from "styled-components";

import {
  Checkbox as MuiCheckbox,
} from "@material-ui/core";

export const Checkbox = styled(MuiCheckbox)`
  &.Mui-disabled {
    color: #c8c9e0 !important;
  }
  &.MuiCheckbox-colorPrimary.Mui-checked {
    color: #6e54ff;
  }
`;
