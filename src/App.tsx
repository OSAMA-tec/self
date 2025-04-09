import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion } from 'framer-motion';
import { OrbitControls, Stars } from '@react-three/drei';
import Hero from './components/Hero';
import Background from './components/Background';
import InkBackground from './components/InkBackground';
import CodeSnippet from './components/CodeSnippet';
import ProjectsSection from './components/ProjectsSection';
import ThemeToggle from './components/ThemeToggle';
import { useTheme } from './hooks/useTheme';

function App() {
  const { theme } = useTheme();

  return (
    <div className="relative min-h-screen bg-primary-bg transition-colors duration-200">
      {/* Background Canvas */}
      <div className="fixed inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 2] }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={0.8} />
          <Suspense fallback={null}>
            <Background />
            <InkBackground />
            <Stars
              radius={300}
              depth={50}
              count={7000}
              factor={4}
              saturation={0.5}
              fade
              speed={1.5}
            />
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              enableRotate={true}
              autoRotate
              autoRotateSpeed={0.5}
              maxPolarAngle={Math.PI / 2}
              minPolarAngle={Math.PI / 2}
            />
          </Suspense>
        </Canvas>
      </div>

      {/* Theme Toggle */}
      <ThemeToggle />

      {/* Easter Egg Code Snippet */}
      <div className="fixed bottom-4 right-4 z-20">
        <CodeSnippet
          code={`const theme = "${theme}";
function toggleTheme() {
  // Try me! 🎨
  return theme === "light" ? "dark" : "light";
}`}
          language="JavaScript"
          effect={() => {}}
        />
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative z-10"
      >
        <Hero />
        <ProjectsSection />
      </motion.div>
    </div>
  );
}

export default App;