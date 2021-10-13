import React, { useCallback, useState, useMemo, useEffect } from "react";
import { FormHandles } from "@unform/core";

import { Grid } from "@material-ui/core";
import { useHistory, useLocation, useParams } from "react-router-dom";

import PageTitle from "../../../components/PageTitle";
import Tabs from "../../../components/Tabs";

import Data, { DataSubComponent } from "./Tabs/Data";
import Branding, { BrandingSubComponent } from "./Tabs/Branding";
import Emails, { EmailsSubComponent } from "./Tabs/Emails";

import { ReactComponent as DownloadIcon } from "../../../assets/icons/download.svg";

import Customizations, {
  CustomizationsSubComponent,
} from "./Tabs/Customizations";
import Roles from "./Tabs/Roles";

import Collaborators from "./Tabs/Collaborators";
import OrganizationalStructure from "./Tabs/OrganizationalStructure";
import Parameterizations, {
  ParameterizationsSubComponent,
} from "./Tabs/Parameterizations";
import UsersProfiles from "./Tabs/UsersProfiles";

import { useCompany } from "./contexts/CompanyContext";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";

import { Container, GobackDiv, GoBackIcon, ExportCSV } from "./styles";
import LoadingScreen from "../../../components/LoadingScreen";

interface ParamProps {
  company_id: string;
}

const EditCreateComponent: React.FC = () => {
  const { company_id } = useParams<ParamProps>();

  const [enableAllTabs, setEnableAllTabs] = useState(false);
  const [isEditPage, setIsEditPage] = useState(false);
  const [companyName, setCompanyName] = useState<string>("");
  const [currentTabSlug, setCurrentTabSlug] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  const [showDownloadButton, setShowDownloadButton] = useState(false);
  const [currentTab, setCurrentTab] = useState("");

  const [csvData, setCsvData] = useState<any[]>([]);
  const [fileName, setFileName] = useState<string>("");

  const { setCompany, currentCompany } = useCompany();

  const [formReference, setFormReference] =
    useState<React.RefObject<FormHandles> | null>(null);

  const history = useHistory();
  const { pathname, search, state } = useLocation();

  useEffect(() => {
    if (search) {
      const [, query] = search.split("=");

      setCurrentTabSlug(query);
    }
  }, [search]);

  useEffect(() => {
    setCompanyName(currentCompany.fantasy_name);
  }, [currentCompany]);

  useEffect(() => {
    if (currentTab === "Cargos" || currentTab === "Colaboradores") {
      setShowDownloadButton(true);

      if (currentTab === "Cargos") {
        setCsvData([
          {
            CODIGO: "",
            CARGO: "",
            TIPO_DE_AVALIACAO: "",
          },
        ]);
        setFileName("cargos_template");
      }

      if (currentTab === "Colaboradores") {
        setCsvData([
          {
            NOME: "",
            EMAIL: "",
            CARGO: "",
            ESTRUTURA_ORGANIZACIONAL: "",
          },
        ]);
        setFileName("colaboradores_template");
      }
    } else {
      setShowDownloadButton(false);
    }
  }, [currentTab]);

  useEffect(() => {
    const [, , , routeName] = pathname.split("/");

    if (routeName === "edit") {
      setIsEditPage(true);

      setCompany(company_id).then((currentCompanyName) => {
        if (currentCompanyName) {
          setCompanyName(currentCompanyName);
          setLoading(false);
        }
      });
    } else {
      setLoading(false);
    }
  }, [pathname, company_id, setCompany]);

  useEffect(() => {
    if (isEditPage) {
      setEnableAllTabs(true);
    }
  }, [isEditPage, setEnableAllTabs]);

  const handleGoBack = useCallback(() => {
    history.goBack();
  }, [history]);

  const tabs = useMemo(
    () => [
      {
        title: "Dados",
        active: true,
        slug: "data",
        mainComponent: (
          <Data
            setActiveAllTabs={setEnableAllTabs}
            isEditPage={isEditPage}
            setIsEditPage={setIsEditPage}
            setFormReference={setFormReference}
          />
        ),
        subComponent: (
          <DataSubComponent isEditPage={isEditPage} formRef={formReference} />
        ),
      },
      {
        title: "Branding",
        active: enableAllTabs,
        slug: "branding",
        mainComponent: <Branding />,
        subComponent: <BrandingSubComponent />,
      },
      {
        title: "E-mails",
        slug: "emails",
        active: enableAllTabs,
        mainComponent: <Emails />,
        subComponent: <EmailsSubComponent />,
      },
      {
        title: "Personalizações",
        slug: "customizations",
        active: enableAllTabs,
        mainComponent: <Customizations />,
        subComponent: <CustomizationsSubComponent />,
      },
      {
        title: "Cargos",
        slug: "roles",
        active: enableAllTabs,
        mainComponent: <Roles />,
      },
      {
        title: "Estrutura Organizacional",
        slug: "structure",
        active: enableAllTabs,
        mainComponent: <OrganizationalStructure />,
      },
      {
        title: "Colaboradores",
        slug: "collaborators",
        active: enableAllTabs,
        mainComponent: <Collaborators />,
      },
      {
        title: "Parametrizações",
        slug: "parameterizations",
        active: enableAllTabs,
        mainComponent: <Parameterizations />,
        subComponent: <ParameterizationsSubComponent />,
      },
      {
        title: "Perfis Usuários",
        slug: "profile",
        active: enableAllTabs,
        mainComponent: <UsersProfiles />,
      },
    ],
    [formReference, enableAllTabs, isEditPage, setEnableAllTabs, setIsEditPage]
  );

  const handleExportToCSV = useCallback(() => {
    const fileType =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";

    const ws = XLSX.utils.json_to_sheet(csvData);

    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };

    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });

    const data = new Blob([excelBuffer], { type: fileType });

    FileSaver.saveAs(data, fileName + ".xlsx");
  }, [csvData, fileName]);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <Container>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          marginBottom: "2rem",
        }}
      >
        <GobackDiv>
          <GoBackIcon onClick={handleGoBack} />

          <PageTitle
            containerStyle={{ margin: 0 }}
            title={companyName ? companyName : "Novo cliente"}
          />
        </GobackDiv>

        {showDownloadButton && (
          <ExportCSV onClick={handleExportToCSV}>
            Arquivo padrão importação em lote
            <DownloadIcon />
          </ExportCSV>
        )}
      </div>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Tabs
            tabs={tabs}
            setCurrentTab={setCurrentTab}
            tabSlug={currentTabSlug}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default EditCreateComponent;
