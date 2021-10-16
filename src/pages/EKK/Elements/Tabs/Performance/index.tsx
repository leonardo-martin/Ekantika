import { useState, useMemo, useCallback, useEffect } from 'react';

import { Grid } from '@material-ui/core';

import Button from '../../../../../components/Button';
import Modal from '../../../../../components/Modal';
import Table from '../../../../../components/Table';
import Textarea from '../../../../../components/Textarea';
import Input from '../../../../../components/Input';

import TablePaginationActions from '../../../../../components/Table/components/TablePaginationActions';

import {
  Container,
  IconsWrapper,
  EditIcon,
  CopyIcon,
  RemoveIcon,
  ModalContainer,
  ModalTitle,
  ModalSubtitle,
  Switch,
  TablePagination,
  ModalDescription,
} from './styles';
import LoadingScreen from '../../../../../components/LoadingScreen';
// import { useHistory } from "react-router";
import { useToast } from '../../../../../contexts/ToastContext';
import api from '../../../../../services/api';
import onlyNumbers from '../../../../../utils/onlyNumbers';
import { Form } from '@unform/web';
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
}
interface DataProps {
  id: string;
  theme: string;
  edit_remove: React.ReactNode;
}

const performanceId = 2;

interface PerformanceProps {
  setPerformanceData(data: any): void;
}

const Performance: React.FC<PerformanceProps> = ({ setPerformanceData }) => {
  const [elements, setElements] = useState<ElementProps[]>([]);
  const [selectedElement, setSelectedElement] = useState<ElementProps>(
    {} as ElementProps
  );
  const [selectedElementToDelete, setSelectedElementToDelete] =
    useState<ElementProps>({} as ElementProps);

  const [openExcludeElementModal, setOpenExcludeElementModal] = useState(false);
  const [openAddElementModal, setOpenAddElementModal] = useState(false);
  const [openEditElementModal, setOpenEditElementModal] = useState(false);

  const [data, setData] = useState<DataProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [reloadTab, setReloadTab] = useState(true);
  const [reloadData, setReloadData] = useState(false);

  const { addToast } = useToast();
  // const history = useHistory();

  const columns = useMemo(
    () => [
      {
        Header: 'ID',
        accessor: 'id',
        width: '10%',
      },
      {
        Header: 'TEMA',
        accessor: 'theme',
      },
      {
        Header: ' ',
        accessor: 'edit_remove',
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
    const response = await api.post('exame/list', {
      category_id: performanceId,
    });

    //console.log(response.data);

    if (!response.data.payload) {
      setLoading(false);
    } else {
      setElements(response.data.payload);

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
    setSelectedElement(element);
    setOpenAddElementModal(true);
  }, []);

  const handleEditElementClick = useCallback(async (element: ElementProps) => {
    setSelectedElement(element);
    setOpenEditElementModal(true);
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
      const displayPerformanceList: DataProps[] = elements.map((element) => ({
        id: element.id,
        theme: element.description,
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

      setData(displayPerformanceList);

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
    const response = await api.post('exame/delete', {
      exame_id: selectedElementToDelete.id,
    });

    if (!response.data.success) {
      addToast({
        type: 'error',
        title: 'Erro',
        description:
          'Ocorreu um erro ao excluir este elemento, contate o suporte para mais informações.',
      });

      return;
    } else {
      addToast({
        type: 'success',
        title: 'Sucesso',
        description: 'Elemento foi deletado com sucesso.',
      });

      let newRoleState = elements.filter(
        (item) => item.id !== selectedElementToDelete.id
      );

      setElements(newRoleState);

      setOpenExcludeElementModal(false);

      setReloadData(true);
      setTimeout(() => {
        setReloadData(false);
      }, 100);
    }
  }, [addToast, setElements, elements, selectedElementToDelete.id]);

  const handleEditElementSubmit = useCallback(
    async (data: newElementProps) => {
      const formData = {
        category_id: performanceId,
        exame_id: selectedElement.id,
        typeid: selectedElement.type_id,
        justify_answer: selectedElement.justify_answer,
        justiry_required: selectedElement.justiry_required,
        description: data.theme,
        length_mix: data.min,
        length_max: data.max,
        parent_id: '',
      };

      let err = false;
      let description = '';

      if (!formData.description || formData.description.length === 0) {
        description = 'O tema não pode ser nulo.';
        err = true;
      }

      if (
        !formData.length_max &&
        formData.length_mix &&
        formData.length_mix > formData.length_max
      ) {
        description =
          'Número mínimo de caracteres não pode ser maior do que o número máximo.';
        err = true;
      }

      if (!formData.length_mix || formData.length_mix.length === 0) {
        description = 'Número mínimo de caracteres não pode ser nulo.';
        err = true;
      }
      if (!formData.length_max || formData.length_max.length === 0) {
        description = 'Número máximo de caracteres não pode ser nulo.';
        err = true;
      }

      console.log(formData);

      if (err) {
        addToast({
          type: 'error',
          title: 'Erro',
          description,
        });
        return;
      }

      const response = await api.post('exame/update', formData);
      console.log(response.data);

      if (!response.data.success) {
        addToast({
          type: 'error',
          title: 'Erro ao Editar',
          description:
            'Ocorreu um erro ao editar o elemento, contate o suporte para mais informações.',
        });
        return;
      } else {
        addToast({
          type: 'success',
          title: 'Sucesso',
          description: 'Elemento editado com sucesso.',
        });

        // setElements((prevState) =>
        //   prevState.map((item) =>
        //     item.id === formData.exame_id ? response.data.payload : item
        //   )
        // );

        console.log(response.data.payload);

        setReloadData(true);
        setTimeout(() => {
          setReloadData(false);
        }, 100);

        setOpenEditElementModal(false);
      }
    },
    [
      addToast,
      selectedElement.id,
      selectedElement.justify_answer,
      selectedElement.justiry_required,
      selectedElement.type_id,
    ]
  );

  const handleAddElementSubmit = useCallback(
    async (data: newElementProps) => {
      const formData = {
        description: data.theme,
        length_mix: data.min,
        length_max: data.max,
        justify_answer: selectedElement.justify_answer,
        justiry_required: selectedElement.justiry_required,
        category_id: performanceId,
        typeid: selectedElement.type_id,
        parent_id: '',
      };

      console.log(formData);

      let err = false;
      let description = '';

      if (!formData.description || formData.description.length === 0) {
        description = 'O tema não pode ser nulo.';
        err = true;
      }

      if (
        !formData.length_max &&
        formData.length_mix &&
        formData.length_mix > formData.length_max
      ) {
        description =
          'Número mínimo de caracteres não pode ser maior do que o número máximo.';
        err = true;
      }

      if (!formData.length_mix || formData.length_mix.length === 0) {
        description = 'Número mínimo de caracteres não pode ser nulo.';
        err = true;
      }
      if (!formData.length_max || formData.length_max.length === 0) {
        description = 'Número máximo de caracteres não pode ser nulo.';
        err = true;
      }

      if (err) {
        addToast({
          type: 'error',
          title: 'Erro',
          description,
        });
        return;
      }

      const response = await api.post('exame', formData);
      console.log(response.data);

      if (!response.data.success) {
        addToast({
          type: 'error',
          title: 'Erro ao Salvar',
          description:
            'Ocorreu um erro ao cadastrar um novo elemento, contate o suporte para mais informações.',
        });
        return;
      } else {
        addToast({
          type: 'success',
          title: 'Sucesso',
          description: 'Um novo elemento foi cadastrado no sistema.',
        });

        //setRoles((prevState) => [...prevState, { ...response.data.payload }]);

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

  const getPaginationProps = useCallback(
    (data) => {
      setPerformanceData(data);
    },
    [setPerformanceData]
  );

  const handleInputChange = useCallback(
    (e) => {
      const { value, id } = e.target;

      setSelectedElement((prevState) => {
        if (id === 'min') {
          return {
            ...prevState,
            length_mix: onlyNumbers(value),
          };
        }

        if (id === 'max') {
          return {
            ...prevState,
            length_max: onlyNumbers(value),
          };
        }

        if (id === 'theme') {
          return {
            ...prevState,
            description: value,
          };
        }

        return prevState;
      });
    },
    [setSelectedElement]
  );

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
          <Button
            type="button"
            width="20rem"
            style={{ marginLeft: '1rem' }}
            onClick={() => {
              setOpenAddElementModal(true);
              setSelectedElement({} as ElementProps);
            }}
          >
            NOVO ELEMENTO
          </Button>
        }
      />

      <Modal open={openAddElementModal} setOpen={setOpenAddElementModal}>
        <ModalContainer>
          <Form
            onSubmit={handleAddElementSubmit}
            style={{ display: 'flex', flexDirection: 'column' }}
          >
            <ModalTitle>Adicionar elemento de desempenho</ModalTitle>

            <Textarea
              name="theme"
              id="theme"
              value={selectedElement.description}
              onChange={handleInputChange}
              containerStyle={{
                width: '100%',
                margin: '3rem 0',
                background: '#F2F3F5',
              }}
              textareaStyle={{
                height: '10rem',
              }}
              placeholder="Tema"
            />

            <Grid container>
              <Grid item xs={3}>
                <ModalSubtitle>Justificar resposta?</ModalSubtitle>

                <Switch
                  color="primary"
                  checked={
                    selectedElement.justify_answer === '1' ? true : false
                  }
                  onChange={() => {
                    setSelectedElement((prevState) => ({
                      ...prevState,
                      justify_answer:
                        selectedElement.justify_answer === '1' ? '0' : '1',
                    }));
                  }}
                />
              </Grid>
              <Grid item xs={3}>
                <ModalSubtitle>Obrigatória?</ModalSubtitle>
                <Switch
                  color="primary"
                  checked={
                    selectedElement.justiry_required === '1' ? true : false
                  }
                  onChange={() => {
                    setSelectedElement((prevState) => ({
                      ...prevState,
                      justiry_required:
                        selectedElement.justiry_required === '1' ? '0' : '1',
                    }));
                  }}
                />
              </Grid>
              <Grid item xs={4}>
                <ModalSubtitle>Caracteres</ModalSubtitle>
                <Form onSubmit={() => {}} style={{ display: 'flex' }}>
                  <Input
                    name="min"
                    id="min"
                    containerStyle={{ width: '45rem', marginTop: '2rem' }}
                    placeholder="Mín."
                    value={selectedElement.length_mix}
                    onChange={handleInputChange}
                  />
                  <Input
                    name="max"
                    id="max"
                    containerStyle={{
                      width: '45rem',
                      marginTop: '2rem',
                      marginLeft: '1rem',
                    }}
                    placeholder="Máx"
                    value={selectedElement.length_max}
                    onChange={handleInputChange}
                  />
                </Form>
              </Grid>
            </Grid>

            <Button
              width="20rem"
              type="submit"
              containerStyle={{ marginTop: '3rem', marginLeft: 'auto' }}
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
            style={{ display: 'flex', flexDirection: 'column' }}
          >
            <ModalTitle>Editar elemento de desempenho</ModalTitle>

            <Textarea
              name="theme"
              id="theme"
              containerStyle={{
                width: '100%',
                margin: '3rem 0',
                background: '#F2F3F5',
              }}
              textareaStyle={{
                height: '10rem',
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
                    selectedElement.justify_answer === '1' ? true : false
                  }
                  onChange={() => {
                    setSelectedElement((prevState) => ({
                      ...prevState,
                      justify_answer:
                        selectedElement.justify_answer === '1' ? '0' : '1',
                    }));
                  }}
                />
              </Grid>
              <Grid item xs={3}>
                <ModalSubtitle>Obrigatória?</ModalSubtitle>
                <Switch
                  color="primary"
                  checked={
                    selectedElement.justiry_required === '1' ? true : false
                  }
                  onChange={() => {
                    setSelectedElement((prevState) => ({
                      ...prevState,
                      justiry_required:
                        selectedElement.justiry_required === '1' ? '0' : '1',
                    }));
                  }}
                />
              </Grid>
              <Grid item xs={4}>
                <ModalSubtitle>Caracteres</ModalSubtitle>
                <div style={{ display: 'flex' }}>
                  <Input
                    name="min"
                    id="min"
                    containerStyle={{ width: '45rem', marginTop: '2rem' }}
                    placeholder="Mín."
                    value={selectedElement.length_mix}
                    onChange={handleInputChange}
                  />
                  <Input
                    name="max"
                    id="max"
                    containerStyle={{
                      width: '45rem',
                      marginTop: '2rem',
                      marginLeft: '1rem',
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
              containerStyle={{ marginTop: '3rem', marginLeft: 'auto' }}
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
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
            }}
          >
            <Button
              type="button"
              btnColor="#FF2929"
              outline
              onClick={handleExcludeRole}
              containerStyle={{ marginRight: '1.5rem', minWidth: '23rem' }}
            >
              CONFIRMAR EXCLUSÃO
            </Button>
            <Button
              type="button"
              containerStyle={{ minWidth: '23rem' }}
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

interface PerformanceSubComponentProps {
  performanceData: any;
}

export const PerformanceSubComponent: React.FC<PerformanceSubComponentProps> =
  ({ performanceData }) => {
    const [data, setData] = useState(performanceData);

    useEffect(() => {
      setData(performanceData);
    }, [performanceData]);

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

export default Performance;
