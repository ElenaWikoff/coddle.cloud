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
    fish_query = db.session.query(Fish)

    page = request.args.get('page', default=1, type=int)
    limit = request.args.get('limit', default=12, type=int)
    fish_total = fish_query.count()
    pages = (fish_total + limit - 1) // limit # Always round up
    
    next_page = page + 1 if page < pages else None
    prev_page = page - 1 if page > 1 else None

    offset = (page - 1) * limit

    fish = fish_query.offset(offset).limit(limit).all()
    fish_json = [f.to_dict() for f in fish]

    fish_response = {
        "pagination": {
            "limit": limit,
            "page": page,
            "pages": pages,
            "total": fish_total,
            "first": "/fish-species?page=1" if pages > 0 else None,
            "last": f"/fish-species?page={pages}" if pages > 0 else None,
            "next": f"/fish-species?page={next_page}" if next_page else None,
            "prev": f"/fish-species?page={prev_page}" if prev_page else None
        },
        "results": fish_json
    }

    return fish_response

@app.route('/api/fish/<int:id>')
def specificFishIndex(id):
    specific_fish = db.session.query(Fish).get(id)
    return specific_fish.to_dict()

@app.route('/api/lures')
def luresIndex():
    lures_query = db.session.query(Lures)

    page = request.args.get('page', default=1, type=int)
    limit = request.args.get('limit', default=12, type=int)
    lures_total = lures_query.count()
    pages = (lures_total + limit - 1) // limit # Always round up
    
    next_page = page + 1 if page < pages else None
    prev_page = page - 1 if page > 1 else None

    offset = (page - 1) * limit

    lures = db.session.query(Lures).offset(offset).limit(limit).all()
    lures_json = [lure.to_dict() for lure in lures]

    lures_response = {
        "pagination": {
            "limit": limit,
            "page": page,
            "pages": pages,
            "total": lures_total,
            "first": "/lures?page=1" if pages > 0 else None,
            "last": f"/lures?page={pages}" if pages > 0 else None,
            "next": f"/lures?page={next_page}" if next_page else None,
            "prev": f"/lures?page={prev_page}" if prev_page else None
        },
        "results": lures_json
    }

    return lures_response

@app.route('/api/lures/<int:id>')
def specificLuresIndex(id):
    specific_lure = db.session.query(Lures).get(id)
    return specific_lure.to_dict()

@app.route('/api/locations')
def locationsIndex():
    locations = db.session.query(Locations).all()
    locations_json = [location.to_dict() for location in locations]
    return locations_json

@app.route('/api/locations/<int:id>')
def specificLocationIndex(id):
    specific_location = db.session.query(Locations).get(id)
    return specific_location.to_dict()

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
