import axios from "axios";

const AxiosAdapter = axios.create({
  baseURL: "https://back-social-ideas.herokuapp.com",
});

export default AxiosAdapter;
