import { useState, useCallback } from "react";
import * as S from "./styles";

type SwitchProps = Parameters<typeof S.Switch>[0] & {
  defaultChecked?: boolean;
  onCheck: (value: boolean) => void;
};

const Switch = (props: SwitchProps) => {
  const { checked, defaultChecked, onCheck, ...switchProps } = props;
  const [isChecked, setIsCheched] = useState(defaultChecked);

  const handleCheck = useCallback(() => {
    const newState = !isChecked;
    setIsCheched(newState);
    onCheck(newState);
  }, [isChecked, onCheck]);

  return (
    <S.Switch checked={isChecked} onChange={handleCheck} {...switchProps} />
  );
};

export default Switch;
