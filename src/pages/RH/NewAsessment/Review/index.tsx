import PageTitle from "../../../../components/PageTitle";
import Paper from "../../../../components/Paper";
import THeadAsDiv from '../../../../components/THeadAsDiv';
import Navigation from "../Navigation";

import { ReactComponent as Degree360Icon } from "../../../../assets/icons/360.svg";
import { ReactComponent as LeaderIcon } from "../../../../assets/icons/leader.svg";
import { ReactComponent as PairIcon } from "../../../../assets/icons/pair.svg";
import { ReactComponent as LedIcon } from "../../../../assets/icons/led.svg";
import { ReactComponent as InvitedIcon } from "../../../../assets/icons/invited.svg";

import {
  Container,
  DegreeButton,
  GradeTable,
  GradeTableRow,
  GradeTableRowData,
  Grid,
  HStack,
  MembersTable,
  MembersTableRow,
  MembersTableRowData,
  ReviewTable,
  ReviewTableRow,
  ReviewTableRowData,
  Title,
  Text,
  Text2
} from "./styles";

const Review = () => {
  return (
    <div>
      <PageTitle title="Composição da nota" />

      <Navigation />
      <Grid>
        <Paper>
          <Container>
            <div>
              <Title>PERÍODO DE REFERÊNCIA</Title>
              <HStack>
                <div>
                  <Text>
                    INÍCIO
                  </Text>
                  <Text2>
                    02/12/2020
                  </Text2>
                </div>
                <div>
                  <Text>
                    FIM
                  </Text>
                  <Text2>
                    25/02/2021
                  </Text2>
                </div>
              </HStack>
            </div>
            <div>
              <HStack>
                <div>
                  <Title>TIPO DE AVALIAÇÃO</Title>       
                </div>
                <DegreeButton>
                  <Degree360Icon />
                  <span>360</span>
                </DegreeButton>
              </HStack>
            </div>
            <div>
              <Title>PARTICIPANTES</Title>
              <MembersTable>
                <THeadAsDiv gridTemplateColumns="2fr 1fr">
                  <span>CNPJ</span>
                  <span>EQUIPE</span>
                </THeadAsDiv>

                <MembersTableRow>
                  <MembersTableRowData>
                    <span>73.367.831/0001-70<br/> nome razão social</span>
                    <span>Squad Maiden</span>
                  </MembersTableRowData>
                </MembersTableRow>
                <MembersTableRow>
                  <MembersTableRowData>
                    <span>73.367.831/0001-70<br/> nome razão social</span>
                    <span>Squad Maiden</span>
                  </MembersTableRowData>
                </MembersTableRow>
                <MembersTableRow>
                  <MembersTableRowData>
                    <span>73.367.831/0001-70<br/> nome razão social</span>
                    <span>Squad Maiden</span>
                  </MembersTableRowData>
                </MembersTableRow>
              </MembersTable>
            </div>
            <HStack>
              <div>
                <Title>TOTAL DE COLABORADORES PARTICIPANTES</Title>        
              </div>
              <Text2>
                21
              </Text2>
            </HStack>
          </Container>
        </Paper>
        <Paper>
          <Container>
            <div>
              <Title>ELEMENTOS DA AVALIAÇÃO</Title>
              <ReviewTable>
                <THeadAsDiv gridTemplateColumns="1fr">
                  <span>Fit Cultural</span>
                </THeadAsDiv>
                <ReviewTableRow>
                  <ReviewTableRowData>
                    <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi eget scelerisque?</span><br />
                    <span><b>Opções de respostas:</b> ... | <b>Justificativa de resposta obrigatória:</b> Não</span>
                  </ReviewTableRowData>
                </ReviewTableRow>
                <ReviewTableRow>
                  <ReviewTableRowData>
                    <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi eget scelerisque?</span><br />
                    <span><b>Opções de respostas:</b> ... | <b>Justificativa de resposta obrigatória:</b> Não</span>
                  </ReviewTableRowData>
                </ReviewTableRow>
                <ReviewTableRow>
                  <ReviewTableRowData>
                    <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi eget scelerisque?</span><br />
                    <span><b>Opções de respostas:</b> ... | <b>Justificativa de resposta obrigatória:</b> Não</span>
                  </ReviewTableRowData>
                </ReviewTableRow>
              </ReviewTable>
              <ReviewTable>
                <THeadAsDiv gridTemplateColumns="1fr">
                  <span>Desempenho</span>
                </THeadAsDiv>
                <ReviewTableRow>
                  <ReviewTableRowData>
                    <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi eget scelerisque?</span><br />
                    <span><b>Opções de respostas:</b> ... | <b>Justificativa de resposta obrigatória:</b> Não</span>
                  </ReviewTableRowData>
                </ReviewTableRow>
              </ReviewTable>
              <ReviewTable>
                <THeadAsDiv gridTemplateColumns="1fr">
                  <span>3C's</span>
                </THeadAsDiv>
                <ReviewTableRow>
                  <ReviewTableRowData>
                    <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi eget scelerisque?</span><br />
                    <span><b>Opções de respostas:</b> ... | <b>Justificativa de resposta obrigatória:</b> Não</span>
                  </ReviewTableRowData>
                </ReviewTableRow>
              </ReviewTable>
            </div>
          </Container>
        </Paper>
        <Paper>
          <Container>
            <div>
              <Title>COMPOSIÇÃO DA NOTA</Title>
              <GradeTable>
                <GradeTableRow>
                  <GradeTableRowData>
                    <span><LeaderIcon /></span>
                    <span>Líder</span>
                    <span>40%</span>
                  </GradeTableRowData>
                </GradeTableRow>
                <GradeTableRow>
                  <GradeTableRowData>
                    <span><PairIcon /></span>
                    <span>Par</span>
                    <span>20%</span>
                  </GradeTableRowData>
                </GradeTableRow>
                <GradeTableRow>
                  <GradeTableRowData>
                    <span><LedIcon /></span>
                    <span>Líderados</span>
                    <span>40%</span>
                  </GradeTableRowData>
                </GradeTableRow>
                <GradeTableRow>
                  <GradeTableRowData>
                    <span><InvitedIcon /></span>
                    <span>Convidados</span>
                    <span>10%</span>
                  </GradeTableRowData>
                </GradeTableRow>
              </GradeTable>
            </div>
          </Container>
        </Paper>
      </Grid>
    </div>
  );
};

export default Review;

