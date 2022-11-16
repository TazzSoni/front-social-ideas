import { toast } from "react-toastify";

import AxiosAdapter from "../../infra/adapters/axios.adapter";
import ApiRoutes from "../../infra/constants/api-routes.constant";

const deleteIdea = async ({ ideaId }) => {
  try {
    const url = `${ApiRoutes.POSTS}/${ideaId}`;
    const response = await AxiosAdapter.delete(url);

    return { data: response.data, status: response.status };
  } catch (error) {
    toast.error("Ocorreu um erro na requisição, tente novamente!");
    return { data: null, status: 500 };
  }
};

export default deleteIdea;
