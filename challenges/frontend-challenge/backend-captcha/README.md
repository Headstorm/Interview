# Flask Captcha REST API Summary 

* This is a simple REST API that just listens for incoming request at /api/auth/<token> endpoint. Expects to receive a token that can be used to verify the action.


# Setup | Installation Locally

Execute the following commands:
1. Create Python Virtual Environment 
  ``` sh
  python3 -m venv .venv 
  pip install -r requirements.txt
  ```
2. Make a hidden folder named `.env` add the following and your reCAPTCHAkey.
  ```sh
  touch .env
  SECRET_KEY_reCAPTCHA=''
  FLASK_APP='run.py'
  FLASK_RUN_HOST='0.0.0.0'
  ```
3. Please don't forget your reCAPTCHAkey in the `.env` file.
4. Run Application Locally
  `flask run`
