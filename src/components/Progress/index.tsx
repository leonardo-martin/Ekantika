import * as S from "./styles";

export type ProgressProps = {
  percentage: number;
  color: string;
};

const Progress = (props: ProgressProps) => {
  const { percentage, color } = props;

  return (
    <S.ProgressContainer>
      <S.Progress percentage={percentage} color={color} />
    </S.ProgressContainer>
  );
};

export default Progress;
