import React from 'react'
import { FolderPlus, Code } from 'lucide-react'

const Sidebar = ({ projects, selectedProject, onSelectProject, onCreateProject }) => {
  return (
    <div className="w-64 bg-gray-800 text-white p-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold">AI Code Gen</h1>
        <button
          onClick={onCreateProject}
          className="p-2 bg-blue-500 rounded-full hover:bg-blue-600 transition-colors"
        >
          <FolderPlus size={20} />
        </button>
      </div>
      <div className="space-y-2">
        {projects.map((project) => (
          <button
            key={project.id}
            onClick={() => onSelectProject(project)}
            className={`flex items-center w-full p-2 rounded ${
              selectedProject?.id === project.id ? 'bg-gray-700' : 'hover:bg-gray-700'
            }`}
          >
            <Code size={16} className="mr-2" />
            <span className="truncate">{project.name}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default Sidebar