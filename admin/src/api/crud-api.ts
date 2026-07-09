import axiosInstance from "./axiosInstance";
import { revalidateCms } from "./nextCache";

export const get = async (endpoint: string) => {
  const response = await axiosInstance.get(endpoint);
  return response.data;
};

export const post = async (endpoint: string, data: any) => {
  try {
    const response = await axiosInstance.post(endpoint, data);
    const code = response.status;
    const resp_data = response.data;
    if (code === 409) {
      return Promise.reject(resp_data);
    }
    await revalidateCms();
    return resp_data;
  } catch (e) {
    return Promise.reject(e);
  }
};

export const patch = async (endpoint: string, data: any) => {
  const response = await axiosInstance.patch(endpoint, data);
  await revalidateCms();
  return response;
};

export const deleteApi = async (endpoint: string) => {
  const response = await axiosInstance.delete(endpoint);
  await revalidateCms();
  return response;
};
