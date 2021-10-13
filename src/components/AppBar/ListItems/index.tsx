import React, { useMemo, useCallback } from "react";
import { ListItemText } from "@material-ui/core";
import { useHistory, useLocation } from "react-router-dom";

import { ReactComponent as HomeIcon } from "../../../assets/icons/home.svg";
import { ReactComponent as ClientsIcon } from "../../../assets/icons/clients.svg";
import { ReactComponent as UsersIcon } from "../../../assets/icons/users.svg";
import { ReactComponent as ProfilesIcon } from "../../../assets/icons/profiles.svg";
import { ReactComponent as ElementsIcon } from "../../../assets/icons/elements.svg";

import { Container, TopCurve, BottomCurve, Item, ListItemIcon } from "./styles";
import { useState } from "react";
import { useEffect } from "react";

interface IListItemsProps {
  active: boolean;
  title: string;
  icon: React.ReactNode;
  navigatePath: string;
}

const ListItems: React.FC = () => {
  const itemsList = useMemo(
    () => [
      {
        active: true,
        title: "Home",
        icon: <HomeIcon />,
        navigatePath: "/ekk/dashboard",
      },
      {
        active: false,
        title: "Gestão de clientes",
        icon: <ClientsIcon />,
        navigatePath: "/ekk/client/management",
      },
      {
        active: false,
        title: "Usuários",
        icon: <UsersIcon />,
        navigatePath: "/ekk/user/all",
      },
      {
        active: false,
        title: "Perfis",
        icon: <ProfilesIcon />,
        navigatePath: "/ekk/profiles",
      },
      {
        active: false,
        title: "Elementos",
        icon: <ElementsIcon />,
        navigatePath: "/ekk/elements",
      },
    ],
    []
  );

  const [listState, setListState] = useState<IListItemsProps[]>(itemsList);

  const history = useHistory();
  const { pathname } = useLocation();

  useEffect(() => {
    const [, , routeName] = pathname.split("/");

    // console.log(routeName);

    setListState((prevState) => {
      return prevState.map((navItem) => ({
        ...navItem,
        active: navItem.navigatePath.includes(routeName) ? true : false,
      }));
    });
  }, [pathname]);

  const handleNavigation = useCallback(
    (item) => {
      history.push(item.navigatePath);
    },
    [history]
  );

  return (
    <Container>
      {listState.map((item, i) => {
        return (
          <Item
            key={i}
            button
            active={String(item.active)}
            onClick={() => handleNavigation(item)}
          >
            <TopCurve className="curve" active={String(item.active)} />
            <BottomCurve className="curve" active={String(item.active)} />
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.title} />
          </Item>
        );
      })}
    </Container>
  );
};

export default ListItems;
