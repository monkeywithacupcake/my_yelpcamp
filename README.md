## YelpCamp

This is an application with users who can create and edit campgrounds that anyone can see. Users can also add comments on campgrounds that have a timestamp.

It includes authentication, authorization, roles, and dynamic updates.

I built this mostly following along with Colt and Ian on the Web Dev Bootcamp. Lots of helpful learnings in the course watching it come together.  

### Stack

+ mongodb (mongoose)
+ express
+ passport
+ ejs
+ bootstrap styling

### Usage

clone the repository, cd into the project directory, add a file `/config/dev.js` with the contents:

```
module.exports = {
    redirectDomain: 'http://localhost:5000',
    secret:'YOU PICK A STRING',
    mail: 'your gmail',
    mailpw: 'your gmail pass',
    admincode: 'YOU PICK A STRING'
};

```

Then, head back to terminal and `npm install` (if you do not already have mongo, install that), then start up a second terminal window within the project directory. In one window `mongod`. In the other: `node app.js` should start it up at **localhost:5000**
