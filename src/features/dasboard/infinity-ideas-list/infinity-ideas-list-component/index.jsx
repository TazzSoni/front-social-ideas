import { Grid } from "@mui/material";
import { React, useEffect, useState } from "react";
import IdeaCard from "../../../../components/idea-card";
import NewIdeaCard from "../../../../components/new-idea-card";

const styles = {
  gridItem: { width: "26vw", maxHeight: "62vh", height: "62vh" },
};

const InfinityIdeasListComponent = ({
  ideasData,
  filteredIdeasList,
  listInnerRef,
  setNewIdeaModalOpen,
  onScroll,
  onClickLikeHandler,
  onClickDislikeHandler,
  onClickHandler,
}) => {
  const [ideasList, setIdeasList] = useState([]);

  useEffect(() => {
    const ideas = filteredIdeasList.length > 0 ? filteredIdeasList : ideasData;

    setIdeasList(ideas);
  }, [filteredIdeasList, ideasData]);

  return (
    <div>
      <div
        ref={listInnerRef}
        onScroll={onScroll}
        style={{
          height: "85vh",
          overflowY: "auto",
          padding: "2vh 0 0 2vh",
        }}
      >
        <Grid container spacing={2}>
          <Grid item style={styles.gridItem}>
            <NewIdeaCard handleOnClick={() => setNewIdeaModalOpen(true)} />
          </Grid>
          {ideasList.map((idea, index) => (
            <Grid item key={index} style={styles.gridItem}>
              <IdeaCard
                idea={idea}
                onClickHandler={onClickHandler}
                onClickLikeHandler={() =>
                  onClickLikeHandler({ ideaId: idea.id })
                }
                onClickDislikeHandler={() =>
                  onClickDislikeHandler({ ideaId: idea.id })
                }
              />
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default InfinityIdeasListComponent;
