from os import environ, path
from dotenv import load_dotenv
"""Flask configuration."""


# This file should be in a Directory called Instance or Config.
# Not for this example REST API.
basedir = path.abspath(path.dirname(__file__))
load_dotenv(path.join(basedir, '.env'))

TESTING = True
DEBUG = True
FLASK_ENV = 'development'
