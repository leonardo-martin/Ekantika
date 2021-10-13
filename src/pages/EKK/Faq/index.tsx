import React, { useCallback } from "react";

import PageTitle from "../../../components/PageTitle";
import Button from "../../../components/Button";

import { ReactComponent as FaqIcon } from "../../../assets/icons/faq.svg";

import Paper from "../../../components/Paper";
import { Form } from "@unform/web";
import { Container, PaperTitle, PaperParagraph } from "./styles";
import Textarea from "../../../components/Textarea";

const Faq: React.FC = () => {
  const handleFormSubmit = useCallback((data) => {
    console.log(data);
  }, []);

  return (
    <Container>
      <PageTitle icon={<FaqIcon />} title="FAQ" />

      <Paper
        containerStyle={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          width: "70%",
        }}
      >
        <PaperTitle>
          Estamos desenvolvendo o melhor FAQ para você usuário.
        </PaperTitle>
        <PaperParagraph>
          Sua dúvida pode ser a de outros, vamos nos ajudar? Nos conte qual sua
          dúvida para que possamos adicionar no conteúdo!
        </PaperParagraph>
        <PaperParagraph>
          Analisaremos sua dúvida e responderemos o quanto antes.
        </PaperParagraph>

        <Form
          onSubmit={handleFormSubmit}
          style={{ width: "100%", display: "flex", flexDirection: "column" }}
        >
          <Textarea
            name="concern"
            // id="description"
            // value={selectedGrouperElement.description}
            // onChange={handleGrouperInputChange}
            containerStyle={{
              width: "100%",
              margin: "2rem 0",
              background: "#F2F3F5",
            }}
            textareaStyle={{
              height: "10rem",
            }}
            placeholder="Digite sua dúvida"
          />

          <Button
            width="50%"
            type="submit"
            containerStyle={{ marginTop: "1rem" }}
          >
            SALVAR
          </Button>
        </Form>
      </Paper>
    </Container>
  );
};

export default Faq;
