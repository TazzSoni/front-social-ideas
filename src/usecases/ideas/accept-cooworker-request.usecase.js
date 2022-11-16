import { toast } from "react-toastify";

import AxiosAdapter from "../../infra/adapters/axios.adapter";
import ApiRoutes from "../../infra/constants/api-routes.constant";

const acceptCooworkerRequest = async ({ postId, userRequestId }) => {
  try {
    const url = `${ApiRoutes.POSTS}/set-cooworker/${postId}?userRequestId=${userRequestId}`;

    const response = await AxiosAdapter.patch(url);

    return { data: response.data, status: response.status };
  } catch (error) {
    toast.error("Ocorreu um erro na requisição, tente novamente!");
    return { data: null, status: 500 };
  }
};

export default acceptCooworkerRequest;
