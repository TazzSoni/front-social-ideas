import { useEffect, useState } from "react";
import updateIdea from "../../../usecases/ideas/update-idea.usecase";
import createNewIdea from "../../../usecases/ideas/create-new-idea.usecase";
import { toast } from "react-toastify";

export const useNewEditIdeaController = ({
  onEditOrCreateIdea,
  currentIdea,
}) => {
  const [ideaNewTag, setIdeaNewTag] = useState("");

  const [ideaTitle, setIdeaTitle] = useState("");
  const [ideaDesc, setIdeaDesc] = useState("");
  const [ideaStage, setIdeaStage] = useState("");
  const [ideaTags, setIdeaTags] = useState([]);

  const [selectedFile, setSelectedFile] = useState(null);

  const onSelectFile = (e) => {
    const eventFiles = e.target.files;

    if (!eventFiles || eventFiles.length === 0) {
      setSelectedFile(undefined);
      return;
    }

    const newSelectedFile = eventFiles[0];

    const FIVE_MB_TO_BYTES = 5242880;

    if (newSelectedFile.size <= FIVE_MB_TO_BYTES) {
      setSelectedFile(newSelectedFile);
    } else {
      toast.error("Arquivo inválido, verifique o tamanho e tipo do anexo.");
    }
  };

  useEffect(() => {
    setIdeaTitle(currentIdea?.titulo);
    setIdeaDesc(currentIdea?.post);
    setIdeaStage(currentIdea?.stage);
    setIdeaTags(currentIdea?.tags);

    setSelectedFile({ id: currentIdea?.fileId, name: currentIdea?.fileName });
  }, [currentIdea]);

  const onEditIdeaHandler = async () => {
    if (!currentIdea) return null;

    let data = {
      id: currentIdea.id,
      post: ideaDesc,
      titulo: ideaTitle,
      tags: ideaTags,
    };

    if (selectedFile == null) {
      data = { ...data, file: null }
    } else if (!selectedFile.id) {
      data = { ...data, file: selectedFile };
    }

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
      file: selectedFile,
    };
    debugger
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

  return {
    ideaNewTag,
    ideaTitle,
    ideaDesc,
    ideaStage,
    ideaTags,
    selectedFile,
    setIdeaTitle,
    setIdeaDesc,
    setIdeaNewTag,
    onEditIdeaHandler,
    onCreateNewIdeaHandler,
    onAddNewTagHandler,
    onDeleteTagHandler,
    onSelectFile,
    setSelectedFile,
    setIdeaStage,
  };
};
