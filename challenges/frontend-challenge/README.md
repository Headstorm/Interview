# Frontend Challenge Review

This was a great challenge, my goal was to provide a solution that can be built upon if the company was to accept the terms. 

## My Approach 
My approach was very straight forward, a few weeks prior, I had very briefly learned React and how to develop reusable components with the use of React Hook's. Throughout the development of the Contact-Us form I aimed to follow the DRY(Don't Repeat Yourself) principle. Once completing the creation of the form I aimed to implement the reCaptcha.

## Google reCaptcha
At first glance, reCaptcha's documentation was a bit confusing, until, I realized that it's functionality is similar to JWT Authentication, once I was able to connect the two ideas, I began implementation. 

# Setup 

Please go into each sub-directory, except `./gateway` as there isn't any setup needed, follow the 'README' instructions to get them setup. 

* In order to successfully execute `docker-compose run --build`, make sure to have done the following in each directory:
  * `.env` file in `./backend-captcha` with the needed configurations. (e.g. reCAPTCHA_secrete_key, `FLASK_ENV='run.py'`, `FLASK_RUN_HOST='0.0.0.0'` )
  * `.env` && `.env.local` files in `./frontend` with the needed configurations. (e.g. reCAPTCHA_site_key)
