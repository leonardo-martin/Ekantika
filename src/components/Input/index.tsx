import React, {
  InputHTMLAttributes,
  ReactNode,
  useEffect,
  useRef,
} from "react";

import { Container, InputText } from "./styles";

import { useField } from "@unform/core";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  icon?: ReactNode;
  borderRadius?: string;
  containerStyle?: object;
  inputStyle?: object | Array<object>;
}

const Input: React.FC<InputProps> = ({
  name = "",
  icon,
  containerStyle = {},
  inputStyle = {},
  borderRadius,
  ...rest
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const { fieldName, defaultValue, registerField } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: "value",
    });
  }, [fieldName, registerField]);

  return (
    <Container style={containerStyle} borderRadius={borderRadius}>
      {icon && icon}

      <InputText
        borderRadius={borderRadius}
        style={inputStyle}
        autoComplete="off"
        defaultValue={defaultValue}
        ref={inputRef}
        {...rest}
      />
    </Container>
  );
};

export default Input;
