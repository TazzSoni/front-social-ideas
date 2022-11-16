import { toast } from "react-toastify";
import AxiosAdapter from "../../infra/adapters/axios.adapter";
import ApiRoutes from "../../infra/constants/api-routes.constant";

const updateUser = async ({ data }) => {
  try {
    const url = `${ApiRoutes.USER}/${data.id}`;

    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("password", data.password);
    if (data.profileImage) {
      formData.append("profileImage", data.profileImage);
    }

    const response = await AxiosAdapter.put(url, formData, {
      headers: {
        "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
      },
    });

    return { data: response.data, status: response.status };
  } catch (error) {
    toast.error("Ocorreu um erro na requisição, tente novamente!");
    return { data: null, status: 500 };
  }
};

export default updateUser;
