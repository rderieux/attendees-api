const ENV = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

console.log(ENV);

if (ENV !== 'production') {
    require('babel-register');
    require('babel-polyfill');
    module.exports = require('./src');
} else {
    require('babel-polyfill');
    module.exports = require('./dist');
}

