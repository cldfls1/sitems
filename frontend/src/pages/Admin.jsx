import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiEdit2, FiTrash2, FiPlus, FiSave, FiFileText, FiFolder, FiCode, FiDatabase, FiSettings, FiStar } from 'react-icons/fi';
import Modal from '../components/Modal';
import Toast from '../components/Toast';
import {
  getContentBlocks, updateContentBlock, createContentBlock, deleteContentBlock,
  getProjects, updateProject, createProject, deleteProject,
  getAboutSections, updateAboutSection, createAboutSection, deleteAboutSection,
  getSkills, updateSkill, createSkill, deleteSkill,
  getSettings, createOrUpdateSetting
} from '../utils/api';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('projects');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  useEffect(() => {
    loadData();
  }, [activeTab]);

  const loadData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'content') {
        const data = await getContentBlocks();
        setContentBlocks(data);
      } else if (activeTab === 'projects') {
        const data = await getProjects();
        setProjects(data);
      } else if (activeTab === 'about') {
        const data = await getAboutSections();
        setAboutSections(data);
      } else if (activeTab === 'skills') {
        const data = await getSkills();
        setSkills(data);
      } else if (activeTab === 'settings') {
        const data = await getSettings();
        setSettings(data);
      }
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (item, type) => {
    try {
      if (isCreating) {
        if (type === 'content') {
          await createContentBlock(item);
        } else if (type === 'project') {
          await createProject(item);
        } else if (type === 'about') {
          await createAboutSection(item);
        } else if (type === 'skill') {
          await createSkill(item);
        }
      } else {
        if (type === 'content') {
          await updateContentBlock(item.id, item);
        } else if (type === 'project') {
          await updateProject(item.id, item);
        } else if (type === 'about') {
          await updateAboutSection(item.id, item);
        } else if (type === 'skill') {
          await updateSkill(item.id, item);
        }
      }
      setEditingItem(null);
      setIsCreating(false);
      loadData();
    } catch (error) {
      console.error('Error saving:', error);
      alert('Error saving data: ' + error.message);
    }
  };

  const handleDelete = async (id, type) => {
    if (!confirm('Are you sure you want to delete this item?')) return;
    
    try {
      if (type === 'content') {
        await deleteContentBlock(id);
      } else if (type === 'project') {
        await deleteProject(id);
      } else if (type === 'about') {
        await deleteAboutSection(id);
      } else if (type === 'skill') {
        await deleteSkill(id);
      }
      loadData();
    } catch (error) {
      console.error('Error deleting:', error);
      alert('Error deleting item');
    }
  };

  const tabs = [
    { id: 'content', name: 'Content Blocks', icon: FiFileText },
    { id: 'projects', name: 'Projects', icon: FiFolder },
    { id: 'about', name: 'About Sections', icon: FiCode },
    { id: 'skills', name: 'Skills', icon: FiDatabase },
    { id: 'settings', name: 'Settings', icon: FiSettings },
  ];

  return (
    <div className="min-h-screen page-transition pt-24 pb-16">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="terminal text-primary-800 mb-4">$ sudo nano content</div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
            Admin Panel
          </h1>
          <p className="text-gray-400">
            Manage all content, projects, and settings
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="glass-strong rounded-xl p-2 mb-8 overflow-x-auto">
          <div className="flex gap-2 min-w-max">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setEditingItem(null);
                  setIsCreating(false);
                }}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all terminal ${
                  activeTab === tab.id
                    ? 'bg-primary-900/30 text-primary-700 glow-green'
                    : 'text-gray-400 hover:text-primary-700 hover:bg-white/5'
                }`}
              >
                <tab.icon />
                <span>{tab.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="glass-strong rounded-xl p-6 md:p-8">
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="flex gap-2">
                <div className="w-3 h-3 bg-primary-700 rounded-full loading-dot"></div>
                <div className="w-3 h-3 bg-primary-700 rounded-full loading-dot"></div>
                <div className="w-3 h-3 bg-primary-700 rounded-full loading-dot"></div>
              </div>
            </div>
          ) : (
            <>
              {/* Add New Button */}
              {activeTab !== 'settings' && (
                <div className="mb-6">
                  <button
                    onClick={() => {
                      setIsCreating(true);
                      setEditingItem(getEmptyItem(activeTab));
                    }}
                    className="btn-primary flex items-center gap-2"
                  >
                    <FiPlus />
                    <span>Add New</span>
                  </button>
                </div>
              )}

              {/* Content Blocks */}
              {activeTab === 'content' && (
                <ContentBlocksList
                  items={contentBlocks}
                  editingItem={editingItem}
                  isCreating={isCreating}
                  onEdit={setEditingItem}
                  onSave={(item) => handleSave(item, 'content')}
                  onDelete={(id) => handleDelete(id, 'content')}
                  onCancel={() => {
                    setEditingItem(null);
                    setIsCreating(false);
                  }}
                />
              )}

              {/* Projects */}
              {activeTab === 'projects' && (
                <ProjectsList
                  items={projects}
                  editingItem={editingItem}
                  isCreating={isCreating}
                  onEdit={setEditingItem}
                  onSave={(item) => handleSave(item, 'project')}
                  onDelete={(id) => handleDelete(id, 'project')}
                  onCancel={() => {
                    setEditingItem(null);
                    setIsCreating(false);
                  }}
                />
              )}

              {/* About Sections */}
              {activeTab === 'about' && (
                <AboutSectionsList
                  items={aboutSections}
                  editingItem={editingItem}
                  isCreating={isCreating}
                  onEdit={setEditingItem}
                  onSave={(item) => handleSave(item, 'about')}
                  onDelete={(id) => handleDelete(id, 'about')}
                  onCancel={() => {
                    setEditingItem(null);
                    setIsCreating(false);
                  }}
                />
              )}

              {/* Skills */}
              {activeTab === 'skills' && (
                <SkillsList
                  items={skills}
                  editingItem={editingItem}
                  isCreating={isCreating}
                  onEdit={setEditingItem}
                  onSave={(item) => handleSave(item, 'skill')}
                  onDelete={(id) => handleDelete(id, 'skill')}
                  onCancel={() => {
                    setEditingItem(null);
                    setIsCreating(false);
                  }}
                />
              )}

              {/* Settings */}
              {activeTab === 'settings' && (
                <SettingsList settings={settings} onSave={createOrUpdateSetting} />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

// Helper function to get empty item template
const getEmptyItem = (type) => {
  const templates = {
    content: { key: '', type: 'text', content: '', page: 'home', order: 0, metadata: null },
    projects: { 
      title: '', 
      description: '', 
      short_description: '', 
      image_url: '', 
      demo_url: '', 
      github_url: '', 
      technologies: [], 
      category: '', 
      featured: false, 
      order: 0 
    },
    about: { section_key: '', title: '', content: '', icon: '', order: 0, metadata: null },
    skills: { name: '', category: '', level: 50, icon: '', order: 0 },
  };
  return templates[type] || {};
};

// Content Blocks List Component
const ContentBlocksList = ({ items, editingItem, isCreating, onEdit, onSave, onDelete, onCancel }) => {
  return (
    <div className="space-y-4">
      {editingItem && (
        <EditContentBlock
          item={editingItem}
          isCreating={isCreating}
          onSave={onSave}
          onCancel={onCancel}
          onChange={(updated) => onEdit(updated)}
        />
      )}

      {items.map((item) => (
        <div key={item.id} className="glass rounded-lg p-4 flex justify-between items-start gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="terminal text-primary-700 text-sm">{item.key}</span>
              <span className="text-xs bg-primary-900/20 text-primary-800 px-2 py-1 rounded">
                {item.type}
              </span>
              <span className="text-xs text-gray-500">{item.page}</span>
            </div>
            <p className="text-white line-clamp-2">{item.content}</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => onEdit(item)}
              className="p-2 glass-hover rounded-lg text-primary-700 hover:text-primary-600"
            >
              <FiEdit2 />
            </button>
            <button
              onClick={() => onDelete(item.id)}
              className="p-2 glass-hover rounded-lg text-red-400 hover:text-red-300"
            >
              <FiTrash2 />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

// Edit Content Block Component
const EditContentBlock = ({ item, isCreating, onSave, onCancel, onChange }) => {
  return (
    <div className="glass-strong rounded-lg p-6 mb-6">
      <h3 className="text-xl font-bold mb-4 text-primary-700">
        {isCreating ? 'Create New Content Block' : 'Edit Content Block'}
      </h3>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Key"
          value={item.key}
          onChange={(e) => onChange({ ...item, key: e.target.value })}
          className="w-full px-4 py-2 bg-dark-800 rounded-lg border border-primary-900/30 text-white"
        />
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Type"
            value={item.type}
            onChange={(e) => onChange({ ...item, type: e.target.value })}
            className="px-4 py-2 bg-dark-800 rounded-lg border border-primary-900/30 text-white"
          />
          <input
            type="text"
            placeholder="Page"
            value={item.page}
            onChange={(e) => onChange({ ...item, page: e.target.value })}
            className="px-4 py-2 bg-dark-800 rounded-lg border border-primary-900/30 text-white"
          />
        </div>
        <textarea
          placeholder="Content"
          value={item.content}
          onChange={(e) => onChange({ ...item, content: e.target.value })}
          rows="4"
          className="w-full px-4 py-2 bg-dark-800 rounded-lg border border-primary-900/30 text-white custom-scrollbar"
        />
        <input
          type="number"
          placeholder="Order"
          value={item.order}
          onChange={(e) => onChange({ ...item, order: parseInt(e.target.value) })}
          className="w-full px-4 py-2 bg-dark-800 rounded-lg border border-primary-900/30 text-white"
        />
        <div className="flex gap-4">
          <button onClick={() => onSave(item)} className="btn-primary flex items-center gap-2">
            <FiSave /> Save
          </button>
          <button onClick={onCancel} className="btn-secondary flex items-center gap-2">
            <FiX /> Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

// Similar components for Projects, About, Skills...
const ProjectsList = ({ items, editingItem, isCreating, onEdit, onSave, onDelete, onCancel }) => {
  if (editingItem) {
    return <EditProject item={editingItem} isCreating={isCreating} onSave={onSave} onCancel={onCancel} onChange={onEdit} />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {items.map((item) => (
        <div key={item.id} className="glass rounded-lg p-4">
          <div className="flex justify-between items-start mb-2">
            <h4 className="font-bold text-white">{item.title}</h4>
            <div className="flex gap-2">
              <button onClick={() => onEdit(item)} className="p-2 glass-hover rounded text-primary-700">
                <FiEdit2 />
              </button>
              <button onClick={() => onDelete(item.id)} className="p-2 glass-hover rounded text-red-400">
                <FiTrash2 />
              </button>
            </div>
          </div>
          <p className="text-gray-400 text-sm line-clamp-2 mb-2">{item.short_description}</p>
          {item.category && <span className="text-xs terminal text-primary-800">{item.category}</span>}
        </div>
      ))}
    </div>
  );
};

const EditProject = ({ item, isCreating, onSave, onCancel, onChange }) => {
  return (
    <div className="glass-strong rounded-lg p-6 mb-6 space-y-4">
      <h3 className="text-xl font-bold text-primary-700">
        {isCreating ? 'Create New Project' : 'Edit Project'}
      </h3>
      <input
        type="text"
        placeholder="Title"
        value={item.title}
        onChange={(e) => onChange({ ...item, title: e.target.value })}
        className="w-full px-4 py-2 bg-dark-800 rounded-lg border border-primary-900/30 text-white"
      />
      <textarea
        placeholder="Description"
        value={item.description}
        onChange={(e) => onChange({ ...item, description: e.target.value })}
        rows="3"
        className="w-full px-4 py-2 bg-dark-800 rounded-lg border border-primary-900/30 text-white custom-scrollbar"
      />
      <input
        type="text"
        placeholder="Short Description"
        value={item.short_description}
        onChange={(e) => onChange({ ...item, short_description: e.target.value })}
        className="w-full px-4 py-2 bg-dark-800 rounded-lg border border-primary-900/30 text-white"
      />
      <div className="grid grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Image URL"
          value={item.image_url}
          onChange={(e) => onChange({ ...item, image_url: e.target.value })}
          className="px-4 py-2 bg-dark-800 rounded-lg border border-primary-900/30 text-white"
        />
        <input
          type="text"
          placeholder="Demo URL"
          value={item.demo_url}
          onChange={(e) => onChange({ ...item, demo_url: e.target.value })}
          className="px-4 py-2 bg-dark-800 rounded-lg border border-primary-900/30 text-white"
        />
      </div>
      <input
        type="text"
        placeholder="GitHub URL"
        value={item.github_url}
        onChange={(e) => onChange({ ...item, github_url: e.target.value })}
        className="w-full px-4 py-2 bg-dark-800 rounded-lg border border-primary-900/30 text-white"
      />
      <input
        type="text"
        placeholder="Technologies (comma separated)"
        value={Array.isArray(item.technologies) ? item.technologies.join(', ') : ''}
        onChange={(e) => onChange({ ...item, technologies: e.target.value.split(',').map(t => t.trim()) })}
        className="w-full px-4 py-2 bg-dark-800 rounded-lg border border-primary-900/30 text-white"
      />
      <div className="grid grid-cols-3 gap-4">
        <input
          type="text"
          placeholder="Category"
          value={item.category}
          onChange={(e) => onChange({ ...item, category: e.target.value })}
          className="px-4 py-2 bg-dark-800 rounded-lg border border-primary-900/30 text-white"
        />
        <input
          type="number"
          placeholder="Order"
          value={item.order}
          onChange={(e) => onChange({ ...item, order: parseInt(e.target.value) })}
          className="px-4 py-2 bg-dark-800 rounded-lg border border-primary-900/30 text-white"
        />
        <label className="flex items-center gap-2 px-4 py-2 glass-hover rounded-lg">
          <input
            type="checkbox"
            checked={item.featured}
            onChange={(e) => onChange({ ...item, featured: e.target.checked })}
            className="w-4 h-4"
          />
          <span className="text-white">Featured</span>
        </label>
      </div>
      <div className="flex gap-4">
        <button onClick={() => onSave(item)} className="btn-primary flex items-center gap-2">
          <FiSave /> Save
        </button>
        <button onClick={onCancel} className="btn-secondary flex items-center gap-2">
          <FiX /> Cancel
        </button>
      </div>
    </div>
  );
};

const AboutSectionsList = ({ items, editingItem, isCreating, onEdit, onSave, onDelete, onCancel }) => {
  if (editingItem) {
    return <EditAboutSection item={editingItem} isCreating={isCreating} onSave={onSave} onCancel={onCancel} onChange={onEdit} />;
  }

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div key={item.id} className="glass rounded-lg p-4 flex justify-between items-start gap-4">
          <div className="flex-1">
            <h4 className="font-bold text-white mb-2">{item.title}</h4>
            <p className="text-gray-400 text-sm line-clamp-2">{item.content}</p>
          </div>
          <div className="flex gap-2">
            <button onClick={() => onEdit(item)} className="p-2 glass-hover rounded text-primary-700">
              <FiEdit2 />
            </button>
            <button onClick={() => onDelete(item.id)} className="p-2 glass-hover rounded text-red-400">
              <FiTrash2 />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

const EditAboutSection = ({ item, isCreating, onSave, onCancel, onChange }) => {
  return (
    <div className="glass-strong rounded-lg p-6 mb-6 space-y-4">
      <h3 className="text-xl font-bold text-primary-700">
        {isCreating ? 'Create New About Section' : 'Edit About Section'}
      </h3>
      <input
        type="text"
        placeholder="Section Key"
        value={item.section_key}
        onChange={(e) => onChange({ ...item, section_key: e.target.value })}
        className="w-full px-4 py-2 bg-dark-800 rounded-lg border border-primary-900/30 text-white"
      />
      <input
        type="text"
        placeholder="Title"
        value={item.title}
        onChange={(e) => onChange({ ...item, title: e.target.value })}
        className="w-full px-4 py-2 bg-dark-800 rounded-lg border border-primary-900/30 text-white"
      />
      <textarea
        placeholder="Content"
        value={item.content}
        onChange={(e) => onChange({ ...item, content: e.target.value })}
        rows="4"
        className="w-full px-4 py-2 bg-dark-800 rounded-lg border border-primary-900/30 text-white custom-scrollbar"
      />
      <div className="grid grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Icon (emoji or icon name)"
          value={item.icon}
          onChange={(e) => onChange({ ...item, icon: e.target.value })}
          className="px-4 py-2 bg-dark-800 rounded-lg border border-primary-900/30 text-white"
        />
        <input
          type="number"
          placeholder="Order"
          value={item.order}
          onChange={(e) => onChange({ ...item, order: parseInt(e.target.value) })}
          className="px-4 py-2 bg-dark-800 rounded-lg border border-primary-900/30 text-white"
        />
      </div>
      <div className="flex gap-4">
        <button onClick={() => onSave(item)} className="btn-primary flex items-center gap-2">
          <FiSave /> Save
        </button>
        <button onClick={onCancel} className="btn-secondary flex items-center gap-2">
          <FiX /> Cancel
        </button>
      </div>
    </div>
  );
};

const SkillsList = ({ items, editingItem, isCreating, onEdit, onSave, onDelete, onCancel }) => {
  if (editingItem) {
    return <EditSkill item={editingItem} isCreating={isCreating} onSave={onSave} onCancel={onCancel} onChange={onEdit} />;
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {items.map((item) => (
        <div key={item.id} className="glass rounded-lg p-4 text-center">
          <div className="flex justify-end gap-1 mb-2">
            <button onClick={() => onEdit(item)} className="p-1 glass-hover rounded text-primary-700 text-xs">
              <FiEdit2 />
            </button>
            <button onClick={() => onDelete(item.id)} className="p-1 glass-hover rounded text-red-400 text-xs">
              <FiTrash2 />
            </button>
          </div>
          <div className="font-bold text-white mb-1">{item.name}</div>
          <div className="text-xs text-gray-400 mb-2">{item.category}</div>
          <div className="text-xs terminal text-primary-800">{item.level}%</div>
        </div>
      ))}
    </div>
  );
};

const EditSkill = ({ item, isCreating, onSave, onCancel, onChange }) => {
  return (
    <div className="glass-strong rounded-lg p-6 mb-6 space-y-4">
      <h3 className="text-xl font-bold text-primary-700">
        {isCreating ? 'Create New Skill' : 'Edit Skill'}
      </h3>
      <input
        type="text"
        placeholder="Name"
        value={item.name}
        onChange={(e) => onChange({ ...item, name: e.target.value })}
        className="w-full px-4 py-2 bg-dark-800 rounded-lg border border-primary-900/30 text-white"
      />
      <div className="grid grid-cols-3 gap-4">
        <input
          type="text"
          placeholder="Category"
          value={item.category}
          onChange={(e) => onChange({ ...item, category: e.target.value })}
          className="px-4 py-2 bg-dark-800 rounded-lg border border-primary-900/30 text-white"
        />
        <input
          type="number"
          placeholder="Level (0-100)"
          value={item.level}
          onChange={(e) => onChange({ ...item, level: parseInt(e.target.value) })}
          min="0"
          max="100"
          className="px-4 py-2 bg-dark-800 rounded-lg border border-primary-900/30 text-white"
        />
        <input
          type="number"
          placeholder="Order"
          value={item.order}
          onChange={(e) => onChange({ ...item, order: parseInt(e.target.value) })}
          className="px-4 py-2 bg-dark-800 rounded-lg border border-primary-900/30 text-white"
        />
      </div>
      <input
        type="text"
        placeholder="Icon (emoji)"
        value={item.icon}
        onChange={(e) => onChange({ ...item, icon: e.target.value })}
        className="w-full px-4 py-2 bg-dark-800 rounded-lg border border-primary-900/30 text-white"
      />
      <div className="flex gap-4">
        <button onClick={() => onSave(item)} className="btn-primary flex items-center gap-2">
          <FiSave /> Save
        </button>
        <button onClick={onCancel} className="btn-secondary flex items-center gap-2">
          <FiX /> Cancel
        </button>
      </div>
    </div>
  );
};

const SettingsList = ({ settings, onSave }) => {
  const [editedSettings, setEditedSettings] = useState(settings);

  useEffect(() => {
    setEditedSettings(settings);
  }, [settings]);

  const handleSaveSetting = async (key) => {
    try {
      await onSave({ key, value: editedSettings[key] });
      alert('Setting saved successfully');
    } catch (error) {
      alert('Error saving setting');
    }
  };

  return (
    <div className="space-y-4">
      {Object.entries(editedSettings).map(([key, value]) => (
        <div key={key} className="glass rounded-lg p-4">
          <label className="block mb-2 terminal text-primary-700">{key}</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={value}
              onChange={(e) => setEditedSettings({ ...editedSettings, [key]: e.target.value })}
              className="flex-1 px-4 py-2 bg-dark-800 rounded-lg border border-primary-900/30 text-white"
            />
            <button
              onClick={() => handleSaveSetting(key)}
              className="btn-primary flex items-center gap-2"
            >
              <FiSave /> Save
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Admin;
