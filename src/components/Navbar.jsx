
import React, { useState, useEffect } from 'react';
import ThemeToggle from './ThemeToggle';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'py-3 bg-[var(--page-background)] shadow-lg backdrop-blur-lg bg-opacity-80' : 'py-4 bg-transparent'}`}>
      <div className="container-custom flex items-center justify-between">
        <a href="#" className="text-2xl font-bold text-[var(--text-primary)]">
          Rijo<span className="text-[var(--brand-accent)]">Simon</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#about" className="nav-link">About</a>
          <a href="#tech" className="nav-link">Tech Stack</a>
          <a href="#projects" className="nav-link">Projects</a>
          <a href="#contact" className="nav-link">Contact</a>
          <ThemeToggle />
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2 text-[var(--text-primary)]" 
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div className={`md:hidden absolute top-full left-0 right-0 bg-[var(--page-background)] backdrop-blur-lg bg-opacity-90 shadow-xl transition-all duration-300 overflow-hidden ${isMobileMenuOpen ? 'max-h-[300px] border-b border-[var(--border)]' : 'max-h-0'}`}>
        <nav className="flex flex-col py-4 px-6 space-y-4">
          <a href="#about" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>About</a>
          <a href="#tech" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Tech Stack</a>
          <a href="#projects" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Projects</a>
          <a href="#contact" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Contact</a>
          <div className="flex items-center justify-between pt-2 border-t border-[var(--border)]">
            <span className="text-sm text-[var(--text-secondary)]">Switch Theme</span>
            <ThemeToggle />
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
