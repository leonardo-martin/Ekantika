import { useCallback, useState, useEffect } from "react";
import { Form } from "@unform/web";

import Button from "../../../../../components/Button";
import Input from "../../../../../components/Input";
import Dropdown from "../../../../../components/Dropdown";
import Paper from "../../../../../components/Paper";

import CustomizationsTableRow from "../../components/CustomizationsTableRow";

import {
  Container,
  Title,
  TableHead,
  HeadField,
  TableBody,
  DropdownItem,
} from "./styles";
import { useCompany } from "../../contexts/CompanyContext";
import api from "../../../../../services/api";
import { useToast } from "../../../../../contexts/ToastContext";

export interface DataProps {
  id: string;
  category_id: string;
  default_answer_id: string;
  name: string;
  alias?: string;
  isAnswerTheme: boolean;
}

const Customizations: React.FC = () => {
  const [selectedRowId, setSelectedRowId] = useState<string>("");
  const [data, setData] = useState<DataProps[]>([] as DataProps[]);

  const [inputNewAnswer, setInputNewAnswer] = useState("");

  const [selectedAnswer, setSelectedAnswer] = useState<DataProps>(
    {} as DataProps
  );
  const [dropdownData, setDropdownData] = useState<DataProps[]>(
    [] as DataProps[]
  );

  const { addToast } = useToast();
  const { currentCompany, updateCompany } = useCompany();

  useEffect(() => {
    let initialData = [
      {
        id: "",
        default_answer_id: "",

        category_id: "2",
        name: "Desempenho",
        alias: "",
        isAnswerTheme: true,
      },
      {
        id: "",
        default_answer_id: "",

        category_id: "1",
        name: "Fit Cultural",
        alias: "",
        isAnswerTheme: true,
      },
      {
        id: "",
        default_answer_id: "",

        category_id: "3",
        name: "3C’s",
        alias: "",
        isAnswerTheme: true,
      },
    ];

    if (currentCompany.PersonalizationAnswerTheme) {
      const answersTheme = currentCompany.PersonalizationAnswerTheme;

      const filledAnswersTheme = [] as any;

      for (let i = 0; i < answersTheme.length; i++) {
        const indexToDelete = initialData.findIndex(
          (item) => item.name === answersTheme[i].name
        );
        initialData.splice(indexToDelete, 1);

        const answer = {
          ...answersTheme[i],
          isAnswerTheme: true,
        };

        filledAnswersTheme.push(answer);
      }

      setDropdownData(initialData);
      setData(filledAnswersTheme);
    } else {
      setDropdownData(initialData);
    }
  }, [currentCompany.PersonalizationAnswerTheme, setData]);

  const handleSubmit = useCallback(
    async (data: { evaluationTheme: string }) => {
      if (data.evaluationTheme === "") {
        addToast({
          type: "error",
          title: "Erro ao Salvar",
          description: "Este valor não pode ser nulo.",
        });

        return;
      }

      try {
        const response = await api.post("company/answers-theme", {
          company_id: currentCompany.id,
          category_id: selectedAnswer.category_id,
          alias: data.evaluationTheme,
        });

        if (response.data.success) {
          addToast({
            type: "success",
            title: "Sucesso ao Salvar",
            description: "Item Salvo com sucesso.",
          });

          const updatedCompany = [...currentCompany.PersonalizationAnswerTheme];

          updatedCompany.push(response.data.payload);

          updateCompany({
            PersonalizationAnswerTheme: updatedCompany,
          });

          setInputNewAnswer("");
          setSelectedAnswer({} as DataProps);
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
    },
    [
      selectedAnswer,
      setSelectedAnswer,
      currentCompany.id,
      addToast,
      currentCompany.PersonalizationAnswerTheme,
      updateCompany,
    ]
  );

  return (
    <Container>
      <Title>Temas das avaliações</Title>
      <Form onSubmit={handleSubmit} style={{ display: "flex", width: "50%" }}>
        <Dropdown
          value={selectedAnswer && selectedAnswer.name}
          placeholder="Selecione"
        >
          {dropdownData.map((item) => (
            <DropdownItem
              key={item.id}
              type="button"
              onClick={() => {
                setSelectedAnswer(item);
              }}
            >
              {item.name}
            </DropdownItem>
          ))}
        </Dropdown>

        <Input
          name="evaluationTheme"
          placeholder="Digite o novo nome"
          containerStyle={{ background: "#F2F3F5", margin: "0 2rem" }}
          value={inputNewAnswer}
          onChange={(e) => setInputNewAnswer(e.target.value)}
        />

        <Button width="25rem" type="submit">
          SALVAR
        </Button>
      </Form>

      <TableHead container>
        <HeadField item xs={4}>
          DE
        </HeadField>
        <HeadField item xs={4}>
          PARA
        </HeadField>
        <HeadField item xs={4}></HeadField>
      </TableHead>

      <TableBody>
        {data.map((item) => (
          <CustomizationsTableRow
            key={item.category_id}
            data={data}
            itemData={item}
            setData={setData}
            selected={selectedRowId}
            setSelected={setSelectedRowId}
          />
        ))}
      </TableBody>
    </Container>
  );
};

export const CustomizationsSubComponent: React.FC = () => {
  const [inputNewEvaluationAnswer, setInputNewEvaluationAnswer] = useState("");
  const [inputNewCulturalFitAnswer, setInputNewCulturalFitAnswer] =
    useState("");

  const [evaluationSelectedRowId, setEvaluationSelectedRowId] =
    useState<string>("");
  const [evaluationData, setEvaluationData] = useState<DataProps[]>(
    [] as DataProps[]
  );
  const [selectedEvaluationAnswer, setSelectedEvaluationAnswer] =
    useState<DataProps>({} as DataProps);
  const [dropdownEvaluationData, setDropdownEvaluationData] = useState<
    DataProps[]
  >([] as DataProps[]);

  const [fitCulturalSelectedRowId, setFitCulturalSelectedRowId] =
    useState<string>("");
  const [fitCulturalData, setFitCulturalData] = useState<DataProps[]>(
    [] as DataProps[]
  );
  const [selectedFitCulturalAnswer, setSelectedFitCulturalAnswer] =
    useState<DataProps>({} as DataProps);
  const [dropdownFitCulturalData, setDropdownFitCulturalData] = useState<
    DataProps[]
  >([] as DataProps[]);

  const { addToast } = useToast();
  const { currentCompany, updateCompany } = useCompany();

  useEffect(() => {
    let evaluationInitialData = [
      {
        id: "",
        default_answer_id: "",
        category_id: "1",
        name: "Positivo",
        alias: "",
        isAnswerTheme: false,
      },
      {
        id: "",
        default_answer_id: "",
        category_id: "2",
        name: "Negativo",
        alias: "",
        isAnswerTheme: false,
      },
      {
        id: "",
        default_answer_id: "",
        category_id: "3",
        name: "Neutro",
        alias: "",
        isAnswerTheme: false,
      },
    ];

    let fitCulturalInitialData = [
      {
        id: "",
        default_answer_id: "",
        category_id: "4",
        name: "Acima",
        alias: "",
        isAnswerTheme: false,
      },
      {
        id: "",
        default_answer_id: "",
        category_id: "5",
        name: "Abaixo",
        alias: "",
        isAnswerTheme: false,
      },
      {
        id: "",
        default_answer_id: "",
        category_id: "6",
        name: "Dentro",
        alias: "",
        isAnswerTheme: false,
      },
    ];

    if (currentCompany.PersonalizationAnswer) {
      const answers = currentCompany.PersonalizationAnswer;

      console.log(answers);

      const filledEvaluationAnswersTheme = [] as any;
      const filledCulturaFitAnswersTheme = [] as any;

      for (let i = 0; i < answers.length; i++) {
        // Fit Cultural
        if (answers[i].category_id === "1") {
          const indexToDelete = fitCulturalInitialData.findIndex(
            (item) => item.name === answers[i].name
          );
          fitCulturalInitialData.splice(indexToDelete, 1);

          filledCulturaFitAnswersTheme.push(answers[i]);
        }

        // Desempenho
        if (answers[i].category_id === "2") {
          const indexToDelete = evaluationInitialData.findIndex(
            (item) => item.name === answers[i].name
          );

          evaluationInitialData.splice(indexToDelete, 1);

          filledEvaluationAnswersTheme.push(answers[i]);
        }
      }

      setDropdownFitCulturalData(fitCulturalInitialData);
      setDropdownEvaluationData(evaluationInitialData);

      setEvaluationData(filledEvaluationAnswersTheme);
      setFitCulturalData(filledCulturaFitAnswersTheme);
    } else {
      setDropdownFitCulturalData(fitCulturalInitialData);
      setDropdownEvaluationData(evaluationInitialData);
    }
  }, [currentCompany.PersonalizationAnswer]);

  const handlePerformanceSubmit = useCallback(
    async (data: { performance: string }) => {
      if (data.performance === "") {
        addToast({
          type: "error",
          title: "Erro ao Salvar",
          description: "Este valor não pode ser nulo.",
        });

        return;
      }

      try {
        const response = await api.post("company/answers", {
          company_id: currentCompany.id,
          default_id: selectedEvaluationAnswer.category_id,
          alias: data.performance,
        });

        if (response.data.success) {
          addToast({
            type: "success",
            title: "Sucesso ao Salvar",
            description: "Item Salvo com sucesso.",
          });

          const updatedCompany = [...currentCompany.PersonalizationAnswer];

          updatedCompany.push(response.data.payload);

          updateCompany({
            PersonalizationAnswer: updatedCompany,
          });

          setSelectedEvaluationAnswer({} as DataProps);
          setInputNewEvaluationAnswer("");
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
    },
    [
      addToast,
      currentCompany.PersonalizationAnswer,
      currentCompany.id,
      selectedEvaluationAnswer.category_id,
      updateCompany,
    ]
  );
  const handleCulturalFitSubmit = useCallback(
    async (data: { culturalFit: string }) => {
      if (data.culturalFit === "") {
        addToast({
          type: "error",
          title: "Erro ao Salvar",
          description: "Este valor não pode ser nulo.",
        });

        return;
      }

      try {
        const response = await api.post("company/answers", {
          company_id: currentCompany.id,
          default_id: selectedFitCulturalAnswer.category_id,
          alias: data.culturalFit,
        });

        if (response.data.success) {
          addToast({
            type: "success",
            title: "Sucesso ao Salvar",
            description: "Item Salvo com sucesso.",
          });

          const updatedCompany = [...currentCompany.PersonalizationAnswer];

          updatedCompany.push(response.data.payload);

          console.log(updatedCompany[0]);
          console.log(response.data.payload);

          updateCompany({
            PersonalizationAnswer: updatedCompany,
          });

          setSelectedFitCulturalAnswer({} as DataProps);
          setInputNewCulturalFitAnswer("");
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
    },
    [
      addToast,
      currentCompany.PersonalizationAnswer,
      currentCompany.id,
      selectedFitCulturalAnswer.category_id,
      updateCompany,
    ]
  );
  return (
    <>
      <Paper
        containerStyle={{ flexDirection: "column", padding: "3.8rem 4.2rem" }}
      >
        <Title>Respostas avaliações de desempenho</Title>
        <Form
          onSubmit={handlePerformanceSubmit}
          style={{ display: "flex", width: "50%" }}
        >
          <Dropdown
            value={selectedEvaluationAnswer && selectedEvaluationAnswer.name}
            placeholder="Selecione"
          >
            {dropdownEvaluationData.map((item, i) => (
              <DropdownItem
                key={item.alias + String(i)}
                type="button"
                onClick={() => {
                  setSelectedEvaluationAnswer(item);
                }}
              >
                {item.name}
              </DropdownItem>
            ))}
          </Dropdown>

          <Input
            name="performance"
            placeholder="Digite o novo nome"
            containerStyle={{ background: "#F2F3F5", margin: "0 2rem" }}
            value={inputNewEvaluationAnswer}
            onChange={(e) => setInputNewEvaluationAnswer(e.target.value)}
          />

          <Button width="25rem" type="submit">
            SALVAR
          </Button>
        </Form>

        <TableHead container>
          <HeadField item xs={4}>
            DE
          </HeadField>
          <HeadField item xs={4}>
            PARA
          </HeadField>
          <HeadField item xs={4}></HeadField>
        </TableHead>

        <TableBody>
          {evaluationData.map((item, i) => (
            <CustomizationsTableRow
              key={item.alias + String(i)}
              data={evaluationData}
              itemData={item}
              setData={setEvaluationData}
              selected={evaluationSelectedRowId}
              setSelected={setEvaluationSelectedRowId}
            />
          ))}
        </TableBody>
      </Paper>
      <Paper
        containerStyle={{
          marginTop: "2rem",
          flexDirection: "column",
          padding: "3.8rem 4.2rem",
        }}
      >
        <Title>Respostas avaliações de fit cultural</Title>
        <Form
          onSubmit={handleCulturalFitSubmit}
          style={{ display: "flex", width: "50%" }}
        >
          <Dropdown
            value={selectedFitCulturalAnswer && selectedFitCulturalAnswer.name}
            placeholder="Selecione"
          >
            {dropdownFitCulturalData.map((item) => (
              <DropdownItem
                key={item.alias + item.id}
                type="button"
                onClick={() => {
                  setSelectedFitCulturalAnswer(item);
                }}
              >
                {item.name}
              </DropdownItem>
            ))}
          </Dropdown>

          <Input
            name="culturalFit"
            placeholder="Digite o novo nome"
            containerStyle={{ background: "#F2F3F5", margin: "0 2rem" }}
            value={inputNewCulturalFitAnswer}
            onChange={(e) => setInputNewCulturalFitAnswer(e.target.value)}
          />

          <Button width="25rem" type="submit">
            SALVAR
          </Button>
        </Form>

        <TableHead container>
          <HeadField item xs={4}>
            DE
          </HeadField>
          <HeadField item xs={4}>
            PARA
          </HeadField>
          <HeadField item xs={4}></HeadField>
        </TableHead>

        <TableBody>
          {fitCulturalData.map((item, i) => (
            <CustomizationsTableRow
              key={item.alias + String(i)}
              data={fitCulturalData}
              itemData={item}
              setData={setFitCulturalData}
              selected={fitCulturalSelectedRowId}
              setSelected={setFitCulturalSelectedRowId}
            />
          ))}
        </TableBody>
      </Paper>
    </>
  );
};

export default Customizations;
