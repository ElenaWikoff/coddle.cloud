from flask import Flask, render_template, jsonify
from flask_cors import CORS
import gitlab

PROJECT_ID = 71006060
gl = gitlab.Gitlab('https://gitlab.com', private_token='glpat-WYswdfja-RfLBggGwHq9')

app = Flask(__name__)
CORS(app)

@app.route('/')
def splash():
    return "backend splash"

@app.route('/frontendhitme')
def index():
    return "Im static... but awesome."

@app.route('/about')
def aboutIndex():
    members = gl.projects.get(PROJECT_ID).members_all.list(get_all=True)
    members_json = [member.attributes for member in members]
    return jsonify(members_json)

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8080)
