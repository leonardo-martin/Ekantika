import { useCallback } from "react";
import { useParams, useHistory } from "react-router-dom";

import Button from "../../../../components/Button";
import StepsNavigation from "../../../../components/StepsNavigation";
import { ReactComponent as GoForwardIcon } from "../../../../assets/icons/go-forward.svg";

import * as S from "./styles";

const NEW_ASSESSMENT_PATH = "/rh/assessment-center/new/";

const Navigation = () => {
  const params = useParams<{ step: string }>();
  const history = useHistory();

  const step = Number(params.step);

  const goToStep = useCallback(
    (step: number) => {
      history.push(NEW_ASSESSMENT_PATH + String(step));
    },
    [history]
  );

  return (
    <S.NavigationContainter>
      <StepsNavigation
        totalSteps={8}
        currentStep={step}
        onButtonClick={goToStep}
      />

      <S.Buttons>
        <Button width="15rem" outline>
          SALVAR
        </Button>
        <Button
          width="15rem"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          AVANÇAR
          <GoForwardIcon
            style={{
              width: "3.2rem",
              height: "3.2rem",
              marginLeft: "0.8rem",
            }}
          />
        </Button>
      </S.Buttons>
    </S.NavigationContainter>
  );
};

export default Navigation;
