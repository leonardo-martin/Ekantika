import React, {
  useCallback,
  useMemo,
  useEffect,
  useState,
  RefObject,
} from "react";
import { useHistory, useParams } from "react-router-dom";
import { Form } from "@unform/web";

import Paper from "../../../components/Paper";
import Button from "../../../components/Button";
import ImageInput from "../../../components/ImageInput";
import Modal from "../../../components/Modal";
import PageTitle from "../../../components/PageTitle";
import Tabs from "../../../components/Tabs";
import LoadingScreen from "../../../components/LoadingScreen";
import PasswordInput from "../../../components/PasswordInput";

import imageUploadValidation from "../../../utils/imageUploadValidation";

import { Grid } from "@material-ui/core";
import userImg from "../../../assets/icons/user-placeholder.svg";

import Teams from "./Tabs/Teams";
import Data, { DataSubComponent } from "./Tabs/Data";

import api, { baseURL } from "../../../services/api";
import { useToast } from "../../../contexts/ToastContext";

import {
  Container,
  UserImg,
  GobackDiv,
  GoBackIcon,
  CameraBtn,
  CameraIcon,
  ModalContainer,
  ModalTitle,
} from "./styles";
import { useAuth } from "../../../contexts/AuthContext";

interface ChangePasswordProps {
  new_password: string;
  new_password_repeat: string;
}

export interface CityProps {
  id: string;
  name: string;
  slug: string;
}

export interface StateProps {
  id: string;
  name: string;
  uf: string;
  slug: string;
}

export interface UserProps {
  id: string;
  name: string;
  email: string;
  photo: string;
  geral: {
    company_id: string;
    birth_date: Date | null;
    zipcode: string;
    address: string;
    number: string;
    complement: string;
    neighborhood: string;
    city_id: string;
    cellphone: string;
    district: string;
  };
  profissional: {
    enrollment: string;
    admission_date: Date | null;
    status_id: string;
    status: string;
    manager_id: string;
    workplace: string;
    professional_summary: string;
    professional_targets: string;
    company_role_id: string;
    company_area_id: string;
    company_role: {
      id: string;
      name: string;
      performance_type_id: string;
    };
    company_area: {
      id: string;
      manager_id: string;
      name: string;
    };
    manager: {
      id: string;
      name: string;
      email: string;
      photo: string;
      manager_id: string;
      company_id: string;
      city_id: string;
      user_id: string;
      status_id: string;
      enrollment: string;
      admission_date: string;
      birth_date: string;
      workplace: string;
      professional_summary: string;
      professional_targets: string;
      salary: string;
      zipcode: string;
      address: string;
      number: string;
      complement: string;
      neighborhood: string;
      district: string;
      cellphone: string;
      created_at: string;
      updated_at: string;
      company_role_id: string;
      company_area_id: string;
      acl_role_id: string;
    };
  };
  perfil: {
    id: string;
    name: string;
    slug: string;
    description: string;
    plan_id: string;
  };
  city: CityProps;
  district: StateProps;
}

interface ParamProps {
  id: string;
}

const ClientNew: React.FC = () => {
  const [inputRef, setInputRef] = useState<RefObject<HTMLInputElement> | null>(
    null
  );

  const [preview, setPreview] = useState<string | null>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedUser, setSelectedUser] = useState<UserProps>({} as UserProps);
  const [openChangePasswordModal, setOpenChangePasswordModal] =
    useState<boolean>(false);

  const history = useHistory();
  const { addToast } = useToast();
  const { id: userId } = useParams<ParamProps>();
  const { updateUser, user } = useAuth();

  useEffect(() => {
    async function loadUser() {
      const response = await api.get(`user/${userId}/info`);

      console.log(response.data.payload);

      if (response.data.success) {
        const userData = { ...response.data.payload };

        let birthDate = new Date(userData.geral.birth_date);
        let admissionDate = new Date(userData.profissional.admission_date);

        birthDate.setDate(birthDate.getDate() + 1);
        admissionDate.setDate(admissionDate.getDate() + 1);

        setSelectedUser({
          ...userData,
          geral: {
            ...userData.geral,
            birth_date: userData.geral.birth_date ? new Date(birthDate) : null,
          },
          profissional: {
            ...userData.profissional,
            admission_date: userData.profissional.admission_date
              ? new Date(admissionDate)
              : null,
          },
        });

        if (response.data.payload.photo) {
          setPreview(baseURL + response.data.payload.photo);
        }

        setLoading(false);
      }
    }

    loadUser();
  }, [userId]);

  const handleGoBack = useCallback(() => {
    history.goBack();
  }, [history]);

  const tabs = useMemo(
    () => [
      {
        title: "Dados",
        mainComponent: <Data selectedUser={selectedUser} />,
        subComponent: <DataSubComponent selectedUser={selectedUser} />,
      },
      {
        title: "Times",
        mainComponent: <Teams selectedUser={selectedUser} />,
      },
    ],
    [selectedUser]
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
        user_id: userId,
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
    [addToast, userId]
  );

  const handleImageChange = useCallback(
    async (userImg) => {
      let err = false;

      if (preview && userImg) {
        // err = await imageUploadValidation({
        //   maxWidth: 144,
        //   maxHeight: 144,
        //   acceptedExtensions: [".png", ".jpg"],
        //   formatErrorMessage: "O formato da imagem precisa ser PNG ou JPG.",
        //   file: userImg,
        //   imgPreview: preview,
        //   addToast,
        // });
      }

      if (err) {
        return;
      }

      if (selectedUser && selectedUser.id) {
        const data = new FormData();

        data.append("user_id", selectedUser.id);
        data.append("fileSend", userImg);

        const response = await api.post("user/avatar", data);

        if (response.data.success) {
          addToast({
            type: "success",
            title: "Sucesso",
            description: "Imagem salva com sucesso.",
          });

          if (selectedUser.id === user.id) {
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
      }
    },
    [addToast, preview, selectedUser, updateUser, user]
  );

  const handleCameraClick = useCallback(() => {
    if (inputRef && inputRef.current) {
      inputRef.current.click();
    }
  }, [inputRef]);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <Container>
      <GobackDiv>
        <GoBackIcon onClick={handleGoBack} />
        <PageTitle title={selectedUser.name} />
      </GobackDiv>

      <Grid container spacing={3}>
        <Grid item xs={2}>
          <Paper containerStyle={{ flexDirection: "column", padding: "2rem" }}>
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

            <Button
              outline
              containerStyle={{ marginTop: "3rem" }}
              onClick={() => setOpenChangePasswordModal(true)}
            >
              ALTERAR SENHA
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={10}>
          <Tabs tabs={tabs} />
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
    </Container>
  );
};

export default ClientNew;
