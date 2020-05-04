
var friendsData = require("../data/friends.js");

module.exports = function(app) {
    app.get("/api/friends", function(req, res) {
        res.json(friendsData);
      });

      app.post("/api/friends", function(req, res) {
        console.log(req.body.scores);

        var data = req.body;

        for (var i = 0; i < data.scores.length; i++){
            data.scores[i] = parseInt(data.scores[i]);
        }
        var bestMatch = 0;
        var minDiff = 40;

        for (var i = 0; i < friendsData.length; i++){
            var totalDiff = 0;
            for (var y = 0; y < friendsData[x].scores.length; y++){
                var diff = Math.abs(data.scores[y] - friendsData[x].scores[y]);
                totalDiff += diff;
            } if (totalDiff < minDiff){
                bestMatch = x;
                minDiff = totalDiff;
            }
        }
        friendsData.push(data);

        res.json(friendsData[bestMatch]);
      });
};