import { useState } from "react";
import { AppBar } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";

import useTabs, { UseTabsProps } from "../../../../hooks/useTabs";

import Paper from "../../../../components/Paper";
import Title from "../../../../components/Title";
import Button from "../../../../components/Button";
import Modal from "../../../../components/Modal";
import GlobalFilter from "../../../../components/Table/components/GlobalFilter";

import MembersTable from "../MembersTable";
import AddTeamMembers from "../AddMembers";

import {
  CustomTabs,
  SwipeableView,
  Tab,
} from "../../../../components/Tabs/styles";

import { Flex } from "./styles";

const TeamMembers = () => {
  const tabs: UseTabsProps["tabs"] = [
    {
      title: "Ativos",
      mainComponent: <MembersTable status="active" />,
    },
    {
      title: "Inativos",
      mainComponent: <MembersTable status="inactive" />,
    },
  ];

  const { currentIndex, handleIndexChange, setCurrentIndex } = useTabs({
    tabs,
  });

  const [isAddTeamMemberModalOpen, setIsAddTeamMemberModalOpen] =
    useState(false);

  const theme = useTheme();

  return (
    <>
      <Modal
        open={isAddTeamMemberModalOpen}
        setOpen={setIsAddTeamMemberModalOpen}
      >
        <AddTeamMembers />
      </Modal>
      <Paper containerStyle={{ flexDirection: "column" }}>
        <Title>Integrantes</Title>

        <Flex>
          <AppBar
            position="static"
            color="transparent"
            elevation={0}
            style={{ marginBottom: "3rem", width: "25%" }}
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

          <Flex>
            <GlobalFilter globalFilter="" setGlobalFilter={() => {}} />
            <Button
              style={{ width: "15rem", marginLeft: "1rem" }}
              onClick={() => setIsAddTeamMemberModalOpen(true)}
            >
              ADICIONAR
            </Button>
          </Flex>
        </Flex>
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

        <Flex style={{ justifyContent: "flex-end", alignSelf: "end" }}>
          <Button style={{ width: "15rem", marginTop: "3rem" }}>SALVAR</Button>
        </Flex>
      </Paper>
    </>
  );
};

export default TeamMembers;
