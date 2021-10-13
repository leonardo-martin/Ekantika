import styled from "styled-components";

export const NavigationContainter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-bottom: 2.4rem;
`;

export const Buttons = styled.div`
  display: flex;
  > * + * {
    margin-left: 1.6rem;
  }
`;
