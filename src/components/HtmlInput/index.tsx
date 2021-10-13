import React, {
  ChangeEvent,
  useRef,
  useEffect,
  useCallback,
  useState,
} from "react";

import { Container, ContainerStyle } from "./styles";

import { useField } from "@unform/core";

interface Props {
  name: string;
  containerStyle?: object;
}

type InputProps = JSX.IntrinsicElements["input"] & Props;

export default function HtmlInput({
  name,
  containerStyle = {},
  ...rest
}: InputProps) {
  const [title, setTitle] = useState("Escolher arquivo");

  const inputRef = useRef<HTMLInputElement>(null);

  const { fieldName, registerField } = useField(name);

  const handlePreview = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];

      if (!file) {
        setTitle("Escolher arquivo");
      }

      if (file) {
        setTitle(file.name);
      }
    },
    [setTitle]
  );

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: "files[0]",
      clearValue(ref: HTMLInputElement) {
        ref.value = "";
      },
    });
  }, [fieldName, registerField]);

  return (
    <Container>
      <ContainerStyle style={containerStyle}>{title}</ContainerStyle>
      <input
        type="file"
        ref={inputRef}
        onChange={handlePreview}
        {...rest}
        style={{ display: "none" }}
      />
    </Container>
  );
}
