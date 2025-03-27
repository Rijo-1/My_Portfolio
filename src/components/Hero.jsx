
import React, { useEffect, useRef } from 'react';
import AnimatedSection from './AnimatedSection';

const Hero = () => {
  const titleRef = useRef(null);

  useEffect(() => {
    if (titleRef.current) {
      const titleElement = titleRef.current;
      const titleText = titleElement.textContent;
      
      // Clear the current content
      titleElement.textContent = '';
      
      // Wrap each letter in a span for the animation
      titleText.split('').forEach((char, index) => {
        const span = document.createElement('span');
        span.textContent = char === ' ' ? ' ' : char;
        span.style.animationDelay = `${0.1 + index * 0.05}s`;
        titleElement.appendChild(span);
      });
    }
  }, []);

  const handleMouseMove = (e) => {
    if (!titleRef.current) return;
    
    const { clientX, clientY } = e;
    const { left, top, width, height } = titleRef.current.getBoundingClientRect();
    
    const x = (clientX - left) / width - 0.5;
    const y = (clientY - top) / height - 0.5;
    
    titleRef.current.style.transform = `perspective(1000px) rotateY(${x * 5}deg) rotateX(${-y * 5}deg)`;
  };
  
  const handleMouseLeave = () => {
    if (titleRef.current) {
      titleRef.current.style.transform = 'perspective(1000px) rotateY(0) rotateX(0)';
    }
  };

  const handleScrollDown = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center pt-24 overflow-hidden">
      <div className="absolute top-0 right-0 left-0 bottom-0 bg-[var(--page-background)]">
        <div className="absolute top-0 right-0 opacity-10 w-3/4 h-3/4 rounded-full bg-[var(--brand-accent)] blur-[120px] transform translate-x-1/4 -translate-y-1/4 animate-float"></div>
        <div className="absolute bottom-0 left-0 opacity-10 w-3/4 h-3/4 rounded-full bg-[var(--brand-accent)] blur-[120px] transform -translate-x-1/4 translate-y-1/4 animate-float" style={{ animationDelay: '1.5s' }}></div>
      </div>
      
      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <AnimatedSection className="flex flex-col justify-center" animation="slide-in-left">
            <div className="space-y-4">
              <p className="text-[var(--brand-accent)] font-medium overflow-hidden animate-typing whitespace-nowrap border-r-2 border-[var(--brand-accent)] pr-1">Frontend Developer & Designer</p>
              <h1 
                ref={titleRef} 
                className="text-reveal text-5xl md:text-6xl lg:text-7xl font-bold text-[var(--text-primary)] transition-transform duration-300"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                Rijo Simon TM
              </h1>
              <p className="text-xl text-[var(--text-secondary)] max-w-lg mt-4 animate-fade-in" style={{ animationDelay: '0.7s' }}>
                Creating user-centric, innovative web experiences with modern technology and thoughtful design.
              </p>
              <div className="pt-6 flex flex-wrap gap-4">
                <a href="#projects" className="btn-primary btn-pulse relative overflow-hidden group">
                  <span className="relative z-10">View Projects</span>
                  <span className="absolute inset-0 bg-[var(--brand-accent)] opacity-20 group-hover:animate-pulse rounded-full"></span>
                </a>
                <a href="#contact" className="px-6 py-3 border border-[var(--brand-accent)] text-[var(--text-primary)] rounded-full font-medium transition-all duration-300 hover:bg-[var(--brand-accent)] hover:text-[var(--text-primary)] hover:shadow-lg hover:translate-y-[-2px] animate-shake">
                  Contact Me
                </a>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="bounce-in" className="flex justify-center items-center" delay={0.3}>
            <div className="relative aspect-square w-full max-w-md">
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--brand-accent)] to-transparent opacity-20 rounded-full animate-spin-slow"></div>
              <div className="absolute inset-8 bg-[var(--page-background)] rounded-full"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="rounded-full overflow-hidden w-4/5 h-4/5 bg-[var(--card-bg)] border-4 border-[var(--brand-accent)] shadow-2xl transition-transform duration-300 hover:scale-105">
                  {/* Hero image would go here */}
                  <div className="w-full h-full flex items-center justify-center text-6xl font-bold text-[var(--brand-accent)] relative hover-card-3d">
                    <div className="absolute inset-0 bg-shimmer opacity-50"></div>
                    <span className="relative z-10">RS</span>
                  </div>
                </div>
              </div>
              
              {/* Orbiting elements */}
              <div className="absolute w-12 h-12 bg-[var(--brand-accent)] opacity-80 rounded-full top-0 left-1/2 transform -translate-x-1/2 flex items-center justify-center text-white font-bold text-xs animate-float" style={{ animationDelay: '0s' }}>
                React
              </div>
              <div className="absolute w-10 h-10 bg-[var(--brand-accent)] opacity-80 rounded-full bottom-10 left-0 flex items-center justify-center text-white font-bold text-xs animate-float" style={{ animationDelay: '1s' }}>
                JS
              </div>
              <div className="absolute w-10 h-10 bg-[var(--brand-accent)] opacity-80 rounded-full bottom-10 right-0 flex items-center justify-center text-white font-bold text-xs animate-float" style={{ animationDelay: '2s' }}>
                UI/UX
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
      
      {/* Moved scroll down button to an absolute position at the bottom center of the screen */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce hidden md:block">
        <button 
          onClick={handleScrollDown}
          className="flex flex-col items-center cursor-pointer focus:outline-none"
          aria-label="Scroll down"
        >
          <div className="w-6 h-10 rounded-full border-2 border-[var(--brand-accent)] flex justify-center">
            <div className="w-1 h-2 bg-[var(--brand-accent)] rounded-full mt-1 animate-pulse"></div>
          </div>
          <p className="text-xs text-[var(--text-secondary)] mt-2 text-center">Scroll Down</p>
        </button>
      </div>
    </section>
  );
};

export default Hero;
