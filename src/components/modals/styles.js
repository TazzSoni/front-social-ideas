import colors from "../../styles/colors";
import spacings from "../../styles/spacings";

const styles = {
  responsiveContainer: {
    top: "50%",
    left: "50%",
    width: 700,
    maxHeight: 600,
    position: "absolute",
    background: colors.white,
    borderRadius: spacings.default,
    overflow: "auto",
    transform: "translate(-50%, -50%)",
  },

  smallContainer: {
    top: "50%",
    left: "50%",
    width: 500,
    minHeight: 400,
    position: "absolute",
    background: colors.white,
    borderRadius: spacings.default,
    transform: "translate(-50%, -50%)",
  },
};

export default styles;
