from flask import Blueprint, request, jsonify
from extensions import db
from models import ContentBlock, Project, AboutSection, Skill, SiteSettings
from sqlalchemy import exc

api = Blueprint('api', __name__)

# ==================== CONTENT BLOCKS ====================

@api.route('/content-blocks', methods=['GET'])
def get_content_blocks():
    """Получить все блоки контента или отфильтровать по странице"""
    page = request.args.get('page')
    if page:
        blocks = ContentBlock.query.filter_by(page=page).order_by(ContentBlock.order).all()
    else:
        blocks = ContentBlock.query.order_by(ContentBlock.page, ContentBlock.order).all()
    return jsonify([block.to_dict() for block in blocks])


@api.route('/content-blocks/<int:id>', methods=['GET'])
def get_content_block(id):
    """Получить конкретный блок контента"""
    block = ContentBlock.query.get_or_404(id)
    return jsonify(block.to_dict())


@api.route('/content-blocks/by-key/<key>', methods=['GET'])
def get_content_block_by_key(key):
    """Получить блок контента по ключу"""
    block = ContentBlock.query.filter_by(key=key).first_or_404()
    return jsonify(block.to_dict())


@api.route('/content-blocks', methods=['POST'])
def create_content_block():
    """Создать новый блок контента"""
    data = request.json
    try:
        block = ContentBlock(
            key=data['key'],
            type=data['type'],
            content=data['content'],
            page=data['page'],
            order=data.get('order', 0),
            meta_data=data.get('metadata')
        )
        db.session.add(block)
        db.session.commit()
        return jsonify(block.to_dict()), 201
    except exc.IntegrityError:
        db.session.rollback()
        return jsonify({'error': 'Content block with this key already exists'}), 400
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 400


@api.route('/content-blocks/<int:id>', methods=['PUT'])
def update_content_block(id):
    """Обновить блок контента"""
    block = ContentBlock.query.get_or_404(id)
    data = request.json
    
    if 'key' in data:
        block.key = data['key']
    if 'type' in data:
        block.type = data['type']
    if 'content' in data:
        block.content = data['content']
    if 'page' in data:
        block.page = data['page']
    if 'order' in data:
        block.order = data['order']
    if 'metadata' in data:
        block.meta_data = data['metadata']
    
    try:
        db.session.commit()
        return jsonify(block.to_dict())
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 400


@api.route('/content-blocks/<int:id>', methods=['DELETE'])
def delete_content_block(id):
    """Удалить блок контента"""
    block = ContentBlock.query.get_or_404(id)
    db.session.delete(block)
    db.session.commit()
    return '', 204


# ==================== PROJECTS ====================

@api.route('/projects', methods=['GET'])
def get_projects():
    """Получить все проекты"""
    featured_only = request.args.get('featured', '').lower() == 'true'
    if featured_only:
        projects = Project.query.filter_by(featured=True).order_by(Project.order).all()
    else:
        projects = Project.query.order_by(Project.order).all()
    return jsonify([project.to_dict() for project in projects])


@api.route('/projects/<int:id>', methods=['GET'])
def get_project(id):
    """Получить конкретный проект"""
    project = Project.query.get_or_404(id)
    return jsonify(project.to_dict())


@api.route('/projects', methods=['POST'])
def create_project():
    """Создать новый проект"""
    data = request.json
    try:
        project = Project(
            title=data['title'],
            description=data['description'],
            short_description=data.get('short_description'),
            image_url=data.get('image_url'),
            demo_url=data.get('demo_url'),
            github_url=data.get('github_url'),
            technologies=data.get('technologies', []),
            category=data.get('category'),
            featured=data.get('featured', False),
            order=data.get('order', 0)
        )
        db.session.add(project)
        db.session.commit()
        return jsonify(project.to_dict()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 400


@api.route('/projects/<int:id>', methods=['PUT'])
def update_project(id):
    """Обновить проект"""
    project = Project.query.get_or_404(id)
    data = request.json
    
    for field in ['title', 'description', 'short_description', 'image_url', 
                  'demo_url', 'github_url', 'technologies', 'category', 'featured', 'order']:
        if field in data:
            setattr(project, field, data[field])
    
    try:
        db.session.commit()
        return jsonify(project.to_dict())
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 400


@api.route('/projects/<int:id>', methods=['DELETE'])
def delete_project(id):
    """Удалить проект"""
    project = Project.query.get_or_404(id)
    db.session.delete(project)
    db.session.commit()
    return '', 204


# ==================== ABOUT SECTIONS ====================

@api.route('/about-sections', methods=['GET'])
def get_about_sections():
    """Получить все секции страницы 'Обо мне'"""
    sections = AboutSection.query.order_by(AboutSection.order).all()
    return jsonify([section.to_dict() for section in sections])


@api.route('/about-sections/<int:id>', methods=['GET'])
def get_about_section(id):
    """Получить конкретную секцию"""
    section = AboutSection.query.get_or_404(id)
    return jsonify(section.to_dict())


@api.route('/about-sections', methods=['POST'])
def create_about_section():
    """Создать новую секцию"""
    data = request.json
    try:
        section = AboutSection(
            section_key=data['section_key'],
            title=data['title'],
            content=data['content'],
            icon=data.get('icon'),
            order=data.get('order', 0),
            meta_data=data.get('metadata')
        )
        db.session.add(section)
        db.session.commit()
        return jsonify(section.to_dict()), 201
    except exc.IntegrityError:
        db.session.rollback()
        return jsonify({'error': 'Section with this key already exists'}), 400
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 400


@api.route('/about-sections/<int:id>', methods=['PUT'])
def update_about_section(id):
    """Обновить секцию"""
    section = AboutSection.query.get_or_404(id)
    data = request.json
    
    for field in ['section_key', 'title', 'content', 'icon', 'order', 'metadata']:
        if field in data:
            setattr(section, field, data[field])
    
    try:
        db.session.commit()
        return jsonify(section.to_dict())
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 400


@api.route('/about-sections/<int:id>', methods=['DELETE'])
def delete_about_section(id):
    """Удалить секцию"""
    section = AboutSection.query.get_or_404(id)
    db.session.delete(section)
    db.session.commit()
    return '', 204


# ==================== SKILLS ====================

@api.route('/skills', methods=['GET'])
def get_skills():
    """Получить все навыки"""
    category = request.args.get('category')
    if category:
        skills = Skill.query.filter_by(category=category).order_by(Skill.order).all()
    else:
        skills = Skill.query.order_by(Skill.category, Skill.order).all()
    return jsonify([skill.to_dict() for skill in skills])


@api.route('/skills/<int:id>', methods=['GET'])
def get_skill(id):
    """Получить конкретный навык"""
    skill = Skill.query.get_or_404(id)
    return jsonify(skill.to_dict())


@api.route('/skills', methods=['POST'])
def create_skill():
    """Создать новый навык"""
    data = request.json
    try:
        skill = Skill(
            name=data['name'],
            category=data['category'],
            level=data.get('level', 50),
            icon=data.get('icon'),
            order=data.get('order', 0)
        )
        db.session.add(skill)
        db.session.commit()
        return jsonify(skill.to_dict()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 400


@api.route('/skills/<int:id>', methods=['PUT'])
def update_skill(id):
    """Обновить навык"""
    skill = Skill.query.get_or_404(id)
    data = request.json
    
    for field in ['name', 'category', 'level', 'icon', 'order']:
        if field in data:
            setattr(skill, field, data[field])
    
    try:
        db.session.commit()
        return jsonify(skill.to_dict())
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 400


@api.route('/skills/<int:id>', methods=['DELETE'])
def delete_skill(id):
    """Удалить навык"""
    skill = Skill.query.get_or_404(id)
    db.session.delete(skill)
    db.session.commit()
    return '', 204


# ==================== SITE SETTINGS ====================

@api.route('/settings', methods=['GET'])
def get_settings():
    """Получить все настройки сайта"""
    settings = SiteSettings.query.all()
    return jsonify({setting.key: setting.value for setting in settings})


@api.route('/settings/<key>', methods=['GET'])
def get_setting(key):
    """Получить конкретную настройку"""
    setting = SiteSettings.query.filter_by(key=key).first_or_404()
    return jsonify(setting.to_dict())


@api.route('/settings', methods=['POST'])
def create_or_update_setting():
    """Создать или обновить настройку"""
    data = request.json
    key = data.get('key')
    value = data.get('value')
    
    if not key or value is None:
        return jsonify({'error': 'Key and value are required'}), 400
    
    setting = SiteSettings.query.filter_by(key=key).first()
    
    if setting:
        setting.value = value
        if 'description' in data:
            setting.description = data['description']
    else:
        setting = SiteSettings(
            key=key,
            value=value,
            description=data.get('description')
        )
        db.session.add(setting)
    
    try:
        db.session.commit()
        return jsonify(setting.to_dict())
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 400


@api.route('/settings/<key>', methods=['DELETE'])
def delete_setting(key):
    """Удалить настройку"""
    setting = SiteSettings.query.filter_by(key=key).first_or_404()
    db.session.delete(setting)
    db.session.commit()
    return '', 204


# ==================== BULK OPERATIONS ====================

@api.route('/admin/bulk-update', methods=['POST'])
def bulk_update():
    """Массовое обновление различных сущностей"""
    data = request.json
    results = {'success': [], 'errors': []}
    
    for item in data.get('items', []):
        try:
            model_type = item.get('model')
            item_id = item.get('id')
            updates = item.get('updates', {})
            
            if model_type == 'content_block':
                obj = ContentBlock.query.get(item_id)
            elif model_type == 'project':
                obj = Project.query.get(item_id)
            elif model_type == 'about_section':
                obj = AboutSection.query.get(item_id)
            elif model_type == 'skill':
                obj = Skill.query.get(item_id)
            else:
                results['errors'].append({'id': item_id, 'error': 'Unknown model type'})
                continue
            
            if not obj:
                results['errors'].append({'id': item_id, 'error': 'Object not found'})
                continue
            
            for field, value in updates.items():
                setattr(obj, field, value)
            
            db.session.commit()
            results['success'].append({'id': item_id, 'model': model_type})
            
        except Exception as e:
            db.session.rollback()
            results['errors'].append({'id': item.get('id'), 'error': str(e)})
    
    return jsonify(results)


# Health check endpoint
@api.route('/health', methods=['GET'])
def health_check():
    """Проверка здоровья API"""
    return jsonify({'status': 'healthy', 'message': 'API is running'})
