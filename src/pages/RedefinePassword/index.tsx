import React, { useRef, useCallback } from "react";
import { FormHandles } from "@unform/core";
import * as Yup from "yup";
import { useHistory, useParams } from "react-router-dom";

// import { useAuth } from "../../contexts/AuthContext";
import { useToast } from "../../contexts/ToastContext";

import getValidationErrors from "../../utils/getValidationErrors";

import logoImg from "../../assets/ekantika_logo.png";

import { Container, Title, Form, Section, EntrarBtn } from "./styles";
import PasswordInput from "../../components/PasswordInput";
import { TUser, useAuth } from "../../contexts/AuthContext";
import api from "../../services/api";

interface RedefinePasswordFormData {
  password: string;
  confirm_passowrd: string;
}

interface ParamProps {
  token: string;
}

const RedefinePassword: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  let { token } = useParams<ParamProps>();

  const { updateUser } = useAuth();
  const { addToast } = useToast();
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: RedefinePasswordFormData) => {
      console.log(data);

      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          password: Yup.string().required("Senha obrigatória"),
          confirm_passowrd: Yup.string().required(
            "Confirmação de senha obrigatória"
          ),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        if (data.password !== data.confirm_passowrd) {
          throw new Error("As duas senhas informadas não coincidem.");
        }

        const response = await api.post("auth/updatePassword", {
          password: data.password,
          token,
        });

        const updatedUser = response.data.payload as TUser;
        let responseToken = "";

        if (response.data.token) {
          responseToken = response.data.token;
        }

        updateUser(updatedUser, responseToken);

        history.push("/ekk/dashboard");
      } catch (err: any) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          let description;

          console.log(errors);

          if (errors.email && errors.password) {
            description = errors.email + " e " + errors.password;
          } else if (errors.email) {
            description = errors.email;
          } else if (errors.password) {
            description = errors.password;
          } else {
            description = errors.confirm_passowrd;
          }

          addToast({
            type: "error",
            title: "Erro na autenticação",
            description,
          });

          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: "error",
          title: "Erro na autenticação",
          description:
            err.message.length > 0
              ? err.message
              : "Ocorreu um erro ao redefinir sua senha, cheque as credenciais.",
        });
      }
    },
    [addToast, updateUser, history, token]
  );

  return (
    <Container>
      <Section>
        <img src={logoImg} alt="Ekantika Logo" />
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Title>Redefinir senha</Title>

          <PasswordInput name="password" placeholder="Nova Senha" />
          <PasswordInput
            name="confirm_passowrd"
            placeholder="Repita a nova Senha"
          />

          <EntrarBtn type="submit">ENTRAR</EntrarBtn>
        </Form>
      </Section>
    </Container>
  );
};

export default RedefinePassword;
