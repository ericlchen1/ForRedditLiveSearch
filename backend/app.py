import praw
from dotenv import load_dotenv
import os
from flask import Flask, jsonify, request
from expiringdict import ExpiringDict
import re
import threading
from sortedcontainers import SortedList
import json

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


def parse_submission(submission: praw.reddit.Submission):
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


# TODO: Change to redis later
sorted_posts = SortedList(key=lambda x: -x["created_utc"])


def background_update(sorted_posts: SortedList):
    for submission in subreddit.stream.submissions():
        formatted_submission = parse_submission(submission)
        sorted_posts.add(formatted_submission)
        if len(sorted_posts) > 1000:  # Keep below 1000 elements
            sorted_posts.pop()


thread = threading.Thread(
    name="background_update", target=background_update, args=[sorted_posts]
)
thread.setDaemon(True)
thread.start()

app = Flask(__name__)


@app.route("/all_posts_stream", methods=["GET"])
def all_posts_stream():
    def generate():
        for post in sorted_posts:
            yield f'{json.dumps(post)}\n'

    return app.response_class(generate(), mimetype="application/json")


@app.route("/new_posts_stream", methods=["GET"])
def new_posts_stream():
    request_state = request.args.get("state")
    request_exclude_unknown = request.args.get("excludeUnknown")

    def generate():
        for submission in subreddit.stream.submissions(skip_existing=True):
            formatted_submission = parse_submission(submission)
            if (
                not request_state
                or formatted_submission["state"] == request_state
                or (not formatted_submission["state"] and request_exclude_unknown)
            ):
                yield f'{json.dumps(formatted_submission)}\n'

    return app.response_class(generate(), mimetype="application/json")


if __name__ == "__main__":
    app.run()
