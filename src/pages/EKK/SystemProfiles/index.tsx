import React, { useMemo } from "react";

import { Grid } from "@material-ui/core";

import PageTitle from "../../../components/PageTitle";
import Tabs from "../../../components/Tabs";

import Functionalities from "./Tabs/Functionalities";
import Ekantika from "./Tabs/Ekantika";
import Gold from "./Tabs/Gold";
import Silver from "./Tabs/Silver";
import Bronze from "./Tabs/Bronze";

import { ReactComponent as ProfilesIcon } from "../../../assets/icons/profiles.svg";

import { Container } from "./styles";

const SystemProfiles: React.FC = () => {
  const tabs = useMemo(
    () => [
      {
        title: "Funcionalidades",
        mainComponent: <Functionalities />,
      },
      {
        title: "Ekantika",
        mainComponent: <Ekantika />,
      },
      {
        title: "Ouro",
        mainComponent: <Gold />,
      },
      {
        title: "Prata",
        mainComponent: <Silver />,
      },
      {
        title: "Bronze",
        mainComponent: <Bronze />,
      },
    ],
    []
  );

  return (
    <Container>
      <PageTitle icon={<ProfilesIcon />} title="Perfis do sistema" />

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Tabs tabs={tabs} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default SystemProfiles;
