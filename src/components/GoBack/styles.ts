import { shade } from "polished";
import styled from "styled-components";

export const GoBackDiv = styled.div`
  display: flex;
  align-items: center;
`;

export const GoBackButtonContainer = styled.button`
  background: #fff;
  border: none;
  border-radius: 50%;
  width: 2.8rem;
  height: 2.8rem;
  padding: 0.6rem;
  margin-bottom: 2rem;

  transition: background 0.3s;

  cursor: pointer;

  margin-right: 0.8rem;

  &:hover {
    background: ${shade(0.1, "#fff")};
  }
`;
