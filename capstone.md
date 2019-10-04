# Capstone Proposal

The below is the proposal for my capstone project. The deadline for the initial MVP is Friday, September 27th, with presentations likely taking place the week of Monday, October 14th.

## Name

**Food Cart City** - Following in the footsteps of Rose City, Rip City, Bridge City, etc., the #1 destination for food carts in the country deserves yet another nickname, alongside a dedicated app

## Project Overview

**What are the major features of your web application?**
* Displays Google map of Portland with icons for each food cart, as well as distinct colorings for each neighborhood
* Allows for filtering of food carts based on various criteria: _Neighborhood, Cuisine, Distance, Price & Operating Hours_
* When selected, each food cart will display their name, photo, description, contact info and menu
* User management system, with ability to login to select favorites, as well as a customer history to store notes on carts previously visited and meals previously tasted

**What problem is it attempting to solve?**
* The app is intended to simplify the process of locating a food cart in Portland
* It will also declutter the search and allow for easier access to the most pertinent information

**What libraries or frameworks will you use?**
* The backend will be handled with Django and SQLite
* Much of the data will be acquired with Yelp API
* Google API will be needed to operate the map and geolocation
* The front-end display will either be written with vanilla CSS or Bootstrap
* Interaction will be handled by either vanilla JavaScript or Vue.js

## Features

### User Story #1:
* As a fan of food carts, I want a way to quickly see all of the food carts in Portland because I would be interested in eating at one and want to see what options are available.

### Tasks:
* Gather the data of the food carts in Portland / store in model table
* Display back to user in gallery format

### User Story #2:
* As a picky person, I want to be able to choose a food cart based on a variety of preferences, such as cuisine and price, because I know what I want and don't want to overspend.

### Tasks:
* Create functions to enable filters
* Allow access to the functions by embedding them into the main page in the filter bar
* When clicked, run function and display only the food carts that meet the criteria

### User Story #3:
* As a lazy person, I want to be able to locate the food carts nearest to me because I don't want to travel far. 

### Tasks:
* Enable geolocation feature and filter the food carts based on distance from user.

### User Story #4:
* As a frequest user, I want to be able to highlight my favorite food carts and also keep track of those which I have visited previously because I have a bad memory.

### Tasks:
* Enable a User Management System, which stores info on users.
* Allow for a way the users can mark the food carts.

## Functionality Questions:

**What will the user see on each page?**
* There will essentially be one main page. This will display the map, the filters and the full listing of the food carts
* There will also be a top header bar, which will feature the logo, app name, a search feature, login option and create an account option

**What can they input and click and see?**
* The user will be able to zoom in and out of the map, click the icons to display info on the food carts, click the various filters and select a drop-down option and click on the food cart squares to also display info on the relevant food cart. They can also search for food carts by name, sign in and register for an account.

**How will their actions correspond to events on the back-end?**
* Users will not be able to edit the food cart database itself, as this information would only change if the food cart themselves either moved, closed, changed their menu, prices, etc.
* The user's clicks on different filters would activate various views.
* The users would also be able to create an account, edit their profile, select favorite food carts, select visited carts, add notes, etc. This woud be tied solely to their profiles.

## Data Model

* **User:** Username, First Name, Last Name, Email, Password
* **Profile:** Display Name, Photo, Neighborhood, Favorite Cart(s), Visited Cart(s)
* **Carts:** Name, Photo, Address, Phone Number, Website, Neighborhood, Cuisine, Price Range, Operating Hours, Menu

## Schedule

### Cycle One: Bare Bones MVP

* **Backend:** Import all food cart data into database, potentially with Yelp API _(Build or update incomplete details, where necessary)_
* **Frontend:** Create simple navbar - just name of the app, plus logo, if ready
* **Frontend:** Create filter bar with dropdowns _(Hide the filters not yet programmed - all to start)_
* **Frontend:** Create the section for the food cart gallery
* **Backend:** Display all of the carts in the dedicated gallery, likely using a for loop
* **Frontend:** Create a window pop-up / detail view and enable it to be displayed when food cart square is clicked

### Cycle Two: Add Filters

* **Backend:** Write programs to allow filtering based on various metrics. To start, focus on the simpler filters, such as cuisine and neighborhood, then add hours and/or price. Distance will come with a separate cycle
* **Frontend:** Show the now active dropdowns in the filter bar. Little else likely needs to be done on the frontend during this cycle

### Cycle Three: Add Location Features

* **Backend:** Use a Google Map API or equivalent to locate user based on IP
* **Backend:** Write a function that determines the distance of the user from each food cart and filters based off of which are nearest
* **Frontend:** Show the now active distance option in the filter bar

### Cycle Four: Add Google Map

* **Backend:** Use a Google Map API or equivalent to create a custom map and place each food cart at their respective locations
* **Backend:** Draw boundaries around each neighborhood and shade with distinct colors
* **Frontend:** Display the Google Map on the website between the top bar and the filter bar. It will be one of the first things the user will see when opening the site
* **Frontend:** Add various icons to food cart placement, based on cuisine _(taco icon for mexican food, etc.)_
* **Frontend:** Ensure icons are clickable and the food cart info pops up when accessed

### Cycle Five: Implement User Management System

* **Frontend:** Add a sign in and register link to the top bar
* **Frontend:** Create a separate template where users can create their own profile
* **Backend:** Store all of the inputted information into a user database

## Ranking The Product Backlog

* **Essential Features:**
  * Display all of the food carts in a gallery-style view
  * Click on a food cart square and all of the pertinent information regarding each food cart is displayed
  * Filter by various metrics _(Neighborhood, Cuisine, Distance, Price, Hours)_
* **Really-Great-To-Haves:**
  * User location functionality - locate user, ascertain distance to respective food carts
  * Google Map with icons for each food cart
  * Distinct neighborhood boundaries on the Google Map
  * User Management System with ability to mark favorite and visited food carts
* **Nice-To-Haves:**
  * Expanded user management system with ability to write internal reviews on food carts / specific dishes
