import React, { useMemo, useState } from "react";

import { Grid } from "@material-ui/core";

import PageTitle from "../../../components/PageTitle";
import Tabs from "../../../components/Tabs";

import Performance, { PerformanceSubComponent } from "./Tabs/Performance";
import CulturalFit, { CulturalFitSubComponent } from "./Tabs/CulturalFit";
import ThreeCs, { ThreeCsSubComponent } from "./Tabs/ThreeCs";

import { ReactComponent as ElementsIcon } from "../../../assets/icons/elements.svg";

import { Container } from "./styles";

const Elements: React.FC = () => {
  const [culturalFitData, setCulturalFitData] = useState({} as any);
  const [performanceData, setPerformanceData] = useState({} as any);
  const [threeCsData, setThreeCsData] = useState({} as any);

  const tabs = useMemo(
    () => [
      {
        title: "Desempenho",
        mainComponent: <Performance setPerformanceData={setPerformanceData} />,
        subComponent: (
          <PerformanceSubComponent performanceData={performanceData} />
        ),
      },
      {
        title: "Fit cultural",
        mainComponent: <CulturalFit setCulturalFitData={setCulturalFitData} />,
        subComponent: (
          <CulturalFitSubComponent culturalFitData={culturalFitData} />
        ),
      },
      {
        title: "3C’s",
        mainComponent: <ThreeCs setThreeCsData={setThreeCsData} />,
        subComponent: <ThreeCsSubComponent threeCsData={threeCsData} />,
      },
    ],
    [
      setCulturalFitData,
      culturalFitData,
      setPerformanceData,
      performanceData,
      setThreeCsData,
      threeCsData,
    ]
  );

  return (
    <Container>
      <PageTitle icon={<ElementsIcon />} title="Elementos" />

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Tabs tabs={tabs} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Elements;
