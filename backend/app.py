from flask import Flask, jsonify
from flask_cors import CORS
from config import Config
from extensions import db
from routes import api
from routes_settings import settings_bp
import os

def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)
    
    # Initialize extensions
    db.init_app(app)
    CORS(app, resources={
        r"/api/*": {
            "origins": app.config['CORS_ORIGINS'],
            "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
            "allow_headers": ["Content-Type", "Authorization"]
        }
    })
    
    # Register blueprints
    app.register_blueprint(api, url_prefix='/api')
    app.register_blueprint(settings_bp)
    
    # Error handlers
    @app.errorhandler(404)
    def not_found(error):
        return jsonify({'error': 'Not found'}), 404
    
    @app.errorhandler(500)
    def internal_error(error):
        db.session.rollback()
        return jsonify({'error': 'Internal server error'}), 500
    
    # Root endpoint
    @app.route('/')
    def index():
        return jsonify({
            'message': 'Portfolio API',
            'version': '1.0.0',
            'endpoints': {
                'content_blocks': '/api/content-blocks',
                'projects': '/api/projects',
                'about_sections': '/api/about-sections',
                'skills': '/api/skills',
                'settings': '/api/settings',
                'health': '/api/health'
            }
        })
    
    # Create tables
    with app.app_context():
        db.create_all()
        # Initialize default data if needed
        init_default_data()
    
    return app


def init_default_data():
    """Инициализация базы данных начальными данными"""
    from models import ContentBlock, Project, AboutSection, Skill, SiteSettings
    
    # Проверяем, есть ли уже данные
    if ContentBlock.query.first() is not None:
        return
    
    # Настройки сайта
    settings = [
        SiteSettings(key='site_title', value='My Portfolio', description='Название сайта'),
        SiteSettings(key='site_description', value='Full-stack developer portfolio', description='Описание сайта'),
        SiteSettings(key='contact_email', value='your.email@example.com', description='Email для связи'),
        SiteSettings(key='github_url', value='https://github.com/yourusername', description='GitHub профиль'),
        SiteSettings(key='linkedin_url', value='https://linkedin.com/in/yourusername', description='LinkedIn профиль'),
    ]
    
    # Контент для главной страницы
    home_content = [
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
            content='Your Name',
            page='home',
            order=2
        ),
        ContentBlock(
            key='hero_title',
            type='text',
            content='Full-Stack Developer',
            page='home',
            order=3
        ),
        ContentBlock(
            key='hero_description',
            type='text',
            content='I build amazing web experiences with modern technologies',
            page='home',
            order=4
        ),
        ContentBlock(
            key='cta_projects',
            type='button',
            content='View Projects',
            page='home',
            order=5,
            meta_data={'link': '/projects', 'style': 'primary'}
        ),
        ContentBlock(
            key='cta_contact',
            type='button',
            content='Contact Me',
            page='home',
            order=6,
            meta_data={'link': '/contact', 'style': 'secondary'}
        ),
    ]
    
    # Секции About
    about_sections = [
        AboutSection(
            section_key='intro',
            title='About Me',
            content='I am a passionate full-stack developer with expertise in building modern web applications.',
            icon='user',
            order=1
        ),
        AboutSection(
            section_key='experience',
            title='Experience',
            content='5+ years of experience in web development, working with various technologies and frameworks.',
            icon='briefcase',
            order=2
        ),
        AboutSection(
            section_key='education',
            title='Education',
            content='Computer Science degree with focus on software engineering and web technologies.',
            icon='graduation-cap',
            order=3
        ),
    ]
    
    # Навыки
    skills = [
        Skill(name='React', category='Frontend', level=90, order=1),
        Skill(name='JavaScript', category='Frontend', level=95, order=2),
        Skill(name='TypeScript', category='Frontend', level=85, order=3),
        Skill(name='HTML/CSS', category='Frontend', level=95, order=4),
        Skill(name='Python', category='Backend', level=90, order=5),
        Skill(name='Flask', category='Backend', level=85, order=6),
        Skill(name='PostgreSQL', category='Backend', level=80, order=7),
        Skill(name='Git', category='Tools', level=90, order=8),
        Skill(name='Docker', category='Tools', level=75, order=9),
    ]
    
    # Проекты-примеры
    projects = [
        Project(
            title='E-Commerce Platform',
            description='Full-featured e-commerce platform with cart, checkout, and admin panel.',
            short_description='Modern online store with React and Flask',
            technologies=['React', 'Flask', 'PostgreSQL', 'Stripe'],
            category='Web Application',
            featured=True,
            order=1
        ),
        Project(
            title='Task Management App',
            description='Collaborative task management application with real-time updates.',
            short_description='Team collaboration tool',
            technologies=['React', 'Node.js', 'MongoDB', 'Socket.io'],
            category='Web Application',
            featured=True,
            order=2
        ),
        Project(
            title='Weather Dashboard',
            description='Beautiful weather dashboard with forecasts and interactive maps.',
            short_description='Weather app with data visualization',
            technologies=['React', 'OpenWeather API', 'Chart.js'],
            category='Web Application',
            featured=False,
            order=3
        ),
    ]
    
    # Добавляем все в БД
    try:
        for setting in settings:
            db.session.add(setting)
        for block in home_content:
            db.session.add(block)
        for section in about_sections:
            db.session.add(section)
        for skill in skills:
            db.session.add(skill)
        for project in projects:
            db.session.add(project)
        
        db.session.commit()
        print("✓ Default data initialized successfully")
    except Exception as e:
        db.session.rollback()
        print(f"✗ Error initializing default data: {e}")


if __name__ == '__main__':
    app = create_app()
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)
