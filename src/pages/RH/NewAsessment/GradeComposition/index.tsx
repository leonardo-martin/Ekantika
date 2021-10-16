import PageTitle from "../../../../components/PageTitle";
import Paper from "../../../../components/Paper";
import Input from "../../../../components/Input";
import Navigation from "../Navigation";
import { Grid } from "@material-ui/core";
import { useState } from "react";

import { Form } from "@unform/web";

import { ReactComponent as LeaderIcon } from "../../../../assets/icons/leader.svg";
import { ReactComponent as PairIcon } from "../../../../assets/icons/pair.svg";
import { ReactComponent as LedIcon } from "../../../../assets/icons/led.svg";
import { ReactComponent as InvitedIcon } from "../../../../assets/icons/invited.svg";

import {
  Container,
  Title,
  Text,
  PercentageContainer,
  ReduceControl,
  IncreaseControl,
  ReduceIcon,
  IncreaseIcon,
  MinMaxContainer,
  EvaluatorsGrid,
} from "./styles";

const GradeComposition = () => {
  const [isExceedingMaximum, setIsExceedingMaximum] = useState(false);
  return (
    <div>
      <PageTitle title="Composição da nota" />

      <Navigation />

      <Paper>
        <Container>
          <Title>Avaliadores</Title>
          <Text>Defina o peso de cada avaliador na composição da nota.</Text>

          <Form
            onSubmit={() => { }}
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
                    onClick={() => { }}
                    type="button"
                  >
                    <ReduceIcon />
                  </ReduceControl>
                  <Input
                    name="manager_percent"
                    id="manager_percent"
                    value={''}
                    onChange={() => { }}
                    placeholder="0%"
                    containerStyle={{
                      flex: 1,
                      borderColor: isExceedingMaximum && "#FF2929",
                    }}
                    inputStyle={{ width: "100%" }}
                  />
                  <IncreaseControl
                    onClick={() => { }}
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
                    onChange={() => { }}
                    value={''}
                    placeholder="Mín."
                    containerStyle={{
                      margin: "0",
                      width: "50%",
                    }}
                  />
                  <Input
                    name="manager_qty_max"
                    id="manager_qty_max"
                    onChange={() => { }}
                    value={''}
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
                    onClick={() => { }}
                    type="button"
                  >
                    <ReduceIcon />
                  </ReduceControl>
                  <Input
                    name="pair_percent"
                    id="pair_percent"
                    value={''}
                    onChange={() => { }}
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
                    onClick={() => { }}
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
                    onChange={() => { }}
                    value={''}
                    placeholder="Mín."
                    containerStyle={{
                      margin: "0",
                      width: "50%",
                    }}
                  />
                  <Input
                    name="pair_qty_max"
                    id="pair_qty_max"
                    onChange={() => { }}
                    value={''}
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
                    onClick={() => { }}
                    type="button"
                  >
                    <ReduceIcon />
                  </ReduceControl>
                  <Input
                    name="managed_percent"
                    id="managed_percent"
                    value={''}
                    onChange={() => { }}
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
                    onClick={() => { }}
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
                    onChange={() => { }}
                    value={''}
                    placeholder="Mín."
                    containerStyle={{
                      margin: "0",
                      width: "50%",
                    }}
                  />
                  <Input
                    name="managed_qty_max"
                    id="managed_qty_max"
                    onChange={() => { }}
                    value={''}
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
                    onClick={() => { }}
                    type="button"
                  >
                    <ReduceIcon />
                  </ReduceControl>
                  <Input
                    name="guest_percent"
                    id="guest_percent"
                    value={''}
                    onChange={() => { }}
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
                    onClick={() => { }}
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
                    onChange={() => { }}
                    value={''}
                    placeholder="Mín."
                    containerStyle={{
                      margin: "0",
                      width: "50%",
                    }}
                  />
                  <Input
                    name="guest_qty_max"
                    id="guest_qty_max"
                    onChange={() => { }}
                    value={''}
                    placeholder="Máx."
                    containerStyle={{
                      margin: "0 0 0 0.8rem",
                      width: "50%",
                    }}
                  />
                </MinMaxContainer>
              </EvaluatorsGrid>
            </Grid>
          </Form>
        </Container>
      </Paper>
    </div>
  );
};

export default GradeComposition;

