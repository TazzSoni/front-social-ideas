import colors from "../../styles/colors";
import spacings from "../../styles/spacings";

import { Text } from "../typography";
import { HContainer, VContainer } from "../containers";
import { IconButton } from "../buttons/iconButton";

import LikeIcon from "@mui/icons-material/ThumbUpOffAlt";
import DislikeIcon from "@mui/icons-material/ThumbDownOffAlt";
import { Chip, Divider } from "@mui/material";

import IDEA_STAGE from "../../infra/constants/idea-stage.constant";

import DoneBanner from "../../assets/done-banner.png";
import PostedBanner from "../../assets/posted-banner.png";
import ReviewingBanner from "../../assets/reviewing-banner.png";
import UserNameWithBadge from "../user-name-with-badge";

const IdeaCard = ({
  idea,
  onClickHandler,
  onClickLikeHandler,
  onClickDislikeHandler,
}) => {
  const selectIdeaStageImage = () => {
    if (idea?.stage == IDEA_STAGE.DONE) {
      return DoneBanner;
    }
    if (idea?.stage == IDEA_STAGE.POSTED) {
      return PostedBanner;
    }
    if (idea?.stage == IDEA_STAGE.REVIEWING) {
      return ReviewingBanner;
    }
  };

  return (
    <VContainer
      style={{
        width: "100%",
        height: "100%",
        borderRadius: spacings.default,
        background: colors.teste,
      }}
    >
      <VContainer style={{ flex: 1 }} onClick={() => onClickHandler(idea)}>
        <img
          src={selectIdeaStageImage()}
          style={{
            height: 180,
            width: "100%",
            objectFit: "cover",
            borderRadius: spacings.default,
          }}
        />

        <VContainer
          style={{
            flex: 1,
            padding: "4%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <HContainer>
            <Text maxLines={2} variant={"h6"}>
              {idea?.titulo}
            </Text>
          </HContainer>

          <HContainer style={{ display: "flex", flex: 1 }}>
            <Text maxLines={3} style={{ alignSelf: "start" }} variant={"h7"}>
              {idea?.post}
            </Text>
          </HContainer>

          <UserNameWithBadge
            name={idea?.user?.name}
            isTeacher={idea?.user?.teacher}
            level={idea?.user?.level}
          />
        </VContainer>
      </VContainer>

      <Divider />

      <HContainer style={{ padding: "1% 4%", justifyContent: "space-between" }}>
        <Text variant={"h8"}>Comentários {idea?.comment?.length}</Text>

        <HContainer style={{ justifyContent: "flex-end" }}>
          <HContainer>
            <IconButton onClick={onClickLikeHandler}>
              <LikeIcon />
            </IconButton>
            <Text variant={"h7"}>{idea.rate.like}</Text>
          </HContainer>

          <HContainer>
            <IconButton onClick={onClickDislikeHandler}>
              <DislikeIcon />
            </IconButton>
            <Text variant={"h7"}>{idea.rate.dislike}</Text>
          </HContainer>
        </HContainer>
      </HContainer>
    </VContainer>
  );
};
export default IdeaCard;
