import React, { useEffect, useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

import { Pagination } from "../styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

const TablePaginationActions = (props) => {
  const classes = useStyles();
  const { page, count, rowsPerPage, onPageChange } = props;
  const [currentPage, setCurrentPage] = useState(page + 1);

  useEffect(() => {
    setCurrentPage(page + 1);
  }, [page, setCurrentPage]);

  const [numberOfPages, setNumberOfPages] = useState(
    Math.ceil(count / rowsPerPage)
  );

  useEffect(() => {
    setNumberOfPages(Math.ceil(count / rowsPerPage));
  }, [count, setNumberOfPages, rowsPerPage]);

  const handlePageChange = (event, page) => {
    onPageChange(event, page - 1);
    setCurrentPage(page);
  };

  return (
    <div className={classes.root}>
      <Pagination
        count={numberOfPages}
        onChange={handlePageChange}
        color="primary"
        size="large"
        page={currentPage}
      />
    </div>
  );
};

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

export default TablePaginationActions;
