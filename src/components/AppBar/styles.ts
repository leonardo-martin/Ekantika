import styled, { css } from "styled-components";

import { Toolbar as MUIToolbar, ListItem } from "@material-ui/core";

import { ReactComponent as BellNotify } from "../../assets/icons/bell-notify.svg";
import { makeStyles } from "@material-ui/core/styles";
import { shade } from "polished";

interface DropdownItemProps {
  active?: boolean;
}

interface BorderDivProps {
  open: boolean;
}

export const LogoImg = styled.img`
  width: 12rem;
  max-height: 3.6rem;
`;

export const BellNotifyIcon = styled(BellNotify)`
  margin-right: 2rem;
  width: 2.7rem;
  height: 2.7rem;
`;
export const Toolbar = styled(MUIToolbar)`
  padding-right: 2rem;
  display: flex;
  justify-content: space-between;
`;

export const DropdownItem = styled(ListItem)<DropdownItemProps>`
  background: none;
  display: flex;
  align-items: center;

  padding: 0.8rem 2rem;

  border-radius: 7px;

  span {
    color: #4f6872;
    font-weight: 500;

    font-size: 1.3rem;
    margin-left: 2rem;
  }

  ${({ active }) =>
    active &&
    css`
      background: #f2f3f5;

      span {
        font-weight: 600;
      }
    `}

  & + & {
    margin-top: 0.5rem;
  }

  &:hover {
    background: #f2f3f5 !important;
  }
`;

export const ToolbarWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const BorderDiv = styled.div<BorderDivProps>`
  height: 100vh;

  position: absolute;
  top: 0;
  left: 0;
  background: #fff;
  box-shadow: 0px 0px 7px rgba(110, 84, 255, 0.15);

  ${({ open }) =>
    open
      ? css`
          width: 220px;
          boxshadow: 0px 0px 7px rgba(110, 84, 255, 0.15);
          transition: width 225ms cubic-bezier(0.4, 0, 0.6, 1) 0ms;
        `
      : css`
          width: 56px;
          transition: width 195ms cubic-bezier(0.4, 0, 0.6, 1) 0ms;
        `}
`;

export const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    background: "#6E54FF",
    padding: "0 6rem 0 0",
    boxShadow: "unset",
  },
  appBarSpacer: theme.mixins.toolbar,
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    overflow: "hidden",
    background: "#F6F7FB",
    width: 230,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    border: 0,
  },
  drawerPaperClose: {
    position: "relative",

    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    background: "#F6F7FB",
    width: 66,
    // [theme.breakpoints.up("sm")]: {width: 66}
  },
  borderDiv: {
    height: "100vh",
    width: 56,
    position: "absolute",
    top: "0",
    left: "0",
    background: "#fff",
    boxShadow: "0px 0px 7px rgba(110, 84, 255, 0.15)",

    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  borderDivClose: {
    height: "100vh",
    width: 220,
    position: "absolute",
    top: "0",
    left: "0",
    background: "#fff",
    boxShadow: "0px 0px 7px rgba(110, 84, 255, 0.15)",

    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
}));
