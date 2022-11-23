import praw
from dotenv import load_dotenv
import os
from flask import Flask, jsonify, request
from expiringdict import ExpiringDict
import re

APP_NAME = "HardwareLivesearchClient"
APP_VERSION = 0.1
APP_OWNER = "ericlchen1"

load_dotenv()
client_id = os.environ.get("client_id")
client_secret = os.environ.get("client_secret")
username = os.environ.get("username")
password = os.environ.get("password")
user_agent = f"{APP_NAME}/{APP_VERSION} by {APP_OWNER}"

subreddit = "hardwareswap"

reddit = praw.Reddit(
    client_id=client_id,
    client_secret=client_secret,
    user_agent=user_agent,
    username=username,
    password=password,
)

subreddit = reddit.subreddit(subreddit)
submissions_dict = ExpiringDict(max_len=10000, max_age_seconds=86400)


def parse_submission(submission):
    # print(submission.title.split("]", "-"))
    location_header = re.split("\[|-|\]", submission.title)
    return {
        "author": submission.author.name,
        "created_utc": submission.created_utc,
        "title": submission.title,
        "url": submission.url,
        "selftext": submission.selftext,
        "country": location_header[1] if len(location_header) >= 2 else None,
        "state": location_header[2] if len(location_header) >= 3 else None,
    }


app = Flask(__name__)


@app.route("/new_posts", methods=["GET"])
def new_posts():
    request_state = request.args.get("state")
    request_exclude_unknown = request.args.get("excludeUnknown")
    posts = []
    for submission in subreddit.new(limit=10):
        if submission.title not in submissions_dict:
            formatted_submission = parse_submission(submission)
            if (
                not request_state
                or formatted_submission["state"] == request_state
                or (not formatted_submission["state"] and request_exclude_unknown)
            ):
                posts.append(formatted_submission)
                submissions_dict[submission.title] = formatted_submission
    return jsonify(posts)
