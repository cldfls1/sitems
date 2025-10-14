import axios from 'axios';

// Use relative URL in production (Vercel), full URL in development
const API_BASE_URL = import.meta.env.VITE_API_URL || 
  (import.meta.env.MODE === 'production' ? '/api' : 'http://localhost:5000/api');

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Content Blocks
export const getContentBlocks = async (page = null) => {
  const params = page ? { page } : {};
  const response = await api.get('/content-blocks', { params });
  return response.data;
};

export const getContentBlockByKey = async (key) => {
  const response = await api.get(`/content-blocks/by-key/${key}`);
  return response.data;
};

export const createContentBlock = async (data) => {
  const response = await api.post('/content-blocks', data);
  return response.data;
};

export const updateContentBlock = async (id, data) => {
  const response = await api.put(`/content-blocks/${id}`, data);
  return response.data;
};

export const deleteContentBlock = async (id) => {
  await api.delete(`/content-blocks/${id}`);
};

// Projects
export const getProjects = async (featuredOnly = false) => {
  const params = featuredOnly ? { featured: true } : {};
  const response = await api.get('/projects', { params });
  return response.data;
};

export const getProject = async (id) => {
  const response = await api.get(`/projects/${id}`);
  return response.data;
};

export const createProject = async (data) => {
  const response = await api.post('/projects', data);
  return response.data;
};

export const updateProject = async (id, data) => {
  const response = await api.put(`/projects/${id}`, data);
  return response.data;
};

export const deleteProject = async (id) => {
  await api.delete(`/projects/${id}`);
};

// About Sections
export const getAboutSections = async () => {
  const response = await api.get('/about-sections');
  return response.data;
};

export const getAboutSection = async (id) => {
  const response = await api.get(`/about-sections/${id}`);
  return response.data;
};

export const createAboutSection = async (data) => {
  const response = await api.post('/about-sections', data);
  return response.data;
};

export const updateAboutSection = async (id, data) => {
  const response = await api.put(`/about-sections/${id}`, data);
  return response.data;
};

export const deleteAboutSection = async (id) => {
  await api.delete(`/about-sections/${id}`);
};

// Skills
export const getSkills = async (category = null) => {
  const params = category ? { category } : {};
  const response = await api.get('/skills', { params });
  return response.data;
};

export const getSkill = async (id) => {
  const response = await api.get(`/skills/${id}`);
  return response.data;
};

export const createSkill = async (data) => {
  const response = await api.post('/skills', data);
  return response.data;
};

export const updateSkill = async (id, data) => {
  const response = await api.put(`/skills/${id}`, data);
  return response.data;
};

export const deleteSkill = async (id) => {
  await api.delete(`/skills/${id}`);
};

// Settings
export const getSettings = async () => {
  const response = await api.get('/settings');
  return response.data;
};

export const getSetting = async (key) => {
  const response = await api.get(`/settings/${key}`);
  return response.data;
};

export const createOrUpdateSetting = async (data) => {
  const response = await api.post('/settings', data);
  return response.data;
};

export const deleteSetting = async (key) => {
  await api.delete(`/settings/${key}`);
};

// Bulk operations
export const bulkUpdate = async (items) => {
  const response = await api.post('/admin/bulk-update', { items });
  return response.data;
};

// Health check
export const healthCheck = async () => {
  const response = await api.get('/health');
  return response.data;
};

// Initialize default data
export const initializeData = async () => {
  const response = await api.post('/init-data');
  return response.data;
};

// ============= NEW CMS API =============

// Site Settings
export const getAllSettings = async () => {
  const response = await api.get('/settings');
  return response.data;
};

export const getSettingsByCategory = async (category) => {
  const response = await api.get(`/settings/${category}`);
  return response.data;
};

export const createOrUpdateSiteSetting = async (data) => {
  const response = await api.post('/settings', data);
  return response.data;
};

export const bulkUpdateSettings = async (settings) => {
  const response = await api.post('/settings/bulk', settings);
  return response.data;
};

export const initializeSettings = async () => {
  const response = await api.post('/settings/init');
  return response.data;
};

// Page Content
export const getPageContent = async (page) => {
  const response = await api.get(`/content/${page}`);
  return response.data;
};

export const getSectionContent = async (page, section) => {
  const response = await api.get(`/content/${page}/${section}`);
  return response.data;
};

export const createOrUpdateContent = async (data) => {
  const response = await api.post('/content', data);
  return response.data;
};

export const bulkUpdateContent = async (content) => {
  const response = await api.post('/content/bulk', content);
  return response.data;
};

// Buttons
export const getPageButtons = async (page) => {
  const response = await api.get(`/buttons/${page}`);
  return response.data;
};

export const createOrUpdateButton = async (data) => {
  const response = await api.post('/buttons', data);
  return response.data;
};

export const deleteButton = async (buttonId) => {
  await api.delete(`/buttons/${buttonId}`);
};

export default api;
