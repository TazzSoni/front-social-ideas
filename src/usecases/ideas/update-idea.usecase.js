import { toast } from "react-toastify";
import AxiosAdapter from "../../infra/adapters/axios.adapter";
import ApiRoutes from "../../infra/constants/api-routes.constant";

const updateIdea = async ({ data, stage }) => {
  try {
    const url = `${ApiRoutes.POSTS}/update/${data.id}`;
    if (stage) {
      const updateStageUrl = `${ApiRoutes.POSTS}/${data.id}?stage=${stage}`;
      const { status } = await AxiosAdapter.patch(updateStageUrl);

      if (status !== 200) {
        toast.error("Não foi possível editar o estágio, tente novamente.");
      }
    }

    const formData = new FormData();

    formData.append("post", data.post);
    formData.append("titulo", data.titulo);
    formData.append("tags", data.tags);

    if (data.file) {
      formData.append("file", data.file);
    }

    const response = await AxiosAdapter.post(url, formData, {
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

export default updateIdea;
