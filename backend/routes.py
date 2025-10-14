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


# Initialize default data endpoint
@api.route('/init-data', methods=['POST'])
def initialize_data():
    """Инициализация базы данных начальными данными"""
    try:
        # Проверяем, есть ли уже данные
        if Project.query.first() is not None:
            return jsonify({'message': 'Data already exists', 'status': 'skipped'}), 200
        
        # Проекты-примеры
        projects = [
            Project(
                title='Portfolio Website',
                description='Modern portfolio website with admin panel built with React and Flask. Features include dynamic content management, projects showcase, skills display, and contact form.',
                short_description='Personal portfolio with CMS',
                technologies=['React', 'Flask', 'PostgreSQL', 'TailwindCSS'],
                github_url='https://github.com/yourusername/portfolio',
                demo_url='https://yourportfolio.com',
                category='Web Application',
                featured=True,
                order=1
            ),
            Project(
                title='E-Commerce Platform',
                description='Full-featured e-commerce platform with product catalog, shopping cart, payment integration, and order management.',
                short_description='Online store with Stripe integration',
                technologies=['React', 'Node.js', 'MongoDB', 'Stripe'],
                category='Web Application',
                featured=True,
                order=2
            ),
            Project(
                title='Task Manager',
                description='Collaborative task management application with real-time updates using WebSockets.',
                short_description='Team collaboration tool',
                technologies=['React', 'Express', 'Socket.io', 'MongoDB'],
                category='Web Application',
                featured=False,
                order=3
            ),
        ]
        
        # Навыки
        skills = [
            Skill(name='React', category='Frontend', level=90, icon='⚛️', order=1),
            Skill(name='JavaScript', category='Frontend', level=95, icon='🟨', order=2),
            Skill(name='TypeScript', category='Frontend', level=85, icon='🔷', order=3),
            Skill(name='TailwindCSS', category='Frontend', level=90, icon='🎨', order=4),
            Skill(name='Python', category='Backend', level=90, icon='🐍', order=5),
            Skill(name='Flask', category='Backend', level=85, icon='🌶️', order=6),
            Skill(name='PostgreSQL', category='Backend', level=80, icon='🐘', order=7),
            Skill(name='MongoDB', category='Backend', level=75, icon='🍃', order=8),
            Skill(name='Git', category='Tools', level=90, icon='📚', order=9),
            Skill(name='Docker', category='Tools', level=75, icon='🐳', order=10),
        ]
        
        # Секции About
        about_sections = [
            AboutSection(
                section_key='intro',
                title='About Me',
                content='I am a passionate Full Stack Developer with expertise in building modern, scalable web applications. I love creating elegant solutions to complex problems.',
                icon='👨‍💻',
                order=1
            ),
            AboutSection(
                section_key='experience',
                title='Experience',
                content='5+ years of experience in web development, working with various technologies and frameworks. Specialized in React, Flask, and cloud deployments.',
                icon='💼',
                order=2
            ),
            AboutSection(
                section_key='education',
                title='Education',
                content='Computer Science degree with focus on software engineering and web technologies. Continuous learner, always exploring new technologies.',
                icon='🎓',
                order=3
            ),
        ]
        
        # Контент для главной страницы
        content_blocks = [
            ContentBlock(
                key='hero_greeting',
                type='text',
                content='$ whoami',
                page='home',
                order=1
            ),
            ContentBlock(
                key='hero_name',
                type='heading',
                content='Full Stack Developer',
                page='home',
                order=2
            ),
            ContentBlock(
                key='hero_title',
                type='text',
                content='Building Modern Web Experiences',
                page='home',
                order=3
            ),
            ContentBlock(
                key='hero_description',
                type='text',
                content='I create beautiful, functional, and user-friendly websites and applications using the latest technologies.',
                page='home',
                order=4
            ),
        ]
        
        # Добавляем все в БД
        for project in projects:
            db.session.add(project)
        for skill in skills:
            db.session.add(skill)
        for section in about_sections:
            db.session.add(section)
        for block in content_blocks:
            db.session.add(block)
        
        db.session.commit()
        
        return jsonify({
            'message': 'Default data initialized successfully',
            'data': {
                'projects': len(projects),
                'skills': len(skills),
                'about_sections': len(about_sections),
                'content_blocks': len(content_blocks)
            }
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500
