import styled from "styled-components";
import Button from "../../components/Button";

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

export const Form = styled(UForm)`
  width: 100%;
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

export const EntrarBtn = styled(Button)`
  margin-top: 2rem;
`;
