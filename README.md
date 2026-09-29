\# QuickLink - URL Shortener



QuickLink is a full-stack URL shortening application that converts long URLs into short, easy-to-share links.



The application allows users to enter a valid URL, generate a unique short code, redirect through the shortened URL, and track the number of clicks.



\## Features



\- Shorten long URLs into unique short links

\- Redirect users to the original URL

\- URL validation

\- HTTP and HTTPS URL support

\- Click tracking

\- URL statistics

\- MongoDB database integration

\- Unique short codes

\- MongoDB indexing for efficient short-code lookup

\- Copy shortened URL

\- Responsive and user-friendly interface

\- Error handling for invalid or unavailable URLs



\## Technologies Used



\### Frontend

\- HTML5

\- CSS3

\- JavaScript



\### Backend

\- Node.js

\- Express.js



\### Database

\- MongoDB

\- Mongoose



\### Development Tools

\- Git

\- GitHub

\- PowerShell

\- Postman



\## How It Works



The application follows this flow:



1\. User enters a long URL.

2\. The frontend sends the URL to the backend.

3\. The backend validates the URL.

4\. A unique short code is generated.

5\. The URL and short code are stored in MongoDB.

6\. The generated short URL is returned to the user.

7\. When the short URL is opened, the backend finds the corresponding URL using the short code.

8\. The click count is increased.

9\. The user is redirected to the original URL.



\## Project Structure



```text

url-shortener/

│

├── backend/

│   ├── config/

│   │   └── db.js

│   │

│   ├── controllers/

│   │   └── urlController.js

│   │

│   ├── models/

│   │   └── Url.js

│   │

│   ├── routes/

│   │   └── urlRoutes.js

│   │

│   ├── utils/

│   │   └── generateCode.js

│   │

│   └── server.js

│

├── frontend/

│   ├── index.html

│   ├── script.js

│   └── style.css

│

├── .gitignore

├── package.json

├── package-lock.json

└── README.md

