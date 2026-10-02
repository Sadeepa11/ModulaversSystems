import projectsData from './projects.json';

/**
 * JSON Database helper for project data
 */

export function getAllProjects() {
  return projectsData.projects;
}

export function getProjectsByType(type) {
  return projectsData.projects.filter((project) => project.type === type);
}

export function getProjectBySlug(slug) {
  return projectsData.projects.find((project) => project.slug === slug);
}

export function getProjectById(id) {
  return projectsData.projects.find((project) => project.id === id);
}

export function getFeaturedProjects() {
  return projectsData.projects.filter((project) => project.featured);
}
