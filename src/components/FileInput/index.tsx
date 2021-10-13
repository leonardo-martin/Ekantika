import React, {
  ChangeEvent,
  useRef,
  useEffect,
  useCallback,
  useState,
  RefObject,
} from "react";

import { Container, ContainerStyle } from "./styles";

import { useField } from "@unform/core";

interface Props {
  name: string;
  containerStyle?: object;
  setInputRef?(inputRef: RefObject<HTMLInputElement>): void;
}

type InputProps = JSX.IntrinsicElements["input"] & Props;

export default function FileInput({
  name,
  containerStyle = {},
  setInputRef,
  ...rest
}: InputProps) {
  const [title, setTitle] = useState("Selecione um arquivo");

  const inputRef = useRef<HTMLInputElement>(null);

  const { fieldName, registerField } = useField(name);

  const handlePreview = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];

      if (!file) {
        setTitle("Selecione um arquivo");
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

  useEffect(() => {
    if (inputRef && setInputRef) {
      setInputRef(inputRef);
    }
  }, [setInputRef, inputRef]);

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
