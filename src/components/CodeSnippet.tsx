import React, { useState } from 'react';
import { motion } from 'framer-motion';
import useSound from 'use-sound';

interface CodeSnippetProps {
  code: string;
  language: string;
  effect: () => void;
}

const CodeSnippet: React.FC<CodeSnippetProps> = ({ code, language, effect }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [playHover] = useSound('/hover.mp3', { volume: 0.5 });
  const [playClick] = useSound('/click.mp3', { volume: 0.5 });

  const handleClick = () => {
    playClick();
    effect();
  };

  return (
    <motion.div
      className="relative font-mono text-sm p-4 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
      whileHover={{ scale: 1.02 }}
      onHoverStart={() => {
        setIsHovered(true);
        playHover();
      }}
      onHoverEnd={() => setIsHovered(false)}
      onClick={handleClick}
    >
      <div className="absolute top-2 right-2 text-xs text-gray-500">
        {language}
      </div>
      <pre className="overflow-x-auto">
        <code className="text-gray-800 dark:text-gray-200">{code}</code>
      </pre>
      {isHovered && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 bg-indigo-500/10 rounded-lg"
        />
      )}
    </motion.div>
  );
};

export default CodeSnippet;