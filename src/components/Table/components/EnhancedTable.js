import React, { useEffect, useState } from "react";

import PropTypes from "prop-types";
import {
  Checkbox,
  Table as MUITable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@material-ui/core";

import TableToolbar from "./TableToolbar";

import { Switch } from "../styles";

import {
  useGlobalFilter,
  usePagination,
  useRowSelect,
  useSortBy,
  useTable,
  useRowState,
} from "react-table";
import { CssBaseline } from "@material-ui/core";

const IndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef();
    const resolvedRef = ref || defaultRef;

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate]);

    return (
      <>
        <Checkbox ref={resolvedRef} {...rest} color="primary" />
      </>
    );
  }
);

const StatusSwitch = React.forwardRef(
  ({ row, column, setCellState, ...rest }, ref) => {
    const [isChecked, setIsChecked] = useState(row.original.value);

    const defaultRef = React.useRef();
    const resolvedRef = defaultRef;

    return (
      <>
        <Switch
          ref={resolvedRef}
          checked={isChecked}
          onChange={() => {
            // console.log(resolvedRef.current.className.includes("checked"));
            // setCellState(
            //   row.id,
            //   column.id,
            //   !resolvedRef.current.className.includes("checked")
            // );
            setCellState(
              row.original.id,
              column.id,
              !resolvedRef.current.className.includes("checked")
            );
            setIsChecked(!resolvedRef.current.className.includes("checked"));
          }}
          {...rest}
          color="primary"
        />
      </>
    );
  }
);

// const inputStyle = {
//   padding: 0,
//   margin: 0,
//   border: 0,
//   background: "transparent",
// };

// Create an editable cell renderer
// const EditableCell = ({
//   value: initialValue,
//   row: { index },
//   column: { id },
//   updateMyData, // This is a custom function that we supplied to our table instance
// }) => {
//   // We need to keep and update the state of the cell normally
//   const [value, setValue] = React.useState(initialValue);

//   const onChange = (e) => {
//     setValue(e.target.value);
//   };

//   // We'll only update the external data when the input is blurred
//   const onBlur = () => {
//     updateMyData(index, id, value);
//   };

//   // If the initialValue is changed externall, sync it up with our state
//   React.useEffect(() => {
//     setValue(initialValue);
//   }, [initialValue]);

//   return (
//     <input
//       style={inputStyle}
//       value={value}
//       onChange={onChange}
//       onBlur={onBlur}
//     />
//   );
// };

// EditableCell.propTypes = {
//   cell: PropTypes.shape({
//     value: PropTypes.any.isRequired,
//   }),
//   row: PropTypes.shape({
//     index: PropTypes.number.isRequired,
//   }),
//   column: PropTypes.shape({
//     id: PropTypes.string.isRequired,
//   }),
//   updateMyData: PropTypes.func.isRequired,
// };

// Set our editable cell renderer as the default Cell renderer
// const defaultColumn = {
//   Cell: EditableCell,
// };

const EnhancedTable = ({
  columns,
  data,
  //   updateMyData,
  statusChangeHandler,
  skipPageReset,
  rowsPerPage,
  newPage,
  setDataCount,
  getPageIndex,
  showToolbar,
  showSelectOptions,
  toolBarButtons,
  toolBarLeftComponents,
}) => {
  const {
    getTableProps,
    headerGroups,
    prepareRow,
    page,
    gotoPage,
    setPageSize,
    preGlobalFilteredRows,
    rows,
    setGlobalFilter,
    state: { selectedRowIds, pageIndex, rowState, globalFilter },
  } = useTable(
    {
      columns,
      data,
      //   defaultColumn,
      //   autoResetPage: !skipPageReset,
      // updateMyData isn't part of the API, but
      // anything we put into these options will
      // automatically be available on the instance.
      // That way we can call this function from our
      // cell renderer!
      //   updateMyData,
    },
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect,
    useRowState,
    (hooks) => {
      if (showSelectOptions) {
        hooks.allColumns.push((columns) => {
          return [
            {
              id: "selection",
              Header: ({ getToggleAllRowsSelectedProps }) => {
                return (
                  <div>
                    <IndeterminateCheckbox
                      {...getToggleAllRowsSelectedProps()}
                    />
                  </div>
                );
              },
              Cell: ({ row }) => (
                <div>
                  <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
                </div>
              ),
              width: "8%",
            },
            ...columns,
          ];
        });
      }

      hooks.allColumns.push((columns) => {
        const newColArray = [...columns];

        for (let i = 0; i < newColArray.length; i++) {
          if (newColArray[i].Header === "Status") {
            newColArray[i] = {
              id: "stats",
              Header: () => {
                return "Status";
              },
              Cell: ({ setCellState, row, column }) => (
                <div>
                  <StatusSwitch
                    row={row}
                    column={column}
                    setCellState={setCellState}
                  />
                </div>
              ),
            };
          }
        }
        return newColArray;
      });
    }
  );

  useEffect(() => {
    gotoPage(0);
    setDataCount(rows.length);
  }, [gotoPage, rows, setDataCount]);

  useEffect(() => {
    //On Status change
    // console.log("rowState");
    // rowState.forEach((state) => console.log(state));
    // console.log(rowState);

    const statusChangeList = [];

    for (const [id, value] of Object.entries(rowState)) {
      // console.log(id);
      // console.log(value["cellState"]["stats"]);

      statusChangeList.push({ id, status: value["cellState"]["stats"] });
    }
    statusChangeHandler(statusChangeList);
  }, [rowState, statusChangeHandler]);

  // useEffect(() => {
  //   //On SelectedRow change
  //   console.log(selectedRowIds);
  // }, [selectedRowIds]);

  useEffect(() => {
    gotoPage(newPage);
  }, [newPage, gotoPage]);

  useEffect(() => {
    getPageIndex(pageIndex);
  }, [pageIndex, getPageIndex]);

  useEffect(() => {
    setPageSize(rowsPerPage);
  }, [rowsPerPage, setPageSize]);

  // Render the UI for your table
  return (
    <>
      <CssBaseline />
      <TableContainer>
        {showToolbar && (
          <TableToolbar
            numSelected={Object.keys(selectedRowIds).length}
            preGlobalFilteredRows={preGlobalFilteredRows}
            setGlobalFilter={setGlobalFilter}
            globalFilter={globalFilter || ""}
            buttons={toolBarButtons}
            toolBarLeftComponents={toolBarLeftComponents}
          />
        )}
        <MUITable {...getTableProps()}>
          <TableHead>
            {headerGroups.map((headerGroup) => (
              <TableRow {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <TableCell
                    width={column.width}
                    {...(column.id === "selection"
                      ? column.getHeaderProps()
                      : column.getHeaderProps(column.getSortByToggleProps()))}
                  >
                    {column.render("Header")}
                    {/* {column.id !== "selection" ? (
                      <TableSortLabel
                        active={column.isSorted}
                        // react-table has a unsorted state which is not treated here
                        direction={column.isSortedDesc ? "desc" : "asc"}
                      />
                    ) : null} */}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody>
            {page.map((row, i) => {
              prepareRow(row);
              return (
                <TableRow {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <TableCell {...cell.getCellProps()}>
                        {cell.render("Cell")}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </MUITable>
      </TableContainer>
    </>
  );
};

EnhancedTable.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  //   updateMyData: PropTypes.func.isRequired,
  setData: PropTypes.func.isRequired,
  // skipPageReset: PropTypes.bool.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  newPage: PropTypes.number.isRequired,
  toolBarButtons: PropTypes.node,
  toolBarLeftComponents: PropTypes.node,
  statusChangeHandler: PropTypes.func,
};

export default EnhancedTable;
