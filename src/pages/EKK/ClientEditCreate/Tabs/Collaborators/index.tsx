import { Form } from "@unform/web";
import { RefObject, useCallback } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useMemo } from "react";
import Button from "../../../../../components/Button";
import Dropdown from "../../../../../components/Dropdown";
import FileInput from "../../../../../components/FileInput";
import Input from "../../../../../components/Input";
import LoadingScreen from "../../../../../components/LoadingScreen";
import Modal from "../../../../../components/Modal";
import * as XLSX from "xlsx";

import Table from "../../../../../components/Table";
import { useToast } from "../../../../../contexts/ToastContext";
import api from "../../../../../services/api";
import { useCompany } from "../../contexts/CompanyContext";

import {
  Container,
  EditIcon,
  ModalContainer,
  ModalTitle,
  DropdownItem,
  EditCollaboratorLink,
} from "./styles";
import validateEmail from "../../../../../utils/validateEmail";
import convertExcelToJSON from "../../../../../utils/convertExcelToJSON";

interface NewCollaboratorProps {
  name: string;
  email: string;
}

interface RoleProps {
  id: string;
  uuid: string;
  name: string;
  slug: string;
  description: string;
  active: string;
  created_at: string;
  updated_at: string;
  allowed_to_clients: string;
  plan_id: string;
  NamePlan: string;
}

interface CollaboratorProps {
  id: string;
  name: string;
  email: string;
  company_role_id: string;
  company_area_id: string;
  role: { id: string; name: string; performance_type_id: string };
  structure: { id: string; name: string; manager_id: string };
}

interface DataProps {
  nome: string;
  email: string;
  cargo: string;
  structure: string;
  edit: React.ReactNode;
}

interface CollaboratorsFileProps {
  NOME: string;
  EMAIL: string;
  CARGO: string;
  ESTRUTURA_ORGANIZACIONAL: string;
}

const Collaborators: React.FC = () => {
  const [inputRef, setInputRef] = useState<RefObject<HTMLInputElement> | null>(
    null
  );

  const [openImportModal, setOpenImportModal] = useState(false);
  const [openCollaboratorsModal, setOpenCollaboratorsModal] = useState(false);

  const [role, setRole] = useState<RoleProps>({} as RoleProps);
  const [roles, setRoles] = useState<RoleProps[]>([] as RoleProps[]);

  const [collaborators, setCollaborators] = useState<CollaboratorProps[]>([]);
  const [data, setData] = useState<DataProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [resetCollaborators, setResetCollaborators] = useState(false);

  const { currentCompany } = useCompany();
  const { addToast } = useToast();

  useEffect(() => {
    async function loadCollaboratos() {
      const response = await api.get(`/user/${currentCompany.id}/company`);

      if (!response.data.payload) {
        setLoading(false);
      } else {
        setCollaborators(response.data.payload);
        console.log(response.data.payload);
      }
    }

    if (currentCompany.id || resetCollaborators) {
      loadCollaboratos();
    }
  }, [currentCompany.id, resetCollaborators]);

  useEffect(() => {
    async function loadData() {
      const displayCollaboratosList: DataProps[] = collaborators.map(
        (collaborator) => ({
          nome: collaborator.name,
          email: collaborator.email,
          cargo: collaborator.role.name ?? "",
          structure: collaborator.structure.name ?? "",
          edit: (
            <EditCollaboratorLink
              to={`/ekk/client/collaborator/${collaborator.id}`}
            >
              <EditIcon>Edit</EditIcon>
            </EditCollaboratorLink>
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
  }, [collaborators]);

  useEffect(() => {
    async function loadRoles() {
      const response = await api.post("user/functions", {
        company_id: currentCompany.id,
      });

      if (response.data.payload) {
        setRoles(response.data.payload);
      }
    }

    loadRoles();
  }, [setRoles, currentCompany]);

  const columns = useMemo(
    () => [
      {
        Header: "nome",
        accessor: "nome",
      },
      {
        Header: "email",
        accessor: "email",
      },
      {
        Header: "cargo",
        accessor: "cargo",
      },
      {
        Header: "Estrutura Organizacional",
        accessor: "structure",
      },
      {
        Header: " ",
        accessor: "edit",
      },
    ],
    []
  );

  const handleImportSubmit = useCallback(
    async (data: { file: File }) => {
      const imported_file = (await convertExcelToJSON(
        data.file
      )) as CollaboratorsFileProps[];

      if (imported_file.length === 0) {
        setOpenImportModal(false);

        addToast({
          type: "error",
          title: "Erro ao Importar",
          description: "O arquivo não contém nenhum dado.",
        });

        return;
      }

      try {
        const response = await api.post("user/import", {
          company_id: currentCompany.id,
          data: imported_file,
        });

        setOpenImportModal(false);

        if (response.data.success) {
          addToast({
            type: "success",
            title: "Sucesso ao Salvar",
            description: "Colaboradores importados com sucesso.",
          });

          setLoading(true);

          setResetCollaborators(true);
          setTimeout(() => {
            setResetCollaborators(false);
          }, 100);
        } else {
          addToast({
            type: "error",
            title: "Erro ao Importar",
            description: response.data.payload,
          });
        }
      } catch (err) {
        console.log(err);

        setOpenImportModal(false);

        addToast({
          type: "error",
          title: "Erro ao Importar",
          description:
            "Ocorreu um erro ao salvar, contate o suporte para mais informações.",
        });
      }
    },
    [addToast, currentCompany.id]
  );

  const handleNewCollaboratorSubmit = useCallback(
    async (data: NewCollaboratorProps) => {
      const formData = {
        ...data,
        acl_role_id: role.id,
        company_id: currentCompany.id,
      };

      let err = false;
      let description = "";

      if (!formData.name || formData.name.length === 0) {
        description = "Nome incompleto.";
        err = true;
      }
      if (!formData.email || formData.email.length === 0) {
        description = "E-mail incompleto.";
        err = true;
      }
      if (!formData.acl_role_id || formData.acl_role_id.length === 0) {
        description = "Função não pode ser nula.";
        err = true;
      }
      if (formData.email && !validateEmail(formData.email)) {
        description = "E-mail inválido.";
        err = true;
      }

      if (err) {
        addToast({
          type: "error",
          title: "Erro",
          description,
        });
        return;
      }

      const response = await api.post("user/start", formData);
      console.log(response.data);

      if (!response.data.success) {
        addToast({
          type: "error",
          title: "Erro ao Salvar",
          description:
            "Ocorreu um erro ao cadastrar um novo colaborador, contate o suporte para mais informações.",
        });
        return;
      } else {
        addToast({
          type: "success",
          title: "Sucesso",
          description: "Uma novo colaborador foi cadastrado no sistema.",
        });

        setOpenCollaboratorsModal(false);
      }
    },
    [role, addToast, currentCompany.id]
  );

  const handleSelecionarClick = useCallback(() => {
    if (inputRef && inputRef.current) {
      inputRef.current.click();
    }
  }, [inputRef]);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <Container>
      <Table
        toolBarLeftComponents={<div />}
        tableData={data}
        columns={columns}
        pagination
        borderBottom
        containerStyle={{ boxShadow: "none", padding: "2.4rem" }}
        showToolbar
        showAllRows={false}
        toolBarButtons={
          <>
            <Button
              width="12rem"
              outline
              containerStyle={{ margin: "0 1rem" }}
              onClick={() => setOpenImportModal(true)}
            >
              IMPORTAR
            </Button>
            <Button
              width="12rem"
              onClick={() => setOpenCollaboratorsModal(true)}
            >
              ADICIONAR
            </Button>
          </>
        }
      />

      <Modal open={openImportModal} setOpen={setOpenImportModal}>
        <ModalContainer>
          <Form onSubmit={handleImportSubmit}>
            <ModalTitle>IMPORTAR</ModalTitle>

            <div style={{ display: "flex", margin: "2.5rem 0" }}>
              <FileInput
                name="file"
                setInputRef={setInputRef}
                containerStyle={{ width: "25rem" }}
              />
              <Button
                width="15rem"
                type="button"
                containerStyle={{ marginLeft: "2rem" }}
                onClick={handleSelecionarClick}
              >
                SELECIONAR
              </Button>
            </div>

            <Button type="submit">SALVAR</Button>
          </Form>
        </ModalContainer>
      </Modal>

      <Modal open={openCollaboratorsModal} setOpen={setOpenCollaboratorsModal}>
        <ModalContainer>
          <Form onSubmit={handleNewCollaboratorSubmit}>
            <ModalTitle>Novo Colaborador</ModalTitle>

            <Input
              name="name"
              placeholder="Nome"
              containerStyle={{ marginTop: "3rem", width: "40rem" }}
            />
            <Input
              name="email"
              placeholder="E-mail"
              containerStyle={{ marginTop: "3rem", width: "40rem" }}
            />

            <Dropdown
              value={role && role.name}
              placeholder="Funções"
              containerStyle={{
                width: "100%",
                margin: "2rem 0 3rem",
              }}
              btnStyle={{
                borderRadius: "10px",
              }}
              width="100%"
            >
              {roles.map((item) => (
                <DropdownItem
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setRole(item);
                  }}
                >
                  {item.name}
                </DropdownItem>
              ))}
            </Dropdown>

            <Button type="submit">SALVAR</Button>
          </Form>
        </ModalContainer>
      </Modal>
    </Container>
  );
};

export default Collaborators;
