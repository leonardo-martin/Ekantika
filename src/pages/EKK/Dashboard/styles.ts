import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.div`
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  padding: 3.2rem 2.4rem;

  max-width: 1920px !important;
`;

export const Title = styled.h1`
  text-transform: uppercase;
  color: #6e54ff;
  font-weight: 700;
  font-size: 1.8rem;

  margin-bottom: 2rem;
`;

export const ToogleTableShowBtn = styled.button`
  text-transform: uppercase;
  color: #6e54ff;
  font-weight: 900;
  font-size: 1.3rem;
  background: none;
  border: none;
  margin: 2rem 1rem 0;

  display: flex;
  justify-content: flex-end;
`;

export const AcesarBtn = styled(Link)`
  text-transform: uppercase;
  color: #6e54ff;
  font-weight: 900;
  font-size: 1.3rem;
  background: none;
  border: none;
  margin-left: auto;
  width: 100%;
  justify-content: flex-end;

  display: flex;
`;
