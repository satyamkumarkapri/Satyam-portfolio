import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projectsData } from '../data/projects';
import type { ProjectData } from '../components/ui/ProjectCard';
import ProjectCard from '../components/ui/ProjectCard';
import SectionHeader from '../components/ui/SectionHeader';
import ProjectModal from '../components/ui/ProjectModal';
import { Search } from 'lucide-react';
import { useScrollDrag } from '../hooks/useScrollDrag';

const categories = ["ALL", "AI", "JAVA", "FULL STACK", "DATA", "WEB"];

const Projects: React.FC = () => {
  const [filter, setFilter] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
  
  // Custom hook for drag-to-scroll logic
  const {
    scrollContainerRef,
    handleMouseDown,
    handleMouseLeave,
    handleMouseUp,
    handleMouseMove
  } = useScrollDrag();

  // Filter projects based on category and search query
  const filteredProjects = projectsData.filter(project => {
    const matchesCategory = filter === "ALL" || project.category === filter;
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          project.technology.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="projects" className="relative py-32 bg-transparent min-h-screen overflow-hidden border-b border-border/50 flex flex-col">
      <div className="container mx-auto px-6 md:px-12 mb-12">
          <SectionHeader 
            number="04"
            category="PROJECTS"
            titleTop={<>WELCOME TO</>}
            titleBottom={<>MY DIGITAL LAB.</>}
            description="Projects where ideas become systems."
            accentColor="violet"
          />

          {/* Filters & Search */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-border/50">
            <div className="flex flex-wrap gap-2" role="tablist">
              {categories.map(cat => (
                <button
                  key={cat}
                  role="tab"
                  aria-selected={filter === cat}
                  onClick={() => setFilter(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-mono tracking-widest transition-all ${
                    filter === cat 
                      ? 'bg-accent-violet text-white font-bold shadow-glow-violet' 
                      : 'glass-panel text-primary-dim hover:text-primary hover:border-accent-violet/50'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-primary-dim" size={16} aria-hidden="true" />
              <input 
                type="text" 
                placeholder="Search projects..."
                aria-label="Search projects"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full glass-panel rounded-full py-2 pl-10 pr-4 text-sm text-primary placeholder:text-primary-dim focus:outline-none focus:border-accent-violet focus:shadow-glow-violet transition-all"
              />
            </div>
          </div>
      </div>

      {/* Project Gallery - Horizontal Scroll on All Devices */}
      <div 
        ref={scrollContainerRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        className="w-full overflow-x-auto pb-12 pt-4 px-6 md:px-12 hide-scrollbar cursor-grab active:cursor-grabbing"
        role="region"
        aria-label="Project gallery"
      >
        <div className="flex flex-row gap-6 lg:gap-8 w-max lg:pl-[10vw]">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <ProjectCard 
                key={project.id}
                project={project}
                index={index}
                onClick={setSelectedProject}
              />
            ))}
            {filteredProjects.length === 0 && (
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="w-full text-center py-20 text-primary-dim"
              >
                No projects found matching your criteria.
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Space for future projects indicator */}
          <div className="hidden lg:flex w-64 h-full items-center justify-center opacity-30 border-l border-dashed border-border ml-12 pl-12 shrink-0">
             <div className="text-center transform -rotate-90 text-sm font-mono tracking-widest whitespace-nowrap text-primary-dim">
               SPACE FOR FUTURE IDEAS
             </div>
          </div>
        </div>
      </div>

      <ProjectModal 
        project={selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />

      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
};

export default Projects;
