import React from 'react'
import { File } from 'lucide-react'

const Dashboard = ({ selectedProject, onSelectFile }) => {
  if (!selectedProject) {
    return (
      <div className="p-4 text-center text-gray-500">
        No project selected. Create a new project or select an existing one.
      </div>
    )
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">{selectedProject.name}</h2>
      <div className="flex space-x-2">
        {selectedProject.files.map((file) => (
          <button
            key={file.name}
            onClick={() => onSelectFile(file)}
            className="flex items-center px-3 py-2 bg-white rounded shadow hover:bg-gray-50"
          >
            <File size={16} className="mr-2" />
            {file.name}
          </button>
        ))}
      </div>
    </div>
  )
}

export default Dashboard