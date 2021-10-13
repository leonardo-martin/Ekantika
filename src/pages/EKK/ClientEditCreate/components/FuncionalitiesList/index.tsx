import { ReactComponent as InformIcon } from "../../../../../assets/icons/inform.svg";
import { Grid, Tooltip, Fade } from "@material-ui/core";

import { Container, Title, Description, Switch, Checkbox } from "./styles";

interface ColumnProps {
  columnId: string;
  isCheckboxSelected: boolean;
  isCheckboxDisabled: boolean;
  hasSwitch: boolean;
  isSwitchSelected: boolean;
  background: string;
}

export interface FuncionalitiesListProps {
  id: string;
  description: string;
  columns: Array<ColumnProps>;
}

export interface RowProps {
  rows: FuncionalitiesListProps[];
  handleCheckBoxChange(rowId: string, colId: string): void;
  handleSwitchChange(rowId: string, colId: string): void;
}

const FuncionalitiesList: React.FC<RowProps> = ({
  rows,
  handleCheckBoxChange,
  handleSwitchChange,
}) => {
  return (
    <Container>
      {rows.map((row) => (
        <Grid key={row.id} container>
          <Grid
            item
            xs={4}
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Tooltip
              TransitionComponent={Fade}
              title={<Description>{row.description}</Description>}
              placement="right"
              style={{ fontSize: "3rem" }}
            >
              <Title style={{ margin: 0, position: "relative" }}>
                Funcionalidade {Number(row.id) + 1}
                <InformIcon />
              </Title>
            </Tooltip>
          </Grid>
          <Grid
            item
            xs={8}
            style={{ paddingLeft: "4rem", width: "100% !important" }}
          >
            <Grid
              container
              spacing={3}
              style={{
                textAlign: "center",
              }}
            >
              {row.columns.map((column, index) => (
                <Grid
                  key={column.columnId + index}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: column.background,
                  }}
                  item
                  xs={2}
                >
                  <Grid container>
                    <Grid item xs={4} />
                    <Grid item xs={4}>
                      <Checkbox
                        color="primary"
                        checked={column.isCheckboxSelected}
                        disabled={column.isCheckboxDisabled}
                        onChange={() =>
                          handleCheckBoxChange(row.id, column.columnId)
                        }
                      />
                    </Grid>
                    <Grid item xs={2}>
                      {column.hasSwitch && (
                        <Switch
                          checked={column.isSwitchSelected}
                          onChange={() =>
                            handleSwitchChange(row.id, column.columnId)
                          }
                          color="primary"
                        />
                      )}
                    </Grid>
                    <Grid item xs={2} />
                  </Grid>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      ))}
    </Container>
  );
};

export default FuncionalitiesList;
