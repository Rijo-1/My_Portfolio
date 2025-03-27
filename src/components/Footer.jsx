
import React from 'react';
import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="py-8 bg-[var(--card-bg)] border-t border-[var(--border)]">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <div className="flex items-center">
              <a href="#" className="text-2xl font-bold text-[var(--text-primary)]">
                Rijo<span className="text-[var(--brand-accent)]">Simon</span>
              </a>
            </div>
            <p className="text-[var(--text-secondary)] mt-2">
              Frontend Developer & Designer
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end">
            <div className="flex space-x-4 mb-4 justify-end w-full">
              <a 
                href="https://github.com/Rijo-1" 
                target="_blank" 
                rel="noopener noreferrer"
                
                aria-label="GitHub"
              >
                <Github size={20} className='text-[var(--brand-accent)]' />
              </a>
              <a 
                href="https://www.linkedin.com/in/rijo-simon-927559278" 
                target="_blank" 
                rel="noopener noreferrer"
                
                aria-label="LinkedIn"
              >
                <Linkedin size={20} className='text-[var(--brand-accent)]' />
              </a>
              <a 
                href="mailto:rijosimon44@gmail.com" 
               
                aria-label="Email"
              >
                <Mail size={20} className='text-[var(--brand-accent)]' />
              </a>
            </div>
            
            <button 
              onClick={scrollToTop}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--brand-accent)] text-[var(--page-background)] transition-all duration-300 hover:shadow-lg"
              aria-label="Scroll to top"
            >
              <ArrowUp size={16} />
              <span>Back to top</span>
            </button>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-[var(--border)] text-center">
          <p className="text-[var(--text-secondary)] text-sm">
            &copy; {new Date().getFullYear()} Rijo Simon TM. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
