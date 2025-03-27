
import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import Hero from '../components/Hero';
import About from '../components/About';
import TechStack from '../components/TechStack';
import Projects from '../components/Projects';
import Contact from '../components/Contact';
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [activeTheme, setActiveTheme] = useState('light'); // 'light' or 'dark'
  const [isChangingTheme, setIsChangingTheme] = useState(false);
  const { toast } = useToast();

  const toggleTheme = () => {
    setIsChangingTheme(true);
    setTimeout(() => {
      setActiveTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
    }, 300);
  };

  useEffect(() => {
    if (isChangingTheme) {
      setTimeout(() => {
        setIsChangingTheme(false);
        toast({
          title: `${activeTheme === 'light' ? 'Light' : 'Dark'} Theme Activated`,
          description: `You've switched to ${activeTheme === 'light' ? 'light' : 'dark'} mode.`,
          duration: 3000,
        });
      }, 600);
    }
  }, [activeTheme, isChangingTheme, toast]);

  return (
    <>
      {isChangingTheme && (
        <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
          <div className="text-white text-xl">
            Switching to {activeTheme === 'light' ? 'dark' : 'light'} theme...
          </div>
        </div>
      )}
      
      <Layout theme={activeTheme}>
        <div className="fixed bottom-6 right-6 z-40">
          <button
            onClick={toggleTheme}
            className="p-3 rounded-full bg-[var(--card-bg)] border border-[var(--border)] shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-110"
            aria-label={`Switch to ${activeTheme === 'light' ? 'dark' : 'light'} theme`}
          >
            {activeTheme === 'light' ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[var(--text-primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[var(--text-primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            )}
          </button>
        </div>
        
        <Hero />
        <About />
        <TechStack />
        <Projects />
        <Contact />
      </Layout>
    </>
  );
};

export default Index;
