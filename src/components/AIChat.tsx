import React, { useState } from 'react'
import { Send } from 'lucide-react'

const AIChat = ({ onUpdateCode }) => {
  const [message, setMessage] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    // TODO: Implement AI chat logic
    console.log('Sending message:', message)
    // Simulating AI response
    setTimeout(() => {
      onUpdateCode('// Updated code based on AI chat\nconsole.log("Hello, AI!");')
    }, 1000)
    setMessage('')
  }

  return (
    <div className="bg-white border-t p-4">
      <form onSubmit={handleSubmit} className="flex space-x-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask AI to modify the code..."
          className="flex-1 px-4 py-2 border rounded"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          <Send size={20} />
        </button>
      </form>
    </div>
  )
}

export default AIChat