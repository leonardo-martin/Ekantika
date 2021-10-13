import { useState, useMemo } from "react";
import { Avatar } from "@material-ui/core";

import { useRHTeamMembers } from "../contexts/RHTeamMembersContext";
import Title from "../../../../components/Title";
import Switch from "../../../../components/Switch";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "../../../../components/Accordion";
import THeadAsDiv from "../../../../components/THeadAsDiv";
import DatePicker from "../../../../components/DatePicker";
import Dropdown from "../../../../components/Dropdown";
import DropdownItem from "../../../../components/DropdownItem";

import {
  Data,
  NoMembersYet,
  MemberTeamsHistoryContainer,
  MemberTeamsHistoryDataContainer,
  MemberTeamsHistoryData,
  MemberNameAndRoleContainer,
  MemberName,
  MemberRole,
  ArrowDown,
  ArrowUp,
} from "./styles";

interface MembersTableProps {
  status: "inactive" | "active";
}

const MembersTable = (props: MembersTableProps) => {
  const [openedDropdowns, setOpenedDropdowns] = useState<number[]>([]);
  const {
    inactiveMembers,
    activeMembers,
    handleMemberDateUpdate,
    handleUpdateInteraction,
  } = useRHTeamMembers();

  const membersToShow = useMemo(() => {
    switch (props.status) {
      case "inactive":
        return inactiveMembers;
      case "active":
        return activeMembers;
    }
  }, [props.status, activeMembers, inactiveMembers]);

  function toggleDropdown(index: number) {
    if (openedDropdowns.includes(index)) {
      setOpenedDropdowns((state) =>
        state.filter((activeIndex) => activeIndex !== index)
      );
    } else {
      setOpenedDropdowns((state) => [...state, index]);
    }
  }

  return (
    <div>
      <THeadAsDiv
        gridTemplateColumns="8rem 3fr 2fr 1fr 1fr 1fr 48px"
        style={{ gap: "1.6rem" }}
      >
        <span></span>
        <span>Nome</span>
        <span>Função</span>
        <span>Início</span>
        <span>Fim</span>
        <span>Status</span>
        <span></span>
      </THeadAsDiv>

      {membersToShow.length ? (
        membersToShow.map((_, index) => (
          <Accordion key={index} expanded={openedDropdowns.includes(index)}>
            <AccordionSummary>
              <Data>
                <Avatar src="/static/media/user-placeholder.a5f6eeaf.svg" />
                <MemberNameAndRoleContainer>
                  <MemberName>Nome do integrante</MemberName>
                  <MemberRole>Assistente</MemberRole>
                </MemberNameAndRoleContainer>
                <Dropdown
                  placeholder="Role"
                  value="Business Owner"
                  fullRounded={false}
                >
                  <DropdownItem>Business Owner</DropdownItem>
                </Dropdown>
                <DatePicker
                  setDate={handleMemberDateUpdate("initial_date", _.id)}
                  placeholder="Selecionar data"
                  initialDate={new Date("2021-03-01")}
                />
                <DatePicker
                  setDate={handleMemberDateUpdate("final_date", _.id)}
                  placeholder="Selecionar data"
                  initialDate={new Date("2021-03-01")}
                />
                <Switch
                  defaultChecked={_.active}
                  onCheck={(value) => {
                    handleUpdateInteraction(_.id, "active", value);
                  }}
                />
                <span role="button" onClick={() => toggleDropdown(index)}>
                  {openedDropdowns.includes(index) ? (
                    <ArrowUp />
                  ) : (
                    <ArrowDown />
                  )}
                </span>
              </Data>
            </AccordionSummary>
            <AccordionDetails>
              <MemberTeamsHistoryContainer>
                <Title size="small">Histórico de times</Title>

                <THeadAsDiv gridTemplateColumns="3fr 2fr 1fr 1fr 8rem">
                  <span>Time</span>
                  <span>Período</span>
                  <span>Função</span>
                  <span>Status</span>
                </THeadAsDiv>

                <MemberTeamsHistoryDataContainer>
                  <MemberTeamsHistoryData>
                    <span>Coração</span>
                    <span>Mar/2020 à Jun/2020 </span>
                    <span>Growth Hacker</span>
                    <span>Ativo</span>
                  </MemberTeamsHistoryData>
                  <MemberTeamsHistoryData inactive>
                    <span>Terra</span>
                    <span>Fev/2020 à Abr/2020 </span>
                    <span>Scrum master</span>
                    <span>Inativo</span>
                  </MemberTeamsHistoryData>
                </MemberTeamsHistoryDataContainer>
              </MemberTeamsHistoryContainer>
            </AccordionDetails>
          </Accordion>
        ))
      ) : (
        <NoMembersYet>
          Você ainda não adicionou integrantes ao seu time.
        </NoMembersYet>
      )}
    </div>
  );
};

export default MembersTable;
