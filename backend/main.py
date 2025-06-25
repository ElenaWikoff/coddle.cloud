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
    excluded_names = {"Kevin Xu", "cs373-idb-gitlab-rest"}

    members = gl.projects.get(PROJECT_ID).members.list(get_all=True)
    members_json = [
        {
            "name": member.attributes.get("name"),
            "username": member.attributes.get("username"),
            "web_url": member.attributes.get("web_url")
        }
        for member in members
        if member.attributes.get("name") not in excluded_names
    ]
    return members_json

if __name__ == "__main__":
    # testing filtered output below
    # excluded_names = {"Kevin Xu", "cs373-idb-gitlab-rest"}

    # members = gl.projects.get(PROJECT_ID).members.list(get_all=True)
    # members_json = [
    #     {
    #         "name": member.attributes.get("name"),
    #         "username": member.attributes.get("username"),
    #         "web_url": member.attributes.get("web_url")
    #     }
    #     for member in members
    #     if member.attributes.get("name") not in excluded_names
    # ]
    # print(members_json)
    app.run(host='0.0.0.0', port=8080)
