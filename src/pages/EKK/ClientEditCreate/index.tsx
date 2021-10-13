import React from "react";

import CompanyProvider from "./contexts/CompanyContext";
import EditCreateComponent from "./EditCreateComponent";

const ClientEditCreate: React.FC = () => {
  return (
    <CompanyProvider>
      <EditCreateComponent />
    </CompanyProvider>
  );
};

export default ClientEditCreate;
