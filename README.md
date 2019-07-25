# Project Name

LUXIFY APP

## Description
Real-state app for sell and buy luxury houses.
 
## User Stories

- **404** - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault 
- **500** - As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault
- **homepage** - As a user I want to be able to access the homepage so that I see what the app is about and login and signup
- **sign up** - As a user I want to sign up on the webpage so that I can see all the events that I could attend
- **login** - As a user I want to be able to log in on the webpage so that I can get back to my account
- **logout** - As a user I want to be able to log out from the webpage so that I can make sure no one will access my account
- **houses-buy list** - As a user I want to see all the houses available to buy, so that I can choose which ones I want to attend
- **house-sell** - As a user I want to sell my house.
- **sell create** - As a user I want to create a sell.
- **houses detail** - As a user I want to set the details of the house I want to sell.
- **contact buyer** - As a seller I want the house costumers to contact me if they are interested.
## Backlog

List of other features outside of the MVPs scope

User profile:
- create a profile 
- see my profile
- upload my profile picture
- edit my profile
- delete my profile

House for sell profile:
- create an add
- edit the add of a sell
- upload pictures of the house
- delete the add
- set the details of the house

Geo Location:
- add geolocation to the houses
- show all houses in a map in the homepage.

Homepage
- A navbar with icons to the respective sections of the app.
- List of houses for sell
- option to sell a house
- most viewed adds
- map of all the houses globally


## ROUTES:

- GET / 
  - redirects to signup page

- GET /auth/signup
  - redirects to / if user logged in
  - renders the signup form (with flash msg)

- POST /auth/signup
  - redirects to / if user logged in
  - body:
    - name
    - email
    - password

- GET /auth/login
  - redirects to / if user logged in
  - renders the login form (with flash msg)

- POST /auth/login
  - redirects to / if user logged in
  - body:
    - email
    - password

- POST /auth/logout
  - redirects to login page

- GET /auth/home
  - renders the home page 
    
- GET /auth/home/sells
  - renders the sell form  
  - redirects to create sell page
  
- POST auth/home/sells
  - redirects to /auth/home/sells/:id
  - body: 
    - Title
    - Location
    - description
    - details:
        - area
        - rooms (sel)
        - bathrooms(sel)
        - Garden (sel)
        - swimming pool (sel)
        - private beach

- GET /auth/home/sells/:id
  - renders add of the house detail page
  - attend button if user wants to contact

- POST /auth/home/sells/:id 
  - body: (contacts the seller)

- GET /auth/home/profile
  - renders profile page
  - redirects to edit profile page
  - redirects to my sells page
  - redirects to my likes page
  - redirects to logout page

- GET /auth/home/profile/edit
  - renders edits profile page
  - delete profile button
  - update information button

- POST /auth/home/profile/edit
  - redirects to /profile if update button is pressed
  - redirects to /auth/login if delete button is pressed 
  - body:
    - profile photo
    - name
    - surname
    - email
    - password
    - location

- GET /auth/home/profile/my-sells
  - renders my sells page
  - redirect to house detail page

- GET /auth/home/profile/sells/:id
  - renders house detail page if edit button is pressed

- GET /auth/home/profile/sells/:id/edit
  - renders edits house page details

- POST /auth/home/profile/sells/:id/edit
  - redirects to /:id if update button is pressed
  - redirects to /auth/home/profile/my-sells if delete button is pressed 
  - body: 
    - Title
    - Location
    - description
    - details:
        - area
        - rooms (sel)
        - bathrooms(sel)
        - Garden (sel)
        - swimming pool (sel)
        - private beach


## Models

User model - Login
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }

User model - Signup
  name: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }


House detail model
  title: {
    type: String,
    required: true,
    unique: false
  },
  location: {
    type: 'Point',
    cordinates: []
  },
  description: {
    type: String,
    required: true,
    unique: false
  },
  details: {
    area: {
      type: String,
      required: true,
      unique: false
    },
    rooms: {
      type: Number,
      required: true,
      unique: false
    },
    bathrooms: {
      type: Number,
      required: true,
      unique: false
    },
    garden: {
      type: Boolean,
      required: true,
      unique: false
    },
    swimming pool: {
      type: Boolean,
      required: true,
      unique: false
    },
    private beach: {
      type: Boolean,
      required: true,
      unique: false
    }
  }
       

## Links


### Trello

[Link to your trello board](https://trello.com) or picture of your physical board

### Git

The url to your repository and to your deployed project

[https://github.com/EdgarCastrillo/luxify-app](http://github.com)

[Deploy Link](http://heroku.com)

### Slides

The url to your presentation slides

[Slides Link](http://slides.com)
