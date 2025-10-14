from extensions import db
from datetime import datetime

class SiteSetting(db.Model):
    __tablename__ = 'site_settings'
    __table_args__ = {'extend_existing': True}
    
    id = db.Column(db.Integer, primary_key=True)
    key = db.Column(db.String(100), unique=True, nullable=False)
    value = db.Column(db.Text, nullable=True)
    category = db.Column(db.String(50), nullable=False)  # hero, about, contact, social, seo, footer
    label = db.Column(db.String(200), nullable=False)
    field_type = db.Column(db.String(20), default='text')  # text, textarea, url, email
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'key': self.key,
            'value': self.value,
            'category': self.category,
            'label': self.label,
            'field_type': self.field_type,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }

class PageContent(db.Model):
    __tablename__ = 'page_content'
    __table_args__ = {'extend_existing': True}
    
    id = db.Column(db.Integer, primary_key=True)
    page = db.Column(db.String(50), nullable=False)  # home, about, projects, blog, resume, contact
    section = db.Column(db.String(100), nullable=False)  # hero, features, testimonials, etc
    key = db.Column(db.String(100), nullable=False)
    value = db.Column(db.Text, nullable=True)
    order = db.Column(db.Integer, default=0)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'page': self.page,
            'section': self.section,
            'key': self.key,
            'value': self.value,
            'order': self.order,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }

class ButtonConfig(db.Model):
    __tablename__ = 'button_configs'
    __table_args__ = {'extend_existing': True}
    
    id = db.Column(db.Integer, primary_key=True)
    page = db.Column(db.String(50), nullable=False)
    button_id = db.Column(db.String(100), nullable=False)  # unique identifier
    text = db.Column(db.String(200), nullable=False)
    url = db.Column(db.String(500), nullable=True)
    style = db.Column(db.String(50), default='primary')  # primary, secondary, outline
    icon = db.Column(db.String(50), nullable=True)
    visible = db.Column(db.Boolean, default=True)
    order = db.Column(db.Integer, default=0)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'page': self.page,
            'button_id': self.button_id,
            'text': self.text,
            'url': self.url,
            'style': self.style,
            'icon': self.icon,
            'visible': self.visible,
            'order': self.order
        }
