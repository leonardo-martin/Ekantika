import { useCallback, useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import { Form } from "@unform/web";

import Button from "../../../../../components/Button";
import Input from "../../../../../components/Input";
import Paper from "../../../../../components/Paper";

import onlyNumbersAndDot from "../../../../../utils/onlyNumbersAndDot";
import { useCompany } from "../../contexts/CompanyContext";
import { useToast } from "../../../../../contexts/ToastContext";

import { ReactComponent as ArrowRightIcon } from "../../../../../assets/icons/arrow-right.svg";
import { ReactComponent as ArrowLeftEqualsIcon } from "../../../../../assets/icons/arrow-left-equals.svg";
import { ReactComponent as LeaderIcon } from "../../../../../assets/icons/leader.svg";
import { ReactComponent as PairIcon } from "../../../../../assets/icons/pair.svg";
import { ReactComponent as LedIcon } from "../../../../../assets/icons/led.svg";
import { ReactComponent as InvitedIcon } from "../../../../../assets/icons/invited.svg";

import {
  Container,
  Title,
  DesempenhoContainer,
  SubTitle,
  Text,
  ItemGrid,
  BlockedInput,
  FitCulturalContainer,
  PercentageContainer,
  ReduceControl,
  IncreaseControl,
  ReduceIcon,
  IncreaseIcon,
  MinMaxContainer,
  EvaluatorsGrid,
} from "./styles";
import api from "../../../../../services/api";

interface ParametersProps {
  range_performance_low_min: string;
  range_performance_low_max: string;
  range_performance_middle_min: string;
  range_performance_middle_max: string;
  range_performance_high_min?: string;
  range_performance_high_max: string;
  range_fit_cultural_low_min: string;
  range_fit_cultural_low_max: string;
  range_fit_cultural_middle_min: string;
  range_fit_cultural_middle_max: string;
  range_fit_cultural_high_min?: string;
  range_fit_cultural_high_max: string;
}

const Parameterizations: React.FC = () => {
  const [parameters, setParameters] = useState<ParametersProps>(
    {} as ParametersProps
  );

  const { addToast } = useToast();
  const { currentCompany } = useCompany();

  useEffect(() => {
    if (currentCompany.Parameterization) {
      const {
        range_performance_low_min,
        range_performance_low_max,
        range_performance_middle_min,
        range_performance_middle_max,
        range_performance_high_min,
        range_performance_high_max,
        range_fit_cultural_low_min,
        range_fit_cultural_low_max,
        range_fit_cultural_middle_min,
        range_fit_cultural_middle_max,
        range_fit_cultural_high_min,
        range_fit_cultural_high_max,
      } = currentCompany.Parameterization;

      setParameters({
        range_performance_low_min,
        range_performance_low_max,
        range_performance_middle_min,
        range_performance_middle_max,
        range_performance_high_min,
        range_performance_high_max,
        range_fit_cultural_low_min,
        range_fit_cultural_low_max,
        range_fit_cultural_middle_min,
        range_fit_cultural_middle_max,
        range_fit_cultural_high_min,
        range_fit_cultural_high_max,
      });
    }
  }, [currentCompany.Parameterization]);

  const handleParametersChange = useCallback((e) => {
    const { value, id } = e.target;

    setParameters((prevState) => ({
      ...prevState,
      [id]: onlyNumbersAndDot(value),
    }));
  }, []);

  const handleParametersSubmit = useCallback(
    async (data: ParametersProps) => {
      // console.log(data);
      const formData = { ...data, company_id: currentCompany.id };

      const response = await api.post("company/parameterization", formData);

      if (!response.data.success) {
        addToast({
          type: "error",
          title: "Erro ao Salvar",
          description:
            "Ocorreu um erro ao salvar os parâmetros, contate o suporte para mais informações.",
        });
        return;
      } else {
        addToast({
          type: "success",
          title: "Sucesso",
          description: "Parâmetros cadastrados com sucesso no sistema.",
        });
      }
    },
    [currentCompany.id, addToast]
  );

  return (
    <Container>
      <Title>Range</Title>

      <Form
        onSubmit={handleParametersSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <DesempenhoContainer>
              <SubTitle>Desempenho</SubTitle>

              <Grid
                container
                spacing={3}
                style={{ padding: "0 2.4rem 0 0", marginTop: "1.5rem" }}
              >
                <ItemGrid item xs={3}>
                  <Text>Baixo</Text>
                </ItemGrid>
                <ItemGrid item xs={3}>
                  <Input
                    name="range_performance_low_min"
                    id="range_performance_low_min"
                    value={parameters.range_performance_low_min}
                    onChange={handleParametersChange}
                  />
                </ItemGrid>
                <ItemGrid item xs={1} style={{ justifyContent: "center" }}>
                  <ArrowRightIcon />
                </ItemGrid>
                <ItemGrid item xs={1} style={{ justifyContent: "center" }}>
                  <SubTitle>ou</SubTitle>
                </ItemGrid>
                <ItemGrid item xs={1} style={{ justifyContent: "center" }}>
                  <ArrowLeftEqualsIcon />
                </ItemGrid>
                <ItemGrid item xs={3}>
                  <Input
                    name="range_performance_low_max"
                    id="range_performance_low_max"
                    value={parameters["range_performance_low_max"]}
                    onChange={handleParametersChange}
                  />
                </ItemGrid>

                <ItemGrid item xs={3}>
                  <Text>Médio</Text>
                </ItemGrid>
                <ItemGrid item xs={3}>
                  <Input
                    name="range_performance_middle_min"
                    id="range_performance_middle_min"
                    value={parameters["range_performance_middle_min"]}
                    onChange={handleParametersChange}
                  />
                </ItemGrid>
                <ItemGrid item xs={1} style={{ justifyContent: "center" }}>
                  <ArrowRightIcon />
                </ItemGrid>
                <ItemGrid item xs={1} style={{ justifyContent: "center" }}>
                  <SubTitle>ou</SubTitle>
                </ItemGrid>
                <ItemGrid item xs={1} style={{ justifyContent: "center" }}>
                  <ArrowLeftEqualsIcon />
                </ItemGrid>
                <ItemGrid item xs={3}>
                  <Input
                    name="range_performance_middle_max"
                    id="range_performance_middle_max"
                    value={parameters["range_performance_middle_max"]}
                    onChange={handleParametersChange}
                  />
                </ItemGrid>

                <ItemGrid item xs={3}>
                  <Text>Alto</Text>
                </ItemGrid>
                <ItemGrid item xs={3}>
                  <BlockedInput />
                </ItemGrid>
                <ItemGrid item xs={3} style={{ justifyContent: "center" }}>
                  <ArrowRightIcon />
                </ItemGrid>
                <ItemGrid item xs={3}>
                  <Input
                    name="range_performance_high_max"
                    id="range_performance_high_max"
                    value={parameters["range_performance_high_max"]}
                    onChange={handleParametersChange}
                  />
                </ItemGrid>
              </Grid>
            </DesempenhoContainer>
          </Grid>
          <Grid item xs={6}>
            <FitCulturalContainer>
              <SubTitle style={{ marginLeft: "2.4rem" }}>Fit Cultural</SubTitle>

              <Grid
                container
                spacing={3}
                style={{ padding: "0 0 0 2.4rem", marginTop: "1.5rem" }}
              >
                <ItemGrid item xs={3}>
                  <Text>Baixo</Text>
                </ItemGrid>
                <ItemGrid item xs={3}>
                  <Input
                    name="range_fit_cultural_low_min"
                    id="range_fit_cultural_low_min"
                    value={parameters["range_fit_cultural_low_min"]}
                    onChange={handleParametersChange}
                  />
                </ItemGrid>
                <ItemGrid item xs={1} style={{ justifyContent: "center" }}>
                  <ArrowRightIcon />
                </ItemGrid>
                <ItemGrid item xs={1} style={{ justifyContent: "center" }}>
                  <SubTitle>ou</SubTitle>
                </ItemGrid>
                <ItemGrid item xs={1} style={{ justifyContent: "center" }}>
                  <ArrowLeftEqualsIcon />
                </ItemGrid>
                <ItemGrid item xs={3}>
                  <Input
                    name="range_fit_cultural_low_max"
                    id="range_fit_cultural_low_max"
                    value={parameters["range_fit_cultural_low_max"]}
                    onChange={handleParametersChange}
                  />
                </ItemGrid>

                <ItemGrid item xs={3}>
                  <Text>Médio</Text>
                </ItemGrid>
                <ItemGrid item xs={3}>
                  <Input
                    name="range_fit_cultural_middle_min"
                    id="range_fit_cultural_middle_min"
                    value={parameters["range_fit_cultural_middle_min"]}
                    onChange={handleParametersChange}
                  />
                </ItemGrid>
                <ItemGrid item xs={1} style={{ justifyContent: "center" }}>
                  <ArrowRightIcon />
                </ItemGrid>
                <ItemGrid item xs={1} style={{ justifyContent: "center" }}>
                  <SubTitle>ou</SubTitle>
                </ItemGrid>
                <ItemGrid item xs={1} style={{ justifyContent: "center" }}>
                  <ArrowLeftEqualsIcon />
                </ItemGrid>
                <ItemGrid item xs={3}>
                  <Input
                    name="range_fit_cultural_middle_max"
                    id="range_fit_cultural_middle_max"
                    value={parameters["range_fit_cultural_middle_max"]}
                    onChange={handleParametersChange}
                  />
                </ItemGrid>

                <ItemGrid item xs={3}>
                  <Text>Alto</Text>
                </ItemGrid>
                <ItemGrid item xs={3}>
                  <BlockedInput />
                </ItemGrid>
                <ItemGrid item xs={3} style={{ justifyContent: "center" }}>
                  <ArrowRightIcon />
                </ItemGrid>
                <ItemGrid item xs={3}>
                  <Input
                    name="range_fit_cultural_high_max"
                    id="range_fit_cultural_high_max"
                    value={parameters["range_fit_cultural_high_max"]}
                    onChange={handleParametersChange}
                  />
                </ItemGrid>
              </Grid>
            </FitCulturalContainer>
          </Grid>
        </Grid>
        <Button
          type="submit"
          width="24rem"
          containerStyle={{
            marginLeft: "auto",
            marginTop: "3rem",
          }}
        >
          SALVAR
        </Button>
      </Form>
    </Container>
  );
};

interface PercentageInputsProps {
  [inputName: string]: string;
}

interface MinMaxInputsProps {
  [inputName: string]: string;
}

interface FormProps {
  guest_qty_max: string;
  guest_qty_mix: string;
  guest_percent: string;
  manager_qty_max: string;
  manager_qty_min: string;
  manager_percent: string;
  managed_qty_max: string;
  managed_qty_min: string;
  managed_percent: string;
  pair_qty_max: string;
  pair_qty_min: string;
  pair_percent: string;
}

export const ParameterizationsSubComponent: React.FC = () => {
  const [percentageInputs, setPercentageInputs] =
    useState<PercentageInputsProps>({
      guest_percent: "",
      manager_percent: "",
      managed_percent: "",
      pair_percent: "",
    } as PercentageInputsProps);

  const [minMaxInputs, setMinMaxInputs] = useState<MinMaxInputsProps>({
    manager_qty_min: "",
    manager_qty_max: "",
    guest_qty_mix: "",
    guest_qty_max: "",
    managed_qty_min: "",
    managed_qty_max: "",
    pair_qty_min: "",
    pair_qty_max: "",
  } as MinMaxInputsProps);

  const [isExceedingMaximum, setIsExceedingMaximum] = useState(false);

  const { currentCompany } = useCompany();
  const { addToast } = useToast();

  useEffect(() => {
    if (currentCompany.Parameterization) {
      const {
        guest_percent,
        manager_percent,
        managed_percent,
        pair_percent,
        manager_qty_min,
        manager_qty_max,
        guest_qty_mix,
        guest_qty_max,
        managed_qty_min,
        managed_qty_max,
        pair_qty_min,
        pair_qty_max,
      } = currentCompany.Parameterization;

      setMinMaxInputs({
        manager_qty_min,
        manager_qty_max,
        guest_qty_mix,
        guest_qty_max,
        managed_qty_min,
        managed_qty_max,
        pair_qty_min,
        pair_qty_max,
      });

      setPercentageInputs({
        guest_percent,
        manager_percent,
        managed_percent,
        pair_percent,
      });
    }
  }, [currentCompany.Parameterization]);

  useEffect(() => {
    let leaderP = Number(percentageInputs["manager_percent"]);
    let invitedP = Number(percentageInputs["guest_percent"]);
    let ledP = Number(percentageInputs["managed_percent"]);
    let pairP = Number(percentageInputs["pair_percent"]);

    let total = leaderP + invitedP + ledP + pairP;

    setIsExceedingMaximum(total > 100);
  }, [percentageInputs]);

  const handleMinMaxChange = useCallback((e) => {
    const { value, id } = e.target;

    if (/^[0-9]+$/.test(value) || value === "") {
      setMinMaxInputs((prevState) => ({ ...prevState, [id]: value }));
    }
  }, []);

  const handlePercentageChange = useCallback((e) => {
    const { value, id } = e.target;

    if ((/^[0-9]+$/.test(value) || value === "") && value.length <= 3) {
      setPercentageInputs((prevState) => ({ ...prevState, [id]: value }));
    }
  }, []);

  const handleReduceClick = useCallback((sectionName: string) => {
    setPercentageInputs((prevState) => {
      const inputName = sectionName + "_percent";

      const inputValueNum = Number(prevState[inputName]);

      const reduceOne = inputValueNum <= 0 ? 0 : inputValueNum - 1;

      return {
        ...prevState,
        [inputName]: String(reduceOne === 0 ? "" : reduceOne),
      };
    });
  }, []);

  const handleIncreaseClick = useCallback((sectionName: string) => {
    setPercentageInputs((prevState) => {
      const inputName = sectionName + "_percent";

      const inputValueNum = Number(prevState[inputName]);

      const increaseOne = inputValueNum + 1;

      return {
        ...prevState,
        [inputName]: String(increaseOne),
      };
    });
  }, []);

  const handleEvaluatorsSubmit = useCallback(
    async (data: FormProps) => {
      const formData = { ...data, company_id: currentCompany.id };

      const response = await api.post(
        "company/parameterization-evaluators",
        formData
      );

      if (!response.data.success) {
        addToast({
          type: "error",
          title: "Erro ao Salvar",
          description:
            "Ocorreu um erro ao salvar os parâmetros, contate o suporte para mais informações.",
        });
        return;
      } else {
        addToast({
          type: "success",
          title: "Sucesso",
          description: "Parâmetros cadastrados com sucesso no sistema.",
        });
      }
    },
    [currentCompany.id, addToast]
  );

  return (
    <Paper>
      <Container>
        <Title>Avaliadores</Title>
        <Text>Defina o peso de cada avaliador na composição da nota.</Text>

        <Form
          onSubmit={handleEvaluatorsSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: "2.5rem",
          }}
        >
          <Grid container spacing={3}>
            <EvaluatorsGrid item xs={3}>
              <LeaderIcon />
              <Text
                style={{
                  marginTop: "0.8rem",
                }}
              >
                Líder
                <br />
                (Porcentagem)
              </Text>
              <PercentageContainer>
                <ReduceControl
                  onClick={() => {
                    handleReduceClick("manager");
                  }}
                  type="button"
                >
                  <ReduceIcon />
                </ReduceControl>
                <Input
                  name="manager_percent"
                  id="manager_percent"
                  value={percentageInputs["manager_percent"]}
                  onChange={handlePercentageChange}
                  placeholder="0%"
                  containerStyle={{
                    flex: 1,
                    borderColor: isExceedingMaximum && "#FF2929",
                  }}
                  inputStyle={{ width: "100%" }}
                />
                <IncreaseControl
                  onClick={() => {
                    handleIncreaseClick("manager");
                  }}
                  type="button"
                >
                  <IncreaseIcon />
                </IncreaseControl>
              </PercentageContainer>

              <Text>Nº Participantes</Text>
              <MinMaxContainer>
                <Input
                  name="manager_qty_min"
                  id="manager_qty_min"
                  onChange={handleMinMaxChange}
                  value={minMaxInputs["manager_qty_min"]}
                  placeholder="Mín."
                  containerStyle={{
                    margin: "0",
                    width: "50%",
                  }}
                />
                <Input
                  name="manager_qty_max"
                  id="manager_qty_max"
                  onChange={handleMinMaxChange}
                  value={minMaxInputs["manager_qty_max"]}
                  placeholder="Máx."
                  containerStyle={{
                    margin: "0 0 0 0.8rem",
                    width: "50%",
                  }}
                />
              </MinMaxContainer>
            </EvaluatorsGrid>
            <EvaluatorsGrid item xs={3}>
              <PairIcon />
              <Text>
                Par <br />
                (Porcentagem)
              </Text>

              <PercentageContainer>
                <ReduceControl
                  onClick={() => {
                    handleReduceClick("pair");
                  }}
                  type="button"
                >
                  <ReduceIcon />
                </ReduceControl>
                <Input
                  name="pair_percent"
                  id="pair_percent"
                  value={percentageInputs["pair_percent"]}
                  onChange={handlePercentageChange}
                  placeholder="0%"
                  containerStyle={{
                    flex: 1,
                    borderColor: isExceedingMaximum && "#FF2929",
                  }}
                  inputStyle={{
                    width: "100%",
                  }}
                />
                <IncreaseControl
                  onClick={() => {
                    handleIncreaseClick("pair");
                  }}
                  type="button"
                >
                  <IncreaseIcon />
                </IncreaseControl>
              </PercentageContainer>

              <Text>Nº Participantes</Text>
              <MinMaxContainer>
                <Input
                  name="pair_qty_min"
                  id="pair_qty_min"
                  onChange={handleMinMaxChange}
                  value={minMaxInputs["pair_qty_min"]}
                  placeholder="Mín."
                  containerStyle={{
                    margin: "0",
                    width: "50%",
                  }}
                />
                <Input
                  name="pair_qty_max"
                  id="pair_qty_max"
                  onChange={handleMinMaxChange}
                  value={minMaxInputs["pair_qty_max"]}
                  placeholder="Máx."
                  containerStyle={{
                    margin: "0 0 0 0.8rem",
                    width: "50%",
                  }}
                />
              </MinMaxContainer>
            </EvaluatorsGrid>
            <EvaluatorsGrid item xs={3}>
              <LedIcon />
              <Text>
                Liderados <br />
                (Porcentagem)
              </Text>

              <PercentageContainer>
                <ReduceControl
                  onClick={() => {
                    handleReduceClick("managed");
                  }}
                  type="button"
                >
                  <ReduceIcon />
                </ReduceControl>
                <Input
                  name="managed_percent"
                  id="managed_percent"
                  value={percentageInputs["managed_percent"]}
                  onChange={handlePercentageChange}
                  placeholder="0%"
                  containerStyle={{
                    flex: 1,
                    borderColor: isExceedingMaximum && "#FF2929",
                  }}
                  inputStyle={{
                    width: "100%",
                  }}
                />
                <IncreaseControl
                  onClick={() => {
                    handleIncreaseClick("managed");
                  }}
                  type="button"
                >
                  <IncreaseIcon />
                </IncreaseControl>
              </PercentageContainer>

              <Text>Nº Participantes</Text>
              <MinMaxContainer>
                <Input
                  name="managed_qty_min"
                  id="managed_qty_min"
                  onChange={handleMinMaxChange}
                  value={minMaxInputs["managed_qty_min"]}
                  placeholder="Mín."
                  containerStyle={{
                    margin: "0",
                    width: "50%",
                  }}
                />
                <Input
                  name="managed_qty_max"
                  id="managed_qty_max"
                  onChange={handleMinMaxChange}
                  value={minMaxInputs["managed_qty_max"]}
                  placeholder="Máx."
                  containerStyle={{
                    margin: "0 0 0 0.8rem",
                    width: "50%",
                  }}
                />
              </MinMaxContainer>
            </EvaluatorsGrid>
            <EvaluatorsGrid item xs={3}>
              <InvitedIcon />
              <Text>
                Convidados <br />
                (Porcentagem)
              </Text>

              <PercentageContainer>
                <ReduceControl
                  onClick={() => {
                    handleReduceClick("guest");
                  }}
                  type="button"
                >
                  <ReduceIcon />
                </ReduceControl>
                <Input
                  name="guest_percent"
                  id="guest_percent"
                  value={percentageInputs["guest_percent"]}
                  onChange={handlePercentageChange}
                  placeholder="0%"
                  containerStyle={{
                    flex: 1,
                    borderColor: isExceedingMaximum && "#FF2929",
                  }}
                  inputStyle={{
                    width: "100%",
                  }}
                />
                <IncreaseControl
                  onClick={() => {
                    handleIncreaseClick("guest");
                  }}
                  type="button"
                >
                  <IncreaseIcon />
                </IncreaseControl>
              </PercentageContainer>

              <Text>Nº Participantes</Text>
              <MinMaxContainer>
                <Input
                  name="guest_qty_mix"
                  id="guest_qty_mix"
                  onChange={handleMinMaxChange}
                  value={minMaxInputs["guest_qty_mix"]}
                  placeholder="Mín."
                  containerStyle={{
                    margin: "0",
                    width: "50%",
                  }}
                />
                <Input
                  name="guest_qty_max"
                  id="guest_qty_max"
                  onChange={handleMinMaxChange}
                  value={minMaxInputs["guest_qty_max"]}
                  placeholder="Máx."
                  containerStyle={{
                    margin: "0 0 0 0.8rem",
                    width: "50%",
                  }}
                />
              </MinMaxContainer>
            </EvaluatorsGrid>
          </Grid>
          <Button
            type="submit"
            width="24rem"
            containerStyle={{
              marginLeft: "auto",
              marginTop: "3rem",
            }}
            btnColor={isExceedingMaximum ? "#FF2929" : ""}
          >
            {isExceedingMaximum ? "NOTA EXCEDIDA" : "SALVAR"}
          </Button>
        </Form>
      </Container>
    </Paper>
  );
};

export default Parameterizations;
