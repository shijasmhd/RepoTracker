import { getGitHubUsers } from "@/api/github";
import { useQuery } from "@tanstack/react-query";

const useSearchUsers = (userName) => {
  return useQuery({
    queryKey: ["searchUsers", userName],
    queryFn: () => getGitHubUsers(userName),
    select: (response) => response?.data?.items,
    enabled: !!userName,
  });
};

export default useSearchUsers;
