import { Tooltip } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

import colors from "../../styles/colors";
import spacings from "../../styles/spacings";

import { Text } from "../typography";
import { HContainer } from "../containers";
import fontWeights from "../../styles/font-weights";

const UserNameWithBadge = ({
  containerStyle,
  isTeacher,
  name,
  style,
  variant,
  level,
  suffix,
}) => {
  const colorByLevel = () => {
    if (level <= 10) return colors.level10;
    if (level <= 20) return colors.level20;
    if (level <= 30) return colors.level30;
    if (level <= 40) return colors.level40;
    if (level <= 50) return colors.level50;
    if (level <= 60) return colors.level60;
    if (level <= 70) return colors.level70;
    if (level <= 80) return colors.level80;
    if (level <= 90) return colors.level90;
    if (level <= 100) return colors.level100;
  };

  const textBorderStyle = {
    textShadow: `2px 0 #e8e8e8, -2px 0 #e8e8e8, 0 2px #e8e8e8, 0 -2px #e8e8e8, 1px 1px #e8e8e8, -1px -1px #e8e8e8, 1px -1px #e8e8e8, -1px 1px #e8e8e8`,
  };

  const gameficationStyles = () =>
    level >= 0
      ? {
        ...textBorderStyle,
        color: colorByLevel(),
        fontWeight: fontWeights.semiBold,
      }
      : null;

  return (
    <HContainer style={containerStyle}>
      {suffix ? (
        <Text
          variant={variant ? variant : "h7"}
          style={{
            alignSelf: "center",
            marginRight: spacings.small,
            ...style,
          }}
        >
          {suffix}
        </Text>
      ) : null}

      <Text
        variant={variant ? variant : "h7"}
        style={{
          alignSelf: "center",
          marginRight: spacings.small,
          ...style,
          ...gameficationStyles(),
        }}
      >
        {name}
      </Text>

      {isTeacher ? (
        <Tooltip title={"Professor"}>
          <StarIcon
            style={{
              fontSize: 16,
              borderRadius: 8,
              color: colors.white,
              backgroundColor: colors.primary,
              alignSelf: "center",
            }}
          />
        </Tooltip>
      ) : null}
    </HContainer>
  );
};

export default UserNameWithBadge;
