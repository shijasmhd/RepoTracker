import { logInUser } from "@/api/backend";
import { useMutation } from "@tanstack/react-query";

const useLogInUser = () => {
  const { mutate: loginUser } = useMutation({
    mutationFn: logInUser,
  });

  return { loginUser };
};

export default useLogInUser;
