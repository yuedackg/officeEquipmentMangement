var DBscan = new Array();
var DBBihin = new Array();
var BihinBangoList = new Array();
var ScannBangoList = new Array();
var UntrackingList = new Array();
var NotFoundList = new Array();

function load() {
    var ls = localStorage.getItem(DB_scanListName);
    if (ls != null) {
        DBscan = JSON.parse(ls);

    } else {
        DBscan = [];

    }
    ls = localStorage.getItem(DB_BihinListName);
    if (ls != null) {
        DBBihin = JSON.parse(ls);

    } else {
        DBBihin = [];

    }

    collation();

}
// 照合作業を行う
function collation() {
    console.log("collation() called.");

    // 備品番号テーブルから、作業検証用の配列に番号を移動
    BihinBangoList = [];
    for (var i = 0; i < DBBihin.length; i++) {
        var item = DBBihin[i][0];
        console.log("item:" + item);
        BihinBangoList.push(item);

    }
    // スキャンした番号をテーブルから移動
    ScannBangoList = [];
    if (DBscan != null) {
        for (var i = 0; i < DBscan.length; i++) {
            var item = DBscan[i][0];
            ScannBangoList.push(item);

        }

    }
    // 突き合わせ処理
    BihinBangoList.sort();
    ScannBangoList.sort();
    UntrackingList = [];
    NotFoundList = [];


    for (var i = 0; i < BihinBangoList.length; i++) {
        if (ScannBangoList.includes(BihinBangoList[i])) {
            // スキャンコードのリストに中に備品番号がある
            // こちらは、正常 
            console.log(BihinBangoList[i] + "is include.");

        } else {
            // 備品番号リスト（台帳にない）
            console.log(BihinBangoList[i] + "is not include.");
            UntrackingList.push(BihinBangoList[i]);

        }
    }
    for (var i = 0; i < ScannBangoList.length; i++) {
        if (BihinBangoList.includes(ScannBangoList[i])) {
            // スキャンリストに
            console.log(ScannBangoList[i] + "is include.");
            NotFoundList.push(ScannBangoList[i]);

        } else {
            // こちらにくる場合には、備品テーブルに存在しないもの
            console.log(ScannBangoList[i] + "is not include.");
            NotFoundList.push(ScannBangoList[i]);

        }
    }
    // 結果の表示
    insertTestData();
    var myTable = document.getElementById("table-ichiran");
    for (var item of UntrackingList) {
        console.log(item);
        var trElem = myTable.tBodies[0].insertRow(-1);
        var cellElem = trElem.insertCell();
        cellElem.appendChild(document.createTextNode(item));

    }


}

function insertTestData() {
    NotFoundList.push("12343567");
    NotFoundList.push("23456789");
    NotFoundList.push("3456789");
    UntrackingList.push("9876543");
    UntrackingList.push("8765432");
}