import {
  createContext,
  useState,
  useCallback,
  useContext,
  useMemo,
} from "react";

interface MemberToUpdate {
  id: number | string;
  active: boolean;
  initial_date: string;
  final_date: string;
  hadInteraction: boolean;
}

type Member = /** TODO */ Record<string, any>;

export interface RHTeamMembersContextValue {
  activeMembers: Member[];
  inactiveMembers: Member[];
  members: Member[];
  setMembers: React.Dispatch<React.SetStateAction<Member[]>>;
  handleMemberDateUpdate: (
    key: "initial_date" | "final_date",
    id: string | number
  ) => (date: string) => void;
  handleUpdateInteraction: (
    memberId: string | number,
    key: keyof MemberToUpdate,
    value: string | boolean
  ) => void;
}

export const RHTeamMembersContext = createContext(
  {} as RHTeamMembersContextValue
);

export const useRHTeamMembers = () => useContext(RHTeamMembersContext);

export const RHTeamMembersProvider: React.FC = (props) => {
  const [members, setMembers] = useState<Member[]>([{ active: true, id: 1 }]);

  const [, setMembersToUpdate] = useState<Partial<MemberToUpdate>[]>(() => {
    return members.map((member) => ({
      ...member,
      hadInteraction: false,
    }));
  });

  const activeMembers = useMemo(
    () => members.filter((member) => member.active),
    [members]
  );
  const inactiveMembers = useMemo(
    () => members.filter((member) => !member.active),
    [members]
  );

  const handleUpdateInteraction = useCallback(
    (
      memberId: string | number,
      key: keyof MemberToUpdate,
      value: string | boolean
    ) => {
      setMembersToUpdate((members) =>
        members.map((member) => {
          if (member.id !== memberId) return member;
          return {
            ...member,
            /** Even after an interaction, user can backtrack on their changes.
             * Hence we would need to compare the diffs before PUT request
             */
            hadInteraction: true,
            [key]: value,
          };
        })
      );
    },
    []
  );

  const handleMemberDateUpdate = useCallback(
    (key: "initial_date" | "final_date", id: string | number) => {
      return (date: string) => {
        handleUpdateInteraction(id, key, date);
      };
    },
    [handleUpdateInteraction]
  );
  return (
    <RHTeamMembersContext.Provider
      value={{
        members,
        activeMembers,
        inactiveMembers,
        setMembers,
        handleUpdateInteraction,
        handleMemberDateUpdate,
      }}
    >
      {props.children}
    </RHTeamMembersContext.Provider>
  );
};
