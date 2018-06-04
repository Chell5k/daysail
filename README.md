Table of Contents
=================

   * [Table of Contents](#table-of-contents)
   * [Overview](#overview)
      * [User Stories](#user-stories)
      * [Screenshots](#screenshots)
      * [Components](#components)
      * [Project Design](#project-design)
         * [Technology](#technology)
            * [Middleware](#middleware)
            * [Additional Tools](#additional-tools)
            * [Database Schema](#database-schema)
      * [Key Challenges](#key-challenges)
      * [MVP](#mvp)
      * [Post MVP](#post-mvp)


# Overview
Daysail is a web app that aims to connect recreational sailors and sailboat owners.  Boat owners can submit information about their boats, and recreational sailors get to see the boats in their area and can express interest with "likes".

## User Stories

- A user registers and logs in to the app.
- The user sees a list of all posted boats.
- The user can view the details for one or more boats and clicks "favorite" if he/she likes the boat.
- The user can view a list of their favorite boats.
- A user who owns a boat may:
-- add his/her boat to the app
-- update the information for the boat;
-- delete the boat.

## Screenshots
![](./db_docs/LandingPage.png)
![](./Registration.png)
![](./db_docs/Logon.png)
![](./db_docs/MainPage-Not-Logged-on.png)
![](./db_docs/MainPage-Logged-on.png)


## Components

- Landing page
- Registration Page
- Login page
- Crete new boat
- View of all boats
- View of one boat
- View "faves"
- Edit boat details
- Delete boat

## Project Design
A proposal was submitted during the design phase. A database schema was written as part of the design proposal.

### Technology
- React client
- React Router
- Express server
- node.js
- Postresql database
- Semantic UI React
- JSON Web Tokens
- bcrypt

#### Middleware
- body-parser
- nodemon
- pg-promise
- morgan
- concurrently

#### Additional Tools
- Lucid Chart

#### Database Schema
![](./doc_imgs/Daysail_DB_ERD.png)

## Key Challenges
Users must be authenticated and authorized on to the app for key functions such as saving a favorite or editing/deleting boats.

## MVP
- Users of the app must register and then login.
- Users who own boats can add their boat to the app. Owners can also update or delete their boat information from the app.
- Users not logged on can only view information and cannot make updates.
- All logged on users can look at the boats on the app.
- Users can "like" the boats that they are interested in.
- Users can see a list of the boats they like.

## Post MVP
- Boat owners who have extra space for sailors can post a daysail trip. A daysail is a trip that is less than a day, and starts and ends in the same location.
- Owners can update the trip details and delete the trip.
- Users who would like to crew can join a trip.
- Users can remove themselves from a trip.
