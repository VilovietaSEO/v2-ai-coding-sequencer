import React, { useState } from 'react'
import { Code, Plus } from 'lucide-react'
import ProjectTile from './components/ProjectTile'
import CreateProjectModal from './components/CreateProjectModal'
import AIComponent from './components/AIComponent'

interface Project {
  id: string;
  name: string;
  description: string;
}

function App() {
  const [projects, setProjects] = useState<Project[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)

  const handleCreateProject = (name: string, description: string) => {
    const newProject: Project = {
      id: Date.now().toString(),
      name,
      description,
    }
    setProjects([...projects, newProject])
    setIsModalOpen(false)
  }

  const handleProgressUpdate = (step: number) => {
    setCurrentStep(step);
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold flex items-center">
          <Code className="mr-2" /> AI Code Generator
        </h1>
      </header>
      
      <main>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Your Projects</h2>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center hover:bg-blue-600 transition-colors"
          >
            <Plus className="mr-2" size={20} />
            Create Project
          </button>
        </div>
        
        {projects.length === 0 ? (
          <p className="text-gray-500">No projects yet. Create your first project!</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <ProjectTile key={project.id} project={project} />
            ))}
          </div>
        )}

        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">AI SaaS Development Plan</h2>
          <AIComponent onProgressUpdate={handleProgressUpdate} />
          {currentStep > 0 && (
            <div className="mt-4 text-center">
              <p className="text-lg font-semibold">Current Step: {currentStep}</p>
            </div>
          )}
        </div>
      </main>

      {isModalOpen && (
        <CreateProjectModal
          onClose={() => setIsModalOpen(false)}
          onCreateProject={handleCreateProject}
        />
      )}
    </div>
  )
}

export default App