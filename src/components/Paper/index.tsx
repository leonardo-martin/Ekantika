import React from "react";

import { Container } from "./styles";

interface PaperProps {
  containerStyle?: object;
}

const Paper: React.FC<PaperProps> = ({ children, containerStyle = {} }) => {
  return <Container style={containerStyle}>{children}</Container>;
};

export default Paper;
