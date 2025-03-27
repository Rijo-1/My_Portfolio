
import React from 'react';
import AnimatedSection from './AnimatedSection';
import { Briefcase, GraduationCap, Award, Code, Heart, Coffee, Book, Rocket, Star, Compass, Users, Paintbrush } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="py-28 relative overflow-hidden">
      <div className="absolute top-0 right-0 left-0 bottom-0 bg-[var(--page-background)]">
        <div className="absolute bottom-0 right-0 opacity-10 w-3/4 h-3/4 rounded-full bg-[var(--brand-accent)] blur-[100px] transform translate-x-1/4 translate-y-1/4"></div>
      </div>
      
      <div className="container-custom relative z-10">
        <AnimatedSection>
          <h2 className="section-title text-center">About <span className="text-[var(--brand-accent)]">Me</span></h2>
          <p className="text-center text-[var(--text-secondary)] max-w-2xl mx-auto mb-16">
            I'm a passionate frontend developer and designer with a focus on creating elegant, user-friendly interfaces.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <AnimatedSection animation="slide-in-left" className="flex justify-center">
            <div className="relative w-full max-w-md aspect-square">
              <div className="absolute inset-0 glass-card"></div>
              <div className="absolute -top-6 -left-6 w-3/4 h-3/4 glass-card overflow-hidden">
                <div className="w-full h-full flex items-center justify-center p-4">
                  <div className="text-center">
                    <div className="flex justify-center mb-2">
                      <Heart className="h-6 w-6 text-[var(--brand-accent)]" />
                    </div>
                    <p className="text-xl font-semibold mb-2 text-[var(--text-primary)]">Passionate About</p>
                    <p className="text-[var(--text-secondary)]">Frontend Development, Design Systems, User Experience</p>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-2/3 h-2/3 glass-card overflow-hidden">
                <div className="w-full h-full flex items-center justify-center p-4">
                  <div className="text-center">
                    <div className="flex justify-center mb-2">
                      <Book className="h-6 w-6 text-[var(--brand-accent)]" />
                    </div>
                    <p className="text-xl font-semibold mb-2 text-[var(--text-primary)]">Currently</p>
                    <p className="text-[var(--text-secondary)]">Bachelor of Technology, Computer Science Engineering</p>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="slide-in-right">
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 mb-2">
                  <Compass className="h-6 w-6 text-[var(--brand-accent)]" />
                  <h3 className="text-2xl font-bold text-[var(--text-primary)]">My Story</h3>
                </div>
                <p className="text-[var(--text-secondary)]">
                  I'm Rijo Simon TM, a frontend developer and designer with a passion for creating intuitive and visually stunning web experiences. I believe that great design is about solving problems and creating intuitive, enjoyable interfaces that work for people.
                </p>
              </div>
              
              <div className="space-y-6 pt-4">
                <div className="flex items-start gap-4">
                  <div>
                    <GraduationCap className="h-6 w-6 text-[var(--brand-accent)]" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-[var(--text-primary)]">Education</h4>
                    <p className="text-[var(--text-secondary)]">REVA University, Bengaluru - B.Tech in Computer Science Engineering (Expected Oct 2026)</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div>
                    <Briefcase className="h-6 w-6 text-[var(--brand-accent)]" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-[var(--text-primary)]">Professional Focus</h4>
                    <p className="text-[var(--text-secondary)]">Frontend development with React.js, UI/UX design, and creating intuitive user experiences.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div>
                    <Award className="h-6 w-6 text-[var(--brand-accent)]" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-[var(--text-primary)]">Achievement</h4>
                    <p className="text-[var(--text-secondary)]">Won Argonyx'24, a 24-hr hackathon conducted by RV University among 250+ participants.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div >
                    <Code className="h-6 w-6 text-[var(--brand-accent)]" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-[var(--text-primary)]">Hackathon Enthusiast</h4>
                    <p className="text-[var(--text-secondary)]">Active member of Hackathon Club, collaborating with team members to build innovative solutions.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div>
                    <Rocket className="h-6 w-6 text-[var(--brand-accent)]" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-[var(--text-primary)]">Innovation</h4>
                    <p className="text-[var(--text-secondary)]">Constantly experimenting with new technologies and approaches to solve complex problems.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div>
                    <Users className="h-6 w-6 text-[var(--brand-accent)]" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-[var(--text-primary)]">Collaboration</h4>
                    <p className="text-[var(--text-secondary)]">Strong team player who values collaborative problem-solving and knowledge sharing.</p>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default About;
