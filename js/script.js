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

function getResult(score) {
  alert(
    "K/U: " +
      score[0][0].toFixed(4) +
      "%\n" +
      "Think: " +
      score[0][1].toFixed(4) +
      "%\n" +
      "Comm: " +
      score[0][2].toFixed(4) +
      "%\n" +
      "App: " +
      score[0][3].toFixed(4) +
      "%\n\n" +
      "Total Average: " +
      score[1].toFixed(4) +
      "%\n"
  );
}

function getData() {
  let marks = [[[], [], 25], [[], [], 25], [[], [], 25], [[], [], 25]];
  for (let i = 0; i < 4; i++) {
    let data = document
      .getElementById("allmarks")
      .getElementsByTagName("tbody")[0]
      .getElementsByTagName("tbody")
      [i].getElementsByTagName("input");

    for (let z = 0; z < data.length; z++) {
      if (z % 2 == 0) {
        marks[i][0].push(Number(data[z].value));
      } else {
        marks[i][1].push(Number(data[z].value));
      }
    }
  }
  for (let i = 0; i < 4; i++) {
    let secWeight = document
      .getElementById("allmarks")
      .getElementsByTagName("thead")[0]
      .getElementsByTagName("tr")[1]
      .getElementsByTagName("th")
      [i].getElementsByTagName("input")[0];
    marks[i][2] = Number(secWeight.value);
  }
  getResult(getAverage(marks));
}

function getAverage(marks) {
  let secProd = [0, 0, 0, 0];
  let weightSum = [0, 0, 0, 0];
  let secAv = [0, 0, 0, 0];
  let avAcc = 0;
  for (let i = 0; i < 4; i++) {
    for (let z = 0; z < marks[0][0].length; z++) {
      secProd[i] += marks[i][0][z] * marks[i][1][z];
      weightSum[i] += marks[i][1][z];
    }
  }
  for (let i = 0; i < 4; i++) {
    secAv[i] = secProd[i] / weightSum[i];
  }
  for (let i = 0; i < 4; i++) {
    avAcc += secAv[i] * marks[i][2];
  }
  return [secAv, avAcc / 100];
}

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
