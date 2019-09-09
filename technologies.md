## Technologies

### Table of contents:
- **[Node.js](#Node.js)**
- **[npm](#npm)**
- **[Docker](#Docker)**
- **[PostgreSQL](#PostgreSQL)**
- **[express](#express)**
- **[sequelize](#sequelize)**
- **[body-parser](#body-parser)**
- **[cors](#cors)**
- **[jsonwebtoken](#jsonwebtoken)**
- **[pg](#pg)**
- **[nodemon](#nodemon)**
- **[HTTPie](#HTTPie)**
- **[REST](#REST)**


#### Node.js
Node.js is an open-source, cross-platform, JavaScript run-time environment that executes JavaScript code outside of a browser. Node.js lets developers use JavaScript to write command line tools and for server-side scripting—running scripts server-side to produce dynamic web page content before the page is sent to the user's web browser. Consequently, Node.js represents a "JavaScript everywhere" paradigm, unifying web application development around a single programming language, rather than different languages for server- and client-side scripts.

#### npm
npm (originally short for Node Package Manager)is a package manager for the JavaScript programming language. It is the default package manager for the JavaScript runtime environment Node.js. It consists of a command line client, also called npm, and an online database of public and paid-for private packages, called the npm registry. The registry is accessed via the client, and the available packages can be browsed and searched via the npm website.

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