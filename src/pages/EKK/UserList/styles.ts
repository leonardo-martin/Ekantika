import { shade } from "polished";
import styled from "styled-components";
import Button from "../../../components/Button";
import { Switch as MUISwitch } from "@material-ui/core";

import { ReactComponent as EditIconSVG } from "../../../assets/icons/edit.svg";
import { ReactComponent as RemoveIconSVG } from "../../../assets/icons/trash.svg";
import { Link } from "react-router-dom";

export const Container = styled.div`
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  padding: 3.2rem 2.4rem;

  max-width: 1920px !important;
`;

export const PaperHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.8rem;

  > div {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

export const NewClient = styled(Button)`
  width: 12rem;
  margin-left: 1rem;
`;

export const Switch = styled(MUISwitch)`
  .MuiSwitch-colorPrimary.Mui-checked {
    color: #6e54ff;
  }
  span.MuiSwitch-track {
    background-color: #6e54ff !important;
  }
`;

export const IconsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

export const EditIcon = styled(EditIconSVG)`
  background: #f2f3f5;
  border-radius: 50%;
  width: 3rem;
  height: 3rem;
  padding: 0.4rem;
  margin-right: 0.8rem;

  transition: background 0.3s;

  cursor: pointer;

  margin-right: 0.8rem;

  &:hover {
    background: ${shade(0.1, "#f2f3f5")};
  }
`;

export const RemoveIcon = styled(RemoveIconSVG)`
  background: #f2f3f5;
  border-radius: 50%;
  width: 3rem;
  height: 3rem;
  padding: 0.4rem;

  transition: background 0.3s;

  cursor: pointer;

  margin-right: 0.8rem;

  &:hover {
    background: ${shade(0.1, "#f2f3f5")};
  }
`;

export const NewClientLink = styled(Link)`
  margin-left: 1rem;
  width: 15rem;

  button {
    width: 15rem;
  }
`;

export const ModalContainer = styled.div``;

export const ModalTitle = styled.h2`
  font-weight: bold;
  font-size: 1.8rem;
  text-transform: uppercase;

  color: #6e54ff;

  margin-bottom: 2rem;
`;

export const ModalDescription = styled.p`
  margin: 1rem 0 2.5rem;

  font-size: 1.5rem;
  color: #4f6872;
`;
