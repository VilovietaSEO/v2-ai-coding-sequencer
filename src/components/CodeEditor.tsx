import React from 'react'

const CodeEditor = ({ file }) => {
  if (!file) {
    return (
      <div className="h-full flex items-center justify-center text-gray-500">
        Select a file to view and edit its content.
      </div>
    )
  }

  return (
    <div className="h-full p-4 bg-white">
      <h3 className="text-lg font-semibold mb-2">{file.name}</h3>
      <textarea
        className="w-full h-[calc(100%-2rem)] p-2 font-mono text-sm border rounded"
        value={file.content}
        readOnly
      />
    </div>
  )
}

export default CodeEditor