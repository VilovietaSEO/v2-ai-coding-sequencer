import React, { useState, useEffect } from 'react';
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

interface AIComponentProps {
  onProgressUpdate: (step: number) => void;
}

const AIComponent: React.FC<AIComponentProps> = ({ onProgressUpdate }) => {
  const [idea, setIdea] = useState('');
  const [currentStep, setCurrentStep] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [context, setContext] = useState<Array<{ role: string; content: string }>>([]);

  const prompts = [
    "I need to create a SaaS dev plan using the following positions: Business analyst, Product manager, front-end developer, back end developer, dev ops, database admin, UX/UI designer, Quality assurance, automation test engineer, security specialist. I'll provide you with the SaaS idea in the prompts and we will work together to create a SaaS Development Plan. The idea is {idea}.",
    "This is just my idea. Let's start with business analyst. Provide the brain storm from this perspective.",
    "Let's get the features solidified before we move on. Please provide extreme detail on all of the features",
    "This is great. Let's move onto the next logical person to brainstorm. We will consider the job of the business analyst completed. We now need to take the realm of ideas and figure out what is required. Act as product manager now to continue the process.",
    "Now proceed with the technical requirements from the perspective of the front end developer.",
    "This is great. Let's move on to back end requirements.",
    "Now, let's focus on infrastructure and data management. Act as that database admin and dev ops expert.",
    "Now let's just do one step at a time. What is the very first thing that is required?",
    "You already have the consolidated requirements I believe. Now I just need to provide directions to the UX/UI by specifying everything they will need to do.",
    "You've done a great job outlining but now I need to get specific. Provide the actual details for all things you outlined that are part of the MVP. This will be taken to the UX designer to then execute in code.",
    "Next, we must begin with the foundational code. Outline next steps assuming UX is done.",
    "Based on all of the context you have, is there a specific library or code suggestion that you'd recommend that would modify or improve these directions?",
    "Ok, I need to start creating code and saving them as files. Start by creating the file structure.",
    "Identify the next logical step of the coding process and code the next piece of the SaaS. You are only outputting one file per response. Make sure to begin by restating the file structure and mark each file as (Not Started, In Progress, Generated, Ready to Download) to keep track of the work. The README file is last. Remember this is an MVP project."
  ];

  const processStep = async () => {
    if (currentStep >= prompts.length) return;

    setIsProcessing(true);
    let prompt = prompts[currentStep];
    if (currentStep === 0) {
      prompt = prompt.replace('{idea}', idea);
    }

    try {
      const response = await client.chat.completions.create({
        model: "gpt-4o",
        messages: [
          ...context,
          { role: "user", content: prompt }
        ],
        temperature: currentStep >= 12 ? 0 : 0.1,
        max_tokens: 3508,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0
      });

      const aiResponse = response.choices[0]?.message?.content || 'No response';

      // Update context with the new message pair
      setContext(prevContext => [
        ...prevContext,
        { role: "user", content: prompt },
        { role: "assistant", content: aiResponse }
      ]);

      setCurrentStep(prevStep => prevStep + 1);
      onProgressUpdate(currentStep + 1);

      // If we're at the last prompt, keep processing until README is generated
      if (currentStep === prompts.length - 1) {
        if (!aiResponse.toLowerCase().includes('readme')) {
          // Continue with the same prompt
          setTimeout(processStep, 1000); // Add a small delay to avoid rate limiting
        }
      }
    } catch (error) {
      console.error('Error calling OpenAI API:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  useEffect(() => {
    if (idea && !isProcessing && currentStep < prompts.length) {
      processStep();
    }
  }, [idea, currentStep, isProcessing]);

  return (
    <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">AI SaaS Development Plan</h2>
      {currentStep === 0 ? (
        <div>
          <input
            type="text"
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            placeholder="Enter your SaaS idea"
            className="w-full p-2 border rounded mb-4"
          />
          <button
            onClick={() => setCurrentStep(1)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Start Development Plan
          </button>
        </div>
      ) : (
        <div>
          <p className="mb-2">Current Step: {currentStep}</p>
          <p>{isProcessing ? "Processing..." : "Waiting for next step"}</p>
        </div>
      )}
    </div>
  );
};

export default AIComponent;