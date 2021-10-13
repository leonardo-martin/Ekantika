import styled from "styled-components";
import { Form as Unform } from "@unform/web";

export const Container = styled.div`
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  padding: 3.2rem 2.4rem;

  max-width: 1920px !important;
`;

export const PaperContainer = styled.div`
  display: grid;
  gap: 3.2rem;
`;

export const Form = styled(Unform)`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;

  > * + * {
    margin-left: 2.4rem;
  }
`;

export const FormGrid = styled.div`
  display: grid;

  grid-template-columns: 50rem auto;
  gap: 2.4rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

/** TODO This should be a component separately  */
export const TemporaryInputLabel = styled.label`
  display: block;
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1.2rem;
  color: var(--textos);
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
