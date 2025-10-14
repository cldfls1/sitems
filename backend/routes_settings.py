from flask import Blueprint, request, jsonify
from extensions import db
from models_settings import SiteSetting, PageContent, ButtonConfig

settings_bp = Blueprint('settings', __name__)

# ============= SITE SETTINGS =============

@settings_bp.route('/api/settings', methods=['GET'])
def get_all_settings():
    """Get all site settings grouped by category"""
    try:
        settings = SiteSetting.query.all()
        grouped = {}
        for setting in settings:
            if setting.category not in grouped:
                grouped[setting.category] = []
            grouped[setting.category].append(setting.to_dict())
        return jsonify(grouped), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@settings_bp.route('/api/settings/<category>', methods=['GET'])
def get_settings_by_category(category):
    """Get settings by category"""
    try:
        settings = SiteSetting.query.filter_by(category=category).all()
        return jsonify([s.to_dict() for s in settings]), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@settings_bp.route('/api/settings', methods=['POST'])
def create_or_update_setting():
    """Create or update a setting"""
    try:
        data = request.json
        setting = SiteSetting.query.filter_by(key=data['key']).first()
        
        if setting:
            # Update existing
            setting.value = data.get('value', setting.value)
            setting.category = data.get('category', setting.category)
            setting.label = data.get('label', setting.label)
            setting.field_type = data.get('field_type', setting.field_type)
        else:
            # Create new
            setting = SiteSetting(
                key=data['key'],
                value=data.get('value'),
                category=data['category'],
                label=data['label'],
                field_type=data.get('field_type', 'text')
            )
            db.session.add(setting)
        
        db.session.commit()
        return jsonify(setting.to_dict()), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@settings_bp.route('/api/settings/bulk', methods=['POST'])
def bulk_update_settings():
    """Bulk update multiple settings"""
    try:
        data = request.json
        updated = []
        
        for item in data:
            setting = SiteSetting.query.filter_by(key=item['key']).first()
            if setting:
                setting.value = item['value']
                updated.append(setting.to_dict())
        
        db.session.commit()
        return jsonify({'updated': len(updated), 'settings': updated}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

# ============= PAGE CONTENT =============

@settings_bp.route('/api/content/<page>', methods=['GET'])
def get_page_content(page):
    """Get all content for a specific page"""
    try:
        content = PageContent.query.filter_by(page=page).order_by(PageContent.order).all()
        return jsonify([c.to_dict() for c in content]), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@settings_bp.route('/api/content/<page>/<section>', methods=['GET'])
def get_section_content(page, section):
    """Get content for a specific page section"""
    try:
        content = PageContent.query.filter_by(page=page, section=section).order_by(PageContent.order).all()
        return jsonify([c.to_dict() for c in content]), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@settings_bp.route('/api/content', methods=['POST'])
def create_or_update_content():
    """Create or update page content"""
    try:
        data = request.json
        content = PageContent.query.filter_by(
            page=data['page'],
            section=data['section'],
            key=data['key']
        ).first()
        
        if content:
            content.value = data.get('value', content.value)
            content.order = data.get('order', content.order)
        else:
            content = PageContent(
                page=data['page'],
                section=data['section'],
                key=data['key'],
                value=data.get('value'),
                order=data.get('order', 0)
            )
            db.session.add(content)
        
        db.session.commit()
        return jsonify(content.to_dict()), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@settings_bp.route('/api/content/bulk', methods=['POST'])
def bulk_update_content():
    """Bulk update page content"""
    try:
        data = request.json
        updated = []
        
        for item in data:
            content = PageContent.query.filter_by(
                page=item['page'],
                section=item['section'],
                key=item['key']
            ).first()
            
            if content:
                content.value = item['value']
                updated.append(content.to_dict())
        
        db.session.commit()
        return jsonify({'updated': len(updated), 'content': updated}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

# ============= BUTTONS =============

@settings_bp.route('/api/buttons/<page>', methods=['GET'])
def get_page_buttons(page):
    """Get all buttons for a page"""
    try:
        buttons = ButtonConfig.query.filter_by(page=page).order_by(ButtonConfig.order).all()
        return jsonify([b.to_dict() for b in buttons]), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@settings_bp.route('/api/buttons', methods=['POST'])
def create_or_update_button():
    """Create or update button config"""
    try:
        data = request.json
        button = ButtonConfig.query.filter_by(
            page=data['page'],
            button_id=data['button_id']
        ).first()
        
        if button:
            button.text = data.get('text', button.text)
            button.url = data.get('url', button.url)
            button.style = data.get('style', button.style)
            button.icon = data.get('icon', button.icon)
            button.visible = data.get('visible', button.visible)
            button.order = data.get('order', button.order)
        else:
            button = ButtonConfig(
                page=data['page'],
                button_id=data['button_id'],
                text=data['text'],
                url=data.get('url'),
                style=data.get('style', 'primary'),
                icon=data.get('icon'),
                visible=data.get('visible', True),
                order=data.get('order', 0)
            )
            db.session.add(button)
        
        db.session.commit()
        return jsonify(button.to_dict()), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@settings_bp.route('/api/buttons/<int:button_id>', methods=['DELETE'])
def delete_button(button_id):
    """Delete a button"""
    try:
        button = ButtonConfig.query.get(button_id)
        if not button:
            return jsonify({'error': 'Button not found'}), 404
        
        db.session.delete(button)
        db.session.commit()
        return jsonify({'message': 'Button deleted'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

# ============= INITIALIZATION =============

@settings_bp.route('/api/settings/init', methods=['POST'])
def initialize_default_settings():
    """Initialize default settings (run once)"""
    try:
        default_settings = [
            # Hero Section
            {'key': 'hero_title', 'value': 'Agentic Coding Platform', 'category': 'hero', 'label': 'Main Title', 'field_type': 'text'},
            {'key': 'hero_subtitle', 'value': 'Full Stack Developer', 'category': 'hero', 'label': 'Subtitle', 'field_type': 'text'},
            {'key': 'hero_description', 'value': 'Think Deeper. Build Better.', 'category': 'hero', 'label': 'Description', 'field_type': 'textarea'},
            
            # About
            {'key': 'about_title', 'value': 'About Me', 'category': 'about', 'label': 'Title', 'field_type': 'text'},
            {'key': 'about_description', 'value': 'I\'m a passionate Full Stack Developer', 'category': 'about', 'label': 'Description', 'field_type': 'textarea'},
            
            # Contact
            {'key': 'contact_email', 'value': 'hello@miracle.dev', 'category': 'contact', 'label': 'Email', 'field_type': 'email'},
            {'key': 'contact_phone', 'value': '+1 (555) 123-4567', 'category': 'contact', 'label': 'Phone', 'field_type': 'text'},
            {'key': 'contact_location', 'value': 'San Francisco, CA', 'category': 'contact', 'label': 'Location', 'field_type': 'text'},
            
            # Social
            {'key': 'social_github', 'value': 'https://github.com/yourusername', 'category': 'social', 'label': 'GitHub URL', 'field_type': 'url'},
            {'key': 'social_linkedin', 'value': 'https://linkedin.com/in/yourusername', 'category': 'social', 'label': 'LinkedIn URL', 'field_type': 'url'},
            {'key': 'social_twitter', 'value': 'https://twitter.com/yourusername', 'category': 'social', 'label': 'Twitter URL', 'field_type': 'url'},
            
            # SEO
            {'key': 'seo_title', 'value': 'Miracle - Full Stack Developer Portfolio', 'category': 'seo', 'label': 'Site Title', 'field_type': 'text'},
            {'key': 'seo_description', 'value': 'Full Stack Developer specializing in React, Node.js', 'category': 'seo', 'label': 'Site Description', 'field_type': 'textarea'},
            {'key': 'seo_keywords', 'value': 'web developer, full stack, react, node.js', 'category': 'seo', 'label': 'Keywords', 'field_type': 'text'},
            
            # Footer
            {'key': 'footer_text', 'value': 'Building amazing digital experiences', 'category': 'footer', 'label': 'Footer Text', 'field_type': 'textarea'},
        ]
        
        for item in default_settings:
            existing = SiteSetting.query.filter_by(key=item['key']).first()
            if not existing:
                setting = SiteSetting(**item)
                db.session.add(setting)
        
        db.session.commit()
        return jsonify({'message': 'Default settings initialized'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500
