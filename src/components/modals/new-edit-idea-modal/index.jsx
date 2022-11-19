import styles from "../styles";
import spacings from "../../../styles/spacings";

import Modal from "@mui/material/Modal";

import { Text } from "../../typography";
import { TextInput } from "../../text-input";
import { Button } from "../../buttons/button";
import { HContainer, VContainer } from "../../containers";
import { Chip, Grid, MenuItem, Select } from "@mui/material";
import { useNewEditIdeaController } from "./controller";
import { IconButton } from "../../buttons/iconButton";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const NewEditIdeaModal = ({
  open,
  handleClose,
  currentIdea,
  onEditOrCreateIdea,
}) => {
  const {
    ideaTags,
    ideaDesc,
    ideaTitle,
    ideaStage,
    ideaNewTag,
    onEditIdeaHandler,
    onAddNewTagHandler,
    onDeleteTagHandler,
    onCreateNewIdeaHandler,
    setIdeaTitle,
    setIdeaDesc,
    setIdeaNewTag,
    setIdeaStage,
    onSelectFile,
    selectedFile,
    setSelectedFile,
  } = useNewEditIdeaController({ onEditOrCreateIdea, currentIdea });

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
                value={ideaStage}
                style={{ width: "100%" }}
                onChange={({ target }) => setIdeaStage(target.value)}
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
              {ideaTags?.map((tag, index) => (
                <Grid key={index} item>
                  <Chip
                    label={tag}
                    variant={"outlined"}
                    onDelete={() => onDeleteTagHandler(tag)}
                  />
                </Grid>
              ))}
            </Grid>
          </VContainer>

          <VContainer spaceChildren={spacings.default}>
            <HContainer>
              <Text variant={"h7"} style={{ alignSelf: "center" }}>
                Anexo
              </Text>
              <IconButton disabled={(selectedFile == null) ? true : selectedFile.name} component={"label"}>
                <AddCircleOutlineIcon fontSize={"small"} />
                <input hidden type={"file"} onChange={onSelectFile} />
              </IconButton>
            </HContainer>

            {(selectedFile == null) ? true : selectedFile.name ? (
              <Chip
                label={selectedFile?.name}
                onDelete={() => setSelectedFile(null)}
              />
            ) : null}
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
