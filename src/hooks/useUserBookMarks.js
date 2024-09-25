import { getUserBookMarks } from "@/api/backend";
import { useQuery } from "@tanstack/react-query";

const useUserBookMarks = (userId) => {
  return useQuery({
    queryKey: ["bookmarks"],
    queryFn: () => getUserBookMarks(userId),
    select: (res) => res.data,
    enabled: !!userId,
  });
};

export default useUserBookMarks;
