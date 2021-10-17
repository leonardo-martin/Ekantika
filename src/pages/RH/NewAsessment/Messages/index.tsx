import { useMemo, useState, useCallback } from 'react';
import PageTitle from "../../../../components/PageTitle";
import Paper from "../../../../components/Paper";
import Button from '../../../../components/Button';
import Table from '../../../../components/Table';
import Dropdown from '../../../../components/Dropdown';
import DropdownItem from '../../../../components/DropdownItem';
import Navigation from "../Navigation";
import TablePaginationActions from '../../../../components/Table/components/TablePaginationActions';


import {
  Container,
  TablePagination,
  Text
} from "./styles";

interface DataProps {
  nome: string;
  status: string;
  tipo: string;
  periodo: string;
  edit_remove: React.ReactNode;
}

const Messages = () => {
  const [data, setData] = useState<DataProps[]>([]);
  const columns = useMemo(
    () => [
      {
        Header: 'NOME',
        accessor: 'nome',
        width: '50%',
      },
      {
        Header: 'STATUS',
        accessor: 'status',
      },
      {
        Header: 'TIPO',
        accessor: 'tipo',
      },
      {
        Header: 'PERÍODO',
        accessor: 'periodo',
      },
      {
        Header: ' ',
        accessor: 'edit_remove',
      },
    ],
    []
  );
  const getPaginationProps = useCallback(() => {}, []);
  return (
    <div>
      <PageTitle title="Mensagens" />

      <Navigation />
      <Paper containerStyle={{ flexDirection: 'column' }}>
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
                <div style={{
                  position: 'absolute',
                  left: '0',
                  marginLeft: '1rem',
                  display: 'flex',
                  alignItems: 'center'
                }} >
                  <Dropdown placeholder="Ações" fullRounded={true}>
                    <DropdownItem></DropdownItem>
                  </Dropdown>
                  <Button
                    type="button"
                    width="14rem"
                    style={{ marginLeft: '1rem' }}
                    onClick={() => {}}
                  >
                    APLICAR
                  </Button>
                  <Text>0 Itens selecionados</Text>
                </div>
                <Button
                  type="button"
                  width="14rem"
                  style={{ marginLeft: '1rem' }}
                  onClick={() => {}}
                >
                  NOVA MENSAGEM
                </Button>
              </>
            }
          />
        </Container>
      </Paper>
      <TablePagination
        rowsPerPageOptions={[5]}
        colSpan={3}
        count={25}
        rowsPerPage={12}
        page={0}
        onPageChange={() => {}}
        ActionsComponent={TablePaginationActions}
        
      />
    </div>
  );
};

export default Messages;

