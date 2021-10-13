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
} from "./styles";

interface AppBarDropdownProps {
  userImg?: string;
  width?: string;
  dropdownText: string;
}

const AppBarDropdown: React.FC<AppBarDropdownProps> = ({
  children,
  width,
  userImg,
  dropdownText,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <ClickAwayListener onClickAway={() => setOpen(false)}>
      <Container onClick={() => setOpen(!open)}>
        <DropdownBtn width={width} open={open}>
          {userImg && <UserImg src={userImg} />}
          {dropdownText}
          <IconContainer>
            {open ? <ArrowUpIcon /> : <ArrowDownIcon />}
          </IconContainer>
        </DropdownBtn>
        <DropdownContent open={open}>{children}</DropdownContent>
      </Container>
    </ClickAwayListener>
  );
};

export default AppBarDropdown;
