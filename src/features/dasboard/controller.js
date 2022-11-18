import { useRef, useEffect, useState } from "react";

import likeIdea from "../../usecases/ideas/like-idea.usecase";
import dislikeIdea from "../../usecases/ideas/dislike-idea.usecase";

import findAllIdeasPaginated from "../../usecases/ideas/find-all-ideas-paginated";
import findIdeasByText from "../../usecases/ideas/find-ideas-by-text.usecase";
import findIdeasByUser from "../../usecases/ideas/find-ideas-by-user.usecase";
import findMyIdeas from "../../usecases/ideas/find-my-ideas.usecase";
import findTeacherIdeas from "../../usecases/ideas/find-teacher-ideas.usecase";

import { toast } from "react-toastify";

export default function useDashboardController() {
  const [newIdeaModalOpen, setNewIdeaModalOpen] = useState(false);
  const [visualizeIdeaModalOpen, setVisualizeIdeaModalOpen] = useState(false);

  const [selectedIdea, setSelectedIdeia] = useState(null);

  const listInnerRef = useRef();

  const [currPage, setCurrPage] = useState(0);
  const [prevPage, setPrevPage] = useState(-1);
  const [ideasDataList, setIdeasDataList] = useState([]);
  const [isLastList, setIsLastList] = useState(false);

  const [filteredIdeasList, setFilteredIdeasList] = useState([]);

  const fetchIdeas = async ({ page = null }) => {
    const currentPage = page || currPage;

    const { data } = await findAllIdeasPaginated({
      currPage: currentPage,
    });

    if (!data?.content?.length) {
      setIsLastList(true);
      return;
    }

    setPrevPage(currPage);

    if (page) {
      setIdeasDataList(data.content);
    } else {
      setIdeasDataList([...ideasDataList, ...data.content]);
    }
  };

  useEffect(() => {
    if (!isLastList && prevPage !== currPage) {
      fetchIdeas({ page: null });
    }
  }, [currPage, isLastList, prevPage, ideasDataList]);

  const onScroll = () => {
    if (listInnerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;

      // console.log({ a: scrollTop + clientHeight });
      // console.log({ b: scrollHeight });
      if ((scrollTop + clientHeight) * 1.2 >= scrollHeight) {
        setCurrPage(currPage + 1);
      }
    }
  };

  const onClickEditHandler = ({ idea }) => {
    setVisualizeIdeaModalOpen(false);
    setSelectedIdeia(idea);
    setNewIdeaModalOpen(true);
  };

  const onClickLikeHandler = async ({ ideaId }) => {
    const { data, status } = await likeIdea({ ideaId });

    if (!data) return toast.error("Você já realizou essa ação ");

    if (status == 200 && data) {
      window.location.reload();
    }
  };

  const onClickDislikeHandler = async ({ ideaId }) => {
    const { data, status } = await dislikeIdea({ ideaId });

    if (!data) return toast.error("Você já realizou essa ação ");

    if (status == 200 && data) {
      window.location.reload();
    }
  };

  const onFilterByText = async (textToFilter) => {
    if (!textToFilter) return setFilteredIdeasList([]);

    const { data, status } = await findIdeasByText({ text: textToFilter });

    if (data?.content.length > 0) {
      setFilteredIdeasList(data.content);
    } else {
      toast.info("Não foi possível achar resultados");
    }
  };

  const onFilterByUser = async (userToFilter) => {
    if (!userToFilter) return setFilteredIdeasList([]);

    const { data, status } = await findIdeasByUser({ text: userToFilter });

    if (data?.content.length > 0) {
      setFilteredIdeasList(data.content);
    } else {
      toast.info("Não foi possível achar resultados");
    }
  };

  const onMyIdeasPress = async () => {
    const { data, status } = await findMyIdeas();

    if (data?.length > 0) {
      setFilteredIdeasList(data);
    } else {
      toast.info("Não foi possível achar resultados");
    }
  };

  const onTeacherIdeasPress = async () => {
    const { data, status } = await findTeacherIdeas();

    if (data?.content?.length > 0) {
      setFilteredIdeasList(data.content);
    } else {
      toast.info("Não foi possível achar resultados");
    }
  };

  return {
    filteredIdeasList,
    newIdeaModalOpen,
    visualizeIdeaModalOpen,
    selectedIdea,
    listInnerRef,
    ideasDataList,
    onScroll,
    fetchIdeas,
    setSelectedIdeia,
    setNewIdeaModalOpen,
    setVisualizeIdeaModalOpen,
    onClickLikeHandler,
    onClickEditHandler,
    onClickDislikeHandler,
    onFilterByText,
    onFilterByUser,
    onMyIdeasPress,
    onTeacherIdeasPress,
  };
}
