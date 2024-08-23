# Reader-Reply

## Descrption
Reader-Reply is a writing and feedback platform is designed for aspiring webnovel authors to publish, edit, and receive feedback on their work. It includes features like user authentication, chapter posting, commenting, milestone rewards, Grammarly integration for grammar checking, and the Zen Quote API for writing inspiration. The platform follows the MVC architecture using Node.js, Express.js, Handlebars.js, and PostgreSQL, and is fully deployed on Render.

## User Story and Acceptace Criteria

### User Story

```md
AS AN aspiring writer, 
I WANT to receive real-time grammar suggestions and writing inspiration while editing my chapters 
SO THAT I can improve the quality of my content and stay motivated.
```

### Acceptance Criteria

```md
GIVEN a user is on the platform, 
WHEN they enter valid credentials on the sign-up or log-in page, 
THEN they should be authenticated and redirected to the dashboard.
WHEN a user enters invalid credentials, 
THEN they should see an error message and remain on the sign-up or log-in page.
GIVEN a user is logged in and idle for 15 minutes, 
WHEN the timeout occurs, 
THEN they should be automatically logged out and redirected to the login page with a message indicating the session has expired.
GIVEN a user is not logged in, 
WHEN they try to access any page other than the login or sign-up pages, 
THEN they should be redirected to the login page with an error message.
GIVEN a user is logged in and viewing the dashboard, 
WHEN the dashboard loads, 
THEN a Zen Quote should be displayed to provide writing inspiration.
GIVEN a user is logged in and viewing the dashboard, 
WHEN they click the 'Create New' button, 
THEN a new content editor should open, allowing them to start writing.
GIVEN a user is logged in and viewing the dashboard, 
WHEN they view the list of their previously read content, 
THEN they should be able to click on links to continue reading from where they left off.
GIVEN a user is logged in and viewing the dashboard, 
WHEN they see a list of their work, 
THEN they should be able to click on links to view comments left on their work.
GIVEN a user is logged in, 
WHEN they click on the 'Discover' link, 
THEN they should be taken to a page where they can see and explore other users' works.
GIVEN a user is logged in and viewing another user's work, 
WHEN they leave a comment, 
THEN the comment should be saved and displayed under the work, along with their username and the date.
GIVEN a user is logged in, 
WHEN they click on the profile link, 
THEN they should see their profile information with options to edit their bio and update their password.
WHEN they submit changes to their profile, 
THEN the updates should be saved and reflected in their profile.
GIVEN a user is logged in, 
WHEN they click on another user’s name, 
THEN they should be taken to that user’s profile page, displaying the username and bio.
GIVEN a user is logged in, 
WHEN they click the log out button, 
THEN they should be logged out, their session should end, and they should be redirected to the login page.
```

## Mock-Up

## Credits

### Contributors

*   McQuade, Jacqlyn: https://github.com/JacqMcQ

*   Stanton, Krystal: https://github.com/bldambtn

*   Vera, Christopher: https://github.com/chrvera

### Citations

*   Axios. (n.d.). Introduction to Axios. Axios HTTP Documentation. Retrieved August 22, 2024, from https://axios-http.com/docs/intro

*   bcrypt. (n.d.). npm. Retrieved August 10, 2024, from https://www.npmjs.com/package/bcrypt

*   connect-session-sequelize. (n.d.). npm. Retrieved August 10, 2024, from https://www.npmjs.com/package/connect-session-sequelize

*   dotenv. (n.d.). npm. Retrieved August 10, 2024, from https://www.npmjs.com/package/dotenv

*   express-handlebars. (n.d.). npm. Retrieved August 10, 2024, from https://www.npmjs.com/package/express-handlebars

*   express-session. (n.d.). npm. Retrieved August 10, 2024, from https://www.npmjs.com/package/express-session

*   OpenAI. (2024, August 22). Explanation of Axios and how to use it [ChatGPT conversation]. Retrieved from https://chatgpt.com/share/70dabd4d-34a7-4826-8c90-dffdd2d9dcf2

*   pg. (n.d.). npm. Retrieved August 10, 2024, from https://www.npmjs.com/package/pg

*   sequelize. (n.d.). npm. Retrieved August 10, 2024, from https://www.npmjs.com/package/sequelize

*   ZenQuotes. (n.d.). ZenQuotes API Documentation. ZenQuotes. Retrieved August 22, 2024, from https://docs.zenquotes.io/zenquotes-documentation/#api-structure

## License
MIT License

Copyright (c) 2024 JacqMcQ

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
