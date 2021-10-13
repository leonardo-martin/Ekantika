import React, {
  TextareaHTMLAttributes,
  ReactNode,
  useEffect,
  useRef,
} from "react";

import { Container, TextareaText } from "./styles";

import { useField } from "@unform/core";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  icon?: ReactNode;
  borderRadius?: string;
  containerStyle?: object;
  textareaStyle?: object | Array<object>;
}

const Textarea: React.FC<TextareaProps> = ({
  name = "",
  icon,
  containerStyle = {},
  textareaStyle = {},
  borderRadius,
  ...rest
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const { fieldName, defaultValue, registerField } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: textareaRef.current,
      path: "value",
    });
  }, [fieldName, registerField]);

  return (
    <Container style={containerStyle} borderRadius={borderRadius}>
      {icon && icon}

      <TextareaText
        borderRadius={borderRadius}
        style={textareaStyle}
        autoComplete="off"
        defaultValue={defaultValue}
        ref={textareaRef}
        {...rest}
      />
    </Container>
  );
};

export default Textarea;
