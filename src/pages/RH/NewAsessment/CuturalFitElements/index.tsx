import { useState } from 'react';
import PageTitle from '../../../../components/PageTitle';
import Paper from '../../../../components/Paper';
import SearchInput from '../../../../components/SearchInput';
import Button from '../../../../components/Button';
import Title from '../../../../components/Title';
import Navigation from '../Navigation';
import Input from '../../../../components/Input';
import { Form } from "@unform/web";

import { Grid } from '@material-ui/core';

import * as S from './styles';

interface ElementProps {
  id: string;
  uuid: string;
  type_id: string;
  category_id: string;
  question: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  answer_type_id: string;
  performance_evaluation_id: string;
  parent_id: string;
  justify_answer: string;
  justiry_required: string;
  length_mix: string;
  length_max: string;
  description: string;
  grouper: string;
}

const CuturalFitElements = () => {
  const [selectedElement, setSelectedElement] = useState<ElementProps>(
    {} as ElementProps
  );
  return (
    <div>
      <PageTitle title="Elementos de fit cultural" />

      <Navigation />

      <S.Grid>
        <Paper containerStyle={{ flexDirection: 'column' }}>
          <S.SpaceBetween>
            <SearchInput value="" setValue={() => {}} />

            <Button width="15rem">NOVO ELEMENTO</Button>
          </S.SpaceBetween>

            {/* <S.NoElement>Você ainda não adicionou nenhum elemento</S.NoElement> */}
          <Form onSubmit={() => {}} style={{ display: 'flex' }}>
            <S.Answer>
              <Grid container>
                <Grid item xs={3}>
                  <S.AnswerSubtitle>Justificar resposta?</S.AnswerSubtitle>

                  <S.Switch
                    color="primary"
                    checked={
                      selectedElement.justify_answer === '1' ? true : false
                    }
                    onChange={() => {
                      setSelectedElement((prevState) => ({
                        ...prevState,
                        justify_answer:
                          selectedElement.justify_answer === '1' ? '0' : '1',
                      }));
                    }}
                  />
                </Grid>
                <Grid item xs={3}>
                  <S.AnswerSubtitle>Obrigatória?</S.AnswerSubtitle>

                  <S.Switch
                    color="primary"
                    checked={
                      selectedElement.justify_answer === '1' ? true : false
                    }
                    onChange={() => {
                      setSelectedElement((prevState) => ({
                        ...prevState,
                        justify_answer:
                          selectedElement.justify_answer === '1' ? '0' : '1',
                      }));
                    }}
                  />
                </Grid>
                <Grid item xs={3}>
                  <S.AnswerSubtitle>Caracteres</S.AnswerSubtitle>
                  <div style={{ display: 'flex' }}>
                    <Input
                      name="min"
                      id="min"
                      containerStyle={{ width: '45rem', marginTop: '2rem' }}
                      placeholder="Mín."
                      value={selectedElement.length_mix}
                    />
                    <Input
                      name="max"
                      id="max"
                      containerStyle={{
                        width: '45rem',
                        marginTop: '2rem',
                        marginLeft: '1rem',
                      }}
                      placeholder="Máx"
                      value={selectedElement.length_max}
                    />
                  </div>
                </Grid>
              </Grid>
            </S.Answer>
          </Form>
        </Paper>
        <Paper containerStyle={{ flexDirection: 'column' }}>
          <Title>Biblioteca de elementos</Title>
          <SearchInput
            value=""
            setValue={() => {}}
            containerStyle={{ width: '100%' }}
          />

          <S.ElementsList>
            <S.Element>
              <S.PlusIcon />
              <span>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
                eget scelerisque?
              </span>
            </S.Element>
          </S.ElementsList>
        </Paper>
      </S.Grid>
    </div>
  );
};

export default CuturalFitElements;
