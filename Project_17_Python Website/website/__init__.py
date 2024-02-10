from flask import Flask

# Initialize flask
def create_app():
    app = Flask(__name__)
    # Secret key
    app.config["SECRET_KEY"] = 'sdfsje kweskdksq'

    # Import blueprints
    from .views import views
    from .auth import auth
    # Register with flask
    app.register_blueprint(views, url_prefix='/')
    app.register_blueprint(auth, url_prefix='/')



    return app
