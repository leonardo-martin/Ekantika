import * as S from "./styles";

export type StepsNavigationProps = {
  totalSteps: number;
  currentStep: number;
  onButtonClick?: (step: number) => void;
};

const StepsNavigation = (props: StepsNavigationProps) => {
  return (
    <S.Wrapper currentStep={props.currentStep}>
      {new Array(props.totalSteps).fill(null).map((_, i) => (
        <S.Button onClick={() => props.onButtonClick?.(i + 1)}>
          {i + 1}
        </S.Button>
      ))}
    </S.Wrapper>
  );
};

export default StepsNavigation;
