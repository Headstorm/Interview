from flask import Flask
import os
from .data import Data


def init_app(test_config=None):
    # create and configure the app
    app = Flask(__name__, instance_relative_config=True)

    app.config.from_mapping(
        SECRET_KEY='dev'
    )

    @app.route('/setup')
    def setup_page():
        return "Site built correctly!"

    # set testing config
    if test_config is None:
        # load the instance config, if it exists, when not testing
        app.config.from_pyfile('config.py', silent=True)
    else:
        # load the test config if passed in
        app.config.from_mapping(test_config)

    # makes sure there's a local instance folder
    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    return app


app = init_app()
responder = Data()

from app import routes
