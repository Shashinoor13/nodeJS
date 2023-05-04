
# Simple nodeJS Express server

This is a simple Node.js Express server that serves static HTML files and handles form submissions. It also saves form data to a MongoDB database using Mongoose.

## Installation

To install the server, clone the repository and run npm install to install the required dependencies.

```
git clone https://github.com/Shashinoor13/nodeJS.git
cd node-express-server
npm install
```

## Configuration

The server is configured using environment variables, which are loaded from a `.env` file using the dotenv package. The following environment variables are used:
```
    - PORT : The port number that the server will listen on. Defaults to 3000 if not set.
    - MONGO_DB_URL : The URL of the MongoDB database that the server will connect to. This must be set in order for the server to save form data to the database.
```

Create a `.env` file in the root directory of the project and set the environment variables as follows:

```
PORT=3000
MONGO_DB_URL=mongodb://localhost/mydatabase
```
## Usage

To start the server, `node --watch index.js`:

```
node --watch index.js
```

This will start the server and print a message to the console indicating which port it is listening on.

The server serves three static HTML files: home.html, about.html, and contact.html. These files are located in the root directory of the project.

To submit a form, go to the contact.html page and fill out the form. When the form is submitted, the server will save the form data to the MongoDB database and display a confirmation message.

## License

[BSL-1.0 license](https://github.com/Shashinoor13/nodeJS/blob/main/LICENSE)


