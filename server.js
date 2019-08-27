if (process.env.NODE_ENV === "production") {
    const express = require('express');
    const path = require('path');

    const app = express();

    const PORT = process.env.PORT || 3001;

    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    app.use('/static', express.static(path.join(__dirname, 'client/public')));

    app.use(express.static("client/build"));
    app.get("/*", function(req, res) {
      res.sendFile(path.join(__dirname, "/client/build/index.html"));
    });

    // Express server listens on PORT specified
    const server = app.listen(PORT, () => {
      console.log(`Server is listening`);
    });

    require("./connection/sockets")(server);
}
else {
  require("./connection/sockets");
}