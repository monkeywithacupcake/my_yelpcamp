// figure out what to return
if (process.env.NODE_ENV === 'production') {
    // we are in production environment
    module.exports = require('./prod');
} else {
    // we are in development environment
    module.exports = require('./dev');
}
