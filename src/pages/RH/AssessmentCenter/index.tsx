import { AppBar } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";

import PageTitle from "../../../components/PageTitle";
import Table from "../../../components/Table";
import Button from "../../../components/Button";
import Label from "../../../components/Label";
import StatusLabel from "../../../components/StatusLabel";
import { ReactComponent as AssessmentIcon } from "../../../assets/icons/assessment.svg";

import { Container } from "./styles";
import useTabs from "../../../hooks/useTabs";
import {
  CustomTabs,
  SwipeableView,
  Tab,
} from "../../../components/Tabs/styles";
import EditOrCopyOrRemove from "../../../components/EditOrCopyOrRemove";

const tableColumns = [
  {
    Header: "Nome",
    accessor: "nome",
  },
  {
    Header: "Tipo",
    accessor: "tipo",
  },
  {
    Header: "Etapa",
    accessor: "etapa",
  },
  {
    Header: "Responsável",
    accessor: "responsavel",
  },
  {
    Header: "Criado em",
    accessor: "criado_em",
  },
  {
    Header: "Situação",
    accessor: "status_label",
  },
  {
    Header: " ",
    accessor: "edit_remove",
  },
];

const AssessmentCenter = () => {
  const theme = useTheme();
  const assessmentsTableData = [
    {
      nome: "Avaliação de performance  180º",
      tipo: <Label>360</Label>,
      etapa: "Respostas pendentes",
      responsavel: "Lorem Ipsum Dolor",
      criado_em: "15/10/2020 - 09:16",
      status_label: <StatusLabel status="active" />,
      edit_remove: (
        <EditOrCopyOrRemove
          onEditClick={() => {}}
          onRemoveClick={() => {}}
          onCopyClick={() => {}}
        />
      ),
    },
  ];

  const tabs = [
    {
      mainComponent: (
        <Table
          pagination
          showSelectOptions
          columns={tableColumns}
          toolBarButtons={
            <Button style={{ width: "15rem", marginLeft: "1.6rem" }}>
              NOVA AVALIAÇÃO
            </Button>
          }
          tableData={assessmentsTableData}
          containerStyle={{ minHeight: "40rem" }}
        />
      ),
      title: "Avaliações",
      active: true,
    },
    {
      mainComponent: <></>,
      title: "Mapa de Desenvolvimento",
      active: true,
    },
    {
      mainComponent: <></>,
      title: "Calibragem",
      active: true,
    },
  ];

  const { currentIndex, handleIndexChange, setCurrentIndex } = useTabs({
    tabs,
  });

  return (
    <Container>
      <PageTitle title="Central de Avaliações" icon={<AssessmentIcon />} />

      <AppBar
        position="static"
        color="transparent"
        elevation={0}
        style={{ marginBottom: "3rem", width: "50%" }}
      >
        <CustomTabs
          value={currentIndex}
          onChange={handleIndexChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          {tabs.map((tab, i) => (
            <Tab
              key={tab.title + i}
              disableRipple
              disabled={tab.active === undefined ? false : !tab.active}
              label={tab.title}
              // {...a11yProps(i)} // <-- make an util, you can find it inside "components/Tabs"
            />
          ))}
        </CustomTabs>
      </AppBar>

      <SwipeableView
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={currentIndex}
        onChangeIndex={setCurrentIndex}
      >
        {tabs.map((tab, i) => (
          <div
            dir={theme.direction}
            key={i}
            role="tabpanel"
            hidden={currentIndex !== i}
            id={`full-width-tabpanel-${i}`}
          >
            {tab.mainComponent}
          </div>
        ))}
      </SwipeableView>
    </Container>
  );
};

export default AssessmentCenter;
