import React, { useState } from "react";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";

import {
  Container,
  UserImg,
  DropdownBtn,
  DropdownContent,
  IconContainer,
  ArrowDownIcon,
  ArrowUpIcon,
  PlaceHolderText,
} from "./styles";

interface DropdownProps {
  userImg?: string;
  width?: string;
  value?: string;
  placeholder: string;
  containerStyle?: object;
  fullRounded?: boolean;
  btnStyle?: object;
}

const Dropdown: React.FC<DropdownProps> = ({
  children,
  width,
  userImg,
  value,
  placeholder,
  containerStyle = {},
  fullRounded,
  btnStyle = {},
}) => {
  const [open, setOpen] = useState(false);

  return (
    <ClickAwayListener onClickAway={() => setOpen(false)}>
      <Container style={containerStyle} onClick={() => setOpen(!open)}>
        <DropdownBtn
          style={btnStyle}
          width={width}
          open={open}
          type="button"
          fullRounded={fullRounded}
        >
          {userImg && <UserImg src={userImg} />}
          {value ? value : <PlaceHolderText>{placeholder}</PlaceHolderText>}
          <IconContainer>
            {open ? <ArrowUpIcon /> : <ArrowDownIcon />}
          </IconContainer>
        </DropdownBtn>

        <DropdownContent width={width} open={open}>
          {children}
        </DropdownContent>
      </Container>
    </ClickAwayListener>
  );
};

export default Dropdown;
