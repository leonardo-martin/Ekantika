import React, { useRef, useCallback, useState } from "react";

import { FormHandles } from "@unform/core";
import * as Yup from "yup";
import { useHistory, useLocation } from "react-router-dom";

import { useAuth } from "../../contexts/AuthContext";
import { useToast } from "../../contexts/ToastContext";

import getValidationErrors from "../../utils/getValidationErrors";

import logoImg from "../../assets/ekantika_logo.png";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Modal from "../../components/Modal";

import {
  Container,
  Title,
  Section,
  ForgetPassword,
  Form,
  ModalContainer,
  ModalTitle,
} from "./styles";
import PasswordInput from "../../components/PasswordInput";
import api from "../../services/api";
import LoadingScreen from "../../components/LoadingScreen";

interface SignInFormData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const [openForgotPasswordModal, setOpenForgotPasswordModal] = useState(false);

  const [loading, setLoading] = useState(false);

  const { signIn } = useAuth();
  const { addToast } = useToast();
  const history = useHistory();
  const location = useLocation();

  const handleSubmit = useCallback(
    async (data: SignInFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .required("E-mail obrigatótio")
            .email("Digite um e-mail valido"),
          password: Yup.string().required("Senha obrigatória"),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const sigInResponse = await signIn({
          email: data.email,
          password: data.password,
        });

        if (sigInResponse.firstLogin) {
          history.push(`/sign-up/${sigInResponse.userId}`);
        } else {
          history.push("/ekk/dashboard");
        }
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          let description;

          if (errors.email && errors.password) {
            description = errors.email + " e " + errors.password;
          } else if (errors.email) {
            description = errors.email;
          } else {
            description = errors.password;
          }

          addToast({
            type: "error",
            title: "Erro na autenticação",
            description,
          });

          formRef.current?.setErrors(errors);

          console.log(err);

          return;
        }

        addToast({
          type: "error",
          title: "Erro na autenticação",
          description: "Ocorreu um erro ao fazer login, cheque as credenciais.",
        });
      }
    },
    [signIn, addToast, history]
  );

  const handleForgotPasswordSubmit = useCallback(
    async (data) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .required("E-mail obrigatório")
            .email("Digite um e-mail valido"),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        let url = window.location.href;

        setLoading(true);

        const response = await api.post("auth/forgotPassword", {
          email: data.email,
          url,
        });

        if (response.data.success) {
          addToast({
            type: "success",
            title: "Sucesso ao enviar e-mail",
            description: "Cheque seu e-mail para alterar sua senha.",
          });
        } else {
          addToast({
            type: "error",
            title: "Erro ao enviar e-mail",
            description:
              "Ocorreu um erro ao enviar o e-mail de alteração de senha.",
          });
        }
      } catch (err: any) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          let description;

          console.log(errors);

          if (errors.email) {
            description = errors.email;
          }

          addToast({
            type: "error",
            title: "Erro ao enviar e-mail",
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
              : "Ocorreu um erro ao enviar o e-mail de alteração de senha.",
        });
      }

      setLoading(false);
      setOpenForgotPasswordModal(false);
    },
    [addToast]
  );

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <Container>
      <Section>
        <img src={logoImg} alt="Ekantika" />
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Title>Seja bem-vindo</Title>
          <Input name="email" placeholder="E-mail" />

          <PasswordInput name="password" placeholder="Senha" />

          <ForgetPassword
            type="button"
            onClick={() => setOpenForgotPasswordModal(true)}
          >
            ESQUECI A SENHA
          </ForgetPassword>
          <Button type="submit">ENTRAR</Button>
        </Form>
      </Section>

      <Modal
        open={openForgotPasswordModal}
        setOpen={setOpenForgotPasswordModal}
      >
        <ModalContainer>
          <Form onSubmit={handleForgotPasswordSubmit}>
            <ModalTitle>ESQUECI MINHA SENHA</ModalTitle>

            <Input
              name="email"
              containerStyle={{ width: "100%", marginTop: "2rem" }}
              placeholder="Digite seu e-mail"
            />

            <Button type="submit" containerStyle={{ marginTop: "3rem" }}>
              ENVIAR
            </Button>
          </Form>
        </ModalContainer>
      </Modal>
    </Container>
  );
};

export default Login;
