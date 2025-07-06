#-----------
# imports
#-----------
import json
from backend.models import app, db, Fish, Lures, Locations

# ------------------------------------------------------------------
# Loads and parses a JSON file; returns parsed data
# Handles file not found or malformed JSON gracefully
# ------------------------------------------------------------------
def load_json(filename, fallback):
    try:
        with open(filename) as file:
            return json.load(file)
    except (FileNotFoundError, json.JSONDecodeError) as e:
        print(f"Error loading JSON: {e}")
        return {f"{fallback}": []}  # Fallback structure

# ------------------------------------------------------------------
# Iterates through the loaded fish data and inserts each entry into the database
# ------------------------------------------------------------------
def create_fish():
    data = load_json('Fish.json', 'Fish')
    for entry in data.get('Fish', []):
        new_fish = Fish(id=entry['id'], common_name=entry['common_name'], scientific_name=entry['scientific_name'], type=entry['type'], environment=entry['environment'],
                        distribution=entry['distribution'], length=entry['length'], weight=entry['weight'], depth_min=entry['depth_min'], depth_max=entry['depth_max'],
                        temp_min=entry['temp_min'], temp_max=entry['temp_max'], image_attribution=entry['image_attribution'], ref=entry['ref'])
        db.session.add(new_fish)
    db.session.commit()  # Commit all additions once after the loop

# ------------------------------------------------------------------
# Iterates through the loaded lures data and inserts each entry into the database
# ------------------------------------------------------------------
def create_lures():
    data = load_json('Lures.json', 'Lures')
    for entry in data.get('Lures', []):
        new_lure = Lures(id=entry['id'], name=entry['name'], type=entry['type'], application=entry['application'], fish_types=entry['fish_types'], image_url=entry['image_url'])
        db.session.add(new_lure)
    db.session.commit()  # Commit all additions once after the loop

# ------------------------------------------------------------------
# Iterates through the loaded locations data and inserts each entry into the database
# ------------------------------------------------------------------
def create_locations():
    data = load_json('Locations.json', 'Locations')
    for entry in data.get('Locations', []):
        new_location = Locations(id=entry['id'], location_name=entry['location_name'], feature_name=entry['feature_name'], coordinates=entry['coordinates'], state=entry['state'],
                         city=entry['city'], type=entry['type'], fish_ids=entry['fish_ids'])
        db.session.add(new_location)
    db.session.commit()  # Commit all additions once after the loop

# ------------------------------------------------------------------
# Establishes many-to-many relationships between Fish and Lures
# ------------------------------------------------------------------
def create_fish_lures_relationships():
    all_fish = Fish.query.all()
    all_lures = Lures.query.all()

    for lure in all_lures:
        lure_keywords = set(name.lower() for name in lure.fish_types)

        for fish in all_fish:
            fish_name = fish.common_name.lower()

            # Match based on fish_type keyword being present in common_name
            if any(keyword in fish_name for keyword in lure_keywords):
                lure.fish.append(fish)  # uses the backref from models

    db.session.commit()


# TODO: def create_locations() once Locations.json is made

# ------------------------------------------------------------------
# Executes only when this script is run directly
# ------------------------------------------------------------------
if __name__ == "__main__":
    with app.app_context():  # Ensure proper Flask app context for DB access
        db.create_all()      # Create tables if they don't exist
        create_fish()        # Populate the Fish table with data from Fish.json
        create_lures()       # Populate the Lures table with data from Lures.json
        create_locations()   # Populate the Locations table with data from Locations.json
        create_fish_lures_relationships() # Create fish to lures relationship
        print("Database initialized and models loaded.")
