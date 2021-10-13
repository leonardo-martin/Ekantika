import { Grid } from "@material-ui/core";
import { useCallback } from "react";
import { useState } from "react";
import { useMemo } from "react";
import { UserProps } from "../..";
import Button from "../../../../../components/Button";
import Dropdown from "../../../../../components/Dropdown";

import Table from "../../../../../components/Table";

import {
  Container,
  TableTitle,
  SubTitle,
  AddToTeamContainer,
  DropdownTitle,
  DropdownItem,
  DropdownWrapper,
} from "./styles";

interface TeamsProps {
  selectedUser: UserProps;
}

const Teams: React.FC<TeamsProps> = ({ selectedUser }) => {
  const [selectedTeam, setSelectedTeam] = useState("");
  const [selectedFunction, setSelectedFunction] = useState("");
  const [initialDate, setInitialDate] = useState("");
  const [finalDate, setFinalDate] = useState("");

  const columns = useMemo(
    () => [
      {
        Header: "Time",
        accessor: "time",
      },
      {
        Header: "Tipo",
        accessor: "tipo",
      },
      {
        Header: "Início",
        accessor: "inicio",
      },
      {
        Header: "FIM",
        accessor: "fim",
      },
      {
        Header: "Função",
        accessor: "funcao",
      },
      {
        Header: "Status",
        accessor: "value",
      },
    ],
    []
  );

  const data = useMemo(
    () => [
      {
        time: "Gamma",
        tipo: "Squad",
        inicio: "20/10/2020",
        fim: "17/01/2021",
        funcao: "Scrum Team",
        value: false,
      },
      {
        time: "Gamma",
        tipo: "Squad",
        inicio: "20/10/2020",
        fim: "17/01/2021",
        funcao: "Scrum Team",
        value: true,
      },
    ],
    []
  );

  const handleAddToTeam = useCallback(() => {
    const team = {
      selectedTeam,
      selectedFunction,
      initialDate,
      finalDate,
    };

    console.log(team);
  }, [selectedTeam, selectedFunction, initialDate, finalDate]);

  return (
    <Container>
      <SubTitle>
        Selecione um time e defina os parâmetros para incluir o colaborador.
      </SubTitle>

      <AddToTeamContainer>
        <Grid container spacing={3}>
          <Grid
            item
            xs={2}
            style={{ display: "flex", alignItems: "flex-end", width: "100%" }}
          >
            <DropdownWrapper style={{ width: "100%" }}>
              <DropdownTitle>Selecione um time</DropdownTitle>
              <Dropdown
                value={selectedTeam && selectedTeam}
                placeholder="Selecionar Time"
                containerStyle={{ width: "100%" }}
                btnStyle={{ borderRadius: "10px" }}
                width="100%"
              >
                <DropdownItem
                  type="button"
                  onClick={() => setSelectedTeam("1")}
                >
                  1
                </DropdownItem>
                <DropdownItem
                  type="button"
                  onClick={() => setSelectedTeam("2")}
                >
                  2
                </DropdownItem>
              </Dropdown>
            </DropdownWrapper>
          </Grid>
          <Grid
            item
            xs={2}
            style={{ display: "flex", alignItems: "flex-end", width: "100%" }}
          >
            <DropdownWrapper style={{ width: "100%" }}>
              <DropdownTitle>Função</DropdownTitle>
              <Dropdown
                value={selectedFunction && selectedFunction}
                placeholder="Selecionar Função"
                containerStyle={{ width: "100%" }}
                btnStyle={{ borderRadius: "10px" }}
                width="100%"
              >
                <DropdownItem
                  type="button"
                  onClick={() => setSelectedFunction("1")}
                >
                  1
                </DropdownItem>
                <DropdownItem
                  type="button"
                  onClick={() => setSelectedFunction("2")}
                >
                  2
                </DropdownItem>
              </Dropdown>
            </DropdownWrapper>
          </Grid>
          <Grid
            item
            xs={2}
            style={{ display: "flex", alignItems: "flex-end", width: "100%" }}
          >
            <DropdownWrapper style={{ width: "100%" }}>
              <DropdownTitle>Início da participação</DropdownTitle>
              <Dropdown
                value={initialDate && initialDate}
                placeholder="Selecionar data"
                containerStyle={{ width: "100%" }}
                btnStyle={{ borderRadius: "10px" }}
                width="100%"
              >
                <DropdownItem type="button" onClick={() => setInitialDate("1")}>
                  1
                </DropdownItem>
                <DropdownItem type="button" onClick={() => setInitialDate("2")}>
                  2
                </DropdownItem>
              </Dropdown>
            </DropdownWrapper>
          </Grid>
          <Grid
            item
            xs={2}
            style={{ display: "flex", alignItems: "flex-end", width: "100%" }}
          >
            <DropdownWrapper style={{ width: "100%" }}>
              <DropdownTitle>Fim da participação</DropdownTitle>
              <Dropdown
                value={finalDate && finalDate}
                placeholder="Selecionar data"
                containerStyle={{ width: "100%" }}
                btnStyle={{ borderRadius: "10px" }}
                width="100%"
              >
                <DropdownItem type="button" onClick={() => setFinalDate("1")}>
                  1
                </DropdownItem>
                <DropdownItem type="button" onClick={() => setFinalDate("2")}>
                  2
                </DropdownItem>
              </Dropdown>
            </DropdownWrapper>
          </Grid>

          <Grid
            item
            xs={4}
            style={{ display: "flex", alignItems: "flex-end", width: "100%" }}
          >
            <Button onClick={handleAddToTeam}>ADICIONAR</Button>
          </Grid>
        </Grid>
      </AddToTeamContainer>

      <Table
        tableData={data}
        columns={columns}
        pagination={false}
        borderBottom={false}
        containerStyle={{ boxShadow: "none", padding: "2.5rem 2rem" }}
        showToolbar
        showAllRows={false}
        toolBarLeftComponents={<TableTitle>Historico</TableTitle>}
      />
    </Container>
  );
};

export default Teams;
