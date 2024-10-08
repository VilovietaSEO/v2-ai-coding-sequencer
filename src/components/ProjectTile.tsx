import React from 'react'
import { Folder } from 'lucide-react'

interface ProjectTileProps {
  project: {
    id: string;
    name: string;
    description: string;
  }
}

const ProjectTile: React.FC<ProjectTileProps> = ({ project }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <div className="flex items-center mb-4">
        <Folder className="mr-2 text-blue-500" size={24} />
        <h3 className="text-xl font-semibold">{project.name}</h3>
      </div>
      <p className="text-gray-600">{project.description}</p>
    </div>
  )
}

export default ProjectTile