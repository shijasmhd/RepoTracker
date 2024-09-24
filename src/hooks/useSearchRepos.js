import { getGitHubRepos } from "@/api/github";
import { useQuery } from "@tanstack/react-query";

const useSearchRepos = (repoName) => {
  return useQuery({
    queryKey: ["searchRepos", repoName],
    queryFn: () => getGitHubRepos(repoName),
    select: (resp) => {
      console.log(resp);
      return resp?.data?.items;
    },
    enabled: !!repoName,
  });
};

export default useSearchRepos;
