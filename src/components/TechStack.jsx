
import React, { useState, useEffect, useRef } from 'react';
import AnimatedSection from './AnimatedSection';

// Define tech stack data
const techData = [
  { id: 1, name: 'React', level: 75, category: 'frontend' },
  { id: 2, name: 'JavaScript', level: 75, category: 'frontend' },
  { id: 3, name: 'HTML/CSS', level: 85, category: 'frontend' },
  { id: 4, name: 'Figma', level: 80, category: 'design' },
  { id: 5, name: 'Unity', level: 50, category: 'game' },
  { id: 6, name: 'Python', level: 70, category: 'backend' },
  
  { id: 8, name: 'Java', level: 60, category: 'backend' },
  { id: 9, name: 'C', level: 50, category: 'backend' },
  { id: 10, name: 'NextJS', level: 70, category: 'frontend' },
  { id: 11, name: 'UI/UX', level: 85, category: 'design' },
  { id: 12, name: 'Machine Learning', level: 55, category: 'backend' },
];

// TechBubble component
const TechBubble = ({ tech, onClick, isActive }) => {
  const size = 40 + (tech.level / 100) * 60; // Size based on proficiency level
  const randomPosition = useRef({
    x: Math.random() * 80 + 10, // 10-90%
    y: Math.random() * 80 + 10, // 10-90%
  });

  // Get color based on category
  const getColor = (category) => {
    switch (category) {
      case 'frontend':
        return 'bg-blue-500';
      case 'backend':
        return 'bg-green-500';
      case 'design':
        return 'bg-purple-500';
      case 'game':
        return 'bg-orange-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div 
      className={`tech-bubble absolute rounded-full shadow-lg flex items-center justify-center cursor-pointer transition-all duration-700 ${isActive ? 'ring-4 ring-[var(--brand-accent)] z-10' : ''} ${getColor(tech.category)}`}
      style={{ 
        width: `${size}px`, 
        height: `${size}px`,
        left: `${randomPosition.current.x}%`,
        top: `${randomPosition.current.y}%`,
        transform: isActive ? 'scale(1.2)' : 'scale(1)',
        opacity: isActive ? 1 : 0.8,
      }}
      onClick={() => onClick(tech)}
    >
      <span className="text-white font-medium text-xs md:text-sm">{tech.name}</span>
    </div>
  );
};

const TechStack = () => {
  const [activeTech, setActiveTech] = useState(null);
  const containerRef = useRef(null);
  const animationFrameRef = useRef(null);
  const bubblePositions = useRef(new Map());
  
  const handleTechClick = (tech) => {
    setActiveTech(tech);
  };

  useEffect(() => {
    // Initialize positions of bubbles
    const bubbles = document.querySelectorAll('.tech-bubble');
    bubbles.forEach((bubble, index) => {
      const id = Number(bubble.getAttribute('data-id') || index);
      bubblePositions.current.set(id, {
        x: parseFloat(bubble.style.left),
        y: parseFloat(bubble.style.top),
        velocityX: (Math.random() - 0.5) * 0.05,
        velocityY: (Math.random() - 0.5) * 0.05
      });
    });
    
    const animateBubbles = () => {
      const bubbles = document.querySelectorAll('.tech-bubble');
      
      bubbles.forEach((bubble, index) => {
        const id = Number(bubble.getAttribute('data-id') || index);
        const position = bubblePositions.current.get(id);
        
        if (position) {
          // Update position with velocity
          position.x += position.velocityX;
          position.y += position.velocityY;
          
          // Bounce off edges
          if (position.x <= 5 || position.x >= 95) {
            position.velocityX *= -1;
            position.x = Math.max(5, Math.min(95, position.x));
          }
          if (position.y <= 5 || position.y >= 95) {
            position.velocityY *= -1;
            position.y = Math.max(5, Math.min(95, position.y));
          }
          
          // Apply smooth movement with CSS transition
          bubble.style.left = `${position.x}%`;
          bubble.style.top = `${position.y}%`;
          
          // Store updated position
          bubblePositions.current.set(id, position);
        }
      });
      
      animationFrameRef.current = requestAnimationFrame(animateBubbles);
    };
    
    animationFrameRef.current = requestAnimationFrame(animateBubbles);
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <section id="tech" className="py-32 relative overflow-hidden">
      <div className="absolute top-0 right-0 left-0 bottom-0 bg-[var(--page-background)]">
        <div className="absolute top-0 left-0 opacity-10 w-3/4 h-3/4 rounded-full bg-[var(--brand-accent)] blur-[100px] transform -translate-x-1/4 -translate-y-1/4"></div>
      </div>
      
      <div className="container-custom relative z-10">
        <AnimatedSection>
          <h2 className="section-title text-center">Tech <span className="text-[var(--brand-accent)]">Stack</span></h2>
          <p className="text-center text-[var(--text-secondary)] max-w-2xl mx-auto mb-16">
            Interactive visualization of the technologies I work with. Click on any bubble to see more details.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          <AnimatedSection animation="fade-in" className="lg:col-span-2">
            <div ref={containerRef} className="relative h-[400px] md:h-[500px] bg-[var(--card-bg)] rounded-2xl shadow-xl overflow-hidden border border-[var(--border)]">
              {techData.map((tech) => (
                <TechBubble 
                  key={tech.id} 
                  tech={tech} 
                  onClick={handleTechClick}
                  isActive={activeTech && activeTech.id === tech.id}
                  data-id={tech.id}
                />
              ))}
            </div>
          </AnimatedSection>
          
          <AnimatedSection animation="slide-in-right">
            <div className="glass-card p-8 h-full">
              <h3 className="text-2xl font-bold mb-4 text-[var(--text-primary)]">My Expertise</h3>
              {activeTech ? (
                <div className="space-y-6">
                  <div>
                    <h4 className="text-xl font-semibold text-[var(--brand-accent)]">{activeTech.name}</h4>
                    <p className="text-[var(--text-secondary)] mb-2">
                      Proficiency Level: {activeTech.level}%
                    </p>
                    <div className="w-full bg-[var(--border)] rounded-full h-2.5">
                      <div 
                        className="bg-[var(--brand-accent)] h-2.5 rounded-full transition-all duration-500" 
                        style={{ width: `${activeTech.level}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div>
                    <h5 className="font-medium text-[var(--text-primary)] mb-2">About this skill:</h5>
                    <p className="text-[var(--text-secondary)]">
                      {getTechDescription(activeTech.name)}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col justify-center h-[calc(100%-2rem)]">
                  <p className="text-[var(--text-secondary)] text-center">
                    Click on any technology bubble to see details about my expertise with that technology.
                  </p>
                </div>
              )}
            </div>
          </AnimatedSection>
        </div>
        
        <AnimatedSection className="mt-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            <div className="glass-card p-6">
              <h4 className="text-xl font-semibold mb-3 text-[var(--text-primary)]">Languages</h4>
              <p className="text-[var(--text-secondary)]">Fluent in English, Tamil, Hindi with conversational proficiency in Malayalam, Kannada.</p>
            </div>
            
            <div className="glass-card p-6">
              <h4 className="text-xl font-semibold mb-3 text-[var(--text-primary)]">Frontend</h4>
              <p className="text-[var(--text-secondary)]">Expertise in React.js, JavaScript, HTML/CSS, UI/UX Design using Figma.</p>
            </div>
            
            <div className="glass-card p-6">
              <h4 className="text-xl font-semibold mb-3 text-[var(--text-primary)]">Backend</h4>
              <p className="text-[var(--text-secondary)]">Experience with Python and basics of NodeJs and ExpressJS for various backend applications and algorithms.</p>
            </div>
            
            <div className="glass-card p-6">
              <h4 className="text-xl font-semibold mb-3 text-[var(--text-primary)]">Game Development</h4>
              <p className="text-[var(--text-secondary)]">Game Development Certificate in Unity, using C# for creating interactive experiences.</p>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

// Helper function to get tech descriptions
function getTechDescription(techName) {
  const descriptions = {
    'React': 'My primary framework for building interactive user interfaces with a component-based architecture.',
    'JavaScript': 'Extensively used for creating dynamic web applications with interactive features.',
    'HTML/CSS': 'Strong foundation in semantic HTML and advanced CSS techniques for modern layouts.',
    'Figma': 'My go-to tool for UI/UX design, wireframing, and creating design systems.',
    'Unity': 'Experience in game development and interactive 3D/2D experiences using the Unity engine.',
    'Python': 'Used for backend development, data analysis, and machine learning applications.',
    'C#': 'Primarily used with Unity for game development and creating interactive applications.',
    'Java': 'Have good knowledge in Java Fundamendals.',
    'C': 'Fundamental programming knowledge with experience in system-level programming.',
    'NextJS': 'Building server-rendered React applications with improved performance and SEO.',
    'UI/UX': 'Creating user-centered designs with focus on usability, accessibility and aesthetic appeal.',
    'Machine Learning': 'Applied ML models for image recognition and data analysis in projects.'
  };
  
  return descriptions[techName] || 'A technology I work with to create innovative solutions.';
}

export default TechStack;
