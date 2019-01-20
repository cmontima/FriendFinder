var friendList = require("../data/friends");

module.exports = function (app) {

    app.get("/api/friends", function (req, res) {
        res.json(friendList);
    });

    app.post("/api/friends", function (req, res) {
        var userPoints = 0;
        for (var i = 0; i < req.body.scores.length; i++) {
            userPoints += parseInt(req.body.scores[i]);
        }

        //Calculate points of matches
        var matchPoints = 0;
        var comparisonArray = [];
        for (var i = 0; i < friendList.length; i++) {
            pointsArray = friendList[i].scores;
            for (var j = 0; j < pointsArray.length; j++) {
                matchPoints += parseInt(pointsArray[j]);
            }

            var compare = Math.abs(userPoints - matchPoints);
            console.log("Difference between " + req.body.name + " and potential match " + friendList[i].name + " is " + compare + " points");
            comparisonArray.push(compare);
            matchPoints = 0;
        }

        //Return the minimum of the comparison array
        Array.min = function (array) {
            return Math.min.apply(Math, array);
        };
        var minimum = Array.min(comparisonArray);


        //Find the index number of the minimum value in the comparison array
        var indexNum = comparisonArray.indexOf(minimum);

        //Use indexNum to grab the matching object from the JSON data and fill the response data that will be posted to the survey page
        res.json(friendList[indexNum]);
        friendList.push(req.body);
    });
};