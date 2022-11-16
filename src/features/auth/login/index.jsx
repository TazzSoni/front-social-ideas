import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HContainer, VContainer } from "../../../components/containers";
import { Text } from "../../../components/typography";
import { setUserData } from "../../../infra/storage/local-storage";
import colors from "../../../styles/colors";
import spacings from "../../../styles/spacings";

import BackgroundImage from "../../../assets/background.png";

import login from "../../../usecases/auth/login.usecase";
import { TextInput } from "../../../components/text-input";
import { Button } from "../../../components/buttons/button";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLoginHandler = async () => {
    const body = { email, password };

    const { data, status } = await login(body);

    if (status == 200) {
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
              Social Ideas
            </Text>
          </VContainer>

          <VContainer>
            <Text style={{ alignSelf: "start" }} variant={"h7"}>
              Email
            </Text>
            <TextInput
              fullWidth
              multiline={false}
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

          <HContainer style={{ justifyContent: "space-between" }}>
            <Button
              onClick={() => navigate("/register")}
              style={{ alignSelf: "flex-end", height: "40%" }}
            >
              Cadastrar
            </Button>
            <Button
              onClick={onLoginHandler}
              style={{ alignSelf: "flex-end", height: "40%" }}
            >
              Entrar
            </Button>
          </HContainer>
        </VContainer>
      </VContainer>
    </HContainer>
  );
};

export default Login;
