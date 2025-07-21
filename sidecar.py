import requests
from flask import Flask, jsonify

app = Flask(__name__)

# GitLab API details
GITLAB_API_URL = "https://gitlab.com/api/v4"
GITLAB_TOKEN = "glpat-nxBNtZ-yeSypFUzuj-ts"   

@app.route('/api/gitlab/repositories', methods=['GET'])
def get_repositories():
    headers = {'PRIVATE-TOKEN': GITLAB_TOKEN}
    response = requests.get(f"{GITLAB_API_URL}/projects", headers=headers)
    return jsonify(response.json())

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5001)  # Sidecar Flask app runs on port 5001
