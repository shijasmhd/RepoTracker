import { githubRepoSearchUrl, githubUserSearchUrl } from "@/config";
import axios from "axios";

export const getGitHubUsers = (userName) => {
  return axios.get(githubUserSearchUrl, { params: { q: userName } });
};

export const getGitHubRepos = (repoName) => {
  return axios.get(githubRepoSearchUrl, { params: { q: repoName } });
};
