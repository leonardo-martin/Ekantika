import { useCallback, useState } from "react";

import { ReactComponent as Degree360Icon } from "../../assets/icons/360.svg";
import { ReactComponent as Degree180Icon } from "../../assets/icons/180.svg";
import { ReactComponent as Degree90Icon } from "../../assets/icons/90.svg";

import * as S from "./styles";

type Degrees = "90" | "180" | "360";

export type SelectDegreeProps = {
  onDegreeChange?: (degree: Degrees) => void;
};

const SelectDegree = (props: SelectDegreeProps) => {
  const { onDegreeChange } = props;
  const [degree, setDegree] = useState<Degrees>("360");

  const handleDegreeChange = useCallback(
    (degreeChoice: Degrees) => {
      return () => {
        setDegree(degreeChoice);
        onDegreeChange?.(degreeChoice);
      };
    },
    [onDegreeChange]
  );

  return (
    <S.Wrapper>
      <S.DegreeButton
        isSelected={degree === "360"}
        onClick={handleDegreeChange("360")}
      >
        <Degree360Icon />
        <span>360</span>
      </S.DegreeButton>
      <S.DegreeButton
        isSelected={degree === "180"}
        onClick={handleDegreeChange("180")}
      >
        <Degree180Icon />
        <span>180</span>
      </S.DegreeButton>
      <S.DegreeButton
        isSelected={degree === "90"}
        onClick={handleDegreeChange("90")}
      >
        <Degree90Icon />
        <span>90</span>
      </S.DegreeButton>
    </S.Wrapper>
  );
};

export default SelectDegree;
