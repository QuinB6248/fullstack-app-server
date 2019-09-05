# TICKETS SERVER

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



 **[Goals for this project](#goals-for-this-project)**

## Table of contents:

- **[Technologies used](#technologies-used)**
- **[Goals for this project](#goals-for-this-project)**


## Getting Started
Clone the repository: Git clone ...
Installing dependencies: npm install
Use Docker in terminal: 
Run a new container with name and password: docker run -p 5432:5432 --name some-postgres -e POSTGRES_PASSWORD=secret -d postgres
In terminal run app with nodemon

## Technologies used

#### Docker
tool designed to make it easier to create, deploy, and run applications by using containers. Containers allow a developer to package up an application with all of the parts it needs, such as libraries and other dependencies, and ship it all out as one package. By doing so, thanks to the container, the developer can rest assured that the application will run on any other machine regardless of any customized settings that machine might have that could differ from the machine used for writing and testing the code.
In a way, Docker is a bit like a virtual machine. But unlike a virtual machine, rather than creating a whole virtual operating system, Docker allows applications to use the same kernel as the system that they're running on and only requires applications be shipped with things not already running on the host computer. This gives a significant performance boost and reduces the size of the application.

#### PostgreSQL
PostgreSQL, also known as Postgres, is a free and open-source relational database management system (RDBMS) emphasizing extensibility and technical standards compliance. It is designed to handle a range of workloads, from single machines to data warehouses or Web services with many concurrent users. It is the default database for macOS Server, and is also available for Linux,FreeBSD, OpenBSD, and Windows.

#### express
Library that helps to build webservers, builds on top of Node.js own HTTP modules
Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications. With a myriad of HTTP utility methods and middleware at your disposal, creating a robust API is quick and easy.
express() creates an object.



#### sequelize
Sequelize is a promise-based Node.js ORM for Postgres, MySQL, MariaDB, SQLite and Microsoft SQL Server. It features solid transaction support, relations, eager and lazy loading, read replication and more.

#### bcrypt
password hashing function

#### body-parser
To handle HTTP POST request in Express.js version 4 and above, you need to install middleware module called body-parser.
Body-parser extract the entire body portion of an incoming request stream and exposes it on req.body.

#### cors
Cross-Origin Resource Sharing (CORS) is a mechanism that uses additional HTTP headers to tell a browser to let a web application running at one origin (domain) have permission to access selected resources from a server at a different origin. A web application executes a cross-origin HTTP request when it requests a resource that has a different origin (domain, protocol, and port) than its own origin.

#### jsonwebtoken
a server could generate a token that has the claim "logged in as admin" and provide that to a client. The client could then use that token to prove that it is logged in as admin. The tokens are signed by one party's private key (usually the server's), so that both parties (the other already being, by some suitable and trustworthy means, in possession of the corresponding public key) are able to verify that the token is legitimate.
JWT claims can be typically used to pass identity of authenticated users between an identity provider and a service provider, or any other type of claims as required by business processes.

In authentication, when the user successfully logs in using their credentials, a JSON Web Token will be returned and must be saved locally (typically in local or session storage, but cookies can also be used), instead of the traditional approach of creating a session in the server and returning a cookie.

Whenever the user wants to access a protected route or resource, the user agent should send the JWT, typically in the Authorization header using the Bearer schema. The content of the header might look like the following:

Authorization: Bearer 
This is a stateless authentication mechanism as the user state is never saved in server memory. The server's protected routes will check for a valid JWT in the Authorization header, and if it is present, the user will be allowed to access protected resources. As JWTs are self-contained, all the necessary information is there, reducing the need to query the database multiple times.

#### pg
install pg, relies on this to communicate with postgres


#### nodemon
nodemon is a tool that helps develop node.js based applications by automatically restarting the node application when file changes in the directory are detected.

#### HTTPie
is a command line HTTP client
testing routes example: http :4000/events

#### REST
REST, or REpresentational State Transfer, is an architectural style for providing standards between computer systems on the web, making it easier for systems to communicate with each other. 
In the REST architectural style, the implementation of the client and the implementation of the server can be done independently without each knowing about the other. This means that the code on the client side can be changed at any time without affecting the operation of the server, and the code on the server side can be changed without affecting the operation of the client.
By using a REST interface, different clients hit the same REST endpoints, perform the same actions, and receive the same responses.
In the REST architecture, clients send requests to retrieve or modify resources, and servers send responses to these requests.
REST requires that a client make a request to the server in order to retrieve or modify data on the server. A request generally consists of:

-an HTTP verb, which defines what kind of operation to perform
-a header, which allows the client to pass along information about the request
-a path to a resource
-an optional message body containing data

HTTP VERBS
There are 4 basic HTTP verbs we use in requests to interact with resources in a REST system:

GET — retrieve a specific resource (by id) or a collection of resources
POST — create a new resource
PUT — update a specific resource (by id)
DELETE — remove a specific resource by id

#### Click links to view some samples in this project

- **[db](./db.js)**  

 

## Goals for this project:

- To show if you can make a Full-Stack app


## Requirements


## Authentication

## Models


## Routes
http POST :4000/signup name=Tommy email='tommy@cat.nl' password=tommy
http POST :4000/login email='tommy@cat.nl' password=tommy
http GET :4000/secret-endpoint Authorization:"Bearer <token>" (testroute for middelware authorization)

