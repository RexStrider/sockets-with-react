require("./connection/sockets");


if (process.env.NODE_ENV === "production") {
    const express = require('express');
    const path = require('path');
    const app = express();

    app.use('/static', express.static(path.join(__dirname, 'client/public')));

    app.use(express.static("client/build"));
    app.get("/*", function(req, res) {
      res.sendFile(path.join(__dirname, "/client/build/index.html"));
    });
}