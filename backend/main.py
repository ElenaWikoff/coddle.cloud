from flask import render_template, jsonify, redirect, request
from models import app, db, Fish, Lures, Locations  # Import app, database, and models from models.py
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
    page = request.args.get('page', default=1, type=int)
    limit = request.args.get('limit', default=12, type=int)

    offset = (page - 1) * limit

    fish = db.session.query(Fish).offset(offset).limit(limit).all()
    fish_json = [f.to_dict() for f in fish]
    return fish_json

@app.route('/api/fish/<int:id>')
def specificFishIndex(id):
    specific_fish = db.session.query(Fish).get(id)
    return specific_fish

@app.route('/api/lures')
def luresIndex():
    page = request.args.get('page', default=1, type=int)
    limit = request.args.get('limit', default=12, type=int)

    offset = (page - 1) * limit

    lures = db.session.query(Lures).offset(offset).limit(limit).all()
    lures_json = [lure.to_dict() for lure in lures]
    return lures_json

@app.route('/api/lures/<int:id>')
def specificLuresIndex(id):
    specific_lure = db.session.query(Lures).get(id)
    return specific_lure

@app.route('/api/locations')
def locationsIndex():
    locations = db.session.query(Locations).all()
    locations_json = [location.to_dict() for location in locations]
    return locations_json

@app.route('/api/locations/<int:id>')
def specificLocationIndex(id):
    specific_location = db.session.query(Locations).get(id)
    return specific_location

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
