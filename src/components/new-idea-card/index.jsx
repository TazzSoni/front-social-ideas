import colors from "../../styles/colors";
import spacings from "../../styles/spacings";
import fontSizes from "../../styles/font-sizes";

import { IconButton } from "../buttons/iconButton";
import { VContainer } from "../containers";
import { Text } from "../typography";

import AddNewIcon from "@mui/icons-material/AddCircleOutline";

const NewIdeaCard = ({ handleOnClick }) => {
  return (
    <VContainer
      onClick={handleOnClick}
      style={{
        height: "100%",
        justifyContent: "center",
        background: colors.primary,
        borderRadius: spacings.default,
      }}
    >
      <Text style={{ color: colors.white }}>Poste sua ideia</Text>
      <AddNewIcon
        style={{
          width: 50,
          height: 50,
          padding: 0,
          color: "white",
          alignSelf: "center",
        }}
        fontSize={"large"}
      />
    </VContainer>
  );
};
export default NewIdeaCard;
