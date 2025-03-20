'use client'
import { api } from "@/convex/_generated/api"
import { useMutation } from "convex/react"
import { useState } from "react";
import React from "react";
import { Button } from "./ui/button";
import uuid4 from 'uuid4'
import { Input } from "./ui/input";
import PdfViewer from "./PdfViewer";
import LoadingSpinner from "./LoadingSpinner";
import { Upload, FileText, CheckCircle, AlertCircle, ArrowRight } from "lucide-react";

export default function UploadPDF() {
  const generateUploadURL = useMutation(api.fileStorage.generateUploadUrl)
  const InsertFileEntry = useMutation(api.fileStorage.AddFileEntrytoDB)
  const getFileUrl = useMutation(api.fileStorage.getFileURL)

  const [fileName, setFileName] = useState('');
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState(''); // holds the uploaded file URL
  const [extractedResult, setExtractedResult] = useState(''); // holds the extracted answer sheet JSON
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [extractSuccess, setExtractSuccess] = useState(false);
  const [error, setError] = useState('');

  const OnFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
      // Auto-set the file name if not already set
      if (!fileName) {
        setFileName(e.target.files[0].name.replace('.pdf', ''));
      }
      setUploadSuccess(false);
      setExtractSuccess(false);
      setError('');
    }
  }
      
  const OnUpload = async () => {
    if (!file) {
      setError('Please select a file first');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      // Get a short-lived upload URL
      const posturl = await generateUploadURL();
      
      // Upload the file
      const result = await fetch(posturl, {
        method: 'POST',
        headers: { "Content-Type": file.type },
        body: file
      });
      
      if (!result.ok) {
        throw new Error('Upload failed');
      }
      
      const { storageId } = await result.json();
      
      // Generate a unique fileId and retrieve the file URL from storage
      const fileId = uuid4();
      const newFileUrl = await getFileUrl({ storageId: storageId });
      
      // Save the file entry to the database
      await InsertFileEntry({
        fileId: fileId,
        storageId: storageId,
        fileName: fileName || 'Untitled File',
        fileURL: newFileUrl || '',
      });
      
      setFileUrl(newFileUrl as string);
      setUploadSuccess(true);
      setExtractedResult('');
    } catch (error) {
      console.error("Upload error:", error);
      setError('Failed to upload file. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  // Function to call the FastAPI extraction endpoint
  const extractAnswerSheet = async () => {
    if (!fileUrl) {
      setError('Please upload a PDF file first');
      return;
    }
    
    setLoading(true);
    setError('');
    setExtractSuccess(false);
    
    try {
      const response = await fetch("http://localhost:8000/extract", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pdf_uri: fileUrl })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setExtractedResult(data.result);
        setExtractSuccess(true);
      } else {
        setError(data.detail || 'Extraction failed');
        console.error("Error:", data.detail);
      }
    } catch (error) {
      console.error("Extraction error:", error);
      setError('Failed to extract data. Please check if the API server is running.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container mx-auto pt-32 pb-16 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Upload Answer Sheet</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Upload a student answer sheet in PDF format. Our system will process the document and extract the responses for evaluation.
          </p>
        </div>
        
        {/* Upload Controls */}
        <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 mb-8">
          <div className="flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  PDF Document
                </label>
                <div className="relative">
                  <Input 
                    type="file" 
                    accept="application/pdf" 
                    onChange={OnFileSelect}
                    className="flex-1 pl-10"
                  />
                  <FileText className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
                <p className="mt-1 text-sm text-gray-500">
                  {file ? `Selected: ${file.name}` : 'No file selected'}
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Document Name
                </label>
                <div className="relative">
                  <Input 
                    placeholder="Enter a name for this document" 
                    value={fileName}
                    onChange={(e) => setFileName(e.target.value)}
                    className="flex-1 pl-10"
                  />
                  <FileText className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
                <p className="mt-1 text-sm text-gray-500">
                  This name will be used to reference the document in the system
                </p>
              </div>
            </div>
            
            <div className="flex justify-end">
              <Button 
                onClick={OnUpload} 
                disabled={loading || !file}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full shadow-md hover:shadow-lg transition-all"
              >
                {loading ? <LoadingSpinner /> : (
                  <>
                    <Upload className="h-5 w-5" />
                    Upload PDF
                  </>
                )}
              </Button>
            </div>
            
            {error && (
              <div className="flex items-center gap-2 p-3 text-red-800 bg-red-50 rounded-lg border border-red-200">
                <AlertCircle className="h-5 w-5" />
                <span>{error}</span>
              </div>
            )}
            
            {uploadSuccess && !error && (
              <div className="flex items-center gap-2 p-3 text-green-800 bg-green-50 rounded-lg border border-green-200">
                <CheckCircle className="h-5 w-5" />
                <span>File uploaded successfully!</span>
              </div>
            )}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Side - PDF Viewer */}
          <div className="flex flex-col">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <FileText className="h-5 w-5 text-blue-600" />
              Document Preview
            </h2>
            <div className="w-full h-[700px] border rounded-xl shadow-lg bg-white overflow-hidden">
              {fileUrl ? (
                <PdfViewer fileUrl={fileUrl} />
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-gray-500 p-8 text-center">
                  <div className="w-20 h-20 mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                    <FileText className="h-10 w-10 text-gray-400" />
                  </div>
                  <p className="text-lg">No PDF loaded</p>
                  <p className="text-sm text-gray-400 mt-2">
                    Upload a PDF file to preview it here
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Right Side - Extraction Results */}
          <div className="flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-blue-600" />
                Extracted Results
              </h2>
              <Button 
                onClick={extractAnswerSheet} 
                disabled={!fileUrl || loading}
                variant="outline"
                className="flex items-center gap-2 border-blue-200 text-blue-600 hover:bg-blue-50"
              >
                {loading ? <LoadingSpinner /> : (
                  <>
                    Process Document
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
            
            <div className="w-full h-[700px] border rounded-xl shadow-lg bg-white overflow-hidden">
              {loading && (
                <div className="h-full flex flex-col items-center justify-center p-8">
                  <LoadingSpinner size={48} />
                  <p className="mt-6 text-gray-600 font-medium">Processing PDF...</p>
                  <p className="text-sm text-gray-500 mt-2">This may take a few moments</p>
                </div>
              )}

              {!loading && extractedResult && (
                <div className="h-full overflow-auto p-6">
                  <div className="mb-4 p-3 bg-green-50 rounded-lg border border-green-200 text-green-800 flex items-center gap-2">
                    <CheckCircle className="h-5 w-5" />
                    <span>Content extracted successfully!</span>
                  </div>
                  <pre className="bg-gray-50 p-4 rounded-md whitespace-pre-wrap border border-gray-200 text-sm">
                    {JSON.stringify(extractedResult, null, 2)}
                  </pre>
                </div>
              )}

              {!loading && !extractedResult && (
                <div className="h-full flex flex-col items-center justify-center text-gray-500 p-8 text-center">
                  <div className="w-20 h-20 mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                    <FileText className="h-10 w-10 text-gray-400" />
                  </div>
                  <p className="text-lg">No data extracted yet</p>
                  <p className="text-sm text-gray-400 mt-2">
                    {fileUrl 
                      ? 'Click "Process Document" to extract content from the uploaded PDF' 
                      : 'Upload a PDF file first, then extract its content'}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Action Buttons */}
        {extractSuccess && (
          <div className="mt-8 text-center">
            <Button 
              onClick={() => window.location.href = '/Evaluation'}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all"
            >
              Continue to Evaluation
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
