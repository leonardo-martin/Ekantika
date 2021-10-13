import { useMemo, useState, useEffect } from "react";

import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import { Form } from "@unform/web";

import { ReactComponent as HierarchyIcon } from "../../../../../assets/icons/hierarchy.svg";

import Button from "../../../../../components/Button";

import {
  Container,
  Title,
  SubTitle,
  Text,
  Accordion,
  ArrowDownIcon,
  AccordionSummary,
} from "./styles";
import { Grid } from "@material-ui/core";

import { useCallback } from "react";
import FuncionalitiesList, {
  FuncionalitiesListProps,
} from "../../components/FuncionalitiesList";
import { CheckboxPostProps } from "../../components/Checkbox";
import api from "../../../../../services/api";
import { useToast } from "../../../../../contexts/ToastContext";

interface InputsProps {
  personalize_adm: string;
  personalize_collaborator: string;
  personalize_guest: string;
  personalize_hr: string;
  personalize_manager: string;
}

interface ColumnId {
  [columnId: string]: boolean;
}

export interface RowIdColumnIdProps {
  [rowId: string]: ColumnId;
}

const Silver: React.FC = () => {
  const [expanded, setExpanded] = useState<string | false>("panel1");

  const [funcionalities, setFuncionalities] = useState<
    FuncionalitiesListProps[]
  >([] as FuncionalitiesListProps[]);

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

  const { addToast } = useToast();

  useEffect(() => {
    async function loadFuncionalities() {
      const PrataId = 3;

      const response = await api.get(`plan/${PrataId}/info`);

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
            plan_id: PrataId,
            roleType: columnTitles[i],
          });
        }

        return { id, name, description, columns };
      });

      setFuncionalities(serializeFuncionality);
    }

    loadFuncionalities();
  }, []);

  const handleExpandedChange = useCallback(
    (panel: string) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    },
    []
  );

  const handleFormSubmit = useCallback(
    (data: InputsProps) => {
      console.log(data);
      console.log(funcionalitySwitches);
    },
    [funcionalitySwitches]
  );

  const handleCheckBoxChange = useCallback(
    async ({ planId, funcionalityId, roleType }: CheckboxPostProps) => {
      const response = await api.post("plan/users", {
        plan_id: planId,
        id: funcionalityId,
        role_type: roleType,
      });

      if (!response.data.success) {
        addToast({
          type: "error",
          title: "Erro",
          description:
            "Ocorreu um erro ao desabilitar essa função, contate o suporte para mais informações.",
        });
      }
    },
    [addToast]
  );

  const handleSwitchChange = useCallback((rowId: string, colId: string) => {
    setFuncionalitySwitches((prevState) => ({
      ...prevState,
      [rowId]: { ...prevState[rowId], [colId]: !prevState[rowId][colId] },
    }));
  }, []);

  return (
    <Container>
      <Form
        onSubmit={handleFormSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
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
              Neste setor você pode criar os usuários padrões para cada tipo de
              plano do sistema.
            </Text>
          </Grid>
          <Grid
            item
            xs={8}
            style={{
              paddingLeft: "5rem",
              width: "100%",
              display: "flex",
              alignItems: "center",
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
              </Grid>
              <Grid item xs={2}>
                <SubTitle>RH</SubTitle>
              </Grid>
              <Grid item xs={2}>
                <SubTitle>Gestor</SubTitle>
              </Grid>
              <Grid item xs={2}>
                <SubTitle>Colaborador</SubTitle>
              </Grid>
              <Grid item xs={2}>
                <SubTitle>Convidado</SubTitle>
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
                    <HierarchyIcon style={{ margin: 0, width: "100%" }} />
                  </Grid>
                  <Grid
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                    item
                    xs={2}
                  >
                    <HierarchyIcon style={{ margin: 0, width: "100%" }} />
                  </Grid>
                  <Grid
                    style={{
                      display: "flex",
                      alignItems: "center",
                      background: "#F2F3F5",
                    }}
                    item
                    xs={2}
                  >
                    <HierarchyIcon style={{ margin: 0, width: "100%" }} />
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

        <Button
          type="submit"
          width="24rem"
          containerStyle={{
            marginLeft: "auto",
            marginTop: "2rem",
          }}
        >
          SALVAR
        </Button>
      </Form>
    </Container>
  );
};

export default Silver;
