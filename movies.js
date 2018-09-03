function loadXMLDoc() {
    var keyword = document.getElementById("searchKeyword").value;
    console.log(keyword);
    var data = null;
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://api.themoviedb.org/3/search/multi?api_key=0bd8d706986dd8d800e9c8cd680da3bd&language=en-US&query=" + keyword + "&page=1&include_adult=false");
    xhr.send(data);
    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            console.log(this.responseText);
            myFunction(this.responseText);
        }
    });
}

function myFunction(xml) {
    console.log(xml)
    var data = JSON.parse(xml);
    console.log(data);
    var i;
    var template = document.getElementById('moviedata');
    var accordionList = document.getElementById('DisplayTable');
    accordionList.innerHTML = '';
    var templateHtml = template ? template.innerHTML : '';
    var listHtml = '';
    var Movies = {};


    for (var i = 0; i < data.results.length; i++) {
        if (data.results[i].title == null) {
            delete data.results[i];
        } else {
            listHtml += templateHtml.replace(/{{title}}/g, data.results[i].title)
                .replace(/{{release_date}}/g, data.results[i].release_date);
        }

        accordionList.innerHTML += listHtml;
        Movies = listHtml;
        localStorage.setItem('movies', Movies);
    }
    console.log(localStorage.getItem("movies"));
}
console.log(localStorage.getItem("movies"));
function sortTableAlpha() {
    var table, rows, switching, i, x, y, shouldSwitch;
    table = document.getElementById("tableContainer");
    switching = true;

    while (switching) {

        switching = false;
        rows = table.rows;

        for (i = 1; i < (rows.length - 1); i++) {

            shouldSwitch = false;

            x = rows[i].getElementsByTagName("TD")[0];
            y = rows[i + 1].getElementsByTagName("TD")[0];

            if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {

                shouldSwitch = true;
                break;
            }
        }
        if (shouldSwitch) {

            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
        }
    }
}

function sortTableYear() {
    var table, rows, switching, i, x, y, shouldSwitch;
    table = document.getElementById("tableContainer");
    switching = true;

    while (switching) {

        switching = false;
        rows = table.rows;

        for (i = 1; i < (rows.length - 1); i++) {

            shouldSwitch = false;

            x = rows[i].getElementsByTagName("TD")[1];
            y = rows[i + 1].getElementsByTagName("TD")[1];

            if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {

                shouldSwitch = true;
                break;
            }
        }
        if (shouldSwitch) {

            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
        }
    }
}
