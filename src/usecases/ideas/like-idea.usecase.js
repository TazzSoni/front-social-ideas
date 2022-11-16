import { toast } from "react-toastify";

import ApiRoutes from "../../infra/constants/api-routes.constant";
import AxiosAdapter from "../../infra/adapters/axios.adapter";
import { getUserData } from "../../infra/storage/local-storage";

const likeIdea = async ({ ideaId }) => {
  try {
    const { id: userId } = getUserData();

    const url = `${ApiRoutes.LIKE_POST}/${ideaId}?userId=${userId}`;
    const response = await AxiosAdapter.put(url);

    return { data: response.data, status: response.status };
  } catch (error) {
    toast.error("Ocorreu um erro na requisição, tente novamente!");
    return { data: null, status: 500 };
  }
};

export default likeIdea;
