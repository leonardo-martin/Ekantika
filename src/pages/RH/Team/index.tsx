import { RHTeamMembersProvider } from "./contexts/RHTeamMembersContext";

import GoBackButton, { GoBackDiv } from "../../../components/GoBack";
import PageTitle from "../../../components/PageTitle";
import TeamDefinitions from "./Definitions";
import TeamMembers from "./Members";

import { Container, PaperContainer } from "./styles";

const Team: React.FC = () => {
  return (
    <Container>
      <GoBackDiv>
        <GoBackButton />
        <PageTitle title="Nome do Time" />
      </GoBackDiv>

      <PaperContainer>
        <TeamDefinitions />
        {/* RHTeamMembersProvider aparece após o usuário preencher todas as infos em TeamDefinitions e clicar em salvar.  */}
        <RHTeamMembersProvider>
          <TeamMembers />
        </RHTeamMembersProvider>
      </PaperContainer>
    </Container>
  );
};

export default Team;
