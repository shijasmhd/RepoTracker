import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BookmarksTab from "./BookmarksTab";
import ExploreTab from "./ExploreTab";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("bookmarks");

  return (
    <div className="flex h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <main className="flex-1 p-4 overflow-auto">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="flex items-start bg-gray-900 mb-8">
            <TabsTrigger value="bookmarks">Bookmarks</TabsTrigger>
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
