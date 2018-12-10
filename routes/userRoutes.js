const jsonfile = require("jsonfile");
const file_path = "./DB/users.json";

module.exports = app => {
  var file = '/tmp/data.json'
  jsonfile.readFile(file, function (err, obj) {
    console.dir(obj)
  })
  app.get("/users", (req, res) => {
    console.log("fetching all users");

    // jsonfile reading
    jsonfile.readFile("./DB/users.json", function (err, content) {
      // send file contents back to sender
      res.send(content);
    });
  });
  app.post("/users/new", (req, res) => {
    console.log("fetching all users");

    let username = req.body.username;
    let email = req.body.email;
    var obj = { name: 'JP' }
    jsonfile.readFile("./DB/users.json", function (err, content) {

      content.push({ email: email, username: username });

      console.log("added " + email + "to DB");

      jsonfile.writeFile("./DB/users.json", content, function (err) {
        console.log(err);
      });

      res.sendStatus(200);
    });
  });
  app.delete("/users/destroy", (req, res) => {

    let email = req.body.email;

    jsonfile.readFile(file_path, function (err, content) {

      for (var i = content.length - 1; i >= 0; i--) {

        if (content[i].email === email) {
          console.log("removing " + content[i].email + "from DB");
          content.pop(i);
        }

      }

      jsonfile.writeFile(file_path, content, function (err) {
        console.log(err);
      });

      res.sendStatus(200);
    });
  });
  app.put("/users/:email", (req, res) => {
    let user;
    let username = req.body.username;
    console.log("le body :"+username);
    jsonfile.readFile(file_path, function (err, content) {
      console.log("le content= ",content)
      for (var i = content.length - 1; i >= 0; i--) {
        if (content[i].email === req.params.email) {

          console.log("updated user " + req.params.email + "has now username : " + username);
          user = content[i];
          user.username = username;

        }

      }
      jsonfile.writeFile(file_path, content, function (err) {
        console.log(err);
      });
    });
    res.send(200);
  });
  app.get("/users/:email", (req, res) => {
    let user;
    let email = req.params.email;
  
    jsonfile.readFile(file_path, function(err, content) {
      for (var i = content.length - 1; i >= 0; i--) {
        if (content[i].email === email) {
          console.log("found user" + content[i]);
          console.log(content[i]);
          user = content[i];
        }
      }
  
      res.send(user);
    });
  });
  
} 