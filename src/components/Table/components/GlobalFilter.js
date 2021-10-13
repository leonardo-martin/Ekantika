import SearchIcon from "@material-ui/icons/Search";
import { Form } from "@unform/web";
import PropTypes from "prop-types";
import Input from "../../Input";

const GlobalFilter = ({ globalFilter, setGlobalFilter, containerStyle = {} }) => {
  return (
    <>
      <Form>
        <Input
          icon={<SearchIcon />}
          value={globalFilter || ""}
          onChange={(e) => {
            setGlobalFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
          }}
          name="global"
          placeholder={`Buscar`}
          type="text"
          inputProps={{ "aria-label": "search" }}
          containerStyle={{
            background: "#F2F3F5",
            border: "none",
            borderRadius: "200px",
            width: "25rem",
            flex: 1,
            ...containerStyle,
          }}
          inputStyle={{}}
        />
      </Form>
    </>
  );
};

GlobalFilter.propTypes = {
  globalFilter: PropTypes.string.isRequired,
  setGlobalFilter: PropTypes.func.isRequired,
};

export default GlobalFilter;
