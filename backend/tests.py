import unittest
from models import app, db, Fish, Lures, Locations

class ModelTestCase(unittest.TestCase):

    def setUp(self):
        app.config['TESTING'] = True
        app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///:memory:'
        self.app_context = app.app_context()
        self.app_context.push()
        db.create_all()

    def tearDown(self):
        db.session.remove()
        db.drop_all()
        self.app_context.pop()

    def test_fish_model(self):
        fish = Fish(
            common_name="Bass",
            scientific_name="Micropterus salmoides",
            type="Freshwater",
            environment="River",
            distribution="North America",
            length=30,
            weight=2.5,
            depth_min=1,
            depth_max=10,
            temp_min=10,
            temp_max=25,
            image_attribution="photo by John",
            ref="ref link"
        )
        db.session.add(fish)
        db.session.commit()
        self.assertEqual(Fish.query.count(), 1)
        self.assertIn('common_name', fish.to_dict())

    def test_lures_model(self):
        lure = Lures(
            name="Spinner",
            type="Blade",
            application=["Casting", "Trolling"],
            fish_types=["Bass"],
            image_url="http://example.com/lure.jpg"
        )
        db.session.add(lure)
        db.session.commit()
        self.assertEqual(Lures.query.count(), 1)
        self.assertEqual(lure.to_dict()['name'], "Spinner")

    def test_locations_model(self):
        location = Locations(
            location_name="Lake Austin",
            feature_name="Reservoir",
            coordinates=[30.32, -97.77],
            state="TX",
            city="Austin",
            type="Lake",
            fish_ids=[1, 2]
        )
        db.session.add(location)
        db.session.commit()
        self.assertEqual(Locations.query.count(), 1)
        self.assertIn('state', location.to_dict())

    def test_fish_lures_relationship(self):
        fish = Fish(
            common_name="Trout",
            scientific_name="Oncorhynchus mykiss",
            type="Freshwater",
            environment="Stream",
            distribution="Western US",
            length=20,
            weight=1.2,
            depth_min=1,
            depth_max=5,
            temp_min=5,
            temp_max=18,
            image_attribution="photo by Smith",
            ref="ref link"
        )
        lure = Lures(
            name="Fly",
            type="Feather",
            application=["Fly Fishing"],
            fish_types=["Trout"],
            image_url="http://example.com/fly.jpg"
        )
        fish.lures.append(lure)
        db.session.add_all([fish, lure])
        db.session.commit()
        self.assertIn(lure, fish.lures)
        self.assertEqual(fish.to_dict()['lures'][0]['name'], "Fly")

if __name__ == '__main__':
    unittest.main()
