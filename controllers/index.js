/* GET home page. */

// var users = [{
//   id: 1,
//   name: "usong",
//   age: 20,
//   email: "usong@mz.co.kr"
// }];

// function getUser(req, res) {
//   return res.status(200).json(users);
// }

// function postUser(req, res) {
//   var user = req.body.user;
//   users.push(user);
// }

// module.exports = {
//   getUser: getUser,
//   postUser: postUser,
// }

var fs = require('fs');

function getHome(req, res) {
  res.render('index', {
    title: "Home",
    length: 5
  })
}

function getList(req, res) {
  fs.readFile(__dirname + "/../data/" + "user.json", "utf8", function (err, data) {
    console.log(data);
    res.end(data);
  })
}

function getUser(req, res) {
  fs.readFile(__dirname + "/../data/user.json", "utf8", function (err, data) {
    var users = JSON.parse(data);
    res.json(users[req.params.username]);
  })
}

function postUser(req, res) {
  var result = {};
  var username = req.params.username;

  if(!req.body["password"] || !req.body["name"]) {
    result["success"] = 0;
    result["error"] = "invalid request";
    res.json(result);
    return;
  }

  fs.readFile(__dirname + "/../data/user.json", "utf8", function(err, data) {
    var users = JSON.parse(data);
    if(users[username]) {
      result["success"] = 0;
      result["error"] = "duplicate";
      res.json(result);
      return;
    }

    users[username] = req.body;

    fs.writeFile(__dirname + "/../data/user.json", JSON.stringify(users, null, '\t'), "utf8", function(err, data) {
      result = {"success": 1};
      res.json(result);
    })
  })

}

function putUser(req, res) {
  var result = {};
  var username = req.params.username;

  if(!req.body["password"] || !req.body["name"]){
      result["success"] = 0;
      result["error"] = "invalid request";
      res.json(result);
      return;
  }

  fs.readFile( __dirname + "/../data/user.json", 'utf8',  function(err, data){
      var users = JSON.parse(data);
      users[username] = req.body;

      fs.writeFile(__dirname + "/../data/user.json", JSON.stringify(users, null, '\t'), "utf8", function(err, data){
          result = {"success": 1};
          res.json(result);
      })
  })
}

function deleteUser(req, res) {
  var result = {};

  fs.readFile(__dirname + "/../data/user.json", "utf8", function(err, data) {
    var users = JSON.parse(data);

    if(!users[req.params.username]) {
      result["success"] = 0;
      result["error"] = "not found";
      res.json(result);
      return;
    }

    delete users[req.params.username];
    fs.writeFile(__dirname + "/../data/user.json", JSON.stringify(users, null, '\t'), "utf8", function(err, data) {
      result["success"] = 1;
      res.json(result);
      return;
    })
  })

}

module.exports = {  
  getHome: getHome,
  getList: getList,
  getUser: getUser,
  postUser: postUser,
  putUser: putUser,
  deleteUser: deleteUser,
}