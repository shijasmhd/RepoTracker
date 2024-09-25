import { authUrl, userBookmarksUrl } from "@/config";
import axios from "@/utils/axiosInstance";

export const getUserBookMarks = (userId) => {
  return axios.get(userBookmarksUrl + userId + "/bookmarks");
};

export const getUserBookMarksStats = (userId) => {
  return axios.get(userBookmarksUrl + userId + "/bookmarks/stats");
};

export const postBookMark = (data) => {
  const { userId, url, bookMarkId } = data;
  return axios.post(userBookmarksUrl + userId + "/bookmarks", {
    url,
    bookMarkId,
  });
};

export const deleteBookMark = (data) => {
  return axios.delete(
    userBookmarksUrl + data.userId + "/bookmarks/" + data.bookMarkId
  );
};

export const logInUser = (values) => {
  return axios.post(authUrl + "login", values);
};

export const createUser = (values) => {
  return axios.post(authUrl + "register", values);
};

export const uploadCsv = (formData, userId) => {
  return axios.post(userBookmarksUrl + userId + "/bookmarks/upload", formData);
};
