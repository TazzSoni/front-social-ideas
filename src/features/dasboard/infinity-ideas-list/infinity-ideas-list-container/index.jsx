import InfinityIdeasListComponent from "../infinity-ideas-list-component";
import useDashboardController from "../../controller";

import VisualizeIdeaModal from "../../../../components/modals/visualize-idea-modal";
import NewEditIdeaModal from "../../../../components/modals/new-edit-idea-modal";

import AppBarWithDrawer from "../../../../components/appbar-with-drawer";

const InfinityIdeasListContainer = () => {
  const {
    filteredIdeasList,
    selectedIdea,
    listInnerRef,
    ideasDataList,
    newIdeaModalOpen,
    visualizeIdeaModalOpen,
    onScroll,
    fetchIdeas,
    setSelectedIdeia,
    onClickLikeHandler,
    setNewIdeaModalOpen,
    onClickDislikeHandler,
    setVisualizeIdeaModalOpen,
    onClickEditHandler,
    onFilterByText,
    onFilterByUser,
    onMyIdeasPress,
  } = useDashboardController();

  return (
    <AppBarWithDrawer
      onFilterByText={onFilterByText}
      onFilterByUser={onFilterByUser}
      onMyIdeasPress={onMyIdeasPress}
    >
      <NewEditIdeaModal
        currentIdea={selectedIdea}
        open={newIdeaModalOpen}
        handleClose={() => {
          setSelectedIdeia(null);
          setNewIdeaModalOpen(false);
        }}
        onEditOrCreateIdea={() => {
          setNewIdeaModalOpen(false);
          window.location.reload();
          setSelectedIdeia(null);
        }}
      />

      <VisualizeIdeaModal
        open={visualizeIdeaModalOpen}
        fetchIdeas={fetchIdeas}
        currentIdea={selectedIdea}
        onClickEditHandler={onClickEditHandler}
        handleClose={() => {
          setSelectedIdeia(null);
          setVisualizeIdeaModalOpen(false);
        }}
      />

      <InfinityIdeasListComponent
        onScroll={() => filteredIdeasList.length == 0 && onScroll()}
        ideasData={ideasDataList}
        filteredIdeasList={filteredIdeasList}
        listInnerRef={listInnerRef}
        setNewIdeaModalOpen={setNewIdeaModalOpen}
        onClickHandler={(idea) => {
          setSelectedIdeia(idea);
          setVisualizeIdeaModalOpen(true);
        }}
        onClickLikeHandler={onClickLikeHandler}
        onClickDislikeHandler={onClickDislikeHandler}
      />
    </AppBarWithDrawer>
  );
};

export default InfinityIdeasListContainer;
