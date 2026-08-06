import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, ArrowRight } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import TiltCard from './TiltCard';

export interface ProjectData {
  id: string;
  title: string;
  fullName: string;
  description: string;
  technology: string[];
  keyConcepts?: string[];
  features?: string[];
  liveUrl?: string;
  githubUrl?: string;
  category: string;
  visualConcept: string;
  featured: boolean;
}

interface ProjectCardProps {
  project: ProjectData;
  index: number;
  onClick: (project: ProjectData) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick }) => {
  return (
    <TiltCard intensity={10} className="h-[450px] w-[85vw] sm:w-[350px] md:w-[400px] flex-shrink-0 cursor-pointer lg:cursor-none perspective-1000 group snap-center">
      <motion.div 
        layoutId={`project-container-${project.id}`}
        className="h-full w-full rounded-3xl overflow-hidden glass-panel border border-border/50 relative flex flex-col"
        onClick={() => onClick(project)}
        whileHover={{ y: -10 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Visual Identity Area */}
        <div className="h-48 relative overflow-hidden bg-gradient-to-br from-surface to-background flex items-center justify-center p-6 border-b border-border/30" style={{ transform: "translateZ(40px)" }}>
          <div className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity duration-500 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent-blue/40 via-background to-background pointer-events-none" />
          
          {/* Abstract representation based on title */}
          <h3 className="text-4xl md:text-5xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-br from-white to-white/10 opacity-30 group-hover:opacity-80 transition-opacity duration-500 z-10 text-center tracking-tighter transform group-hover:scale-110 transition-transform">
            {project.title.substring(0, 2).toUpperCase()}
          </h3>
        </div>

        {/* Content */}
        <div className="p-8 flex flex-col flex-1 relative z-10" style={{ transform: "translateZ(30px)" }}>
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-mono tracking-widest text-accent-cyan bg-accent-cyan/10 px-3 py-1 rounded-full">
              {project.category}
            </span>
            {project.featured && (
              <span className="text-[10px] font-mono tracking-widest text-primary-dim uppercase flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
                Featured
              </span>
            )}
          </div>

          <h3 className="text-2xl font-display font-bold text-primary mb-3 group-hover:text-accent-cyan transition-colors" style={{ transform: "translateZ(60px)" }}>
            {project.title}
          </h3>
          
          <p className="text-primary-dim text-sm leading-relaxed mb-6 line-clamp-3 flex-grow" style={{ transform: "translateZ(40px)" }}>
            {project.description}
          </p>

          <div className="mt-auto space-y-6">
            <div className="flex flex-wrap gap-2">
              {project.technology.slice(0, 3).map(tech => (
                <span key={tech} className="text-xs font-mono text-primary-dim border border-border/50 px-2 py-1 rounded-md">
                  {tech}
                </span>
              ))}
              {project.technology.length > 3 && (
                <span className="text-xs font-mono text-primary-dim border border-border/50 px-2 py-1 rounded-md">
                  +{project.technology.length - 3}
                </span>
              )}
            </div>

            <div className="flex items-center justify-between border-t border-border/50 pt-6">
              <div className="flex gap-3" onClick={(e) => e.stopPropagation()}>
                {project.githubUrl && (
                  <a href={project.githubUrl} target="_blank" rel="noreferrer" className="text-primary-dim hover:text-primary transition-colors">
                    <FaGithub size={18} />
                  </a>
                )}
                {project.liveUrl && (
                  <a href={project.liveUrl} target="_blank" rel="noreferrer" className="text-primary-dim hover:text-primary transition-colors">
                    <ExternalLink size={18} />
                  </a>
                )}
              </div>
              
              <button className="flex items-center gap-2 text-xs font-mono tracking-widest text-primary group-hover:text-accent-cyan transition-colors">
                DETAILS <ArrowRight size={14} className="transform group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </TiltCard>
  );
};

export default ProjectCard;
