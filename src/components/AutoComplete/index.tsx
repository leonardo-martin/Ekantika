import React, { useState } from "react";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";

import { Container, AutoCompleteContent, DropdownItem } from "./styles";
import Input from "../Input";

interface ItemProps {
  id?: string;
  value: string;
}

interface AutoCompleteProps {
  items: Array<ItemProps>;
  placeholder: string;
  id: string;
  name: string;
  setSelectedItem(item: ItemProps): void;
  handleChange(e: React.ChangeEvent<HTMLInputElement>): void;
  selectedItem: ItemProps;
  width?: string;
  containerStyle?: object;
  btnStyle?: object;
}

const AutoComplete: React.FC<AutoCompleteProps> = ({
  width,
  placeholder,
  items,
  containerStyle = {},
  btnStyle = {},
  setSelectedItem,
  handleChange,
  selectedItem,
  name,
  id,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <ClickAwayListener onClickAway={() => setOpen(false)}>
      <Container style={containerStyle} onClick={() => setOpen(!open)}>
        <Input
          name={name}
          onClick={() => setOpen(true)}
          id={id}
          placeholder={placeholder}
          value={selectedItem.value}
          onChange={(e) => {
            handleChange(e);
          }}
        />

        <AutoCompleteContent width={width} open={open}>
          {items.map((item) => (
            <DropdownItem
              key={item.id}
              type="button"
              onClick={() => {
                setSelectedItem(item);
              }}
            >
              {item.value}
            </DropdownItem>
          ))}
        </AutoCompleteContent>
      </Container>
    </ClickAwayListener>
  );
};

export default AutoComplete;
