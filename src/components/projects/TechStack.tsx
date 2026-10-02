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
            className="p-5 rounded-2xl border border-border/80 bg-card/60 backdrop-blur-sm shadow-sm"
          >
            <div className="flex items-center gap-2.5 pb-3 mb-4 border-b border-border/60">
              {getCategoryIcon(groupName)}
              <h4 className="text-sm font-bold text-foreground tracking-wide uppercase">
                {groupName}
              </h4>
            </div>

            <div className="flex flex-wrap gap-2">
              {grouped[groupName].map((item, idx) => (
                <div
                  key={idx}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-muted/50 border border-border text-xs font-mono font-medium text-foreground hover:border-primary/40 transition-colors"
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
