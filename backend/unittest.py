import os
import sys
import unittest
from backend.models import app
import backend.main

# ----------------------
# Data structure & schema testing
# ----------------------
class ApiSchemaTests(unittest.TestCase):
    def setUp(self):
        self.client = app.test_client()

    # Fish schema
    def test_fish_schema(self):
        response = self.client.get('/api/fish')
        self.assertEqual(response.status_code, 200)
        data = response.get_json()
        if isinstance(data, list) and len(data) > 0:
            sample = data[0]
        else:
            self.skipTest("No fish data available")
            return

        expected_keys = [
            'id', 'common_name', 'scientific_name', 'type', 'environment',
            'distribution', 'length', 'weight', 'depth_min', 'depth_max',
            'temp_min', 'temp_max', 'image_attribution', 'ref'
        ]
        for key in expected_keys:
            self.assertIn(key, sample)

    # Lures schema
    def test_lures_schema(self):
        response = self.client.get('/api/lures')
        self.assertEqual(response.status_code, 200)
        data = response.get_json()
        if isinstance(data, list) and len(data) > 0:
            sample = data[0]
        else:
            self.skipTest("No lures data available")
            return

        expected_keys = [
            'id', 'name', 'type', 'application', 'fish_types',
            'image_url', 'suitable_fish_ids'
        ]
        for key in expected_keys:
            self.assertIn(key, sample)

    # Locations schema
    def test_locations_schema(self):
        response = self.client.get('/api/locations')
        self.assertEqual(response.status_code, 200)
        data = response.get_json()
        if isinstance(data, list) and len(data) > 0:
            sample = data[0]
        else:
            self.skipTest("No locations data available")
            return

        expected_keys = [
            'id', 'location_name', 'feature_name', 'coordinates',
            'state', 'city', 'type', 'fish_ids'
        ]
        for key in expected_keys:
            self.assertIn(key, sample)

# ----------------------
# APIs testing
# ----------------------

# GET API testing
class ApiGetTests(unittest.TestCase):

    def setUp(self):
        self.client = app.test_client()

    # GET fish
    def test_get_fish(self):
        response = self.client.get('/api/fish')
        self.assertEqual(response.status_code, 200)
        self.assertIn('application/json', response.content_type)
    
    # GET lures    
    def test_get_lures(self):
        response = self.client.get('/api/lures')
        self.assertEqual(response.status_code, 200)
        self.assertIn('application/json', response.content_type)
    
    # GET locations    
    def test_get_locations(self):
        response = self.client.get('/api/locations')
        self.assertEqual(response.status_code, 200)
        self.assertIn('application/json', response.content_type)

        
'''
# POST API testing       
class ApiPostTests(unittest.TestCase):

    def setUp(self):
        self.client = app.test_client()

    # POST fish
    def test_post_fish(self):
        response = self.client.post('/api/fish', json={
            'common_name': 'Trout',
            'scientific_name': 'Oncorhynchus mykiss',
            'type': 'Freshwater',
            'environment': 'River',
            'distribution': 'North America',
            'length': 25,
            'weight': 1.5,
            'depth_min': 1,
            'depth_max': 5,
            'temp_min': 10,
            'temp_max': 20,
            'image_attribution': 'photo by Jane',
            'ref': 'ref link'
        })
        self.assertEqual(response.status_code, 201)
        self.assertIn('application/json', response.content_type)
    
    # POST lures    
    def test_post_lures(self):
        response = self.client.post('/api/lures', json={
            'name': 'Jig',
            'type': 'Soft Bait',
            'application': ['Casting'],
            'fish_types': ['Trout'],
            'image_url': 'http://example.com/jig.jpg'
        })
        self.assertEqual(response.status_code, 201)
        self.assertIn('application/json', response.content_type)
    
    # POST locations    
    def test_post_locations(self):
        response = self.client.post('/api/locations', json={
            'location_name': 'Lake Tahoe',
            'feature_name': 'Lake',
            'coordinates': [39.0968, -120.0324],
            'state': 'CA',
            'city': 'South Lake Tahoe',
            'type': 'Lake',
            'fish_ids': [1, 2]
        })
        self.assertEqual(response.status_code, 201)
        self.assertIn('application/json', response.content_type)

# PUT API testing        
class ApiPutTests(unittest.TestCase):

    def setUp(self):
        self.client = app.test_client()

    # PUT fish
    def test_put_fish(self):
        response = self.client.put('/api/fish/1', json={
            'common_name': 'Updated Trout',
            'scientific_name': 'Oncorhynchus mykiss',
            'type': 'Freshwater',
            'environment': 'River',
            'distribution': 'North America',
            'length': 30,
            'weight': 2.0,
            'depth_min': 1,
            'depth_max': 5,
            'temp_min': 10,
            'temp_max': 20,
            'image_attribution': 'photo by Jane',
            'ref': 'updated ref link'
        })
        self.assertEqual(response.status_code, 200)
        self.assertIn('application/json', response.content_type)
    
    # PUT lures    
    def test_put_lures(self):
        response = self.client.put('/api/lures/1', json={
            'name': 'Updated Jig',
            'type': 'Soft Bait',
            'application': ['Casting'],
            'fish_types': ['Trout'],
            'image_url': 'http://example.com/updated_jig.jpg'
        })
        self.assertEqual(response.status_code, 200)
        self.assertIn('application/json', response.content_type)
    
    # PUT locations    
    def test_put_locations(self):
        response = self.client.put('/api/locations/1', json={
            'location_name': 'Updated Lake Tahoe',
            'feature_name': 'Lake',
            'coordinates': [39.0968, -120.0324],
            'state': 'CA',
            'city': 'South Lake Tahoe',
            'type': 'Lake',
            'fish_ids': [1, 2]
        })
        self.assertEqual(response.status_code, 200)
        self.assertIn('application/json', response.content_type)
        
# DELETE API testing
class ApiDeleteTests(unittest.TestCase):
    def setUp(self):
        self.client = app.test_client()

    # DELETE fish
    def test_delete_fish(self):
        response = self.client.delete('/api/fish/1')
        self.assertEqual(response.status_code, 204)

    # DELETE lures        
    def test_delete_lures(self):
        response = self.client.delete('/api/lures/1')
        self.assertEqual(response.status_code, 204)

    # DELETE locations        
    def test_delete_locations(self):
        response = self.client.delete('/api/locations/1')
        self.assertEqual(response.status_code, 204)
'''

# ----------------------
# Pagination testing
# ----------------------
class ApiPaginationTests(unittest.TestCase):
    def setUp(self):
        self.client = app.test_client()

    # Fish pagination
    def test_fish_pagination_default(self):
        response = self.client.get('/api/fish')
        self.assertEqual(response.status_code, 200)
        data = response.get_json()
        self.assertIn('pagination', data)
        self.assertIn('results', data)
        self.assertLessEqual(len(data['results']), data['pagination']['limit'])
    # Fish pagination limit
    def test_fish_pagination_custom_limit(self):
        response = self.client.get('/api/fish?limit=5')
        self.assertEqual(response.status_code, 200)
        data = response.get_json()
        self.assertEqual(data['pagination']['limit'], 5)
        self.assertLessEqual(len(data['results']), 5)

    # Lures pagination
    def test_lures_pagination_default(self):
        response = self.client.get('/api/lures')
        self.assertEqual(response.status_code, 200)
        data = response.get_json()
        self.assertIn('pagination', data)
        self.assertIn('results', data)
        self.assertLessEqual(len(data['results']), data['pagination']['limit'])

    # Lures pagination limit
    def test_lures_pagination_custom_limit(self):
        response = self.client.get('/api/lures?limit=3')
        self.assertEqual(response.status_code, 200)
        data = response.get_json()
        self.assertEqual(data['pagination']['limit'], 3)
        self.assertLessEqual(len(data['results']), 3)



if __name__ == '__main__':
    unittest.main()