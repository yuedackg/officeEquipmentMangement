var DBName = DB_BihinListName;
var bList = new Array();

function load() {
    if (ls = localStorage.getItem(DBName)) {
        if (ls != null) {
            bList = JSON.parse(ls);

        } else {
            bList = [];

        }
        show();

    }
}

function save() {
    localStorage.setItem(DBName, JSON.stringify(bList));
    show();

}

function show() {
    var tableElem = document.getElementById("table-ichiran");
    for (var i = 0; i < bList.length; i++) {
        var trElem = tableElem.tBodies[0].insertRow(-1);
        for (var p in bList[i]) {
            var cellElem = trElem.insertCell(0);
            cellElem.appendChild(document.createTextNode(bList[i][p]));

        }
    }
}
