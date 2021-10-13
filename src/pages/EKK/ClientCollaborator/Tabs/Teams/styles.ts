import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  padding: 2.4rem
`;

export const TableTitle = styled.h1`
  font-weight: bold;
  font-size: 1.8rem;
  text-transform: uppercase;
  color: #6e54ff;
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

export const SubTitle = styled.h2`
  font-size: 1.5rem;
  color: #324147;
`;

export const AddToTeamContainer = styled.div`
  padding: 3rem 0;
  border-bottom: 1px solid #ddd7e6;
  display: flex;
  align-items: flex-end;
  margin-bottom: 2.5rem;
`;

export const DropdownTitle = styled.h3`
  font-weight: bold;
  font-size: 1.5rem;
  color: #324147;

  margin-bottom: 1.5rem;
`;

export const DropdownWrapper = styled.div`
  font-weight: bold;
  font-size: 1.5rem;
  color: #324147;
`;
