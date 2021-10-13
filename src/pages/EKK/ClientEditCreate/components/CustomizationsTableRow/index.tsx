import { Form } from "@unform/web";
import { useCallback, useState, useEffect } from "react";
import Input from "../../../../../components/Input";
import { useToast } from "../../../../../contexts/ToastContext";
import api from "../../../../../services/api";
import { useCompany } from "../../contexts/CompanyContext";
import { DataProps } from "../../Tabs/Customizations";
import {
  Container,
  TableRow,
  BodyField,
  EditIcon,
  RemoveIcon,
  ConcluirBtn,
} from "./styles";

interface CustomizationsTableRowProps {
  data: DataProps[];
  itemData: DataProps;
  setData: (data: DataProps[]) => void;
  selected: string;
  setSelected: (selected: string) => void;
}

const CustomizationsTableRow = ({
  data,
  itemData,
  setData,
  selected,
  setSelected,
}: CustomizationsTableRowProps) => {
  const [inputText, setInputText] = useState<string>("");

  const { addToast } = useToast();

  const { currentCompany, updateCompany } = useCompany();

  useEffect(() => {
    if (itemData.alias) {
      setInputText(itemData.alias);
    }
  }, [itemData]);

  const handleEditClick = useCallback(() => {
    setSelected(itemData.id);
  }, [itemData.id, setSelected]);

  const handleRemoveClick = useCallback(async () => {
    setSelected("");

    const filteredArray = data.filter(
      (field) => field.category_id !== itemData.category_id
    );

    let currentItemStatus = itemData.isAnswerTheme
      ? "answers-theme"
      : "answers";

    try {
      const response = await api.post(`company/${currentItemStatus}/delete`, {
        id: itemData.id,
      });

      if (response.data.success) {
        addToast({
          type: "success",
          title: "Sucesso ao Deletar",
          description: "Este item foi deletado com sucesso.",
        });

        if (currentItemStatus === "answers") {
          const updatedCompany = currentCompany.PersonalizationAnswer.filter(
            (company) => company.id !== itemData.id
          );

          updateCompany({
            PersonalizationAnswer: [...updatedCompany],
          });
        } else {
          const updatedCompany =
            currentCompany.PersonalizationAnswerTheme.filter(
              (company) => company.id !== itemData.id
            );

          updateCompany({
            PersonalizationAnswerTheme: [...updatedCompany],
          });
        }

        setData(filteredArray);
      }
    } catch (err) {
      addToast({
        type: "error",
        title: "Erro ao Deletar",
        description:
          "Ocorreu um erro ao deletar, contate o suporte para mais informações.",
      });
    }
  }, [
    setSelected,
    setData,
    data,
    itemData.category_id,
    addToast,
    itemData.id,
    itemData.isAnswerTheme,
    currentCompany,
    updateCompany,
  ]);

  const handleConcluirClick = useCallback(async () => {
    setSelected("");

    let currentItemStatus = itemData.isAnswerTheme
      ? "answers-theme"
      : "answers";

    if (inputText === "") {
      addToast({
        type: "error",
        title: "Erro ao Salvar",
        description: "Este valor não pode ser nulo.",
      });

      return;
    }

    try {
      if (currentItemStatus === "answers") {
        const response = await api.post("company/answers", {
          company_id: currentCompany.id,
          default_id: itemData.default_answer_id,
          alias: inputText,
        });

        if (response.data.success) {
          addToast({
            type: "success",
            title: "Sucesso ao Salvar",
            description: "Item Salvo com sucesso.",
          });

          const updatedCompany = [...currentCompany.PersonalizationAnswer];

          const itemIndex = updatedCompany.findIndex(
            (field) => field.default_answer_id === itemData.default_answer_id
          );

          updatedCompany[itemIndex].alias = inputText;

          updateCompany({
            PersonalizationAnswer: updatedCompany,
          });
        }
      } else {
        const response = await api.post("company/answers-theme", {
          company_id: currentCompany.id,
          category_id: itemData.category_id,
          alias: inputText,
        });

        if (response.data.success) {
          addToast({
            type: "success",
            title: "Sucesso ao Salvar",
            description: "Item Salvo com sucesso.",
          });

          const updatedCompany = [...currentCompany.PersonalizationAnswerTheme];

          const itemIndex = updatedCompany.findIndex(
            (field) => field.category_id === itemData.category_id
          );

          updatedCompany[itemIndex].alias = inputText;

          updateCompany({
            PersonalizationAnswerTheme: updatedCompany,
          });
        }
      }
    } catch (err) {
      console.log(err);

      addToast({
        type: "error",
        title: "Erro ao Salvar",
        description:
          "Ocorreu um erro ao salvar, contate o suporte para mais informações.",
      });
    }
  }, [
    addToast,
    currentCompany.PersonalizationAnswer,
    currentCompany.PersonalizationAnswerTheme,
    currentCompany.id,
    inputText,
    itemData.category_id,
    itemData.isAnswerTheme,
    itemData.default_answer_id,
    setSelected,
    updateCompany,
  ]);

  const handleInputChange = useCallback(
    (e) => {
      setInputText(e.target.value);
    },
    [setInputText]
  );

  return (
    <Container>
      {selected === itemData.id ? (
        <TableRow container active="true">
          <BodyField item xs={4} active="true">
            {itemData.name}
          </BodyField>
          <BodyField item xs={4}>
            <Form onSubmit={() => {}}>
              <Input
                value={inputText}
                name={itemData.alias ?? ""}
                containerStyle={{ background: "#FFF", width: "35rem" }}
                onChange={handleInputChange}
              />
            </Form>
          </BodyField>
          <BodyField item xs={4}>
            <RemoveIcon onClick={handleRemoveClick} />
            <ConcluirBtn onClick={handleConcluirClick}>CONCLUIR</ConcluirBtn>
          </BodyField>
        </TableRow>
      ) : (
        <TableRow container>
          <BodyField item xs={4}>
            {itemData.name}
          </BodyField>
          <BodyField item xs={4}>
            {itemData.alias}
          </BodyField>
          <BodyField item xs={4}>
            <EditIcon onClick={handleEditClick} />
          </BodyField>
        </TableRow>
      )}
    </Container>
  );
};

export default CustomizationsTableRow;
