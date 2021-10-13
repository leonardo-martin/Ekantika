import PageTitle from "../../../../components/PageTitle";
import Paper from "../../../../components/Paper";
import SearchInput from "../../../../components/SearchInput";
import Button from "../../../../components/Button";
import Title from "../../../../components/Title";
import Navigation from "../Navigation";

import * as S from "./styles";

const CuturalFitElements = () => {
  return (
    <div>
      <PageTitle title="Elementos de fit cultural" />

      <Navigation />

      <S.Grid>
        <Paper containerStyle={{ flexDirection: "column" }}>
          <S.SpaceBetween>
            <SearchInput value="" setValue={() => {}} />

            <Button width="15rem">NOVO ELEMENTO</Button>
          </S.SpaceBetween>

          <S.NoElement>Você ainda não adicionou nenhumm elemento</S.NoElement>
        </Paper>
        <Paper containerStyle={{ flexDirection: "column" }}>
          <Title>Biblioteca de elementos</Title>
          <SearchInput
            value=""
            setValue={() => {}}
            containerStyle={{ width: "100%" }}
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
