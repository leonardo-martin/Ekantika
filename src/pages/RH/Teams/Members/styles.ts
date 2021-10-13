import styled from "styled-components";

export const IntegrantsContainer = styled.div`
  display: flex;
  align-items: center;

  & > * + * {
    margin-left: 2.4rem;
  }
`;

export const Labels = styled.div`
  display: flex;
  align-items: center;

  & > * + * {
    margin-left: 1.6rem;
  }
`;
