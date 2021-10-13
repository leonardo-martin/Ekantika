import { Grid } from "@material-ui/core";
import {
  Container,
  BellNotifyIcon,
  TopBar,
  ArrowDownIcon,
  LogoImg,
  Dropdown,
  SideBar,
  ActiveIndicator,
  Main,
  PageTitle,
  Title,
  MainContent,
  PaperTitle,
  FlexDiv,
  PaperSubTitle,
  PaperSpan,
  TeamInitials,
  TeamName,
  PaperHeader,
  StatusDropdown,
  Tabs,
  TabOne,
  TabTwo,
  Notification,
  TableHeadTitle,
  TableNameField,
  TableAnswerField,
  TableWaitingField,
  TableStatusField,
  BottomContent,
  SeeAllBtn,
} from "./styles";

import ekantikaLogo from "../../../../../assets/ekantika_logo_white.png";

import { ReactComponent as HomeIcon } from "../../../../../assets/icons/home.svg";
import { ReactComponent as AvaliacoesIcon } from "../../../../../assets/icons/avaliacoes.svg";
import userImg from "../../../../../assets/icons/user-placeholder.svg";

import Paper from "../../../../../components/Paper";

interface DashboardPreviewProps {
  primaryColor: string;
  secundaryColor: string;
  topBarPreview: string | null;
}

const DashboardPreview = ({
  primaryColor,
  secundaryColor,
  topBarPreview,
}: DashboardPreviewProps) => {
  return (
    <Container>
      <TopBar style={{ background: primaryColor }}>
        <LogoImg src={topBarPreview ? topBarPreview : ekantikaLogo} />
        <div style={{ display: "flex", alignItems: "center" }}>
          <BellNotifyIcon />
          <Dropdown>
            <img
              src="https://www.hmiscfl.org/wp-content/uploads/2018/06/placeholder.png"
              alt="userImg"
            />

            <p>Menu</p>

            <ArrowDownIcon />
          </Dropdown>
        </div>
      </TopBar>

      <div style={{ display: "flex", height: "100%" }}>
        <SideBar>
          <ActiveIndicator style={{ background: secundaryColor }}>
            <HomeIcon className="active" />
          </ActiveIndicator>
          <AvaliacoesIcon color="#000" />
        </SideBar>

        <Main>
          <PageTitle>
            <HomeIcon />
            <Title style={{ color: secundaryColor }}>Seja bem-vindo</Title>
          </PageTitle>

          <MainContent>
            <Grid container spacing={1}>
              <Grid item xs={3}>
                <Paper
                  containerStyle={{
                    padding: "1rem",
                    flexDirection: "column",
                    borderRadius: "20px",
                  }}
                >
                  <PaperTitle style={{ color: secundaryColor }}>
                    SEU LÍDER
                  </PaperTitle>

                  <FlexDiv>
                    <img
                      src="https://www.hmiscfl.org/wp-content/uploads/2018/06/placeholder.png"
                      alt="userImg"
                      style={{
                        width: "2rem",
                        height: "2rem",
                        marginRight: "0.8rem",
                      }}
                    />

                    <div>
                      <PaperSubTitle style={{ color: secundaryColor }}>
                        Nome do Lider
                      </PaperSubTitle>

                      <PaperSpan>Nome do Lider</PaperSpan>
                    </div>
                  </FlexDiv>
                </Paper>
                <Paper
                  containerStyle={{
                    padding: "1rem",
                    flexDirection: "column",
                    borderRadius: "20px",
                    marginTop: "8px",
                  }}
                >
                  <PaperTitle style={{ color: secundaryColor }}>
                    SEUS TIMES
                  </PaperTitle>

                  <FlexDiv style={{ justifyContent: "space-between" }}>
                    <TeamInitials>SM</TeamInitials>

                    <TeamName>Squad Maiden</TeamName>

                    <PaperSubTitle style={{ color: secundaryColor }}>
                      VER
                    </PaperSubTitle>
                  </FlexDiv>
                  <FlexDiv
                    style={{
                      justifyContent: "space-between",
                      marginTop: "0.8rem",
                    }}
                  >
                    <TeamInitials>SM</TeamInitials>

                    <TeamName>Squad Maiden</TeamName>

                    <PaperSubTitle style={{ color: secundaryColor }}>
                      VER
                    </PaperSubTitle>
                  </FlexDiv>
                </Paper>
              </Grid>
              <Grid item xs={5}>
                <Paper
                  containerStyle={{
                    padding: "1rem",
                    flexDirection: "column",
                    borderRadius: "20px",
                  }}
                >
                  <PaperHeader>
                    <PaperTitle style={{ margin: 0, color: secundaryColor }}>
                      STATUS AVALIAÇÕES
                    </PaperTitle>
                    <StatusDropdown>
                      <p>Selecionar time</p>

                      <ArrowDownIcon />
                    </StatusDropdown>
                  </PaperHeader>

                  <Tabs>
                    <TabOne
                      secundaryColor={secundaryColor}
                      style={{ color: secundaryColor }}
                    >
                      AVALIADOS
                    </TabOne>
                    <TabTwo>
                      AVALIADORES
                      <Notification style={{ background: secundaryColor }}>
                        <p>2</p>
                      </Notification>
                    </TabTwo>
                  </Tabs>

                  <Grid container style={{ marginBottom: "0.8rem" }}>
                    <Grid item xs={4}>
                      <TableHeadTitle
                        className="firstChild"
                        style={{ color: secundaryColor }}
                      >
                        NOME
                      </TableHeadTitle>
                    </Grid>
                    <Grid item xs={4}>
                      <TableHeadTitle style={{ color: secundaryColor }}>
                        ULT. RESPONDIDAS
                      </TableHeadTitle>
                    </Grid>
                    <Grid item xs={2}>
                      <TableHeadTitle style={{ color: secundaryColor }}>
                        PENDENTES
                      </TableHeadTitle>
                    </Grid>
                    <Grid item xs={2}>
                      <TableHeadTitle
                        className="lastChild"
                        style={{ color: secundaryColor }}
                      >
                        STATUS
                      </TableHeadTitle>
                    </Grid>
                  </Grid>

                  <Grid container>
                    <Grid item xs={4}>
                      <TableNameField>
                        <img
                          src="https://www.hmiscfl.org/wp-content/uploads/2018/06/placeholder.png"
                          alt="userImg"
                        />

                        <p>José Freitas</p>
                      </TableNameField>
                      <TableNameField>
                        <img
                          src="https://www.hmiscfl.org/wp-content/uploads/2018/06/placeholder.png"
                          alt="userImg"
                        />

                        <p>Caue Reis</p>
                      </TableNameField>
                      <TableNameField>
                        <img
                          src="https://www.hmiscfl.org/wp-content/uploads/2018/06/placeholder.png"
                          alt="userImg"
                        />
                        <p>Vinicíus Souza</p>
                      </TableNameField>
                    </Grid>
                    <Grid item xs={4}>
                      <TableAnswerField>
                        <img
                          src="https://www.hmiscfl.org/wp-content/uploads/2018/06/placeholder.png"
                          alt="userImg"
                        />
                        <img
                          src="https://www.hmiscfl.org/wp-content/uploads/2018/06/placeholder.png"
                          alt="userImg"
                        />
                        <img
                          src="https://www.hmiscfl.org/wp-content/uploads/2018/06/placeholder.png"
                          alt="userImg"
                        />
                        <img
                          src="https://www.hmiscfl.org/wp-content/uploads/2018/06/placeholder.png"
                          alt="userImg"
                        />
                        <img
                          src="https://www.hmiscfl.org/wp-content/uploads/2018/06/placeholder.png"
                          alt="userImg"
                        />
                        <img
                          src="https://www.hmiscfl.org/wp-content/uploads/2018/06/placeholder.png"
                          alt="userImg"
                        />
                      </TableAnswerField>
                      <TableAnswerField>
                        <img
                          src="https://www.hmiscfl.org/wp-content/uploads/2018/06/placeholder.png"
                          alt="userImg"
                        />
                        <img
                          src="https://www.hmiscfl.org/wp-content/uploads/2018/06/placeholder.png"
                          alt="userImg"
                        />
                      </TableAnswerField>
                      <TableAnswerField>
                        <img
                          src="https://www.hmiscfl.org/wp-content/uploads/2018/06/placeholder.png"
                          alt="userImg"
                        />
                        <img
                          src="https://www.hmiscfl.org/wp-content/uploads/2018/06/placeholder.png"
                          alt="userImg"
                        />
                        <img
                          src="https://www.hmiscfl.org/wp-content/uploads/2018/06/placeholder.png"
                          alt="userImg"
                        />
                      </TableAnswerField>
                    </Grid>
                    <Grid item xs={2}>
                      <TableWaitingField>
                        <img
                          src="https://www.hmiscfl.org/wp-content/uploads/2018/06/placeholder.png"
                          alt="userImg"
                        />
                        <img
                          src="https://www.hmiscfl.org/wp-content/uploads/2018/06/placeholder.png"
                          alt="userImg"
                        />
                      </TableWaitingField>
                      <TableWaitingField>
                        <img
                          src="https://www.hmiscfl.org/wp-content/uploads/2018/06/placeholder.png"
                          alt="userImg"
                        />
                      </TableWaitingField>
                      <TableWaitingField>
                        <img
                          src="https://www.hmiscfl.org/wp-content/uploads/2018/06/placeholder.png"
                          alt="userImg"
                        />
                        <img
                          src="https://www.hmiscfl.org/wp-content/uploads/2018/06/placeholder.png"
                          alt="userImg"
                        />
                      </TableWaitingField>
                    </Grid>
                    <Grid item xs={2}>
                      <TableStatusField>
                        <p style={{ color: secundaryColor }}>6/6</p>
                      </TableStatusField>
                      <TableStatusField>
                        <p>4/6</p>
                      </TableStatusField>
                      <TableStatusField>
                        <p>4/6</p>
                      </TableStatusField>
                    </Grid>
                  </Grid>

                  <BottomContent>
                    <SeeAllBtn style={{ color: secundaryColor }}>
                      VER TODOS
                    </SeeAllBtn>
                  </BottomContent>
                </Paper>
              </Grid>
              <Grid item xs={4}>
                <Paper
                  containerStyle={{
                    padding: "1rem",
                    flexDirection: "column",
                    borderRadius: "20px",
                  }}
                >
                  <PaperTitle style={{ color: secundaryColor }}>
                    FEEDBACKS RECEBIDOS
                  </PaperTitle>

                  <FlexDiv>
                    <img
                      src="https://www.hmiscfl.org/wp-content/uploads/2018/06/placeholder.png"
                      alt="userImg"
                      style={{
                        width: "2rem",
                        height: "2rem",
                        marginRight: "0.8rem",
                      }}
                    />

                    <div>
                      <PaperSubTitle style={{ color: secundaryColor }}>
                        Jorge Augusto
                      </PaperSubTitle>

                      <PaperSpan>
                        Nome de quem deu o feedback | 16/10/20
                      </PaperSpan>
                    </div>
                  </FlexDiv>
                  <FlexDiv style={{ marginTop: "0.8rem" }}>
                    <img
                      src="https://www.hmiscfl.org/wp-content/uploads/2018/06/placeholder.png"
                      alt="userImg"
                      style={{
                        width: "2rem",
                        height: "2rem",
                        marginRight: "0.8rem",
                      }}
                    />

                    <div>
                      <PaperSubTitle style={{ color: secundaryColor }}>
                        Tiago Reis
                      </PaperSubTitle>

                      <PaperSpan>
                        Nome de quem deu o feedback | 16/10/20
                      </PaperSpan>
                    </div>
                  </FlexDiv>
                  <FlexDiv style={{ marginTop: "0.8rem" }}>
                    <img
                      src={userImg}
                      alt="userImg"
                      style={{
                        width: "2rem",
                        height: "2rem",
                        marginRight: "0.8rem",
                      }}
                    />

                    <div>
                      <PaperSubTitle style={{ color: secundaryColor }}>
                        Julio Freitas
                      </PaperSubTitle>

                      <PaperSpan>
                        Nome de quem deu o feedback | 16/10/20
                      </PaperSpan>
                    </div>
                  </FlexDiv>
                </Paper>
              </Grid>
            </Grid>
          </MainContent>
        </Main>
      </div>
    </Container>
  );
};

export default DashboardPreview;
