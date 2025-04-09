import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProjectFolio from './ProjectFolio';

// Example project data
const projectsData = [
  {
    id: 'project-1',
    title: 'AI-Powered Code Assistant',
    description: 'A sophisticated code analysis and suggestion tool built with machine learning',
    problem: 'Developers spend significant time on repetitive code patterns and debugging common issues.',
    solution: 'Created an AI-powered assistant that analyzes code in real-time, suggesting improvements and detecting potential bugs before they reach production.',
    impact: [
      {
        metric: 'Development Speed',
        value: '40%',
        improvement: 'Faster development cycles'
      },
      {
        metric: 'Bug Detection',
        value: '75%',
        improvement: 'Reduction in common bugs'
      }
    ],
    codeSnippets: [
      {
        title: 'AI Analysis Pipeline',
        code: `async function analyzeCode(snippet: string) {
  const tokens = await tokenize(snippet);
  const patterns = detectPatterns(tokens);
  return generateSuggestions(patterns);
}`,
        annotations: [
          {
            line: 2,
            note: 'Custom tokenizer for improved accuracy'
          }
        ]
      }
    ],
    contribution: [
      'Architected the core analysis pipeline',
      'Implemented machine learning models for pattern recognition',
      'Optimized performance for real-time analysis'
    ],
    sketches: [
      {
        initial: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&q=80',
        final: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&q=80'
      }
    ]
  }
  // Add more projects as needed
];

const ProjectsSection = () => {
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-indigo-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-indigo-900/20">
      <AnimatePresence mode="wait">
        {selectedProject ? (
          <ProjectFolio 
            project={projectsData.find(p => p.id === selectedProject)!} 
          />
        ) : (
          <motion.div 
            className="max-w-4xl mx-auto px-4 py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <h2 className="text-4xl font-bold text-center mb-12 handwritten bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
              Featured Projects
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {projectsData.map((project) => (
                <motion.div
                  key={project.id}
                  className="relative bg-white/80 dark:bg-gray-800/80 rounded-lg p-6 shadow-xl cursor-pointer overflow-hidden group"
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setSelectedProject(project.id)}
                >
                  <div className="relative z-10">
                    <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {project.description}
                    </p>
                    <motion.button
                      className="text-indigo-600 dark:text-indigo-400 font-medium"
                      whileHover={{ x: 5 }}
                    >
                      View Case Study →
                    </motion.button>
                  </div>
                  
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity"
                    initial={false}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProjectsSection;