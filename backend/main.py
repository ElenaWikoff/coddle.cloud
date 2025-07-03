from flask import render_template, jsonify, redirect
from models import app, db, Fish, Lures  # Import app, database, and models from models.py
import gitlab

PROJECT_ID = 71006060
gl = gitlab.Gitlab('https://gitlab.com', private_token='glpat-WYswdfja-RfLBggGwHq9')

@app.route('/api')
def splash():
    return redirect('/api/docs/')

@app.route('/api/docs/')
def docs():
    return render_template('introduction.html')

@app.route('/api/ping')
def ping():
    return jsonify({"status": "backend alive"})

@app.route('/api/fish')
def fishIndex():
    fish = db.session.query(Fish).all()
    fish_json = [f.to_dict() for f in fish]
    return fish_json

@app.route('/api/lures')
def luresIndex():
    lures = db.session.query(Lures).all()
    lures_json = [l.to_dict() for l in lures]
    return lures_json

@app.route('/api/about')
def aboutIndex():
    excluded_names = {"Kevin Xu", "Sohil Patel", "cs373-idb-gitlab-rest", "GCP Token"}
    EMAIL_MAP = {
        "Elena Wikoff": ["elenawikoff@utexas.edu", "elenawikoff@gmail.com"],
        "Jane Huynh": ["janehuynh1411@gmail.com"],
        "Perry Ehimuh": ["perryehimuh@gmail.com"],
        "Yifan Guo": ["yifan.guo.3517@gmail.com"],
        "Ethan Do": ["ethando767243@gmail.com"],
        "LegendaryFoxFire": ["jtbukoski@gmail.com"]
    }
    members = gl.projects.get(PROJECT_ID).members.list(get_all=True)
    all_commits = gl.projects.get(PROJECT_ID).commits.list(get_all=True)
    
    about_json = []

    for member in members:
        name = member.attributes.get("name")
        username = member.attributes.get("username")
        web_url = member.attributes.get("web_url")

        if name in excluded_names:
            continue

        emails = EMAIL_MAP.get(name)
        commit_count = 0

        if emails:
            commit_count = sum(
                1 for commit in all_commits if commit.attributes.get("committer_email") in emails
            )
        
        about_json.append({
            "name": name,
            "username": username,
            "web_url": web_url,
            "commits": commit_count
        })

    return about_json

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8080)
