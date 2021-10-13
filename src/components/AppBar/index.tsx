import React, { useState, useEffect } from "react";
import clsx from "clsx";

import {
  Drawer,
  AppBar as MUIAppBar,
  List,
  ListItemText,
} from "@material-ui/core";

import { ReactComponent as MyPageIcon } from "../../assets/icons/my-pag.svg";
import { ReactComponent as UserIcon } from "../../assets/icons/user.svg";
import { ReactComponent as FaqIcon } from "../../assets/icons/faq.svg";
import { ReactComponent as LogoutIcon } from "../../assets/icons/logout.svg";

import ListItems from "./ListItems";

import logoImg from "../../assets/ekantika_logo_white.png";
import userImg from "../../assets/icons/user-placeholder.svg";
import AppBarDropdown from "./AppBarDropdown";

import { baseURL } from "../../services/api";

import {
  LogoImg,
  DropdownItem,
  BellNotifyIcon,
  useStyles,
  Toolbar,
  ToolbarWrapper,
  BorderDiv,
} from "./styles";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const AppBar: React.FC = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState("");
  const [preview, setPreview] = useState<string | null>("");
  const classes = useStyles();
  const history = useHistory();
  const { signOut, user } = useAuth();
  const { pathname } = useLocation();

  useEffect(() => {
    console.log(currentPath);
  }, [currentPath]);

  useEffect(() => {
    console.log(user);
    if (user && user.photo) {
      setPreview(baseURL + user.photo);
    }
  }, [user]);

  useEffect(() => {
    const [, , routeName, pathId] = pathname.split("/");
    if (routeName === "user") {
      setCurrentPath(routeName + "/" + pathId);
    } else {
      setCurrentPath(routeName);
    }
  }, [pathname]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <>
      <MUIAppBar className={clsx(classes.appBar)}>
        <Toolbar>
          <Link to="/ekk/dashboard">
            <LogoImg src={logoImg} />
          </Link>
          <ToolbarWrapper>
            <BellNotifyIcon />
            <AppBarDropdown
              width="22rem"
              dropdownText={user ? user.name : "{{user.name}}"}
              userImg={preview ? preview : userImg}
            >
              <DropdownItem
                button
                style={{
                  background:
                    currentPath === "dashboard" ? "#f2f3f5" : "transparent",
                }}
                onClick={() => {
                  history.push("/");
                }}
              >
                <MyPageIcon />
                <ListItemText primary="Minha página" style={{ flex: "none" }} />
              </DropdownItem>
              <DropdownItem
                onClick={() => {
                  history.push(`/ekk/user/${user.id}`);
                }}
                button
                style={{
                  background: user
                    ? currentPath === `user/${user.id}`
                      ? "#f2f3f5"
                      : "transparent"
                    : "/",
                }}
              >
                <UserIcon />
                <ListItemText primary="Meus dados" style={{ flex: "none" }} />
              </DropdownItem>
              {/* <DropdownItem
                button
                style={{
                  background: currentPath === "faq" ? "#f2f3f5" : "transparent",
                }}
              >
                <FaqIcon />
                <ListItemText
                  onClick={() => {
                    history.push(`/ekk/faq`);
                  }}
                  primary="FAQ"
                  style={{ flex: "none" }}
                />
              </DropdownItem> */}
              <DropdownItem
                button
                onClick={() => {
                  signOut();
                  history.push("/");
                }}
              >
                <LogoutIcon />
                <ListItemText primary="Sair" style={{ flex: "none" }} />
              </DropdownItem>
            </AppBarDropdown>
          </ToolbarWrapper>
        </Toolbar>
      </MUIAppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.appBarSpacer} />
        <BorderDiv open={open} />
        <List onMouseEnter={handleDrawerOpen} onMouseLeave={handleDrawerClose}>
          <ListItems />
        </List>
      </Drawer>
    </>
  );
};

export default AppBar;
