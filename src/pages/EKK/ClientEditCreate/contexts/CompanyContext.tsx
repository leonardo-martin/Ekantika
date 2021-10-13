import React, { createContext, useCallback, useContext, useState } from "react";
import api from "../../../../services/api";
import { CompanyProps } from "./interfaces";

interface CompanyContextData {
  setCompany(id: string): Promise<string | undefined>;
  currentCompany: CompanyProps;
  updateCompany(updateData: any): void;
}

const CompanyContext = createContext<CompanyContextData>(
  {} as CompanyContextData
);

const CompanyProvider: React.FC = ({ children }) => {
  const [currentCompany, setCurrentCompany] = useState<CompanyProps>(
    {} as CompanyProps
  );

  const setCompany = useCallback(
    async (id: string): Promise<string | undefined> => {
      const response = await api.get(`company/${id}/info`);

      if (response.data.success) {
        const company = response.data.payload as CompanyProps;

        setCurrentCompany(company);

        return company.fantasy_name;
      }
    },
    []
  );

  const updateCompany = useCallback(async (updateData: any) => {
    setCurrentCompany((prevState) => ({ ...prevState, ...updateData }));
  }, []);

  //   const removeToast = useCallback((id: string) => {
  //     setMessages((prevState) =>
  //       prevState.filter((message) => message.id !== id)
  //     );
  //   }, []);

  return (
    <CompanyContext.Provider
      value={{ setCompany, currentCompany, updateCompany }}
    >
      {children}
    </CompanyContext.Provider>
  );
};

export const useCompany = (): CompanyContextData => {
  const context = useContext(CompanyContext);

  if (!context) {
    throw new Error("useCompany must be used within a CompanyProvider");
  }

  return context;
};

export default CompanyProvider;
