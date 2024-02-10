from flask import Blueprint, render_template, request, jsonify, redirect, url_for

views = Blueprint(__name__, "views")

# http://127.0.0.1:8000/views
@views.route("/views")
def home():
    return render_template("index.html", name="Dan")

# http://127.0.0.1:8000/profile/tim
# text in url -> put as a parameter -> return variable that
# can be accessed in the html file.
@views.route("/profile/<username>")
def profile(username):
    return render_template("profile.html", name=username)

# Access query parameters
# http://127.0.0.1:8000/books?name=bloo
@views.route("/books")
def books():
    args = request.args
    # Get the name
    name = args.get('name')
    return render_template("index.html", bookName=name)

# Return Json
@views.route("/json")
def get_json():
    
    return jsonify({})

# Get data from a request that is incoming
@views.route("/data")
def get_data():
    data = request
    return jsonify(data)

# Redirecct to different page / route
# http://127.0.0.1:8000/go-to-home
@views.route("/go-to-home")
def go_to_home():
    return redirect(url_for("views.home"))
