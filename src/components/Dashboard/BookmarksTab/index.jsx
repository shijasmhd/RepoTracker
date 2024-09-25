import { TabsContent } from "@/components/ui/tabs";
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import BookMarkChart from "./BookmarkChart";
import CsvUploadBtn from "./CsvUploadBtn";
import Card from "./BookmarkCard";
import useUserBookMarks from "@/hooks/useUserBookMarks";
import useLoginData from "@/hooks/useLoginData";
import useRemoveBookmark from "@/hooks/useRemoveBookmark";
import { useQueryClient } from "@tanstack/react-query";

const BookmarksTab = () => {
  const [bookmarkSearch, setBookmarkSearch] = useState("");
  const [logInData] = useLoginData(); // TODO: Need to give as context
  const { data: bookmarks, isError, error } = useUserBookMarks(logInData?.id);

  const filteredBookmarks = bookmarks?.filter((bookmark) =>
    bookmark?.repoName?.toLowerCase().includes(bookmarkSearch.toLowerCase())
  );

  const client = useQueryClient();
  const { removeBookMark, removingBookMark, variables } = useRemoveBookmark();

  return (
    <TabsContent value="bookmarks">
      <div className="mb-10">
        <BookMarkChart userId={logInData?.id} />
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
            <h1 className="text-primary-foreground">
              {isError ? error.message : "Nothing to show!"}
            </h1>
          </div>
        ) : (
          filteredBookmarks?.map((bookmark) => (
            <Card key={bookmark.id} data={bookmark}>
              <Button
                onClick={() => {
                  removeBookMark(
                    {
                      bookMarkId: bookmark.id,
                      userId: logInData.id,
                    },
                    {
                      onSuccess: () => {
                        client.invalidateQueries([
                          "bookmarks",
                          "bookmarkStats",
                        ]);
                      },
                    }
                  );
                }}
                variant="destructive"
                className="mr-3"
                disabled={removingBookMark}
              >
                {removingBookMark && variables.bookMarkId === bookmark.id
                  ? "Removing..."
                  : "Remove"}
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
