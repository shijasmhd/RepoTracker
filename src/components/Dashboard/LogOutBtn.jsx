import useLoginData from "@/hooks/useLoginData";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

const LogOutBtn = () => {
  const [, setLoginData] = useLoginData();
  const navigate = useNavigate();

  return (
    <div className="flex justify-end w-full">
      <LogOut
        size={25}
        strokeWidth={2.75}
        color="#a3a3a3"
        className="m-2"
        onClick={() => {
          setLoginData(null);
          navigate("/", { replace: true });
        }}
      />
    </div>
  );
};

export default LogOutBtn;
