import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FiEdit2, FiTrash2, FiPlus, FiSave, FiFileText, FiFolder, FiCode, FiDatabase, FiStar, FiLogOut, FiSettings } from 'react-icons/fi';
import Modal from '../components/Modal';
import Toast from '../components/Toast';
import AuthModal from '../components/AuthModal';
import SiteSettings from '../components/SiteSettings';
import {
  getContentBlocks, updateContentBlock, createContentBlock, deleteContentBlock,
  getProjects, updateProject, createProject, deleteProject,
  getAboutSections, updateAboutSection, createAboutSection, deleteAboutSection,
  getSkills, updateSkill, createSkill, deleteSkill,
} from '../utils/api';

const AdminNew = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [activeTab, setActiveTab] = useState('projects');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem('admin_token');
    if (token === 'authenticated') {
      setIsAuthenticated(true);
    } else {
      setShowAuthModal(true);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated && activeTab !== 'settings') {
      loadData();
    }
  }, [activeTab, isAuthenticated]);

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
    localStorage.removeItem('admin_login_time');
    console.log('[AUTH] User logged out at ' + new Date().toLocaleString());
    setIsAuthenticated(false);
    navigate('/');
  };

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
    showToast('Logged in successfully', 'success');
  };

  const tabs = [
    { id: 'settings', name: 'Settings', icon: FiSettings },
    { id: 'projects', name: 'Projects', icon: FiFolder },
    { id: 'content', name: 'Content', icon: FiFileText },
    { id: 'about', name: 'About', icon: FiCode },
    { id: 'skills', name: 'Skills', icon: FiDatabase },
  ];

  if (!isAuthenticated) {
    return (
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => navigate('/')}
        onSuccess={handleAuthSuccess}
      />
    );
  }

  const loadData = async () => {
    setLoading(true);
    try {
      let result = [];
      switch (activeTab) {
        case 'projects':
          result = await getProjects();
          break;
        case 'content':
          result = await getContentBlocks();
          break;
        case 'about':
          result = await getAboutSections();
          break;
        case 'skills':
          result = await getSkills();
          break;
        case 'settings':
          // Settings don't need API call
          return;
      }
      setData(result);
    } catch (error) {
      console.error('Error loading data:', error);
      const errorMsg = error.response?.data?.error || error.message || 'Failed to connect to API. Check backend connection.';
      showToast(`Error loading data: ${errorMsg}`, 'error');
    } finally {
      setLoading(false);
    }
  };

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
  };

  const handleEdit = (item) => {
    setEditingItem({ ...item });
    setIsModalOpen(true);
  };

  const handleCreate = () => {
    const templates = {
      projects: { title: '', description: '', short_description: '', technologies: [], github_url: '', demo_url: '', category: '', featured: false, order: 0 },
      content: { key: '', type: 'text', content: '', page: 'home', order: 0, metadata: null },
      about: { section_key: '', title: '', content: '', icon: '', order: 0, metadata: null },
      skills: { name: '', category: '', level: 50, icon: '', order: 0 },
    };
    setEditingItem(templates[activeTab]);
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    try {
      const isNew = !editingItem.id;
      
      switch (activeTab) {
        case 'projects':
          if (isNew) await createProject(editingItem);
          else await updateProject(editingItem.id, editingItem);
          break;
        case 'content':
          if (isNew) await createContentBlock(editingItem);
          else await updateContentBlock(editingItem.id, editingItem);
          break;
        case 'about':
          if (isNew) await createAboutSection(editingItem);
          else await updateAboutSection(editingItem.id, editingItem);
          break;
        case 'skills':
          if (isNew) await createSkill(editingItem);
          else await updateSkill(editingItem.id, editingItem);
          break;
      }
      
      showToast(isNew ? 'Created successfully' : 'Updated successfully');
      setIsModalOpen(false);
      setEditingItem(null);
      loadData();
    } catch (error) {
      showToast('Error saving: ' + error.message, 'error');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this item?')) return;
    
    try {
      switch (activeTab) {
        case 'projects':
          await deleteProject(id);
          break;
        case 'content':
          await deleteContentBlock(id);
          break;
        case 'about':
          await deleteAboutSection(id);
          break;
        case 'skills':
          await deleteSkill(id);
          break;
      }
      
      showToast('Deleted successfully');
      loadData();
    } catch (error) {
      showToast('Error deleting', 'error');
    }
  };

  const renderForm = () => {
    if (!editingItem) return null;

    switch (activeTab) {
      case 'projects':
        return <ProjectForm item={editingItem} onChange={setEditingItem} />;
      case 'content':
        return <ContentForm item={editingItem} onChange={setEditingItem} />;
      case 'about':
        return <AboutForm item={editingItem} onChange={setEditingItem} />;
      case 'skills':
        return <SkillForm item={editingItem} onChange={setEditingItem} />;
    }
  };

  const renderList = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center py-20">
          <div className="flex gap-2">
            <div className="w-2 h-2 bg-primary-500 rounded-full loading-dot"></div>
            <div className="w-2 h-2 bg-primary-500 rounded-full loading-dot"></div>
            <div className="w-2 h-2 bg-primary-500 rounded-full loading-dot"></div>
          </div>
        </div>
      );
    }

    if (data.length === 0) {
      return (
        <div className="text-center py-20">
          <p className="text-gray-500 mb-4">No items yet</p>
          <button onClick={handleCreate} className="btn-primary inline-flex items-center gap-2">
            <FiPlus /> Create First Item
          </button>
        </div>
      );
    }

    switch (activeTab) {
      case 'settings':
        return <SiteSettings onSave={(settings) => showToast('Settings saved successfully!')} />;
      case 'projects':
        return <ProjectsList items={data} onEdit={handleEdit} onDelete={handleDelete} />;
      case 'content':
        return <ContentList items={data} onEdit={handleEdit} onDelete={handleDelete} />;
      case 'about':
        return <AboutList items={data} onEdit={handleEdit} onDelete={handleDelete} />;
      case 'skills':
        return <SkillsList items={data} onEdit={handleEdit} onDelete={handleDelete} />;
    }
  };

  return (
    <div className="min-h-screen py-8">
      <Toast {...toast} isVisible={toast.show} />

      <div className="section-container">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Admin Panel</h1>
            <p className="text-gray-400">Manage your portfolio content</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-lg glass-hover text-gray-400 hover:text-red-400 transition-all"
          >
            <FiLogOut size={18} />
            <span>Logout</span>
          </button>
        </div>

        {/* Tabs */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg transition-all ${
                  activeTab === tab.id
                    ? 'bg-white/10 text-white border border-white/20'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <tab.icon size={18} />
                <span>{tab.name}</span>
              </button>
            ))}
          </div>

          {activeTab !== 'settings' && (
            <button
              onClick={handleCreate}
              className="btn-primary flex items-center gap-2"
            >
              <FiPlus /> Add New
            </button>
          )}
        </div>

        {/* Content */}
        <div className="glass-strong rounded-2xl p-6 min-h-[400px]">
          {renderList()}
        </div>
      </div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingItem(null);
        }}
        title={editingItem?.id ? `Edit ${activeTab}` : `Create ${activeTab}`}
      >
        {renderForm()}
        <div className="flex gap-3 mt-6">
          <button onClick={handleSave} className="btn-primary flex items-center gap-2 flex-1">
            <FiSave /> Save
          </button>
          <button
            onClick={() => {
              setIsModalOpen(false);
              setEditingItem(null);
            }}
            className="btn-secondary flex-1"
          >
            Cancel
          </button>
        </div>
      </Modal>
    </div>
  );
};

// Form Components
const ProjectForm = ({ item, onChange }) => (
  <div className="space-y-4">
    <Input
      label="Title"
      value={item.title}
      onChange={(e) => onChange({ ...item, title: e.target.value })}
      required
    />
    <Textarea
      label="Description"
      value={item.description}
      onChange={(e) => onChange({ ...item, description: e.target.value })}
      rows={3}
      required
    />
    <Input
      label="Short Description"
      value={item.short_description}
      onChange={(e) => onChange({ ...item, short_description: e.target.value })}
    />
    <Input
      label="GitHub URL"
      value={item.github_url}
      onChange={(e) => onChange({ ...item, github_url: e.target.value })}
    />
    <Input
      label="Demo URL"
      value={item.demo_url}
      onChange={(e) => onChange({ ...item, demo_url: e.target.value })}
    />
    <Input
      label="Category"
      value={item.category}
      onChange={(e) => onChange({ ...item, category: e.target.value })}
    />
    <Input
      label="Technologies (comma separated)"
      value={Array.isArray(item.technologies) ? item.technologies.join(', ') : ''}
      onChange={(e) => onChange({ ...item, technologies: e.target.value.split(',').map(t => t.trim()) })}
      placeholder="React, Node.js, MongoDB"
    />
    <div className="flex items-center gap-4">
      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          checked={item.featured}
          onChange={(e) => onChange({ ...item, featured: e.target.checked })}
          className="w-4 h-4"
        />
        <span className="text-white">Featured</span>
      </label>
      <Input
        label="Order"
        type="number"
        value={item.order}
        onChange={(e) => onChange({ ...item, order: parseInt(e.target.value) || 0 })}
        className="w-24"
      />
    </div>
  </div>
);

const ContentForm = ({ item, onChange }) => (
  <div className="space-y-4">
    <Input
      label="Key"
      value={item.key}
      onChange={(e) => onChange({ ...item, key: e.target.value })}
      required
    />
    <div className="grid grid-cols-2 gap-4">
      <Input
        label="Type"
        value={item.type}
        onChange={(e) => onChange({ ...item, type: e.target.value })}
        required
      />
      <Input
        label="Page"
        value={item.page}
        onChange={(e) => onChange({ ...item, page: e.target.value })}
        required
      />
    </div>
    <Textarea
      label="Content"
      value={item.content}
      onChange={(e) => onChange({ ...item, content: e.target.value })}
      rows={4}
      required
    />
    <Input
      label="Order"
      type="number"
      value={item.order}
      onChange={(e) => onChange({ ...item, order: parseInt(e.target.value) || 0 })}
    />
  </div>
);

const AboutForm = ({ item, onChange }) => (
  <div className="space-y-4">
    <Input
      label="Section Key"
      value={item.section_key}
      onChange={(e) => onChange({ ...item, section_key: e.target.value })}
      required
    />
    <Input
      label="Title"
      value={item.title}
      onChange={(e) => onChange({ ...item, title: e.target.value })}
      required
    />
    <Textarea
      label="Content"
      value={item.content}
      onChange={(e) => onChange({ ...item, content: e.target.value })}
      rows={4}
      required
    />
    <div className="grid grid-cols-2 gap-4">
      <Input
        label="Icon (emoji)"
        value={item.icon}
        onChange={(e) => onChange({ ...item, icon: e.target.value })}
      />
      <Input
        label="Order"
        type="number"
        value={item.order}
        onChange={(e) => onChange({ ...item, order: parseInt(e.target.value) || 0 })}
      />
    </div>
  </div>
);

const SkillForm = ({ item, onChange }) => (
  <div className="space-y-4">
    <Input
      label="Name"
      value={item.name}
      onChange={(e) => onChange({ ...item, name: e.target.value })}
      required
    />
    <Input
      label="Category"
      value={item.category}
      onChange={(e) => onChange({ ...item, category: e.target.value })}
      required
    />
    <div className="grid grid-cols-2 gap-4">
      <Input
        label="Level (0-100)"
        type="number"
        value={item.level}
        onChange={(e) => onChange({ ...item, level: parseInt(e.target.value) || 50 })}
        min="0"
        max="100"
      />
      <Input
        label="Order"
        type="number"
        value={item.order}
        onChange={(e) => onChange({ ...item, order: parseInt(e.target.value) || 0 })}
      />
    </div>
    <Input
      label="Icon (emoji)"
      value={item.icon}
      onChange={(e) => onChange({ ...item, icon: e.target.value })}
    />
  </div>
);

// List Components
const ProjectsList = ({ items, onEdit, onDelete }) => (
  <div className="space-y-3">
    {items.map((item) => (
      <motion.div
        key={item.id}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="card-minimal flex items-start justify-between gap-4"
      >
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-white">{item.title}</h3>
            {item.featured && <FiStar className="text-yellow-500" size={14} />}
          </div>
          <p className="text-sm text-gray-400 line-clamp-1 mb-2">{item.short_description}</p>
          {item.technologies && (
            <div className="flex flex-wrap gap-1">
              {item.technologies.slice(0, 4).map((tech, i) => (
                <span key={i} className="tag-sm text-gray-500">{tech}</span>
              ))}
            </div>
          )}
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(item)}
            className="glass-hover p-2 rounded-lg text-gray-400 hover:text-white"
          >
            <FiEdit2 size={16} />
          </button>
          <button
            onClick={() => onDelete(item.id)}
            className="glass-hover p-2 rounded-lg text-gray-400 hover:text-red-400"
          >
            <FiTrash2 size={16} />
          </button>
        </div>
      </motion.div>
    ))}
  </div>
);

const ContentList = ({ items, onEdit, onDelete }) => (
  <div className="space-y-3">
    {items.map((item) => (
      <motion.div
        key={item.id}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="card-minimal flex items-start justify-between gap-4"
      >
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="tag-sm text-primary-500">{item.key}</span>
            <span className="text-xs text-gray-600">{item.type}</span>
            <span className="text-xs text-gray-600">• {item.page}</span>
          </div>
          <p className="text-sm text-gray-400 line-clamp-2">{item.content}</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => onEdit(item)} className="glass-hover p-2 rounded-lg text-gray-400 hover:text-white">
            <FiEdit2 size={16} />
          </button>
          <button onClick={() => onDelete(item.id)} className="glass-hover p-2 rounded-lg text-gray-400 hover:text-red-400">
            <FiTrash2 size={16} />
          </button>
        </div>
      </motion.div>
    ))}
  </div>
);

const AboutList = ({ items, onEdit, onDelete }) => (
  <div className="space-y-3">
    {items.map((item) => (
      <motion.div
        key={item.id}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="card-minimal flex items-start justify-between gap-4"
      >
        <div className="flex-1">
          <h3 className="font-semibold text-white mb-1">{item.title}</h3>
          <p className="text-sm text-gray-400 line-clamp-2">{item.content}</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => onEdit(item)} className="glass-hover p-2 rounded-lg text-gray-400 hover:text-white">
            <FiEdit2 size={16} />
          </button>
          <button onClick={() => onDelete(item.id)} className="glass-hover p-2 rounded-lg text-gray-400 hover:text-red-400">
            <FiTrash2 size={16} />
          </button>
        </div>
      </motion.div>
    ))}
  </div>
);

const SkillsList = ({ items, onEdit, onDelete }) => (
  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
    {items.map((item) => (
      <motion.div
        key={item.id}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="card-minimal"
      >
        <div className="flex justify-end gap-1 mb-2">
          <button onClick={() => onEdit(item)} className="glass-hover p-1.5 rounded text-gray-400 hover:text-white">
            <FiEdit2 size={14} />
          </button>
          <button onClick={() => onDelete(item.id)} className="glass-hover p-1.5 rounded text-gray-400 hover:text-red-400">
            <FiTrash2 size={14} />
          </button>
        </div>
        <div className="text-center">
          <div className="font-semibold text-white mb-1">{item.name}</div>
          <div className="text-xs text-gray-500 mb-2">{item.category}</div>
          <div className="text-xs text-primary-500">{item.level}%</div>
        </div>
      </motion.div>
    ))}
  </div>
);

// Input Components
const Input = ({ label, className = '', ...props }) => (
  <div className={className}>
    {label && <label className="block text-sm font-medium text-gray-300 mb-2">{label}</label>}
    <input
      {...props}
      className="w-full px-4 py-2.5 bg-dark-800 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 transition-colors"
    />
  </div>
);

const Textarea = ({ label, ...props }) => (
  <div>
    {label && <label className="block text-sm font-medium text-gray-300 mb-2">{label}</label>}
    <textarea
      {...props}
      className="w-full px-4 py-2.5 bg-dark-800 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 transition-colors custom-scrollbar resize-none"
    />
  </div>
);

export default AdminNew;
