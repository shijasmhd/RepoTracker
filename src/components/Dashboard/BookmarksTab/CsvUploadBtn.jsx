import { useState } from "react";
import { uploadCsv } from "@/api/backend";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AlertCircle, Upload, CheckCircle, XCircle } from "lucide-react";
import useLoginData from "@/hooks/useLoginData";

export default function CsvUploadBtn() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [status, setStatus] = useState("idle");
  const [progress, setProgress] = useState(0);
  const [uploadResult, setUploadResult] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [logInData] = useLoginData();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file || null);
  };

  const handleFileUpload = async () => {
    if (!selectedFile) {
      setUploadResult({ errors: ["Please select a file to upload."] });
      setIsModalOpen(true);
      return;
    }

    const formData = new FormData();
    formData.append("csvFile", selectedFile);

    try {
      setStatus("uploading");
      setProgress(0);

      const response = await uploadCsv(
        formData,
        logInData.id,
        (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setProgress(percentCompleted);
        }
      );

      console.log({ response });
      setStatus("success");
      setProgress(100);
      setUploadResult(response.data);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error uploading file:", error);
      setStatus("error");
      setUploadResult({
        total: 0,
        added: 0,
        failed: 0,
        errors: [error.message || "An unknown error occurred"],
      });
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    if (status === "success") {
      setSelectedFile(null);
      setStatus("idle");
      setProgress(0);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-gray-800 rounded-lg shadow-lg p-6 mb-10">
      <h2 className="text-2xl font-bold text-white mb-4">
        Upload Multiple Bookmarks
      </h2>
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Input
            id="csv-upload"
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            className="bg-gray-700 text-white file:bg-gray-600 file:text-white file:border-none"
          />
          <Button
            onClick={handleFileUpload}
            disabled={status === "uploading" || !selectedFile}
            className="bg-blue-500 hover:bg-blue-600 text-white"
          >
            {status === "uploading" ? (
              <Upload className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Upload className="mr-2 h-4 w-4" />
            )}
            {status === "uploading" ? "Uploading..." : "Upload"}
          </Button>
        </div>
        {status !== "idle" && (
          <div className="space-y-2">
            <Progress value={progress} className="w-full" />
            <p className="text-sm text-gray-300">
              {status === "uploading" && `Uploading... ${progress}%`}
              {status === "success" && (
                <span className="flex items-center text-green-400">
                  <CheckCircle className="mr-2 h-4 w-4" />
                  File processed successfully
                </span>
              )}
              {status === "error" && (
                <span className="flex items-center text-red-400">
                  <AlertCircle className="mr-2 h-4 w-4" />
                  Error processing file
                </span>
              )}
            </p>
          </div>
        )}
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="bg-muted">
          <DialogHeader>
            <DialogTitle>
              {status === "success" ? "Upload Result" : "Upload Errors"}
            </DialogTitle>
            <DialogDescription>
              {status === "success"
                ? "Summary of the CSV upload process:"
                : "The following errors occurred during the CSV upload:"}
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="mt-4 max-h-[60vh]">
            {status === "success" && uploadResult && (
              <div className="space-y-2">
                <p>Total URLs processed: {uploadResult.total}</p>
                <p className="text-green-500">
                  Successfully added: {uploadResult.added}
                </p>
                <p className="text-red-500">
                  Failed to add: {uploadResult.failed}
                </p>
                {uploadResult.errors.length > 0 && (
                  <div>
                    <p className="font-semibold">Errors:</p>
                    <ul className="list-disc pl-6 space-y-1">
                      {uploadResult.errors.map((error, index) => (
                        <li key={index} className="text-red-400">
                          {error.url + ": " + error.error}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
            {status === "error" && uploadResult && (
              <ul className="list-disc pl-6 space-y-2">
                {uploadResult.errors.map((error, index) => (
                  <li key={index} className="text-red-500">
                    {error.url + ": " + error.error}
                  </li>
                ))}
              </ul>
            )}
          </ScrollArea>
          <DialogFooter>
            <Button onClick={closeModal}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
