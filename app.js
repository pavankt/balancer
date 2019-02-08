const express = require('express');
const _ = require('underscore')._;
let app = express();
const request = require('request');

app.use(express.json());

app.init = () => {
    app.knownHosts = process.env.HOSTS.split('&');
}

app.get('/number', (req, res) => {
    request
        .get(`${_.first(app.knownHosts)}/number`)
        .on('response', (response)=> {
            updateServerPointer();
            res.send(response.body);
        });
});

updateServerPointer = () => {
    app.knownHosts.push(app.knownHosts.shift());
}

module.exports = app;