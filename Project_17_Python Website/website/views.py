# routes
from flask import Blueprint, render_template

views = Blueprint('views', __name__)

# Define route / view
@views.route('/')
def home():
    return render_template("home.html")
