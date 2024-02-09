# routes
from flask import Blueprint

views = Blueprint('views', __name__)

# Define route / view
@views.route('/')
def home():
    return "<h1>test</h1>"
