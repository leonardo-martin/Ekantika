import { useState, useEffect } from "react";

import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import { Form } from "@unform/web";

import Button from "../../../../../components/Button";
import Dropdown from "../../../../../components/Dropdown";
import Input from "../../../../../components/Input";

import {
  Container,
  Title,
  SubTitle,
  Text,
  Accordion,
  DropdownItem,
  ArrowDownIcon,
  AccordionSummary,
} from "./styles";
import { Grid } from "@material-ui/core";
import FuncionalitiesList, {
  FuncionalitiesListProps,
} from "./components/FuncionalitiesList";
import { CheckboxPostProps } from "./components/Checkbox";

import { useCallback } from "react";
import api from "../../../../../services/api";
import { useToast } from "../../../../../contexts/ToastContext";
import { useCompany } from "../../contexts/CompanyContext";
import LoadingScreen from "../../../../../components/LoadingScreen";

interface InputsProps {
  personalize_adm: string;
  personalize_collaborator: string;
  personalize_guest: string;
  personalize_hr: string;
  personalize_manager: string;
}

interface PlanProps {
  id: string;
  name: string;
  status: string;
}

interface ColumnId {
  [columnId: string]: boolean;
}

export interface RowIdColumnIdProps {
  [rowId: string]: ColumnId;
}

const UsersProfiles: React.FC = () => {
  const [expanded, setExpanded] = useState<string | false>("panel1");

  const [funcionalityCheckboxes, setFuncionalityCheckboxes] =
    useState<RowIdColumnIdProps>({
      "0": {
        "0": true,
        "1": true,
        "2": true,
        "3": true,
        "4": true,
      },
      "1": {
        "0": true,
        "1": true,
        "2": true,
        "3": true,
        "4": true,
      },
      "2": {
        "0": true,
        "1": true,
        "2": true,
        "3": false,
        "4": false,
      },
      "3": {
        "0": true,
        "1": true,
        "2": true,
        "3": false,
        "4": false,
      },
      "4": {
        "0": true,
        "1": true,
        "2": false,
        "3": false,
        "4": false,
      },
      "5": {
        "0": true,
        "1": false,
        "2": false,
        "3": false,
        "4": false,
      },
      "6": {
        "0": true,
        "1": false,
        "2": false,
        "3": false,
        "4": false,
      },
    } as RowIdColumnIdProps);

  const [funcionalitySwitches, setFuncionalitySwitches] =
    useState<RowIdColumnIdProps>({
      "0": {
        "0": true,
        "1": true,
        "2": true,
        "3": true,
        "4": true,
      },
      "1": {
        "0": true,
        "1": false,
        "2": true,
        "3": true,
        "4": true,
      },
      "2": {
        "0": true,
        "1": true,
        "2": true,
        "3": false,
        "4": false,
      },
      "3": {
        "0": false,
        "1": true,
        "2": true,
        "3": false,
        "4": false,
      },
      "4": {
        "0": true,
        "1": true,
        "2": false,
        "3": false,
        "4": false,
      },
      "5": {
        "0": true,
        "1": false,
        "2": false,
        "3": false,
        "4": false,
      },
      "6": {
        "0": true,
        "1": false,
        "2": false,
        "3": false,
        "4": false,
      },
    } as RowIdColumnIdProps);

  const [funcionalities, setFuncionalities] = useState<
    FuncionalitiesListProps[]
  >([] as FuncionalitiesListProps[]);

  const [selectedPlan, setSelectedPlan] = useState<PlanProps>({} as PlanProps);
  const [plans, setPlans] = useState<PlanProps[]>([]);

  const [loading, setLoading] = useState<boolean>(true);
  const [reloadTab, setReloadTab] = useState(true);

  const { addToast } = useToast();

  const { currentCompany, updateCompany } = useCompany();

  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [reloadTab]);

  useEffect(() => {
    async function loadPlans() {
      const response = await api.get("plan/all");
      if (response.data.payload) {
        setPlans(response.data.payload);
      }
    }

    loadPlans();
  }, [setPlans]);

  useEffect(() => {
    if (plans.length > 0 && currentCompany.plan_id) {
      const findSelectedPlan = plans.find(
        (plan) => plan.id === currentCompany.plan_id
      );

      if (findSelectedPlan) {
        setSelectedPlan(findSelectedPlan);
      }
    }
  }, [plans, currentCompany.plan_id]);

  useEffect(() => {
    async function loadFuncionalities() {
      const response = await api.get(`plan/${selectedPlan.id}/info`);

      const plans = response.data.payload;
      const serializeFuncionality = plans.map((funcionality: any) => {
        const { id, name, description } = funcionality;

        const columns = [];
        const columnTitles = [
          "Administrador",
          "RH",
          "Gestor",
          "Colaborador",
          "Convidado",
        ];

        for (let i = 0; i < columnTitles.length; i++) {
          const checkIsCheckboxSelected =
            funcionality[columnTitles[i]] === "1" ? true : false;

          columns.push({
            columnId: i,
            isCheckboxSelected: checkIsCheckboxSelected,
            isCheckboxDisabled: false,
            hasSwitch: false,
            isSwitchSelected: false,
            plan_id: i + 1,
          });
        }

        return { id, name, description, columns };
      });

      setFuncionalities(serializeFuncionality);
    }

    if (selectedPlan.id) {
      loadFuncionalities();
    }
  }, [selectedPlan.id]);

  const handleExpandedChange = useCallback(
    (panel: string) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    },
    []
  );

  const handleFormSubmit = useCallback(
    (data: InputsProps) => {
      console.log(data);
      console.log(funcionalityCheckboxes);
      console.log(funcionalitySwitches);
    },
    [funcionalityCheckboxes, funcionalitySwitches]
  );

  const handleCheckBoxChange = useCallback(
    async ({ planId, funcionalityId }: CheckboxPostProps) => {
      console.log("Not implemented");

      addToast({
        type: "error",
        title: "Erro",
        description: "Não implementado",
      });

      // const response = await api.post("company/plans", {
      //   plan_id: planId,
      //   company_id: currentCompany.id,
      // });

      // if (!response.data.success) {
      //   addToast({
      //     type: "error",
      //     title: "Erro",
      //     description:
      //       "Ocorreu um erro ao desabilitar essa função, contate o suporte para mais informações.",
      //   });
      // }
    },
    [addToast, currentCompany.id]
  );

  const handleSwitchChange = useCallback((rowId: string, colId: string) => {
    setFuncionalitySwitches((prevState) => ({
      ...prevState,
      [rowId]: { ...prevState[rowId], [colId]: !prevState[rowId][colId] },
    }));
  }, []);

  const handlePlanChange = useCallback(
    async (plan: PlanProps) => {
      setSelectedPlan(plan);

      updateCompany({
        plan_id: plan.id,
      });

      setReloadTab((prevState) => !prevState);

      const response = await api.post("company/plans", {
        plan_id: plan.id,
        company_id: currentCompany.id,
      });

      if (!response.data.success) {
        addToast({
          type: "error",
          title: "Erro",
          description:
            "Ocorreu um erro ao selecionar esse plano, contate o suporte para mais informações.",
        });
      } else {
      }
    },
    [addToast, currentCompany.id, updateCompany]
  );

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <Container>
      <Form
        onSubmit={handleFormSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Title>PLANO DO CLIENTE</Title>
        <Dropdown
          value={selectedPlan.name && selectedPlan.name}
          placeholder="Selecionar plano"
          containerStyle={{
            width: "25rem",
            marginBottom: "2rem",
          }}
          width="25rem"
        >
          {plans.map((item) => (
            <DropdownItem
              key={item.id}
              type="button"
              onClick={() => {
                handlePlanChange(item);
              }}
            >
              {item.name}
            </DropdownItem>
          ))}
        </Dropdown>

        <Title>{`Funcionalidades disponíveis para o plano ${selectedPlan.name}`}</Title>

        <Grid
          container
          spacing={3}
          style={{
            display: "flex",
            flexGrow: 1,
          }}
        >
          <Grid item xs={4}>
            <Text>
              Neste setor você pode criar novos usuários específicos para o
              cliente e/ou adicona novos módulos.
            </Text>
          </Grid>
          <Grid
            item
            xs={8}
            style={{
              paddingLeft: "5rem",
              width: "100%",
            }}
          >
            <Grid
              container
              spacing={3}
              style={{
                textAlign: "center",
                paddingLeft: "1rem",
              }}
            >
              <Grid item xs={2}>
                <SubTitle>Administrador</SubTitle>
                <Input name="personalize_adm" placeholder="Personalizar" />
              </Grid>
              <Grid item xs={2}>
                <SubTitle>RH</SubTitle>
                <Input name="personalize_hr" placeholder="Personalizar" />
              </Grid>
              <Grid item xs={2}>
                <SubTitle>Gestor</SubTitle>
                <Input name="personalize_manager" placeholder="Personalizar" />
              </Grid>
              <Grid item xs={2}>
                <SubTitle>Colaborador</SubTitle>
                <Input
                  name="personalize_collaborator"
                  placeholder="Personalizar"
                />
              </Grid>
              <Grid item xs={2}>
                <SubTitle>Convidado</SubTitle>
                <Input name="personalize_guest" placeholder="Personalizar" />
              </Grid>
              <Grid item xs={2} style={{ display: "flex" }}>
                <Button
                  type="submit"
                  width="100%"
                  containerStyle={{
                    marginTop: "auto",
                    padding: "1.2rem 0",
                  }}
                >
                  SALVAR
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Accordion
          style={{ marginTop: "2rem", borderRadius: "10px" }}
          expanded={expanded === "panel1"}
          onChange={handleExpandedChange("panel1")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Grid container>
              <Grid
                item
                xs={4}
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Title style={{ margin: 0 }}>Avaliações</Title>
              </Grid>
              <Grid
                item
                xs={8}
                style={{ paddingLeft: "4rem", width: "100% !important" }}
              >
                <Grid
                  container
                  spacing={3}
                  style={{
                    textAlign: "center",
                  }}
                >
                  <Grid
                    style={{
                      display: "flex",
                      alignItems: "center",
                      background: "#F2F3F5",
                    }}
                    item
                    xs={2}
                  >
                    <div
                      style={{
                        margin: 0,
                        width: "100%",
                        display: "block",
                        height: "25px",
                      }}
                    />
                  </Grid>
                  <Grid
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                    item
                    xs={2}
                  ></Grid>
                  <Grid
                    style={{
                      display: "flex",
                      alignItems: "center",
                      background: "#F2F3F5",
                    }}
                    item
                    xs={2}
                  ></Grid>
                  <Grid
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                    item
                    xs={2}
                  ></Grid>
                  <Grid
                    style={{
                      display: "flex",
                      alignItems: "center",
                      background: "#F2F3F5",
                    }}
                    item
                    xs={2}
                  ></Grid>
                </Grid>
              </Grid>
            </Grid>
            <ArrowDownIcon />
          </AccordionSummary>
          <AccordionDetails>
            <FuncionalitiesList
              rows={funcionalities}
              handleCheckBoxChange={handleCheckBoxChange}
              handleSwitchChange={handleSwitchChange}
            />
          </AccordionDetails>
        </Accordion>
      </Form>
    </Container>
  );
};

export default UsersProfiles;
