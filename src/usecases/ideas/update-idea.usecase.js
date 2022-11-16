import { toast } from "react-toastify";
import AxiosAdapter from "../../infra/adapters/axios.adapter";
import ApiRoutes from "../../infra/constants/api-routes.constant";

const updateIdea = async ({ data, stage }) => {
  try {
    const url = `${ApiRoutes.POSTS}/${data.id}`;

    if (stage) {
      const updateStageUrl = `${url}?stage=${stage}`;

      const updateStageResponse = await AxiosAdapter.patch(updateStageUrl);
    }

    const response = await AxiosAdapter.put(url, data);

    return { data: response.data, status: response.status };
  } catch (error) {
    toast.error("Ocorreu um erro na requisição, tente novamente!");
    return { data: null, status: 500 };
  }
};

export default updateIdea;
