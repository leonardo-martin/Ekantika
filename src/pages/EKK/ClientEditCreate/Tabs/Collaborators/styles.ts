import styled from "styled-components";
import { shade } from "polished";
import { Link } from "react-router-dom";

import { ReactComponent as EditIconSVG } from "../../../../../assets/icons/edit.svg";

export const Container = styled.div`
  width: 100%;
  margin-left: auto;
  margin-right: auto;
`;

export const EditIcon = styled(EditIconSVG)`
  background: #f2f3f5;
  border-radius: 50%;
  width: 3rem;
  height: 3rem;
  padding: 0.4rem;

  transition: background 0.3s;

  cursor: pointer;

  margin-right: 3.3rem;

  &:hover {
    background: ${shade(0.1, "#f2f3f5")};
  }
`;

export const ModalContainer = styled.div`
  padding: 0.7rem 1rem;
`;

export const ModalTitle = styled.h2`
  font-weight: bold;
  font-size: 1.8rem;
  text-transform: uppercase;

  color: #6e54ff;
`;

export const DropdownItem = styled.button`
  font-size: 1.3rem;
  padding: 1.6rem 0;
  width: 100%;
  background: none;
  border: none;
  transition: background 0.3s;
  border-radius: 5px;

  color: #4f6872;

  &:hover {
    background: rgba(0, 0, 0, 0.04);
  }
`;

export const EditCollaboratorLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;
