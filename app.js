const express = require("express");
const path = require("path");

const PORT = process.env.PORT || 7000;

var app = express();

app.use(express.static(path.join(__dirname, "public")));

app.get("/getNote", getNote)

function getNote(req, res) {
    console.log("Retrieving Note"); //error here? note listed below?

    var id = req.query.id;
    console.log("Retrieving id", id);    

    getNoteFromDb(id, function(error, result) {
        console.log("Retrieved from DB Function with note: ", result)

        if (error || result == null) {
            res.status(500).json({success:false, data: error})
        } else {
            res.json(result[0]);
        }
    });
}

function getNoteFromDb(id, callback) {
    console.log("DB called with id: ", id);

    var sql = "SELECT noteentry, duedate FROM list WHERE id =  $1::int"; //may not be correct
    var params = [id];

    pool.query(sql, params, function(err, result) {
        if (err) {
            console.log("Error in DB");
            console.log(err);
            callback(err, null);
        }

        console.log("DB found result: " + JSON.stringify(result.rows));

        callback(null, result.rows)
    })
}

app.listen(PORT, function() {
    console.log("Server is found on " + PORT);
});

