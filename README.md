# Reader-Reply

## Table of Contents
- [Description](#description)
- [User Story and Acceptance Criteria](#user-story-and-acceptance-criteria)
  - [User Story](#user-story)
  - [Acceptance Criteria](#acceptance-criteria)
- [Installation](#installation)
- [Usage](#usage)
- [Mock-Up](#mock-up)
- [Credits](#credits)
  - [Contributors](#contributors)
  - [Citations](#citations)
- [License](#license)

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

## Installation

### Prerequisites
Before you begin, ensure you have the following installed on your local machine:

- [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/)
  - Check if Node.js and npm are installed by running the following commands in your terminal:
    ```bash
    node -v
    npm -v
    ```

- [PostgreSQL](https://www.postgresql.org/)
  - Ensure PostgreSQL is installed, the database server is running, and you have created a database for the project.

### Cloning the Repository
1. Clone the repository to your local machine:
   ```bash
   git clone https://github.com/yourusername/reader-reply.git

2. Navigate into the project directory:
    ```bash
    cd reader-reply

### Installing Dependencies
1. Install the project dependencies using npm:
    ```bash
    npm install

### Environment Variables
1. Create a .env file in the root directory of the project.
2. Add the following environment variables to the .env file, replacing the placeholder values with your actual database credentials:
    ```bash
    DB_NAME=your_database_name
    DB_USER=your_database_user
    DB_PASSWORD=your_database_password

### Database Setup
1. Set up the database schema by running:
    ```bash
    npm run db:schema

### Running the Application
1. Start the application:
    ```bash
    npm start
2. Open your web browser and go to http://localhost:3001 to view the application.

## Usage

### Starting the Application

*   Start the application
    ```bash
    npm start

*   Open your web browser and navigate to http://localhost:3001.

### User Authentication

*   Sign up for a new account or log in using your existing credentials.
*   After logging in, you will be redirected to the dashboard.

### Creating and Editing Chapters

*   From the dashboard, click the "Create New" button to start a new chapter.
*   Use the content editor to write your chapter. Grammarly suggestions will appear in real-time as you type.
*   Save your chapter by clicking the "Save" button. You can also edit existing chapters by selecting them from your dashboard.

### Commenting on Chapters
*   Explore other users' works via the "Discover" page.
*   Click on a chapter to read it and leave comments at the bottom of the chapter page.

### Profile Management
*   Access your profile by clicking on your username in the top-right corner of the page.
*   Edit your bio and update your password from your profile page.

### Logging Out
*   To log out, click the "Log Out" button in the navigation bar. This will end your session and redirect you to the login page.

## Mock-Up
The following image shows the web application's appearance and functionality:

![Homepage welcoming user](/public/assets/01_homepage.png)

![User signup page view](/public/assets/02_signup.png)

![user login page view](/public/assets/03_login.png)

![Dashboard view with zen quote, currently reading, continue writing, and New York Times Best Seller lists](/public/assets/04_dashboard.png)

![Editor page for users to enter their work](/public/assets/05_editor.png)

![Discover page listing all published works from all users](/public/assets/06_discover.png)

![Story page showing story and comment form](/public/assets/07_story.png)

![User profile page with editing ability](/public/assets/08_user_profile.png)

![Author Profile view with limited information and links to all author's works](/public/assets/09_author_profile.png)

## Credits

### Contributors

*   McQuade, Jacqlyn: https://github.com/JacqMcQ

*   Stanton, Krystal: https://github.com/bldambtn

*   Vera, Christopher: https://github.com/chrvera

### Citations

*   AltCHA. (n.d.). AltCHA [Homepage]. Retrieved August 22, 2024, from https://altcha.org/

*   Axios. (n.d.). Introduction to Axios. Axios HTTP Documentation. Retrieved August 22, 2024, from https://axios-http.com/docs/intro

*   bcrypt. (n.d.). bcrypt [npm package]. Retrieved August 19, 2024, from https://www.npmjs.com/package/bcrypt

*   Coolors. (n.d.). Coolors [Homepage]. Retrieved August 15, 2024, from https://coolors.co/

*   Express.js. (n.d.). Using Middleware [Express.js documentation]. Retrieved August 15, 2024, from https://expressjs.com/en/guide/using-middleware.html

*   GitHub. (n.d.). expressjs/session: cookie [GitHub repository]. Retrieved August 15, 2024, from https://github.com/expressjs/session#cookie

*   Google. (n.d.). reCAPTCHA [About page]. Retrieved August 20, 2024, from https://www.google.com/recaptcha/about/

*   Grammarly. (n.d.). Grammarly [Homepage]. Retrieved August 14, 2024, from https://www.grammarly.com/

*   Hemingway Editor. (n.d.). Hemingway App [Homepage]. Retrieved August 23, 2024, from https://hemingwayapp.com/

*   MDN Web Docs. (n.d.). Model-View-Controller (MVC). Retrieved August 14, 2024, from https://developer.mozilla.org/en-US/docs/Glossary/MVC

*   npm, Inc. (n.d.). svg-captcha (Version 1.4.0) [npm package]. Retrieved August 23, 2024, from https://www.npmjs.com/package/svg-captcha

*   OpenAI. (2024, August 22). Explanation of Axios and how to use it [ChatGPT conversation]. Retrieved from https://chatgpt.com/share/70dabd4d-34a7-4826-8c90-dffdd2d9dcf2

*   Pexels. (n.d.). Black and red typewriter on white table [Photo]. Retrieved August 25, 2024, from https://www.pexels.com/photo/black-and-red-typewriter-on-white-table-3695297/

*   Pexels. (n.d.). Black tablet computer behind books [Photo]. Retrieved August 15, 2024, from https://www.pexels.com/photo/black-tablet-computer-behind-books-1329571/

*   Pexels. (n.d.). Woman sitting with book and coffee cup [Photo]. Retrieved August 15, 2024, from https://www.pexels.com/photo/woman-sitting-with-book-and-coffee-cup-21366949/

*   pg. (n.d.). pg [npm package]. Retrieved August 15, 2024, from https://www.npmjs.com/package/pg

*   PrivacyPolicies. (n.d.). Sample Terms of Use Template [Blog post]. Retrieved August 23, 2024, from https://www.privacypolicies.com/blog/sample-terms-use-template/

*   ProWritingAid. (n.d.). ProWritingAid [Homepage]. Retrieved August 22, 2024, from https://prowritingaid.com/

*   Render. (n.d.). Adding multiple databases to a single instance [Render documentation]. Retrieved August 22, 2024, from https://docs.render.com/databases#adding-multiple-databases-to-a-single-instance

*   Render. (n.d.). Databases [Render documentation]. Retrieved August 22, 2024, from https://docs.render.com/databases

*   Render. (n.d.). Deploys [Render documentation]. Retrieved August 22, 2024, from https://docs.render.com/deploys

*   Sequelize. (n.d.). Model Basics [Sequelize documentation]. Retrieved August 15, 2024, from https://sequelize.org/docs/v6/core-concepts/model-basics/

*   TermsFeed. (n.d.). Sample Terms of Use Template [Blog post]. Retrieved August 24, 2024, from https://www.termsfeed.com/blog/sample-terms-of-use-template/

*   TrustCAPTCHA. (n.d.). TrustCAPTCHA [Homepage]. Retrieved August 20, 2024, from https://www.trustcaptcha.com/en

*   U.S. Copyright Office. (n.d.). Copyright [Homepage]. Retrieved August 14, 2024, from https://www.copyright.gov/

*   University of Texas at Austin. (n.d.). UTA-VIRT-FSF-PT-05-2024-U-LOLC [GitHub content]. Retrieved August 15, 2024, from https://git.bootcampcontent.com/University-of-Texas-at-Austin/UTA-VIRT-FSF-PT-05-2024-U-LOLC

*   W3Schools. (n.d.). AJAX Introduction. Retrieved August 23, 2024, from https://www.w3schools.com/js/js_ajax_intro.asp

*   Wikipedia. (n.d.). Model-View-Controller (MVC). Retrieved August 14, 2024, from https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller

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

[Back to Top](#table-of-contents)
