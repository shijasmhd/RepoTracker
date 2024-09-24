import { useEffect, useState } from "react";
import { TabsContent } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import Card from "../Card";
import useSearchRepos from "@/hooks/useSearchRepos";
import useSearchUsers from "@/hooks/useSearchUsers";

const ExploreTab = () => {
  const [repoSearch, setRepoSearch] = useState("");
  const [userSearch, setUserSearch] = useState("");

  // For debouncing
  const [repoSearchQuery, setRepoSearchQuery] = useState("");
  const [userSearchQuery, setUserSearchQuery] = useState("");

  const { data: searchedRepos } = useSearchRepos(repoSearchQuery.trim());
  const { data: searchedUsers } = useSearchUsers(userSearchQuery.trim());

  // For debouncing & hiding user search box
  useEffect(() => {
    const timer = setTimeout(
      () => {
        setRepoSearchQuery(repoSearch);
      },
      repoSearch ? 1000 : 0
    );

    return () => clearTimeout(timer);
  }, [repoSearch]);

  // For debouncing & hiding repo search box
  useEffect(() => {
    const timer = setTimeout(
      () => {
        setUserSearchQuery(userSearch);
      },
      userSearch ? 1000 : 0
    );

    return () => clearTimeout(timer);
  }, [userSearch]);

  const addBookmark = (repo) => {
    console.log("Adding bookmark:", repo.url);
  };

  return (
    <TabsContent value="explore">
      <div className="space-y-4 mb-4">
        {!userSearch && (
          <div>
            <Label className="text-primary-foreground" htmlFor="repo-search">
              Search GitHub Repositories
            </Label>
            <Input
              id="repo-search"
              type="text"
              placeholder="Enter repository name"
              className="text-primary-foreground"
              value={repoSearch}
              onChange={(e) => setRepoSearch(e.target.value)}
            />
          </div>
        )}
        {!repoSearch && (
          <div>
            <Label className="text-primary-foreground" htmlFor="user-search">
              Search GitHub Users
            </Label>
            <Input
              id="user-search"
              type="text"
              placeholder="Enter username"
              className="text-primary-foreground"
              value={userSearch}
              onChange={(e) => setUserSearch(e.target.value)}
            />
          </div>
        )}
      </div>
      <ScrollArea className="h-[300px]">
        {searchedRepos?.length < 1 ? (
          <h1 className="text-muted-foreground mx-auto">No Repos found!</h1>
        ) : (
          searchedRepos?.map((repo) => (
            <Card key={repo.id} data={repo}>
              <Button onClick={() => addBookmark(repo)}>Add Bookmark</Button>
            </Card>
          ))
        )}
        {searchedUsers?.length < 1 ? (
          <h1 className="text-muted-foreground mx-auto">No Users found!</h1>
        ) : (
          searchedUsers?.map((user) => <Card key={user.id} data={user} />)
        )}
      </ScrollArea>
    </TabsContent>
  );
};

export default ExploreTab;
