import Typography from "@mui/material/Typography";

import colors from "../../styles/colors";
import fontSizes from "../../styles/font-sizes";
import fontWeights from "../../styles/font-weights";

export const Text = ({
  color,
  preset,
  children,
  style = {},
  variant = "h5",
  maxLines,
  ...props
}) => {
  const clippingStyle = {
    display: "-webkit-box",
    WebkitLineClamp: maxLines ?? 0,
    WebkitBoxOrient: "vertical",
    maxWidth: "100%",
    textOverflow: "ellipsis",
    overflow: "hidden",
    overflowWrap: "anywhere",
  };

  return (
    <Typography
      {...props}
      variant={preset ? presets[preset].variant : variant}
      style={{
        alignSelf: "center",
        ...presets[preset]?.styles,
        color: preset ? presets[preset].color : color,
        ...(maxLines != null ? clippingStyle : {}),
        ...style,
      }}
    >
      {children}
    </Typography>
  );
};

const presets = {
  postHeader: {
    color: colors.blueGray,
    styles: {
      ...fontSizes.middle,
    },
  },
  postFooter: {
    color: colors.blueGray,
    variant: "h7",
  },
  postTitle: {
    color: colors.black,
    variant: "h6",
    styles: {
      alignSelf: "start",
      textAlign: "justify",
      textJustify: "inter-word",
    },
  },
  postComment: {
    color: colors.black,
    variant: "h7",
    styles: {
      alignSelf: "start",
      textAlign: "justify",
      textJustify: "inter-word",
    },
  },
  title: {
    color: colors.black,
    styles: {
      ...fontSizes.middle,
      fontWeight: fontWeights.semiBold,
    },
  },
  content: {
    color: colors.black,
    styles: {
      ...fontSizes.middle,
    },
  },

  notification: {
    color: colors.black,
    variant: "h8",
    styles: {
      alignSelf: "start",
      textAlign: "justify",
      textJustify: "inter-word",
    },
  },

  link: {
    color: colors.linkBlue,
    styles: {
      ...fontSizes.middle,
    },
  },
  error: {
    color: colors.error,
    styles: {
      ...fontSizes.middle,
    },
  },
  userInfoTitle: {
    color: colors.black,
    styles: {
      ...fontSizes.default,
      alignSelf: "start",
      fontWeight: fontWeights.semiBold,
    },
  },
  userInfoContent: {
    color: colors.blueGray,
    styles: {
      alignSelf: "start",
      ...fontSizes.middle,
    },
  },
  iconBadge: {
    variant: "h7",
    styles: {
      alignSelf: "center",
      fontSize: "smaller",
    },
  },
  orangeHighlighted: {
    color: colors.orange,
    variant: "h7",
    styles: {
      fontSize: "inherit",
      alignSelf: "none",
      fontWeight: fontWeights.semiBold,
    },
  },
};
