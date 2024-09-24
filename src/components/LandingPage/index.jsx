import { useState } from "react";
import { Button } from "@/components/ui/button";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import { useParams } from "react-router-dom";

const LandingPage = () => {
  const { tab } = useParams();
  const [activeForm, setActiveForm] = useState(
    ["login", "signup"].includes(tab) ? tab : null
  );

  const handleFormToggle = (form) => {
    setActiveForm(form);
    if (window.innerWidth < 768) {
      setTimeout(() => {
        document.getElementById(form).scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800 text-white overflow-x-hidden">
      <div className="text-center box-border lg:w-1/2 p-8">
        <h1 className="md:text-3xl text-5xl mb-4">Welcome to</h1>
        <h1 className="md:text-7xl text-5xl font-bold mb-5"> RepoTracker</h1>
        <p className="md:text-2xl text-1xl mb-11">Your Repo Vault</p>
        <div className="space-y-4">
          <Button
            className="w-full max-w-xs bg-primary text-primary-foreground hover:bg-primary/90"
            onClick={() => handleFormToggle("signup")}
          >
            Sign Up
          </Button>
          <div className="text-sm">
            Already a user?{" "}
            <Button
              variant="link"
              className="text-destructive-foreground hover:text-primary-foreground/90"
              onClick={() => handleFormToggle("login")}
            >
              Login
            </Button>
          </div>
        </div>
      </div>
      <div className="lg:w-1/2 p-8 box-border">
        {activeForm === "login" && (
          <div id="login">
            <LoginForm />
          </div>
        )}
        {activeForm === "signup" && (
          <div id="signup">
            <SignupForm />
          </div>
        )}
      </div>
    </div>
  );
};

export default LandingPage;
