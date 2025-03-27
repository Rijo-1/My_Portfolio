
import React, { useState, useRef, useEffect } from 'react';
import AnimatedSection from './AnimatedSection';
import { ChevronLeft, ChevronRight, ExternalLink, Github } from 'lucide-react';

// Project data
const projects = [
  {
    id: 1,
    title: 'Voyage - Travel Recommendation System',
    description: 'A travel recommendation application designed and executed as part of a 4-person team during a 24-hour hackathon.',
    techStack: ['Next.js', 'Frontend', 'Travel APIs'],
    image: '/assets/project1.png', 
    github: 'https://github.com/Rijo-1/Voyage2.0',
    challenges: 'Designed and executed the frontend for this travel recommendation application, enabling users to get personalized travel plans based on their requirements and location.',
    date: 'Nov 2024'
  },
  {
    id: 2,
    title: 'AI Placement Trainer Chatbot',
    description: 'An LLM-based placement counselor that provides personalized guidance for career preparation.',
    techStack: ['Python', 'LLM Technologies', 'Web Scraping'],
    image: '/assets/project2.png',
    github: 'https://github.com/Rijo-1/AI-Placement-Trainer-Chatbot',
    challenges: 'Leveraged advanced LLM technologies, document processing capabilities, and real-time web search to provide personalized guidance for career preparation.',
    date: 'Dec 2024'
  },
  {
    id: 3,
    title: 'Football Analysis Using Computer Vision',
    description: 'A computer vision-based application to analyze football match videos, track players and the ball, and extract key insights.',
    techStack: ['Python', 'YOLOv8', 'OpenCV', 'K-means Clustering'],
    image: '/assets/project3.jpg',
    github: 'https://github.com/Rijo-1/Football-Analysis-using-Computer-Vision-with-Yolov8-OpenCV',
    challenges: 'Implemented YOLOv8 for object detection and OpenCV for video processing, utilizing techniques like homography transformation for enhanced football analytics.',
    date: 'Sep 2024'
  },
  {
    id: 4,
    title: 'Plant Pulse - Crop Recommendation System',
    description: 'A web application that recommends suitable crops based on soil conditions, suggests optimal fertilizers, and detects crop diseases from images.',
    techStack: ['Python', 'Machine Learning', 'Web Development'],
    image: '/assets/project4.jpg',
    github: 'https://github.com/Rijo-1/PlantPulse',
    challenges: 'Applied machine learning models for disease detection and crop prediction, enhancing agricultural decision-making for farmers.',
    date: 'Nov 2024'
  },
];

const Projects = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [startX, setStartX] = useState(0);
  const sliderRef = useRef(null);
  const [slideWidth, setSlideWidth] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const goToSlide = (index) => {
    if (isAnimating) return;
    
    // For circular navigation
    let newIndex = index;
    if (index >= projects.length) {
      newIndex = 0;
    } else if (index < 0) {
      newIndex = projects.length - 1;
    }
    
    if (newIndex !== activeIndex) {
      setIsAnimating(true);
      setActiveIndex(newIndex);
      
      setTimeout(() => {
        setIsAnimating(false);
      }, 500);
    }
  };

  const nextSlide = () => goToSlide(activeIndex + 1);
  const prevSlide = () => goToSlide(activeIndex - 1);

  // Auto scroll effect
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPaused && !isAnimating) {
        if (activeIndex === projects.length - 1) {
          goToSlide(0);
        } else {
          nextSlide();
        }
      }
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [activeIndex, isPaused, isAnimating]);

  // Add hover handlers to the slider container
  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  // Calculate slide width on mount and window resize
  useEffect(() => {
    const updateSlideWidth = () => {
      if (sliderRef.current) {
        setSlideWidth(sliderRef.current.offsetWidth);
      }
    };

    updateSlideWidth();
    window.addEventListener('resize', updateSlideWidth);
    
    return () => window.removeEventListener('resize', updateSlideWidth);
  }, []);

  // Add these touch handler functions
  const handleTouchStart = (e) => {
    setStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    if (!startX) return;
    
    const currentX = e.touches[0].clientX;
    const diff = startX - currentX;
    
    // Swipe threshold
    if (Math.abs(diff) > 30) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
      setStartX(0);
    }
  };

  const handleTouchEnd = () => {
    setStartX(0);
  };

  return (
    <section id="projects" className="py-32 relative overflow-hidden">
      <div className="absolute top-0 right-0 left-0 bottom-0 bg-[var(--page-background)]">
        <div className="absolute bottom-0 left-0 opacity-10 w-3/4 h-3/4 rounded-full bg-[var(--brand-accent)] blur-[100px] transform -translate-x-1/4 translate-y-1/4"></div>
      </div>
      
      <div className="container-custom relative z-10">
        <AnimatedSection>
          <h2 className="section-title text-center">My <span className="text-[var(--brand-accent)]">Projects</span></h2>
          <p className="text-center text-[var(--text-secondary)] max-w-2xl mx-auto mb-16">
            Explore my latest projects that showcase my technical skills and problem-solving abilities.
          </p>
        </AnimatedSection>

        <div className="relative px-12"> {/* Add padding here */}
          <div 
            ref={sliderRef}
            className="overflow-hidden rounded-2xl"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div 
              className="flex transition-transform duration-500 ease-out h-full"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {projects.map((project) => (
                <div 
                  key={project.id} 
                  className="w-full flex-shrink-0 h-full"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 h-full">
                    <div className="bg-[var(--card-bg)] p-8 flex flex-col">
                      <div className="mb-4">
                        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-[var(--brand-accent)] text-[var(--page-background)] transition-all duration-300 hover:shadow-lg">
                          {project.date}
                        </span>
                      </div>
                      <h3 className="text-2xl md:text-3xl font-bold mb-4 text-[var(--text-primary)]">{project.title}</h3>
                      <p className="text-[var(--text-secondary)] mb-6">{project.description}</p>
                      
                      <div className="mb-6">
                        <h4 className="font-semibold text-[var(--text-primary)] mb-2">Challenges & Solutions:</h4>
                        <p className="text-[var(--text-secondary)]">{project.challenges}</p>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.techStack.map((tech, index) => (
                          <span 
                            key={index}
                            className="px-3 py-1 text-sm rounded-full bg-[var(--brand-accent)] bg-opacity-10 text-[var(--text-primary)]"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      
                      <div className="mt-auto flex gap-4">
                        <a 
                          href={project.github} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--brand-accent)] text-[var(--page-background)] transition-all duration-300 hover:shadow-lg"
                        >
                          <Github size={18} />
                          <span>View Code</span>
                        </a>
                      </div>
                    </div>
                    
                    <div className="relative bg-[var(--page-background)] overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center bg-[var(--brand-accent)] bg-opacity-5">
                        <div className="text-8xl font-bold text-[var(--brand-accent)] opacity-10">
                          {project.id}
                        </div>
                      </div>
                      <div className="relative h-full flex items-center justify-center p-4">
                        <div className="glass-card w-full h-[400px] flex items-center justify-center overflow-hidden rounded-xl">
                          {project.image ? (
                            <div className="relative w-full h-full p-6 flex items-center justify-center">
                              <img 
                                src={project.image} 
                                alt={project.title}
                                className="max-w-full max-h-full w-auto h-auto object-contain rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
                              />
                            </div>
                          ) : (
                            <div className="text-center">
                              <ExternalLink className="w-16 h-16 mx-auto mb-4 text-[var(--brand-accent)]" />
                              <h3 className="text-xl font-bold text-[var(--text-primary)]">Project Preview</h3>
                              <p className="text-[var(--text-secondary)]">Visit GitHub for full project details</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation buttons */}
          <button 
            className={`absolute top-1/2 left-0 transform -translate-y-1/2 p-3 rounded-full bg-[var(--card-bg)] bg-opacity-50 backdrop-blur-sm text-[var(--text-primary)] shadow-lg z-20 transition-all duration-20 hover:bg-[var(--brand-accent)] hover:bg-opacity-100 hover:text-[var(--page-background)] opacity-100 hover:scale-110 active:scale-95 animate-bounce`}
            onClick={prevSlide}
            aria-label="Previous project"
          >
            <ChevronLeft size={24} />
          </button>
          
          <button 
            className={`absolute top-1/2 right-0 transform -translate-y-1/2 p-3 rounded-full bg-[var(--card-bg)] bg-opacity-50 backdrop-blur-sm text-[var(--text-primary)] shadow-lg z-20 transition-all duration-20 hover:bg-[var(--brand-accent)] hover:bg-opacity-100 hover:text-[var(--page-background)] opacity-100 hover:scale-110 active:scale-95 animate-bounce`}
            onClick={nextSlide}
            aria-label="Next project"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Project indicator dots */}
        <div className="flex justify-center space-x-2 mt-8">
          {projects.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${activeIndex === index ? 'bg-[var(--brand-accent)] w-8' : 'bg-[var(--text-secondary)] bg-opacity-30'}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to project ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
