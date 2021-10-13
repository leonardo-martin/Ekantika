import React, { useCallback, useEffect, useMemo, useState } from "react";

import { Link, useHistory } from "react-router-dom";

import { ReactComponent as UsersIcon } from "../../../assets/icons/users.svg";

import Button from "../../../components/Button";
import Modal from "../../../components/Modal";
import LoadingScreen from "../../../components/LoadingScreen";

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
} from "./styles";

interface CollaboratorProps {
  id: string;
  name: string;
  email: string;
  perfil: string;
  // role: string;
  // estrutura_organizacional: string;
}

interface DataProps {
  id: string;
  nome: string;
  email: string;
  funcao: string;
  edit_remove: React.ReactNode;
}

const company_id = 1; // EKK

const UserList: React.FC = () => {
  const [collaborators, setCollaborators] = useState<CollaboratorProps[]>([]);
  const [data, setData] = useState<DataProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [openExcludeModal, setOpenExcludeModal] = useState(false);
  const [selectedUserToDelete, setSelectedUserToDelete] =
    useState<CollaboratorProps>({} as CollaboratorProps);

  const history = useHistory();
  const { addToast } = useToast();

  useEffect(() => {
    async function loadCollaboratos() {
      const response = await api.get(`/user/${company_id}/company`);

      setCollaborators(response.data.payload);
      console.log("setCollaborators");
      console.log(response.data.payload);
    }

    loadCollaboratos();
  }, []);

  const handleRemoveUserClick = useCallback(async (user) => {
    setSelectedUserToDelete(user);
    setOpenExcludeModal(true);
  }, []);

  useEffect(() => {
    async function loadData() {
      const displayCollaboratosList: DataProps[] = collaborators.map(
        (collaborator) => ({
          id: collaborator.id,
          nome: collaborator.name,
          email: collaborator.email,
          funcao: collaborator.perfil,
          edit_remove: (
            <IconsWrapper>
              <Link to={`/ekk/user/${collaborator.id}`}>
                <EditIcon>Edit</EditIcon>
              </Link>
              <RemoveIcon
                onClick={() => {
                  handleRemoveUserClick(collaborator);
                }}
              >
                Trash
              </RemoveIcon>
            </IconsWrapper>
          ),
        })
      );

      setData(displayCollaboratosList);

      setLoading(false);

      console.log("aqui");
    }

    if (collaborators && collaborators.length > 0) {
      loadData();
    }
  }, [collaborators, handleRemoveUserClick]);

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
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Função",
        accessor: "funcao",
      },
      {
        Header: " ",
        accessor: "edit_remove",
      },
    ],
    []
  );

  const handleExclude = useCallback(async () => {
    const response = await api.post("user/delete", {
      user_id: selectedUserToDelete.id,
    });

    if (!response.data.success) {
      addToast({
        type: "error",
        title: "Erro",
        description:
          "Ocorreu um erro ao excluir este usuário, contate o suporte para mais informações.",
      });

      return;
    } else {
      addToast({
        type: "success",
        title: "Sucesso",
        description: "O usuário foi deletado com sucesso.",
      });

      history.go(0);
    }
  }, [history, addToast, selectedUserToDelete.id]);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <Container>
      <PageTitle icon={<UsersIcon />} title="Usuários" />

      <Table
        toolBarLeftComponents={<div />}
        tableData={data}
        columns={columns}
        pagination
        borderBottom={false}
        showToolbar
        showAllRows={false}
        toolBarButtons={
          <NewClientLink to="/ekk/user/new">
            <Button>NOVO USUÁRIO</Button>
          </NewClientLink>
        }
      />

      <Modal open={openExcludeModal} setOpen={setOpenExcludeModal}>
        <ModalContainer>
          <ModalTitle>Atenção</ModalTitle>
          <ModalDescription>
            Ao clicar em confirmar você excluirá o usuário "
            {selectedUserToDelete.name}" do sistema.
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

export default UserList;
