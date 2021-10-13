import { useEffect, useState, useCallback } from "react";
import Paper from "../Paper";
import PropTypes from "prop-types";

import EnhancedTable from "./components/EnhancedTable";
import TablePaginationActions from "./components/TablePaginationActions";

import { Container, TablePagination } from "./styles";

const App = ({
  pagination = true,
  showAllRows,
  tableData = [],
  columns = [],
  borderBottom = false,
  showToolbar = true,
  toolBarButtons = <div></div>,
  toolBarLeftComponents,
  containerStyle = {},
  CustomPagination = <div></div>,
  getPaginationProps = (data) => {},
  showSelectOptions = false,
  statusChangeHandler = (data) => {},
}) => {
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [newPage, setNewPage] = useState(0);

  // const [pageSize, setPageSize] = useState(5);
  const [pageIndex, setPageIndex] = useState(0);

  const [dataCount, setDataCount] = useState(tableData.length);

  const [data, setData] = useState(tableData);
  const [skipPageReset, setSkipPageReset] = useState(false);

  const handleChangePage = useCallback((event, newPageIndex) => {
    setNewPage(newPageIndex);
  }, []);

  const getPageIndex = (pageI) => {
    setPageIndex(pageI);
  };

  // We need to keep the table from resetting the pageIndex when we
  // Update data. So we can keep track of that flag with a ref.

  // When our cell renderer calls updateMyData, we'll use
  // the rowIndex, columnId and new value to update the
  // original data
  const updateMyData = (rowIndex, columnId, value) => {
    // We also turn on the flag to not reset the page
    setSkipPageReset(false);
    setData((old) =>
      old.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...old[rowIndex],
            [columnId]: value,
          };
        }
        return row;
      })
    );
  };

  useEffect(() => {
    getPaginationProps({
      dataCount,
      rowsPerPage,
      pageIndex,
      handleChangePage,
    });
  }, [dataCount, rowsPerPage, pageIndex, handleChangePage, getPaginationProps]);

  useEffect(() => {
    // console.log(showAllRows);
    if (showAllRows) {
      setRowsPerPage(tableData.length);
    } else {
      setRowsPerPage(5);
    }
  }, [showAllRows, tableData.length]);

  // useEffect(() => {
  //   console.log(tableData);
  // }, [tableData]);

  return (
    <Container borderBottom={borderBottom}>
      {pagination ? (
        <>
          <Paper containerStyle={containerStyle}>
            <EnhancedTable
              columns={columns}
              data={data}
              setData={setData}
              statusChangeHandler={statusChangeHandler}
              // updateMyData={updateMyData}
              // skipPageReset={skipPageReset}
              TablePaginationActions={TablePagination}
              rowsPerPage={rowsPerPage}
              newPage={newPage}
              getPageIndex={getPageIndex}
              setDataCount={setDataCount}
              showToolbar={showToolbar}
              showSelectOptions={showSelectOptions}
              toolBarButtons={toolBarButtons}
              toolBarLeftComponents={toolBarLeftComponents}
            />
          </Paper>

          <TablePagination
            rowsPerPageOptions={[5]}
            colSpan={3}
            count={dataCount}
            rowsPerPage={rowsPerPage}
            page={pageIndex}
            onPageChange={handleChangePage}
            ActionsComponent={TablePaginationActions}
            labelDisplayedRows={({ from, to, count }) =>
              `Visualizando ${from} - ${to} de ${count} clientes`
            }
          />
        </>
      ) : (
        <EnhancedTable
          columns={columns}
          data={data}
          setData={setData}
          statusChangeHandler={statusChangeHandler}
          updateMyData={updateMyData}
          skipPageReset={skipPageReset}
          TablePaginationActions={TablePagination}
          rowsPerPage={rowsPerPage}
          newPage={newPage}
          getPageIndex={getPageIndex}
          setDataCount={setDataCount}
          showToolbar={showToolbar}
          showSelectOptions={showSelectOptions}
          toolBarButtons={toolBarButtons}
          toolBarLeftComponents={toolBarLeftComponents}
        />
      )}
    </Container>
  );
};

App.propTypes = {
  pagination: PropTypes.bool,
  showAllRows: PropTypes.bool,
  tableData: PropTypes.array,
  columns: PropTypes.array,
  borderBottom: PropTypes.bool,
  showToolbar: PropTypes.bool,
  toolBarButtons: PropTypes.node,
  CustomPagination: PropTypes.node,
  toolBarLeftComponents: PropTypes.node,
  showSelectOptions: PropTypes.bool,
  containerStyle: PropTypes.object,
  statusChangeHandler: PropTypes.func,
  getPaginationProps: PropTypes.func,
};

export default App;
