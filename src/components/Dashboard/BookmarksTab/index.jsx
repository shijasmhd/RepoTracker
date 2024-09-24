import { TabsContent } from "@/components/ui/tabs";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import BookMarkChart from "./BookmarkChart";
import CsvUploadBtn from "./CsvUploadBtn";
import Card from "../Card";

const fetchBookmarks = async () => {
  return [
    {
      id: 1,
      name: "react",
      owner: "facebook",
      url: "https://github.com/facebook/react",
    },
    { id: 2, name: "vue", owner: "vuejs", url: "https://github.com/vuejs/vue" },
  ];
};

const BookmarksTab = () => {
  const [bookmarkSearch, setBookmarkSearch] = useState("");

  const {
    data: bookmarks,
    isFetching,
    isError,
    error,
  } = useQuery({ queryKey: ["bookmarks"], queryFn: fetchBookmarks });

  const filteredBookmarks = bookmarks?.filter((bookmark) =>
    bookmark.name.toLowerCase().includes(bookmarkSearch.toLowerCase())
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
      <ScrollArea className="min-h-52 h-fit mb-5 rounded">
        {filteredBookmarks?.map((bookmark) => (
          <Card key={bookmark.id} data={bookmark}>
            <Button
              onClick={() => removeBookmark(bookmark.id)}
              variant="destructive"
              className="mr-3"
            >
              Remove
            </Button>
          </Card>
        ))}
      </ScrollArea>
      <CsvUploadBtn />
    </TabsContent>
  );
};

export default BookmarksTab;
