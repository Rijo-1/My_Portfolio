
import React, { useEffect, useRef, useState } from 'react';

const AnimatedSection = ({ 
  children, 
  className, 
  animation = 'fade-in', 
  threshold = 0.1,
  delay = 0
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: threshold,
      }
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold]);

  // Expanded animation classes
  const getAnimationClass = () => {
    switch(animation) {
      case 'fade-in':
        return 'animate-fade-in';
      case 'scale-in':
        return 'animate-scale-in';
      case 'slide-in-left':
        return 'animate-slide-in-left';
      case 'slide-in-right':
        return 'animate-slide-in-right';
      case 'bounce-in':
        return 'animate-bounce-in';
      case 'rotate-in':
        return 'animate-rotate-in';
      case 'float':
        return 'animate-float';
      default:
        return 'animate-fade-in';
    }
  };

  return (
    <div 
      ref={sectionRef} 
      className={`${className} ${isVisible ? getAnimationClass() : 'opacity-0'}`}
      style={{ 
        animationPlayState: isVisible ? 'running' : 'paused',
        animationDelay: `${delay}s`,
        animationFillMode: 'both'
      }}
    >
      {children}
    </div>
  );
};

export default AnimatedSection;
