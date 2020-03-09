# Headstorm Frontend Challenge

by Javier Castro

## How to run

1. Navigate to the FrontEnd directory and edit the `config.php` file to include your reCAPTCHA API keys.
2. Point a webserver to the FrontEnd directory
3. Start the webserver

   webserver should display `http://localhost/index.html`

   `index.html` is a sample home page

4. Navigate to the `Contact Us` page by clicking on the button in the Navigation bar

   NOTE: the webserver must be configured to run php

## How to test

1. Once in the `Contact Us` page, fill out the form

   Data is validated both in frontend and backend, so enter appropriate First Name (required), Last Name (required), Email (required) and Message (required).

2. Click the submit button

   Once the button is clicked, the reCAPTCHA is checked. As per the documentation:

   > 1.0 is very likely a good interaction, 0.0 is very likely a bot

   If the score is >= 0.5 the form is submitted for processing

   If the score is < 0.5 the form is NOT submitted for processing

3. Open the browser console to see the form information dump
