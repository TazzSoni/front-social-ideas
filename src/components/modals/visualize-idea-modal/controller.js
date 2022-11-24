import { useState, useEffect } from "react";
import likeComment from "../../../usecases/comment/like-comment.usecase";
import dislikeComment from "../../../usecases/comment/dislike-comment.usecase";
import createComment from "../../../usecases/comment/create-comment.usecase";
import deleteIdea from "../../../usecases/ideas/delete-idea.usecase";
import { getUserData } from "../../../infra/storage/local-storage";
import { toast } from "react-toastify";

const useVisualizeIdeaController = ({
  currentIdea,
  handleClose,
  fetchIdeas,
}) => {
  const [idea, setIdea] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [userIsOwner, setUserIsOwner] = useState(false);

  useEffect(() => {
    setIdea(currentIdea);
  }, [currentIdea]);

  useEffect(() => {
    const user = getUserData();
    const ideaOwner = idea?.user?.id;

    const currentUserIsOwner = user?.id == ideaOwner;

    setUserIsOwner(currentUserIsOwner);
  }, [idea]);

  const onDeleteIdea = async () => {
    const ideaId = idea?.id;

    const { data, status } = await deleteIdea({ ideaId });

    if (status == 204) {
      handleClose();
      window.location.reload();
    }
  };

  const onAddNewComment = async ({ postId }) => {
    if (!newComment) {
      return toast.error("Comentário não pode ser vazio!")
    }
    setNewComment("");

    const { data, status } = await createComment({
      postId,
      comment: newComment,
    });

    if (status == 201) {
      const { id, name } = getUserData();
      window.location.reload();

      const commentsList = [...idea.comment, { ...data, user: { id, name } }];
      setIdea({ ...idea, comment: commentsList });
    }
  };

  const onClickLikeHandler = async ({ commentId }) => {
    const { data, status } = await likeComment({ commentId });

    if (!data) return toast.error("Você já realizou essa ação ");

    if (status == 200 && data) {
      window.location.reload();
      const commentsList = idea.comment.map((comment) =>
        comment.id == data.id ? data : comment
      );
      setIdea({ ...idea, comment: commentsList });
    }
  };

  const onClickDislikeHandler = async ({ commentId }) => {
    const { data, status } = await dislikeComment({ commentId });

    if (!data) return toast.error("Você já realizou essa ação ");

    if (status == 200 && data) {
      window.location.reload();
      const commentsList = idea.comment.map((comment) =>
        comment.id == data.id ? data : comment
      );
      setIdea({ ...idea, comment: commentsList });
    }
  };

  return {
    onDeleteIdea,
    onAddNewComment,
    onClickLikeHandler,
    onClickDislikeHandler,
    newComment,
    setNewComment,
    userIsOwner,
    idea,
  };
};

export default useVisualizeIdeaController;
