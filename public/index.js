function noteCall () {
    $.get('/getNote?id=' + document.getElementById("inquiry").value, function(data, status) {
        // alert(data);
        // alert(status);

        if (status == "success") {
            var html = " ";

            html += "<br /><h3>The following note is: </h3> <br /> <h4>" + data.noteentry + "</h4><br />";
            html += "<h3>This will be due on: </h3><br /><h4>" + data.duedate + "</h4>";

            document.getElementById("remind").innerHTML = html;

        } 
        else {
            alert("Does not excist")
        }
    })
}