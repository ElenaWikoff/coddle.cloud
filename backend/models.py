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
fish_lures = db.Table('fish_lures',
    db.Column('fish_id', db.Integer, db.ForeignKey('fish.id'), primary_key=True),
    db.Column('lure_id', db.Integer, db.ForeignKey('lures.id'), primary_key=True)
)

# ----------------------
# Define Fish model
# ----------------------
class Fish(db.Model):
    __tablename__ = 'fish'
    id = db.Column(db.Integer, primary_key=True)
    state = db.Column(db.String(80), nullable=False)
    common_name = db.Column(db.String(80), nullable=False)
    scientific_name = db.Column(db.String(80), nullable=False)
    image_url = db.Column(db.String(), nullable=False)
    year = db.Column(db.String(80), nullable=False)

    lures = db.relationship('Lures', secondary=fish_lures, backref='fish')

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
    image_url = db.Column(db.String(), nullable=False)


# TODO: Define Locations model after making Locations.json

# ----------------------------------------------------------------------------
# Optional utility to initialize the DB — to be run explicitly, not on import
# python -c "from models import init_db; init_db()"
# ----------------------------------------------------------------------------
def init_db():
    # Activates the Flask application context so extensions like SQLAlchemy can access app-specific settings    
    with app.app_context():
        db.create_all()
