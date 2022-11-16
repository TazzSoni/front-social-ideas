import { toast } from "react-toastify";

import AxiosAdapter from "../../infra/adapters/axios.adapter";
import ApiRoutes from "../../infra/constants/api-routes.constant";
import { getUserData } from "../../infra/storage/local-storage";

const findMyIdeas = async () => {
  try {
    const { id: userId } = getUserData();

    const url = `${ApiRoutes.POSTS}/${userId}`;

    const response = await AxiosAdapter.get(url);

    return { data: response.data, status: response.status };
  } catch (error) {
    toast.error("Ocorreu um erro na requisição, tente novamente!");
    return { data: null, status: 500 };
  }
};

export default findMyIdeas;
