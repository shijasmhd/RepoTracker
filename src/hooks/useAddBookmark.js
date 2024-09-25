import { postBookMark } from "@/api/backend";
import { useMutation } from "@tanstack/react-query";

const useAddBookmark = () => {
  const {
    mutate: addBookMark,
    isPending: addingBookMark,
    variables,
  } = useMutation({
    mutationFn: postBookMark,
  });

  return { addBookMark, addingBookMark, variables };
};

export default useAddBookmark;
