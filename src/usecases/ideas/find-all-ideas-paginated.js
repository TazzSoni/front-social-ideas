import { toast } from "react-toastify";

import AxiosAdapter from "../../infra/adapters/axios.adapter";
import ApiRoutes from "../../infra/constants/api-routes.constant";

const findAllIdeasPaginated = async ({ currPage }) => {
  try {
    const response = await AxiosAdapter.get(
      `${ApiRoutes.POSTS}/pageable?page=${currPage}&size=5`
    );

    return { data: response.data, status: response.status };
  } catch (error) {
    toast.error("Ocorreu um erro na requisição, tente novamente!");
    return { data: null, status: 500 };
  }
};

export default findAllIdeasPaginated;
