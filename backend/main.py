from flask import Flask, render_template
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/')
def splash():
    return "backend splash"

@app.route('/frontendhitme')
def index():
    return "Im static... but awesome."

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8080)
