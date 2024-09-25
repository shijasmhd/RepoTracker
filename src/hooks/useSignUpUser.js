import { createUser } from "@/api/backend";
import { useMutation } from "@tanstack/react-query";

const useSignUpUser = () => {
  const { mutate: signUpUser } = useMutation({
    mutationFn: createUser,
  });

  return { signUpUser };
};

export default useSignUpUser;
