import { memo, useState, useCallback, useEffect, useMemo } from "react";
import { Avatar } from "@material-ui/core";
import useGlobalCheckbox from "../../../../hooks/useGlobalCheckbox";

import Title from "../../../../components/Title";
import InputLabel from "../../../../components/InputLabel";
import Dropdown from "../../../../components/Dropdown";
import DropdownItem from "../../../../components/DropdownItem";
import THeadAsDiv from "../../../../components/THeadAsDiv";
import Checkbox from "../../../../components/Checkbox";
import GlobalFilter from "../../../../components/Table/components/GlobalFilter";
import {
  AccordionDetails,
  Accordion,
  AccordionSummary,
} from "../../../../components/Accordion";
import DatePicker from "../../../../components/DatePicker";
import Button from "../../../../components/Button";

import {
  AddTeamMemberContainer,
  SelectMemberHStack,
  DropdownGrid,
  Member,
  SelectedMemberDetailsContainer,
  SelectedTeamMemberAttributesGrid,
  ScrollableMembersContainer,
  Footer,
} from "./styles";

const members = [
  { id: 1 },
  { id: 2 },
  { id: 3 },
  { id: 4 },
  { id: 5 },
  { id: 6 },
];

interface MemberToAdd {
  id: string | number;
  initial_date: string;
  final_date: string;
  role: string;
}

const AddTeamMembers = () => {
  const [filterDropdownValue, setFilterDropdownValue] = useState("");
  const [detailingDropdownValue, setDetailingDropdownValue] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [membersToAdd, setMembersToAdd] = useState<MemberToAdd[]>([]);

  const {
    handleGlobalCheck,
    handleCheck,
    isChecked,
    isAllValuesChecked,
    checkedValues,
  } = useGlobalCheckbox({
    values: members.map((member) => member.id),
    globalUncheckMode: "maintainPrevCheckedValues",
  });

  /** In order to prevent iteration inside iteration when rendering */
  const membersToAddObjWithIdAsKey = useMemo(() => {
    return membersToAdd.reduce(
      (obj, member) => ({
        ...obj,
        [member.id]: member,
      }),
      {} as Record<string | number, MemberToAdd>
    );
  }, [membersToAdd]);

  useEffect(() => {
    const checkedNewMemberId = checkedValues.find((value) => {
      return !membersToAdd.find((member) => member.id === value);
    });

    if (checkedNewMemberId !== undefined) {
      setMembersToAdd((state) => {
        return [
          ...state,
          {
            id: checkedNewMemberId,
            initial_date: "",
            final_date: "",
            role: "",
          },
        ];
      });
    }

    const uncheckedMembersIds = membersToAdd
      .filter((member) => {
        return !checkedValues.includes(member.id);
      })
      .map((member) => member.id);

    if (uncheckedMembersIds.length) {
      setMembersToAdd((state) =>
        state.filter((member) => !uncheckedMembersIds.includes(member.id))
      );
    }
  }, [checkedValues, membersToAdd]);

  const updateMemberKeyValue = useCallback(
    (id: number | string, key: keyof MemberToAdd, value: string) => {
      setMembersToAdd((state) => {
        const newState = [...state];
        const member = newState.find((member) => id === member.id);

        if (member) {
          member[key] = value;
          return newState;
        }

        return state;
      });
    },
    []
  );

  const handleMemberDateChange = useCallback(
    (type: "initial_date" | "final_date", id: string | number) => {
      return (date: string) => {
        updateMemberKeyValue(id, type, date);
      };
    },
    [updateMemberKeyValue]
  );

  const handleMemberRoleChange = useCallback(
    (id: string | number, value: string) => {
      return () => {
        updateMemberKeyValue(id, "role", value);
      };
    },
    [updateMemberKeyValue]
  );

  return (
    <AddTeamMemberContainer>
      <Title>ADICIONAR COLABORADOR</Title>

      <SelectMemberHStack>
        <DropdownGrid>
          <div>
            <InputLabel>CNPJ</InputLabel>
            <Dropdown placeholder="Selecionar" fullRounded={false}>
              <DropdownItem></DropdownItem>
            </Dropdown>
          </div>
          <div>
            <InputLabel>Filtrar</InputLabel>
            <Dropdown
              placeholder="Selecionar"
              fullRounded={false}
              value={filterDropdownValue}
            >
              <DropdownItem onClick={() => setFilterDropdownValue("Todos")}>
                Todos
              </DropdownItem>
              <DropdownItem onClick={() => setFilterDropdownValue("Equipe")}>
                Equipe
              </DropdownItem>
              <DropdownItem onClick={() => setFilterDropdownValue("Cargo")}>
                Cargo
              </DropdownItem>
              <DropdownItem onClick={() => setFilterDropdownValue("Estrutura")}>
                Estrutura
              </DropdownItem>
            </Dropdown>
          </div>
          <div>
            <InputLabel>Detalhamento</InputLabel>
            <Dropdown
              placeholder="Selecionar"
              fullRounded={false}
              value={detailingDropdownValue}
            >
              <DropdownItem
                onClick={() => setDetailingDropdownValue("Nome do time")}
              >
                Nome do time
              </DropdownItem>
              <DropdownItem
                onClick={() => setDetailingDropdownValue("Nome da área")}
              >
                Nome da área
              </DropdownItem>
              <DropdownItem
                onClick={() => setDetailingDropdownValue("Nome do cargo")}
              >
                Nome do cargo
              </DropdownItem>
            </Dropdown>
          </div>
          {filterDropdownValue === "Estrutura" && (
            <div>
              <InputLabel>Incluir hierarquia?</InputLabel>
              <Dropdown placeholder="Selecionar" fullRounded={false}>
                <DropdownItem></DropdownItem>
              </Dropdown>
            </div>
          )}
        </DropdownGrid>

        <GlobalFilter
          globalFilter={searchValue}
          setGlobalFilter={setSearchValue}
          containerStyle={{ width: "100%" }}
        />

        <ScrollableMembersContainer>
          <THeadAsDiv gridTemplateColumns="7rem 6rem 2fr 1fr 1fr">
            <span>
              <Checkbox
                onChange={handleGlobalCheck}
                checked={isAllValuesChecked}
              />
            </span>
            <span></span>
            <span>Nome</span>
            <span>Cargo</span>
            <span>Departamento</span>
          </THeadAsDiv>
          {members.map((member) => (
            <Accordion expanded={isChecked(member.id)} key={member.id}>
              <AccordionSummary>
                <Member>
                  <span>
                    <Checkbox
                      onChange={() => handleCheck(member.id)}
                      checked={isChecked(member.id)}
                    />
                  </span>
                  <Avatar src="/static/media/user-placeholder.a5f6eeaf.svg" />
                  <span>
                    <span>Nome do colaborador</span>
                  </span>

                  <span>Auxiliar</span>
                  <span>Finanças</span>
                </Member>
              </AccordionSummary>
              <AccordionDetails>
                <SelectedMemberDetailsContainer>
                  {isChecked(member.id) && (
                    <SelectedTeamMemberAttributesGrid>
                      <div>
                        <InputLabel>Início da participação</InputLabel>
                        <DatePicker
                          setDate={handleMemberDateChange(
                            "initial_date",
                            member.id
                          )}
                          initialDate={null}
                          placeholder="Selecionar data"
                        />
                      </div>
                      <div>
                        <InputLabel>Fim da participação</InputLabel>
                        <DatePicker
                          setDate={handleMemberDateChange(
                            "final_date",
                            member.id
                          )}
                          initialDate={null}
                          placeholder="Selecionar data"
                        />
                      </div>
                      <div>
                        <InputLabel>Função</InputLabel>
                        <Dropdown
                          placeholder="Selecionar"
                          fullRounded={false}
                          value={membersToAddObjWithIdAsKey?.[member.id]?.role}
                        >
                          <DropdownItem
                            onClick={handleMemberRoleChange(member.id, "Role")}
                          >
                            Role
                          </DropdownItem>
                        </Dropdown>
                      </div>
                    </SelectedTeamMemberAttributesGrid>
                  )}
                </SelectedMemberDetailsContainer>
              </AccordionDetails>
            </Accordion>
          ))}
        </ScrollableMembersContainer>
        <Footer>
          <span>({checkedValues.length}) selecionados</span>
          <Button style={{ width: "15rem" }}>ADICIONAR</Button>
        </Footer>
      </SelectMemberHStack>
    </AddTeamMemberContainer>
  );
};

export default memo(AddTeamMembers);
