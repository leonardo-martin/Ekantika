import React, {
  InputHTMLAttributes,
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react";

import { Container, InputText, IconBtn } from "./styles";

import { useField } from "@unform/core";

import { ReactComponent as EyeIcon } from "../../assets/icons/eye.svg";
import { ReactComponent as ClosedEyeIcon } from "../../assets/icons/closed-eye.svg";

interface PasswordInputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  borderRadius?: string;
  containerStyle?: object;
  inputStyle?: object;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  name = "",
  containerStyle = {},
  inputStyle = {},
  borderRadius,
  ...rest
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [tooglePasswordMask, setTooglePasswordMask] = useState(false);

  const { fieldName, defaultValue, registerField } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: "value",
    });
  }, [fieldName, registerField]);

  const handleToogleMask = useCallback(() => {
    setTooglePasswordMask((prevState) => !prevState);
  }, []);

  return (
    <Container style={containerStyle} borderRadius={borderRadius}>
      <InputText
        borderRadius={borderRadius}
        type={tooglePasswordMask ? "text" : "password"}
        style={inputStyle}
        autoComplete="off"
        defaultValue={defaultValue}
        ref={inputRef}
        {...rest}
      />

      <IconBtn onClick={handleToogleMask} type="button">
        {tooglePasswordMask ? <EyeIcon /> : <ClosedEyeIcon />}
      </IconBtn>
    </Container>
  );
};

export default PasswordInput;
