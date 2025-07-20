"use client"
import { useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"

interface FileUploadProps {
  onFileUpload: (file: File) => void
  isUploading: boolean
}

export default function FileUpload({ onFileUpload, isUploading }: FileUploadProps) {
  const [dragActive, setDragActive] = useState(false)

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        onFileUpload(acceptedFiles[0])
      }
    },
    [onFileUpload],
  )

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
    onDragEnter: () => setDragActive(true),
    onDragLeave: () => setDragActive(false),
    onDropAccepted: () => setDragActive(false),
    onDropRejected: () => setDragActive(false),
  })

  return (
    <div
      {...getRootProps()}
      className={`
        relative w-full p-12 border-2 border-dashed rounded-3xl text-center cursor-pointer 
        transition-all duration-300 transform hover:scale-[1.02] group
        ${
          dragActive
            ? "border-indigo-400 bg-gradient-to-br from-indigo-50 to-purple-50 scale-[1.02]"
            : "border-gray-300 hover:border-indigo-300 hover:bg-gradient-to-br hover:from-gray-50 hover:to-indigo-50"
        }
        ${isUploading ? "opacity-50 pointer-events-none" : ""}
      `}
    >
      <input {...getInputProps()} />

      {/* Animated background elements */}
      <div className="absolute inset-0 rounded-3xl overflow-hidden">
        <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-indigo-200/30 to-purple-200/30 rounded-full blur-xl group-hover:animate-pulse"></div>
        <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-purple-200/30 to-pink-200/30 rounded-full blur-xl group-hover:animate-pulse"></div>
      </div>

      <div className="relative flex flex-col items-center justify-center space-y-6">
        <div
          className={`
          p-6 rounded-full transition-all duration-300 transform group-hover:scale-110
          ${
            dragActive
              ? "bg-gradient-to-br from-indigo-500 to-purple-500 shadow-lg"
              : "bg-gradient-to-br from-indigo-100 to-purple-100 group-hover:from-indigo-200 group-hover:to-purple-200"
          }
        `}
        >
          <svg
            className={`w-8 h-8 transition-colors duration-300 ${dragActive ? "text-white" : "text-indigo-500"}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>
        </div>

        <div className="space-y-2">
          <p className="text-xl font-semibold text-gray-800 group-hover:text-indigo-600 transition-colors duration-300">
            {dragActive ? "Drop your file here!" : "Drag & drop a file here"}
          </p>
          <p className="text-gray-500 group-hover:text-gray-600 transition-colors duration-300">
            or click to select from your device
          </p>
        </div>

        <div className="flex items-center space-x-2 text-sm text-gray-400">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span>Secure & encrypted transfer</span>
        </div>
      </div>
    </div>
  )
}
