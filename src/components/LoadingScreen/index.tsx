import React from "react";
import { Container } from "./styles";

import CircularProgress from "@material-ui/core/CircularProgress";

interface LoadingScreenProps {}

const LoadingScreen: React.FC<LoadingScreenProps> = () => {
  return (
    <Container>
      <CircularProgress />
    </Container>
  );
};

export default LoadingScreen;
