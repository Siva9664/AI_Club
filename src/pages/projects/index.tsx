// src/pages/projects/index.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ProjectsPage } from './pages/ProjectsPage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';

export const ProjectsModule: React.FC = () => {
  return (
    <Routes>
      <Route index element={<ProjectsPage />} />
      <Route path=":id" element={<ProjectDetailPage />} />
    </Routes>
  );
};

export default ProjectsModule;
