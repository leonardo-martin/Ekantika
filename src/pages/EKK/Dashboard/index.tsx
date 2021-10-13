import React, { useMemo, useState } from "react";

import { Grid } from "@material-ui/core";

import { ReactComponent as HomeIcon } from "../../../assets/icons/home.svg";

import Paper from "../../../components/Paper";
import PageTitle from "../../../components/PageTitle";

import { Container, Title, ToogleTableShowBtn, AcesarBtn } from "./styles";
import Table from "../../../components/Table";
import { useCallback } from "react";
import { useEffect } from "react";
import api from "../../../services/api";
import LoadingScreen from "../../../components/LoadingScreen";
// import TablePaginationActions from "../../../components/Table/components/TablePaginationActions";
// import Modal from "../../../components/Modal";

interface CompanyProps {
  id: string;
  cnpj: string;
  fantasy_name: string;
}

interface DataProps {
  id: string;
  nome: string;
  cnpj: string;
  acessar: React.ReactNode;
}

const Dashboard: React.FC = () => {
  // const [open, setOpen] = useState(false);
  const [companies, setCompanies] = useState<CompanyProps[]>([]);
  const [showAllTableData, setShowAllTableData] = useState(false);

  const [data, setData] = useState<DataProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadCompanies() {
      const response = await api.get("company");

      setCompanies(response.data.payload);
    }

    loadCompanies();
  }, []);

  useEffect(() => {
    async function loadData() {
      const displayCompaniesList: DataProps[] = companies.map((company) => ({
        id: company.id,
        nome: company.fantasy_name,
        cnpj: company.cnpj,
        acessar: (
          <AcesarBtn to={`/ekk/client/edit/${company.id}`}>Acessar</AcesarBtn>
        ),
      }));

      setData(displayCompaniesList);

      setLoading(false);
    }

    if (companies && companies.length > 0) {
      loadData();
    }
  }, [companies]);

  const columns = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
      },
      {
        Header: "Nome",
        accessor: "nome",
      },
      {
        Header: "CNPJ",
        accessor: "cnpj",
      },
      {
        Header: " ",
        accessor: "acessar",
      },
    ],
    []
  );

  // const data = useMemo(
  //   () => [
  //     {
  //       id: "00000",
  //       nome: "Coca-Cola Company",
  //       cnpj: "87.979.760/0001-70",
  //       acessar: <AcesarBtn to="/ekk/client/page">Acessar</AcesarBtn>,
  //     },
  //     {
  //       id: "00000",
  //       nome: "Leão alimentos e bebidas",
  //       cnpj: "87.979.760/0001-70",
  //       acessar: <AcesarBtn to="/ekk/client/page">Acessar</AcesarBtn>,
  //     },
  //     {
  //       id: "00000",
  //       nome: "Coca-Cola Company",
  //       cnpj: "87.979.760/0001-70",
  //       acessar: <AcesarBtn to="/ekk/client/page">Acessar</AcesarBtn>,
  //     },
  //   ],
  //   []
  // );

  const handleShowAllRows = useCallback(() => {
    setShowAllTableData((prevState) => !prevState);
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <Container>
      <PageTitle icon={<HomeIcon />} title="Seja bem-vindo" />

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper containerStyle={{ flexDirection: "column" }}>
            <Title>Últimos clientes cadastrados</Title>

            <Table
              toolBarLeftComponents={<div />}
              tableData={data}
              columns={columns}
              pagination={false}
              borderBottom
              showAllRows={showAllTableData}
              showToolbar={false}
            />

            {/* {dados.length > 0 && dados[0].cnpj} */}

            <ToogleTableShowBtn onClick={handleShowAllRows}>
              {showAllTableData ? "Mostrar menos" : "Ver todos"}
            </ToogleTableShowBtn>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
