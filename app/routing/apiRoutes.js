var friends = require("../data/friends.js");

module.exports = function (app) {
  app.get("/api/friends", function (req, res) {
    res.json(friends);
  });

  app.post("/api/friends", function (req, res) {
    console.log(res);

    var data = req.body;
    var bestMatch = 0;
    var minDiff = 40;

    for (var i = 0; i < data.scores.length; i++) {
      data.scores[i] = parseInt(data.scores[i]);
    }

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
  });
};
