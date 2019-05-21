function addRow() {
  for (let i = 0; i < 4; i++) {
    let tableRef = document
      .getElementById("allmarks")
      .getElementsByTagName("tbody")[0]
      .getElementsByTagName("tbody")[i];

    let newRow = tableRef.insertRow(tableRef.rows.length);

    newInput0 = document.createElement("input");
    newInput1 = document.createElement("input");
    newInput0.setAttribute("id", "data");
    newInput1.setAttribute("id", "data");

    let newCell0 = newRow.insertCell(0);
    let newCell1 = newRow.insertCell(1);
    newCell0.appendChild(newInput0);
    newCell1.appendChild(newInput1);
  }
}

function getData() {}

function getAverage() {}

function saveData() {}

function loadData() {}

function clearTable() {
  for (let i = 0; i < 4; i++) {
    let tableRef = document
      .getElementById("allmarks")
      .getElementsByTagName("tbody")[0]
      .getElementsByTagName("tbody")[i];
    while (tableRef.firstChild) {
      tableRef.removeChild(tableRef.firstChild); // deletes all TR
    }
  }
  for (let i = 0; i < 4; i++) {
    let swRef = document
      .getElementById("allmarks")
      .getElementsByTagName("thead")[0]
      .getElementsByTagName("tr")[1]
      .getElementsByTagName("th")
      [i].getElementsByTagName("input")[0];
    swRef.value = "";
  }
  addRow();
}
