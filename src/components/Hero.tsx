import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, Code2, Github, Linkedin, Server, Database, Cloud, Globe } from 'lucide-react';

const Hero = () => {
  const technologies = [
    { icon: <Code2 className="w-6 h-6" />, name: "Full-Stack Development" },
    { icon: <Server className="w-6 h-6" />, name: "Backend Architecture" },
    { icon: <Database className="w-6 h-6" />, name: "Database Design" },
    { icon: <Globe className="w-6 h-6" />, name: "Web Development" },
  ];

  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen flex items-center justify-center relative"
    >
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-lg shadow-xl p-8 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center mb-6">
            <Terminal className="w-5 h-5 mr-2 text-indigo-500" />
            <div className="flex space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
              <div className="w-3 h-3 rounded-full bg-yellow-500 animate-pulse delay-75" />
              <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse delay-150" />
            </div>
          </div>
          
          <div className="font-mono space-y-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-sm text-gray-500 flex items-center space-x-2"
            >
              <Code2 className="w-4 h-4 text-indigo-500" />
              <span className="animate-cursor-blink">$</span>
              <span className="typing-animation"> cat about_me.txt</span>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="space-y-4"
            >
              <h1 className="text-5xl font-bold handwritten bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
                Hi, I'm Osama 👋
              </h1>
              
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Full-Stack Developer | Web Enthusiast | Problem Solver
              </p>

              <div className="prose dark:prose-invert max-w-none">
                <p className="text-gray-600 dark:text-gray-300">
                  I'm passionate about crafting digital experiences and solving complex problems through elegant code. 
                  My journey in web development has led me to create innovative solutions that make a difference.
                </p>
              </div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6"
              >
                {technologies.map((tech, index) => (
                  <motion.div
                    key={tech.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.5 + index * 0.1 }}
                    className="flex flex-col items-center p-4 rounded-lg bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-700 dark:to-gray-600"
                  >
                    <div className="text-indigo-500 dark:text-indigo-400 mb-2">
                      {tech.icon}
                    </div>
                    <span className="text-sm text-center font-medium text-gray-700 dark:text-gray-300">
                      {tech.name}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="flex space-x-4 pt-6"
            >
              <a
                href="https://github.com/OSAMA-tec"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white transition-all transform hover:scale-105"
              >
                <Github className="w-5 h-5" />
                <span>GitHub</span>
              </a>
              <a
                href="https://www.linkedin.com/in/osamahash"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white transition-all transform hover:scale-105"
              >
                <Linkedin className="w-5 h-5" />
                <span>LinkedIn</span>
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Hero;