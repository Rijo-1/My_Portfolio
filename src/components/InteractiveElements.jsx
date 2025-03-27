
import React from 'react';
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

// Interactive Button with Ripple Effect
export const AnimatedButton = ({ children, className, onClick, ...props }) => {
  const handleRipple = (e) => {
    const button = e.currentTarget;
    const ripple = document.createElement("span");
    const rect = button.getBoundingClientRect();
    
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.className = "absolute rounded-full bg-white bg-opacity-30 pointer-events-none animate-ripple";
    
    button.appendChild(ripple);
    
    setTimeout(() => {
      button.removeChild(ripple);
    }, 600);
    
    if (onClick) onClick(e);
  };
  
  return (
    <button 
      className={`relative overflow-hidden ${className}`} 
      onClick={handleRipple}
      {...props}
    >
      {children}
    </button>
  );
};

// Animated tooltip with custom hover card
export const AnimatedTooltip = ({ children, content }) => {
  return (
    <HoverCard>
      <HoverCardTrigger asChild className="cursor-pointer">
        {children}
      </HoverCardTrigger>
      <HoverCardContent className="animate-scale-in p-4 bg-[var(--card-bg)] border border-[var(--border)] shadow-xl">
        {content}
      </HoverCardContent>
    </HoverCard>
  );
};

// Text with typing effect
export const TypewriterText = ({ text, className, speed = 50 }) => {
  const [displayText, setDisplayText] = React.useState('');
  const [currentIndex, setCurrentIndex] = React.useState(0);
  
  React.useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);
      
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, speed]);
  
  return (
    <span className={`${className}`}>
      {displayText}
      <span className="animate-pulse">|</span>
    </span>
  );
};

// Parallax container that moves elements based on mouse position
export const ParallaxContainer = ({ children, depth = 30, className }) => {
  const [position, setPosition] = React.useState({ x: 0, y: 0 });
  const ref = React.useRef(null);
  
  const handleMouseMove = (e) => {
    if (!ref.current) return;
    
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    
    setPosition({ x, y });
  };
  
  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };
  
  return (
    <div 
      ref={ref}
      className={`relative ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {React.Children.map(children, (child, index) => {
        if (!React.isValidElement(child)) return child;
        
        const childDepth = child.props.depth || (index + 1) * (depth / React.Children.count(children));
        
        return React.cloneElement(child, {
          style: {
            ...child.props.style,
            transform: `translate(${position.x * childDepth}px, ${position.y * childDepth}px)`,
            transition: 'transform 0.1s ease-out',
          }
        });
      })}
    </div>
  );
};

// Animated counter that counts up to a target number
export const AnimatedCounter = ({ end, duration = 2000, className }) => {
  const [count, setCount] = React.useState(0);
  const countRef = React.useRef(null);
  
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let startTime;
          let animationFrame;
          
          const updateCount = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            setCount(Math.floor(progress * end));
            
            if (progress < 1) {
              animationFrame = requestAnimationFrame(updateCount);
            }
          };
          
          animationFrame = requestAnimationFrame(updateCount);
          
          return () => cancelAnimationFrame(animationFrame);
        }
      },
      { threshold: 0.1 }
    );
    
    if (countRef.current) {
      observer.observe(countRef.current);
    }
    
    return () => {
      if (countRef.current) {
        observer.unobserve(countRef.current);
      }
    };
  }, [end, duration]);
  
  return (
    <span ref={countRef} className={className}>
      {count}
    </span>
  );
};

// Animated div that changes color on hover
export const GlowingBorder = ({ children, className }) => {
  return (
    <div className={`relative group ${className}`}>
      <div className="absolute -inset-0.5 bg-gradient-to-r from-[var(--brand-accent)] to-[var(--secondary)] opacity-30 group-hover:opacity-100 rounded-lg blur transition duration-1000 group-hover:duration-200"></div>
      <div className="relative bg-[var(--card-bg)] rounded-lg p-6">
        {children}
      </div>
    </div>
  );
};

export default {
  AnimatedButton,
  AnimatedTooltip,
  TypewriterText,
  ParallaxContainer,
  AnimatedCounter,
  GlowingBorder
};
