import { useParams } from "react-router-dom";

import { Container } from "../AssessmentCenter/styles";
import AsessmentInfo from "./Info";
import CuturalFitElements from "./CuturalFitElements";
import GradeComposition from "./GradeComposition";
import StepsDuration from "./StepsDuration";

const StepComponent = () => {
  const { step } = useParams<{ step: string }>();

  switch (step) {
    default:
    case "1":
      return <AsessmentInfo />;
    case "2":
      return <CuturalFitElements />;
    case "5":
      return <GradeComposition />;
    case "6":
      return <StepsDuration />
  }
};

const NewAssessment = () => {
  return (
    <Container>
      <StepComponent />
    </Container>
  );
};

export default NewAssessment;
