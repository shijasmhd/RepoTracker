import { userBookmarksUrl } from "@/config";
import axios from "axios";

const userId = "1727001756845-045a3271bcfa";

export const getUserBookMarks = () => {
  return axios.get(userBookmarksUrl + userId + "/bookmarks");
};

export const getUserBookMarksStats = () => {
  return axios.get(userBookmarksUrl + userId + "/bookmarks/stats");
};
