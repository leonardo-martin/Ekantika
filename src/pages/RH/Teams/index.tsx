import PageTitle from "../../../components/PageTitle";
import Table from "../../../components/Table";
import EditOrCopyOrRemove from "../../../components/EditOrCopyOrRemove";
import Button from "../../../components/Button";
import Members from "./Members";
import { ReactComponent as TeamsIcon } from "../../../assets/icons/teams.svg";

import { Container } from "./styles";

const teamsTableColumns = [
  {
    Header: "Nome",
    accessor: "nome",
  },
  {
    Header: "Tipo",
    accessor: "tipo",
  },
  {
    Header: "Integrantes",
    accessor: "integrantes",
  },
  {
    Header: " ",
    accessor: "edit_remove",
  },
];

const teamsTableData = [
  {
    nome: "Terra",
    tipo: "Squad",
    integrantes: <Members activeCount={8} inactiveCount={0} />,
    edit_remove: (
      <EditOrCopyOrRemove
        onRemoveClick={() => window.alert("moked_onRemoveClick_callback")}
        onEditClick={() => window.alert("moked_onEditClick_callback")}
      />
    ),
  },
  {
    nome: "Fogo",
    tipo: "Squad",
    integrantes: <Members activeCount={5} inactiveCount={1} />,
    edit_remove: (
      <EditOrCopyOrRemove
        onRemoveClick={() => window.alert("moked_onRemoveClick_callback")}
        onEditClick={() => window.alert("moked_onEditClick_callback")}
      />
    ),
  },
];

const Teams: React.FC = () => {
  return (
    <Container>
      <PageTitle
        icon={<TeamsIcon style={{ width: "3.2rem" }} />}
        title="Times"
      />

      <Table
        columns={teamsTableColumns}
        tableData={teamsTableData}
        showSelectOptions
        pagination
        showToolbar
        toolBarButtons={
          <Button containerStyle={{ width: "15rem", marginLeft: "3.2rem" }}>
            NOVO TIME
          </Button>
        }
      />
    </Container>
  );
};

export default Teams;
