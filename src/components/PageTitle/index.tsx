import React, { ReactNode } from "react";

import { Container, Title } from "./styles";

interface PageTitleProps {
  icon?: ReactNode;
  title: string;
  containerStyle?: object;
}

const PageTitle: React.FC<PageTitleProps> = ({
  children,
  icon,
  title,
  containerStyle = {},
}) => {
  return (
    <Container style={containerStyle}>
      {icon && icon}
      <Title>{title}</Title>
    </Container>
  );
};

export default PageTitle;
