import os
from flask import Flask


def init_app(test_config=None):
    # init the app

    app = Flask(__name__)
    # setup page to enable checking init
    @app.route('/setup')
    def setup_page():
        return "Site built correctly!"

    # set testing config
    if test_config is None:
        pass
    else:
        # load the test config if passed in
        app.config.from_mapping(test_config)

    # makes sure there's a local instance folder
    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    return app
