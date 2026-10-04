# Contributing to AI Club Website

Thank you for your interest in contributing! This document outlines the guidelines for contributing to the SIET AI Club website.

## Getting Started

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/your-feature-name`
3. Make your changes
4. Run the quality checks: `npm run typecheck && npm run lint && npm run build`
5. Submit a pull request

## Development Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm run test

# Format code
npm run format
```

## Project Structure

```
AI_Club/
├── src/
│   ├── app-setup/          # App, routes, providers
│   ├── pages/              # Feature pages (home, projects, achievements, visitors, chatbot, login)
│   ├── services/           # API clients and mock data
│   ├── shared/             # Shared layout, UI, hooks, lib
│   ├── styles/             # Global styles
│   └── types/              # TypeScript types
├── backend/                # Express + Prisma backend
├── public/                 # Static assets
└── docs/                   # Documentation
```

## Code Style

- TypeScript strict mode enabled
- Use functional components with hooks
- Follow the feature-slice architecture
- Use path aliases (`@/*` for `src/*`)
- Keep components small and focused

## Commit Messages

Follow conventional commits:
- `feat:` new feature
- `fix:` bug fix
- `refactor:` code restructuring
- `chore:` maintenance
- `docs:` documentation

## Pull Request Process

1. Ensure all checks pass
2. Update documentation if needed
3. Request review from maintainers
4. Address feedback
5. Squash and merge

## Reporting Issues

Use GitHub Issues with:
- Clear title and description
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable