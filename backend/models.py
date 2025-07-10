#-----------
# imports
#-----------
from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
import os

# -------------------------
# Initialize Flask app
# -------------------------
app = Flask(__name__)
CORS(app)

# -------------------------
# Database configuration
# -------------------------
USER = "postgres"
PASSWORD = "cs373idb"
PUBLIC_IP_ADDRESS = "localhost:5432"
DBNAME = "fishingdb"

# --------------------------------------------------------------------------
# Use environment variable if available, otherwise fall back to local config
# --------------------------------------------------------------------------
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get(
    "DB_STRING",
    f'postgresql://{USER}:{PASSWORD}@{PUBLIC_IP_ADDRESS}/{DBNAME}'
)

# ---------------------------------------
# Disable track modifications warning
# ---------------------------------------
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# --------------------------
# Initialize SQLAlchemy
# --------------------------
db = SQLAlchemy(app)

# ----------------------
# Define Fish Lures relationship
# ----------------------
fish_lures = db.Table(
    'fish_lures',
    db.Column('fish_id', db.Integer, db.ForeignKey('fish.id'), primary_key=True),
    db.Column('lures_id', db.Integer, db.ForeignKey('lures.id'), primary_key=True)
)

# ----------------------
# Define Fish model
# ----------------------
class Fish(db.Model):
    __tablename__ = 'fish'
    id = db.Column(db.Integer, primary_key=True)
    common_name = db.Column(db.String(80), nullable=False)
    scientific_name = db.Column(db.String(80), nullable=False)
    type = db.Column(db.String(80), nullable=False)
    environment = db.Column(db.String(80), nullable=False)
    distribution = db.Column(db.String(80), nullable=False)
    length = db.Column(db.Integer, nullable=False)
    weight = db.Column(db.Double, nullable=True)
    depth_min = db.Column(db.Integer, nullable=True)
    depth_max = db.Column(db.Integer, nullable=True)
    temp_min = db.Column(db.Integer, nullable=True)
    temp_max = db.Column(db.Integer, nullable=True)
    image_attribution = db.Column(db.String, nullable=False)
    ref = db.Column(db.String, nullable=False)


    lures = db.relationship('Lures', secondary=fish_lures, backref='fish')

    def to_dict(self):
        return {
            'id': self.id,
            'common_name': self.common_name,
            'scientific_name': self.scientific_name,
            'type': self.type,
            'environment': self.environment,
            'distribution': self.distribution,
            'length': self.length,
            'weight': self.weight,
            'depth_min': self.depth_min,
            'depth_max': self.depth_max,
            'temp_min': self.temp_min,
            'temp_max': self.temp_max,
            'image_attribution': self.image_attribution,
            'ref': self.ref,
            'lures': [{'id': lure.id, 'name': lure.name} for lure in self.lures]
        }

# ----------------------
# Define Lures model
# ----------------------
class Lures(db.Model):
    __tablename__ = 'lures'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    type = db.Column(db.String(80), nullable=False)
    application = db.Column(db.ARRAY(db.String(80)), nullable=False)
    fish_types = db.Column(db.ARRAY(db.String(80)), nullable=False)
    image_url = db.Column(db.String, nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'type': self.type,
            'application': self.application,
            'fish_types': self.fish_types,
            'image_url': self.image_url
        }

# ----------------------
# Define Locations model
# ----------------------
class Locations(db.Model):
    __tablename__ = 'locations'
    id = db.Column(db.Integer, primary_key=True)
    location_name = db.Column(db.String(80), nullable=False)
    feature_name = db.Column(db.String(80), nullable=False)
    coordinates = db.Column(db.ARRAY(db.Double), nullable=False)
    state = db.Column(db.String(80), nullable=False)
    city = db.Column(db.String(80), nullable=False)
    type = db.Column(db.String(80), nullable=False)
    fish_ids = db.Column(db.ARRAY(db.Integer), nullable=False)


    def to_dict(self):
        return {
            'id': self.id,
            'location_name': self.location_name,
            'feature_name': self.feature_name,
            'coordinates': self.coordinates,
            'state': self.state,
            'city': self.city,
            'type': self.type,
            'fish_ids': self.fish_ids
        }

# ----------------------------------------------------------------------------
# Optional utility to initialize the DB — to be run explicitly, not on import
# python -c "from models import init_db; init_db()"
# ----------------------------------------------------------------------------
def init_db():
    # Activates the Flask application context so extensions like SQLAlchemy can access app-specific settings    
    with app.app_context():
        db.create_all()
