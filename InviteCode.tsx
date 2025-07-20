"use client"
import { useState } from "react"

interface InviteCodeProps {
  port: number | null
}

export default function InviteCode({ port }: InviteCodeProps) {
  const [copied, setCopied] = useState(false)

  if (!port) return null

  const copyToClipboard = () => {
    navigator.clipboard.writeText(port.toString())
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="mt-8 relative overflow-hidden animate-slide-in">
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-3xl p-6 relative">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-green-200/30 to-emerald-200/30 rounded-full blur-xl"></div>
        <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-br from-emerald-200/30 to-green-200/30 rounded-full blur-xl"></div>

        <div className="relative">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mr-4 animate-bounce">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-green-800">File Ready to Share!</h3>
              <p className="text-green-600">Your file is now available for download</p>
            </div>
          </div>

          <p className="text-green-700 mb-6 font-medium">
            Share this invite code with anyone you want to share the file with:
          </p>

          <div className="flex items-center bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-green-100">
            <div className="flex-1 p-6 font-mono text-2xl font-bold text-gray-800 bg-gradient-to-r from-gray-50 to-white">
              {port}
            </div>
            <button
              onClick={copyToClipboard}
              className="p-6 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white transition-all duration-300 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-green-200"
              aria-label="Copy invite code"
            >
              {copied ? (
                <div className="flex items-center">
                  <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="font-semibold">Copied!</span>
                </div>
              ) : (
                <div className="flex items-center">
                  <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="font-semibold">Copy</span>
                </div>
              )}
            </button>
          </div>

          <div className="mt-6 flex items-center justify-center space-x-2 text-sm text-gray-600">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <p>This code will be valid as long as your file sharing session is active</p>
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
