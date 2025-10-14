from extensions import db
from datetime import datetime

class ContentBlock(db.Model):
    """Универсальная модель для всех редактируемых элементов сайта"""
    __tablename__ = 'content_blocks'
    
    id = db.Column(db.Integer, primary_key=True)
    key = db.Column(db.String(100), unique=True, nullable=False)  # уникальный ключ для идентификации
    type = db.Column(db.String(50), nullable=False)  # text, button, card, heading, etc.
    content = db.Column(db.Text, nullable=False)
    page = db.Column(db.String(50), nullable=False)  # home, about, projects, etc.
    order = db.Column(db.Integer, default=0)  # порядок отображения
    meta_data = db.Column(db.JSON, nullable=True)  # дополнительные данные (ссылки, изображения и т.д.)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'key': self.key,
            'type': self.type,
            'content': self.content,
            'page': self.page,
            'order': self.order,
            'metadata': self.meta_data,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }


class Project(db.Model):
    """Модель для проектов портфолио"""
    __tablename__ = 'projects'
    
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text, nullable=False)
    short_description = db.Column(db.String(300), nullable=True)
    image_url = db.Column(db.String(500), nullable=True)
    demo_url = db.Column(db.String(500), nullable=True)
    github_url = db.Column(db.String(500), nullable=True)
    technologies = db.Column(db.JSON, nullable=True)  # список технологий
    category = db.Column(db.String(100), nullable=True)
    featured = db.Column(db.Boolean, default=False)
    order = db.Column(db.Integer, default=0)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'short_description': self.short_description,
            'image_url': self.image_url,
            'demo_url': self.demo_url,
            'github_url': self.github_url,
            'technologies': self.technologies or [],
            'category': self.category,
            'featured': self.featured,
            'order': self.order,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }


class AboutSection(db.Model):
    """Модель для секций страницы 'Обо мне'"""
    __tablename__ = 'about_sections'
    
    id = db.Column(db.Integer, primary_key=True)
    section_key = db.Column(db.String(100), unique=True, nullable=False)
    title = db.Column(db.String(200), nullable=False)
    content = db.Column(db.Text, nullable=False)
    icon = db.Column(db.String(100), nullable=True)
    order = db.Column(db.Integer, default=0)
    meta_data = db.Column(db.JSON, nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'section_key': self.section_key,
            'title': self.title,
            'content': self.content,
            'icon': self.icon,
            'order': self.order,
            'metadata': self.meta_data,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }


class Skill(db.Model):
    """Модель для навыков"""
    __tablename__ = 'skills'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    category = db.Column(db.String(100), nullable=False)  # frontend, backend, tools, etc.
    level = db.Column(db.Integer, default=50)  # 0-100
    icon = db.Column(db.String(100), nullable=True)
    order = db.Column(db.Integer, default=0)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'category': self.category,
            'level': self.level,
            'icon': self.icon,
            'order': self.order
        }


class SiteSettings(db.Model):
    """Глобальные настройки сайта"""
    __tablename__ = 'site_settings'
    
    id = db.Column(db.Integer, primary_key=True)
    key = db.Column(db.String(100), unique=True, nullable=False)
    value = db.Column(db.Text, nullable=False)
    description = db.Column(db.String(500), nullable=True)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'key': self.key,
            'value': self.value,
            'description': self.description,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }
