import styled from "styled-components";
import { Checkbox as MUICheckbox } from "@material-ui/core";

const Checkbox = styled(MUICheckbox)`
  &.MuiCheckbox-root.Mui-checked {
    color: var(--destaques_e_btns);
  }
`;

export default Checkbox;
