import { Form } from "@unform/web";
import { RefObject, useCallback, useEffect, useMemo, useState } from "react";
import Button from "../../../../../components/Button";
import Dropdown from "../../../../../components/Dropdown";
import FileInput from "../../../../../components/FileInput";
import Input from "../../../../../components/Input";
import LoadingScreen from "../../../../../components/LoadingScreen";
import Modal from "../../../../../components/Modal";

import Table from "../../../../../components/Table";
import { useToast } from "../../../../../contexts/ToastContext";
import api from "../../../../../services/api";
import { useCompany } from "../../contexts/CompanyContext";

import * as XLSX from "xlsx";

import {
  Container,
  IconsWrapper,
  EditIcon,
  RemoveIcon,
  ModalContainer,
  ModalTitle,
  DropdownItem,
  ModalDescription,
} from "./styles";
import convertExcelToJSON from "../../../../../utils/convertExcelToJSON";

interface ImportProps {
  codigo: string;
  cargo: string;
}

interface PerformanceTypeProps {
  id: string;
  type: string;
}

interface RoleProps {
  id: string;
  company_id: string;
  uuid: string;
  name: string;
  performance_type_id: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  type: string;
}

interface DataProps {
  codigo: string;
  cargo: string;
  avaliacao_tipo: string;
  edit_remove: React.ReactNode;
}

interface RolesFileProps {
  CODIGO: string;
  CARGO: string;
  TIPO_DE_AVALIACAO: string;
}

const Roles: React.FC = () => {
  const [openImportModal, setOpenImportModal] = useState(false);
  const [openNewRoleModal, setOpenNewRoleModal] = useState(false);
  const [openEditRoleModal, setOpenEditRoleModal] = useState(false);
  const [openExcludeRoleModal, setOpenExcludeRoleModal] = useState(false);

  const [resetRoles, setResetRoles] = useState(false);

  const [selectedPerformanceType, setSelectedPerformanceType] =
    useState<PerformanceTypeProps>({} as PerformanceTypeProps);
  const [performanceTypes, setPerformanceTypes] = useState<
    PerformanceTypeProps[]
  >([]);

  const [selectedRole, setSelectedRole] = useState<RoleProps>({} as RoleProps);
  const [selectedRoleToDelete, setSelectedRoleToDelete] = useState<RoleProps>(
    {} as RoleProps
  );
  const [inputRef, setInputRef] = useState<RefObject<HTMLInputElement> | null>(
    null
  );

  const [loading, setLoading] = useState(true);
  const [reloadTab, setReloadTab] = useState(true);

  const [roles, setRoles] = useState<RoleProps[]>([]);
  const [data, setData] = useState<DataProps[]>([]);

  const { currentCompany } = useCompany();
  const { addToast } = useToast();

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 100);
  }, [reloadTab]);

  useEffect(() => {
    async function loadPerformanceTypes() {
      const response = await api.get("performance-type");
      if (response.data.payload) {
        setPerformanceTypes(response.data.payload);
      }
    }

    loadPerformanceTypes();
  }, [setPerformanceTypes]);

  useEffect(() => {
    async function loadCollaboratos() {
      const response = await api.post("cargo/list", {
        company_id: currentCompany.id,
      });

      if (!response.data.payload) {
        setLoading(false);
      } else {
        setRoles(response.data.payload);

        setReloadTab((prevState) => !prevState);
      }
    }

    if (currentCompany.id || resetRoles) {
      loadCollaboratos();
    }
  }, [currentCompany.id, resetRoles]);

  const handleEditRoleClick = useCallback(async (role: RoleProps) => {
    setSelectedRole(role);
    setSelectedPerformanceType({
      id: role.performance_type_id,
      type: role.type,
    });
    setOpenEditRoleModal(true);
  }, []);

  const handleRemoveRoleClick = useCallback(async (role) => {
    setSelectedRoleToDelete(role);
    setOpenExcludeRoleModal(true);
  }, []);

  useEffect(() => {
    function loadData() {
      const displayRolesList: DataProps[] = roles.map((role) => ({
        codigo: role.uuid,
        cargo: role.name,
        avaliacao_tipo: role.type,
        edit_remove: (
          <IconsWrapper>
            <EditIcon onClick={() => handleEditRoleClick(role)}>Edit</EditIcon>
            <RemoveIcon onClick={() => handleRemoveRoleClick(role)}>
              Trash
            </RemoveIcon>
          </IconsWrapper>
        ),
      }));

      setData(displayRolesList);

      setLoading(false);
    }

    console.log(roles.length);

    if (roles.length >= 0) {
      loadData();
    }
  }, [roles, handleRemoveRoleClick, handleEditRoleClick]);

  const columns = useMemo(
    () => [
      {
        Header: "código",
        accessor: "codigo",
      },
      {
        Header: "Cargo",
        accessor: "cargo",
      },
      {
        Header: "tipo de avaliação",
        accessor: "avaliacao_tipo",
      },
      {
        Header: " ",
        accessor: "edit_remove",
      },
    ],
    []
  );

  const handleExcludeRole = useCallback(async () => {
    const response = await api.post("cargo/delete", {
      cargo_id: selectedRoleToDelete.id,
    });

    if (!response.data.success) {
      addToast({
        type: "error",
        title: "Erro",
        description:
          "Ocorreu um erro ao excluir este cargo, contate o suporte para mais informações.",
      });

      return;
    } else {
      addToast({
        type: "success",
        title: "Sucesso",
        description: "Cargo foi deletado com sucesso.",
      });

      // setLoading(true);

      let newRoleState = roles.filter(
        (item) => item.id !== selectedRoleToDelete.id
      );

      setRoles(newRoleState);

      setOpenExcludeRoleModal(false);

      setReloadTab((prevState) => !prevState);
    }
  }, [addToast, setRoles, roles, selectedRoleToDelete.id]);

  const handleNewRoleSubmit = useCallback(
    async (data: ImportProps) => {
      const formData = {
        ...data,
        tipo: selectedPerformanceType.id,
        company_id: currentCompany.id,
      };

      let err = false;
      let description = "";

      if (!formData.tipo || formData.tipo.length === 0) {
        description = "Tipo de avaliação não pode ser nulo.";
        err = true;
      }
      if (!formData.codigo || formData.codigo.length === 0) {
        description = "Código não pode ser nulo.";
        err = true;
      }
      if (!formData.cargo || formData.cargo.length === 0) {
        description = "Cargo não pode ser nulo.";
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

      const response = await api.post("cargo", formData);
      console.log(response.data);

      if (!response.data.success) {
        addToast({
          type: "error",
          title: "Erro ao Salvar",
          description:
            "Ocorreu um erro ao cadastrar um novo cargo, contate o suporte para mais informações.",
        });
        return;
      } else {
        addToast({
          type: "success",
          title: "Sucesso",
          description: "Um novo cargo foi cadastrado no sistema.",
        });

        setRoles((prevState) => [...prevState, { ...response.data.payload }]);

        setReloadTab((prevState) => !prevState);

        setOpenNewRoleModal(false);
      }
    },
    [selectedPerformanceType, currentCompany.id, addToast]
  );

  const handleEditRoleSubmit = useCallback(
    async (data: ImportProps) => {
      const formData = {
        ...data,
        cargo_id: selectedRole.id,
        tipo: selectedPerformanceType.id,
        company_id: currentCompany.id,
      };

      let err = false;
      let description = "";

      if (!formData.tipo || formData.tipo.length === 0) {
        description = "Tipo de avaliação não pode ser nulo.";
        err = true;
      }
      if (!formData.codigo || formData.codigo.length === 0) {
        description = "Código não pode ser nulo.";
        err = true;
      }
      if (!formData.cargo || formData.cargo.length === 0) {
        description = "Cargo não pode ser nulo.";
        err = true;
      }

      console.log(formData);

      if (err) {
        addToast({
          type: "error",
          title: "Erro",
          description,
        });
        return;
      }

      const response = await api.post("cargo/update", formData);
      console.log(response.data);

      if (!response.data.success) {
        addToast({
          type: "error",
          title: "Erro ao Editar",
          description:
            "Ocorreu um erro ao editar o cargo, contate o suporte para mais informações.",
        });
        return;
      } else {
        addToast({
          type: "success",
          title: "Sucesso",
          description: "Cargo editado com sucesso.",
        });

        setRoles((prevState) =>
          prevState.map((item) =>
            item.id === formData.cargo_id ? response.data.payload : item
          )
        );

        console.log(response.data.payload);

        setReloadTab((prevState) => !prevState);

        setOpenEditRoleModal(false);
      }
    },
    [selectedPerformanceType, currentCompany.id, selectedRole.id, addToast]
  );

  const handleImportSubmit = useCallback(
    async (data: { file: File }) => {
      const imported_file = (await convertExcelToJSON(
        data.file
      )) as RolesFileProps[];

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

          setResetRoles(true);
          setTimeout(() => {
            setResetRoles(false);
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

  // const convertToJson = useCallback((csv) => {
  //   var lines = csv.split("\n");

  //   var result = [];

  //   var headers = lines[0].split(",");

  //   for (var i = 1; i < lines.length; i++) {
  //     var obj = {} as any;
  //     var currentline = lines[i].split(",");

  //     for (var j = 0; j < headers.length; j++) {
  //       obj[headers[j]] = currentline[j];
  //     }

  //     result.push(obj);
  //   }

  //   return result.slice(0, -1); //JSON
  // }, []);

  // const handleImportSubmit = useCallback(
  //   async (data: { file: File }) => {
  //     const reader = new FileReader();

  //     reader.onload = async (evt) => {
  //       /* Parse data */
  //       const bstr = evt?.target?.result;
  //       const wb = XLSX.read(bstr, { type: "binary" });
  //       /* Get first worksheet */
  //       const wsname = wb.SheetNames[0];
  //       const ws = wb.Sheets[wsname];
  //       /* Convert array of arrays */
  //       const data = XLSX.utils.sheet_to_csv(ws);
  //       /* Update state */
  //       console.log(data); // shows that csv data
  //       console.log(convertToJson(data));

  //       const imported_file = convertToJson(data) as RolesFileProps[]; // shows data in json format

  //       console.log(imported_file);

  //       if (imported_file.length === 0) {
  //         setOpenImportModal(false);

  //         addToast({
  //           type: "error",
  //           title: "Erro ao Importar",
  //           description: "O arquivo não contém nenhum dado.",
  //         });

  //         return;
  //       }

  //       try {
  //         const response = await api.post("cargo/import", {
  //           company_id: currentCompany.id,
  //           data: imported_file,
  //         });

  //         setOpenImportModal(false);

  //         if (response.data.success) {
  //           addToast({
  //             type: "success",
  //             title: "Sucesso ao Salvar",
  //             description: "Cargos importados com sucesso.",
  //           });

  //           setLoading(true);

  //           setResetRoles(true);
  //           setTimeout(() => {
  //             setResetRoles(false);
  //           }, 100);
  //         } else {
  //           addToast({
  //             type: "error",
  //             title: "Erro ao Importar",
  //             description: response.data.payload,
  //           });
  //         }
  //       } catch (err) {
  //         console.log(err);

  //         setOpenImportModal(false);

  //         addToast({
  //           type: "error",
  //           title: "Erro ao Importar",
  //           description:
  //             "Ocorreu um erro ao salvar, contate o suporte para mais informações.",
  //         });
  //       }
  //     };

  //     reader.readAsBinaryString(data.file);
  //   },
  //   [convertToJson, addToast, currentCompany.id]
  // );

  const handleSelecionarClick = useCallback(() => {
    if (inputRef && inputRef.current) {
      inputRef.current.click();
    }
  }, [inputRef]);

  const handleInputChange = useCallback(
    (e) => {
      const { value, id } = e.target;

      setSelectedRole((prevState) => {
        if (id === "cargo") {
          return {
            ...prevState,
            name: value,
          };
        }

        if (id === "codigo") {
          return {
            ...prevState,
            uuid: value,
          };
        }

        return prevState;
      });
    },
    [setSelectedRole]
  );

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <Container>
      {loading ? (
        <LoadingScreen />
      ) : (
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
                onClick={() => {
                  setOpenNewRoleModal(true);
                  setSelectedRole({} as RoleProps);
                  setSelectedPerformanceType({} as PerformanceTypeProps);
                }}
              >
                ADICIONAR
              </Button>
            </>
          }
        />
      )}

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

      <Modal open={openNewRoleModal} setOpen={setOpenNewRoleModal}>
        <ModalContainer>
          <Form onSubmit={handleNewRoleSubmit}>
            <ModalTitle>Novo Cargo</ModalTitle>

            <Input
              name="codigo"
              placeholder="Código"
              containerStyle={{ marginTop: "3rem", width: "40rem" }}
            />
            <Input
              name="cargo"
              placeholder="Cargo"
              containerStyle={{ marginTop: "2rem" }}
            />

            <Dropdown
              value={
                selectedPerformanceType.type && selectedPerformanceType.type
              }
              placeholder="Tipo de avaliação"
              containerStyle={{
                width: "100%",
                margin: "2rem 0 3rem",
              }}
              btnStyle={{
                borderRadius: "10px",
              }}
              width="100%"
            >
              {performanceTypes.map((item) => (
                <DropdownItem
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setSelectedPerformanceType(item);
                  }}
                >
                  {item.type}
                </DropdownItem>
              ))}
            </Dropdown>

            <Button type="submit">SALVAR</Button>
          </Form>
        </ModalContainer>
      </Modal>

      <Modal open={openEditRoleModal} setOpen={setOpenEditRoleModal}>
        <ModalContainer>
          <Form onSubmit={handleEditRoleSubmit}>
            <ModalTitle>Editar Cargo</ModalTitle>

            <Input
              name="codigo"
              id="codigo"
              placeholder="Código"
              containerStyle={{ marginTop: "3rem", width: "40rem" }}
              value={selectedRole.uuid}
              onChange={handleInputChange}
            />
            <Input
              name="cargo"
              id="cargo"
              placeholder="Cargo"
              containerStyle={{ marginTop: "2rem" }}
              value={selectedRole.name}
              onChange={handleInputChange}
            />

            <Dropdown
              value={
                selectedPerformanceType.type && selectedPerformanceType.type
              }
              placeholder="Tipo de avaliação"
              containerStyle={{
                width: "100%",
                margin: "2rem 0 3rem",
              }}
              btnStyle={{
                borderRadius: "10px",
              }}
              width="100%"
            >
              {performanceTypes.map((item) => (
                <DropdownItem
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setSelectedPerformanceType(item);
                  }}
                >
                  {item.type}
                </DropdownItem>
              ))}
            </Dropdown>

            <Button type="submit">SALVAR</Button>
          </Form>
        </ModalContainer>
      </Modal>

      <Modal open={openExcludeRoleModal} setOpen={setOpenExcludeRoleModal}>
        <ModalContainer>
          <ModalTitle>Atenção</ModalTitle>
          <ModalDescription>
            Ao clicar em confirmar você excluirá o usuário "
            {selectedRoleToDelete.name}" do sistema.
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
              onClick={handleExcludeRole}
              containerStyle={{ marginRight: "1.5rem", minWidth: "23rem" }}
            >
              CONFIRMAR EXCLUSÃO
            </Button>
            <Button
              type="button"
              containerStyle={{ minWidth: "23rem" }}
              onClick={() => setOpenExcludeRoleModal(false)}
            >
              CANCELAR
            </Button>
          </div>
        </ModalContainer>
      </Modal>
    </Container>
  );
};

export default Roles;
