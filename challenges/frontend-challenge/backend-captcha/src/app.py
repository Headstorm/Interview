from os import environ
from flask import Flask
import requests


app = Flask(__name__)
app.config.from_pyfile('../config.py')
_SECRET_KEY = environ.get('SECRET_KEY_reCAPTCHA')


def is_human(captcha_response):

    # Payload
    data = {
        'response': captcha_response,
        'secret': _SECRET_KEY
    }
    resp = requests.post(
        'https://www.google.com/recaptcha/api/siteverify', data=data)
    result_json = resp.json()  # Convert to JSON
    return result_json


@app.route('/api', defaults={'token': None})
@app.route('/api/auth/<token>')
def auth(token=None):
    if token == None:
        return "Please provide a token so I can validated you."
    else:
        return is_human(token)
