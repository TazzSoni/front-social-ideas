import { Text } from "../../typography";

import colors from "../../../styles/colors";
import spacings from "../../../styles/spacings";
import fontWeights from "../../../styles/font-weights";
import useVisualizeIdeaController from "./controller";

import Modal from "@mui/material/Modal";
import LikeIcon from "@mui/icons-material/ThumbUpOffAlt";
import DislikeIcon from "@mui/icons-material/ThumbDownOffAlt";

import { TextInput } from "../../text-input";
import { Button } from "../../buttons/button";
import { IconButton } from "../../buttons/iconButton";
import { HContainer, VContainer } from "../../containers";

import styles from "../styles";
import { useEffect, useState } from "react";
import findCooworkerRequests from "../../../usecases/ideas/find-cooworker-requests.usecase";
import createCooworkerRequest from "../../../usecases/ideas/create-cooworker-request.usecase";
import { toast } from "react-toastify";
import acceptCooworkerRequest from "../../../usecases/ideas/accept-cooworker-request.usecase";
import deleteCooworkerRequest from "../../../usecases/ideas/delete-cooworker-request.usecase";
import UserNameWithBadge from "../../user-name-with-badge";
import { Chip, Divider, Grid } from "@mui/material";

const VisualizeIdeaModal = ({
  open,
  handleClose,
  currentIdea,
  fetchIdeas,
  onClickEditHandler,
}) => {
  const [cooworkerRequest, setCooworkerRequest] = useState([]);

  const onRequestForCooworker = async () => {
    if (currentIdea) {
      const response = await createCooworkerRequest({
        postId: currentIdea.id,
      });

      if (response.status == 200) {
        toast.success("Pedido para colaborar enviado com sucesso");
        window.location.reload();
      }
    }
  };

  useEffect(() => {
    (async () => {
      if (currentIdea) {
        const response = await findCooworkerRequests({
          postId: currentIdea.id,
        });

        if (response.status == 200) {
          setCooworkerRequest(response.data);
        }
      }
    })();
  }, [currentIdea]);

  const onAcceptCooworkerRequest = async () => {
    const response = await acceptCooworkerRequest({
      userRequestId: cooworkerRequest.userRequestId,
      postId: currentIdea.id,
    });

    if (response.status == 200) {
      toast.success("Requisição para colaborador aceita");
      window.location.reload();
    }
  };

  const onDeleteCooworkerRequest = async () => {
    const response = await deleteCooworkerRequest({
      postId: currentIdea.id,
    });

    if (response.status == 200) {
      toast.success("Requisição para colaborador excluída");
      window.location.reload();
    }
  };

  const {
    idea,
    newComment,
    userIsOwner,
    onDeleteIdea,
    setNewComment,
    onAddNewComment,
    onClickLikeHandler,
    onClickDislikeHandler,
  } = useVisualizeIdeaController({ currentIdea, handleClose, fetchIdeas });

  return (
    <Modal open={open} onClose={handleClose}>
      <VContainer style={styles.responsiveContainer}>
        <VContainer
          spaceChildren={spacings.default}
          style={{
            flex: 1,
            width: "80%",
            display: "flex",
            padding: "3% 0",
            alignSelf: "center",
            justifyContent: "space-evenly",
          }}
        >
          <HContainer style={{ justifyContent: "space-between" }}>
            <Text>Visualizar ideia</Text>
            {userIsOwner ? (
              <HContainer spaceChildren={spacings.default}>
                <Button onClick={onDeleteIdea}>Deletar</Button>
                <Button onClick={() => onClickEditHandler({ idea })}>
                  Editar
                </Button>
              </HContainer>
            ) : null}

            {!userIsOwner && !currentIdea?.cooworker && !cooworkerRequest ? (
              <HContainer spaceChildren={spacings.default}>
                <Button onClick={onRequestForCooworker}>Colaborar</Button>
              </HContainer>
            ) : null}
          </HContainer>
          <Text style={{ fontWeight: fontWeights.medium }} variant={"h6"}>
            {idea?.titulo}
          </Text>
          <Text variant={"h7"}>{idea?.post}</Text>
          <UserNameWithBadge
            suffix={"Autor: "}
            name={idea?.user?.name}
            isTeacher={idea?.user?.teacher}
            level={idea?.user?.level}
          />

          {idea?.cooworker ? (
            <UserNameWithBadge
              suffix={"Colaborador: "}
              name={idea?.cooworker?.name}
              isTeacher={idea?.cooworker?.teacher}
              level={idea?.cooworker?.level}
            />
          ) : null}

          {idea?.tags?.length > 0 ? (
            <VContainer spaceChildren={spacings.default}>
              <Divider />
              <Text variant={"h7"}>Tags</Text>

              <Grid container spacing={1}>
                {idea?.tags?.map((tag) => (
                  <Grid item>
                    <Chip
                      label={tag}
                      style={{
                        background: colors.primary,
                        color: colors.white,
                      }}
                    />
                  </Grid>
                ))}
              </Grid>
            </VContainer>
          ) : null}
          <Divider />
          <Text style={{ alignSelf: "start" }} variant={"h6"}>
            Comentários
          </Text>
          <VContainer spaceChildren={spacings.default}>
            {idea?.comment?.map((comment) => {
              return (
                <VContainer
                  key={comment.id}
                  style={{
                    overflow: "auto",
                    padding: "2%",
                    borderRadius: spacings.default,
                    border: `1px solid ${colors.primary}`,
                  }}
                >
                  <UserNameWithBadge
                    style={{
                      alignSelf: "start",
                      fontWeight: fontWeights.medium,
                    }}
                    level={comment?.user?.level}
                    name={comment?.user?.name}
                    isTeacher={comment?.user?.teacher}
                  />

                  <Text style={{ alignSelf: "start" }} variant={"h7"}>
                    {comment.comment}
                  </Text>

                  <HContainer style={{ justifyContent: "flex-end" }}>
                    <HContainer>
                      <IconButton
                        onClick={() =>
                          onClickLikeHandler({ commentId: comment.id })
                        }
                      >
                        <LikeIcon fontSize={"small"} />
                      </IconButton>
                      <Text variant={"h7"}>{comment.rate.like}</Text>
                    </HContainer>

                    <HContainer>
                      <IconButton
                        onClick={() =>
                          onClickDislikeHandler({ commentId: comment.id })
                        }
                      >
                        <DislikeIcon fontSize={"small"} />
                      </IconButton>
                      <Text variant={"h7"}>{comment.rate.dislike}</Text>
                    </HContainer>
                  </HContainer>
                </VContainer>
              );
            })}
          </VContainer>
          <HContainer>
            <TextInput
              style={{ width: "100%" }}
              value={newComment}
              onChange={({ target }) => setNewComment(target.value)}
            />
            <Button
              onClick={() => onAddNewComment({ postId: idea.id })}
              style={{ marginLeft: spacings.default }}
            >
              Enviar
            </Button>
          </HContainer>
          {userIsOwner && cooworkerRequest ? (
            <VContainer style={{ padding: `${spacings.default}px 0` }}>
              <Text style={{ alignSelf: "start" }} variant={"h6"}>
                Pedido para colaborar
              </Text>

              <HContainer style={{ justifyContent: "space-between" }}>
                <Text style={{ alignSelf: "start" }} variant={"h7"}>
                  {cooworkerRequest?.userRequestName}
                </Text>
                <HContainer>
                  <Button
                    onClick={onAcceptCooworkerRequest}
                    style={{ marginLeft: spacings.default }}
                  >
                    Aceitar
                  </Button>
                  <Button
                    onClick={onDeleteCooworkerRequest}
                    style={{ marginLeft: spacings.default }}
                  >
                    Excluir
                  </Button>
                </HContainer>
              </HContainer>
            </VContainer>
          ) : null}
        </VContainer>
      </VContainer>
    </Modal>
  );
};
export default VisualizeIdeaModal;
