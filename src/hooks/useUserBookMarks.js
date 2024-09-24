import { getUserBookMarks } from "@/api/backend";
import { useQuery } from "@tanstack/react-query";

const useUserBookMarks = () => {
  return useQuery({
    queryKey: ["bookmarks"],
    queryFn: getUserBookMarks,
    select: (res) => res.data,
  });
};

export default useUserBookMarks;
