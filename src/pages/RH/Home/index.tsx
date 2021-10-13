import { AvatarGroup } from "@material-ui/lab";
import { Avatar } from "@material-ui/core";

import Container from "../../../components/Container";
import PageTitle from "../../../components/PageTitle";
import Paper from "../../../components/Paper";
import Title from "../../../components/Title";
import InputLabel from "../../../components/InputLabel";
import Dropdown from "../../../components/Dropdown";
import DropdownItem from "../../../components/DropdownItem";
import Button from "../../../components/Button";
import Table from "../../../components/Table";
import Progress from "../../../components/Progress";

import { ReactComponent as HomeIcon } from "../../../assets/icons/home.svg";
import { ReactComponent as AlertIcon } from "../../../assets/icons/alert.svg";

import {
  HomeGrid,
  AssessmentStatusFlex,
  FilterContainer,
  AsessmentTeam,
  AssessmentsFooter,
  AssessmentAmount,
  AssessmentHighlights,
  AssessmentFinishRateContainer,
  BlackTitle,
  AlertContainer,
  AssessmentFinishRate,
  StatusProgress,
  StatusProgressContainer,
  StatusContainer,
  PriorityContainer,
} from "./styles";

const RHHome = () => {
  return (
    <Container>
      <PageTitle icon={<HomeIcon />} title="Seja bem-vindo" />

      <HomeGrid>
        <div>
          <Paper containerStyle={{ flexDirection: "column" }}>
            <AssessmentStatusFlex>
              <Title>STATUS AVALIAÇÕES</Title>

              <FilterContainer>
                <InputLabel direction="horizontal">Filtrar por: </InputLabel>
                <Dropdown placeholder="Selecionar" fullRounded={false}>
                  <DropdownItem>Comercial</DropdownItem>
                  <DropdownItem>Facilities</DropdownItem>
                  <DropdownItem>Financeiro</DropdownItem>
                  <DropdownItem>Marketing</DropdownItem>
                  <DropdownItem>Supply chain</DropdownItem>
                  <DropdownItem>Tecnologia</DropdownItem>
                </Dropdown>
              </FilterContainer>
            </AssessmentStatusFlex>

            <Table
              pagination={false}
              showToolbar={false}
              tableData={[
                {
                  equipe: <AsessmentTeam>Maiden</AsessmentTeam>,
                  ult_respondidas: (
                    <AvatarGroup max={6}>
                      <Avatar src="/static/media/user-placeholder.a5f6eeaf.svg" />
                    </AvatarGroup>
                  ),
                  pendentes: (
                    <AvatarGroup>
                      <Avatar />
                      <Avatar />
                      <Avatar />
                      <Avatar />
                      <Avatar />
                    </AvatarGroup>
                  ),
                  status: <strong>1/6</strong>,
                },
              ]}
              columns={[
                {
                  Header: "Equipe",
                  accessor: "equipe",
                },
                {
                  Header: "Ult. Respondidas",
                  accessor: "ult_respondidas",
                },
                {
                  Header: "Pendentes",
                  accessor: "pendentes",
                },
                {
                  Header: "Situação",
                  accessor: "status",
                },
              ]}
            />
            <AssessmentsFooter>
              <Button width="15rem" outline>
                VER TUDO
              </Button>
            </AssessmentsFooter>
          </Paper>
        </div>
        <div>
          <Paper containerStyle={{ flexDirection: "column" }}>
            <AssessmentHighlights>
              <div>
                <Title>Avaliações Realizadas</Title>
                <AssessmentAmount>486</AssessmentAmount>
              </div>
              <AssessmentFinishRateContainer>
                <div>
                  <BlackTitle>NÍVEL DE CONCLUSÃO</BlackTitle>
                  <AlertContainer>
                    <AlertIcon /> <span>Abaixo do esperado para o período</span>
                  </AlertContainer>
                </div>

                <AssessmentFinishRate>65%</AssessmentFinishRate>
              </AssessmentFinishRateContainer>
              <StatusContainer>
                <StatusProgressContainer>
                  <BlackTitle>TO DO</BlackTitle>
                  <StatusProgress>
                    <Progress percentage={27.57} color="var(--laranja)" />
                    <span>134</span>
                  </StatusProgress>
                </StatusProgressContainer>
                <StatusProgressContainer>
                  <BlackTitle>DOING</BlackTitle>
                  <StatusProgress>
                    <Progress percentage={4.11} color="var(--amarelo)" />
                    <span>20</span>
                  </StatusProgress>
                </StatusProgressContainer>
                <StatusProgressContainer>
                  <BlackTitle>DONE</BlackTitle>
                  <StatusProgress>
                    <Progress percentage={72.42} color="var(--verde)" />
                    <span>352</span>
                  </StatusProgress>
                </StatusProgressContainer>

                <p style={{ fontSize: "1.5rem" }}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Repellendus fugit magnam alias illo!
                </p>

                <PriorityContainer>
                  <Dropdown placeholder="Selecione" fullRounded={false}>
                    <DropdownItem>Últimos 7 dias</DropdownItem>
                    <DropdownItem>Quinzenal</DropdownItem>
                    <DropdownItem>Mensal</DropdownItem>
                  </Dropdown>
                </PriorityContainer>
              </StatusContainer>

              <AssessmentsFooter>
                <Button width="15rem" outline>
                  VER TUDO
                </Button>
              </AssessmentsFooter>
            </AssessmentHighlights>
          </Paper>
        </div>
      </HomeGrid>
    </Container>
  );
};

export default RHHome;
