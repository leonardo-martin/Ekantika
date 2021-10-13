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
  setPreview: (value: string | null) => void;
  containerStyle?: object;
  setInputRef?(inputRef: RefObject<HTMLInputElement>): void;
  onImageChange?(file: File): void;
}

type InputProps = JSX.IntrinsicElements["input"] & Props;

export default function ImageInput({
  setPreview,
  name,
  containerStyle = {},
  onImageChange,
  setInputRef,
  ...rest
}: InputProps) {
  const [title, setTitle] = useState("Escolher imagem");

  const inputRef = useRef<HTMLInputElement>(null);

  const { fieldName, registerField, defaultValue } = useField(name);
  // const [preview, setPreview] = useState(defaultValue);

  useEffect(() => {
    if (defaultValue) {
      setPreview(defaultValue);
    }
  }, [setPreview, defaultValue]);

  const handlePreview = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];

      if (!file) {
        setPreview(null);
        setTitle("Escolher imagem");
      }

      if (file && onImageChange) {
        onImageChange(file);
      }

      if (file) {
        setTitle(file.name);
      }

      if (file) {
        const previewURL = window.URL.createObjectURL(file);
        setPreview(previewURL);
      }
    },
    [setPreview, setTitle, onImageChange]
  );

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: "files[0]",
      clearValue(ref: HTMLInputElement) {
        ref.value = "";
        setPreview(null);
      },
      setValue(_: HTMLInputElement, value: string) {
        setPreview(value);
      },
    });
  }, [fieldName, registerField, setPreview]);

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
