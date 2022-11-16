import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../components/buttons/button";
import { HContainer, VContainer } from "../../../components/containers";
import { TextInput } from "../../../components/text-input";
import { Text } from "../../../components/typography";
import { setUserData } from "../../../infra/storage/local-storage";
import colors from "../../../styles/colors";
import spacings from "../../../styles/spacings";

import BackgroundImage from "../../../assets/background.png";

import register from "../../../usecases/auth/register.usecase";
import { toast } from "react-toastify";

const Register = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();

  const onRegisterHandler = async () => {
    if (password !== confirmPassword)
      return toast.error("As senhas não são iguais");

    const body = { email, password, name, profileImage: selectedFile };

    const { data, status } = await register(body);

    if (status == 201) {
      const userData = {
        id: data.id,
        name: data.name,
        email: data.email,
        password: data.password,
        level: data.level,
        teacher: data.teacher,
        idProfileImage: data.idProfileImage,
      };

      setUserData({ userData });

      navigate("/", { replace: true });
    }
  };

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }
    setSelectedFile(e.target.files[0]);
  };

  return (
    <HContainer
      style={{
        width: "100vw",
        height: "100vh",
        backgroundImage: `url(${BackgroundImage})`,
      }}
    >
      <VContainer
        style={{
          margin: "auto",
          minWidth: "40%",
          display: "flex",
          justifyContent: "center",
          background: colors.white,
          borderRadius: spacings.default,
        }}
      >
        <VContainer
          spaceChildren={spacings.default}
          style={{ padding: "2% 20%" }}
        >
          <VContainer>
            <Text style={{ margin: spacings.default }} variant={"h5"}>
              Registrar usuário
            </Text>
          </VContainer>

          <VContainer>
            <Text variant={"h7"}>Imagem de perfil</Text>

            <HContainer style={{ alignSelf: "center", marginTop: "2%" }}>
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
                <Button
                  style={{
                    width: "22vh",
                    height: "22vh",
                    textAlign: "center",
                  }}
                  component={"label"}
                >
                  Enviar imagem
                  <input
                    hidden
                    type={"file"}
                    accept={"image/*"}
                    onChange={onSelectFile}
                  />
                </Button>
              )}
            </HContainer>
          </VContainer>

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
            <Button
              onClick={() => navigate("/login", { replace: true })}
              style={{ alignSelf: "flex-end", height: "40%" }}
            >
              Voltar
            </Button>
            <Button
              onClick={onRegisterHandler}
              style={{ alignSelf: "flex-end", height: "40%" }}
            >
              Registrar
            </Button>
          </HContainer>
        </VContainer>
      </VContainer>
    </HContainer>
  );
};

export default Register;
