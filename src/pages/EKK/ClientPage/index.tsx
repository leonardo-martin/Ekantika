import React, { RefObject, useCallback, useEffect, useState } from "react";
import { Form } from "@unform/web";

import PageTitle from "../../../components/PageTitle";
import { useHistory, useParams } from "react-router-dom";
import Button from "../../../components/Button";
import Modal from "../../../components/Modal";
import Input from "../../../components/Input";
import Dropdown from "../../../components/Dropdown";

import SearchIcon from "@material-ui/icons/Search";

import {
  Container,
  ModalContainer,
  ModalTitle,
  Toolbar,
  GobackDiv,
  GoBackIcon,
  DropdownItem,
  IconsWrapper,
  EditIcon,
  RemoveIcon,
  TableHead,
  HierarchyWrapper,
  HierarchyName,
  ModalDescription,
  IdField,
  TypeField,
  NameField,
  CnpjField,
} from "./styles";
import FileInput from "../../../components/FileInput";
import Paper from "../../../components/Paper";
import api from "../../../services/api";
import LoadingScreen from "../../../components/LoadingScreen";
import { Grid } from "@material-ui/core";
import { useToast } from "../../../contexts/ToastContext";
import { cnpjMask } from "../../../utils/masks";

interface ParamProps {
  company_id: string;
}

interface TypeProps {
  id: string;
  name: string;
  slug: string;
}

interface CompanyProps {
  id: string;
  name: string;
  fantasy_name: string;
  parent_id?: string;
  cnpj: string;
  TipoName: string;
  children?: Array<CompanyProps>;
}

interface CompanyHierarchyProps {
  id: string;
  name: string;
  fantasy_name: string;
  parent_id?: string;
  TipoName: string;
}

interface NewHierarchyProps {
  cnpj: string;
  name: string;
  fantasy_name: string;
  parent_id: string;
  type_id: string;
}

const ClientPage: React.FC = () => {
  const { company_id } = useParams<ParamProps>();
  const [openImportModal, setOpenImportModal] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [company, setCompany] = useState<CompanyProps>({} as CompanyProps);
  const [selectedCompanyHierarchy, setSelectedCompanyHierarchy] =
    useState<CompanyHierarchyProps>({} as CompanyHierarchyProps);
  const [selectedCompanyToExclude, setSelectedCompanyToExclude] =
    useState<CompanyProps>({} as CompanyProps);

  const [companiesHierarchy, setCompaniesHierarchy] = useState<
    CompanyHierarchyProps[]
  >([] as CompanyHierarchyProps[]);

  const [inputRef, setInputRef] = useState<RefObject<HTMLInputElement> | null>(
    null
  );
  const [reloadData, setReloadData] = useState(true);

  const [types, setTypes] = useState<TypeProps[]>([] as TypeProps[]);
  const [selectedType, setSelectedType] = useState<TypeProps>({} as TypeProps);

  const [openHierarchyModal, setOpenHierarchyModal] = useState(false);
  const [openExcludeCompanyModal, setOpenExcludeCompanyModal] = useState(false);
  const [newCompany, setNewCompany] = useState<NewHierarchyProps>(
    {} as NewHierarchyProps
  );

  const history = useHistory();
  const { addToast } = useToast();

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, [reloadData]);

  useEffect(() => {
    async function loadCompany() {
      setLoading(true);

      const response = await api.get(`company/${company_id}/hierarquia`);

      if (response.data.success) {
        if (response.data.payload) {
          if (typeof response.data.payload === "object") {
            setCompany(response.data.payload);

            setReloadData((prevState) => !prevState);
          }
        }
        setLoading(false);
      }
    }

    loadCompany();
  }, [setCompany, company_id]);

  useEffect(() => {
    async function loadCompanyHierarchy() {
      setLoading(true);

      const response = await api.get(`company/${company_id}/hierarquia/all`);

      if (response.data.success) {
        if (response.data.payload) {
          if (Array.isArray(response.data.payload)) {
            setCompaniesHierarchy(response.data.payload);

            setReloadData((prevState) => !prevState);
          }
        }
        setLoading(false);
      }
    }

    loadCompanyHierarchy();
  }, [setCompany, company_id]);

  useEffect(() => {
    async function loadTypes() {
      setLoading(true);

      const response = await api.get("company/type");

      if (response.data.success) {
        if (response.data.payload) {
          if (typeof response.data.payload === "object") {
            let types = response.data.payload;

            types = types.filter((type: TypeProps) => type.name !== "Holding");

            setTypes(types);
          }
        }
        setLoading(false);
      }
    }

    loadTypes();
  }, [setTypes]);

  const handleGoBack = useCallback(() => {
    history.goBack();
  }, [history]);

  const handleSearchChange = useCallback((e) => {
    console.log(e.target.value);
  }, []);

  const handleExcludeCompany = useCallback(async () => {
    const response = await api.post("company/delete", {
      company_id: selectedCompanyToExclude.id,
    });

    if (!response.data.success) {
      addToast({
        type: "error",
        title: "Erro",
        description:
          "Ocorreu um erro ao excluir essa companhia, contate o suporte para mais informações.",
      });
      setOpenExcludeCompanyModal(false);

      return;
    } else {
      addToast({
        type: "success",
        title: "Sucesso",
        description: `A companhia ${selectedCompanyToExclude.fantasy_name} foi excluída com sucesso.`,
      });

      history.go(0);
    }
  }, [addToast, selectedCompanyToExclude, history, setOpenExcludeCompanyModal]);

  const handleHierarchyFormSubmit = useCallback(async () => {
    let err = false;
    let description = "";

    if (!newCompany.name) {
      description = "Razão social não pode ser nula.";
      err = true;
    }
    if (!newCompany.fantasy_name) {
      description = "Nome Fantasia não pode ser nulo.";
      err = true;
    }
    if (!newCompany.type_id) {
      description = "O Tipo não pode ser nulo.";
      err = true;
    }
    if (!newCompany.parent_id) {
      description = "A companhia superior precisa ser informada.";
      err = true;
    }
    if (!newCompany.cnpj) {
      description = "CNPJ não pode ser nulo.";
      err = true;
    }

    if (newCompany.cnpj && newCompany.cnpj.length < 18) {
      description = "CNPJ incompleto.";
      err = true;
    }

    if (err) {
      addToast({
        type: "error",
        title: "Erro",
        description,
      });

      setOpenHierarchyModal(false);
      return;
    }

    const response = await api.post("company/dados", newCompany);

    if (!response.data.success) {
      if (response.data.payload === "CNPJ já cadastrado") {
        addToast({
          type: "error",
          title: "Erro no cadastro",
          description: "CNPJ já cadastrado.",
        });
      } else {
        addToast({
          type: "error",
          title: "Erro ao Salvar",
          description:
            "Ocorreu um erro ao salvar os dados dessa companhia, contate o suporte para mais informações.",
        });
      }

      setOpenHierarchyModal(false);
      return;
    } else {
      addToast({
        type: "success",
        title: "Sucesso",
        description: "Uma nova empresa foi cadastrada no sistema.",
      });

      history.go(0);
    }

    // setSelectedType({} as TypeProps);
    // setNewCompany({} as NewHierarchyProps);
    // setSelectedCompanyHierarchy({} as CompanyHierarchyProps);
    // setOpenHierarchyModal(false);
  }, [addToast, newCompany, history]);

  const handleImportSubmit = useCallback(async (file: File) => {
    console.log(file);
  }, []);

  const handleSelecionarClick = useCallback(() => {
    if (inputRef && inputRef.current) {
      inputRef.current.click();
    }
  }, [inputRef]);

  const handleEditHierarchy = useCallback(
    (companyId: string, rootId?: string) => {
      history.push({
        pathname: `/ekk/client/edit/${companyId}`,
        state: { holdingId: rootId },
      });
    },
    [history]
  );

  const handleRemoveHierarchy = useCallback((company) => {
    setSelectedCompanyToExclude(company);

    setOpenExcludeCompanyModal(true);
  }, []);

  const handleNewCompanyChange = useCallback((e) => {
    const { value, id } = e.target;

    if (id === "cnpj") {
      setNewCompany((prevState) => ({
        ...prevState,
        [id]: cnpjMask(value),
      }));
    } else {
      setNewCompany((prevState) => ({
        ...prevState,
        [id]: value,
      }));
    }
  }, []);

  const renderAccordionTree = (
    node: CompanyProps,
    rootId?: string,
    hierarchyLevel?: string,
    firstChildrenArray?: Array<{ nodeId: string; hierarchyLevel: string }>,
    index?: number
  ) => {
    if (!node.parent_id) {
      rootId = node.id;
      firstChildrenArray = node?.children?.map((node, index) => ({
        nodeId: node.id,
        hierarchyLevel: "1." + String(index + 1),
      }));
    }

    if (node.parent_id === rootId && firstChildrenArray) {
      const currentNode = firstChildrenArray.find((n) => n?.nodeId === node.id);

      hierarchyLevel = currentNode?.hierarchyLevel;
    } else {
      index = index ?? 0;

      hierarchyLevel += "." + String(index + 1);
    }

    let hierarchyLeftPaddingSize;

    if (hierarchyLevel) {
      const paddingSizeRem = 0.7;

      hierarchyLeftPaddingSize =
        hierarchyLevel.split(".").length - 1 * paddingSizeRem;
    }

    if (node.id === rootId) {
      hierarchyLeftPaddingSize = 0;
    }

    if (Object.keys(node).length === 0) {
      return;
    }

    return (
      <div
        key={node.id}
        style={{
          width: "100%",
          paddingLeft:
            hierarchyLeftPaddingSize && node.id !== rootId
              ? hierarchyLeftPaddingSize + "rem"
              : "",
        }}
      >
        {
          <NodeComponent
            node={node}
            hierarchyLeftPaddingSize={0}
            rootId={rootId}
            handleEditHierarchy={handleEditHierarchy}
            handleRemoveHierarchy={handleRemoveHierarchy}
          />
        }

        {Array.isArray(node.children)
          ? node.children.map((node, index) =>
              renderAccordionTree(
                node,
                rootId,
                hierarchyLevel,
                firstChildrenArray,
                index
              )
            )
          : null}
      </div>
    );
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <Container>
      <GobackDiv>
        <GoBackIcon onClick={handleGoBack} />
        <PageTitle
          title={
            company.fantasy_name ? company.fantasy_name : "{{Company Name}}"
          }
        />
      </GobackDiv>

      <Paper containerStyle={{ width: "100%", flexDirection: "column" }}>
        <Toolbar>
          {/* <div style={{ display: "flex", alignItems: "center" }}>
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
          <Button outline width="10rem" containerStyle={{ marginLeft: "1rem" }}>
            APLICAR
          </Button>

          <p style={{ marginLeft: "1rem", fontSize: "1.3rem" }}>
            {selectedItems} itens selecionados
          </p>
        </div> */}

          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginLeft: "auto",
            }}
          >
            <Form onSubmit={() => {}}>
              <Input
                icon={<SearchIcon />}
                // value={globalFilter || ""}
                onChange={(e) => handleSearchChange(e)}
                name="search"
                placeholder={`Buscar`}
                type="text"
                containerStyle={{
                  background: "#F2F3F5",
                  border: "none",
                  borderRadius: "200px",
                  width: "25rem",
                  flex: 1,
                }}
                inputStyle={{}}
              />
            </Form>
            {/* <Button
              width="12rem"
              type="button"
              containerStyle={{ marginLeft: "1rem" }}
              onClick={() => {
                //setOpenImportModal(true);
              }}
              outline
            >
              IMPORTAR
            </Button> */}
            <Button
              width="12rem"
              type="button"
              containerStyle={{ marginLeft: "1rem" }}
              onClick={() => {
                setOpenHierarchyModal(true);
              }}
            >
              ADICIONAR
            </Button>
          </div>
        </Toolbar>

        <TableHead container>
          <Grid item xs={2}>
            <HierarchyName>ID</HierarchyName>
          </Grid>
          <Grid item xs={2}>
            <HierarchyName>TIPO</HierarchyName>
          </Grid>
          <Grid item xs={2}>
            <HierarchyName>NOME</HierarchyName>
          </Grid>
          <Grid item xs={3}>
            <HierarchyName>CNPJ</HierarchyName>
          </Grid>
        </TableHead>

        {renderAccordionTree(company)}
      </Paper>

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

      <Modal open={openHierarchyModal} setOpen={setOpenHierarchyModal}>
        <ModalContainer>
          <Form onSubmit={handleHierarchyFormSubmit}>
            <ModalTitle>Nova Hierarquia</ModalTitle>

            <Input
              name="cnpj"
              id="cnpj"
              placeholder="CNPJ"
              maxLength={18}
              value={newCompany.cnpj}
              onChange={handleNewCompanyChange}
            />
            <Input
              name="fantasy_name"
              id="fantasy_name"
              placeholder="Nome Fantasia"
              value={newCompany.fantasy_name}
              onChange={handleNewCompanyChange}
            />
            <Input
              name="name"
              id="name"
              placeholder="Razão social"
              value={newCompany.name}
              onChange={handleNewCompanyChange}
            />

            <Dropdown
              value={selectedType && selectedType.name}
              placeholder="Tipo"
              containerStyle={{
                width: "100%",
              }}
              btnStyle={{
                borderRadius: "10px",
              }}
              width="100%"
            >
              {types.map((item) => (
                <DropdownItem
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setSelectedType(item);

                    setNewCompany((prevState) => ({
                      ...prevState,
                      type_id: item.id,
                    }));
                  }}
                >
                  {item.name}
                </DropdownItem>
              ))}
            </Dropdown>

            <Dropdown
              value={
                selectedCompanyHierarchy.fantasy_name &&
                selectedCompanyHierarchy.fantasy_name
              }
              placeholder="Companhia superior"
              containerStyle={{ width: "100%", margin: "1rem 0 2rem" }}
              width="100%"
              btnStyle={{
                borderRadius: "10px",
              }}
            >
              {companiesHierarchy.map((item) => (
                <DropdownItem
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setSelectedCompanyHierarchy(item);

                    setNewCompany((prevState) => ({
                      ...prevState,
                      parent_id: item.id,
                    }));
                  }}
                >
                  {item.fantasy_name}
                </DropdownItem>
              ))}
            </Dropdown>

            <Button type="submit">SALVAR</Button>
          </Form>
        </ModalContainer>
      </Modal>

      <Modal
        open={openExcludeCompanyModal}
        setOpen={setOpenExcludeCompanyModal}
      >
        <ModalContainer>
          <ModalTitle>Atenção</ModalTitle>
          <ModalDescription>
            Ao clicar em confirmar você excluirá a companhia "
            {selectedCompanyToExclude.fantasy_name}" do sistema.
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
              onClick={handleExcludeCompany}
              containerStyle={{ marginRight: "1.5rem", minWidth: "23rem" }}
            >
              CONFIRMAR EXCLUSÃO
            </Button>
            <Button
              type="button"
              containerStyle={{ minWidth: "23rem" }}
              onClick={() => setOpenExcludeCompanyModal(false)}
            >
              CANCELAR
            </Button>
          </div>
        </ModalContainer>
      </Modal>
    </Container>
  );
};

interface NodeComponentProps {
  node: CompanyProps;
  rootId?: string;
  hierarchyLeftPaddingSize?: number;
  handleEditHierarchy(id: string, rootId?: string): void;
  handleRemoveHierarchy(element: CompanyProps): void;
}

const NodeComponent: React.FC<NodeComponentProps> = ({
  node,
  rootId,
  hierarchyLeftPaddingSize,
  handleEditHierarchy,
  handleRemoveHierarchy,
}) => {
  return (
    <HierarchyWrapper
      container
      style={{
        paddingLeft:
          hierarchyLeftPaddingSize && hierarchyLeftPaddingSize > 0
            ? 7 - hierarchyLeftPaddingSize + "rem"
            : "",
        background:
          rootId === node.id ? "rgba(110, 84, 255, 0.2)" : "transparent",
      }}
    >
      <Grid item xs={2}>
        <IdField isRootCompany={rootId === node.id}>{node.id}</IdField>
      </Grid>
      <Grid item xs={2}>
        <TypeField isRootCompany={rootId === node.id}>
          {node.TipoName}
        </TypeField>
      </Grid>
      <Grid item xs={2}>
        <NameField isRootCompany={rootId === node.id}>{node.name}</NameField>
      </Grid>
      <Grid item xs={3}>
        <CnpjField isRootCompany={rootId === node.id}>{node.cnpj}</CnpjField>
      </Grid>
      <Grid item xs={3}>
        <IconsWrapper>
          <EditIcon
            isRoot={!node.parent_id}
            onClick={() => handleEditHierarchy(node.id, rootId)}
          >
            Edit
          </EditIcon>
          <RemoveIcon
            isRoot={!node.parent_id}
            onClick={() => handleRemoveHierarchy(node)}
          >
            Trash
          </RemoveIcon>
        </IconsWrapper>
      </Grid>
    </HierarchyWrapper>
  );
};

export default ClientPage;
