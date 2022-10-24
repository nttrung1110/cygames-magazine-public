import * as httpRequest from "../utils/httpRequest";

export const postTag = async (formData) => {
  try {
    const res = await httpRequest.postAPI("tag/create", {
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

export const putTag = async (tagId, formData) => {
  try {
    const res = await httpRequest.putAPI(`tag/update/${tagId}`, {
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

export const deleteTag = async (tagId) => {
  try {
    const res = await httpRequest.deleteAPI(`tag/delete/${tagId}`);

    return res;
  } catch (error) {
    const { response } = error;

    if (response?.data) {
      return response.data;
    }

    return { error: error.message || error };
  }
};
