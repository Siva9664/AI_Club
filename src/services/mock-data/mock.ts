// src/api/mock.ts
// Simple mock API layer – returns static data for development.
export const fetchHomeData = async () => ({
  title: 'Welcome to AI Club',
  description: 'This is a mock home page.'
});

export const fetchAchievements = async () => [
  { id: 1, name: 'Hackathon Winner', year: 2023 },
  { id: 2, name: 'Best Presentation', year: 2022 }
];

export const fetchProjects = async () => [
  { slug: 'project-alpha', name: 'Project Alpha', summary: 'Alpha description' },
  { slug: 'project-beta', name: 'Project Beta', summary: 'Beta description' }
];

export const fetchGuests = async () => [
  { id: 1, name: 'Guest One', role: 'Speaker' },
  { id: 2, name: 'Guest Two', role: 'Mentor' }
];

// Add more mock functions as needed.
