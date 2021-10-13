import React, { useState, useEffect } from "react";
import { AppBar } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import Paper from "../Paper";

import { Container, CustomTabs, Tab, SwipeableView } from "./styles";
import { useHistory, useLocation } from "react-router-dom";

function a11yProps(index: any) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

interface TabsProps {
  tabs: Array<{
    title: string;
    active?: boolean;
    slug?: string;
    mainComponent: React.ReactNode;
    subComponent?: React.ReactNode;
  }>;
  setCurrentTab?(tab: string): void;
  tabSlug?: string;
}

const Tabs: React.FC<TabsProps> = ({ tabs, setCurrentTab, tabSlug }) => {
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const history = useHistory();
  const { pathname } = useLocation();

  useEffect(() => {
    if (setCurrentTab) {
      setCurrentTab(tabs[0].title);
    }
  }, [setCurrentTab, tabs]);

  useEffect(() => {
    if (tabSlug) {
      const findIndexBySlug = tabs.findIndex((tab) => tab.slug === tabSlug);

      if (findIndexBySlug) {
        setValue(findIndexBySlug);
      }
    }
  }, [tabSlug, tabs]);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);

    if (setCurrentTab) {
      setCurrentTab(tabs[newValue].title);

      const slug = tabs[newValue].slug;

      history.replace(`${pathname}?tab=${slug}`);
    }
  };

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };

  return (
    <Container>
      <Paper
        containerStyle={{
          flexDirection: "column",
          marginBottom: "3rem",
          overflowX: "unset",
        }}
      >
        <AppBar
          position="static"
          color="transparent"
          elevation={0}
          style={{ marginBottom: "3rem" }}
        >
          <CustomTabs
            value={value}
            onChange={handleChange}
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
                {...a11yProps(i)}
              />
            ))}
          </CustomTabs>
        </AppBar>
        <SwipeableView
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          {tabs.map((tab, i) => (
            <div
              dir={theme.direction}
              key={i}
              role="tabpanel"
              hidden={value !== i}
              id={`full-width-tabpanel-${i}`}
            >
              {tab.mainComponent}
            </div>
          ))}
        </SwipeableView>
      </Paper>
      {tabs[value].subComponent && <div>{tabs[value].subComponent}</div>}
    </Container>
  );
};

export default Tabs;
