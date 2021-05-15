# Flask Captcha REST API Summary 

* This is a simple REST API that just listens for incoming request at /api/auth/<token> endpoint. Expects to receive a token that can be used to verify the action.

## Setup 

For Setup I have provided two options, the first option is recommended but for further development go with #2 to further develop the REST API.

### Option 1: What is needed to run `../docker-compose`?

The only file that is needed to run this in docker-compose is the `.env` file. Add your SECRET_KEY_reCAPTCHA to the file or echo command below:
  ```sh
  touch .env
  echo "SECRET_KEY_reCAPTCHA=?" >> ./.env
  echo "FLASK_APP='run.py'" >> ./.env
  echo "FLASK_RUN_HOST='0.0.0.0'" >> ./.env
  ```

### Option 2: Run with `Flask run`? 

Pythons Virtual Environment is only needed if you want to run it with `flask run`. If so, here are the steps:

Execute the following commands:
1. Create Python Virtual Environment 
  ``` sh
  python3 -m venv .venv 
  pip install -r requirements.txt
  ```
2. Make a hidden folder named `.env` add the following and your reCAPTCHAkey.
  ```sh
  touch .env
  ```
  ```
  SECRET_KEY_reCAPTCHA=''
  FLASK_APP='run.py'
  FLASK_RUN_HOST='0.0.0.0'
  ```
3. Please don't forget your reCAPTCHAkey in the `.env` file.
4. Run Application Locally
  `flask run`
