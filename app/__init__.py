import os
import logging
from flask import Flask, render_template, request, session, redirect, jsonify
from flask_cors import CORS
from flask_migrate import Migrate
from flask_wtf.csrf import CSRFProtect, generate_csrf
from flask_login import LoginManager

from .models import db, User
from .api.user_routes import user_routes
from .api.auth_routes import auth_routes
from .api.spot_routes import spot_routes
from .api.review_routes import review_routes
from .api.booking_routes import booking_routes

from .seeds import seed_commands
from .config import Config

def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)

    # Setup logging
    if app.config['LOG_LEVEL'] == 'DEBUG':
        logging.basicConfig(level=logging.DEBUG)
    else:
        logging.basicConfig(level=logging.INFO)

    # Setup login manager
    login = LoginManager(app)
    login.login_view = 'auth.unauthorized'

    @login.user_loader
    def load_user(id):
        return User.query.get(int(id))

    # Tell flask about our seed commands
    app.cli.add_command(seed_commands)

    # Register blueprints
    app.register_blueprint(user_routes, url_prefix='/api/users')
    app.register_blueprint(auth_routes, url_prefix='/api/auth')
    app.register_blueprint(spot_routes, url_prefix='/api/spots')
    app.register_blueprint(review_routes, url_prefix='/api/reviews')
    app.register_blueprint(booking_routes, url_prefix='/api/bookings')

    # Initialize extensions
    db.init_app(app)
    Migrate(app, db)

    # Application Security
    CORS(app, origins=app.config['CORS_ORIGINS'])

    # HTTPS redirect for production
    @app.before_request
    def https_redirect():
        if app.config.get('FLASK_ENV') == 'production':
            if request.headers.get('X-Forwarded-Proto') == 'http':
                url = request.url.replace('http://', 'https://', 1)
                return redirect(url, code=301)

    # CSRF token injection
    @app.after_request
    def inject_csrf_token(response):
        response.set_cookie(
            'csrf_token',
            generate_csrf(),
            secure=app.config.get('SESSION_COOKIE_SECURE', False),
            samesite=app.config.get('SESSION_COOKIE_SAMESITE', 'Lax'),
            httponly=True)
        return response

    # Error handlers
    @app.errorhandler(404)
    def not_found(error):
        return jsonify({'error': 'Not found'}), 404

    @app.errorhandler(500)
    def internal_error(error):
        db.session.rollback()
        return jsonify({'error': 'Internal server error'}), 500

    # React routes
    @app.route('/', defaults={'path': ''})
    @app.route('/<path:path>')
    def react_root(path):
        if path == 'favicon.ico':
            return app.send_static_file('favicon.ico')
        return app.send_static_file('index.html')

    return app

# Create the app instance
app = create_app()
