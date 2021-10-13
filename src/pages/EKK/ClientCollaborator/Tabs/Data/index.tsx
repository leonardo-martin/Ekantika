import { Grid } from "@material-ui/core";
import { Form } from "@unform/web";
import { useCallback, useEffect, useState } from "react";
import { CityProps, StateProps, UserProps } from "../..";
import Button from "../../../../../components/Button";
import Dropdown from "../../../../../components/Dropdown";
import Input from "../../../../../components/Input";
import Paper from "../../../../../components/Paper";
import { useToast } from "../../../../../contexts/ToastContext";
import api from "../../../../../services/api";
import { telMask, zipcodeMask } from "../../../../../utils/masks";
import onlyNumbers from "../../../../../utils/onlyNumbers";
import { Container, DropdownItem, PaperTitle } from "./styles";

import DatePicker from "../../../../../components/DatePicker";
import AutoComplete from "../../../../../components/AutoComplete";
import { format } from "date-fns";
import validateEmail from "../../../../../utils/validateEmail";

interface DataProps {
  selectedUser: UserProps;
}

interface AddressProps {
  uf: string;
  logradouro: string;
  bairro: string;
  ddd: string;
  localidade: string;
  erro?: string;
}

interface DataUserProps {
  id: string;
  name: string;
  email: string;
  photo: string;
  birth_date: Date | null;
  zipcode: string;
  address: string;
  number: string;
  complement: string;
  neighborhood: string;
  city_id: string;
  cellphone: string;
  selectedCity: CityProps;
  selectedState: StateProps;
}

interface FormDataProps
  extends Omit<
    DataUserProps,
    "selectedCity" | "selectedState" | "photo" | "birth_date"
  > {
  selectedCity?: CityProps;
  selectedState?: StateProps;
  photo?: string;
  birth_date: Date | string;
  city: CityProps;
  district: StateProps;
}

const Data: React.FC<DataProps> = ({ selectedUser }) => {
  const [user, setUser] = useState<DataUserProps>({
    id: selectedUser.id,
    name: selectedUser.name,
    email: selectedUser.email,
    photo: selectedUser.photo,
    birth_date: selectedUser.geral.birth_date,
    zipcode: selectedUser.geral.zipcode,
    address: selectedUser.geral.address,
    number: selectedUser.geral.number,
    complement: selectedUser.geral.complement,
    neighborhood: selectedUser.geral.neighborhood,
    city_id: selectedUser.geral.city_id,
    cellphone: selectedUser.geral.cellphone,
    selectedCity: selectedUser.city,
    selectedState: selectedUser.district,
  } as DataUserProps);

  const [cities, setCities] = useState<CityProps[]>([]);
  const [states, setStates] = useState<StateProps[]>([]);

  const { addToast } = useToast();

  useEffect(() => {
    async function loadStates() {
      const countryId = 1; // Brazil

      const response = await api.get(`helper/state/${countryId}`);

      setStates(response.data.payload);
    }

    loadStates();
  }, [setStates]);

  useEffect(() => {
    async function loadCities() {
      const response = await api.get(`/helper/city/${user.selectedState.id}`);

      setCities(response.data.payload);
    }

    if (user.selectedState && user.selectedState.id) {
      loadCities();
    }
  }, [setCities, user.selectedState]);

  useEffect(() => {
    async function loadAddress() {
      const response = await api.get(`/helper/${user.zipcode}/cep`);

      const apiAddress: AddressProps = response.data.payload;

      if (Boolean(apiAddress.erro)) {
        return;
      }

      const stateFound = states.find((state) => state.uf === apiAddress.uf);

      if (stateFound) {
        setUser((prevState) => ({
          ...prevState,
          selectedState: stateFound,
        }));
      }
      const cityFound = cities.find(
        (city) => city.name === apiAddress.localidade
      );

      if (cityFound) {
        setUser((prevState) => ({
          ...prevState,
          selectedCity: cityFound,
        }));
      }

      setUser((prevState) => ({
        ...prevState,
        address: apiAddress.logradouro,
        neighborhood: apiAddress.bairro,
        cellphone:
          prevState.cellphone && prevState.cellphone.length !== 0
            ? prevState.cellphone
            : apiAddress.ddd,
      }));
    }

    if (user.zipcode && user.zipcode.length === 9) {
      loadAddress();
    }
  }, [user.zipcode, states, cities, setUser]);

  const handleSubmit = useCallback(async () => {
    let description;
    let err = false;

    if (!user.name) {
      description = "O Nome do usuário não pode ser nulo.";
      err = true;
    }

    if (!user.email) {
      description = "O E-mail do usuário não pode ser nulo.";
      err = true;
    }

    if (user.email && !validateEmail(user.email)) {
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

    let birth_date;

    if (typeof user.birth_date?.getMonth === "function") {
      birth_date = format(user.birth_date, "yyyy-MM-dd").toString();
    } else {
      birth_date = user.birth_date;
    }

    const formData: FormDataProps = {
      ...user,
      district: user.selectedState,
      city: user.selectedCity,
      birth_date: birth_date ?? "",
    };

    delete formData.selectedState;
    delete formData.selectedCity;
    delete formData.photo;

    const response = await api.post("user/start/update", formData);

    if (!response.data.success) {
      addToast({
        type: "error",
        title: "Erro ao Salvar",
        description:
          "Ocorreu um erro ao atualizar os dados deste usuário, contate o suporte para mais informações.",
      });
      return;
    } else {
      addToast({
        type: "success",
        title: "Sucesso",
        description: "Os dados deste usuário foram atualizados com sucesso.",
      });
    }
  }, [user, addToast]);

  const handleBirthDateChange = useCallback((date) => {
    setUser((prevState) => ({
      ...prevState,
      birth_date: date,
    }));
  }, []);

  const handleInputChange = useCallback((e) => {
    const { value, id } = e.target;

    setUser((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  }, []);

  const handleOnlyNumbersInputChange = useCallback((e) => {
    const { value, id } = e.target;

    setUser((prevState) => ({
      ...prevState,
      [id]: onlyNumbers(value),
    }));
  }, []);

  const handleMaskInputChange = useCallback((e) => {
    const { value, id } = e.target;

    if (id === "zipcode") {
      setUser((prevState) => ({
        ...prevState,
        [id]: zipcodeMask(value),
      }));
    }

    if (id === "cellphone") {
      setUser((prevState) => ({
        ...prevState,
        [id]: telMask(value),
      }));
    }
  }, []);

  return (
    <Container>
      <PaperTitle>Informações pessoais</PaperTitle>

      <Form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Input
              name="name"
              id="name"
              value={user.name}
              onChange={handleInputChange}
              placeholder="Nome completo"
            />
          </Grid>
          <Grid item xs={3}>
            <DatePicker
              placeholder="Data de nascimento"
              initialDate={user.birth_date}
              setDate={handleBirthDateChange}
            />
          </Grid>
          <Grid item xs={3}>
            <Input
              name="zipcode"
              id="zipcode"
              value={user.zipcode}
              onChange={handleMaskInputChange}
              maxLength={9}
              placeholder="CEP: 00000-000"
            />
          </Grid>
          <Grid item xs={6}>
            <Input
              name="address"
              id="address"
              value={user.address}
              onChange={handleInputChange}
              placeholder="Logradouro"
            />
          </Grid>

          <Grid item xs={1}>
            <Input
              name="number"
              id="number"
              value={user.number}
              onChange={handleOnlyNumbersInputChange}
              placeholder="Número"
            />
          </Grid>
          <Grid item xs={5}>
            <Input
              name="complement"
              id="complement"
              value={user.complement}
              onChange={handleInputChange}
              placeholder="Complemento"
            />
          </Grid>
          <Grid item xs={6}>
            <Input
              name="neighborhood"
              id="neighborhood"
              value={user.neighborhood}
              onChange={handleInputChange}
              placeholder="Bairro"
            />
          </Grid>

          <Grid item xs={1}>
            <Dropdown
              value={user.selectedState && user.selectedState.uf}
              placeholder="UF"
              containerStyle={{ width: "100%" }}
              btnStyle={{
                borderRadius: "10px",
              }}
              width="100%"
            >
              {states.map((state) => (
                <DropdownItem
                  key={state.id}
                  type="button"
                  onClick={() =>
                    setUser((prevState) => ({
                      ...prevState,
                      selectedState: state,
                    }))
                  }
                >
                  {state.uf}
                </DropdownItem>
              ))}
            </Dropdown>
          </Grid>
          <Grid item xs={5}>
            <Dropdown
              value={user.selectedCity && user.selectedCity.name}
              placeholder="Cidade"
              containerStyle={{ width: "100%" }}
              btnStyle={{
                borderRadius: "10px",
              }}
              width="100%"
            >
              {user.selectedState && !user.selectedState.id
                ? "Selecione uma UF"
                : cities.map((city) => (
                    <DropdownItem
                      key={city.id}
                      type="button"
                      onClick={() =>
                        setUser((prevState) => ({
                          ...prevState,
                          selectedCity: city,
                        }))
                      }
                    >
                      {city.name}
                    </DropdownItem>
                  ))}
            </Dropdown>
          </Grid>
          <Grid item xs={6}>
            <Input
              name="email"
              id="email"
              value={user.email}
              onChange={handleInputChange}
              placeholder="E-mail"
            />
          </Grid>

          <Grid item xs={6}>
            <Input
              name="cellphone"
              id="cellphone"
              value={user.cellphone}
              onChange={handleMaskInputChange}
              maxLength={14}
              placeholder="Telefone"
            />
          </Grid>
        </Grid>

        <Button
          width="28rem"
          containerStyle={{ marginTop: "2rem", marginLeft: "auto" }}
          type="submit"
        >
          SALVAR
        </Button>
      </Form>
    </Container>
  );
};

interface DataSubComponentProps {
  selectedUser: UserProps;
}

interface StatusProps {
  id: string;
  status: string;
}

interface SubComponentDataUserProps {
  id: string;
  enrollment: string;
  admission_date: Date | null;
  status_id: string;
  status: string;
  manager_id: string;
  manager_enrollment: string;
  manager_name: string;
  manager_email: string;
  workplace: string;
  company_role_id: string;
  company_area_id: string;
  company_id: string;
}

interface RoleProps {
  id: string;
  company_id: string;
  uuid: string;
  name: string;
  performance_type_id: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  type: string;
}

interface StructureProps {
  id: string;
  company_id: string;
  manager_id: string;
  parent_id: string;
  name: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  Manager: string;
}

interface ManagerProps {
  id: string;
  name: string;
  email: string;
  photo: string;
  company_id: string;
  acl_role_id: string;
  perfil: string;
  company_role_id: string;
  company_area_id: string;
  enrollment: string;
}

export const DataSubComponent: React.FC<DataSubComponentProps> = ({
  selectedUser,
}) => {
  const [user, setUser] = useState<SubComponentDataUserProps>({
    id: selectedUser.id,
    enrollment: selectedUser.profissional.enrollment,
    admission_date: selectedUser.profissional.admission_date,
    status_id: selectedUser.profissional.status_id,
    status: selectedUser.profissional.status,
    manager_enrollment: selectedUser.profissional.manager.enrollment,
    manager_email: selectedUser.profissional.manager.email,
    manager_id: selectedUser.profissional.manager.id,
    manager_name: selectedUser.profissional.manager.name,
    workplace: selectedUser.profissional.workplace,
    company_role_id: "",
    company_area_id: selectedUser.profissional.company_area_id,
    company_id: selectedUser.geral.company_id,
  } as SubComponentDataUserProps);

  const [statusList, setStatusList] = useState<StatusProps[]>([]);
  const [status, setStatus] = useState<StatusProps>({} as StatusProps);

  const [roles, setRoles] = useState<RoleProps[]>([] as RoleProps[]);
  const [filteredRoles, setFilteredRoles] = useState<RoleProps[]>(
    [] as RoleProps[]
  );
  const [role, setRole] = useState<RoleProps>({} as RoleProps);

  const [structures, setStructures] = useState<StructureProps[]>(
    [] as StructureProps[]
  );
  const [structure, setStructure] = useState<StructureProps>(
    {} as StructureProps
  );
  const [managers, setManagers] = useState<ManagerProps[]>(
    [] as ManagerProps[]
  );
  const [filteredManagers, setFilteredManagers] = useState<ManagerProps[]>(
    [] as ManagerProps[]
  );

  const { addToast } = useToast();

  //const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadStatus() {
      const response = await api.get("user/status");

      setStatusList(response.data.payload);
    }

    loadStatus();
  }, [setStatusList]);

  useEffect(() => {
    async function loadRoles() {
      const response = await api.post("cargo/list", {
        company_id: user.company_id,
      });

      if (response.data.payload) {
        const selectedRole = response.data.payload.find(
          (item: any) => item.id === selectedUser.profissional.company_role_id
        );

        if (selectedRole && selectedRole.uuid) {
          console.log(selectedRole);

          setUser((prevState) => ({
            ...prevState,
            company_role_id: selectedRole.uuid,
          }));

          setRole(selectedRole);
        }

        setRoles(response.data.payload);
        setFilteredRoles(response.data.payload);
      }
    }

    if (user.company_id) {
      loadRoles();
    }
  }, [setRoles, user.company_id, selectedUser.profissional.company_role_id]);

  useEffect(() => {
    async function loadStructures() {
      const response = await api.get(
        `company/${user.company_id}/structure/all`
      );

      if (response.data.payload) {
        setStructures(response.data.payload);
      }
    }

    if (user.company_id) {
      loadStructures();
    }
  }, [setStructures, user.company_id]);

  useEffect(() => {
    async function loadManagers() {
      const response = await api.get(`user/${user.company_id}/manager/list`);

      if (response.data.payload) {
        setManagers(response.data.payload);
        setFilteredManagers(response.data.payload);
      }
    }

    if (user.company_id) {
      loadManagers();
    }
  }, [setManagers, user.company_id]);

  useEffect(() => {
    console.log("user.company_role_id");
    console.log(user.company_role_id);

    console.log("roles");
    console.log(roles);

    if (roles.length > 0) {
      const userRole = roles.find((role) => role.id === user.company_role_id);

      if (userRole) {
        setRole(userRole);
      }
    }
  }, [roles, user.company_role_id]);

  useEffect(() => {
    console.log("user.status_id");
    console.log(user.status_id);

    console.log("statusList");
    console.log(statusList);

    if (statusList.length > 0) {
      const userStatus = statusList.find(
        (status) => status.id === user.status_id
      );

      if (userStatus) {
        setStatus(userStatus);
      }
    }
  }, [statusList, user.status_id]);

  useEffect(() => {
    if (structures.length > 0) {
      const userStructure = structures.find(
        (structure) => structure.id === user.company_area_id
      );

      if (userStructure) {
        setStructure(userStructure);
      }
    }
  }, [structures, user.company_area_id]);

  const handleAdmissaoChange = useCallback((date) => {
    setUser((prevState) => ({
      ...prevState,
      admission_date: date,
    }));
  }, []);

  const handleSubmit = useCallback(async () => {
    let description;
    let err = false;

    let admission_date;

    if (typeof user.admission_date?.getMonth === "function") {
      admission_date = format(user.admission_date, "yyyy-MM-dd").toString();
    } else {
      admission_date = user.admission_date;
    }

    const formData = {
      user_id: user.id,
      enrollment: user.enrollment ?? "",
      admission_date: admission_date ?? "",
      status_id: status.id ?? "",
      company_role_id: role.id ?? "",
      company_area_id: structure.id ?? "",
      workplace: user.workplace ?? "",
      manager_id: user.manager_id ?? "",
    };

    if (!formData.enrollment) {
      description = "Matrícula não pode ser nula.";
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

    console.log(formData);

    const response = await api.post("user/update-professional", formData);

    if (!response.data.success) {
      addToast({
        type: "error",
        title: "Erro ao Salvar",
        description:
          "Ocorreu um erro ao atualizar os dados deste usuário, contate o suporte para mais informações.",
      });
      return;
    } else {
      addToast({
        type: "success",
        title: "Sucesso",
        description: "Os dados deste usuário foram atualizados com sucesso.",
      });
    }
  }, [user, addToast, status.id, role.id, structure.id]);

  const handleManagerSelection = useCallback(
    (selectedManager) => {
      const filteredManagersList = managers.filter((manager) =>
        manager.id
          .toLocaleLowerCase()
          .includes(selectedManager.id.toLocaleLowerCase())
      );

      setFilteredManagers(filteredManagersList);

      setUser((prevState) => ({
        ...prevState,
        manager_id:
          filteredManagersList.length === 1
            ? filteredManagersList[0].id
            : prevState.manager_id,
        manager_enrollment:
          filteredManagersList.length === 1
            ? filteredManagersList[0].enrollment
            : prevState.manager_enrollment,
        manager_email:
          filteredManagersList.length === 1
            ? filteredManagersList[0].email
            : prevState.manager_email,
        manager_name:
          filteredManagersList.length === 1
            ? filteredManagersList[0].name
            : prevState.manager_name,
      }));
    },
    [managers]
  );

  const handleManagerInputChange = useCallback(
    (e) => {
      const { value, id } = e.target;

      if (id === "manager_enrollment") {
        const filteredManagersList = managers.filter((manager) =>
          manager.enrollment
            .toLocaleLowerCase()
            .includes(value.toLocaleLowerCase())
        );

        setFilteredManagers(filteredManagersList);

        setUser((prevState) => ({
          ...prevState,
          [id]: value,
          manager_id:
            filteredManagersList.length === 1
              ? filteredManagersList[0].id
              : prevState.manager_id,
          manager_email:
            filteredManagersList.length === 1
              ? filteredManagersList[0].email
              : prevState.manager_email,
          manager_name:
            filteredManagersList.length === 1
              ? filteredManagersList[0].name
              : prevState.manager_name,
        }));
      }

      if (id === "manager_email") {
        const filteredManagersList = managers.filter((manager) =>
          manager.email.toLocaleLowerCase().includes(value.toLocaleLowerCase())
        );

        setFilteredManagers(filteredManagersList);

        setUser((prevState) => ({
          ...prevState,
          [id]: value,
          manager_id:
            filteredManagersList.length === 1
              ? filteredManagersList[0].id
              : prevState.manager_id,
          manager_enrollment:
            filteredManagersList.length === 1
              ? filteredManagersList[0].enrollment
              : prevState.manager_enrollment,
          manager_name:
            filteredManagersList.length === 1
              ? filteredManagersList[0].name
              : prevState.manager_name,
        }));
      }

      if (id === "manager_name") {
        const filteredManagersList = managers.filter((manager) =>
          manager.name.toLocaleLowerCase().includes(value.toLocaleLowerCase())
        );

        setFilteredManagers(filteredManagersList);

        setUser((prevState) => ({
          ...prevState,
          [id]: value,
          manager_id:
            filteredManagersList.length === 1
              ? filteredManagersList[0].id
              : prevState.manager_id,
          manager_enrollment:
            filteredManagersList.length === 1
              ? filteredManagersList[0].enrollment
              : prevState.manager_enrollment,
          manager_email:
            filteredManagersList.length === 1
              ? filteredManagersList[0].email
              : prevState.manager_email,
        }));
      }
    },
    [managers]
  );

  const handleInputChange = useCallback((e) => {
    const { value, id } = e.target;

    setUser((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  }, []);

  const handleOnlyNumbersInputChange = useCallback((e) => {
    const { value, id } = e.target;

    setUser((prevState) => ({
      ...prevState,
      [id]: onlyNumbers(value),
    }));
  }, []);

  const handleRoleChange = useCallback(
    (e) => {
      const { value, id } = e.target;

      if (!/[^0-9]/g.test(value)) {
        const filteredRoleList = roles.filter((role) =>
          role.uuid.toLocaleLowerCase().includes(value.toLocaleLowerCase())
        );

        console.log(filteredRoleList);

        setUser((prevState) => ({
          ...prevState,
          [id]: onlyNumbers(value),
        }));

        if (filteredRoleList.length === 1) {
          setRole(filteredRoleList[0]);
        } else if (filteredRoleList.length === 0) {
          setRole({} as RoleProps);
        }

        setFilteredRoles(filteredRoleList);
      }
    },
    [roles]
  );

  return (
    <>
      <Paper
        containerStyle={{
          width: "100%",
          padding: "5rem 4.5rem",
          flexDirection: "column",
        }}
      >
        <PaperTitle>Informações Profissionais</PaperTitle>

        <Form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column" }}
        >
          <Grid container spacing={3}>
            <Grid item xs={3}>
              <Input
                name="enrollment"
                id="enrollment"
                value={user.enrollment}
                onChange={handleOnlyNumbersInputChange}
                placeholder="Matrícula"
              />
            </Grid>

            <Grid item xs={3}>
              <DatePicker
                placeholder="Data de admissão"
                initialDate={user.admission_date}
                setDate={handleAdmissaoChange}
              />
            </Grid>
            <Grid item xs={3}>
              <Dropdown
                value={status.status && status.status}
                placeholder="Status"
                containerStyle={{ width: "100%" }}
                btnStyle={{ borderRadius: "10px" }}
                width="100%"
              >
                {statusList.map((stats) => (
                  <DropdownItem
                    key={stats.id}
                    type="button"
                    onClick={() => {
                      // setar no user tbm

                      setStatus(stats);
                    }}
                  >
                    {stats.status}
                  </DropdownItem>
                ))}
              </Dropdown>
            </Grid>
            <Grid item xs={3}>
              <Dropdown
                value={structure && structure.name}
                placeholder="Estrutura organizacional"
                containerStyle={{ width: "100%" }}
                btnStyle={{ borderRadius: "10px" }}
                width="100%"
              >
                {structures.map((item) => (
                  <DropdownItem
                    key={item.id}
                    type="button"
                    onClick={() => {
                      // setar no user tbm
                      setStructure(item);
                    }}
                  >
                    {item.name}
                  </DropdownItem>
                ))}
              </Dropdown>
            </Grid>
            <Grid item xs={2}>
              <Input
                name="company_role_id"
                id="company_role_id"
                placeholder="Código do cargo"
                value={user.company_role_id}
                onChange={handleRoleChange}
              />
            </Grid>
            <Grid item xs={3}>
              <Dropdown
                value={role && role.name}
                placeholder="Cargo"
                containerStyle={{ width: "100%" }}
                btnStyle={{ borderRadius: "10px" }}
                width="100%"
              >
                {filteredRoles.map((item) => (
                  <DropdownItem
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setRole(item);

                      setUser((prevState) => ({
                        ...prevState,
                        company_role_id: item.uuid,
                      }));
                    }}
                  >
                    {item.name}
                  </DropdownItem>
                ))}
              </Dropdown>
            </Grid>

            <Grid item xs={2}>
              <AutoComplete
                items={filteredManagers.map((manager) => ({
                  id: manager.id,
                  value: manager.enrollment,
                }))}
                placeholder="Matrícula gestor"
                name="manager_enrollment"
                id="manager_enrollment"
                selectedItem={{
                  id: user.manager_id,
                  value: user.manager_enrollment,
                }}
                handleChange={handleManagerInputChange}
                setSelectedItem={handleManagerSelection}
              />
            </Grid>
            <Grid item xs={2}>
              <AutoComplete
                items={filteredManagers.map((manager) => ({
                  id: manager.id,
                  value: manager.email,
                }))}
                placeholder="E-mail gestor"
                name="manager_email"
                id="manager_email"
                selectedItem={{
                  id: user.manager_id,
                  value: user.manager_email,
                }}
                handleChange={handleManagerInputChange}
                setSelectedItem={handleManagerSelection}
              />
            </Grid>
            <Grid item xs={3}>
              <AutoComplete
                items={filteredManagers.map((manager) => ({
                  id: manager.id,
                  value: manager.name,
                }))}
                placeholder="Gestor direto"
                name="manager_name"
                id="manager_name"
                selectedItem={{
                  id: user.manager_id,
                  value: user.manager_name,
                }}
                handleChange={handleManagerInputChange}
                setSelectedItem={handleManagerSelection}
              />
            </Grid>
            <Grid item xs={12}>
              <Input
                name="workplace"
                id="workplace"
                placeholder="Local de trabalho"
                value={user.workplace}
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>

          <Button
            width="28rem"
            containerStyle={{ marginTop: "2rem", marginLeft: "auto" }}
            type="submit"
          >
            SALVAR
          </Button>
        </Form>
      </Paper>
    </>
  );
};

export default Data;
