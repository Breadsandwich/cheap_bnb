# Cheap BnB

## Overview
[Cheapbnb](https://cheap-bnb.herokuapp.com/) was inspired by the popular vacation rental platform [Airbnb](https://www.airbnb.com/).

| [Database Schema](https://github.com/Breadsandwich/cheap_bnb/wiki/Database-Schema) | [Feature List](https://github.com/Breadsandwich/cheap_bnb/wiki/Feature-List) | [User Stories](https://github.com/Breadsandwich/cheap_bnb/wiki/User-Stories) |

## Technologies used
**Frontend**
| JavaScript | Node.js | React | Redux | CSS | HTML |

**Backend**
| Python | Flask | SQLAlchemy | PostgreSQL | AWS S3 | Docker |

## Local Development Setup
1. Clone this repository `git clone git@github.com:Breadsandwich/cheap_bnb.git`
2. Install dependencies  `pipenv install --dev -r dev-requirements.txt && pipenv install -r requirements.txt`
3. Create a `.env` in your root based off the `env.example`.
4. Set up postgresql user and database so it matches your `.env` file.
5. Get into pipenv, migrate the database, seed the database, and run the flask app using the following commands:
   * `pipenv shell`
   * `flask db upgrade`
   * `flask seed all`
   * `flask run`
6. cd into react-app and run `npm install` then `npm start`

## Production Deployment on Dokploy

### Prerequisites
- A Dokploy account
- PostgreSQL database (can be provisioned through Dokploy)
- AWS S3 bucket for file uploads
- Domain name (optional)

### Environment Variables
Set the following environment variables in your Dokploy dashboard:

```bash
# Flask Configuration
FLASK_APP=app
FLASK_ENV=production
SECRET_KEY=your-super-secret-key-change-this-in-production

# Database Configuration
DATABASE_URL=postgresql://username:password@host:port/database

# AWS S3 Configuration (for file uploads)
AWS_ACCESS_KEY_ID=your-aws-access-key
AWS_SECRET_ACCESS_KEY=your-aws-secret-key
AWS_DEFAULT_REGION=us-east-1
AWS_S3_BUCKET=your-s3-bucket-name

# CORS Configuration
CORS_ORIGINS=https://yourdomain.com,https://www.yourdomain.com

# Logging
LOG_LEVEL=INFO

# SQLAlchemy (for debugging - set to False in production)
SQLALCHEMY_ECHO=False
```

### Deployment Steps
1. Connect your GitHub repository to Dokploy
2. Configure the environment variables above
3. Deploy using the `dokploy.yaml` configuration
4. Run database migrations: `flask db upgrade`
5. Seed the database: `flask seed all`

### Docker Build
The application uses a multi-stage Docker build:
- Stage 1: Build React frontend with Node.js
- Stage 2: Production Python environment with Gunicorn

## Features
### Splash page
New users have access to explore spots and can either make a new account, or login with the demo user to explore all features.
![Splashpage](./images/homepage.PNG)

### Explore page
All users can browse listed spots on this page.
![Explore](./images/explorePage.PNG)

### Create a new spot
Authorized users can create and host a new spot on this page.
![CreateSpot](./images/spotForm.PNG)

### Spot details
Here all users can view spot details but only logged in users can edit or delete.
![spotPage](./images/spotPage.PNG)

### Reviews
All users can view reviews but only logged in users can create, edit, and delete them.
![Reviews](./images/reviewSection.PNG)

## Production Features
- **Security**: HTTPS redirect, secure cookies, CSRF protection
- **Performance**: Gunicorn with multiple workers, optimized Docker build
- **Monitoring**: Health checks, logging, error handling
- **Scalability**: Auto-scaling configuration, resource limits
- **File Storage**: AWS S3 integration for image uploads
