import { Form } from "@unform/web";
import { useCallback, useEffect, useState } from "react";
import Button from "../../../../../components/Button";
import Dropdown from "../../../../../components/Dropdown";
import Input from "../../../../../components/Input";
import Modal from "../../../../../components/Modal";
import { useToast } from "../../../../../contexts/ToastContext";
import api from "../../../../../services/api";
import { useCompany } from "../../contexts/CompanyContext";
import LoadingScreen from "../../../../../components/LoadingScreen";

import SearchIcon from "@material-ui/icons/Search";

import {
  Container,
  Toolbar,
  ModalContainer,
  ModalTitle,
  DropdownItem,
  IconsWrapper,
  EditIcon,
  RemoveIcon,
  ModalDescription,
  HierarchyWrapper,
  HierarchyLevel,
  HierarchyMain,
  HierarchyName,
  HierarchyManager,
} from "./styles";

interface ElementProps {
  id: string;
  company_id: string;
  manager_id: string;
  parent_id: string;
  name: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  Manager: string;
  children?: Array<ElementProps>;
}

interface ManagerProps {
  id: string;
  name: string;
  email: string;
  photo: string;
  company_id: string;
  acl_role_id: string;
  perfil: string;
  company_role_id: string;
  company_area_id: string;
  enrollment: string;
}

const OrganizationalStructure: React.FC = () => {
  // const [action, setAction] = useState("");
  // const [selectedItems, setSelectedItems] = useState(0);
  const [openExcludeHierarchyModal, setOpenExcludeHierarchyModal] =
    useState(false);

  const [openNewHierarchyModal, setOpenNewHierarchyModal] = useState(false);
  const [openEditHierarchyModal, setOpenEditHierarchyModal] = useState(false);

  const [loading, setLoading] = useState<boolean>(true);
  const [resetHierarchy, setResetHierarchy] = useState(false);
  const [resetStructureList, setResetStructureList] = useState(false);

  const [hierarchy, setHierarchy] = useState<ElementProps>({} as ElementProps);

  const [structureList, setStructureList] = useState<ElementProps[]>(
    [] as ElementProps[]
  );
  const [managers, setManagers] = useState<ManagerProps[]>(
    [] as ManagerProps[]
  );
  const [selectedManager, setSelectedManager] = useState<ManagerProps>(
    {} as ManagerProps
  );

  const [selectedEditElement, setSelectedEditElement] = useState<ElementProps>(
    {} as ElementProps
  );

  const [selectedDeleteElement, setSelectedDeleteElement] =
    useState<ElementProps>({} as ElementProps);

  const [selectedDropdownStructure, setSelectedDropdownStructure] =
    useState<ElementProps>({} as ElementProps);

  const [reloadData, setReloadData] = useState(true);

  const { currentCompany } = useCompany();
  const { addToast } = useToast();

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, [reloadData]);

  useEffect(() => {
    if (!openNewHierarchyModal || !openEditHierarchyModal) {
      setSelectedManager({} as ManagerProps);
      setSelectedEditElement({} as ElementProps);
      setSelectedDropdownStructure({} as ElementProps);
    }
  }, [openNewHierarchyModal, openEditHierarchyModal]);

  useEffect(() => {
    if (openEditHierarchyModal === false) {
      setResetStructureList((prevState) => !prevState);

      setSelectedDropdownStructure({} as ElementProps);
    }
  }, [openEditHierarchyModal]);

  useEffect(() => {
    async function loadManagers() {
      const response = await api.get(`user/${currentCompany.id}/manager/list`);

      if (response.data.payload) {
        setManagers(response.data.payload);
      }
    }

    loadManagers();
  }, [currentCompany.id]);

  useEffect(() => {
    async function loadStructureList() {
      const response = await api.get(
        `company/${currentCompany.id}/structure/all`
      );
      if (response.data.payload) {
        setStructureList(response.data.payload);
      }
    }

    if (currentCompany.id || resetStructureList) {
      loadStructureList();
    }
  }, [setStructureList, currentCompany.id, resetStructureList]);

  useEffect(() => {
    async function loadHierarchy() {
      const response = await api.get(
        `company/${currentCompany.id}/structure/hierarchy`
      );

      console.log("hierarchy");
      console.log(response.data.payload);
      if (response.data.payload) {
        if (typeof response.data.payload === "object") {
          setHierarchy(response.data.payload);
          setLoading(false);

          setReloadData((prevState) => !prevState);
        }
      }
    }

    if (currentCompany.id || resetHierarchy) {
      loadHierarchy();
    }
  }, [setHierarchy, currentCompany.id, resetHierarchy]);

  const handleSearchChange = useCallback((e) => {
    console.log(e.target.value);
  }, []);

  const handleNewHierarchySubmit = useCallback(
    async (data) => {
      const response = await api.post("company/structure", {
        manager_id: selectedManager.id ?? "",
        parent_id: selectedDropdownStructure.id ?? "",
        name: data.name,
        company_id: currentCompany.id,
      });

      if (!response.data.success) {
        addToast({
          type: "error",
          title: "Erro",
          description:
            "Ocorreu um erro ao salvar essa estrutura, contate o suporte para mais informações.",
        });
      } else {
        addToast({
          type: "success",
          title: "Sucesso",
          description: "Estrutura criada com sucesso.",
        });

        setResetHierarchy(true);
        setTimeout(() => {
          setResetHierarchy(false);
        }, 100);

        setResetStructureList(true);
        setTimeout(() => {
          setResetStructureList(false);
        }, 100);

        setOpenNewHierarchyModal(false);
      }
    },
    [
      addToast,
      selectedDropdownStructure.id,
      currentCompany.id,
      selectedManager.id,
    ]
  );

  const handleEditHierarchySubmit = useCallback(
    async (data) => {
      const response = await api.post("company/structure/update", {
        manager_id: selectedManager.id ?? "",
        parent_id: selectedDropdownStructure.id ?? "",
        name: data.name,
        id: selectedEditElement.id,
      });

      if (!response.data.success) {
        addToast({
          type: "error",
          title: "Erro",
          description:
            "Ocorreu um erro ao editar essa estrutura, contate o suporte para mais informações.",
        });
      } else {
        addToast({
          type: "success",
          title: "Sucesso",
          description: "Estrutura atualizada com sucesso.",
        });

        setResetHierarchy(true);
        setTimeout(() => {
          setResetHierarchy(false);
        }, 100);

        setResetStructureList(true);
        setTimeout(() => {
          setResetStructureList(false);
        }, 100);

        setOpenEditHierarchyModal(false);
      }
    },
    [
      addToast,
      selectedDropdownStructure.id,
      selectedEditElement.id,
      selectedManager.id,
    ]
  );

  const findRemoveChildByNodeId = useCallback((data: any, id: any) => {
    const grouperElements = [...data];

    for (var i = 0; i < data.length; i++) {
      if (data[i]?.id === id) {
        delete data[i];

        data.filter((n: any) => n);

        return grouperElements;
      } else if (Array.isArray(data[i]?.children)) {
        findRemoveChildByNodeId(data[i]?.children, id);
      }
    }
  }, []);

  const handleExcludeHierarchy = useCallback(async () => {
    const response = await api.post("company/structure/delete", {
      id: selectedDeleteElement.id,
    });

    if (!response.data.success) {
      if (
        response.data.payload ===
        "Não pode deletar essa estruta pois existe outra estrutura dependente dela."
      ) {
        addToast({
          type: "error",
          title: "Erro",
          description:
            "Essa estrutura não pode ser deletada por conter dependentes.",
        });
      } else {
        addToast({
          type: "error",
          title: "Erro",
          description:
            "Ocorreu um erro ao excluir esta estrutura, contate o suporte para mais informações.",
        });
      }

      setOpenExcludeHierarchyModal(false);

      return;
    } else {
      addToast({
        type: "success",
        title: "Sucesso",
        description: "Estrutura deletada com sucesso.",
      });

      if (!selectedDeleteElement.parent_id) {
        setHierarchy({} as ElementProps);
      } else {
        const rootElementChildren = hierarchy.children ?? [];

        findRemoveChildByNodeId(rootElementChildren, selectedDeleteElement.id);

        setHierarchy((prevState) => ({
          ...prevState,
          children: rootElementChildren,
        }));
      }

      setResetStructureList(true);
      setTimeout(() => {
        setResetStructureList(false);
      }, 100);

      setOpenExcludeHierarchyModal(false);
    }
  }, [
    addToast,
    selectedDeleteElement,
    hierarchy.children,
    findRemoveChildByNodeId,
  ]);

  const handleEditHierarchy = useCallback(
    (element: ElementProps) => {
      const parentElement = structureList.find(
        (e) => e.id === element.parent_id
      );

      if (parentElement) {
        setSelectedDropdownStructure(parentElement);

        setSelectedEditElement(element);

        setStructureList((prevState) => {
          const newStructureList = prevState.filter(
            (structure) => structure.id !== element.id
          );

          return newStructureList;
        });

        setOpenEditHierarchyModal(true);
      } else {
        setStructureList([]);

        setSelectedEditElement(element);

        setOpenEditHierarchyModal(true);
      }
    },
    [setSelectedDropdownStructure, structureList]
  );

  const handleRemoveHierarchy = useCallback((element: ElementProps) => {
    setSelectedDeleteElement(element);

    setOpenExcludeHierarchyModal(true);
  }, []);

  const handleEditSelectedElementChange = useCallback((e) => {
    const { value, id } = e.target;

    setSelectedEditElement((prevState) => ({ ...prevState, [id]: value }));
  }, []);

  // const renderAccordionTree = (
  //   // rootIdHierarchyLevel: string,
  //   node: ElementProps,
  //   rootId?: string,
  //   hierarchyLevel?: string,
  //   firstChildrenArray?: Array<{ nodeId: string; hierarchyLevel: string }>,
  //   index?: number
  // ) => {
  //   if (!node.parent_id) {
  //     rootId = node.id;
  //     firstChildrenArray = node?.children?.map((node, index) => ({
  //       nodeId: node.id,
  //       hierarchyLevel: String(index + 1),
  //     }));
  //   }

  //   if (node.parent_id === rootId && firstChildrenArray) {
  //     const currentNode = firstChildrenArray.find((n) => n?.nodeId === node.id);

  //     hierarchyLevel = currentNode?.hierarchyLevel;
  //   } else {
  //     index = index ?? 0;

  //     hierarchyLevel += "." + String(index + 1);
  //   }

  //   let hierarchyMargin;

  //   if (hierarchyLevel) {
  //     hierarchyMargin = hierarchyLevel.split(".").length - 1;
  //   }

  //   return (
  //     <div key={node.id}>
  //       <NodeComponent
  //         node={node}
  //         hierarchyMargin={hierarchyMargin}
  //         hierarchyLevel={hierarchyLevel}
  //         rootId={rootId}
  //       />

  //       {/* {Array.isArray(node.children)
  //         ? node.children.map((node, index) =>
  //             renderAccordionTree(
  //               rootIdHierarchyLevel,
  //               node,
  //               rootId,
  //               hierarchyLevel,
  //               firstChildrenArray,
  //               index
  //             )
  //           )
  //         : null} */}

  //       {Array.isArray(node.children)
  //         ? node.children.map((node, index) =>
  //             renderAccordionTree(
  //               node,
  //               rootId,
  //               hierarchyLevel,
  //               firstChildrenArray,
  //               index
  //             )
  //           )
  //         : null}
  //     </div>
  //   );
  // };

  const renderAccordionTree = (
    node: ElementProps,
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

    let hierarchyMargin;

    if (hierarchyLevel) {
      hierarchyMargin = hierarchyLevel.split(".").length - 1;
    }

    if (node.id === rootId) {
      hierarchyMargin = 0;
      hierarchyLevel = "1";
    }

    if (Object.keys(node).length === 0) {
      return;
    }

    return (
      <div key={node.id}>
        {
          <NodeComponent
            node={node}
            hierarchyMargin={hierarchyMargin}
            hierarchyLevel={hierarchyLevel}
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
          style={{ display: "flex", alignItems: "center", marginLeft: "auto" }}
        >
          <Form onSubmit={() => {}}>
            <Input
              icon={<SearchIcon />}
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
              //setOpenNewHierarchyModal(true);
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
              setOpenNewHierarchyModal(true);
            }}
          >
            ADICIONAR
          </Button>
        </div>
      </Toolbar>

      <div>{renderAccordionTree(hierarchy)}</div>

      <Modal open={openNewHierarchyModal} setOpen={setOpenNewHierarchyModal}>
        <ModalContainer>
          <Form onSubmit={handleNewHierarchySubmit}>
            <ModalTitle>NOVA HIERARQUIA</ModalTitle>

            <Input
              name="name"
              placeholder="Nome da Area/setor"
              containerStyle={{ marginTop: "3rem", width: "100%" }}
            />

            <Dropdown
              value={selectedManager.name && selectedManager.name}
              placeholder="Nome do responsável (opcional)"
              containerStyle={{
                width: "100%",
                marginTop: "2rem",
              }}
              btnStyle={{
                borderRadius: "10px",
              }}
              width="100%"
            >
              {managers.map((item) => (
                <DropdownItem
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setSelectedManager(item);
                  }}
                >
                  {item.name}
                </DropdownItem>
              ))}
            </Dropdown>

            <Dropdown
              value={
                selectedDropdownStructure.name && selectedDropdownStructure.name
              }
              placeholder="Área superior (opcional)"
              containerStyle={{
                width: "100%",
                margin: "2rem 0 3rem",
              }}
              btnStyle={{
                borderRadius: "10px",
              }}
              width="100%"
            >
              {structureList.map((item) => (
                <DropdownItem
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setSelectedDropdownStructure(item);
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

      <Modal open={openEditHierarchyModal} setOpen={setOpenEditHierarchyModal}>
        <ModalContainer>
          <Form onSubmit={handleEditHierarchySubmit}>
            <ModalTitle>EDITAR HIERARQUIA</ModalTitle>

            <Input
              name="name"
              id="name"
              value={selectedEditElement.name}
              onChange={handleEditSelectedElementChange}
              placeholder="Nome da Area/setor"
              containerStyle={{ marginTop: "3rem", width: "100%" }}
            />

            <Dropdown
              value={selectedManager.name && selectedManager.name}
              placeholder="Nome do responsável (opcional)"
              containerStyle={{
                width: "100%",
                marginTop: "2rem",
              }}
              btnStyle={{
                borderRadius: "10px",
              }}
              width="100%"
            >
              {managers.map((item) => (
                <DropdownItem
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setSelectedManager(item);
                  }}
                >
                  {item.name}
                </DropdownItem>
              ))}
            </Dropdown>

            <Dropdown
              value={
                selectedDropdownStructure.name && selectedDropdownStructure.name
              }
              placeholder="Área superior (opcional)"
              containerStyle={{
                width: "100%",
                margin: "2rem 0 3rem",
              }}
              btnStyle={{
                borderRadius: "10px",
              }}
              width="100%"
            >
              {structureList.map((item) => (
                <DropdownItem
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setSelectedDropdownStructure(item);
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

      <Modal
        open={openExcludeHierarchyModal}
        setOpen={setOpenExcludeHierarchyModal}
      >
        <ModalContainer>
          <ModalTitle>Atenção</ModalTitle>
          <ModalDescription>
            Ao clicar em confirmar você excluirá a hierarquia "
            {selectedDeleteElement.name}" do sistema.
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
              onClick={handleExcludeHierarchy}
              containerStyle={{ marginRight: "1.5rem" }}
            >
              CONFIRMAR EXCLUSÃO
            </Button>
            <Button
              type="button"
              containerStyle={{}}
              onClick={() => setOpenExcludeHierarchyModal(false)}
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
  node: ElementProps;
  rootId?: string;
  hierarchyLevel?: string;
  hierarchyMargin?: number;
  handleEditHierarchy(element: ElementProps): void;
  handleRemoveHierarchy(element: ElementProps): void;
}

const NodeComponent: React.FC<NodeComponentProps> = ({
  node,
  rootId,
  hierarchyLevel,
  hierarchyMargin,
  handleEditHierarchy,
  handleRemoveHierarchy,
}) => {
  const [element, setElement] = useState<ElementProps>(node);

  return (
    <HierarchyWrapper
      style={{
        marginLeft:
          hierarchyMargin && hierarchyMargin > 0
            ? hierarchyMargin * 2 + "rem"
            : "",
        background: !element.parent_id
          ? "rgba(110, 84, 255, 0.2)"
          : "transparent",
      }}
    >
      <HierarchyLevel
        isRoot={!element.parent_id}
      >{`NÍVEL ${hierarchyLevel}`}</HierarchyLevel>
      <HierarchyMain>
        <HierarchyName>{element.name}</HierarchyName>
        <HierarchyManager>
          {element.Manager ? (
            <>
              Responsável:
              <strong style={{ marginLeft: "0.4rem" }}>
                {element.Manager}
              </strong>
            </>
          ) : (
            ""
          )}
        </HierarchyManager>
      </HierarchyMain>

      <IconsWrapper>
        <EditIcon
          isRoot={!element.parent_id}
          onClick={() => handleEditHierarchy(element)}
        >
          Edit
        </EditIcon>
        <RemoveIcon
          isRoot={!element.parent_id}
          onClick={() => handleRemoveHierarchy(element)}
        >
          Trash
        </RemoveIcon>
      </IconsWrapper>
    </HierarchyWrapper>
  );
};

export default OrganizationalStructure;
