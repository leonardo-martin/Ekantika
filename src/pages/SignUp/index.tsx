import React, { useRef, useCallback } from "react";
import { FormHandles } from "@unform/core";
import * as Yup from "yup";
import { useHistory, useParams } from "react-router-dom";

import { useAuth } from "../../contexts/AuthContext";
import { useToast } from "../../contexts/ToastContext";

import getValidationErrors from "../../utils/getValidationErrors";

import logoImg from "../../assets/ekantika_logo.png";
import Input from "../../components/Input";

import { Container, Title, Form, Section, EntrarBtn } from "./styles";
import PasswordInput from "../../components/PasswordInput";

interface SignInFormData {
  email: string;
  password: string;
  confirm_passowrd: string;
}

interface ParamProps {
  user_id: string;
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { user_id } = useParams<ParamProps>();

  const { firstSignIn } = useAuth();
  const { addToast } = useToast();
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: SignInFormData) => {
      console.log(data);

      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .required("E-mail obrigatório")
            .email("Digite um e-mail valido"),
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

        await firstSignIn({
          user_id,
          email: data.email,
          password: data.password,
        });

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

        console.log();

        addToast({
          type: "error",
          title: "Erro na autenticação",
          description:
            err.message.length > 0
              ? err.message
              : "Ocorreu um erro ao fazer o primeiro acesso, cheque as credenciais.",
        });
      }
    },
    [firstSignIn, addToast, history, user_id]
  );

  return (
    <Container>
      <Section>
        <img src={logoImg} alt="Ekantika Logo" />
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Title>Primeiro acesso</Title>
          <Input name="email" placeholder="Digite seu E-mail" />

          <PasswordInput name="password" placeholder="Digite uma Senha" />
          <PasswordInput name="confirm_passowrd" placeholder="Repita a Senha" />

          <EntrarBtn type="submit">ENTRAR</EntrarBtn>
        </Form>
      </Section>
    </Container>
  );
};

export default SignUp;
