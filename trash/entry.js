const localStorageName = "BIHIN"
var a = new Array();

function load() {
var ls = localStorage.getItem(localStorageName);
if (ls != null) {
a = JSON.parse(ls)
} else {
a = [];
}
show();
}

function entry() {
if (document.getElementById("name").value == "") {
window.alert("名称が入力されていません");

} else if (document.getElementById("kosu").value == "") {
window.alert("戸数が入力されていません");

} else {
a.push(
{
"name": document.getElementById("name").value,
"code": document.getElementById("code").value
}
);
clearField();
save();

}
}
function clearField() {
document.getElementById("name").value = "";
document.getElementById("kosu").value = "";
document.getElementById("code").value = "";
}
function save() {
localStorage.setItem(localStorageName, JSON.stringify(a));
show();
}

function sorting() {


}

function clearTbody() {
var tbodies = document.getElementsByTagName("tbody");
for (var i = 0; i < tbodies.length; i++) {
while (tbodies[i].rows.length > 0) {
tbodies[i].deleteRow(0);
}
}
}

function show() {

sorting();
// addItemToTable();
addItemToTableTest();



}

function addItemToTableTest(){
var item = document.getElementById("BihinTable");
var oTBody = item.getElementsByTagName("TBODY");
console.log( oTBody);
while( item.rows[1]){
item.deleteRow(1);
}
addItemToTable();
}

function deleteValue( i){
window.alert( i + "番目が削除されます");
a.splice(i,1);
save();           
}

function addItemToTable(){

var tableElement = document.getElementById("BihinTable");
clearTbody();   
clearTbody();
// var tbody = document.getElementById("tbody");
// for( var i =0 ; i<tbody.length; i++){
//     while( tbody[i].rows.length>0){
//         tbody[i].deleteRow(0);
//     }
// }

for (var i = 0; i < a.length; i++) {
tbody =document.getElementsByTagName("tbody");
var newRow = tableElement.insertRow();


for (var p in a[i]) {
var newCell = newRow.insertCell();
var newText = document.createTextNode(a[i][p]);
newCell.appendChild(newText);

}
var newCell = newRow.insertCell();
var newText=document.createElement("button");
newText.innerHTML="削除"
newText.setAttribute( "onclick", "deleteValue(" + i +        ")");

// newText.onclick = () => {
//     window.alert( i + "番目がクリックされました");
// }
// '<button type="button" onclick="deleteValue(' + i + ')">削除</button>');
newCell.appendChild(newText);

}

}