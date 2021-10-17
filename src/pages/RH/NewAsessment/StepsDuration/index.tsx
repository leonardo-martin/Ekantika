import PageTitle from "../../../../components/PageTitle";
import Paper from "../../../../components/Paper";
import InputLabel from '../../../../components/InputLabel';
import DatePicker from '../../../../components/DatePicker';
import Navigation from "../Navigation";
import { Grid } from "@material-ui/core";

import { Form } from "@unform/web";

import {
  Container,
  Title,
  Text,
  EvaluatorsGrid,
  Grid1,
} from "./styles";

const StepsDuration = () => {
  return (
    <div>
      <PageTitle title="Vigência das etapas" />

      <Navigation />
      <Grid1>
        <Paper containerStyle={{ flexDirection: 'column' }}>
          <Container>
            <Title>Avaliadores</Title>

            <Form
              onSubmit={() => { }}
              style={{
                display: "flex",
                flexDirection: "column",
                marginTop: "2.5rem"
              }}
            >
              <Grid container spacing={10}>
                <EvaluatorsGrid item xs={4}>
                  <Text>
                    Seleção
                  </Text>
                  <div>
                    <InputLabel>Início</InputLabel>
                    <DatePicker
                      initialDate={null}
                      placeholder="Selecionar data"
                      setDate={() => {}}
                    />
                  </div>
                  <div>
                    <InputLabel>Fim</InputLabel>
                    <DatePicker
                      initialDate={null}
                      placeholder="Selecionar data"
                      setDate={() => {}}
                    />
                  </div>
                </EvaluatorsGrid>
                <EvaluatorsGrid item xs={4}>
                  <Text>
                    Revisão
                  </Text>

                  <div>
                    <InputLabel>Início</InputLabel>
                    <DatePicker
                      initialDate={null}
                      placeholder="Selecionar data"
                      setDate={() => {}}
                    />
                  </div>
                  <div>
                    <InputLabel>Fim</InputLabel>
                    <DatePicker
                      initialDate={null}
                      placeholder="Selecionar data"
                      setDate={() => {}}
                    />
                  </div>
                </EvaluatorsGrid>
                <EvaluatorsGrid item xs={4}>
                  <Text>
                    Aceite
                  </Text>

                  <div>
                    <InputLabel>Início</InputLabel>
                    <DatePicker
                      initialDate={null}
                      placeholder="Selecionar data"
                      setDate={() => {}}
                    />
                  </div>
                  <div>
                    <InputLabel>Fim</InputLabel>
                    <DatePicker
                      initialDate={null}
                      placeholder="Selecionar data"
                      setDate={() => {}}
                    />
                  </div>
                </EvaluatorsGrid>
              </Grid>
            </Form>
          </Container>
        </Paper>
        <Paper containerStyle={{ flexDirection: 'column' }}>
          <Container>
            <Title>Realização da avaliação</Title>

            <Form
              onSubmit={() => { }}
              style={{
                display: "flex",
                flexDirection: "column",
                marginTop: "2.5rem",
              }}
            >
              <Grid container spacing={3}>
                <EvaluatorsGrid item xs={12}>
                  <div>
                    <InputLabel>Início</InputLabel>
                    <DatePicker
                      initialDate={null}
                      placeholder="Selecionar data"
                      setDate={() => {}}
                    />
                  </div>
                  <div>
                    <InputLabel>Fim</InputLabel>
                    <DatePicker
                      initialDate={null}
                      placeholder="Selecionar data"
                      setDate={() => {}}
                    />
                  </div>
                </EvaluatorsGrid>
              </Grid>
            </Form>
          </Container>
        </Paper>
        <Paper containerStyle={{ flexDirection: 'column' }}>
          <Container>
            <Title>Mapa de desenvolvimento</Title>

            <Form
              onSubmit={() => { }}
              style={{
                display: "flex",
                flexDirection: "column",
                marginTop: "2.5rem"
              }}
            >
              <Grid container spacing={3}>
                <EvaluatorsGrid item xs={12}>
                  <div>
                    <InputLabel>Início</InputLabel>
                    <DatePicker
                      initialDate={null}
                      placeholder="Selecionar data"
                      setDate={() => {}}
                    />
                  </div>
                  <div>
                    <InputLabel>Fim</InputLabel>
                    <DatePicker
                      initialDate={null}
                      placeholder="Selecionar data"
                      setDate={() => {}}
                    />
                  </div>
                </EvaluatorsGrid>
              </Grid>
            </Form>
          </Container>
        </Paper>
        <Paper containerStyle={{ flexDirection: 'column' }}>
          <Container>
            <Title>Calibragem</Title>

            <Form
              onSubmit={() => { }}
              style={{
                display: "flex",
                flexDirection: "column",
                marginTop: "2.5rem",
              }}
            >
              <Grid container spacing={3}>
                <EvaluatorsGrid item xs={12}>
                  <div>
                    <InputLabel>Início</InputLabel>
                    <DatePicker
                      initialDate={null}
                      placeholder="Selecionar data"
                      setDate={() => {}}
                    />
                  </div>
                  <div>
                    <InputLabel>Fim</InputLabel>
                    <DatePicker
                      initialDate={null}
                      placeholder="Selecionar data"
                      setDate={() => {}}
                    />
                  </div>
                </EvaluatorsGrid>
              </Grid>
            </Form>
          </Container>
        </Paper>
      </Grid1>
    </div>
  );
};

export default StepsDuration;

