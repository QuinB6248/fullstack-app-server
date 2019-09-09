## TICKETS SERVER

## Table of contents:
- **[What this project is about](#what-this-project-is-about)**
- **[Goal for this project](#goal-for-this-project)**
- **[Getting Started](#getting-started)**
- **[Technologies used](#technologies-used)**
- **[Models](#models)**
- **[Routes](#routes)**
- **[Middleware](#middleware)**
- **[Testing Routes](#testing-routes)**


## What this project is about

Back-end part (REST principles) of a full-stack web-application where users can buy and sell tickets for all kinds of events. 

The app has a login and signup page for customers. You need to login to create events, tickets and posting comments.
Events have:
•	a name
•	a description
•	a picture or logo
•	a start and end date (could be the same)
After you click on an event, you see a list of tickets that are offered for this event.
A ticket is made for a specific event and has an author (the user that created the ticket). Apart from that, it has:
•	a picture of the ticket (optional field)
•	a price
•	a description
When you click on a ticket, you see the details of that ticket (description/price) and which event it's for. On this page you can add comments as a customer, and everybody can see all the comments.
A comment has a text and is connected to a specific ticket. It also has an author.
Anybody can view events and tickets, but you have to login to add a new ticket or comment.

FRAUD RISK ALGORITHM!

Tickets can be fraudulent, and as a customer I don't want to buy a fake ticket! So, we show customers the risk that they are taking when buying the ticket.

The percentage is calculated using the following algorithm:
•	if the ticket is the only ticket of the author, add 10%
•	if the ticket price is lower than the average ticket price for that event, that's a risk
o	if a ticket is X% cheaper than the average price, add X% to the risk
o	if a ticket is X% more expensive than the average price, deduct X% from the risk, with a maximum of 10% deduction
•	if the ticket was added during business hours (9-17), deduct 10% from the risk, if not, add 10% to the risk
•	if there are >3 comments on the ticket, add 5% to the risk
The minimal risk is 5% (there's no such thing as no risk) and the maximum risk is 95%.

## Goal for this project
- Making a functional Full-Stack app


## Getting Started
Clone the repository: Git clone ...
Installing dependencies: npm install
Use Docker in terminal: 
Run a new container with name and password: docker run -p 5432:5432 --name some-postgres -e POSTGRES_PASSWORD=secret -d postgres
In terminal run app with nodemon


## Technologies used

Checkout out: **[technologies.md](./technologies.md)**


## Models
- **[User](./User/model.js)**  
- **[Event](./Event/model.js)**  
- **[Ticket](./Ticket/model.js)**  
- **[Comment](./Comment/model.js)** 


## Routes
- **[User](./User/router.js)**  
- **[Authentication](./auth/router.js)**  
- **[Event](./Event/router.js)**  
- **[Ticket](./Ticket/router.js)**  
- **[Comment](./Comment/router.js)** 


## Middleware
- **[Authorization](./auth/middleware.js)**  


## Testing Routes

### Signup/Login
##### Signup 
http POST :4000/signup name=Tommy email='tommy@cat.nl' password=tommy
##### Login
http POST :4000/login email='tommy@cat.nl' password=tommy
##### Test Authorization
http GET :4000/secret-endpoint Authorization:"Bearer <token>" (testroute for middelware authorization)

### Events
##### Getting All Current Events with limit and offset
http GET :4000/events limit==2 offset==1
##### Post an Event 
http POST :4000/events Authorization:"Bearer <token>" name='<name>' description='<description>' image='<url>' avg_price='<price>' start='year-month-day'  end='year-month-day'
##### Update an Event 
http PUT :4000/events/:id Authorization:"Bearer <token>" name='<name>' description='<description>' image='<url>' avg_price='<price>' start='year-month-day'  end='year-month-day'
##### Delete an Event 
http DELETE :4000/events/:id Authorization:"Bearer <token>"

### Tickets
##### Getting All Tickets of an Event(id) including Event details
http GET :4000/events/:id/tickets
##### Post a Ticket 
###### if the ticket was added during business hours (9-17), -10 is added to riskHour,otherwise 10 is added
http POST :4000/events/:id/tickets Authorization:"Bearer <token>" description='<description>' image='<url>' price='<price>'

##### Getting one Ticket(id) of an Event(id) including Event details
http GET :4000/events/:id/tickets/:ticketId
##### Update a Ticket 
http PATCH :4000/events/:id/tickets/:ticketId Authorization:"Bearer <token>" description='<description>' image='<url>' price='<price>'
##### Delete a Ticket 
http DELETE :4000/events/:id/tickets/:ticketId Authorization:"Bearer <token>" 

### Ticket with Comment
##### Getting one Ticket(id) of an Event(id) including Event details and Comment details
###### find all tickets from the same user: ticket.riskhour will be added to ticket.risk, if ticket.userId has only 1 ticket 10 will be added to ticket.risk, if ticket.price is cheaper then event.avg_price add percentage to ticket.risk, if ticket.price is more expensive then event.avg_price deduct percentage off ticket.risk with max of 10
###### find all comments of the Ticket(id) and include the user how made the comment, if there are more then 3 comments add 5 to ticket.risk
http GET :4000/events/:id/tickets/:ticketId/comments
##### Post a Comment to a Ticket
http POST :4000/events/:id/tickets/:ticketId/comments Authorization:"Bearer <token>" comment='<comment>'
##### Update a Comment 
http PATCH :4000/events/:id/tickets/:ticketId/comments/:commentId Authorization:"Bearer <token>" comment='<comment>'
##### Delete a Comment 
http DELETE :4000/events/:id/tickets/:ticketId/comments/:commentId Authorization:"Bearer <token>" 