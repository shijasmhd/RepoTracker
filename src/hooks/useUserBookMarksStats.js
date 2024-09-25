import { getUserBookMarksStats } from "@/api/backend";
import { useQuery } from "@tanstack/react-query";

const useUserBookMarksStats = (userId) => {
  return useQuery({
    queryKey: ["bookmarkStats"],
    queryFn: () => getUserBookMarksStats(userId),
    select: (resp) => resp.data,
    enabled: !!userId,
  });
};

export default useUserBookMarksStats;
