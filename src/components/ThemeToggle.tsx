import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      className="fixed top-4 right-4 z-50 p-2 rounded-full bg-white/90 dark:bg-gray-800/90 shadow-lg border border-gray-200 dark:border-gray-700"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={false}
    >
      <motion.div
        initial={false}
        animate={{ rotate: theme === 'dark' ? 180 : 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 10 }}
      >
        {theme === 'light' ? (
          <Sun className="w-5 h-5 text-yellow-500" />
        ) : (
          <Moon className="w-5 h-5 text-indigo-400" />
        )}
      </motion.div>
    </motion.button>
  );
};

export default ThemeToggle;