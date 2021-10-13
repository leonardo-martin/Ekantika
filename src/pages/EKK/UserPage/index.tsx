import React, { useCallback, useState, useEffect, RefObject } from "react";
import { Grid } from "@material-ui/core";
import { useHistory, useParams } from "react-router-dom";
import { Form } from "@unform/web";

import Paper from "../../../components/Paper";
import Button from "../../../components/Button";
import ImageInput from "../../../components/ImageInput";
import Modal from "../../../components/Modal";
import PageTitle from "../../../components/PageTitle";

import userImg from "../../../assets/icons/user-placeholder2.svg";

import {
  Container,
  UserImg,
  GobackDiv,
  GoBackIcon,
  CameraBtn,
  CameraIcon,
  ModalContainer,
  ModalTitle,
  DropdownItem,
  ModalDescription,
} from "./styles";
import PasswordInput from "../../../components/PasswordInput";
import Input from "../../../components/Input";
import Dropdown from "../../../components/Dropdown";
import api, { baseURL } from "../../../services/api";
import { useToast } from "../../../contexts/ToastContext";
import imageUploadValidation from "../../../utils/imageUploadValidation";
import LoadingScreen from "../../../components/LoadingScreen";
import { useAuth } from "../../../contexts/AuthContext";
import validateEmail from "../../../utils/validateEmail";

interface UserProps {
  id: string;
  name: string;
  email: string;
}

interface ChangePasswordProps {
  new_password: string;
  new_password_repeat: string;
}

interface RoleProps {
  id: string;
  uuid: string;
  name: string;
  slug: string;
  description: string;
  active: string;
  created_at: string;
  updated_at: string;
  allowed_to_clients: string;
  plan_id: string;
  NamePlan: string;
}

interface NewCollaboratorProps {
  name: string;
  email: string;
}

interface ParamProps {
  id: string;
}

const company_id = "1"; //Ekanika

const UserPage: React.FC = () => {
  const { id } = useParams<ParamProps>();

  const [openExcludeModal, setOpenExcludeModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserProps>({} as UserProps);

  const [inputRef, setInputRef] = useState<RefObject<HTMLInputElement> | null>(
    null
  );
  const [role, setRole] = useState<RoleProps>({} as RoleProps);
  const [roles, setRoles] = useState<RoleProps[]>([] as RoleProps[]);
  const [preview, setPreview] = useState<string | null>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [isEditPage, setEditPage] = useState(false);
  const [openChangePasswordModal, setOpenChangePasswordModal] =
    useState<boolean>(false);

  const { addToast } = useToast();
  const { updateUser, user } = useAuth();
  const history = useHistory();

  useEffect(() => {
    async function loadRoles() {
      const response = await api.post("user/functions", {
        company_id,
      });

      if (response.data.payload) {
        console.log(response.data.payload);

        setRoles(response.data.payload);
      }
    }

    loadRoles();
  }, [setRoles]);

  useEffect(() => {
    async function loadUser() {
      const response = await api.get(`user/${id}/info`);
      setEditPage(true);

      if (response.data.success) {
        setSelectedUser(response.data.payload);
        setRole(response.data.payload.perfil);
      }

      if (response.data.payload.photo) {
        setPreview(baseURL + response.data.payload.photo);
      }

      setLoading(false);
    }

    if (id !== "new") {
      loadUser();
    } else {
      setLoading(false);
    }
  }, [id]);

  const handleGoBack = useCallback(() => {
    history.goBack();
  }, [history]);

  const handleExcludeUser = useCallback(async () => {
    const response = await api.post("user/delete", {
      user_id: selectedUser.id,
    });

    if (!response.data.success) {
      addToast({
        type: "error",
        title: "Erro",
        description:
          "Ocorreu um erro ao excluir este usuário, contate o suporte para mais informações.",
      });

      return;
    } else {
      addToast({
        type: "success",
        title: "Sucesso",
        description: "O usuário foi deletado com sucesso.",
      });

      history.replace("/ekk/user/all");
    }
  }, [history, addToast, selectedUser.id]);

  const handleNewCollaboratorSubmit = useCallback(
    async (data: NewCollaboratorProps) => {
      const formData = {
        ...data,
        acl_role_id: role.id,
      };

      let err = false;
      let description = "";

      if (!formData.name || formData.name.length === 0) {
        description = "Nome incompleto.";
        err = true;
      }
      if (!formData.email || formData.email.length === 0) {
        description = "E-mail incompleto.";
        err = true;
      }
      if (!formData.acl_role_id || formData.acl_role_id.length === 0) {
        description = "Função não pode ser nula.";
        err = true;
      }
      if (formData.email && !validateEmail(formData.email)) {
        description = "E-mail inválido.";
        err = true;
      }

      if (err) {
        addToast({
          type: "error",
          title: "Erro",
          description,
        });
        return;
      }

      if (isEditPage) {
        const response = await api.post("user/ekantika/update", {
          ...formData,
          user_id: id,
        });

        if (!response.data.success) {
          addToast({
            type: "error",
            title: "Erro ao Editar",
            description:
              "Ocorreu um erro ao editar este colaborador, contate o suporte para mais informações.",
          });
          return;
        } else {
          addToast({
            type: "success",
            title: "Sucesso",
            description: "Este colaborador foi editado com sucesso.",
          });

          history.replace("/ekk/user/all");
        }
      } else {
        const response = await api.post("user/start", {
          ...formData,
          company_id,
        });
        console.log(response.data);

        if (!response.data.success) {
          addToast({
            type: "error",
            title: "Erro ao Salvar",
            description:
              "Ocorreu um erro ao cadastrar um novo colaborador, contate o suporte para mais informações.",
          });
          return;
        } else {
          addToast({
            type: "success",
            title: "Sucesso",
            description: "Um novo colaborador foi cadastrado no sistema.",
          });

          history.replace("/ekk/user/all");
        }
      }
    },
    [role, id, addToast, isEditPage, history]
  );

  const handleChangePasswordSubmit = useCallback(
    async (data: ChangePasswordProps) => {
      console.log(data);

      let err = false;
      let description;

      if (data.new_password !== data.new_password_repeat) {
        description = "As duas senhas não coincidem.";
        err = true;
      }

      if (!data.new_password || data.new_password.length === 0) {
        description = "A nova senha não pode ser nula.";
        err = true;
      }
      if (!data.new_password_repeat || data.new_password_repeat.length === 0) {
        description = "A confirmação de senha não pode ser nula.";
        err = true;
      }

      if (err) {
        addToast({
          type: "error",
          title: "Erro",
          description,
        });
        return;
      }

      const formData = {
        user_id: selectedUser.id,
        password: data.new_password,
      };

      const response = await api.post("user/update-password", formData);

      if (!response.data.success) {
        addToast({
          type: "error",
          title: "Erro ao Salvar",
          description:
            "Ocorreu um erro ao alterar a senha deste colaborador, contate o suporte para mais informações.",
        });
        return;
      } else {
        addToast({
          type: "success",
          title: "Sucesso",
          description: "Senha alterada com sucesso.",
        });
      }
      setOpenChangePasswordModal(false);
    },
    [addToast, selectedUser.id]
  );

  const handleImageChange = useCallback(
    async (userImg) => {
      let err = false;

      if (preview && userImg) {
        err = await imageUploadValidation({
          maxWidth: 144,
          maxHeight: 144,
          acceptedExtensions: [".png", ".jpg"],
          formatErrorMessage: "O formato da imagem precisa ser PNG.",
          file: userImg,
          imgPreview: preview,
          addToast,
        });
      }

      if (err) {
        return;
      }

      const data = new FormData();

      data.append("user_id", id);
      data.append("fileSend", userImg);

      const response = await api.post("user/avatar", data);

      if (response.data.success) {
        addToast({
          type: "success",
          title: "Sucesso",
          description: "Imagem salva com sucesso.",
        });

        if (id === user.id) {
          updateUser({
            ...user,
            photo: response.data.payload,
          });
        }
      } else {
        addToast({
          type: "error",
          title: "Erro ao Salvar",
          description:
            "Ocorreu um erro ao salvar esta imagem, contate o suporte para mais informações.",
        });
      }
    },
    [addToast, preview, id, user, updateUser]
  );

  const handleCameraClick = useCallback(() => {
    if (inputRef && inputRef.current) {
      inputRef.current.click();
    }
  }, [inputRef]);

  const handleInputChange = useCallback(
    (e) => {
      const { value, id } = e.target;

      setSelectedUser((prevState) => ({
        ...prevState,
        [id]: value,
      }));
    },
    [setSelectedUser]
  );

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <Container>
      <GobackDiv>
        <GoBackIcon onClick={handleGoBack} />
        <PageTitle
          title={
            selectedUser && selectedUser.name
              ? selectedUser.name
              : "Novo colaborador"
          }
        />
      </GobackDiv>

      <Grid container spacing={3}>
        <Grid item xs={4} sm={4} md={4} lg={3} xl={2}>
          <Paper
            containerStyle={{
              flexDirection: "column",
              padding: "2rem",
              height: "100%",
            }}
          >
            <div
              style={{
                margin: "auto 0",
                padding: "0 1rem",
              }}
            >
              <Form
                style={{
                  flexDirection: "column",
                  display: "flex",
                }}
                onSubmit={handleCameraClick}
              >
                <UserImg src={preview ? preview : userImg} alt="userImg" />

                <ImageInput
                  name="user"
                  setPreview={setPreview}
                  setInputRef={setInputRef}
                  onImageChange={handleImageChange}
                  containerStyle={{ display: "none" }}
                />

                <CameraBtn>
                  <CameraIcon />
                </CameraBtn>
              </Form>

              {isEditPage && (
                <Button
                  containerStyle={{ marginTop: "3rem" }}
                  btnColor="#FF2929"
                  outline
                  onClick={() => setOpenExcludeModal(true)}
                >
                  DELETAR USUÁRIO
                </Button>
              )}

              <Button
                outline={false}
                containerStyle={{ marginTop: "1.5rem" }}
                onClick={() => setOpenChangePasswordModal(true)}
              >
                ALTERAR SENHA
              </Button>
            </div>
          </Paper>
        </Grid>
        <Grid item xs={7} md={7} lg={6}>
          <Paper>
            <Form
              onSubmit={handleNewCollaboratorSubmit}
              style={{ width: "100%", padding: "2.4rem" }}
            >
              <ModalTitle>INFORMAÇÕES</ModalTitle>

              <Input
                name="name"
                id="name"
                placeholder="Nome completo"
                containerStyle={{ marginTop: "3rem" }}
                value={selectedUser.name}
                onChange={handleInputChange}
              />
              <Input
                name="email"
                id="email"
                containerStyle={{ width: "100%", marginTop: "2rem" }}
                placeholder="E-mail"
                value={selectedUser.email}
                onChange={handleInputChange}
              />
              {/* <Dropdown
                value={selectedFunction && selectedFunction}
                placeholder="Função"
                containerStyle={{ width: "100%", marginTop: "2rem" }}
                btnStyle={{ borderRadius: "10px" }}
                width="100%"
              >
                <DropdownItem
                  type="button"
                  onClick={() => setSelectedFunction("Consultor EKK")}
                >
                  Consultor EKK
                </DropdownItem>
                <DropdownItem
                  type="button"
                  onClick={() =>
                    setSelectedFunction("Gerenciamento de usuários")
                  }
                >
                  Gerenciamento de usuários
                </DropdownItem>
                <DropdownItem
                  type="button"
                  onClick={() => setSelectedFunction("SuperAdmin EKK")}
                >
                  SuperAdmin EKK
                </DropdownItem>
              </Dropdown> */}

              <Dropdown
                value={role && role.name}
                placeholder="Funções"
                containerStyle={{
                  width: "100%",
                  margin: "2rem 0 3rem",
                }}
                btnStyle={{
                  borderRadius: "10px",
                }}
                width="100%"
              >
                {roles.map((item) => (
                  <DropdownItem
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setRole(item);
                    }}
                  >
                    {item.name}
                  </DropdownItem>
                ))}
              </Dropdown>

              <Button type="submit" containerStyle={{ marginTop: "3rem" }}>
                SALVAR
              </Button>
            </Form>
          </Paper>
        </Grid>
      </Grid>

      <Modal
        open={openChangePasswordModal}
        setOpen={setOpenChangePasswordModal}
      >
        <ModalContainer>
          <Form onSubmit={handleChangePasswordSubmit}>
            <ModalTitle>ALTERAR SENHA</ModalTitle>

            <PasswordInput
              name="new_password"
              containerStyle={{ width: "35rem", marginTop: "2rem" }}
              placeholder="Digite a nova senha"
            />
            <PasswordInput
              name="new_password_repeat"
              containerStyle={{ width: "35rem", marginTop: "2rem" }}
              placeholder="Repita a nova senha"
            />

            <Button type="submit" containerStyle={{ marginTop: "3rem" }}>
              SALVAR
            </Button>
          </Form>
        </ModalContainer>
      </Modal>

      <Modal open={openExcludeModal} setOpen={setOpenExcludeModal}>
        <ModalContainer>
          <ModalTitle>Atenção</ModalTitle>
          <ModalDescription>
            Ao clicar em confirmar você excluirá o usuário "{selectedUser.name}"
            do sistema.
          </ModalDescription>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Button
              type="button"
              btnColor="#FF2929"
              outline
              onClick={handleExcludeUser}
              containerStyle={{ marginRight: "1.5rem", minWidth: "23rem" }}
            >
              CONFIRMAR EXCLUSÃO
            </Button>
            <Button
              type="button"
              containerStyle={{ minWidth: "23rem" }}
              onClick={() => setOpenExcludeModal(false)}
            >
              CANCELAR
            </Button>
          </div>
        </ModalContainer>
      </Modal>
    </Container>
  );
};

export default UserPage;
