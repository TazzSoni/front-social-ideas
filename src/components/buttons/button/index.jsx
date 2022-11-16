import MaterialButton from "@mui/material/Button";
import colors from "../../../styles/colors";

export const Button = ({
  style,
  color,
  center,
  disabled,
  intent = "primary",
  loading = false,
  ...props
}) => {
  const styles = {
    buttonBorderPrimary: {
      borderWidth: 2,
      elevation: 0,
    },
    buttonBorderSecondary: {
      borderColor: colors.primary,
      borderStyle: "solid",
      borderWidth: 2,
      elevation: 0,
    },
    buttonBorderText: {
      borderWidth: 2,
      elevation: 0,
    },
  };

  const intentOptions = {
    primary: {
      textColor: colors.white,
      background: disabled ? colors.gray : colors.primary,
      mode: "contained",
      border: styles.buttonBorderPrimary,
    },
    secondary: {
      textColor: colors.primary,
      mode: "outlined",
      border: styles.buttonBorderSecondary,
    },
    text: {
      textColor: colors.primary,
      mode: "text",
      textTransform: "none",
      border: styles.buttonBorderText,
    },
  };

  return (
    <MaterialButton
      disabled={disabled}
      style={{
        backgroundColor: disabled ? colors.gray : color,
        fontWeight: "bold",
        margin: center ? "auto" : null,
        ...intentOptions[intent],
        ...style,
        color: intentOptions[intent].textColor,
      }}
      variant={intentOptions[intent].mode}
      {...props}
    />
  );
};
