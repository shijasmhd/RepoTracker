import { useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BookmarksTab from "./BookmarksTab";
import ExploreTab from "./ExploreTab";
import { useNavigate } from "react-router-dom";
import useLoginData from "@/hooks/useLoginData";
import LogOutBtn from "./LogOutBtn";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("bookmarks");
  const [logInData] = useLoginData();
  const navigate = useNavigate();

  useEffect(() => {
    if (!logInData) {
      navigate("/login", { replace: true });
    }
  });

  return (
    <div className="flex h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <main className="flex-1 p-4 overflow-auto">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex flex-wrap justify-between w-full px-3 mb-6">
            <h1 className="text-2xl font-extra-bold text-primary-foreground">
              RepoTracker
            </h1>
            <LogOutBtn />
          </div>
          <TabsList className="flex items-start bg-gray-900 mb-8">
            <TabsTrigger value="bookmarks">My Bookmarks</TabsTrigger>
            <TabsTrigger value="explore">Explore</TabsTrigger>
          </TabsList>
          <BookmarksTab />
          <ExploreTab />
        </Tabs>
      </main>
    </div>
  );
};

export default Dashboard;
