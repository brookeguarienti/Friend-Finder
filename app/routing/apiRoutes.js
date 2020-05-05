// require friends.js file
var friends = require("../data/friends.js");
//==============================================================================
// routing
// ==============================================================================

module.exports = function (app) {
  // api GET route for api/friends page
  app.get("/api/friends", function (req, res) {
    res.json(friends);
  });
  // api POST route handles when a user submits a form and sends survey data back to server
  app.post("/api/friends", function (req, res) {
    console.log(res);

    var data = req.body;
    var bestMatch = 0;
    var minDiff = 40;
    // loop through each score submitted through the survey
    for (var i = 0; i < data.scores.length; i++) {
      data.scores[i] = parseInt(data.scores[i]);
    }
    // loop through the friends array and compare the score of the new data with all the current friends
    for (var j = 0; j < friends.length; j++) {
      var totalDiff = 0;
      for (var y = 0; y < friends[j].scores.length; y++) {
        var diff = Math.abs(data.scores[y] - friends[j].scores[y]);
        totalDiff += diff;
      }
      if (totalDiff < minDiff) {
        bestMatch = j;
        minDiff = totalDiff;
      }
    }
    friends.push(data);

    res.json(friends[bestMatch]);

    console.log(friends);
  });
};
