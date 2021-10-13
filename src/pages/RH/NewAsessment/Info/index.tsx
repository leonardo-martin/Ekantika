import { Avatar } from "@material-ui/core";

import PageTitle from "../../../../components/PageTitle";
import Paper from "../../../../components/Paper";
import Title from "../../../../components/Title";
import InputLabel from "../../../../components/InputLabel";
import DatePicker from "../../../../components/DatePicker";
import Dropdown from "../../../../components/Dropdown";
import DropdownItem from "../../../../components/DropdownItem";
import Navigation from "../Navigation";
import SelectDegree from "../../../../components/SelectDegree";
import THeadAsDiv from "../../../../components/THeadAsDiv";
import Label from "../../../../components/Label";
import Table from "../../../../components/Table";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "../../../../components/Accordion";

import * as S from "./styles";

const AsessmentInfo = () => {
  return (
    <div>
      <PageTitle title="Informações" />

      <Navigation />

      <S.Grid>
        <Paper containerStyle={{ flexDirection: "column" }}>
          <Title>DEFINIÇÕES</Title>

          <S.HStack>
            <div>
              <InputLabel htmlFor="assessment-name">Defina um nome</InputLabel>
              {/* <Input name="assessment-name" /> */}
            </div>
            <div>
              <InputLabel>Selecione um Tipo</InputLabel>

              <SelectDegree />
            </div>
          </S.HStack>
        </Paper>
        <Paper containerStyle={{ flexDirection: "column" }}>
          <Title>PERÍODO DE REFERÊNCIA</Title>
          <S.HStack>
            <div>
              <InputLabel>Início</InputLabel>
              <DatePicker
                initialDate={null}
                placeholder="Selecione início"
                setDate={() => {}}
              />
            </div>
            <div>
              <InputLabel>Fim</InputLabel>
              <DatePicker
                initialDate={null}
                placeholder="Selecione fim"
                setDate={() => {}}
              />
            </div>
          </S.HStack>
        </Paper>
        <Paper containerStyle={{ flexDirection: "column" }}>
          <Title>PARTICIPANTES</Title>
          <div>
            <S.HStack style={{ width: "max-content" }}>
              <div>
                <InputLabel>Selecione um CNPJ</InputLabel>
                <Dropdown placeholder="Selecione " fullRounded={false}>
                  <DropdownItem></DropdownItem>
                </Dropdown>
              </div>
              <div>
                <InputLabel>Filtrar por</InputLabel>
                <Dropdown placeholder="Selecione filtro" fullRounded={false}>
                  <DropdownItem>Equipe</DropdownItem>
                  <DropdownItem>Cargo</DropdownItem>
                  <DropdownItem>Estrutura</DropdownItem>
                </Dropdown>
              </div>
              <div>
                <InputLabel>Selecione um item</InputLabel>
                <Dropdown placeholder="Selecione filtro" fullRounded={false}>
                  <DropdownItem></DropdownItem>
                </Dropdown>
              </div>
            </S.HStack>
          </div>

          <S.MembersTable>
            <THeadAsDiv gridTemplateColumns="3fr 2fr 2fr 6.4rem 4.8rem">
              <span>CNPJ</span>
              <span>EQUIPE</span>
              <span>PARTICIPANTES</span>
              <span></span>
            </THeadAsDiv>

            <S.MembersTableRow>
              <Accordion>
                <AccordionSummary>
                  <S.MembersTableRowData>
                    <span>73.367.831/0001-70 | nome razão social</span>
                    <span>Squad Maiden</span>
                    <span>6</span>
                  </S.MembersTableRowData>
                </AccordionSummary>
                <AccordionDetails>
                  <S.MembersTableRowDataDetails>
                    <S.SquadInfo>
                      <S.SquadTitle>
                        Integrantes do: <span>SQUAD MADEN</span>
                      </S.SquadTitle>
                      <Label colorScheme="primary">6 ativos</Label>
                      <Label colorScheme="secondary">8 inativos</Label>
                    </S.SquadInfo>

                    <Table
                      containerStyle={{ width: "100%" }}
                      pagination={false}
                      showSelectOptions
                      showToolbar={false}
                      columns={[
                        { Header: " ", accessor: "avatar" },
                        { Header: "Nome", accessor: "nome" },
                        { Header: "Função", accessor: "funcao" },
                        { Header: "Situação", accessor: "status" },
                      ]}
                      tableData={[
                        {
                          avatar: (
                            <Avatar src="/static/media/user-placeholder.a5f6eeaf.svg" />
                          ),
                          nome: "Consectetur smith",
                          funcao: "Business owner",
                          status: "Ativo",
                        },
                      ]}
                    />
                  </S.MembersTableRowDataDetails>
                </AccordionDetails>
              </Accordion>
              <S.Delete />
            </S.MembersTableRow>
          </S.MembersTable>
        </Paper>
      </S.Grid>
    </div>
  );
};

export default AsessmentInfo;
