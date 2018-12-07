const jsonfile = require("jsonfile");
module.exports = app => {
var file = '/tmp/data.json'
jsonfile.readFile(file, function(err, obj) {
  console.dir(obj)
})
app.get("/users", (req, res) => {
  console.log("fetching all users");

  // jsonfile reading
  jsonfile.readFile("./DB/users.json", function(err, content) {
    // send file contents back to sender
    res.send(content);
  });
});
app.post("/users/new", (req, res) => {
  console.log("fetching all users");
  
  let username = req.body.username;
  let email    = req.query.email;
  var obj = {name: 'JP'}
  jsonfile.readFile("./DB/users.json", function(err, content) {

    content.push({ email: email, username: username });

    console.log("added " + email + "to DB");

    jsonfile.writeFile("./DB/users.json", content, function(err) {
      console.log(err);
    });

    res.sendStatus(200);
  });
});
} 