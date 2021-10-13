import { IconsWrapper, RemoveIcon, EditIcon, CopyIcon } from "./styles";

export interface EditOrCopyOrRemoveProps {
  onRemoveClick?: () => Promise<void> | void;
  onCopyClick?: () => Promise<void> | void;
  onEditClick?: () => Promise<void> | void;
}

const EditOrCopyOrRemove = (props: EditOrCopyOrRemoveProps) => {
  return (
    <IconsWrapper>
      {props.onEditClick && (
        <EditIcon onClick={props.onEditClick}>Edit</EditIcon>
      )}
      {props.onCopyClick && (
        <CopyIcon onClick={props.onCopyClick}>Copiar</CopyIcon>
      )}
      {props.onRemoveClick && (
        <RemoveIcon onClick={props.onRemoveClick}>Trash</RemoveIcon>
      )}
    </IconsWrapper>
  );
};

export default EditOrCopyOrRemove;
