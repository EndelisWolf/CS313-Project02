function noteCall() {
    let get = document.getElementById("inquiry").selectedIndex
    //alert(document.getElementsByTagName("option")[get].value)
    $.get('/getNote?id=' + document.getElementsByTagName("option")[get].value, function (data, status) {
        // alert(data);
        // alert(status);

        if (status == "success") {
            var html = " ";

            html += "<br /><h3>The following note is: </h3> <br /> <h4>" + data.noteentry + "</h4><br />";
            html += "<h3>This is to be done by: </h3><br /><h4>" + data.duedate.split("T")[0] + "</h4><br /><br />";

            document.getElementById("remind").innerHTML = html;

        } else {
            alert("Does not excist")
        }
    })
}

function locatetodo() {
    $.get('/locatetodo', function (data, status) {
        let html = " ";

        html += "<select id='inquiry'>"
        for (var i = 0; i < data.length; i++) {
            html += "<option id=" + data[i].id + ">" + data[i].id + "</option>"
        }
        html += "</select>"

        document.getElementById("locate").innerHTML = html;

    })
}
//Below is Milestone 2
function addNote() {
    $.post('/addNote', {duedate:document.getElementById("duedate").value, noteentry:document.getElementById("noteentry").value}, function (data, status) {
        data[i].id
    })
    location.reload();
}

function updateNoteRequest() {
    let change = " ";
    
    change += "<h5>Change notes content:<br /></h5>";
    change += '<input type="text" name="noteentry" id="noteentry"><br /><br />'
    change += "<input type='submit' value='Complete Update' class='btn btn-outline-success' onclick='updateNote()'>";

    document.getElementById("allowChange").innerHTML = change;    
}

function updateNote() {
    $.post('/updateNote', {noteentry:document.getElementById("noteentry").value}, function (data, status) {
        data[i].id
    })
    location.reload();
}

function deleteNote() { // being worked on
    let get = document.getElementById("inquiry").selectedIndex;

    alert("Your note is being deleted")

    $.get('/deleteNote?id=' + document.getElementsByTagName("option")[get].value, function (data, status) {
        
    })
    location.reload();

    
}