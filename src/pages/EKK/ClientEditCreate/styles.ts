import { shade } from "polished";
import styled from "styled-components";
import { ReactComponent as GoBackIconSVG } from "../../../assets/icons/go-back.svg";

export const Container = styled.div`
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  padding: 3.2rem 2.4rem;

  max-width: 1920px !important;
`;

export const GobackDiv = styled.div`
  display: flex;
  align-items: center;
`;

export const GoBackIcon = styled(GoBackIconSVG)`
  background: #fff;
  border-radius: 50%;
  width: 2.8rem;
  height: 2.8rem;
  padding: 0.6rem;

  transition: background 0.3s;

  cursor: pointer;

  margin-right: 0.8rem;

  &:hover {
    background: ${shade(0.1, "#fff")};
  }
`;

export const ExportCSV = styled.button`
  background: rgba(255, 222, 51, 0.3);
  border-radius: 20px;
  padding: 0.4rem 0.4rem 0.4rem 0.8rem;

  border: none;
  transition: background 0.3s;
  cursor: pointer;

  font-weight: 500;
  font-size: 1.2rem;
  color: #8b7605;

  display: flex;
  align-items: center;

  svg {
    margin-left: 1.2rem;
    background: rgb(255, 222, 51);
    border-radius: 50%;
    width: 3rem;
    height: 3rem;

    transition: background 0.3s;
  }

  &:hover {
    background: ${shade(0.1, "rgba(255, 222, 51, 1)")};
  }
`;
