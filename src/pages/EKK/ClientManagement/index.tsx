import React, { useMemo } from "react";
import { useEffect } from "react";
import { useCallback } from "react";
import { useState } from "react";

import { Link, useHistory } from "react-router-dom";

import { ReactComponent as ClientsIcon } from "../../../assets/icons/clients.svg";
import Button from "../../../components/Button";
import LoadingScreen from "../../../components/LoadingScreen";
import Modal from "../../../components/Modal";

import PageTitle from "../../../components/PageTitle";
import Table from "../../../components/Table";
import { useToast } from "../../../contexts/ToastContext";
import api from "../../../services/api";

import {
  Container,
  IconsWrapper,
  EditIcon,
  RemoveIcon,
  NewClientLink,
  ModalContainer,
  ModalTitle,
  ModalDescription,
  StatusContainer,
  TextCell,
} from "./styles";

interface CompanyProps {
  id: string;
  cnpj: string;
  fantasy_name: string;
  active: string;
}

interface StatusChangeProps {
  id: string;
  status: boolean;
}

interface DataProps {
  id: string;
  nome: string;
  cnpj: string;
  value: boolean;
  status: string;
  edit_remove: React.ReactNode;
}

const ClientManagement: React.FC = () => {
  const [companies, setCompanies] = useState<CompanyProps[]>([]);
  const [selectedCompany, setSelectedCompany] = useState<CompanyProps>(
    {} as CompanyProps
  );
  const [openExcludeModal, setOpenExcludeModal] = useState(false);

  const [data, setData] = useState<DataProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const { addToast } = useToast();
  const history = useHistory();

  useEffect(() => {
    async function loadCompanies() {
      const response = await api.get("company/holding");

      if (response.data.success) {
        if (response.data.payload) {
          if (Array.isArray(response.data.payload)) {
            setCompanies(response.data.payload);
          }
        }
      }
    }

    loadCompanies();
  }, []);

  const handleRemoveCompanyClick = useCallback(
    async (company: CompanyProps) => {
      setSelectedCompany(company);
      setOpenExcludeModal(true);
    },
    []
  );

  useEffect(() => {
    async function loadData() {
      const displayCompaniesList: DataProps[] = companies.map((company) => ({
        id: company.id,
        nome: company.fantasy_name,
        cnpj: company.cnpj,
        value: Boolean(Number(company.active)),
        status: company.active === "1" ? "Ativo" : "Inativo",
        edit_remove: (
          <IconsWrapper>
            <Link to={`/ekk/client/page/${company.id}`}>
              <EditIcon>Edit</EditIcon>
            </Link>
            <RemoveIcon
              onClick={() => {
                handleRemoveCompanyClick(company);
              }}
            >
              Trash
            </RemoveIcon>
          </IconsWrapper>
        ),
      }));

      setData(displayCompaniesList);

      setLoading(false);
    }

    if (companies && companies.length > 0) {
      loadData();
    }
  }, [companies, handleRemoveCompanyClick]);

  const columns = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
        Cell: ({ row, value }: any) => {
          return (
            <TextCell isActive={row.original.status === "Ativo"}>
              {value}
            </TextCell>
          );
        },
      },
      {
        Header: "Nome",
        accessor: "nome",
        Cell: ({ row, value }: any) => {
          return (
            <TextCell isActive={row.original.status === "Ativo"}>
              {value}
            </TextCell>
          );
        },
      },
      {
        Header: "CNPJ",
        accessor: "cnpj",
        Cell: ({ row, value }: any) => {
          return (
            <TextCell isActive={row.original.status === "Ativo"}>
              {value}
            </TextCell>
          );
        },
      },
      {
        Header: "Status",
        accessor: "value",
      },
      {
        Header: "Condição",
        accessor: "status",
        Cell: ({ value }: any) => (
          <StatusContainer isActive={value === "Ativo"}>
            {value}
          </StatusContainer>
        ),
      },
      {
        Header: " ",
        accessor: "edit_remove",
      },
    ],
    []
  );

  const handleStatusChange = useCallback(
    async (statusChange: StatusChangeProps[]) => {
      let newDataItem = {
        id: "",
        value: false,
      };

      setData((data) => {
        for (let i = 0; i < statusChange.length; i++) {
          for (let j = 0; j < data.length; j++) {
            if (
              data[j].id === statusChange[i].id &&
              data[j].value !== statusChange[i].status
            ) {
              data[j].value = statusChange[i].status;

              newDataItem = data[j];
            }
          }
        }

        return data;
      });

      if (newDataItem.id !== "" && newDataItem.value) {
        setLoading(true);

        const {
          data: { success, payload },
        } = await api.post("company/enable", {
          company_id: newDataItem.id,
        });

        if (typeof payload === "boolean" && payload && success) {
          setData((prevState) => {
            const newDataArray = prevState.map((company) =>
              company.id === newDataItem.id
                ? { ...company, status: "Ativo" }
                : company
            );

            return newDataArray;
          });
        } else {
          addToast({
            type: "error",
            title: "Erro ao Salvar",
            description:
              "Ocorreu um erro ao mudar o status, contate o suporte para mais informações.",
          });
        }
        setLoading(false);
      }

      if (newDataItem.id !== "" && !newDataItem.value) {
        setLoading(true);

        const {
          data: { success, payload },
        } = await api.post("company/disable", {
          company_id: newDataItem.id,
        });

        if (typeof payload === "boolean" && payload && success) {
          setData((prevState) => {
            const newDataArray = prevState.map((company) =>
              company.id === newDataItem.id
                ? { ...company, status: "Inativo" }
                : company
            );

            return newDataArray;
          });
        } else {
          addToast({
            type: "error",
            title: "Erro ao Salvar",
            description:
              "Ocorreu um erro ao mudar o status, contate o suporte para mais informações.",
          });
        }

        setLoading(false);
      }
    },
    [addToast]
  );

  const handleExclude = useCallback(async () => {
    const response = await api.post("company/delete", {
      company_id: selectedCompany.id,
    });

    if (!response.data.success) {
      addToast({
        type: "error",
        title: "Erro",
        description:
          "Ocorreu um erro ao excluir essa companhia, contate o suporte para mais informações.",
      });
      setOpenExcludeModal(false);

      return;
    } else {
      addToast({
        type: "success",
        title: "Sucesso",
        description: `A companhia ${selectedCompany.fantasy_name} foi excluída com sucesso.`,
      });

      history.go(0);
    }
  }, [history, selectedCompany.id, selectedCompany.fantasy_name, addToast]);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <Container>
      <PageTitle icon={<ClientsIcon />} title="Gestão de clientes" />

      <Table
        toolBarLeftComponents={<div />}
        tableData={data}
        columns={columns}
        statusChangeHandler={handleStatusChange}
        pagination
        borderBottom={false}
        showToolbar
        showAllRows={false}
        toolBarButtons={
          <NewClientLink to="/ekk/client/new">
            <Button>NOVO CLIENTE</Button>
          </NewClientLink>
        }
      />

      <Modal open={openExcludeModal} setOpen={setOpenExcludeModal}>
        <ModalContainer>
          <ModalTitle>Atenção</ModalTitle>
          <ModalDescription>
            Ao clicar em confirmar você excluirá a companhia "
            {selectedCompany.fantasy_name}" do sistema.
          </ModalDescription>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Button
              type="button"
              btnColor="#FF2929"
              outline
              onClick={handleExclude}
              containerStyle={{ marginRight: "1.5rem", minWidth: "23rem" }}
            >
              CONFIRMAR EXCLUSÃO
            </Button>
            <Button
              type="button"
              containerStyle={{ minWidth: "23rem" }}
              onClick={() => setOpenExcludeModal(false)}
            >
              CANCELAR
            </Button>
          </div>
        </ModalContainer>
      </Modal>
    </Container>
  );
};

export default ClientManagement;
