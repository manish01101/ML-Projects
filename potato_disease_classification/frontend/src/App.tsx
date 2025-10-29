import { useState } from "react";
import { MdOutlineUploadFile } from "react-icons/md";

interface ServerRes {
  class: string;
  confidence: number;
}

function App() {
  const [file, setFile] = useState<File | null>(null);
  const [serverRes, setServerRes] = useState<ServerRes | null>(null);
  const [loading, setLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selected = e.target.files[0];
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
      setPreview(URL.createObjectURL(droppedFile));
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleSubmit = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/predict`, {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      setServerRes(result);
      console.log("Success:", result);
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-0 to-gray-300">
      {/* navbar */}
      <nav className="flex items-center gap-5 p-2 bg-green-500">
        <img src="image.png" alt="logo" className="rounded-lg w-12 h-12" />
        <h2 className="font-bold text-xl tracking-wide">
          Potato Disease Classifier
        </h2>
      </nav>

      <main className="flex-1 flex flex-col justify-center items-center p-5">
        {/* file upload */}
        <div className="px-8 py-2 gap-2 bg-white shadow-lg rounded-2xl w-3/4 md:w-1/2 lg:w-2/5 flex flex-col justify-center items-center">
          <h2 className="text-3xl font-bold text-gray-700">
            Upload Your Image
          </h2>

          <label
            htmlFor="file"
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`w-full flex flex-col justify-center items-center border-2 border-dashed rounded-xl p-8 cursor-pointer transition ${
              isDragging
                ? "border-green-500 bg-green-50"
                : "border-gray-400 hover:bg-gray-100"
            }`}
          >
            {preview ? (
              <img
                src={preview}
                alt="Preview"
                className="max-h-36 rounded-md mb-3 shadow-sm"
              />
            ) : (
              <MdOutlineUploadFile className="h-16 w-16 text-gray-500" />
            )}
            <span className="text-gray-600 text-lg text-center">
              {file ? file.name : "Click or drag to upload"}
            </span>

            <input
              id="file"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
            {/* {serverRes && <span className="bg-gray-200 text-lg font-bold mt-2 px-3 py-2 rounded-lg border">Upload new</span>} */}
          </label>

          {/* for clearing file */}
          {file && (
            <button
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
              onClick={() => {
                setFile(null);
                setPreview(null);
                setServerRes(null);
              }}
            >
              Clear File
            </button>
          )}

          <button
            disabled={!file || loading}
            onClick={() => file && handleSubmit(file)}
            className={`font-bold text-2xl rounded border px-6 py-3 bg-gray-300 hover:bg-gray-400 ${
              file ? "cursor-pointer" : "cursor-not-allowed"
            }`}
          >
            {loading ? "Processing..." : "Submit"}
          </button>
        </div>

        {/* output */}
        {serverRes && (
          <div className="mt-10 bg-white rounded-2xl shadow-md p-8 text-center w-full max-w-md border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Prediction Result
            </h3>
            <p className="text-lg text-gray-600">
              <span className="font-semibold">Class:</span>{" "}
              <span className="text-green-700">{serverRes.class}</span>
            </p>
            <p className="text-lg text-gray-600">
              <span className="font-semibold">Confidence:</span>{" "}
              <span className="text-blue-600">
                {(serverRes.confidence * 100).toFixed(2)}%
              </span>
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
export default App;
