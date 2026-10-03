import React from 'react';
import { Cpu, Layers, Server, Monitor, Database, Wrench, Code2 } from 'lucide-react';
import type { TechItem } from '../../types';

// Map general category strings to Lucide icons
const getCategoryIcon = (categoryName: string) => {
  const norm = categoryName.toLowerCase();
  if (norm.includes('ai') || norm.includes('machine learning') || norm.includes('learning')) {
    return <Cpu className="w-4 h-4 text-primary" />;
  }
  if (norm.includes('backend') || norm.includes('api')) {
    return <Server className="w-4 h-4 text-emerald-500" />;
  }
  if (norm.includes('frontend') || norm.includes('ui')) {
    return <Monitor className="w-4 h-4 text-blue-500" />;
  }
  if (norm.includes('database') || norm.includes('storage')) {
    return <Database className="w-4 h-4 text-amber-500" />;
  }
  if (norm.includes('tool') || norm.includes('cloud') || norm.includes('devops')) {
    return <Wrench className="w-4 h-4 text-purple-500" />;
  }
  return <Layers className="w-4 h-4 text-muted-foreground" />;
};

export const TechStack: React.FC<{ techStack: TechItem[] }> = ({ techStack }) => {
  if (!techStack || techStack.length === 0) return null;

  // Group technologies by category where category exists
  const grouped = techStack.reduce<Record<string, TechItem[]>>((acc, item) => {
    const groupName = item.category || 'Core Technologies';
    if (!acc[groupName]) {
      acc[groupName] = [];
    }
    acc[groupName].push(item);
    return acc;
  }, {});

  const groupKeys = Object.keys(grouped);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {groupKeys.map((groupName) => (
          <div
            key={groupName}
            className="glass-card p-5 rounded-3xl border border-white/80 dark:border-white/10 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl shadow-md"
          >
            <div className="flex items-center gap-2.5 pb-3 mb-4 border-b border-slate-200/70 dark:border-slate-800">
              {getCategoryIcon(groupName)}
              <h4 className="text-sm font-bold text-slate-900 dark:text-white tracking-wide uppercase">
                {groupName}
              </h4>
            </div>

            <div className="flex flex-wrap gap-2">
              {grouped[groupName].map((item, idx) => (
                <div
                  key={idx}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/80 dark:bg-slate-800/80 border border-white/90 dark:border-white/10 text-xs font-mono font-semibold text-slate-700 dark:text-slate-200 shadow-2xs backdrop-blur-md hover:border-blue-400 transition-colors"
                >
                  <Code2 className="w-3.5 h-3.5 text-primary" />
                  <span>{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
