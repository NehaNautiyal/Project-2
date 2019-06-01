# iBetYa

## Authors
* Sean M. @seanmun
* Will A. @wabbot24
* Esin G. @esingokgoz
* Ann L. @ann-leonard
* Neha N. @nehanautiyal

## Overview
The purpose of this app is to provide a platform for users to keep track of the bets they create with friends, no matter the length. 

##  Technologies Used

### Front-End
* HTML
* CSS
* Bootstrap
* Sweetalert

### Database
* MySQL

### Back-end
* Express
* Passport
* Sequelize

### Dependencies
* body-parser
* connect-flash
* cookie-parser
* dotenv
* ejs
* express
* express-messages
* express-session
* express-validator
* mysql2
* nodemailer
* passport
* passport-local
* path
* sequelize

## How it Works
1. The landing page for this app is the signup/login page. Only registered users are able to make and see bets. 
2. Once a user logs in, they can see their account info on the account page. Currently, the user can see their username and current balance of credits.
3. The navigation bar allows the user to choose to either `Make Bet` or see `All Bets`. 
    - If a user creates a new bet, they are directed to fill out a form with required fields. 
        - If the user wants to bet against someone who is not a user, an email will be send to that challenger and that challenger will be required to sign up. 
        - If the challenger is a registered user, they can click the link they receive in their email to see the bet. 

## Next Steps
* We want challengers to be able to `accept` or `decline` a bet. 
* There is currently a bug where if any user visits the `All Bets` page, they are not able to then `Make Bet` because it doesn't track the user in the url. 
* Introduce a meditator that can settle a bet if the user and challenger cannot decide on who won.
* Allow users to share on social media.

## Link to Deployed Site

(http://www.ibetya.io)
