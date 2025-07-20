from flask import Flask, request, render_template_string, session
from google.cloud import firestore
from datetime import datetime
import uuid

app = Flask(__name__)
app.secret_key = "super-secret-key-for-honeypot"
db = firestore.Client()
collection_name = "honeypot_logs"


fake_login_form = """
<!DOCTYPE html>
<html>
<head><title>Login</title></head>
<body>
<h2>Login</h2>
<form method="POST" action="/login">
  <input type="text" name="username" placeholder="Username"/><br>
  <input type="password" name="password" placeholder="Password"/><br>
  <input type="hidden" name="csrf_token" value="FAKE_CSRF_TOKEN_123456"/>
  <input type="submit" value="Login"/>
</form>
</body>
</html>
"""


honeypot_endpoints = [
    "/admin",
    "/login",
    "/config",
    "/dashboard",
    "/phpmyadmin",
    "/.git",
    "/.env",
    "/shell",
]

def get_request_metadata(endpoint):
    return {
        "timestamp": datetime.utcnow(),
        "endpoint": endpoint,
        "method": request.method,
        "ip": request.headers.get("X-Forwarded-For", request.remote_addr),
        "user_agent": request.headers.get("User-Agent", "Unknown"),
        "headers": dict(request.headers),
        "form_data": request.form.to_dict(),
        "cookies": request.cookies.to_dict(),
        "session_id": session.get("sid", "N/A")
    }

def log_to_firestore(data):
    db.collection(collection_name).add(data)
    print(f"[LOGGED] {data}")

@app.before_request
def set_session_id():
    if "sid" not in session:
        session["sid"] = str(uuid.uuid4())

@app.route("/login", methods=["GET", "POST"])
def login_honeypot():
    log_data = get_request_metadata("/login")
    log_to_firestore(log_data)
    return render_template_string(fake_login_form)

@app.route("/<path:path>", methods=["GET", "POST"])
def honeypot_catch_all(path):
    endpoint = "/" + path
    if endpoint in honeypot_endpoints:
        log_data = get_request_metadata(endpoint)
        log_to_firestore(log_data)
        return "404 Not Found", 404
    else:
        return "OK", 200

@app.route("/", methods=["GET"])
def index():
    return "Welcome to Honeypot", 200

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8080)

