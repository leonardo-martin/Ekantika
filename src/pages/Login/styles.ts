import styled from "styled-components";
import { shade } from "polished";

import { Form as UForm } from "@unform/web";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background: #7aeafa;
`;

export const Title = styled.h1`
  margin-top: 6rem;
  margin-bottom: 3.5rem;
  font-size: 2.5rem;
  color: #6e54ff;
  text-align: center;
`;

export const InputText = styled.input`
  width: 100%;
  border-radius: 10px;
  border-style: solid;
  border-width: 1px;
  border-color: #ddd7e5;
  padding: 1.1rem;
  color: #324147;

  & + input {
    margin-top: 1rem;
  }

  ::placeholder {
    color: #b1aabb;
  }
`;

export const Section = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background: #fff;
  height: 58rem;
  width: 40rem;
  border-radius: 30px;
  margin: 5rem;
  padding: 0 3rem;
`;

export const ForgetPassword = styled.button`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  border: none;
  background: none;
  color: #6e54ff;
  margin-top: 1rem;
  margin-bottom: 2rem;
  font-weight: 900;
  font-size: 1.3rem;

  transition: color 0.3s;

  &:hover {
    color: ${shade(0.2, "#6E54FF")};
  }
`;

export const Form = styled(UForm)`
  width: 100%;
`;

export const ModalContainer = styled.div`
  width: 35rem;
`;

export const ModalTitle = styled.h2`
  font-weight: bold;
  font-size: 1.8rem;
  text-transform: uppercase;

  color: #6e54ff;

  margin-bottom: 2rem;
`;
