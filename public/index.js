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
            html += "<option value=" + data[i].id + ">" + data[i].duedate.split('T')[0] + "</option>"
        }
        html += "</select>"

        document.getElementById("locate").innerHTML = html;

    })
}

function addNoteRequest() {
    let add = " ";

    add += '<div class="card text-white bg-primary mb-3 mx-auto" style="max-width: 20rem;">'
    add += '<div class="card-body">'
    add += '<h5 class="card-title">Complete By:</h5>'
    add += '<input type="date" name="duedate" id="duedate"> <br /> <br />'
    add += '<label>What needs to be done?</label><br />'
    add += '<input type="text" name="noteentry" id="noteentry"><br /><br />'
    add += '<input type="submit" value="Add Note" class="btn btn-success" onclick="addNote()"><br />';
    add += '</div>'
    add += '</div>'


    document.getElementById("addEntry").innerHTML = add;
    document.getElementById("poof2").style.display = "none";
}

function addNote() {
    $.post('/addNote', {
        duedate: document.getElementById("duedate").value,
        noteentry: document.getElementById("noteentry").value
    }, function (data, status) {
        data[i].id
    })
    alert("You have successfully added a new note")
    location.reload();
}

function updateNoteRequest() {
    let change = " ";

    change += '<div class="card text-white bg-warning mb-3 mx-auto" style="max-width: 20rem;">'
    change += '<div class="card-body">'
    change += '<h5 class="card-title">Change notes content</h5>'
    change += '<input type="text" name="noteChange" id="noteChange"><br /><br />'
    change += "<input type='submit' value='Complete Update' class='btn btn-success' onclick='updateNote()'>";
    change += '</div>'
    change += '</div>'

    document.getElementById("allowChange").innerHTML = change;
    document.getElementById("poof").style.display = "none";
}

function updateNote() {
    $.post('/updateNote', {
        id: document.getElementById("inquiry").value,
        noteentry: document.getElementById("noteChange").value
    }, function (data, status) {
        data[i].id
    })
    alert("Your note has been updated")
    location.reload();
}

function deleteNote() {
    let get = document.getElementById("inquiry").selectedIndex;

    alert("Your note is being deleted")

    $.get('/deleteNote?id=' + document.getElementsByTagName("option")[get].value, function (data, status) {

    })
    location.reload();


}