import { toast } from "react-toastify";

import AxiosAdapter from "../../infra/adapters/axios.adapter";
import ApiRoutes from "../../infra/constants/api-routes.constant";
import { getUserData } from "../../infra/storage/local-storage";

const createNewIdea = async ({ data }) => {
  try {
    const { id: userId } = getUserData();

    const url = `${ApiRoutes.POSTS}/${userId}`;

    const response = await AxiosAdapter.post(url, data);

    return { data: response.data, status: response.status };
  } catch (error) {
    toast.error("Ocorreu um erro na requisição, tente novamente!");
    return { data: null, status: 500 };
  }
};

export default createNewIdea;
