## Overview
[Cheapbnb](https://cheap-bnb.herokuapp.com/) was inspired by the popular vacation rental platform [Airbnb](https://www.airbnb.com/).

## Technologies used
**Frontend**
Javascript | Nodejs | React | Redux |  CSS | HTML

**Backend**
Python | Flask | SQLAlchemy | PostgreSQL | AWS S3 |

##Cheapbnb setup
1. Clone this repository `git clone git@github.com:Breadsandwich/cheap_bnb.git`
2. Install dependencies  `pipenv install --dev -r dev-requirements.txt && pipenv install -r requirements.txt`
3. Create a `.env` in your root based off the `.env.example`.
4. Set up postgresql user and database so it matches your `.env` file.
5. Get into pipenv, migrate the database, seed the database, and run the flask app using the following commands:
   * `pipenv shell`
   * `flask db upgrade`
   * `flask seed all`
   * `flask run`
6. cd into react-app and run `npm install` then `npm start`


## Features
### Splash page
New users have access to explore spots and can either make a new account, or login with the demo user to explore all features.
[Splashpage](./images/homepage.PNG)

### Explore page
All users can browse listed spots on this page.
[Explore](./images/explorePage.PNG)

### Create a new spot
authorized users can create and host a new spot on this page.
[CreateSpot](./images/spotForm.PNG)

### spot details
Here all users can view spot details but only logged in users can edit or delete.
[spotPage](./images/spotPage.PNG)

### Reviews
All users can view reviews but only logged in users can create, edit, and delete them.
[Reviews](./images/reviewSection.PNG)
