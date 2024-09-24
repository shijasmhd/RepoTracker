import { getUserBookMarksStats } from "@/api/backend";
import { useQuery } from "@tanstack/react-query";

const useUserBookMarksStats = () => {
  return useQuery({
    queryKey: ["bookmarkStats"],
    queryFn: getUserBookMarksStats,
    select: (resp) => resp.data,
  });
};

export default useUserBookMarksStats;
