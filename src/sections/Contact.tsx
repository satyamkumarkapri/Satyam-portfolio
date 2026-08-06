import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { personalData } from '../data/personal';
import { Mail, Copy, CheckCircle } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const Contact: React.FC = () => {
  const [copied, setCopied] = useState(false);
  
  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalData.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          access_key: '57a275d4-fd7c-4b19-a6ea-e60cfc68f073',
          ...formData
        }),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setStatus('idle'), 3000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 3000);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return (
    <section id="contact" className="relative py-32 bg-transparent min-h-screen flex items-center border-b border-border/50">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-sm font-mono tracking-widest text-primary-dim uppercase mb-6 block">08 / CONTACT</span>
            
            <h2 className="text-5xl md:text-7xl font-display font-bold leading-[0.9] tracking-tighter mb-8">
              HAVE AN IDEA? <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40">LET'S BUILD <br className="hidden md:block" /> SOMETHING MEANINGFUL.</span>
            </h2>
            
            <p className="text-xl text-primary-dim font-light leading-relaxed mb-12 max-w-lg">
              "Whether it's technology, AI, a project, a business idea, or an opportunity — I'm always interested in meaningful conversations."
            </p>

            <div className="flex flex-col gap-6">
              <a 
                href={`mailto:${personalData.email}`}
                className="flex items-center gap-4 text-primary hover:text-accent-cyan transition-colors group w-fit"
              >
                <div className="w-12 h-12 rounded-full glass-panel flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Mail size={20} />
                </div>
                <span className="font-mono tracking-widest uppercase text-sm md:text-base">EMAIL ME</span>
              </a>
              
              <a 
                href={personalData.socials.linkedin}
                target="_blank" rel="noreferrer"
                className="flex items-center gap-4 text-primary hover:text-accent-cyan transition-colors group w-fit"
              >
                <div className="w-12 h-12 rounded-full glass-panel flex items-center justify-center group-hover:scale-110 transition-transform">
                  <FaLinkedin size={20} />
                </div>
                <span className="font-mono tracking-widest uppercase text-sm md:text-base">LINKEDIN</span>
              </a>
              
              <a 
                href={personalData.socials.github}
                target="_blank" rel="noreferrer"
                className="flex items-center gap-4 text-primary hover:text-accent-cyan transition-colors group w-fit"
              >
                <div className="w-12 h-12 rounded-full glass-panel flex items-center justify-center group-hover:scale-110 transition-transform">
                  <FaGithub size={20} />
                </div>
                <span className="font-mono tracking-widest uppercase text-sm md:text-base">GITHUB</span>
              </a>

              <div className="mt-8 pt-8 border-t border-border/50">
                <button 
                  onClick={handleCopyEmail}
                  className="flex items-center gap-3 text-sm font-mono tracking-widest text-primary-dim hover:text-primary transition-colors"
                >
                  {copied ? <CheckCircle size={16} className="text-green-500" /> : <Copy size={16} />}
                  {copied ? 'EMAIL COPIED' : 'COPY EMAIL ADDRESS'}
                </button>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="glass-panel p-8 md:p-12 rounded-3xl relative"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Subtle glow behind form */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-accent-blue/5 rounded-full blur-[100px] pointer-events-none" />
            
            <form onSubmit={handleSubmit} className="relative z-10 flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-xs font-mono tracking-widest text-primary-dim uppercase ml-4">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-transparent/50 border border-border rounded-2xl px-6 py-4 text-primary placeholder:text-primary-dim/50 focus:outline-none focus:border-primary transition-colors"
                  placeholder="John Doe"
                />
              </div>
              
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-xs font-mono tracking-widest text-primary-dim uppercase ml-4">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-transparent/50 border border-border rounded-2xl px-6 py-4 text-primary placeholder:text-primary-dim/50 focus:outline-none focus:border-primary transition-colors"
                  placeholder="john@example.com"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="subject" className="text-xs font-mono tracking-widest text-primary-dim uppercase ml-4">Subject</label>
                <input 
                  type="text" 
                  id="subject" 
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full bg-transparent/50 border border-border rounded-2xl px-6 py-4 text-primary placeholder:text-primary-dim/50 focus:outline-none focus:border-primary transition-colors"
                  placeholder="Project Inquiry"
                />
              </div>
              
              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-xs font-mono tracking-widest text-primary-dim uppercase ml-4">Message</label>
                <textarea 
                  id="message" 
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full bg-transparent/50 border border-border rounded-2xl px-6 py-4 text-primary placeholder:text-primary-dim/50 focus:outline-none focus:border-primary transition-colors resize-none"
                  placeholder="Tell me about your idea..."
                ></textarea>
              </div>

              <button 
                type="submit"
                id="submit-btn"
                disabled={status === 'submitting'}
                className={`w-full mt-4 py-4 font-bold tracking-widest uppercase rounded-full transition-colors ${
                  status === 'success' ? 'bg-green-500 text-primary border-green-500' :
                  status === 'error' ? 'bg-red-500 text-primary border-red-500' :
                  'bg-primary text-background hover:bg-primary/90'
                }`}
              >
                {status === 'submitting' ? 'SENDING...' :
                 status === 'success' ? 'MESSAGE SENT SUCCESSFULLY' :
                 status === 'error' ? 'ERROR SENDING MESSAGE' :
                 'SEND MESSAGE'}
              </button>

            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
