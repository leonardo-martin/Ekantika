import { useParams } from "react-router-dom";

import { Container } from "../AssessmentCenter/styles";
import AsessmentInfo from "./Info";
import CuturalFitElements from "./CuturalFitElements";

const StepComponent = () => {
  const { step } = useParams<{ step: string }>();

  switch (step) {
    default:
    case "1":
      return <AsessmentInfo />;
    case "2":
      return <CuturalFitElements />;
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
