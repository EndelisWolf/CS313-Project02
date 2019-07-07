const express = require("express");
const path = require("path");
const bodyParser = require("body-parser")
var app = express();

const {
    Pool
} = require("pg");

const connectionString = process.env.DATABASE_URL || "postgres://todo_user:remember@localhost:5432/todo";
const pool = new Pool({
    connectionString: connectionString
});

app.set("port", (process.env.PORT || 7000));

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({
    extended: true
}))

app.get("/getNote", getNote)

app.get("/locatetodo", locatetodo)

app.post("/addNote", addNote)

app.get("/deleteNote", deleteNote)

app.post("/updateNote", updateNote)

app.listen(app.get("port"), function () {
    console.log("Now listening for: ", app.get("port"));
});

function getNote(req, res) {
    console.log("Retrieving Note"); //error here? note listed below?

    var id = req.query.id;
    console.log("Retrieving id", id);

    getNoteFromDb(id, function (error, result) {
        console.log("Retrieved from DB Function with note: ", result)

        if (error || result == null) {
            res.status(500).json({
                success: false,
                data: error
            })
        } else {
            res.json(result[0]);
        }
    });
}

function getNoteFromDb(id, callback) {
    console.log("DB called with id: ", id);

    var sql = "SELECT noteentry, duedate FROM list WHERE id =  $1::int"; //may not be correct
    var params = [id];

    pool.query(sql, params, function (err, result) {
        if (err) {
            console.log("Error in DB");
            console.log(err);
            callback(err, null);
        }

        console.log("DB found result: " + JSON.stringify(result.rows));

        callback(null, result.rows)
    })
}

function locatetodo(req, res) {
    var sql = "SELECT id FROM list";
    pool.query(sql, function (err, data) {
        res.json(data.rows)
    })
}
//everything below is milestone 2
function addNote(req, res) {
    console.log(req.body)

    var duedate = req.body.duedate;
    var noteentry = req.body.noteentry;

    var sql = "INSERT INTO list (duedate, noteentry) VALUES ($1, $2)"

    pool.query(sql, [duedate, noteentry], function (err, done) {
        //done();
        //res.redirect('/');
    })

}

function deleteNote(req, res) {
    console.log("Retrieving note to be deleted")

    var id = req.query.id;
    console.log("Retrieved note #", id, "to be deleted");

    deleteNoteFromDb(id, function (error) {
        console.log("Note has been deleted.")

    });
}

function deleteNoteFromDb(id, callback) {
    console.log("Note called with id:", id);

    var sql = "DELETE FROM list WHERE id = $1::int";
    var params = [id];

    pool.query(sql, params, function (err, result) {
        if (err) {
            console.log("Error in DB");
            console.log(err);
            callback(err, null);
        }

        console.log("DB found note to be deleted.");

        callback(null)
    })
}

function updateNote(req, res) {
    console.log("Retrieving note that needs updating.")

    
    var id = req.query.id;
    //var sql = "INSERT INTO list (duedate, noteentry) VALUES ($1, $2)"

    console.log("Note #", id, "is being updated.")

    updateNoteFromDb(id, function(error, result) {
        console.log("Retrieved from DB Note to be updated:", result)
        if (error || result == null) {
            res.status(500).json({
                success: false,
                data: error
            })
        } else {
            res.json(result[0]);
        }
    })

    //pool.query(sql, [duedate, noteentry], function (err, done) {
        //done();
        //res.redirect('/');
    //})
}

function updateNoteFromDb(id, req, callback) {
    console.log("Note called with id:", id);

    var noteentry = req.body.noteentry;

    var sql = "UPDATE list SET noteentry='noteentry' where id = $1::int";
    var params = [id, noteentry];

    pool.query(sql, params, function (err, result) {
        if (err) {
            console.log("Error in DB");
            console.log(err);
            callback(err, null);
        }

        console.log("Note in DB updated.");

        callback(null, result.rows)
    })
}