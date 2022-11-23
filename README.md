# ForRedditLiveSearch (Unofficial Application)
This is a fullstack application that allows users to livesearch specific regions in 
r/hardwareswap.

## Setup
### Backend
The backend requires python flask to be setup along with Reddit credentials.
1. Add a `.env` file to `backend/` that contains the following
```
username = "Reddit username"
password = "Reddit password"
client_secret = "Client secret"
client_id = "Client id"
```
The secrets are gotten through https://github.com/reddit-archive/reddit/wiki/OAuth2-Quick-Start-Example#first-steps
These will allow us to use the Reddit api to gather post information.

2. Install python dependencies using 
```
cd backend
pip install requirements.txt
```

3. Run the flask application using
```
flask --app app.py run
```

### Frontend
The frontend uses React with Nodejs.
1. Install frontend dependencies using
```
cd frontend
npm install
```
2. Run the frontend using
```
npm start
```
