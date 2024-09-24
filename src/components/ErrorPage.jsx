import { useNavigate, useRouteError } from "react-router-dom";
import { Button } from "./ui/button";

const ErrorPage = () => {
  const error = useRouteError();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800 text-white overflow-x-hidden">
      <div className="text-center p-8">
        <h1 className="text-5xl md:text-7xl font-bold mb-5">
          Error {error.status}
        </h1>
        <p className="md:text-2xl text-1xl mb-11">{error.statusText}</p>
        <p className="md:text-lg text-sm mb-8">
          It seems like something went wrong.
        </p>
        <div className="space-y-4">
          <Button
            className="w-full max-w-xs bg-primary text-primary-foreground hover:bg-primary/90"
            onClick={() => navigate("/", { replace: true })}
          >
            Go Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
