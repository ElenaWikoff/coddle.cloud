from flask import render_template, jsonify, redirect, request
from backend.models import app, db, Fish, Lures, Locations  # Import app, database, and models from models.py
from sqlalchemy import asc, desc, or_, func
from urllib.parse import urlencode
import gitlab

PROJECT_ID = 71006060
gl = gitlab.Gitlab('https://gitlab.com', private_token='glpat-WYswdfja-RfLBggGwHq9')

# Might split off these helper functions into utils.py later?
def get_sort_clause(model, sort_param, allowed_fields):
    if not sort_param:
        return None
    
    if sort_param.startswith('-'):
        direction = desc
        field = sort_param[1:]
    elif sort_param.startswith('+') or sort_param.startswith(' '):
        direction = asc
        field = sort_param[1:]
    else:
        direction = asc
        field = sort_param

    if field in allowed_fields:
        return direction(getattr(model, field))
    
    return None

# Helper to dynamically build paginated urls for pagination dict in each model response JSON
def build_paginated_url(base_path, current_args, page_num, limit):
    if page_num is None:
        return None
    
    args = {k: v for k, v in current_args.items() if k != "page"}
    args.update({"page": page_num, "limit": limit})
    return f"{base_path}?{urlencode(args)}"

@app.route 
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

    # Almost google like search of common_name and scientific_name
    q = request.args.get('q', type=str)
    if q:
        search = f"%{q}%"
        fish_query = fish_query.filter(
            or_(
                func.lower(Fish.common_name).like(func.lower(search)),
                func.lower(Fish.scientific_name).like(func.lower(search))
            )
        )
    
    # Fish filters
    fish_filter_fields = {
        'type': Fish.type,
        'environment': Fish.environment,
        'distribution': Fish.distribution,
        'length': Fish.length,
        'weight': Fish.weight,
        'depth_max': Fish.depth_max
    }

    for field, column in fish_filter_fields.items():
        value = request.args.get(field)
        if value is not None:
            try:
                # Support sorting numerically
                python_type = column.type.python_type
                if python_type in [int, float]:
                    value = python_type(value)
                    fish_query = fish_query.filter(column <= value) # Upper bound for NUMERIC fields
                else:
                    fish_query = fish_query.filter(column == value) # Case for exact STRING match
            except (ValueError, TypeError):
                continue # Ignore invalid values

    # Fish sorts
    sort_param = request.args.get('sort')
    allowed_sort_fields = ['id', 'common_name', 'scientific_name', 'length', 'weight']
    sort_clause = get_sort_clause(Fish, sort_param, allowed_sort_fields)
    if sort_clause is not None:
        fish_query = fish_query.order_by(sort_clause)

    # Fish pagination
    page = request.args.get('page', default=1, type=int)
    limit = request.args.get('limit', default=12, type=int)
    fish_total = fish_query.count()
    pages = (fish_total + limit - 1) // limit # Always round up

    # if (page <= pages):
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
            "first": build_paginated_url("/fish-species", request.args, 1, limit) if page != 1 else None,
            "last": build_paginated_url("/fish-species", request.args, pages, limit) if page != pages else None,
            "next": build_paginated_url("/fish-species", request.args, next_page, limit),
            "prev": build_paginated_url("/fish-species", request.args, prev_page, limit)
        },
        "results": fish_json
    }

    return fish_response

@app.route('/api/fish/<int:id>')
def specificFishIndex(id):
    specific_fish = db.session.query(Fish).get(id)
    return specific_fish.to_dict()

@app.route('/api/fish/searching_metadata')
def fishSearchingMetadataIndex():
    pass

@app.route('/api/lures')
def luresIndex():
    lures_query = db.session.query(Lures)

    # Almost google like search of bait name and type
    q = request.args.get('q', type=str)
    if q:
        search = f"%{q}%"
        lures_query = lures_query.filter(
            or_(
                func.lower(Lures.name).like(func.lower(search)),
                func.lower(Lures.type).like(func.lower(search))
            )
        )
    
    # Lures filters
    lures_filter_fields = {
        'application': Lures.application,
        'fish_types': Lures.fish_types,
    }

    for field, column in lures_filter_fields.items():
        value = request.args.get(field)
        if value:
            # Match if the value is present in the array
            lures_query = lures_query.filter(column.any(value))

    # Lures sorts
    sort_param = request.args.get('sort')
    allowed_sort_fields = ['name', 'type']
    sort_clause = get_sort_clause(Lures, sort_param, allowed_sort_fields)
    if sort_clause is not None:
        lures_query = lures_query.order_by(sort_clause)
    
    # Lures pagination
    page = request.args.get('page', default=1, type=int)
    limit = request.args.get('limit', default=12, type=int)
    lures_total = lures_query.count()
    pages = (lures_total + limit - 1) // limit # Always round up

    # if (page <= pages):
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
            "first": build_paginated_url("/lures", request.args, 1, limit) if page != 1 else None,
            "last": build_paginated_url("/lures", request.args, pages, limit) if page != pages else None,
            "next": build_paginated_url("/lures", request.args, next_page, limit),
            "prev": build_paginated_url("/lures", request.args, prev_page, limit)
        },
        "results": lures_json
    }

    return lures_response

@app.route('/api/lures/<int:id>')
def specificLuresIndex(id):
    specific_lure = db.session.query(Lures).get(id)
    return specific_lure.to_dict()

@app.route('/api/lures/searching_metadata')
def luresSearchingMetadataIndex():
    pass

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
        "Yifan Guo": ["yifan.guo.3517@gmail.com", "yg8644@my.utexas.edu"],
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
    app.run(host='0.0.0.0', port=8080, debug=True)
