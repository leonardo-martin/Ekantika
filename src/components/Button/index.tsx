import React, { ButtonHTMLAttributes } from "react";

import { Container } from "./styles";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  outline?: boolean;
  containerStyle?: object;
  type?: string;
  width?: string;
  btnColor?: string;
};

const Button: React.FC<ButtonProps> = ({
  children,
  outline,
  type = "button",
  width,
  btnColor,
  containerStyle = {},
  ...rest
}) => (
  <Container
    outline={outline}
    width={width}
    style={containerStyle}
    btnColor={btnColor}
    type={type}
    {...rest}
  >
    {children}
  </Container>
);

export default Button;
