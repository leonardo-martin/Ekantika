import { useState, useMemo, useCallback, useEffect } from "react";

import { Form } from "@unform/web";
import { Grid } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { v4 as uuid_v4 } from "uuid";

import Button from "../../../../../components/Button";
import Modal from "../../../../../components/Modal";
import Table from "../../../../../components/Table";
import Textarea from "../../../../../components/Textarea";
import Input from "../../../../../components/Input";

import TablePaginationActions from "../../../../../components/Table/components/TablePaginationActions";

import AccordionDetails from "@material-ui/core/AccordionDetails";

import {
  Container,
  IconsWrapper,
  EditIcon,
  CopyIcon,
  HierarchyIcon,
  RemoveIcon,
  ModalContainer,
  ModalTitle,
  ModalSubtitle,
  Switch,
  ModalDescription,
  TablePagination,
  Accordion,
  ArrowDownIcon,
  AccordionSummary,
  ButtonsWrapper,
  AccordionTitle,
  NodeTitle,
} from "./styles";
import LoadingScreen from "../../../../../components/LoadingScreen";
// import { useHistory } from "react-router";
import { useToast } from "../../../../../contexts/ToastContext";
import api from "../../../../../services/api";
import onlyNumbers from "../../../../../utils/onlyNumbers";

interface newElementProps {
  max: string;
  min: string;
  theme: string;
}

interface ElementProps {
  id: string;
  uuid: string;
  type_id: string;
  category_id: string;
  question: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  answer_type_id: string;
  performance_evaluation_id: string;
  parent_id: string;
  justify_answer: string;
  justiry_required: string;
  length_mix: string;
  length_max: string;
  description: string;
  grouper: string;
  children?: Array<ElementProps> | any[];
}
interface DataProps {
  id: string;
  grouper_icon: React.ReactNode;
  theme: string;
  edit_remove: React.ReactNode;
}

// interface HierarchyInputProps {
//   [key: string]: string;
// }

const culturalFitId = 1;

interface CulturalFitProps {
  setCulturalFitData(data: any): void;
}

const CulturalFit: React.FC<CulturalFitProps> = ({ setCulturalFitData }) => {
  const [expanded, setExpanded] = useState<string | false>("panel1");

  const [elements, setElements] = useState<ElementProps[]>([]);

  const [grouperElements, setGrouperElements] = useState<ElementProps[]>([]);
  // const [grouperInputs, setGrouperInputs] = useState<HierarchyInputProps>(
  //   {} as HierarchyInputProps
  // );

  const [selectedGrouperElement, setSelectedGrouperElement] =
    useState<ElementProps>({} as ElementProps);
  const [selectedElement, setSelectedElement] = useState<ElementProps>(
    {} as ElementProps
  );
  const [selectedElementToDelete, setSelectedElementToDelete] =
    useState<ElementProps>({} as ElementProps);

  const [expandedGrouperAccordion, setExpandedGrouperAccordion] = useState<
    string | false
  >("panel1");

  const [openExcludeElementModal, setOpenExcludeElementModal] = useState(false);
  const [openAddElementModal, setOpenAddElementModal] = useState(false);
  const [openEditElementModal, setOpenEditElementModal] = useState(false);

  const [openEditGroupModal, setOpenEditGroupModal] = useState(false);
  const [openAddGroupModal, setOpenAddGroupModal] = useState(false);

  const [data, setData] = useState<DataProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [reloadTab, setReloadTab] = useState(true);
  const [reloadData, setReloadData] = useState(false);

  const { addToast } = useToast();
  // const history = useHistory();

  const columns = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
        width: "5%",
      },
      {
        Header: " ",
        accessor: "grouper_icon",
        width: "8%",
      },
      {
        Header: "TEMA",
        accessor: "theme",
      },
      {
        Header: " ",
        accessor: "edit_remove",
      },
    ],
    []
  );

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 100);
  }, [reloadTab]);

  async function loadElements() {
    const response = await api.post("exame/list", {
      category_id: culturalFitId,
    });

    console.log(response.data);

    if (!response.data.payload) {
      setLoading(false);
    } else {
      setElements(response.data.payload);

      const groupers = response.data.payload.filter(
        (element: any) => element.grouper === "1"
      );

      setGrouperElements(groupers);

      setReloadTab((prevState) => !prevState);
    }
  }

  useEffect(() => {
    if (reloadData) {
      loadElements();
    }
  }, [reloadData]);

  useEffect(() => {
    loadElements();
  }, []);

  const handleCopyElementClick = useCallback(async (element: ElementProps) => {
    if (element.grouper === "0") {
      setSelectedElement(element);
      setOpenAddElementModal(true);
    } else {
      const response = await api.get(`exame/${element.id}/info`);
      if (response.data.success) {
        setSelectedGrouperElement(response.data.payload);
        // console.log(response.data.payload);

        setOpenAddGroupModal(true);
      }
    }
  }, []);

  const handleEditElementClick = useCallback(async (element: ElementProps) => {
    if (element.grouper === "0") {
      setSelectedElement(element);
      setOpenEditElementModal(true);
    } else {
      const response = await api.get(`exame/${element.id}/info`);
      if (response.data.success) {
        setSelectedGrouperElement(response.data.payload);

        console.log(response.data.payload);

        setOpenEditGroupModal(true);
      }
    }
  }, []);

  const handleRemoveElementClick = useCallback(
    async (element: ElementProps) => {
      setSelectedElementToDelete(element);
      setOpenExcludeElementModal(true);
    },
    []
  );

  useEffect(() => {
    async function loadData() {
      const displayCulturalFitList: DataProps[] = elements.map((element) => ({
        id: element.id,
        grouper_icon: element.grouper === "1" ? <HierarchyIcon /> : "",
        theme: element.grouper === "1" ? element.question : element.description,
        edit_remove: (
          <IconsWrapper>
            <EditIcon onClick={() => handleEditElementClick(element)}>
              Edit
            </EditIcon>
            <CopyIcon onClick={() => handleCopyElementClick(element)}>
              Copy
            </CopyIcon>
            <RemoveIcon onClick={() => handleRemoveElementClick(element)}>
              Trash
            </RemoveIcon>
          </IconsWrapper>
        ),
      }));

      setData(displayCulturalFitList);

      setLoading(false);
    }

    if (elements.length >= 0) {
      loadData();
    }
  }, [
    elements,
    handleRemoveElementClick,
    handleCopyElementClick,
    handleEditElementClick,
  ]);

  const handleExcludeRole = useCallback(async () => {
    const response = await api.post("exame/delete", {
      exame_id: selectedElementToDelete.id,
    });

    if (!response.data.success) {
      addToast({
        type: "error",
        title: "Erro",
        description:
          "Ocorreu um erro ao excluir este elemento, contate o suporte para mais informações.",
      });

      return;
    } else {
      addToast({
        type: "success",
        title: "Sucesso",
        description: "Elemento foi deletado com sucesso.",
      });

      let newRoleState = elements.filter(
        (item) => item.id !== selectedElementToDelete.id
      );

      setElements(newRoleState);

      setOpenExcludeElementModal(false);

      setReloadTab((prevState) => !prevState);
    }
  }, [addToast, setElements, elements, selectedElementToDelete.id]);

  const handleEditElementSubmit = useCallback(
    async (data: newElementProps) => {
      const formData = {
        category_id: culturalFitId,
        exame_id: selectedElement.id,
        typeid: selectedElement.type_id,
        justify_answer: selectedElement.justify_answer,
        justiry_required: selectedElement.justiry_required,
        description: data.theme,
        length_mix: data.min,
        length_max: data.max,
        parent_id: "",
      };

      let err = false;
      let description = "";

      if (!formData.description || formData.description.length === 0) {
        description = "O tema não pode ser nulo.";
        err = true;
      }

      if (
        !formData.length_max &&
        formData.length_mix &&
        formData.length_mix > formData.length_max
      ) {
        description =
          "Número mínimo de caracteres não pode ser maior do que o número máximo.";
        err = true;
      }

      if (!formData.length_mix || formData.length_mix.length === 0) {
        description = "Número mínimo de caracteres não pode ser nulo.";
        err = true;
      }
      if (!formData.length_max || formData.length_max.length === 0) {
        description = "Número máximo de caracteres não pode ser nulo.";
        err = true;
      }

      // console.log(formData);

      if (err) {
        addToast({
          type: "error",
          title: "Erro",
          description,
        });
        return;
      }

      const response = await api.post("exame/update", formData);
      // console.log(response.data);

      if (!response.data.success) {
        addToast({
          type: "error",
          title: "Erro ao Editar",
          description:
            "Ocorreu um erro ao editar o elemento, contate o suporte para mais informações.",
        });
        return;
      } else {
        addToast({
          type: "success",
          title: "Sucesso",
          description: "Elemento editado com sucesso.",
        });

        // setElements((prevState) =>
        //   prevState.map((item) =>
        //     item.id === formData.exame_id ? response.data.payload : item
        //   )
        // );

        setSelectedElement({
          ...selectedElement,
          description: data.theme,
          length_mix: data.min,
          length_max: data.max,
          parent_id: "",
        });

        // console.log(response.data.payload);

        setReloadData(true);
        setTimeout(() => {
          setReloadData(false);
        }, 100);

        setOpenEditElementModal(false);
      }
    },
    [addToast, selectedElement]
  );

  const handleAddGroupSubmit = useCallback(
    async (data) => {
      const formData = {
        question: data.question,
        description: data.description,
        category_id: culturalFitId,
        typeid: selectedGrouperElement.type_id,
        parent_id: "",
        grouper: "1",
      };

      // console.log(formData);

      const response = await api.post("exame", formData);

      if (!response.data.success) {
        addToast({
          type: "error",
          title: "Erro ao Salvar",
          description:
            "Ocorreu um erro ao cadastrar um novo elemento, contate o suporte para mais informações.",
        });

        setOpenAddGroupModal(false);
        return;
      } else {
        setSelectedGrouperElement(response.data.payload);

        addToast({
          type: "success",
          title: "Sucesso",
          description: "Um novo elemento foi cadastrado no sistema.",
        });

        setReloadData(true);
        setTimeout(() => {
          setReloadData(false);
        }, 100);
      }
    },
    [selectedGrouperElement.type_id, addToast]
  );

  const handleEditGroupSubmit = useCallback(
    async (data) => {
      const formData = {
        question: data.question,
        description: data.description,
        category_id: culturalFitId,
        typeid: selectedGrouperElement.type_id,
        exame_id: selectedGrouperElement.id,
        parent_id: "",
        grouper: "1",
      };

      // console.log("formData: ");
      // console.log(formData);
      // console.log(selectedGrouperElement);

      const response = await api.post("exame/update", formData);
      // console.log(response.data);

      if (!response.data.success) {
        addToast({
          type: "error",
          title: "Erro ao Salvar",
          description:
            "Ocorreu um erro ao cadastrar um novo elemento, contate o suporte para mais informações.",
        });
        return;
      } else {
        addToast({
          type: "success",
          title: "Sucesso",
          description: "Um novo elemento foi cadastrado no sistema.",
        });

        setReloadData(true);
        setTimeout(() => {
          setReloadData(false);
        }, 100);

        setOpenEditGroupModal(false);
      }
    },
    [addToast, selectedGrouperElement]
  );

  const handleAddElementSubmit = useCallback(
    async (data: newElementProps) => {
      const formData = {
        description: data.theme,
        length_mix: data.min,
        length_max: data.max,
        justify_answer: selectedElement.justify_answer,
        justiry_required: selectedElement.justiry_required,
        category_id: culturalFitId,
        typeid: selectedElement.type_id,
        parent_id: "",
      };

      // console.log(formData);

      let err = false;
      let description = "";

      if (!formData.description || formData.description.length === 0) {
        description = "O tema não pode ser nulo.";
        err = true;
      }

      if (
        !formData.length_max &&
        formData.length_mix &&
        formData.length_mix > formData.length_max
      ) {
        description =
          "Número mínimo de caracteres não pode ser maior do que o número máximo.";
        err = true;
      }

      if (!formData.length_mix || formData.length_mix.length === 0) {
        description = "Número mínimo de caracteres não pode ser nulo.";
        err = true;
      }
      if (!formData.length_max || formData.length_max.length === 0) {
        description = "Número máximo de caracteres não pode ser nulo.";
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

      const response = await api.post("exame", formData);
      // console.log(response.data);

      if (!response.data.success) {
        addToast({
          type: "error",
          title: "Erro ao Salvar",
          description:
            "Ocorreu um erro ao cadastrar um novo elemento, contate o suporte para mais informações.",
        });
        return;
      } else {
        addToast({
          type: "success",
          title: "Sucesso",
          description: "Um novo elemento foi cadastrado no sistema.",
        });

        setReloadData(true);
        setTimeout(() => {
          setReloadData(false);
        }, 100);

        setOpenAddElementModal(false);
      }
    },
    [
      addToast,
      selectedElement.justify_answer,
      selectedElement.justiry_required,
      selectedElement.type_id,
    ]
  );

  const handleInputChange = useCallback((e) => {
    const { value, id } = e.target;

    setSelectedElement((prevState) => {
      if (id === "min") {
        return {
          ...prevState,
          length_mix: onlyNumbers(value),
        };
      }

      if (id === "max") {
        return {
          ...prevState,
          length_max: onlyNumbers(value),
        };
      }

      if (id === "theme") {
        return {
          ...prevState,
          description: value,
        };
      }

      return prevState;
    });
  }, []);

  const handleGrouperInputChange = useCallback((e, initialValue?: string) => {
    const { value, id } = e.target as { value: string; id: string };

    console.log(value, initialValue, id);
    //   setGrouperInputs((prevState) => ({
    //     ...prevState,
    //     [id]:
    //       initialValue && initialValue.length > value.length
    //         ? initialValue
    //         : value,
    //   }));

    setSelectedGrouperElement((prevState) => ({ ...prevState, [id]: value }));
  }, []);

  // const handleGrouperSwitchChange = useCallback((e) => {
  //   const { value, id } = e.target;

  //   console.log(value, id);

  //   // setSelectedElement((prevState) => ({
  //   //   ...prevState,
  //   //   justiry_required:
  //   //     selectedElement.justiry_required === "1"
  //   //       ? "0"
  //   //       : "1",
  //   // }));
  // }, []);

  // const handleExpandedChange = useCallback(
  //   (panel: string) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
  //     setExpanded(isExpanded ? panel : false);
  //   },
  //   []
  // );

  const getPaginationProps = useCallback(
    (data) => {
      setCulturalFitData(data);
    },
    [setCulturalFitData]
  );

  const handleNewGrouperElementClick = useCallback(() => {
    const rootElementChildren = selectedGrouperElement.children ?? [];

    const uuid = uuid_v4();

    rootElementChildren.push({
      parent_id: selectedGrouperElement.id,
      id: uuid,
      uuid: "",
      type_id: "",
      category_id: "",
      question: "",
      created_at: "",
      updated_at: "",
      deleted_at: "",
      answer_type_id: "",
      performance_evaluation_id: "",
      justify_answer: "0",
      justiry_required: "0",
      length_mix: "",
      length_max: "",
      description: "",
      grouper: "",
      children: [],
    } as ElementProps);

    console.log(rootElementChildren);

    setSelectedGrouperElement((prevState) => ({
      ...prevState,
      children: rootElementChildren,
    }));
  }, [selectedGrouperElement]);

  const findAppendChildByNodeId = useCallback((data: any, id?: string) => {
    const grouperElements = [...data];
    const uuid = uuid_v4();

    for (var i = 0; i < data.length; i++) {
      if (data[i]?.id === id) {
        if (
          !grouperElements[i].children ||
          grouperElements[i].children === undefined ||
          grouperElements[i].children.length === 0
        ) {
          grouperElements[i].children = [
            {
              parent_id: id,
              id: uuid,
              uuid: "",
              type_id: "",
              category_id: "",
              question: "",
              created_at: "",
              updated_at: "",
              deleted_at: "",
              answer_type_id: "",
              performance_evaluation_id: "",
              justify_answer: "0",
              justiry_required: "0",
              length_mix: "",
              length_max: "",
              description: "",
              grouper: "",
              children: [],
            } as ElementProps,
          ];
        } else {
          grouperElements[i]?.children.push({
            parent_id: id,
            id: uuid,
            uuid: "",
            type_id: "",
            category_id: "",
            question: "",
            created_at: "",
            updated_at: "",
            deleted_at: "",
            answer_type_id: "",
            performance_evaluation_id: "",
            justify_answer: "0",
            justiry_required: "0",
            length_mix: "",
            length_max: "",
            description: "",
            grouper: "",
            children: [],
          } as ElementProps);
        }
        return grouperElements;
      } else if (Array.isArray(data[i]?.children)) {
        findAppendChildByNodeId(data[i]?.children, id);
      }
    }
  }, []);

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

  const findUpdateChildByNodeId = useCallback(
    (data: any, id: string, newElement: ElementProps) => {
      const grouperElements = [...data];

      for (var i = 0; i < data.length; i++) {
        if (data[i]?.id === id) {
          data[i] = newElement;

          return grouperElements;
        } else if (Array.isArray(data[i]?.children)) {
          findUpdateChildByNodeId(data[i]?.children, id, newElement);
        }
      }
    },
    []
  );

  const findAndCreateSibblingByParentId = useCallback(
    (data: any, id: string, element: ElementProps) => {
      const grouperElements = [...data];
      const uuid = uuid_v4();

      for (var i = 0; i < data.length; i++) {
        if (data[i]?.id === id) {
          grouperElements[i]?.children.push({
            ...element,
            parent_id: id,
            id: uuid,
            children: [],
          } as ElementProps);

          return grouperElements;
        } else if (Array.isArray(data[i]?.children)) {
          findAndCreateSibblingByParentId(data[i]?.children, id, element);
        }
      }
    },
    []
  );

  const handleGrouperSubElementClick = useCallback(
    (id) => {
      const rootElementChildren = selectedGrouperElement?.children;

      findAppendChildByNodeId(rootElementChildren, id);

      setSelectedGrouperElement((prevState) => ({
        ...prevState,
        children: rootElementChildren,
      }));
    },
    [findAppendChildByNodeId, selectedGrouperElement]
  );

  const handleRemoveGrouper = useCallback(
    async (id) => {
      await api.post("exame/delete", { exame_id: id });

      const rootElementChildren = selectedGrouperElement.children ?? [];

      findRemoveChildByNodeId(rootElementChildren, id);

      setSelectedGrouperElement((prevState) => ({
        ...prevState,
        children: rootElementChildren,
      }));
    },
    [findRemoveChildByNodeId, selectedGrouperElement]
  );

  const handleCopyGroupElementClick = useCallback(
    (parent_id, element: ElementProps) => {
      const rootElementChildren = selectedGrouperElement?.children;

      // const element = getCurrentElement(id);

      const foundParent = findAndCreateSibblingByParentId(
        rootElementChildren,
        parent_id,
        element
      );

      if (foundParent) {
        setSelectedGrouperElement((prevState) => ({
          ...prevState,
          children: rootElementChildren,
        }));
      } else {
        const id = uuid_v4();

        const childrenArray = selectedGrouperElement.children ?? [];
        childrenArray.push({ ...element, id });

        setSelectedGrouperElement((prevState) => ({
          ...prevState,
          children: childrenArray,
        }));
      }
    },
    [findAndCreateSibblingByParentId, selectedGrouperElement]
  );

  const handleGrouperUpdate = useCallback(
    (previousElement: ElementProps, newElement: ElementProps) => {
      const rootElementChildren = selectedGrouperElement.children ?? [];

      findUpdateChildByNodeId(
        rootElementChildren,
        previousElement.id,
        newElement
      );

      setSelectedGrouperElement((prevState) => ({
        ...prevState,
        children: rootElementChildren,
      }));
    },
    [findUpdateChildByNodeId, selectedGrouperElement]
  );

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
        hierarchyLevel: String(index + 1),
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

    return (
      <div key={node.id}>
        {node.id !== rootId && (
          <GrouperFormComponent
            node={node}
            hierarchyLevel={hierarchyLevel}
            handleGrouperSubElementClick={handleGrouperSubElementClick}
            handleRemoveGrouper={handleRemoveGrouper}
            handleCopyGroupElementClick={handleCopyGroupElementClick}
            handleGrouperUpdate={handleGrouperUpdate}
            hierarchyMargin={hierarchyMargin}
          />
        )}

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
      <Table
        toolBarLeftComponents={<div />}
        tableData={data}
        columns={columns}
        pagination={false}
        borderBottom={false}
        showToolbar
        showAllRows={false}
        getPaginationProps={getPaginationProps}
        toolBarButtons={
          <>
            <Button
              type="button"
              width="20rem"
              style={{ marginLeft: "1rem" }}
              onClick={() => {
                setExpanded("panel1");
                setOpenAddGroupModal(true);
                setSelectedGrouperElement({} as ElementProps);
              }}
            >
              NOVO AGRUPADOR
            </Button>
            <Button
              type="button"
              width="20rem"
              style={{ marginLeft: "1rem" }}
              onClick={() => {
                setOpenAddElementModal(true);
                setSelectedElement({} as ElementProps);
              }}
            >
              NOVO ELEMENTO
            </Button>
          </>
        }
      />

      <Modal open={openAddElementModal} setOpen={setOpenAddElementModal}>
        <ModalContainer>
          <Form
            onSubmit={handleAddElementSubmit}
            style={{ display: "flex", flexDirection: "column" }}
          >
            <ModalTitle>Adicionar elemento de fit cultural</ModalTitle>

            <Textarea
              name="theme"
              id="theme"
              value={selectedElement.description}
              onChange={handleInputChange}
              containerStyle={{
                width: "100%",
                margin: "3rem 0",
                background: "#F2F3F5",
              }}
              textareaStyle={{
                height: "10rem",
              }}
              placeholder="Tema"
            />

            <Grid container>
              <Grid item xs={3}>
                <ModalSubtitle>Justificar resposta?</ModalSubtitle>

                <Switch
                  color="primary"
                  checked={
                    selectedElement.justify_answer === "1" ? true : false
                  }
                  onChange={() => {
                    setSelectedElement((prevState) => ({
                      ...prevState,
                      justify_answer:
                        selectedElement.justify_answer === "1" ? "0" : "1",
                    }));
                  }}
                />
              </Grid>
              <Grid item xs={3}>
                <ModalSubtitle>Obrigatória?</ModalSubtitle>
                <Switch
                  color="primary"
                  checked={
                    selectedElement.justiry_required === "1" ? true : false
                  }
                  onChange={() => {
                    setSelectedElement((prevState) => ({
                      ...prevState,
                      justiry_required:
                        selectedElement.justiry_required === "1" ? "0" : "1",
                    }));
                  }}
                />
              </Grid>
              <Grid item xs={4}>
                <ModalSubtitle>Caracteres</ModalSubtitle>
                <div style={{ display: "flex" }}>
                  <Input
                    name="min"
                    id="min"
                    containerStyle={{ width: "45rem", marginTop: "2rem" }}
                    placeholder="Mín."
                    value={selectedElement.length_mix}
                    onChange={handleInputChange}
                  />
                  <Input
                    name="max"
                    id="max"
                    containerStyle={{
                      width: "45rem",
                      marginTop: "2rem",
                      marginLeft: "1rem",
                    }}
                    placeholder="Máx"
                    value={selectedElement.length_max}
                    onChange={handleInputChange}
                  />
                </div>
              </Grid>
            </Grid>

            <Button
              width="20rem"
              type="submit"
              containerStyle={{ marginTop: "3rem", marginLeft: "auto" }}
            >
              SALVAR
            </Button>
          </Form>
        </ModalContainer>
      </Modal>

      <Modal open={openEditElementModal} setOpen={setOpenEditElementModal}>
        <ModalContainer>
          <Form
            onSubmit={handleEditElementSubmit}
            style={{ display: "flex", flexDirection: "column" }}
          >
            <ModalTitle>Editar elemento de fit cultural</ModalTitle>

            <Textarea
              name="theme"
              id="theme"
              containerStyle={{
                width: "100%",
                margin: "3rem 0",
                background: "#F2F3F5",
              }}
              textareaStyle={{
                height: "10rem",
              }}
              placeholder="Tema"
              value={selectedElement.description}
              onChange={handleInputChange}
            />

            <Grid container>
              <Grid item xs={3}>
                <ModalSubtitle>Justificar resposta?</ModalSubtitle>

                <Switch
                  color="primary"
                  checked={
                    selectedElement.justify_answer === "1" ? true : false
                  }
                  onChange={() => {
                    setSelectedElement((prevState) => ({
                      ...prevState,
                      justify_answer:
                        selectedElement.justify_answer === "1" ? "0" : "1",
                    }));
                  }}
                />
              </Grid>
              <Grid item xs={3}>
                <ModalSubtitle>Obrigatória?</ModalSubtitle>
                <Switch
                  color="primary"
                  checked={
                    selectedElement.justiry_required === "1" ? true : false
                  }
                  onChange={() => {
                    setSelectedElement((prevState) => ({
                      ...prevState,
                      justiry_required:
                        selectedElement.justiry_required === "1" ? "0" : "1",
                    }));
                  }}
                />
              </Grid>
              <Grid item xs={4}>
                <ModalSubtitle>Caracteres</ModalSubtitle>
                <div style={{ display: "flex" }}>
                  <Input
                    name="min"
                    id="min"
                    containerStyle={{ width: "45rem", marginTop: "2rem" }}
                    placeholder="Mín."
                    value={selectedElement.length_mix}
                    onChange={handleInputChange}
                  />
                  <Input
                    name="max"
                    id="max"
                    containerStyle={{
                      width: "45rem",
                      marginTop: "2rem",
                      marginLeft: "1rem",
                    }}
                    placeholder="Máx"
                    value={selectedElement.length_max}
                    onChange={handleInputChange}
                  />
                </div>
              </Grid>
            </Grid>

            <Button
              width="20rem"
              type="submit"
              containerStyle={{ marginTop: "3rem", marginLeft: "auto" }}
            >
              SALVAR
            </Button>
          </Form>
        </ModalContainer>
      </Modal>

      <Modal
        open={openAddGroupModal}
        setOpen={setOpenAddGroupModal}
        paperStyle={{ padding: "2.5rem 1.3rem 2.5rem 1rem" }}
      >
        <ModalContainer>
          <Form
            onSubmit={handleAddGroupSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
            }}
          >
            <ModalTitle>Adicionar elemento de fit cultural</ModalTitle>

            <Input
              name="question"
              id="question"
              onChange={handleGrouperInputChange}
              value={selectedGrouperElement.question}
              placeholder="Digite um título"
              containerStyle={{
                width: "100%",
                marginTop: "2rem",
                background: "#F2F3F5",
              }}
            />

            <Textarea
              name="description"
              id="description"
              value={selectedGrouperElement.description}
              onChange={handleGrouperInputChange}
              containerStyle={{
                width: "100%",
                margin: "1.5rem 0",
                background: "#F2F3F5",
              }}
              textareaStyle={{
                height: "10rem",
              }}
              placeholder="Digite uma descrição"
            />

            <div>{renderAccordionTree(selectedGrouperElement)}</div>

            <Button
              width="20rem"
              type="button"
              outline
              containerStyle={{ margin: "0 auto" }}
              onClick={handleNewGrouperElementClick}
            >
              NOVO ELEMENTO
            </Button>

            <Button
              width="20rem"
              type="submit"
              containerStyle={{ marginTop: "2rem", marginLeft: "auto" }}
            >
              SALVAR
            </Button>
          </Form>
        </ModalContainer>
      </Modal>

      <Modal
        open={openEditGroupModal}
        setOpen={setOpenEditGroupModal}
        paperStyle={{ padding: "2.5rem 1.3rem 2.5rem 1rem" }}
      >
        <ModalContainer>
          <Form
            onSubmit={handleEditGroupSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
            }}
          >
            <ModalTitle>Editar elemento de fit cultural</ModalTitle>

            <Input
              name="question"
              id="question"
              onChange={handleGrouperInputChange}
              value={selectedGrouperElement.question}
              placeholder="Digite um título"
              containerStyle={{
                width: "100%",
                marginTop: "2rem",
                background: "#F2F3F5",
              }}
            />

            <Textarea
              name="description"
              id="description"
              value={selectedGrouperElement.description}
              onChange={handleGrouperInputChange}
              containerStyle={{
                width: "100%",
                margin: "1.5rem 0",
                background: "#F2F3F5",
              }}
              textareaStyle={{
                height: "10rem",
              }}
              placeholder="Digite uma descrição"
            />

            <div>{renderAccordionTree(selectedGrouperElement)}</div>

            <Button
              width="20rem"
              type="button"
              outline
              containerStyle={{ margin: "0 auto" }}
              onClick={handleNewGrouperElementClick}
            >
              NOVO ELEMENTO
            </Button>

            <Button
              width="20rem"
              type="submit"
              containerStyle={{ marginTop: "2rem", marginLeft: "auto" }}
            >
              SALVAR
            </Button>
          </Form>
        </ModalContainer>
      </Modal>

      <Modal
        open={openExcludeElementModal}
        setOpen={setOpenExcludeElementModal}
      >
        <ModalContainer>
          <ModalTitle>Atenção</ModalTitle>
          <ModalDescription>
            Ao clicar em confirmar você excluirá este elemento do sistema.
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
              onClick={() => setOpenExcludeElementModal(false)}
            >
              CANCELAR
            </Button>
          </div>
        </ModalContainer>
      </Modal>
    </Container>
  );
};

interface GrouperFormComponentProps {
  node: ElementProps;
  hierarchyLevel?: string;
  hierarchyMargin?: number;
  handleGrouperSubElementClick(parent_id: string): void;
  handleCopyGroupElementClick(parent_id: string, element: ElementProps): void;
  handleRemoveGrouper(id: string): void;
  handleGrouperUpdate(
    previousElement: ElementProps,
    newElement: ElementProps
  ): void;
}

const GrouperFormComponent: React.FC<GrouperFormComponentProps> = ({
  node,
  hierarchyLevel,
  hierarchyMargin,
  handleGrouperSubElementClick,
  handleCopyGroupElementClick,
  handleRemoveGrouper,
  handleGrouperUpdate,
}) => {
  const [element, setElement] = useState<ElementProps>(node);
  const [expanded, setExpanded] = useState<string | false>("panel1");

  const { addToast } = useToast();

  const handleGrouperInputChange = useCallback((e) => {
    const { value, id } = e.target;

    if (id === "length_max" || id === "length_mix") {
      setElement((prevState) => ({ ...prevState, [id]: onlyNumbers(value) }));
    } else {
      setElement((prevState) => ({ ...prevState, [id]: value }));
    }
  }, []);

  const handleGrouperSwitchChange = useCallback((e) => {
    const { value, id } = e.target;

    setElement((prevState) => ({
      ...prevState,
      [id]: value === "1" ? "0" : "1",
    }));
  }, []);

  const handleGrouperChildrenChange = useCallback((e) => {
    const { value, id } = e.target;

    setElement((prevState) => ({
      ...prevState,
      children: [{} as ElementProps],
    }));
  }, []);

  const handleExpandedChange = useCallback(
    (panel: string) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    },
    []
  );

  const handleEditGrouperElementSubmit = useCallback(
    async (data: ElementProps) => {
      let formData = {
        typeid: "1",
        category_id: culturalFitId,
        parent_id: node.parent_id,
        description: data.description ?? "",
        question: data.question ?? "",
        justify_answer: data.justify_answer ?? "0",
        justiry_required: data.justiry_required ?? "0",
        length_mix: data.length_mix ?? "",
        length_max: data.length_max ?? "",
        grouper: data.children && data.children.length > 0 ? "1" : "0",
      } as any;

      // Somente numeros = ID do backend
      if (/^\d+$/.test(data.id)) {
        formData = { ...formData, exame_id: data.id };

        const response = await api.post("exame/update", formData);

        if (!response.data.success) {
          addToast({
            type: "error",
            title: "Erro ao Editar",
            description:
              "Ocorreu um erro ao editar o elemento, contate o suporte para mais informações.",
          });

          // uuid (gerado pelo frontend e não foi salvo no backend)
          if (!/^\d+$/.test(formData.parent_id)) {
            alert("Erro: O elemento pai não foi salvo");
          }

          return;
        } else {
          setElement(response.data.payload);
          handleGrouperUpdate(
            {
              ...element,
              grouper: data.children && data.children.length > 0 ? "1" : "0",
            },
            response.data.payload
          );

          addToast({
            type: "success",
            title: "Sucesso",
            description: "Elemento editado com sucesso.",
          });
        }
      } else {
        const response = await api.post("exame", formData);

        if (!response.data.success) {
          addToast({
            type: "error",
            title: "Erro",
            description:
              "Ocorreu um erro ao criar este elemento, contate o suporte para mais informações.",
          });

          // uuid (gerado pelo frontend e não foi salvo no backend)
          if (!/^\d+$/.test(formData.parent_id)) {
            alert("Erro: O elemento pai não foi salvo");
          }

          return;
        } else {
          setElement(response.data.payload);
          handleGrouperUpdate(
            {
              ...element,
              grouper: data.children && data.children.length > 0 ? "1" : "0",
            },
            response.data.payload
          );

          addToast({
            type: "success",
            title: "Sucesso",
            description: "Elemento criado com sucesso.",
          });
        }
      }
    },
    [addToast, handleGrouperUpdate, node.parent_id, element]
  );

  return (
    <Accordion
      style={{
        borderRadius: "10px",
        marginBottom: "2rem",
        marginLeft:
          hierarchyMargin && hierarchyMargin > 0
            ? hierarchyMargin * 1.5 + "rem"
            : "",
      }}
      expanded={expanded === `panel${element.id}`}
      onChange={handleExpandedChange(`panel${element.id}`)}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1bh-content"
        id="panel1bh-header"
      >
        <AccordionTitle>{hierarchyLevel}</AccordionTitle>

        <NodeTitle>{element.description.split(" ", 1).join(" ")}</NodeTitle>

        <ButtonsWrapper>
          <CopyIcon
            onClick={() => {
              handleCopyGroupElementClick(element.parent_id, element);
            }}
          />
          <RemoveIcon onClick={() => handleRemoveGrouper(element.id)} />

          <ArrowDownIcon />
        </ButtonsWrapper>
      </AccordionSummary>
      <AccordionDetails>
        <Form
          onSubmit={() => {}}
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
          }}
        >
          <Textarea
            name={`description`}
            id={`description`}
            containerStyle={{
              width: "100%",
              margin: "3rem 0",
              background: "#F2F3F5",
            }}
            textareaStyle={{
              height: "10rem",
            }}
            placeholder="Digite um tema"
            value={element.description}
            onChange={handleGrouperInputChange}
          />

          <Grid container>
            <Grid item xs={3}>
              <ModalSubtitle>Justificar resposta?</ModalSubtitle>

              <Switch
                color="primary"
                id={`justify_answer`}
                checked={element.justify_answer === "1" ? true : false}
                value={element.justify_answer}
                onChange={handleGrouperSwitchChange}
              />
            </Grid>
            <Grid item xs={3}>
              <ModalSubtitle>Obrigatória?</ModalSubtitle>
              <Switch
                color="primary"
                id={`justiry_required`}
                checked={element.justiry_required === "1" ? true : false}
                value={element.justiry_required}
                onChange={handleGrouperSwitchChange}
              />
            </Grid>
            <Grid item xs={4}>
              <ModalSubtitle>Caracteres</ModalSubtitle>
              <div style={{ display: "flex" }}>
                <Input
                  name={`length_mix`}
                  id={`length_mix`}
                  containerStyle={{
                    width: "45rem",
                    marginTop: "2rem",
                  }}
                  placeholder="Mín."
                  value={element.length_mix}
                  onChange={handleGrouperInputChange}
                />
                <Input
                  name={`length_max`}
                  id={`length_max`}
                  containerStyle={{
                    width: "45rem",
                    marginTop: "2rem",
                    marginLeft: "1rem",
                  }}
                  placeholder="Máx"
                  value={element.length_max}
                  onChange={handleGrouperInputChange}
                />
              </div>
            </Grid>
          </Grid>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginLeft: "auto",
            }}
          >
            <Button
              width="20rem"
              type="button"
              containerStyle={{ marginTop: "3rem" }}
              outline
              onClick={() => handleGrouperSubElementClick(element.id)}
            >
              SUBELEMENTO
            </Button>

            <Button
              width="20rem"
              type="button"
              onClick={() => handleEditGrouperElementSubmit(element)}
              containerStyle={{
                marginTop: "3rem",
                marginLeft: "1rem",
              }}
            >
              SALVAR
            </Button>
          </div>
        </Form>
      </AccordionDetails>
    </Accordion>
  );
};

interface CulturalFitSubComponentProps {
  culturalFitData: any;
}

export const CulturalFitSubComponent: React.FC<CulturalFitSubComponentProps> =
  ({ culturalFitData }) => {
    const [data, setData] = useState(culturalFitData);

    useEffect(() => {
      setData(culturalFitData);
    }, [culturalFitData]);

    return (
      <TablePagination
        rowsPerPageOptions={[5]}
        colSpan={3}
        count={data.dataCount}
        rowsPerPage={data.rowsPerPage}
        page={data.pageIndex}
        onPageChange={data.handleChangePage}
        ActionsComponent={TablePaginationActions}
        labelDisplayedRows={({ from, to, count }) =>
          `Visualizando ${from} - ${to} de ${count} clientes`
        }
      />
    );
  };

export default CulturalFit;
