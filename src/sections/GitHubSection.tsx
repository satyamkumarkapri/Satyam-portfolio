import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Star, GitFork, BookOpen } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { personalData } from '../data/personal';
import SpotlightCard from '../components/ui/SpotlightCard';

interface Repo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
}

interface Profile {
  public_repos: number;
  followers: number;
  following: number;
  avatar_url: string;
}

const GitHubSection: React.FC = () => {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        const username = personalData.socials.github.split('/').pop();
        if (!username) throw new Error("Invalid GitHub URL");

        // Fetch profile
        const profileRes = await fetch(`https://api.github.com/users/${username}`);
        if (!profileRes.ok) throw new Error("Profile fetch failed");
        const profileData = await profileRes.json();
        
        // Fetch repos
        const reposRes = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`);
        if (!reposRes.ok) throw new Error("Repos fetch failed");
        const reposData = await reposRes.json();

        setProfile(profileData);
        setRepos(reposData.filter((r: any) => !r.fork)); // Show only original repos
        setLoading(false);
      } catch (err) {
        console.error("GitHub API error:", err);
        setError(true);
        setLoading(false);
      }
    };

    fetchGitHubData();
  }, []);

  return (
    <section id="github" className="relative py-32 px-6 md:px-12 bg-transparent min-h-screen border-b border-border/50">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/5 via-background to-background pointer-events-none" />
      
      <div className="container mx-auto relative z-10">
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-sm font-mono tracking-widest text-primary-dim uppercase mb-6 block">05 / CODE</span>
          <h2 className="text-4xl md:text-6xl font-display font-bold leading-tight tracking-tighter">
            THE CODE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white/60 to-white/10">BEHIND THE IDEAS.</span>
          </h2>
        </motion.div>

        {loading ? (
          <div className="w-full py-32 flex flex-col items-center justify-center gap-4">
            <div className="w-8 h-8 rounded-full border-2 border-border border-t-white animate-spin" />
            <p className="text-sm font-mono tracking-widest text-primary-dim animate-pulse">CONNECTING TO GITHUB...</p>
          </div>
        ) : error ? (
          <div className="w-full py-32 flex flex-col items-center justify-center gap-4 text-center">
            <FaGithub size={48} className="text-primary-dim opacity-50 mb-4" />
            <p className="text-xl font-display text-primary">GitHub Connection Temporarily Unavailable</p>
            <p className="text-primary-dim mb-6">Unable to fetch real-time repository data due to API limits.</p>
            <a 
              href={personalData.socials.github} 
              target="_blank" 
              rel="noreferrer"
              className="px-8 py-3 glass-panel text-primary rounded-full hover:bg-surface-hover transition-colors"
            >
              VIEW MY GITHUB DIRECTLY
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Profile Overview */}
            <motion.div 
              className="lg:col-span-4 flex flex-col gap-8"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <SpotlightCard className="glass-panel p-8 rounded-3xl border border-border">
                <div className="flex items-center gap-6 mb-8 relative z-10">
                  <div className="relative">
                    <img src={profile?.avatar_url} alt="GitHub Avatar" className="w-20 h-20 rounded-full border border-border" />
                    <div className="absolute -bottom-2 -right-2 bg-transparent rounded-full p-1 border border-border">
                      <FaGithub size={16} />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-display font-bold text-primary">{personalData.name}</h3>
                    <a href={personalData.socials.github} target="_blank" rel="noreferrer" className="text-primary-dim hover:text-primary hover:underline font-mono text-sm">
                      @{personalData.socials.github.split('/').pop()}
                    </a>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-8 relative z-10">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary mb-1">{profile?.public_repos}</div>
                    <div className="text-xs font-mono tracking-widest text-primary-dim">REPOS</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary mb-1">{profile?.followers}</div>
                    <div className="text-xs font-mono tracking-widest text-primary-dim">FOLLOWERS</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary mb-1">{profile?.following}</div>
                    <div className="text-xs font-mono tracking-widest text-primary-dim">FOLLOWING</div>
                  </div>
                </div>

                <a 
                  href={personalData.socials.github} 
                  target="_blank" 
                  rel="noreferrer"
                  className="w-full py-4 bg-primary text-background font-bold text-center rounded-xl hover:bg-primary/90 transition-colors block relative z-10"
                >
                  VIEW FULL PROFILE
                </a>
              </SpotlightCard>
            </motion.div>

            {/* Repositories Constellation */}
            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              {repos.map((repo, idx) => (
                <motion.a
                  key={repo.id}
                  href={repo.html_url}
                  target="_blank"
                  rel="noreferrer"
                  className="block h-full outline-none"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: 0.1 * idx }}
                >
                  <SpotlightCard className="glass-panel p-6 rounded-2xl border border-border/50 hover:border-accent-cyan/50 hover:-translate-y-1 transition-all duration-300 group flex flex-col h-full">
                    <div className="flex items-center gap-3 mb-4 relative z-10">
                      <BookOpen size={18} className="text-primary-dim group-hover:text-accent-cyan transition-colors" />
                      <h4 className="text-lg font-bold text-primary group-hover:text-accent-cyan transition-colors truncate">
                        {repo.name}
                      </h4>
                    </div>
                    
                    <p className="text-primary-dim text-sm leading-relaxed mb-6 flex-grow line-clamp-2 relative z-10">
                      {repo.description || "No description provided."}
                    </p>

                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/30 relative z-10">
                      <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-accent-blue" />
                        <span className="text-xs font-mono text-primary-dim">{repo.language || "Unknown"}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1.5 text-xs font-mono text-primary-dim">
                          <Star size={14} />
                          <span>{repo.stargazers_count}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs font-mono text-primary-dim">
                          <GitFork size={14} />
                          <span>{repo.forks_count}</span>
                        </div>
                      </div>
                    </div>
                  </SpotlightCard>
                </motion.a>
              ))}
            </div>

          </div>
        )}
      </div>
    </section>
  );
};

export default GitHubSection;
