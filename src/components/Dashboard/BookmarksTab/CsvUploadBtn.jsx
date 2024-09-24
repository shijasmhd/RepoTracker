import { Input } from "@/components/ui/input";

const CsvUploadBtn = () => {
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    console.log("Uploading file:", file.name);
  };

  return (
    <div className="w-full mb-10">
      <div className="w-fit mx-auto">
        <h1 className="text-xl text-gray-300 mb-3">
          Want to add multiple bookmarks? Upload as csv!
        </h1>
        <Input
          className="bg-primary-foreground"
          id="csv-upload"
          type="file"
          accept=".csv"
          onChange={handleFileUpload}
        />
      </div>
    </div>
  );
};

export default CsvUploadBtn;
