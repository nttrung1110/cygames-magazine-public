import * as httpRequest from "../utils/httpRequest";

export const login = async (formData) => {
  try {
    const res = await httpRequest.postAPI("user/login", {
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

export const verifyToken = async () => {
  try {
    const res = await httpRequest.postAPI("user/verifyToken");

    return res;
  } catch (error) {
    const { response } = error;

    if (response?.data) {
      return response.data;
    }

    return { error: error.message || error };
  }
};
