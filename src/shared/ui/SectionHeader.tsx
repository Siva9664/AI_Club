// src/shared/ui/SectionHeader.tsx
import React from 'react';

interface SectionHeaderProps {
  title: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ title }) => (
  <h1 className="text-2xl font-bold mb-4 text-foreground">{title}</h1>
);
