import { ReactComponent as InformIcon } from "../../../../../../../assets/icons/inform.svg";
import { Grid, Tooltip, Fade } from "@material-ui/core";

import Checkbox, { CheckboxPostProps } from "../Checkbox";

import { Container, RowGrid, Title, Description, Switch } from "./styles";

interface ColumnProps {
  columnId: string;
  isCheckboxSelected: boolean;
  isCheckboxDisabled: boolean;
  hasSwitch: boolean;
  isSwitchSelected: boolean;
  // background: string;
  plan_id: string;
  roleType?: string;
}

export interface FuncionalitiesListProps {
  id: string;
  description: string;
  name: string;
  columns: Array<ColumnProps>;
}

export interface RowProps {
  rows: FuncionalitiesListProps[];
  handleCheckBoxChange(data: CheckboxPostProps): void;
  handleSwitchChange(rowId: string, colId: string): void;
}

const FuncionalitiesList: React.FC<RowProps> = ({
  rows,
  handleCheckBoxChange,
  handleSwitchChange,
}) => {
  return (
    <Container>
      {rows && rows.length > 0
        ? rows.map((row) => (
            <RowGrid key={row.id} container>
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
                    {row.name}
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
                  {row.columns && row.columns.length > 0
                    ? row.columns.map((column, index) => (
                        <Grid
                          key={column.columnId + index}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            background: index % 2 === 0 ? "#F2F3F5" : "#fff",
                          }}
                          item
                          xs={2}
                        >
                          <Grid container>
                            <Grid item xs={4} />
                            <Grid item xs={4}>
                              <Checkbox
                                isCheckboxSelected={column.isCheckboxSelected}
                                isCheckboxDisabled={column.isCheckboxDisabled}
                                funcionalityId={row.id}
                                planId={column.plan_id}
                                roleType={column.roleType}
                                handleCheckBoxChange={handleCheckBoxChange}
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
                      ))
                    : ""}
                </Grid>
              </Grid>
            </RowGrid>
          ))
        : ""}
    </Container>
  );
};

export default FuncionalitiesList;
