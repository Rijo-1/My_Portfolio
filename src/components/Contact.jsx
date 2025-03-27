
import React, { useState } from 'react';
import AnimatedSection from './AnimatedSection';
import { Mail, Phone, Linkedin, MapPin } from 'lucide-react';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    try {
      await emailjs.send(
        'service_2339',
        'template_12dyysp', 
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
        },
        '-q7_tZpx4_ZsMEjf2' // Replace with your EmailJS public key
      );

      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus(''), 5000);
    } catch (error) {
      setStatus('error');
      setTimeout(() => setStatus(''), 5000);
    }
  };

  return (
    <section id="contact" className="py-32 relative overflow-hidden">
      <div className="absolute top-0 right-0 left-0 bottom-0 bg-[var(--page-background)]">
        <div className="absolute top-0 right-0 opacity-10 w-3/4 h-3/4 rounded-full bg-[var(--brand-accent)] blur-[100px] transform translate-x-1/4 -translate-y-1/4"></div>
      </div>
      
      <div className="container-custom relative z-10">
        <AnimatedSection>
          <h2 className="section-title text-center">Get In <span className="text-[var(--brand-accent)]">Touch</span></h2>
          <p className="text-center text-[var(--text-secondary)] max-w-2xl mx-auto mb-16">
            Interested in working together? Feel free to reach out to me through any of the following channels.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <AnimatedSection animation="fade-in" className="lg:col-span-2">
            <div className="glass-card p-8 h-full">
              <h3 className="text-2xl font-bold mb-6 text-[var(--text-primary)]">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div>
                    <MapPin className="h-6 w-6 text-[var(--brand-accent)]" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-[var(--text-primary)]">Location</h4>
                    <p className="text-[var(--text-secondary)]">Bengaluru, IN</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div>
                    <Mail className="h-6 w-6 text-[var(--brand-accent)]" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-[var(--text-primary)]">Email</h4>
                    <a href="mailto:rijosimon44@gmail.com" className="text-[var(--text-secondary)] hover:text-[var(--brand-accent)] transition-colors">
                      rijosimon44@gmail.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div>
                    <Phone className="h-6 w-6 text-[var(--brand-accent)]" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-[var(--text-primary)]">Phone</h4>
                    <a href="tel:+917868872418" className="text-[var(--text-secondary)] hover:text-[var(--brand-accent)] transition-colors">
                      +91 7868872418
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div>
                    <Linkedin className="h-6 w-6 text-[var(--brand-accent)]" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-[var(--text-primary)]">LinkedIn</h4>
                    <a 
                      href="https://www.linkedin.com/in/rijo-simon-927559278" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-[var(--text-secondary)] hover:text-[var(--brand-accent)] transition-colors"
                    >
                      /in/rijo-simon-927559278
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="mt-12">
                <h4 className="text-xl font-semibold mb-4 text-[var(--text-primary)]">Let's Connect</h4>
                <p className="text-[var(--text-secondary)] mb-6">
                  I'm always open to discussing new projects, creative ideas or opportunities to be part of your vision.
                </p>
              </div>
            </div>
          </AnimatedSection>
          
          <AnimatedSection animation="slide-in-right" className="lg:col-span-3">
            <div className="glass-card p-8">
              <h3 className="text-2xl font-bold mb-6 text-[var(--text-primary)]">Send Me a Message</h3>
              
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-[var(--text-primary)] mb-2 font-medium">
                      Your Name
                    </label>
                    <input 
                      type="text" 
                      id="name" 
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full p-3 rounded-lg bg-[var(--page-background)] border border-[var(--border)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-accent)]"
                      placeholder="Karthik"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-[var(--text-primary)] mb-2 font-medium">
                      Your Email
                    </label>
                    <input 
                      type="email" 
                      id="email" 
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full p-3 rounded-lg bg-[var(--page-background)] border border-[var(--border)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-accent)]"
                      placeholder="karthik@example.com"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-[var(--text-primary)] mb-2 font-medium">
                    Subject
                  </label>
                  <input 
                    type="text" 
                    id="subject" 
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg bg-[var(--page-background)] border border-[var(--border)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-accent)]"
                    placeholder="Project Inquiry"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-[var(--text-primary)] mb-2 font-medium">
                    Message
                  </label>
                  <textarea 
                    id="message" 
                    rows="5" 
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg bg-[var(--page-background)] border border-[var(--border)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-accent)]"
                    placeholder="Hello, I'd like to discuss..."
                    required
                  ></textarea>
                </div>
                
                <button 
                  type="submit" 
                  disabled={status === 'sending'}
                  className={`w-full sm:w-auto px-8 py-3 bg-[var(--brand-accent)] text-[var(--page-background)] rounded-lg font-medium transition-all duration-300 hover:shadow-lg hover:translate-y-[-2px] disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {status === 'sending' ? 'Sending...' : 'Send Message'}
                </button>

                {status === 'success' && (
                  <p className="text-green-500 mt-4">Message sent successfully!</p>
                )}
                {status === 'error' && (
                  <p className="text-red-500 mt-4">Failed to send message. Please try again.</p>
                )}
              </form>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default Contact;
