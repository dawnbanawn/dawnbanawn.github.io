from flask import Flask
from views import views
# Initializes application
app = Flask(__name__)

# access all blueprints in views
app.register_blueprint(views, url_prefix="/")

# Debug True refreshes app automatically
if __name__ == '__main__':
    app.run(debug=True, port=8000)