import React, { useState } from "react";

import colors from "../../styles/colors";

import { makeStyles } from "@mui/styles";
import { Toolbar, AppBar, Drawer, Divider } from "@mui/material";

import { Text } from "../typography";
import { HContainer, VContainer } from "../containers";

import IdeaIcon from "@mui/icons-material/EmojiObjects";
import PersonIcon from "@mui/icons-material/Person";
import EditUserModal from "../modals/edit-user-modal";
import { TextInput } from "../text-input";
import { Button } from "../buttons/button";
import spacings from "../../styles/spacings";
import fontWeights from "../../styles/font-weights";
import { clearUserData, getUserData } from "../../infra/storage/local-storage";
import { useNavigate } from "react-router-dom";
import UserNameWithBadge from "../user-name-with-badge";

import ApiRoutes from "../../infra/constants/api-routes.constant";
const DRAWER_WIDTH = 250;

const useStyles = makeStyles((theme) => ({
  drawerPaper: {
    width: DRAWER_WIDTH,
  },
  drawer: {
    zIndex: 1250,
    flexShrink: 0,
    width: DRAWER_WIDTH,
  },
}));

const AppBarWithDrawer = ({
  children,
  onFilterByText,
  onFilterByUser,
  onMyIdeasPress,
}) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [textToFilter, setTextToFilter] = useState("");
  const [userToFilter, setUserToFilter] = useState("");

  const [userData, _] = useState(getUserData());

  const profileImageUrl = `https://back-social-ideas.herokuapp.com${ApiRoutes.USER}/image/${userData.idProfileImage}`;

  const DRAWER_OPTIONS = [
    {
      text: "Ações",
      type: "text",
    },
    {
      title: "Ideias",
      onClick: () => window.location.reload(),
      icon: <IdeaIcon fontSize={"small"} style={{ alignSelf: "center" }} />,
      type: "option",
    },
    {
      title: "Usuário",
      onClick: () => setIsEditModalOpen(true),
      icon: <PersonIcon fontSize={"small"} style={{ alignSelf: "center" }} />,
      type: "option",
    },

    {
      title: "Minhas ideias",
      onClick: () => onMyIdeasPress(),
      icon: <IdeaIcon fontSize={"small"} style={{ alignSelf: "center" }} />,
      type: "option",
    },
    {
      title: "Sair da conta",
      onClick: () => {
        clearUserData(null);
        navigate("/login", { replace: true });
      },
      icon: <PersonIcon fontSize={"small"} style={{ alignSelf: "center" }} />,
      type: "option",
    }
  ];

  return (
    <HContainer>
      <EditUserModal
        open={isEditModalOpen}
        handleClose={() => setIsEditModalOpen(false)}
      />

      <AppBar
        position={"fixed"}
        style={{
          width: "100%",
          height: 65,
          zIndex: 1251,
          background: colors.primary,
        }}
      >
        <Toolbar
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Text
            variant={"h5"}
            style={{
              alignSelf: "center",
              fontWeight: fontWeights.semiBold,
            }}
          >
            Social Ideas
          </Text>

          <UserNameWithBadge
            variant={"h7"}
            style={{
              fontWeight: fontWeights.semiBold,
              marginRight: spacings.small,
            }}
            level={userData?.level}
            isTeacher={userData?.teacher}
            name={userData?.name}
          />
        </Toolbar>
      </AppBar>

      <HContainer>
        <Drawer
          open={true}
          variant={"persistent"}
          className={classes.drawer}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <VContainer style={{ marginTop: 65 }}>
            <img
              src={profileImageUrl}
              style={{
                width: "15vh",
                height: "15vh",
                display: "flex",
                alignSelf: "center",
              }}
            />
            <Text
              style={{
                padding: "4% 0",
                fontWeight: fontWeights.semiBold,
              }}
              variant={"h7"}
            >
              Filtro por postagem
            </Text>
            <VContainer
              spaceChildren={spacings.default}
              style={{ margin: "0 8%" }}
            >
              <TextInput
                multiline={false}
                value={textToFilter}
                onChange={({ target }) => setTextToFilter(target.value)}
              />
              <HContainer style={{ justifyContent: "space-between" }}>
                <Button
                  onClick={() => {
                    onFilterByText(null);
                    setTextToFilter("");
                    setUserToFilter("");
                  }}
                >
                  Limpar
                </Button>
                <Button
                  onClick={() => {
                    if (textToFilter) onFilterByText(textToFilter);
                  }}
                >
                  Buscar
                </Button>
              </HContainer>
            </VContainer>

            <Text
              style={{
                padding: "4% 0",
                fontWeight: fontWeights.semiBold,
                marginTop: "10px",
              }}
              variant={"h7"}
            >
              Filtro por usuário
            </Text>
            <VContainer
              spaceChildren={spacings.default}
              style={{ margin: "0 8%" }}
            >
              <TextInput
                multiline={false}
                value={userToFilter}
                onChange={({ target }) => setUserToFilter(target.value)}
              />
              <HContainer style={{ justifyContent: "space-between" }}>
                <Button
                  onClick={() => {
                    onFilterByUser(null);
                    setUserToFilter("");
                    setTextToFilter("");
                  }}
                >
                  Limpar
                </Button>
                <Button
                  onClick={() => {
                    if (userToFilter) onFilterByUser(userToFilter);
                  }}
                >
                  Buscar
                </Button>
              </HContainer>
            </VContainer>

            {DRAWER_OPTIONS.map((option, index) => {
              if (option.type == "text") {
                return (
                  <Text
                    key={index}
                    style={{
                      padding: "4% 0",
                      fontWeight: fontWeights.semiBold,
                      marginTop: "10px",
                    }}
                    variant={"h7"}
                  >
                    {option?.text}
                  </Text>
                );
              }

              return (
                <VContainer key={index}>
                  <HContainer
                    style={{
                      display: "flex",
                      padding: "4% 6%",
                      justifyContent: "start",
                    }}
                  >
                    {option.icon}
                    <Text
                      variant={"h7"}
                      onClick={option.onClick}
                      style={{
                        alignSelf: "center",
                        marginLeft: "2%",
                      }}
                    >
                      {option.title}
                    </Text>
                  </HContainer>
                  <Divider
                    style={{
                      display: "flex",
                      width: "80%",
                      alignSelf: "center",
                    }}
                  />
                </VContainer>
              );
            })}
          </VContainer>
        </Drawer>

        <HContainer
          style={{
            flex: 1,
            marginTop: 65,
            display: "flex",
          }}
        >
          {children}
        </HContainer>
      </HContainer>
    </HContainer>
  );
};

export default AppBarWithDrawer;
