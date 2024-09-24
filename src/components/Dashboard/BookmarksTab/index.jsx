import { TabsContent } from "@/components/ui/tabs";
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import BookMarkChart from "./BookmarkChart";
import CsvUploadBtn from "./CsvUploadBtn";
import Card from "./BookmarkCard";
import useUserBookMarks from "@/hooks/useUserBookMarks";

const BookmarksTab = () => {
  const [bookmarkSearch, setBookmarkSearch] = useState("");

  const { data: bookmarks, isError } = useUserBookMarks();

  const filteredBookmarks = bookmarks?.filter((bookmark) =>
    bookmark?.repoName?.toLowerCase().includes(bookmarkSearch.toLowerCase())
  );

  const removeBookmark = (id) => {
    console.log("Removing bookmark:", id);
  };

  return (
    <TabsContent value="bookmarks">
      <div className="mb-10">
        <BookMarkChart />
      </div>
      <Input
        type="text"
        placeholder="Search bookmarks"
        value={bookmarkSearch}
        onChange={(e) => setBookmarkSearch(e.target.value)}
        className="mb-4 bg-input"
      />
      <ScrollArea className="min-h-28 h-fit mb-5 rounded">
        {isError || filteredBookmarks?.length < 1 ? (
          <div className="flex justify-center w-full">
            <div>
              <h1 className="text-primary-foreground">Nothing to show!</h1>
            </div>
          </div>
        ) : (
          filteredBookmarks?.map((bookmark) => (
            <Card key={bookmark.id} data={bookmark}>
              <Button
                onClick={() => removeBookmark(bookmark.id)}
                variant="destructive"
                className="mr-3"
              >
                Remove
              </Button>
            </Card>
          ))
        )}
      </ScrollArea>
      <CsvUploadBtn />
    </TabsContent>
  );
};

export default BookmarksTab;
