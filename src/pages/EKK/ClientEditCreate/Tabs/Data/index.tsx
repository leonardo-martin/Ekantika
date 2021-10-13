import { RefObject, useCallback, useEffect, useState, useRef } from "react";
import { Grid } from "@material-ui/core";
import { Form } from "@unform/web";
import { FormHandles } from "@unform/core";

import Button from "../../../../../components/Button";
import Dropdown from "../../../../../components/Dropdown";
import Input from "../../../../../components/Input";
import { zipcodeMask, telMask, cnpjMask } from "../../../../../utils/masks";
import validateEmail from "../../../../../utils/validateEmail";

import {
  Container,
  SubComponentContainer,
  DropdownItem,
  ModalContainer,
  ModalTitle,
  ModalDescription,
} from "./styles";
import api from "../../../../../services/api";
import { useToast } from "../../../../../contexts/ToastContext";
import { useHistory, useLocation } from "react-router-dom";
import onlyNumbers from "../../../../../utils/onlyNumbers";
import { useCompany } from "../../contexts/CompanyContext";
import Modal from "../../../../../components/Modal";
import validateURL from "../../../../../utils/validateURL";

interface DataProps {
  setFormReference: (formRef: RefObject<FormHandles>) => void;
  setActiveAllTabs: (bool: boolean) => void;
  setIsEditPage: (bool: boolean) => void;
  isEditPage: boolean;
}

interface SectorProps {
  id: string;
  name: string;
}

interface TypeProps {
  id: string;
  name: string;
  slug: string;
}

interface CityProps {
  id: string;
  name: string;
  slug: string;
}

interface StateProps {
  id: string;
  name: string;
  uf: string;
  slug: string;
}

interface AddressProps {
  uf: string;
  logradouro: string;
  bairro: string;
  ddd: string;
  localidade: string;
  erro?: string;
}

interface FormDataProps {
  cnpj: string;
  name?: string;
  parent_id: string;
  social_reason: string | undefined;
  fantasy_name: string;
  zipcode: string;
  address: string;
  number: string;
  complement: string;
  state_registration: string;
  telephone: string;
  website: string;
  responsible_name: string;
  responsible_email: string;
  neighborhood: string;
  sector_id?: string;
  type_id?: string;
  city_id?: string;
  district?: string;
}

interface CompanyHierarchyProps {
  id: string;
  name: string;
  fantasy_name: string;
  parent_id?: string;
  TipoName: string;
}

interface CompanyProps {
  address: string;
  cnpj: string;
  neighborhood: string;
  number: string;
  zipcode: string;
  telephone: string;
  state_registration: string;
  responsible_name: string;
  responsible_email: string;
  website: string;
  social_reason: string;
  fantasy_name: string;
  complement: string;
  parent_id?: string;
  selectedSector: SectorProps;
  selectedType: TypeProps;
  selectedCity: CityProps;
  selectedState: StateProps;
}

interface LocationState {
  holdingId?: string;
}

const Data: React.FC<DataProps> = ({ setFormReference, isEditPage }) => {
  const formEl = useRef<FormHandles>(null);
  const history = useHistory();

  const { addToast } = useToast();
  const { currentCompany, updateCompany } = useCompany();

  const [sectors, setSectors] = useState<SectorProps[]>([]);
  const [types, setTypes] = useState<TypeProps[]>([]);
  const [cities, setCities] = useState<CityProps[]>([]);
  const [states, setStates] = useState<StateProps[]>([]);

  const [selectedParent, setSelectedParent] = useState<CompanyHierarchyProps>(
    {} as CompanyHierarchyProps
  );
  const [companiesHierarchy, setCompaniesHierarchy] = useState<
    CompanyHierarchyProps[]
  >([] as CompanyHierarchyProps[]);

  const [selectedCompany, setSelectedCompany] = useState<CompanyProps>(
    {} as CompanyProps
  );

  const location = useLocation();

  useEffect(() => {
    if (currentCompany) {
      const {
        address,
        cnpj,
        neighborhood,
        number,
        zipcode,
        telephone,
        state_registration,
        sector: selectedSector,
        type: selectedType,
        city: selectedCity,
        district: selectedState,
        responsible_name,
        responsible_email,
        website,
        name: social_reason,
        fantasy_name,
        complement,
        parent_id,
      } = currentCompany;

      setSelectedCompany({
        address,
        cnpj,
        neighborhood,
        number,
        zipcode,
        telephone,
        state_registration,
        responsible_name,
        responsible_email,
        website,
        social_reason,
        fantasy_name,
        complement,
        selectedSector,
        selectedType,
        selectedCity,
        selectedState,
        parent_id,
      });
    }
  }, [currentCompany, setSelectedCompany]);

  useEffect(() => {
    async function loadSectors() {
      const response = await api.get("company/sector");

      setSectors(response.data.payload);
    }

    loadSectors();
  }, [setSectors]);

  useEffect(() => {
    async function loadCompanyHierarchy(holdingId: string) {
      const response = await api.get(`company/${holdingId}/hierarquia/all`);

      if (response.data.success) {
        if (response.data.payload) {
          if (Array.isArray(response.data.payload)) {
            const availableHierarchy = response.data.payload.filter(
              (company: any) => company.id !== currentCompany.id
            );

            setCompaniesHierarchy(availableHierarchy);
          }
        }
      }
    }

    if (location.state) {
      const { holdingId } = location.state as LocationState;
      if (holdingId) {
        loadCompanyHierarchy(holdingId);
      }
    }
  }, [location.state, currentCompany.id]);

  useEffect(() => {
    async function loadTypes() {
      const response = await api.get("company/type");

      let types = response.data.payload;

      if (isEditPage && currentCompany.parent_id) {
        types = types.filter((type: TypeProps) => type.name !== "Holding");
      } else {
        types = types.filter((type: TypeProps) => type.name === "Holding");
      }

      setTypes(types);
    }

    loadTypes();
  }, [setTypes, isEditPage, currentCompany]);

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
      const response = await api.get(
        `/helper/city/${selectedCompany.selectedState.id}`
      );

      setCities(response.data.payload);
    }

    if (selectedCompany.selectedState && selectedCompany.selectedState.id) {
      loadCities();
    }
  }, [setCities, selectedCompany.selectedState]);

  useEffect(() => {
    if (location.state) {
      const { holdingId } = location.state as LocationState;

      if (holdingId) {
        updateCompany({ holdingId });
      }
    }
  }, [location.state, updateCompany]);

  useEffect(() => {
    async function loadSelectedParent() {
      const superiorCompany = companiesHierarchy.find(
        (parent) => parent.id === selectedCompany.parent_id
      );

      console.log("aqui", superiorCompany);
      console.log(companiesHierarchy);

      if (superiorCompany) {
        setSelectedParent(superiorCompany);
      }
    }

    if (selectedCompany.parent_id && companiesHierarchy) {
      loadSelectedParent();
    }
  }, [selectedCompany.parent_id, companiesHierarchy]);

  useEffect(() => {
    if (formEl !== null) {
      setFormReference(formEl);
    }
  }, [formEl, setFormReference]);

  useEffect(() => {
    async function loadAddress() {
      const response = await api.get(`/helper/${selectedCompany.zipcode}/cep`);

      const apiAddress: AddressProps = response.data.payload;

      if (Boolean(apiAddress.erro)) {
        return;
      }

      const stateFound = states.find((state) => state.uf === apiAddress.uf);

      if (stateFound) {
        setSelectedCompany((prevState) => ({
          ...prevState,
          selectedState: stateFound,
        }));
      }
      const cityFound = cities.find(
        (city) => city.name === apiAddress.localidade
      );

      if (cityFound) {
        setSelectedCompany((prevState) => ({
          ...prevState,
          selectedCity: cityFound,
        }));
      }

      setSelectedCompany((prevState) => ({
        ...prevState,
        address: apiAddress.logradouro,
        neighborhood: apiAddress.bairro,
        telephone:
          prevState.telephone.length !== 0
            ? prevState.telephone
            : apiAddress.ddd,
      }));
    }

    if (selectedCompany.zipcode && selectedCompany.zipcode.length === 9) {
      loadAddress();
    }
  }, [selectedCompany.zipcode, states, cities, setSelectedCompany]);

  const handleSubmit = useCallback(
    async (data: FormDataProps) => {
      const formData: FormDataProps = {
        ...data,
        name: data.social_reason,
        sector_id: selectedCompany.selectedSector.id,
        type_id: selectedCompany.selectedType.id,
        city_id: selectedCompany.selectedCity.id,
        district: selectedCompany.selectedState.id,
        parent_id: selectedCompany.parent_id ?? "",
      };

      delete formData.social_reason;

      let err = false;
      let description = "";

      if (data.social_reason === "") {
        description = "Razão social não pode ser nula.";
        err = true;
      }
      if (data.fantasy_name === "") {
        description = "Nome Fantasia não pode ser nulo.";
        err = true;
      }
      if (data.cnpj === "") {
        description = "CNPJ não pode ser nulo.";
        err = true;
      }
      if (data.type_id === "") {
        description = "O tipo não pode ser nulo.";
        err = true;
      }
      if (data.cnpj && data.cnpj.length < 18) {
        description = "CNPJ incompleto.";
        err = true;
      }
      if (data.zipcode && data.zipcode.length < 9) {
        description = "CEP incompleto.";
        err = true;
      }

      if (data.responsible_email && !validateEmail(data.responsible_email)) {
        description = "E-mail inválido.";
        err = true;
      }

      if (data.website && !validateURL(data.website)) {
        description = "Website inválido.";
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

      if (isEditPage) {
        const response = await api.post("company/dados/update", {
          ...formData,
          company_id: currentCompany.id,
        });

        console.log(response.data);

        if (!response.data.success) {
          addToast({
            type: "error",
            title: "Erro ao Salvar",
            description:
              "Ocorreu um erro ao atualizar os dados dessa companhia, contate o suporte para mais informações.",
          });
          return;
        } else {
          delete formData.sector_id;
          delete formData.type_id;
          delete formData.city_id;
          delete formData.district;

          updateCompany({
            ...formData,
            city: selectedCompany.selectedCity,
            sector: selectedCompany.selectedSector,
            type: selectedCompany.selectedType,
            district: selectedCompany.selectedState,
          });

          addToast({
            type: "success",
            title: "Sucesso",
            description: "A atualização de dados foi salva com sucesso.",
          });
        }
      } else {
        const response = await api.post("company/dados", formData);

        if (response.data.payload === "CNPJ já cadastrado") {
          addToast({
            type: "error",
            title: "Erro no cadastro",
            description: "CNPJ já cadastrado.",
          });
          return;
        }

        if (!response.data.success) {
          addToast({
            type: "error",
            title: "Erro ao Salvar",
            description:
              "Ocorreu um erro ao salvar os dados dessa companhia, contate o suporte para mais informações.",
          });
          return;
        } else {
          addToast({
            type: "success",
            title: "Sucesso",
            description: "Uma nova empresa foi cadastrada no sistema.",
          });

          history.push(`/ekk/client/edit/${response.data.payload}`);
        }
      }
    },
    [
      history,
      addToast,
      updateCompany,
      isEditPage,
      currentCompany.id,
      selectedCompany.selectedSector,
      selectedCompany.selectedType,
      selectedCompany.selectedCity,
      selectedCompany.selectedState,
      selectedCompany.parent_id,
    ]
  );

  const handleInputChange = useCallback(
    (e) => {
      const { value, id } = e.target;

      setSelectedCompany((prevState) => ({
        ...prevState,
        [id]: value,
      }));
    },
    [setSelectedCompany]
  );

  const handleOnlyNumbersInputChange = useCallback((e) => {
    const { value, id } = e.target;

    setSelectedCompany((prevState) => ({
      ...prevState,
      [id]: onlyNumbers(value),
    }));
  }, []);

  const handleMaskInputChange = useCallback((e) => {
    const { value, id } = e.target;

    if (id === "cnpj") {
      setSelectedCompany((prevState) => ({
        ...prevState,
        [id]: cnpjMask(value),
      }));
    }

    if (id === "zipcode") {
      setSelectedCompany((prevState) => ({
        ...prevState,
        [id]: zipcodeMask(value),
      }));
    }

    if (id === "telephone") {
      setSelectedCompany((prevState) => ({
        ...prevState,
        [id]: telMask(value),
      }));
    }
  }, []);

  return (
    <Container>
      <Form ref={formEl} onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={6} sm={4}>
            <Input
              name="cnpj"
              id="cnpj"
              placeholder="CNPJ"
              value={selectedCompany.cnpj}
              maxLength={18}
              onChange={handleMaskInputChange}
            />
          </Grid>
          <Grid item xs={6} sm={4}>
            <Input
              name="state_registration"
              id="state_registration"
              maxLength={9}
              placeholder="Inscrição Estadual"
              value={selectedCompany.state_registration}
              onChange={handleOnlyNumbersInputChange}
            />
          </Grid>
          <Grid item xs={6} sm={4} md={2}>
            <Dropdown
              value={
                selectedCompany.selectedType &&
                selectedCompany.selectedType.name
              }
              placeholder="Tipo"
              containerStyle={{
                width: "100%",
              }}
              btnStyle={{
                borderRadius: "10px",
              }}
              width="100%"
            >
              {types.map((type) => (
                <DropdownItem
                  key={type.id}
                  type="button"
                  onClick={() =>
                    setSelectedCompany((prevState) => ({
                      ...prevState,
                      selectedType: type,
                    }))
                  }
                >
                  {type.name}
                </DropdownItem>
              ))}
            </Dropdown>
          </Grid>
          <Grid item xs={6} sm={4} md={2}>
            <Dropdown
              value={
                selectedCompany.selectedSector &&
                selectedCompany.selectedSector.name
              }
              placeholder="Setor"
              containerStyle={{ width: "100%" }}
              btnStyle={{
                borderRadius: "10px",
              }}
              width="100%"
            >
              {sectors.map((sector) => (
                <DropdownItem
                  key={sector.id}
                  type="button"
                  onClick={() =>
                    setSelectedCompany((prevState) => ({
                      ...prevState,
                      selectedSector: sector,
                    }))
                  }
                >
                  {sector.name}
                </DropdownItem>
              ))}
            </Dropdown>
          </Grid>

          <Grid item xs={6} sm={4}>
            <Input
              name="social_reason"
              id="social_reason"
              value={selectedCompany.social_reason}
              onChange={handleInputChange}
              placeholder="Razão Social"
            />
          </Grid>
          <Grid item xs={6} sm={4}>
            <Input
              name="fantasy_name"
              id="fantasy_name"
              value={selectedCompany.fantasy_name}
              onChange={handleInputChange}
              placeholder="Nome Fantasia"
            />
          </Grid>
          <Grid item xs={6} sm={4}>
            <Input
              name="telephone"
              id="telephone"
              value={selectedCompany.telephone}
              maxLength={14}
              onChange={handleMaskInputChange}
              placeholder="Telefone"
            />
          </Grid>

          <Grid item xs={6} sm={4}>
            <Input
              name="responsible_name"
              id="responsible_name"
              value={selectedCompany.responsible_name}
              onChange={handleInputChange}
              placeholder="Responsável"
            />
          </Grid>
          <Grid item xs={6} sm={4}>
            <Input
              name="responsible_email"
              id="responsible_email"
              value={selectedCompany.responsible_email}
              onChange={handleInputChange}
              placeholder="E-mail"
            />
          </Grid>
          <Grid item xs={6} sm={4}>
            <Input
              name="website"
              id="website"
              value={selectedCompany.website}
              onChange={handleInputChange}
              placeholder="Site"
            />
          </Grid>

          <Grid item xs={6} sm={4} md={2}>
            <Input
              name="zipcode"
              id="zipcode"
              placeholder="CEP"
              value={selectedCompany.zipcode}
              maxLength={9}
              onChange={handleMaskInputChange}
            />
          </Grid>
          <Grid item xs={6} sm={4} md={2}>
            <Input
              name="address"
              id="address"
              value={selectedCompany.address}
              onChange={handleInputChange}
              placeholder="Logradouro"
            />
          </Grid>
          <Grid item xs={6} sm={4} md={2}>
            <Input
              name="neighborhood"
              id="neighborhood"
              value={selectedCompany.neighborhood}
              onChange={handleInputChange}
              placeholder="Bairro"
            />
          </Grid>
          <Grid item xs={6} sm={4} md={2}>
            <Input
              name="complement"
              id="complement"
              value={selectedCompany.complement}
              onChange={handleInputChange}
              placeholder="Complemento (Opicional)"
            />
          </Grid>
          <Grid item xs={6} sm={2} md={1}>
            <Input
              name="number"
              id="number"
              value={selectedCompany.number}
              onChange={handleOnlyNumbersInputChange}
              placeholder="Número"
            />
          </Grid>
          <Grid item xs={6} sm={2} md={1}>
            <Dropdown
              value={
                selectedCompany.selectedState &&
                selectedCompany.selectedState.uf
              }
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
                    setSelectedCompany((prevState) => ({
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
          <Grid item xs={6} sm={4} md={2}>
            <Dropdown
              value={
                selectedCompany.selectedCity &&
                selectedCompany.selectedCity.name
              }
              placeholder="Cidade"
              containerStyle={{ width: "100%" }}
              btnStyle={{
                borderRadius: "10px",
              }}
              width="100%"
            >
              {selectedCompany.selectedState &&
              !selectedCompany.selectedState.id
                ? "Selecione uma UF"
                : cities.map((city) => (
                    <DropdownItem
                      key={city.id}
                      type="button"
                      onClick={() =>
                        setSelectedCompany((prevState) => ({
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
          {currentCompany.holdingId !== currentCompany.id && (
            <Grid item xs={6} sm={4}>
              <Dropdown
                value={
                  selectedParent.fantasy_name && selectedParent.fantasy_name
                }
                placeholder="Companhia superior"
                containerStyle={{ width: "100%" }}
                btnStyle={{
                  borderRadius: "10px",
                }}
                width="100%"
              >
                {companiesHierarchy.map((item) => (
                  <DropdownItem
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setSelectedParent(item);

                      setSelectedCompany((prevState) => ({
                        ...prevState,
                        parent_id: item.id,
                      }));
                    }}
                  >
                    {item.fantasy_name}
                  </DropdownItem>
                ))}
              </Dropdown>
            </Grid>
          )}
        </Grid>
      </Form>
    </Container>
  );
};

interface DataSubComponentProps {
  isEditPage: boolean;
  formRef?: RefObject<FormHandles> | undefined | null;
}

export const DataSubComponent: React.FC<DataSubComponentProps> = ({
  formRef,
  isEditPage,
}) => {
  const [openExcludeModal, setOpenExcludeModal] = useState(false);

  const { currentCompany } = useCompany();
  const { addToast } = useToast();
  const history = useHistory();

  const handleExclude = useCallback(async () => {
    const response = await api.post("company/delete", {
      company_id: currentCompany.id,
    });

    if (!response.data.success) {
      addToast({
        type: "error",
        title: "Erro",
        description:
          "Ocorreu um erro ao excluir essa companhia, contate o suporte para mais informações.",
      });
      return;
    } else {
      addToast({
        type: "success",
        title: "Sucesso",
        description: `A companhia ${currentCompany.fantasy_name} foi excluída com sucesso.`,
      });

      history.replace("/ekk/client/management");
    }
  }, [history, currentCompany.id, currentCompany.fantasy_name, addToast]);

  const handleFormSubmit = useCallback(() => {
    if (formRef && formRef.current) {
      formRef.current?.submitForm();
    }
  }, [formRef]);

  return (
    <>
      <SubComponentContainer>
        {isEditPage && (
          <Button
            onClick={() => setOpenExcludeModal(true)}
            outline
            btnColor="#FF2929"
          >
            EXCLUIR CNPJ
          </Button>
        )}

        <Button onClick={handleFormSubmit}>SALVAR</Button>
      </SubComponentContainer>

      <Modal open={openExcludeModal} setOpen={setOpenExcludeModal}>
        <ModalContainer>
          <ModalTitle>Atenção</ModalTitle>
          <ModalDescription>
            Ao clicar em confirmar você excluirá a companhia "
            {currentCompany.fantasy_name}" do sistema.
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
              onClick={handleExclude}
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
    </>
  );
};

export default Data;
