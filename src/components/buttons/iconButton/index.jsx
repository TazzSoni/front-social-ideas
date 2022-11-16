import { IconButton as MaterialIconButton } from "@mui/material";

export const IconButton = ({ onClick, children, ...props }) => {
  return (
    <MaterialIconButton {...props} onClick={() => onClick()}>
      {children}
    </MaterialIconButton>
  );
};
