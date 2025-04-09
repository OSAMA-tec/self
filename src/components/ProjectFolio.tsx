import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, CheckCircle2, MessageCircle, ArrowRight, Lightbulb, Target, Trophy } from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import { Text } from '@react-three/drei';

interface ProjectData {
  id: string;
  title: string;
  description: string;
  problem: string;
  solution: string;
  impact: {
    metric: string;
    value: string;
    improvement: string;
  }[];
  codeSnippets: {
    title: string;
    code: string;
    annotations: {
      line: number;
      note: string;
    }[];
  }[];
  contribution: string[];
  sketches: {
    initial: string;
    final: string;
  }[];
}

const ProjectFolio: React.FC<{ project: ProjectData }> = ({ project }) => {
  const [phase, setPhase] = useState<'concept' | 'development' | 'outcome'>('concept');
  const [selectedSnippet, setSelectedSnippet] = useState<number | null>(null);
  const [showAnnotation, setShowAnnotation] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const phaseTransition = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const { top } = containerRef.current.getBoundingClientRect();
      const scrollProgress = -top / (containerRef.current.scrollHeight - window.innerHeight);
      
      if (scrollProgress < 0.33) setPhase('concept');
      else if (scrollProgress < 0.66) setPhase('development');
      else setPhase('outcome');
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const ProblemSolutionCard = () => (
    <motion.div 
      className="relative bg-white/90 dark:bg-gray-800/90 rounded-lg p-6 shadow-xl border border-gray-200 dark:border-gray-700"
      initial={{ scale: 0.95, rotate: -2 }}
      whileHover={{ scale: 1, rotate: 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
    >
      <div className="absolute -top-3 -left-3">
        <Lightbulb className="w-6 h-6 text-yellow-500" />
      </div>
      
      <motion.div className="space-y-4">
        <div className="space-y-2">
          <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <Target className="w-5 h-5 text-red-500" />
            Problem
          </h3>
          <p className="text-gray-700 dark:text-gray-300 font-mono text-sm">
            {project.problem}
          </p>
        </div>
        
        <motion.div 
          className="space-y-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <Trophy className="w-5 h-5 text-green-500" />
            Solution
          </h3>
          <p className="text-gray-700 dark:text-gray-300 font-mono text-sm">
            {project.solution}
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );

  const CodeSnippetCard = ({ snippet, index }: { snippet: ProjectData['codeSnippets'][0], index: number }) => (
    <motion.div 
      className="relative bg-gray-100 dark:bg-gray-900 rounded-lg p-4 font-mono text-sm"
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: index * 0.2 }}
      onHoverStart={() => setSelectedSnippet(index)}
      onHoverEnd={() => setSelectedSnippet(null)}
    >
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-indigo-600 dark:text-indigo-400">{snippet.title}</h4>
        <div className="flex gap-2">
          <button 
            onClick={() => setShowAnnotation(showAnnotation === index ? null : index)}
            className="p-1 hover:bg-gray-200 dark:hover:bg-gray-800 rounded"
          >
            <MessageCircle className="w-4 h-4" />
          </button>
          <button className="p-1 hover:bg-gray-200 dark:hover:bg-gray-800 rounded">
            <CheckCircle2 className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      <pre className="overflow-x-auto">
        <code className="text-gray-800 dark:text-gray-200">
          {snippet.code.split('\n').map((line, i) => (
            <div 
              key={i}
              className={`relative ${
                snippet.annotations.some(a => a.line === i + 1) ? 'bg-yellow-100/10' : ''
              }`}
            >
              {showAnnotation === index && 
                snippet.annotations.some(a => a.line === i + 1) && (
                <motion.div 
                  className="absolute right-full mr-2 text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  {snippet.annotations.find(a => a.line === i + 1)?.note}
                </motion.div>
              )}
              {line}
            </div>
          ))}
        </code>
      </pre>
    </motion.div>
  );

  return (
    <div ref={containerRef} className="min-h-screen">
      <motion.div 
        className="max-w-4xl mx-auto px-4 py-16 space-y-12"
        variants={phaseTransition}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <header className="text-center space-y-4">
          <motion.h2 
            className="text-4xl font-bold handwritten bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            {project.title}
          </motion.h2>
          <motion.p 
            className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {project.description}
          </motion.p>
        </header>

        <AnimatePresence mode="wait">
          {phase === 'concept' && (
            <motion.section 
              key="concept"
              className="space-y-8"
              {...phaseTransition}
            >
              <ProblemSolutionCard />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {project.sketches.map((sketch, index) => (
                  <motion.div
                    key={index}
                    className="relative aspect-video rounded-lg overflow-hidden"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.2 }}
                  >
                    <img 
                      src={sketch.initial} 
                      alt="Initial concept"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <motion.img 
                      src={sketch.final}
                      alt="Final implementation"
                      className="absolute inset-0 w-full h-full object-cover"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}

          {phase === 'development' && (
            <motion.section 
              key="development"
              className="space-y-8"
              {...phaseTransition}
            >
              <div className="grid gap-6">
                {project.codeSnippets.map((snippet, index) => (
                  <CodeSnippetCard key={index} snippet={snippet} index={index} />
                ))}
              </div>
            </motion.section>
          )}

          {phase === 'outcome' && (
            <motion.section 
              key="outcome"
              className="space-y-8"
              {...phaseTransition}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {project.impact.map((metric, index) => (
                  <motion.div
                    key={index}
                    className="bg-white/90 dark:bg-gray-800/90 rounded-lg p-6 shadow-xl"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2 }}
                  >
                    <h3 className="text-lg font-bold mb-2">{metric.metric}</h3>
                    <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                      {metric.value}
                    </div>
                    <p className="text-green-600 dark:text-green-400 text-sm mt-2">
                      {metric.improvement}
                    </p>
                  </motion.div>
                ))}
              </div>

              <motion.div 
                className="bg-gray-100 dark:bg-gray-900 rounded-lg p-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <h3 className="text-xl font-bold mb-4">My Contribution</h3>
                <ul className="space-y-2">
                  {project.contribution.map((item, index) => (
                    <motion.li
                      key={index}
                      className="flex items-start gap-2 text-gray-700 dark:text-gray-300"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                    >
                      <ArrowRight className="w-5 h-5 text-indigo-500 mt-1 flex-shrink-0" />
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </motion.section>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default ProjectFolio;