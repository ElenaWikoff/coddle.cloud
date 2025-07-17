from flask import render_template, jsonify, redirect, request
from backend.models import app, db, Fish, Lures, Locations  # Import app, database, and models from models.py
from sqlalchemy import asc, desc, or_, func, ARRAY
from urllib.parse import urlencode
import gitlab

PROJECT_ID = 71006060
gl = gitlab.Gitlab('https://gitlab.com', private_token='glpat-WYswdfja-RfLBggGwHq9')

# -- HELPERS/UTILITY START HERE --

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

# -- GENERAL/PRIVATE ROUTES START HERE --

@app.route('/api')
def splash():
    return redirect('/api/docs/')

@app.route('/api/docs/')
def docs():
    return render_template('introduction.html')

@app.route('/api/ping')
def ping():
    return jsonify({"status": "backend alive"})

# -- FISH ROUTES START HERE --

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
        # 'depth_max': Fish.depth_max
    }

    for field, column in fish_filter_fields.items():
        value = request.args.get(field)
        if value is not None:
            try:
                # Support sorting numerically
                python_type = column.type.python_type
                if python_type in [int, float]:
                    value = python_type(value)
                    fish_query = fish_query.filter(or_(column <= value, column == None)) # Upper bound for NUMERIC fields
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

@app.route('/api/fish/fish_info')
def fishInfoIndex():
    # Parse query parameters
    fish_id_list = request.args.get("fish_ids").split(",")
    required_fish_fields_list = request.args.get("fields").split(",")

    # Convert fish ids to integers
    try:
        fish_ids = list(map(int, fish_id_list))
    except ValueError:
        return jsonify({"error": "fish_ids must be integers"}), 400

    # Query fish table for matching ids
    lures_fish_info_query = db.session.query(Fish).filter(Fish.id.in_(fish_ids)).all()

    # Construct response
    result = []
    for fish in lures_fish_info_query:
        fish_data = {}
        for field in required_fish_fields_list:
            if hasattr(fish, field):
                fish_data[field] = getattr(fish, field)
            else:
                fish_data[field] = None  # Or raise an error if strict schema is required
        fish_data['id'] = fish.id  # Always include the id for matching
        result.append(fish_data)

    return jsonify(result)

@app.route('/api/fish/searching_metadata')
def fishSearchingMetadataIndex():
    # Filter options (distinct categorical values)
    type_options = [t[0] for t in db.session.query(Fish.type).distinct().order_by(Fish.type).all()]
    distribution_options = [d[0] for d in db.session.query(Fish.distribution).distinct().order_by(Fish.distribution).all()]
    environment_options = [e[0] for e in db.session.query(Fish.environment).distinct().order_by(Fish.environment).all()]

    # Prepend "all" to each filter option list
    type_options.insert(0, "all")
    distribution_options.insert(0, "all")
    environment_options.insert(0, "all")

    # Range metadata (min/max)
    length_min, length_max = db.session.query(func.min(Fish.length), func.max(Fish.length)).first()
    weight_min, weight_max = db.session.query(func.min(Fish.weight), func.max(Fish.weight)).first()
    depth_min, depth_max = db.session.query(func.min(Fish.depth_min), func.max(Fish.depth_max)).first()

    return jsonify({
        "filters": [
            {
                "key": "type",
                "options": type_options
            },
            {
                "key": "distribution",
                "options": distribution_options
            },
            {
                "key": "environment",
                "options": environment_options
            }
        ],
        "ranges": [
            {
                "key": "length",
                "min": 0,
                "max": length_max
            },
            {
                "key": "weight",
                "min": 0,
                "max": weight_max
            }
            # {
            #     "key": "depth_max",
            #     "min": 0,
            #     "max": depth_max
            # }
        ],
        "sort": [
            "+id", "-id",
            "+length", "-length",
            "+weight", "-weight",
        ]
    })

# -- LURES ROUTES START HERE --

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
        'type': Lures.type,
        'application': Lures.application,
        'fish_types': Lures.fish_types
    }

    for field, column in lures_filter_fields.items():
        value = request.args.get(field)
        if value:
            if isinstance(column.type, ARRAY):
                lures_query = lures_query.filter(column.any(value)) # Match with any value in list
            else:
                lures_query = lures_query.filter(column == value) # Otherwise match lure type name

    # Lures sorts
    sort_param = request.args.get('sort')
    allowed_sort_fields = ['id', 'name', 'type']
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

    lures = lures_query.offset(offset).limit(limit).all()
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

@app.route('/api/lures/lure_info')
def lureInfoIndex():
    # Parse query parameters
    lure_id_list = request.args.get("lure_ids").split(",")
    required_lure_fields_list = request.args.get("fields").split(",")

    # Convert fish ids to integers
    try:
        lure_ids = list(map(int, lure_id_list))
    except ValueError:
        return jsonify([]) # Don't error, its expected to return an empty array if no suitable lures are found for a fish

    # Query lures table for matching ids
    lures_to_fish_query = db.session.query(Lures).filter(Lures.id.in_(lure_ids)).all()

    # Construct response
    result = []
    for lure in lures_to_fish_query:
        lure_data = {}
        for field in required_lure_fields_list:
            if hasattr(lure, field):
                lure_data[field] = getattr(lure, field)
            else:
                lure_data[field] = None  # Or raise an error if strict schema is required
        lure_data['id'] = lure.id  # Always include the id for matching
        result.append(lure_data)

    return jsonify(result)

@app.route('/api/lures/searching_metadata')
def luresSearchingMetadataIndex():
    # Query all rows from Lures
    all_lures = db.session.query(Lures).all()

    # Use sets to deduplicate
    type_set = set()
    application_set = set()
    fish_types_set = set()

    for lure in all_lures:
        if lure.type:
            type_set.add(lure.type)
        if lure.application:
            application_set.update(lure.application)  # Assume it's a list
        if lure.fish_types:
            fish_types_set.update(lure.fish_types)  # Assume it's a list

    # Convert sets to sorted lists and prepend "all"
    type_options = ["all"] + sorted(type_set)
    application_options = ["all"] + sorted(application_set)
    fish_types_options = ["all"] + sorted(fish_types_set)

    return jsonify({
        "filters": [
            {
                "key": "type",
                "options": type_options
            },
            {
                "key": "application",
                "options": application_options
            },
            {
                "key": "fish_types",
                "options": fish_types_options
            }
        ],
        "ranges": [

        ],
        "sort": [
            "+id", "-id",
            "+name", "-name",
            "+type", "-type"
        ]
    })

# -- LOCATIONS ROUTES START HERE --

@app.route('/api/locations')
def locationsIndex():
    locations_query = db.session.query(Locations)

    # Almost google like search of location name and feature name
    q = request.args.get('q')
    if q:
        search = f"%{q}%"
        locations_query = locations_query.filter(
            or_(
                func.lower(Locations.location_name).like(func.lower(search)),
                func.lower(Locations.feature_name).like(func.lower(search))
            )
        )

    # Locations filters
    locations_filter_fields = {
        'type': Locations.type
    }

    for field, column in locations_filter_fields.items():
        value = request.args.get(field)
        if value:
            # Match if the type is the same as the request argument type
            locations_query = locations_query.filter(column == value)

    locations_json = [location.to_dict() for location in locations_query]

    return locations_json

@app.route('/api/locations/<int:id>')
def specificLocationIndex(id):
    specific_location = db.session.query(Locations).get(id)

    return specific_location.to_dict()

# -- ABOUT CODDLE.ME ROUTE --

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
    project = gl.projects.get(PROJECT_ID)
    members = project.members.list(get_all=True)
    all_commits = project.commits.list(get_all=True)

    # Get total number of issues
    all_issues = project.issues.list(get_all=True)
    issue_count = len(all_issues)
    
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
            "commits": commit_count,
            "total_issues": issue_count
        })

    return about_json

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8080, debug=True)
