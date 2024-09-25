import { deleteBookMark } from "@/api/backend";
import { useMutation } from "@tanstack/react-query";

const useRemoveBookmark = () => {
  const {
    mutate: removeBookMark,
    isPending: removingBookMark,
    variables,
  } = useMutation({
    mutationFn: deleteBookMark,
  });

  return { removeBookMark, removingBookMark, variables };
};

export default useRemoveBookmark;
