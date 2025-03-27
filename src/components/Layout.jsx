
import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children, theme = 'light' }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    // Apply the theme class to the body
    document.body.classList.add(`theme-${theme}`);
    
    // Simulate loading progress
    const interval = setInterval(() => {
      setLoadingProgress(prev => {
        const newProgress = prev + Math.random() * 10;
        return newProgress >= 100 ? 100 : newProgress;
      });
    }, 150);
    
    // Simulate loading screen
    const timer = setTimeout(() => {
      clearInterval(interval);
      setLoadingProgress(100);
      setTimeout(() => {
        setIsLoading(false);
      }, 300);
    }, 1500);
    
    return () => {
      clearTimeout(timer);
      clearInterval(interval);
      document.body.classList.remove(`theme-${theme}`);
    };
  }, [theme]);

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-[var(--page-background)]">
        <div className="text-center space-y-4">
          <div className="inline-block relative w-20 h-20">
            <div className="absolute top-0 left-0 w-full h-full border-4 border-[var(--brand-accent)] border-t-transparent rounded-full animate-spin"></div>
            
            {/* Loading text with staggered reveal */}
            <div className="absolute top-full mt-8 left-1/2 -translate-x-1/2 flex space-x-1">
              {['L', 'O', 'A', 'D', 'I', 'N', 'G'].map((letter, index) => (
                <span 
                  key={index} 
                  className="text-[var(--brand-accent)] text-lg font-medium animate-bounce"
                  style={{ animationDelay: `${index * 0.1}s`, animationDuration: '1s' }}
                >
                  {letter}
                </span>
              ))}
            </div>
          </div>
          
          <div className="w-64 h-2 bg-[var(--border)] rounded-full overflow-hidden mt-16">
            <div 
              className="h-full bg-[var(--brand-accent)] rounded-full transition-all duration-300"
              style={{ width: `${loadingProgress}%` }}
            ></div>
          </div>
          <p className="text-[var(--text-secondary)] font-medium">{Math.round(loadingProgress)}%</p>
        </div>
        
        {/* Background animated elements */}
        <div className="absolute inset-0 overflow-hidden -z-10">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="absolute bg-[var(--brand-accent)] opacity-10 rounded-full"
              style={{
                width: `${Math.random() * 100 + 50}px`,
                height: `${Math.random() * 100 + 50}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDuration: `${Math.random() * 10 + 10}s`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            ></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Navbar />
      <main className="flex-grow animate-fade-in">{children}</main>
      <Footer />
      
      {/* Mouse follower effect */}
      <div id="cursor-follower" className="fixed w-8 h-8 rounded-full pointer-events-none z-50 opacity-0 mix-blend-difference bg-white transform -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300"></div>
      
      <script dangerouslySetInnerHTML={{
        __html: `
          document.addEventListener('mousemove', (e) => {
            const follower = document.getElementById('cursor-follower');
            if (follower) {
              follower.style.opacity = '0.5';
              follower.style.left = e.clientX + 'px';
              follower.style.top = e.clientY + 'px';
            }
          });
          
          document.addEventListener('mouseleave', () => {
            const follower = document.getElementById('cursor-follower');
            if (follower) {
              follower.style.opacity = '0';
            }
          });
          
          document.querySelectorAll('a, button').forEach(element => {
            element.addEventListener('mouseenter', () => {
              const follower = document.getElementById('cursor-follower');
              if (follower) {
                follower.style.transform = 'translate(-50%, -50%) scale(2.5)';
                follower.style.mixBlendMode = 'normal';
                follower.style.backgroundColor = 'var(--brand-accent)';
                follower.style.opacity = '0.2';
              }
            });
            
            element.addEventListener('mouseleave', () => {
              const follower = document.getElementById('cursor-follower');
              if (follower) {
                follower.style.transform = 'translate(-50%, -50%) scale(1)';
                follower.style.mixBlendMode = 'difference';
                follower.style.backgroundColor = 'white';
                follower.style.opacity = '0.5';
              }
            });
          });
        `
      }} />
    </div>
  );
};

export default Layout;
