import SearchIcon from "@material-ui/icons/Search";
import { Form } from "@unform/web";
import PropTypes from "prop-types";
import Input from "../Input";

export type SearchInputProps = {
  value: string;
  setValue: (value?: string) => void;
  containerStyle?: Record<string, any>;
};

const SearchInput = (props: SearchInputProps) => {
  return (
    <>
      <Form onSubmit={() => {}}>
        <Input
          icon={<SearchIcon />}
          value={props.value || ""}
          onChange={(e) => {
            props.setValue(e.target.value || undefined); // Set undefined to remove the filter entirely
          }}
          name="global"
          placeholder={`Buscar`}
          type="text"
          containerStyle={{
            background: "#F2F3F5",
            border: "none",
            borderRadius: "200px",
            width: "25rem",
            flex: 1,
            ...props.containerStyle,
          }}
          inputStyle={{}}
        />
      </Form>
    </>
  );
};

export default SearchInput;
