import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import type { ProjectData } from './ProjectCard';

interface ProjectModalProps {
  project: ProjectData | null;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  // Lock body scroll when modal is open
  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [project]);

  // Handle escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-background/95 backdrop-blur-xl cursor-pointer" 
            onClick={onClose} 
            aria-label="Close modal"
          />
          
          {/* Modal Content */}
          <motion.div 
            className="relative w-full max-w-5xl max-h-[90vh] bg-surface-hover border border-border rounded-3xl overflow-y-auto overflow-x-hidden hide-scrollbar flex flex-col z-10 shadow-2xl"
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
          >
            <button 
              className="absolute top-6 right-6 p-2 bg-background/50 rounded-full text-primary hover:bg-primary hover:text-background transition-colors z-20"
              onClick={onClose}
              aria-label="Close project details"
            >
              <X size={20} />
            </button>

            <div className="h-64 md:h-80 relative overflow-hidden bg-gradient-to-b from-accent-blue/10 to-background flex flex-col justify-end p-8 md:p-12">
              <span className="text-xs font-mono tracking-widest text-accent-cyan mb-4">{project.category}</span>
              <h2 id="modal-title" className="text-4xl md:text-6xl font-display font-bold text-primary tracking-tighter leading-none mb-2 text-gradient-primary">
                {project.title}
              </h2>
              <p className="text-xl text-primary-dim font-light">{project.fullName}</p>
            </div>

            <div className="p-8 md:p-12 grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="md:col-span-2 space-y-12">
                <section>
                  <h4 className="text-sm font-mono tracking-widest text-primary-dim mb-4 border-b border-border/50 pb-2">PROJECT OVERVIEW</h4>
                  <p className="text-lg text-primary-dim leading-relaxed">{project.description}</p>
                </section>
                
                <section>
                  <h4 className="text-sm font-mono tracking-widest text-primary-dim mb-4 border-b border-border/50 pb-2">VISUAL CONCEPT</h4>
                  <p className="text-lg text-primary leading-relaxed italic border-l-2 border-accent-blue pl-4">
                    "{project.visualConcept}"
                  </p>
                </section>

                {(project.features || project.keyConcepts) && (
                  <section>
                    <h4 className="text-sm font-mono tracking-widest text-primary-dim mb-4 border-b border-border/50 pb-2">KEY FEATURES & CONCEPTS</h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {(project.features || project.keyConcepts)?.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <span className="text-accent-cyan mt-1">▹</span>
                          <span className="text-primary-dim">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </section>
                )}
              </div>

              <div className="space-y-8">
                <div className="glass-panel p-6 rounded-2xl">
                  <h4 className="text-xs font-mono tracking-widest text-primary-dim mb-4">TECHNOLOGY STACK</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technology.map(tech => (
                      <span key={tech} className="text-sm text-primary bg-surface border border-border px-3 py-1.5 rounded-lg">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  {project.liveUrl && (
                    <a href={project.liveUrl} target="_blank" rel="noreferrer" className="w-full py-4 bg-gradient-to-r from-accent-violet via-accent-blue to-accent-cyan text-primary font-bold text-center rounded-xl hover:shadow-[0_0_20px_rgba(34,211,238,0.5)] transition-all transform hover:scale-105 flex items-center justify-center gap-2">
                      <ExternalLink size={18} /> LIVE PROJECT
                    </a>
                  )}
                  {project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" rel="noreferrer" className="w-full py-4 border-gradient-primary text-primary font-bold text-center rounded-xl hover:shadow-[0_0_15px_rgba(139,92,246,0.3)] transition-all transform hover:scale-105 flex items-center justify-center gap-2">
                      <FaGithub size={18} /> SOURCE CODE
                    </a>
                  )}
                  {!project.liveUrl && !project.githubUrl && (
                    <div className="w-full py-4 bg-surface/50 border border-border border-dashed text-primary-dim text-center rounded-xl text-sm font-mono">
                      Links available on request
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;
