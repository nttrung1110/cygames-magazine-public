import * as httpRequest from "../utils/httpRequest";

export const uploadImage = async (formData) => {
  try {
    const res = await httpRequest.postAPI("image/upload", {
      formData,
    });

    return res;
  } catch (error) {
    const { response } = error;

    if (response?.data) {
      return response.data;
    }

    return { error: error.message || error };
  }
};
