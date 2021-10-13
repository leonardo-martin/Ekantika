import { useCallback, useRef, useState } from "react";
import { FormHandles } from "@unform/core";

import Dropdown from "../../../../components/Dropdown";
import Input from "../../../../components/Input";
import Paper from "../../../../components/Paper";
import Title from "../../../../components/Title";
import Button from "../../../../components/Button";

import { Form, FormGrid, TemporaryInputLabel, DropdownItem } from "../styles";

type TeamType = "project" | "squad" | undefined;

const TeamDefinitions = () => {
  const formRef = useRef<FormHandles>(null);
  const [teamType, setTeamType] = useState<TeamType>();

  const handleDefinifionsSubmit = useCallback((data: any) => {
    console.log(data);
  }, []);

  return (
    <Paper containerStyle={{ flexDirection: "column" }}>
      <Title>DEFINIÇÕES</Title>

      <Form ref={formRef} onSubmit={handleDefinifionsSubmit}>
        <FormGrid>
          <div>
            <TemporaryInputLabel htmlFor="teamName">
              Defina um nome
            </TemporaryInputLabel>
            <Input name="teamName" placeholder="Nome" id="teamName" />
          </div>
          <div>
            <TemporaryInputLabel>Tipo de time</TemporaryInputLabel>
            <Dropdown
              placeholder={"Selecionar"}
              value={teamType}
              btnStyle={{ borderRadius: "10px" }}
            >
              <DropdownItem onClick={() => setTeamType("squad")}>
                Squad
              </DropdownItem>
              <DropdownItem onClick={() => setTeamType("project")}>
                Projeto
              </DropdownItem>
            </Dropdown>
          </div>
        </FormGrid>

        <Button type="submit" style={{ width: "15rem" }}>
          SALVAR
        </Button>
      </Form>
    </Paper>
  );
};

export default TeamDefinitions;
