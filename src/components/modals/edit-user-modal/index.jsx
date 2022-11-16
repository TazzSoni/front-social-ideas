import { useEffect, useState } from "react";

import styles from "../styles";
import spacings from "../../../styles/spacings";
import { getUserData, setUserData } from "../../../infra/storage/local-storage";

import { toast } from "react-toastify";
import Modal from "@mui/material/Modal";

import emailjs from "@emailjs/browser";

import { Text } from "../../typography";
import { TextInput } from "../../text-input";
import { Button } from "../../buttons/button";
import { HContainer, VContainer } from "../../containers";

import updateUser from "../../../usecases/auth/update-user.usecase";
import ApiRoutes from "../../../infra/constants/api-routes.constant";

import UserNameWithBadge from "../../user-name-with-badge";
import findUser from "../../../usecases/auth/find-user.usecase";

const EditUserModal = ({ open, handleClose }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const [currentUserData, setCurrentUserData] = useState(getUserData());

  useEffect(() => {
    (async () => {
      if (open) {
        const { data, status } = await findUser({ id: currentUserData.id });

        if (status == 200) {
          setName(data?.name);
          setEmail(data?.email);
          setPassword(data?.password);
          setConfirmPassword(data?.password);

          const profileImageUrl = `https://back-social-ideas.herokuapp.com${ApiRoutes.USER}/image/${currentUserData.idProfileImage}`;

          setPreview(profileImageUrl);
          setCurrentUserData(data);
          setUserData({ userData: data });
        }
      }
    })();
  }, [open]);

  const onEditUserHandler = async () => {
    if (password !== confirmPassword)
      return toast.error("As senhas não são iguais");

    const body = {
      id: currentUserData?.id,
      name,
      email,
      password,
      profileImage: selectedFile,
    };

    const { status, data } = await updateUser({ data: body });

    if (status == 200) {
      toast.success("Usuário salvo com sucesso");

      const newUserData = {
        ...currentUserData,
        name,
        email,
        password,
        idProfileImage: data.idProfileImage,
      };

      setUserData({ userData: newUserData });
      handleClose();

      window.location.reload();
    }
  };

  useEffect(() => {
    if (!selectedFile) {
      // setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const onTeacherRequestHandler = async () => {
    const serviceId = "service_4s0ial4";
    const templateId = "template_2xgdj5b";

    try {
      await emailjs.send(serviceId, templateId, {
        user_data: JSON.stringify(currentUserData),
      });

      toast.success("Sua solicitação foi enviada com sucesso");
      window.location.reload();
    } catch (error) {
      toast.error("Não foi possível enviar a solicitação, tente novamente");
    }
  };

  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }
    setSelectedFile(e.target.files[0]);
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <VContainer style={styles.smallContainer}>
        <VContainer
          style={{
            flex: 1,
            width: "70%",
            display: "flex",
            padding: "3% 0",
            alignSelf: "center",
            justifyContent: "space-evenly",
          }}
        >
          <VContainer spaceChildren={spacings.default}>
            <VContainer>
              <Text>Edição de usuário</Text>
            </VContainer>

            <VContainer>
              <Text variant={"h7"}>Imagem de perfil</Text>

              <HContainer style={{ alignSelf: "center", marginTop: "2%" }}>
                <Button
                  style={{
                    width: "22vh",
                    height: "22vh",
                    textAlign: "center",
                  }}
                  component={"label"}
                >
                  {preview ? (
                    <img
                      src={preview}
                      style={{
                        width: "22vh",
                        height: "22vh",
                        display: "flex",
                        borderRadius: spacings.default,
                      }}
                    />
                  ) : (
                    "Enviar imagem"
                  )}
                  <input
                    hidden
                    type={"file"}
                    accept={"image/*"}
                    onChange={onSelectFile}
                  />
                </Button>
              </HContainer>
            </VContainer>

            {currentUserData?.teacher ? (
              <UserNameWithBadge
                name={"Usuário Professor"}
                isTeacher={currentUserData?.teacher}
                containerStyle={{ justifyContent: "center" }}
              />
            ) : null}

            <VContainer>
              <Text style={{ alignSelf: "start" }} variant={"h7"}>
                Nome
              </Text>
              <TextInput
                fullWidth
                value={name}
                variant={"outlined"}
                onChange={({ target }) => setName(target.value)}
                style={{
                  margin: spacings.default,
                  display: "flex",
                  alignSelf: "center",
                }}
              />
            </VContainer>

            <VContainer>
              <Text style={{ alignSelf: "start" }} variant={"h7"}>
                Email
              </Text>
              <TextInput
                fullWidth
                value={email}
                variant={"outlined"}
                onChange={({ target }) => setEmail(target.value)}
                style={{
                  margin: spacings.default,
                  display: "flex",
                  alignSelf: "center",
                }}
              />
            </VContainer>

            <VContainer>
              <Text style={{ alignSelf: "start" }} variant={"h7"}>
                Senha
              </Text>
              <TextInput
                fullWidth
                multiline={false}
                value={password}
                type={"password"}
                variant={"outlined"}
                onChange={({ target }) => setPassword(target.value)}
                style={{
                  margin: spacings.default,
                  display: "flex",
                  alignSelf: "center",
                }}
              />
            </VContainer>

            <VContainer>
              <Text style={{ alignSelf: "start" }} variant={"h7"}>
                Confirmar senha
              </Text>
              <TextInput
                fullWidth
                multiline={false}
                value={confirmPassword}
                type={"password"}
                variant={"outlined"}
                onChange={({ target }) => setConfirmPassword(target.value)}
                style={{
                  margin: spacings.default,
                  display: "flex",
                  alignSelf: "center",
                }}
              />
            </VContainer>

            <HContainer style={{ justifyContent: "space-between" }}>
              {!currentUserData.teacher ? (
                <Button intent={"primary"} onClick={onTeacherRequestHandler}>
                  Solicitar professor
                </Button>
              ) : (
                <HContainer />
              )}
              <Button intent={"primary"} onClick={onEditUserHandler}>
                Salvar
              </Button>
            </HContainer>
          </VContainer>
        </VContainer>
      </VContainer>
    </Modal>
  );
};

export default EditUserModal;
