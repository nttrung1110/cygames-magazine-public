import * as httpRequest from "../utils/httpRequest";

export const getTags = async () => {
  try {
    const res = await httpRequest.getAPI("tag/getTags");

    return res;
  } catch (error) {
    const { response } = error;

    if (response?.data) {
      return response.data;
    }

    return { error: error.message || error };
  }
};
