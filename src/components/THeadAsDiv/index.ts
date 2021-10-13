import styled from "styled-components";

export interface THeadAsDivProps {
  gridTemplateColumns: string;
}

const THeadAsDiv = styled.div<THeadAsDivProps>`
  margin: 0;
  padding: 0.8rem 1rem;
  text-align: unset;
  background: #f2f3f5;

  font-size: 1.4rem;

  border-bottom: none;

  text-transform: uppercase;
  color: #6e54ff;
  font-weight: 900;
  line-height: inherit;

  display: grid;
  align-items: center;
  grid-template-columns: ${({ gridTemplateColumns }) => gridTemplateColumns};

  :last-child {
    border-bottom-right-radius: 7.5px;
    border-top-right-radius: 7.5px;
  }
  :first-child {
    border-bottom-left-radius: 7.5px;
    border-top-left-radius: 7.5px;
  }
`;

export default THeadAsDiv;
