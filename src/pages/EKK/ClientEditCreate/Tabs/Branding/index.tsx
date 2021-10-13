import { Grid } from "@material-ui/core";
import Button from "../../../../../components/Button";
import Input from "../../../../../components/Input";
import Paper from "../../../../../components/Paper";
import ImageInput from "../../../../../components/ImageInput";

import { Form } from "@unform/web";

import {
  Container,
  LogoTipoContainer,
  TopBarContainer,
  ImageContainer,
  LoginPageContainer,
  FormContainer,
  PaperMainDiv,
  Title,
  SubTitle,
  DominioEkantika,
  UrlForm,
  SubComponentContainer,
  AlertDiv,
  AlertIcon,
  ColorsContainer,
  PrimaryColorDiv,
  SecundaryColorDiv,
  ColorTitle,
  ColorSubTitle,
  ShowPrimaryColor,
  ShowSecundaryColor,
  PreviewTitle,
} from "./styles";
import { useCallback, useState } from "react";

import DashboardPreview from "../../components/DashboardPreview";
import { useEffect } from "react";
import { useToast } from "../../../../../contexts/ToastContext";
import api, { baseURL } from "../../../../../services/api";
import axios from "axios";

import { useCompany } from "../../contexts/CompanyContext";
import imageUploadValidation from "../../../../../utils/imageUploadValidation";
import preventSpecialCharacters from "../../../../../utils/preventSpecialCharacters";

const Branding: React.FC = () => {
  const [alias, setAlias] = useState("");
  const [aliasExists, setAliasExists] = useState<boolean | string>("");
  const [aliasBorder, setAliasBorder] = useState<string>("");

  const { currentCompany, updateCompany } = useCompany();
  const { addToast } = useToast();

  useEffect(() => {
    if (currentCompany.Alias) {
      const { alias } = currentCompany.Alias;

      if (alias) {
        setAlias(alias);
      }
    }
  }, [currentCompany.Alias]);

  useEffect(() => {
    const source = axios.CancelToken.source();

    async function checkAlias() {
      try {
        const response = await api.get(`company/${alias}/alias`, {
          cancelToken: source.token,
        });

        if (
          response.data.payload &&
          response.data.payload.company_id !== currentCompany.id
        ) {
          setAliasExists(true);
          setAliasBorder("1px solid #FF2929");
        } else {
          setAliasExists(false);
          setAliasBorder("1px solid #2AC769");
        }
      } catch (error) {
        if (axios.isCancel(error)) {
          //cancelled
        } else {
          throw error;
        }
      }
    }

    if (alias.length >= 3) {
      checkAlias();
    } else {
      setAliasBorder("");
    }

    return () => {
      source.cancel();
    };
  }, [alias, currentCompany.id]);

  const handleSubmit = useCallback(
    async (data: { alias: string }) => {
      console.log(data);

      if (aliasExists !== null && aliasExists !== true) {
        const response = await api.post("company/alias", {
          company_id: currentCompany.id,
          alias: data.alias,
        });

        if (response.data.success) {
          updateCompany({
            Branding: {
              ...currentCompany.Branding,
              alias: data.alias,
            },
          });
          addToast({
            type: "success",
            title: "Sucesso",
            description: "Subdomínio salvo com sucesso.",
          });
        } else {
          addToast({
            type: "error",
            title: "Erro",
            description:
              "Ocorreu um erro ao salvar o subdomínio, contate o suporte para mais informações.",
          });
        }
      }
    },
    [
      aliasExists,
      currentCompany.id,
      currentCompany.Branding,
      addToast,
      updateCompany,
    ]
  );

  return (
    <Container>
      <Title>Defina uma url</Title>
      <UrlForm onSubmit={handleSubmit}>
        <Input
          name="alias"
          placeholder="Subdomínio"
          value={alias}
          onChange={(e) => setAlias(preventSpecialCharacters(e.target.value))}
          containerStyle={{
            background: "#F2F3F5",
            border: aliasBorder,
          }}
        />

        <DominioEkantika>.ekantika.com.br</DominioEkantika>

        <Button width="25rem" type="submit">
          APLICAR
        </Button>
      </UrlForm>
    </Container>
  );
};

export const BrandingSubComponent: React.FC = () => {
  const [topBarPreview, setTopBarPreview] = useState<string | null>(null);
  const [telaLoginPreview, setTelaLoginPreview] = useState<string | null>(null);
  const [favIconPreview, setFavIconPreview] = useState<string | null>(null);
  const [bannerLoginPreview, setBannerLoginPreview] = useState<string | null>(
    null
  );

  const [primaryColor, setPrimaryColor] = useState<string>("#36424A");
  const [secundaryColor, setSecundaryColor] = useState<string>("#E63011");

  const { addToast } = useToast();
  const { currentCompany, updateCompany } = useCompany();

  useEffect(() => {
    if (currentCompany.Branding) {
      const { logo, color_primary, color_secondary } = currentCompany.Branding;

      console.log(currentCompany.Branding);

      if (logo) {
        setTopBarPreview(baseURL + logo);
      }
      if (color_primary) {
        setPrimaryColor(color_primary);
      }

      if (color_secondary) {
        setSecundaryColor(color_secondary);
      }
    }
  }, [currentCompany.Branding]);

  const handleTopBarSubmit = useCallback(
    async (formData: { topBar: File }) => {
      const { topBar } = formData;
      let err = false;

      if (topBarPreview && topBar) {
        err = await imageUploadValidation({
          maxWidth: 230,
          maxHeight: 60,
          acceptedExtensions: [".jpg", ".png"],
          formatErrorMessage: "O formato da imagem precisa ser JPG ou PNG.",
          file: topBar,
          imgPreview: topBarPreview,
          addToast,
        });
      }

      if (err) {
        return;
      }

      const data = new FormData();

      data.append("company_id", currentCompany.id);
      data.append("tipo", "logo");
      data.append("fileSend", topBar);

      const response = await api.post("company/upload-image", data);

      if (response.data.success) {
        updateCompany({
          Branding: {
            ...currentCompany.Branding,
            logo: response.data.payload,
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
      topBarPreview,
      addToast,
      currentCompany.id,
      updateCompany,
      currentCompany.Branding,
    ]
  );

  const handleTelaLoginSubmit = useCallback(
    async (formData: { telaLogin: File }) => {
      const { telaLogin } = formData;
      let err = false;

      if (telaLoginPreview && telaLogin) {
        err = await imageUploadValidation({
          maxWidth: 230,
          maxHeight: 60,
          acceptedExtensions: [".jpg", ".png"],
          formatErrorMessage: "O formato da imagem precisa ser JPG ou PNG.",
          file: telaLogin,
          imgPreview: telaLoginPreview,
          addToast,
        });
      }

      if (err) {
        return;
      }

      const data = new FormData();

      data.append("company_id", currentCompany.id);
      data.append("tipo", "logo_login");
      data.append("fileSend", telaLogin);

      const response = await api.post("company/upload-image", data);

      if (response.data.success) {
        updateCompany({
          Branding: {
            ...currentCompany.Branding,
            logo_login: response.data.payload,
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
      telaLoginPreview,
      addToast,
      currentCompany.id,
      updateCompany,
      currentCompany.Branding,
    ]
  );

  const handleFavIconSubmit = useCallback(
    async (formData: { favIcon: File }) => {
      const { favIcon } = formData;
      let err = false;

      if (favIconPreview && favIcon) {
        err = await imageUploadValidation({
          maxWidth: 144,
          maxHeight: 144,
          acceptedExtensions: [".png"],
          formatErrorMessage: "O formato da imagem precisa ser PNG.",
          file: favIcon,
          imgPreview: favIconPreview,
          addToast,
        });
      }

      if (err) {
        return;
      }

      const data = new FormData();

      data.append("company_id", currentCompany.id);
      data.append("tipo", "favicon");
      data.append("fileSend", favIcon);

      const response = await api.post("company/upload-image", data);

      if (response.data.success) {
        updateCompany({
          Branding: {
            ...currentCompany.Branding,
            favicon: response.data.payload,
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
      favIconPreview,
      addToast,
      currentCompany.id,
      updateCompany,
      currentCompany.Branding,
    ]
  );

  const handleBannerLoginSubmit = useCallback(
    async (formData: { bannerLogin: File }) => {
      const { bannerLogin } = formData;
      let err = false;

      if (bannerLoginPreview && bannerLogin) {
        err = await imageUploadValidation({
          maxWidth: 1920,
          maxHeight: 1080,
          acceptedExtensions: [".jpg", ".png"],
          formatErrorMessage: "O formato da imagem precisa ser JPG ou PNG.",
          file: bannerLogin,
          imgPreview: bannerLoginPreview,
          addToast,
        });
      }

      if (err) {
        return;
      }

      const data = new FormData();

      data.append("company_id", currentCompany.id);
      data.append("tipo", "login_banner");
      data.append("fileSend", bannerLogin);

      const response = await api.post("company/upload-image", data);

      if (response.data.success) {
        updateCompany({
          Branding: {
            ...currentCompany.Branding,
            login_banner: response.data.payload,
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
      bannerLoginPreview,
      addToast,
      currentCompany.id,
      updateCompany,
      currentCompany.Branding,
    ]
  );

  const handlePrimaryColorChange = useCallback(
    async (e) => {
      const { value } = e.target;
      const message = value.slice(0, 7);

      if (value.length !== 0) setPrimaryColor(message);
    },
    [setPrimaryColor]
  );

  const handleSecundaryColorChange = useCallback(
    async (e) => {
      const { value } = e.target;
      const message = value.slice(0, 7);

      if (value.length !== 0) setSecundaryColor(message);
    },
    [setSecundaryColor]
  );

  const handleSaveColors = useCallback(async () => {
    const data = {
      company_id: currentCompany.id,
      color_primary: primaryColor,
      color_secondary: secundaryColor,
    };

    const response = await api.post("company/colors", data);

    if (!response.data.success) {
      addToast({
        type: "error",
        title: "Erro ao Salvar",
        description:
          "Ocorreu um erro ao salvar as cores, contate o suporte para mais informações.",
      });
      return;
    } else {
      console.log(data);

      addToast({
        type: "success",
        title: "Sucesso",
        description: "As cores foram atualizadas.",
      });

      updateCompany({
        Branding: {
          ...currentCompany.Branding,
          color_primary: primaryColor,
          color_secondary: secundaryColor,
        },
      });
    }
  }, [
    currentCompany.id,
    currentCompany.Branding,
    primaryColor,
    secundaryColor,
    addToast,
    updateCompany,
  ]);

  return (
    <SubComponentContainer>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper
            containerStyle={{
              padding: "3.8rem 4.2rem",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Title>Logotipo</Title>
            <LogoTipoContainer>
              <TopBarContainer>
                <SubTitle>Barra de topo de sistema.</SubTitle>
                <div style={{ display: "flex", width: "100%" }}>
                  <ImageContainer>
                    {topBarPreview && (
                      <img src={topBarPreview} alt="Preview" width="100" />
                    )}
                  </ImageContainer>
                  <Form
                    style={{
                      display: "flex",
                      flex: "1",
                      alignItems: "flex-end",
                    }}
                    onSubmit={handleTopBarSubmit}
                  >
                    <FormContainer>
                      <div style={{ flex: 1 }}>
                        <AlertDiv style={{ display: "flex" }}>
                          <AlertIcon />

                          <p>
                            Certifique-se de enviar imagem em JPG ou PNG, com no
                            mínimo 230x60 pixels de tamanho e com 72 dpis de
                            resolução. Envie a versão colorida ou positiva de
                            seu logotipo.
                          </p>
                        </AlertDiv>
                        <ImageInput
                          name="topBar"
                          setPreview={setTopBarPreview}
                        />
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
              </TopBarContainer>

              <LoginPageContainer>
                <SubTitle>Tela de login do sistema</SubTitle>
                <div style={{ display: "flex", width: "100%" }}>
                  <ImageContainer>
                    {telaLoginPreview && (
                      <img src={telaLoginPreview} alt="Preview" width="100" />
                    )}
                  </ImageContainer>
                  <Form
                    style={{
                      display: "flex",
                      flex: "1",
                      alignItems: "flex-end",
                    }}
                    onSubmit={handleTelaLoginSubmit}
                  >
                    <FormContainer>
                      <div style={{ flex: 1 }}>
                        <AlertDiv style={{ display: "flex" }}>
                          <AlertIcon />

                          <p>
                            Certifique-se de enviar imagem em JPG ou PNG, com no
                            mínimo 230x60 pixels de tamanho e com 72 dpis de
                            resolução. Envie a versão colorida ou positiva de
                            seu logotipo.
                          </p>
                        </AlertDiv>
                        <ImageInput
                          name="telaLogin"
                          setPreview={setTelaLoginPreview}
                        />
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
              </LoginPageContainer>
            </LogoTipoContainer>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={6}>
          <Paper
            containerStyle={{
              padding: "3.8rem 4.2rem",
              display: "flex",
              flexDirection: "column",
              marginBottom: "24px",
            }}
          >
            <Title>Favicon</Title>
            <PaperMainDiv>
              <SubTitle>Utilizado nos favoritos e versão mobile.</SubTitle>
              <div style={{ display: "flex", width: "100%" }}>
                <ImageContainer>
                  {favIconPreview && (
                    <img
                      src={favIconPreview}
                      alt="Preview"
                      width="100"
                      style={{ objectFit: "scale-down" }}
                    />
                  )}
                </ImageContainer>
                <Form
                  style={{
                    display: "flex",
                    flex: "1",
                    alignItems: "flex-end",
                  }}
                  onSubmit={handleFavIconSubmit}
                >
                  <FormContainer>
                    <div style={{ flex: 1 }}>
                      <AlertDiv style={{ display: "flex" }}>
                        <AlertIcon />

                        <p>
                          Certifique-se de enviar imagem em PNG, com no mínimo
                          144x144 pixels de tamanho e com 72 dpis de resolução.
                        </p>
                      </AlertDiv>
                      <ImageInput
                        name="favIcon"
                        setPreview={setFavIconPreview}
                      />
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
            </PaperMainDiv>
          </Paper>
          <Paper
            containerStyle={{
              padding: "3.8rem 4.2rem",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Title>Banner tela de Login</Title>
            <PaperMainDiv>
              <SubTitle>
                Imagem para divulgação de informações na tela de login.
              </SubTitle>
              <div style={{ display: "flex", width: "100%" }}>
                <ImageContainer>
                  {bannerLoginPreview && (
                    <img src={bannerLoginPreview} alt="Preview" width="100" />
                  )}
                </ImageContainer>
                <Form
                  style={{
                    display: "flex",
                    flex: "1",
                    alignItems: "flex-end",
                  }}
                  onSubmit={handleBannerLoginSubmit}
                >
                  <FormContainer>
                    <div style={{ flex: 1 }}>
                      <AlertDiv style={{ display: "flex" }}>
                        <AlertIcon />

                        <p>
                          Enviar imagem em JPG ou PNG, com no mínimo 1920x1080
                          pixels de tamanho e com 72 dpis de resolução.
                        </p>
                      </AlertDiv>
                      <ImageInput
                        name="bannerLogin"
                        setPreview={setBannerLoginPreview}
                      />
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
            </PaperMainDiv>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={6}>
          <Paper
            containerStyle={{
              padding: "3.8rem 4.2rem",
              display: "flex",
              flexDirection: "column",
              height: "100%",
            }}
          >
            <Title>Cores do sistema</Title>

            <SubTitle>Personalize o sistema com as suas cores.</SubTitle>

            <ColorsContainer>
              <PrimaryColorDiv>
                <ShowPrimaryColor
                  style={{
                    background: primaryColor ? primaryColor : "#fafafa",
                  }}
                />

                <div>
                  <ColorTitle>Primária</ColorTitle>
                  <ColorSubTitle>Cor da barra de topo</ColorSubTitle>

                  <Form onSubmit={() => {}}>
                    <Input
                      name="primary-color"
                      containerStyle={{
                        background: "#f2f3f5",
                        border: "1px solid #ddd7e6",
                      }}
                      onChange={handlePrimaryColorChange}
                      value={primaryColor}
                    />
                  </Form>
                </div>
              </PrimaryColorDiv>

              <SecundaryColorDiv>
                <ShowSecundaryColor
                  style={{
                    background: secundaryColor ? secundaryColor : "#fafafa",
                  }}
                />

                <div>
                  <ColorTitle>Secundária</ColorTitle>
                  <ColorSubTitle>Cor dos botões e títulos</ColorSubTitle>

                  <Form onSubmit={() => {}}>
                    <Input
                      containerStyle={{
                        background: "#f2f3f5",
                        border: "1px solid #ddd7e6",
                      }}
                      name="secundary-color"
                      onChange={handleSecundaryColorChange}
                      value={secundaryColor}
                    />
                  </Form>
                </div>
              </SecundaryColorDiv>
            </ColorsContainer>

            <PreviewTitle>Preview</PreviewTitle>
            <DashboardPreview
              primaryColor={primaryColor}
              secundaryColor={secundaryColor}
              topBarPreview={topBarPreview}
            />
            <Button
              type="button"
              width="25rem"
              containerStyle={{ marginLeft: "auto", marginTop: "1.5rem" }}
              onClick={handleSaveColors}
            >
              APLICAR
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </SubComponentContainer>
  );
};

export default Branding;
