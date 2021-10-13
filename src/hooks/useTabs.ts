import { useEffect, useState } from "react";

export interface UseTabsProps {
  tabs?: Array<{
    title: string;
    active?: boolean;
    mainComponent: React.ReactNode;
    subComponent?: React.ReactNode;
  }>;
  setCurrentTab?(tab: string): void;
}

export default function useTabs({ tabs, setCurrentTab }: UseTabsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (setCurrentTab) {
      tabs && setCurrentTab(tabs[0].title);
    }
  }, [setCurrentTab, tabs]);

  const handleIndexChange = (
    event: React.ChangeEvent<{}>,
    newValue: number
  ) => {
    setCurrentIndex(newValue);
    if (setCurrentTab) {
      tabs && setCurrentTab(tabs[newValue].title);
    }
  };

  return {
    currentIndex,
    currentTab: tabs?.[currentIndex],
    setCurrentIndex,
    handleIndexChange,
  };
}
