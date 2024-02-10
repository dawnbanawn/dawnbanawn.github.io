# Flask will be the server that runs the api

from flask import Flask, request, jsonify

app = Flask(__name__)

# Route / end point to get data
@app.route("/")
def home():
    return "Home"

# HTTP METHODS: GET POST PUT DELETE

# GET route
@app.route("/get-user/<user_id>")
def get_user(user_id):
    user_data = {
        "user_id": user_id,
        "name": "John Doe",
        "email": "john.doe@example.com"
    }
    # Query parameter (?)
    # Checks if there is a query parameter, and stores it.
    # 127.0.0.1:5000/get-user/bloo?extra="hello" will return user_data including "extra" which will be "hello"
    extra = request.args.get("extra")
    if extra:
        user_data["extra"] = extra
    return jsonify(user_data), 200    
    
# POST route    
@app.route("/create-user", methods=["POST"])
def create_user():
    # Recieve json data from body
    data = request.get_json()
    return jsonify(data), 201

# Run the flask server
if __name__ == "__main__":
    app.run(debug=True)