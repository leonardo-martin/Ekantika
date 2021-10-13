import clsx from "clsx";
import { lighten, makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

// import AddUserDialog from "./AddUserDialog";
import GlobalFilter from "./GlobalFilter";

import { Toolbar } from "../styles";
import Dropdown from "../../Dropdown";
import Button from "../../Button";
import { useState } from "react";
import { DropdownItem } from "../styles";

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: "1 1 100%",
    marginRight: "1rem",
  },
  firstDiv: {
    display: "flex",
    alignItems: "center",
  },
  secondDiv: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  apply: {
    width: "8rem",
  },
}));

const TableToolbar = ({
  numSelected,
  preGlobalFilteredRows,
  setGlobalFilter,
  globalFilter,
  buttons,
  toolBarLeftComponents,
}) => {
  const classes = useToolbarStyles();

  const [action, setAction] = useState("");

  return (
    <Toolbar className={clsx(classes.root)}>
      <div className={classes.firstDiv}>
        {toolBarLeftComponents ? (
          toolBarLeftComponents
        ) : (
          <>
            <Dropdown value={action && action} placeholder="Ações">
              <DropdownItem type="button" onClick={() => setAction("ID")}>
                ID
              </DropdownItem>
              <DropdownItem type="button" onClick={() => setAction("Nome")}>
                Nome
              </DropdownItem>
              <DropdownItem type="button" onClick={() => setAction("Status")}>
                Status
              </DropdownItem>
            </Dropdown>
            <Button
              outline
              width="10rem"
              containerStyle={{ marginLeft: "1rem" }}
            >
              APLICAR
            </Button>

            <p className={classes.title}>{numSelected} itens selecionados</p>
          </>
        )}
      </div>

      <div className={classes.secondDiv}>
        <GlobalFilter
          preGlobalFilteredRows={preGlobalFilteredRows}
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
        />
        {/* <NewClientLink to={`/ekk/client/new`}>
          <Button>NOVO CLIENTE</Button>
        </NewClientLink> */}
        {buttons}
      </div>
    </Toolbar>
  );
};

TableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  setGlobalFilter: PropTypes.func.isRequired,
  preGlobalFilteredRows: PropTypes.array.isRequired,
  globalFilter: PropTypes.string.isRequired,
  buttons: PropTypes.node,
  toolBarLeftComponents: PropTypes.node,
};

export default TableToolbar;
