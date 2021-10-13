import Button from "../../../../../components/Button";
import Paper from "../../../../../components/Paper";
import HtmlInput from "../../../../../components/HtmlInput";

import { ReactComponent as AlertIcon } from "../../../../../assets/icons/alert.svg";
import { Form } from "@unform/web";

import {
  Container,
  PaperTitle,
  FilesContainer,
  EmailFileContainer,
  Title,
  AlertDiv,
  ForgotPasswordFileContainer,
  SubComponentContainer,
  ImagesSubTitle,
  ImagesContainer,
  TopContainer,
  ImagesContainerAlertDiv,
  SubTitle,
  ImageContainer,
  FormContainer,
  FooterContainer,
} from "./styles";
import { useCallback, useState } from "react";
import ImageInput from "../../../../../components/ImageInput";
import validateFileExtension from "../../../../../utils/validateFileExtension";
import { useToast } from "../../../../../contexts/ToastContext";
import { useCompany } from "../../contexts/CompanyContext";
import api from "../../../../../services/api";
import imageUploadValidation from "../../../../../utils/imageUploadValidation";

const Emails: React.FC = () => {
  const { addToast } = useToast();
  const { currentCompany, updateCompany } = useCompany();

  const handleEmailHTMLSubmit = useCallback(
    async (formData: { emailHtml: File }) => {
      const { emailHtml } = formData;

      if (emailHtml) {
        const acceptedExtensions = [".html"];

        if (
          !validateFileExtension(
            emailHtml.name.toLocaleLowerCase(),
            acceptedExtensions
          )
        ) {
          addToast({
            type: "error",
            title: "Erro",
            description: "Occoreu um erro no upload do HTML.",
          });

          return;
        }
      }

      const data = new FormData();

      data.append("company_id", currentCompany.id);
      data.append("tipo", "template_invite");
      data.append("fileSend", emailHtml);

      const response = await api.post("company/upload-file", data);

      // console.log(response.data);

      if (response.data.success) {
        updateCompany({
          Emails: {
            ...currentCompany.Emails,
            template_invite: emailHtml.name,
          },
        });

        addToast({
          type: "success",
          title: "Sucesso",
          description: "Html salvo com sucesso.",
        });
      } else {
        addToast({
          type: "error",
          title: "Erro ao Salvar",
          description:
            "Ocorreu um erro ao salvar este arquivo, contate o suporte para mais informações.",
        });
      }
    },
    [addToast, currentCompany.id, currentCompany.Emails, updateCompany]
  );

  const handleForgotPassworlHTMLSubmit = useCallback(
    async (formData: { forgotPasswordHtml: File }) => {
      const { forgotPasswordHtml } = formData;

      if (forgotPasswordHtml) {
        const acceptedExtensions = [".html"];

        if (
          !validateFileExtension(
            forgotPasswordHtml.name.toLocaleLowerCase(),
            acceptedExtensions
          )
        ) {
          addToast({
            type: "error",
            title: "Erro",
            description: "Occoreu um erro no upload do HTML.",
          });

          return;
        }
      }

      const data = new FormData();

      data.append("company_id", currentCompany.id);
      data.append("tipo", "template_forgot_password");
      data.append("fileSend", forgotPasswordHtml);

      const response = await api.post("company/upload-file", data);

      // console.log(response.data);

      if (response.data.success) {
        updateCompany({
          Emails: {
            ...currentCompany.Emails,
            template_forgot_password: forgotPasswordHtml.name,
          },
        });

        addToast({
          type: "success",
          title: "Sucesso",
          description: "Html salvo com sucesso.",
        });
      } else {
        addToast({
          type: "error",
          title: "Erro ao Salvar",
          description:
            "Ocorreu um erro ao salvar este arquivo, contate o suporte para mais informações.",
        });
      }
    },
    [addToast, currentCompany.id, currentCompany.Emails, updateCompany]
  );

  return (
    <Container>
      <PaperTitle>
        Importe o seu modelo de html padrão para envio das mensagens dos
        sistema.
      </PaperTitle>
      <AlertDiv style={{ display: "flex" }}>
        <AlertIcon />

        <div style={{ display: "flex", flexDirection: "column" }}>
          <p>
            {`Para ambos os modelos certifique-se de enviar o arquivo html com todas as imagens hospedadas em seu servidor, para que não tenha quebra de layout na hora do envio.`}
          </p>
          <p>
            {`Os arquivos devem ter as seguintes tag’s obrigatórias:  {{ NOME }}    {{ SOBRENOME }}     {{ LINK_GERADO }}  e podem conter as seguintes tag’s opcionais: {{ DATA }} {{ HORA }} `}
          </p>
        </div>
      </AlertDiv>
      <FilesContainer>
        <EmailFileContainer>
          <Title>Padrão invite (primeiro acesso)</Title>

          <div style={{ display: "flex", width: "100%" }}>
            <Form
              style={{
                display: "flex",
                flex: "1",
                alignItems: "flex-end",
              }}
              onSubmit={handleEmailHTMLSubmit}
            >
              <HtmlInput name="emailHtml" />

              <Button
                width="25rem"
                containerStyle={{
                  height: "4rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginLeft: "2rem",
                }}
                type="submit"
              >
                APLICAR
              </Button>
            </Form>
          </div>
        </EmailFileContainer>

        <ForgotPasswordFileContainer>
          <Title>Padrão esqueci a senha</Title>

          <div style={{ display: "flex", width: "100%" }}>
            <Form
              style={{
                display: "flex",
                flex: "1",
                alignItems: "flex-end",
              }}
              onSubmit={handleForgotPassworlHTMLSubmit}
            >
              <HtmlInput name="forgotPasswordHtml" />

              <Button
                width="25rem"
                containerStyle={{
                  height: "4rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginLeft: "2rem",
                }}
                type="submit"
              >
                APLICAR
              </Button>
            </Form>
          </div>
        </ForgotPasswordFileContainer>
      </FilesContainer>
    </Container>
  );
};

export const EmailsSubComponent: React.FC = () => {
  const [topPreview, setTopPreview] = useState<string | null>(null);
  const [footerPreview, setFooterPreview] = useState<string | null>(null);

  const { addToast } = useToast();
  const { currentCompany, updateCompany } = useCompany();

  const handleTopSubmit = useCallback(
    async (formData: { top: File }) => {
      const { top } = formData;
      let err = false;

      if (topPreview && top) {
        err = await imageUploadValidation({
          maxWidth: 600,
          maxHeight: 150,
          acceptedExtensions: [".jpg", ".png"],
          formatErrorMessage: "O formato da imagem precisa ser JPG ou PNG.",
          file: top,
          imgPreview: topPreview,
          addToast,
        });
      }

      if (err) {
        return;
      }

      const data = new FormData();

      data.append("company_id", currentCompany.id);
      data.append("tipo", "email_img_header");
      data.append("fileSend", top);

      const response = await api.post("company/upload-image", data);

      if (response.data.success) {
        updateCompany({
          Emails: {
            ...currentCompany.Emails,
            email_img_header: response.data.payload,
          },
        });

        addToast({
          type: "success",
          title: "Sucesso",
          description: "Imagem salva com sucesso.",
        });
      } else {
        addToast({
          type: "error",
          title: "Erro ao Salvar",
          description:
            "Ocorreu um erro ao salvar esta imagem, contate o suporte para mais informações.",
        });
      }
    },
    [
      topPreview,
      addToast,
      currentCompany.id,
      updateCompany,
      currentCompany.Emails,
    ]
  );

  const handleFooterSubmit = useCallback(
    async (formData: { footer: File }) => {
      const { footer } = formData;
      let err = false;

      if (footerPreview && footer) {
        err = await imageUploadValidation({
          maxWidth: 600,
          maxHeight: 150,
          acceptedExtensions: [".jpg", ".png"],
          formatErrorMessage: "O formato da imagem precisa ser JPG ou PNG.",
          file: footer,
          imgPreview: footerPreview,
          addToast,
        });
      }

      if (err) {
        return;
      }

      const data = new FormData();

      data.append("company_id", currentCompany.id);
      data.append("tipo", "email_img_footer");
      data.append("fileSend", footer);

      const response = await api.post("company/upload-image", data);

      if (response.data.success) {
        updateCompany({
          Emails: {
            ...currentCompany.Emails,
            email_img_footer: response.data.payload,
          },
        });

        addToast({
          type: "success",
          title: "Sucesso",
          description: "Imagem salva com sucesso.",
        });
      } else {
        addToast({
          type: "error",
          title: "Erro ao Salvar",
          description:
            "Ocorreu um erro ao salvar esta imagem, contate o suporte para mais informações.",
        });
      }
    },
    [
      footerPreview,
      addToast,
      currentCompany.id,
      updateCompany,
      currentCompany.Emails,
    ]
  );

  return (
    <SubComponentContainer>
      <Paper
        containerStyle={{
          padding: "3.8rem 4.2rem",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Title>Imagens</Title>
        <ImagesSubTitle>
          Usadas no top e rodapé dos e-mails padrões do sistema.
        </ImagesSubTitle>

        <ImagesContainer>
          <TopContainer>
            <SubTitle>Topo</SubTitle>
            <div style={{ display: "flex", width: "100%" }}>
              <ImageContainer>
                {topPreview && (
                  <img src={topPreview} alt="Preview" width="100" />
                )}
              </ImageContainer>
              <Form
                style={{
                  display: "flex",
                  flex: "1",
                  alignItems: "flex-end",
                }}
                onSubmit={handleTopSubmit}
              >
                <FormContainer>
                  <div style={{ flex: 1 }}>
                    <ImagesContainerAlertDiv style={{ display: "flex" }}>
                      <AlertIcon />

                      <p>
                        Envie imagem em JPG ou PNG, com 600x150 pixels de
                        tamanho e com 72 dpis de resolução.
                      </p>
                    </ImagesContainerAlertDiv>
                    <ImageInput name="top" setPreview={setTopPreview} />
                  </div>

                  <Button
                    width="25rem"
                    containerStyle={{
                      height: "4rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginLeft: "2rem",
                    }}
                    type="submit"
                  >
                    APLICAR
                  </Button>
                </FormContainer>
              </Form>
            </div>
          </TopContainer>

          <FooterContainer>
            <SubTitle>Rodapé</SubTitle>
            <div style={{ display: "flex", width: "100%" }}>
              <ImageContainer>
                {footerPreview && (
                  <img src={footerPreview} alt="Preview" width="100" />
                )}
              </ImageContainer>
              <Form
                style={{
                  display: "flex",
                  flex: "1",
                  alignItems: "flex-end",
                }}
                onSubmit={handleFooterSubmit}
              >
                <FormContainer>
                  <div style={{ flex: 1 }}>
                    <ImagesContainerAlertDiv style={{ display: "flex" }}>
                      <AlertIcon />

                      <p>
                        Envie imagem em JPG ou PNG, com 600x150 pixels de
                        tamanho e com 72 dpis de resolução.
                      </p>
                    </ImagesContainerAlertDiv>
                    <ImageInput name="footer" setPreview={setFooterPreview} />
                  </div>

                  <Button
                    width="25rem"
                    containerStyle={{
                      height: "4rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginLeft: "2rem",
                    }}
                    type="submit"
                  >
                    APLICAR
                  </Button>
                </FormContainer>
              </Form>
            </div>
          </FooterContainer>
        </ImagesContainer>
      </Paper>
    </SubComponentContainer>
  );
};

export default Emails;
