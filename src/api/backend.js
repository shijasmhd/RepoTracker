import { userBookmarksUrl } from "@/config";
import axios from "axios";

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
