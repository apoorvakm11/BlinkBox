"use client"
import FileDownload from "@/components/FileDownload"
import FileUpload from "@/components/FileUpload"
import InviteCode from "@/components/InviteCode"
import axios from "axios"
import { useState } from "react"

export default function Home() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)
  const [port, setPort] = useState<number | null>(null)
  const [activeTab, setActiveTab] = useState<"upload" | "download">("upload")

  const handleFileUpload = async (file: File) => {
    setUploadedFile(file)
    setIsUploading(true)

    try {
      const formData = new FormData()
      formData.append("file", file)

      const response = await axios.post("/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })

      setPort(response.data.port)
    } catch (error) {
      console.error("Error uploading file:", error)
      alert("Failed to upload file. Please try again.")
    } finally {
      setIsUploading(false)
    }
  }

  const handleDownload = async (port: number) => {
    setIsDownloading(true)

    try {
      const response = await axios.get(`/api/download/${port}`, {
        responseType: "blob",
      })

      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement("a")
      link.href = url

      const headers = response.headers
      let contentDisposition = ""

      for (const key in headers) {
        if (key.toLowerCase() === "content-disposition") {
          contentDisposition = headers[key]
          break
        }
      }

      let filename = "downloaded-file"

      if (contentDisposition) {
        const filenameMatch = contentDisposition.match(/filename="(.+)"/)
        if (filenameMatch && filenameMatch.length === 2) {
          filename = filenameMatch[1]
        }
      }

      link.setAttribute("download", filename)
      document.body.appendChild(link)
      link.click()
      link.remove()
    } catch (error) {
      console.error("Error downloading file:", error)
      alert("Failed to download file. Please check the invite code and try again.")
    } finally {
      setIsDownloading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <header className="text-center mb-16 animate-fade-in">
          <div className="relative">
            <h1 className="text-6xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4 animate-gradient">
              BlinkBox
            </h1>
            <div className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full animate-pulse"></div>
          </div>
          <p className="text-xl text-gray-600 font-medium">Secure Share in a blink</p>
          <div className="mt-4 w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full"></div>
        </header>

        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-8 animate-slide-up">
          <div className="flex border-b border-gray-100 mb-8 bg-gray-50/50 rounded-2xl p-2">
            <button
              className={`flex-1 px-6 py-4 font-semibold rounded-xl transition-all duration-300 transform ${
                activeTab === "upload"
                  ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg scale-105"
                  : "text-gray-600 hover:text-gray-800 hover:bg-white/50"
              }`}
              onClick={() => setActiveTab("upload")}
            >
              <span className="flex items-center justify-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
                Share a File
              </span>
            </button>
            <button
              className={`flex-1 px-6 py-4 font-semibold rounded-xl transition-all duration-300 transform ${
                activeTab === "download"
                  ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg scale-105"
                  : "text-gray-600 hover:text-gray-800 hover:bg-white/50"
              }`}
              onClick={() => setActiveTab("download")}
            >
              <span className="flex items-center justify-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                Receive a File
              </span>
            </button>
          </div>

          <div className="transition-all duration-500 ease-in-out">
            {activeTab === "upload" ? (
              <div className="animate-fade-in">
                <FileUpload onFileUpload={handleFileUpload} isUploading={isUploading} />

                {uploadedFile && !isUploading && (
                  <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-100 animate-slide-in">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mr-3">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-800">
                          Selected file: <span className="text-green-600">{uploadedFile.name}</span>
                        </p>
                        <p className="text-xs text-gray-500">Size: {Math.round(uploadedFile.size / 1024)} KB</p>
                      </div>
                    </div>
                  </div>
                )}

                {isUploading && (
                  <div className="mt-8 text-center animate-fade-in">
                    <div className="relative">
                      <div className="w-16 h-16 mx-auto mb-4">
                        <div className="absolute inset-0 rounded-full border-4 border-indigo-200"></div>
                        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-indigo-500 animate-spin"></div>
                      </div>
                      <p className="text-gray-600 font-medium">Uploading your file...</p>
                      <div className="mt-2 w-32 h-1 bg-gray-200 rounded-full mx-auto overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                )}

                <InviteCode port={port} />
              </div>
            ) : (
              <div className="animate-fade-in">
                <FileDownload onDownload={handleDownload} isDownloading={isDownloading} />

                {isDownloading && (
                  <div className="mt-8 text-center animate-fade-in">
                    <div className="relative">
                      <div className="w-16 h-16 mx-auto mb-4">
                        <div className="absolute inset-0 rounded-full border-4 border-purple-200"></div>
                        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-purple-500 animate-spin"></div>
                      </div>
                      <p className="text-gray-600 font-medium">Downloading your file...</p>
                      <div className="mt-2 w-32 h-1 bg-gray-200 rounded-full mx-auto overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <footer className="mt-16 text-center text-gray-500 text-sm animate-fade-in">
          <div className="flex items-center justify-center mb-2">
            <div className="w-2 h-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mr-2 animate-pulse"></div>
            <p>PeerLink &copy; {new Date().getFullYear()} - Secure P2P File Sharing</p>
            <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full ml-2 animate-pulse"></div>
          </div>
        </footer>
      </div>
    </div>
  )
}
