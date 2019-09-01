-------------------------------------------------------------------------------
 BRIEF REMARKS BEFORE SUBMISSION
-------------------------------------------------------------------------------
  ...I should start by saying that implementing a Recaptcha in a controlled
  React form component turned out to be trickier than I initially estimated,
  and so I am only "pretty sure" my solution is correct.  I ended up using a
  3rd party library called "reaptcha", which handles the reCaptcha script
  injection and wraps Google's reCaptcha v3 Javascript API into a form that is
  easier to integrate into React components.

  COMPATABILITY: I have mainly tested my solution in a Chrome browser.

  WORKING DEMO: A working demo for my solution to this challenge can be found
  at the following URL:

      https://headstorm-fec.hillert.dev

  ENV VARIABLES: Because this code is not intended for production, I hard-coded
  my sitekey into the app. However, I have included at the end of this file a
  description of what I would do to secure sensitive data and platform specific
  environment variables.

  TESTING: I decided to not include tests because they would have added about
  50% more time to the project (at my current skill level), because the
  instructions did not require them, and because feedback on web forums indicated
  reCaptcha's are somewhat tricky to test.  However, if you would like me to test
  certain parts of the code, please let me know and I will be happy to do so.

  STACK INFO: The solution is coded in Javascript and React. Styling is done via
  the styled-components library, a css-in-js approach. For time considerations,
  I handled configuration via create-react-app library instead of Webpack.

-------------------------------------------------------------------------------
 ABOUT THE FAVICON
-------------------------------------------------------------------------------
  The favicon was made from scratch, or more accurately was an adaptation of
  another icon I made from scratch a few years ago. The software I used to create
  and format the image is called icoFX (https://icofx.ro/).  The file itself is
  in .ico format and includes the following sizes:
    64x64
    32x32
    24x24
    16x16

-------------------------------------------------------------------------------
 ABOUT THE "STARTUP TITLE"
-------------------------------------------------------------------------------
  Blue Squarz, LLC.  Very boring, my apologies.

-------------------------------------------------------------------------------
 LAYOUT - WEB FORM
-------------------------------------------------------------------------------
  Contact Us                                              │ FormTextBlock.js
                                                          │
  Please leave us your message below, along with your     │
  name and email address.  We will do our best to         │
  respond by the end of the next business day.            │
                                                          │
  Thank you.                                              │

  ┌───────────────────────┐ ┌───────────────────────┐     │ [Form.js]
  │ Name                  │ │ Email                 │     │
  └───────────────────────┘ └───────────────────────┘     │
  ┌─────────────────────────────────────────────────┐     │
  │ Subject                                         │     │
  └─────────────────────────────────────────────────┘     │
  ┌─────────────────────────────────────────────────┐     │
  │ Message                                         │     │
  │                                                 │     │
  │                                                 │     │
  │                                                 │     │
  └─────────────────────────────────────────────────┘
                                          ┌────────┐      │ [Form.js]
                                          │ SUBMIT │      │
                                          └────────┘      │

-------------------------------------------------------------------------------
 ASSUMPTIONS
-------------------------------------------------------------------------------
- ok to use quickest way to get started: e.g. create-react-app
  NOT webpack

- Ok to borrow icon if free license. Ok to draw from scratch.

- Does not necessarily need to be cross-browser compatible, but
  having it be would be appreciated

- Preferably is responsive to different device sizes. If extra time,
  the extra time should start being used here.

- "Dump to the browser" means output to Chrome DevTools console via
  "console.log()" or any other code that will cause the console to
  output it.

- Should be dumped to the browser in a format acceptable for storage:
  e.g., JSON

- Does not need to be hosted, but not a bad thing to do if you have
  time to waste

- Extensive code commenting not necessary if care taken to provide
  self-explanatory code.

- Github repos of person who wrote challenges suggests clean, neat
  code would be appreciated.

-------------------------------------------------------------------------------
 RESOURCES
-------------------------------------------------------------------------------
- Google reCaptcha Reference:
    https://developers.google.com/recaptcha/docs/display

-------------------------------------------------------------------------------
 Re HANDLING SENSITIVE DATA & ENVIRONMENT VARIALBES IN A PRODUCTION ENVIRONMENT
-------------------------------------------------------------------------------
  The sitekey is embedded in code below only because this is a coding
  exercise. Ordinarily I would handle storage of the key, other env-
  specific variables, and other sensitive data required DEVELOPMENT
  MODE as follows:
    - Create a ".env" file in the project's root directory. This
      file would hold the actual values;
    - Add ".env" to gitignore file;
    - Make values accessible during runtime using the "dotenv" library
      (accessible via "process.env.MY_ENV_VAR");
    - Avoid use of global variables by creating a ".config" file in
      the project's root directory.  The file includes as an export
      a const variable that is equivalalent to one of the enviroment
      variables in the .env file;
    - In the application itself, refer to the environment variables
      only via the constants declared in the .config file;
    - If there were collaborators on the project, I would include a
      ".env.example" file with dummy values, so that the collaborators
      would have an idea of what they needed to include in their own
      .env files.  ".env.example" would not be added to gitignore.
  For PRODUCTION MODE, I would create the necessary environment variables
  using the hosting platform's console.  There would be no .env file.
