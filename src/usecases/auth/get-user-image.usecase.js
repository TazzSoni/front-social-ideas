import { toast } from "react-toastify";

import AxiosAdapter from "../../infra/adapters/axios.adapter";
import ApiRoutes from "../../infra/constants/api-routes.constant";

const getUserImage = async ({ imageId }) => {
  try {
    const url = `${ApiRoutes.USER}/image/${imageId}`;

    const response = await AxiosAdapter.get(url);

    return { data: response.data, status: response.status };
  } catch (error) {
    toast.error("Ocorreu um erro na requisição, tente novamente!");
    return { data: null, status: 500 };
  }
};

export default getUserImage;
