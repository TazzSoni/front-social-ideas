import { useEffect, useState } from "react";

import styles from "../styles";
import spacings from "../../../styles/spacings";
import updateIdea from "../../../usecases/ideas/update-idea.usecase";
import createNewIdea from "../../../usecases/ideas/create-new-idea.usecase";

import Modal from "@mui/material/Modal";

import { Text } from "../../typography";
import { TextInput } from "../../text-input";
import { Button } from "../../buttons/button";
import { HContainer, VContainer } from "../../containers";
import { Chip, Grid, MenuItem, Select } from "@mui/material";
import colors from "../../../styles/colors";

const NewEditIdeaModal = ({
  open,
  handleClose,
  currentIdea,
  onEditOrCreateIdea,
}) => {
  const [ideaNewTag, setIdeaNewTag] = useState("");

  const [ideaTitle, setIdeaTitle] = useState("");
  const [ideaDesc, setIdeaDesc] = useState("");
  const [ideaStage, setIdeaStage] = useState("");
  const [ideaTags, setIdeaTags] = useState([]);

  useEffect(() => {
    setIdeaTitle(currentIdea?.titulo);
    setIdeaDesc(currentIdea?.post);
    setIdeaStage(currentIdea?.stage);
    setIdeaTags(currentIdea?.tags);
  }, [currentIdea]);

  const onEditIdeaHandler = async () => {
    if (!currentIdea) return null;

    const data = {
      id: currentIdea.id,
      post: ideaDesc,
      titulo: ideaTitle,
      tags: ideaTags,
    };

    const { status } = await updateIdea({ data, stage: ideaStage });

    if (status == 200) {
      setIdeaTitle("");
      setIdeaDesc("");
      onEditOrCreateIdea();
    }
  };

  const onCreateNewIdeaHandler = async () => {
    if (currentIdea) return null;

    const data = {
      post: ideaDesc,
      titulo: ideaTitle,
      tags: ideaTags,
    };

    const { status } = await createNewIdea({ data });

    if (status == 201) {
      setIdeaTitle("");
      setIdeaDesc("");
      window.location.reload();
      onEditOrCreateIdea();
    }
  };

  const onAddNewTagHandler = () => {
    const newTag = ideaNewTag.trim().split(" ")[0];

    if (newTag) {
      if (ideaTags) {
        const newTagsList = [...ideaTags, newTag];
        setIdeaTags(newTagsList);
      } else {
        setIdeaTags([newTag]);
      }
    }
    setIdeaNewTag("");
  };

  const onDeleteTagHandler = (tagToDelete) => {
    const newTagsList = ideaTags?.filter((tag) => tag != tagToDelete);

    setIdeaTags(newTagsList);
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <VContainer style={styles.smallContainer}>
        <VContainer
          style={{
            flex: 1,
            width: "80%",
            display: "flex",
            padding: "3% 0",
            alignSelf: "center",
            justifyContent: "space-evenly",
          }}
        >
          {currentIdea ? (
            <Text>Edição de ideia</Text>
          ) : (
            <Text>Criação de ideia</Text>
          )}

          <VContainer spaceChildren={spacings.large}>
            <Text variant={"h7"} style={{ alignSelf: "start" }}>
              Título
            </Text>
            <TextInput
              value={ideaTitle}
              placeholder={"Título"}
              onChange={({ target }) => setIdeaTitle(target.value)}
            />

            <Text variant={"h7"} style={{ alignSelf: "start" }}>
              Conteúdo
            </Text>
            <TextInput
              multiline
              minRows={4}
              value={ideaDesc}
              placeholder={"Conteúdo"}
              onChange={({ target }) => setIdeaDesc(target.value)}
            />
          </VContainer>

          {currentIdea ? (
            <VContainer spaceChildren={spacings.large}>
              <Text variant={"h7"} style={{ alignSelf: "start" }}>
                Estágio
              </Text>
              <Select
                style={{ width: "100%" }}
                value={ideaStage}
                onChange={({ target }) => {
                  setIdeaStage(target.value);
                }}
              >
                <MenuItem value={"DONE"}>Pronto</MenuItem>
                <MenuItem value={"POSTED"}>Postado</MenuItem>
                <MenuItem value={"REVIEWING"}>Em revisão</MenuItem>
              </Select>
            </VContainer>
          ) : null}

          <VContainer spaceChildren={spacings.large}>
            <Text variant={"h7"} style={{ alignSelf: "start" }}>
              Tags
            </Text>
            <HContainer style={{ justifyContent: "space-between" }}>
              <TextInput
                fullWidth
                value={ideaNewTag}
                onChange={({ target }) => setIdeaNewTag(target.value)}
                placeholder={"insira uma tag aqui..."}
              />
              <Button
                style={{ marginLeft: spacings.default }}
                intent={"primary"}
                onClick={() => onAddNewTagHandler()}
              >
                Adicionar
              </Button>
            </HContainer>

            <Grid container spacing={1}>
              {ideaTags?.map((tag) => (
                <Grid item>
                  <Chip
                    label={tag}
                    onDelete={() => onDeleteTagHandler(tag)}
                    style={{ background: colors.primary, color: colors.white }}
                  />
                </Grid>
              ))}
            </Grid>
          </VContainer>

          {currentIdea ? (
            <Button
              intent={"primary"}
              style={{ alignSelf: "flex-end", marginTop: spacings.default }}
              onClick={() => onEditIdeaHandler()}
            >
              Editar
            </Button>
          ) : (
            <Button
              intent={"primary"}
              style={{ alignSelf: "flex-end", marginTop: spacings.default }}
              onClick={() => onCreateNewIdeaHandler()}
            >
              Salvar
            </Button>
          )}
        </VContainer>
      </VContainer>
    </Modal>
  );
};

export default NewEditIdeaModal;
