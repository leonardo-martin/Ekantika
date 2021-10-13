import Label from "../Label";

export interface StatusLabelProps {
  status: "active" | "suspended" | "finished";
}

const StatusLabel = (props: StatusLabelProps) => {
  switch (props.status) {
    case "active":
      return <Label>ATIVA</Label>;
    case "suspended":
      return <Label variant="filled">PARADA</Label>;
    case "finished":
      return <Label variant="filled">CONCLUÍDA</Label>;
  }
};

export default StatusLabel;
