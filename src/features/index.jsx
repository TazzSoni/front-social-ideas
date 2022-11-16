import "../styles/index.css";

import emailjs from "@emailjs/browser";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AppRouter from "./app-router";
import { HContainer } from "../components/containers";
import { useEffect } from "react";

const App = () => {
  useEffect(() => {
    emailjs.init("4s_Kh_j5eYc55XTZ7");
  }, []);

  return (
    <>
      <ToastContainer />
      <HContainer
        style={{
          width: "100vw",
          height: "100vh",
          overflow: "hidden",
        }}
      >
        <AppRouter />
      </HContainer>
    </>
  );
};

export default App;
