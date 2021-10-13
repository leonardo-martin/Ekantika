import styled from "styled-components";
import { Switch as MUISwitch } from "@material-ui/core";

export const Switch = styled(MUISwitch)`
  .MuiSwitch-switchBase.Mui-checked {
    color: #6e54ff;
  }
  span.MuiSwitch-track {
    background-color: #6e54ff !important;
  }
`;
