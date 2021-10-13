import styled from "styled-components";
import { shade } from "polished";

interface ButtonProps {
  outline?: boolean;
  width?: string;
  btnColor?: string;
}

export const Container = styled.button<ButtonProps>`
  cursor: "pointer";
  background: ${({ outline, btnColor }) =>
    outline ? "transparent" : btnColor ? btnColor : "#6E54FF"};
  width: ${({ width }) => (!!width ? width : "100%")};
  border-radius: 300px;
  border: ${({ btnColor }) =>
    btnColor ? "1px solid " + btnColor : "1px solid #6e54ff"};

  color: ${({ outline, btnColor }) =>
    outline ? (btnColor ? btnColor : "#6E54FF") : "#fff"};
  padding: 1rem 0;
  transition: background-color 0.3s color 0.3s;
  font-size: 1.3rem;
  font-weight: 700;

  &:hover {
    background: ${shade(0.2, "#6E54FF")};
    background: ${({ btnColor }) => btnColor && shade(0.2, btnColor)};
    color: #fff;
  }
`;
