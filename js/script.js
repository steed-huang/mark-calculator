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
      score[0][0] +
      "%\n" +
      "Think: " +
      score[0][1] +
      "%\n" +
      "Comm: " +
      score[0][2] +
      "%\n" +
      "App: " +
      score[0][3] +
      "%\n\n" +
      "Total Average: " +
      score[1] +
      "%\n"
  );
}

function getMark(grade) {
  return (grade[0] / grade[1]) * 100;
}

function getRaw(input) {
  if (input.indexOf("/") != -1) {
    let mark = Number(input.substr(0, input.indexOf("/")));
    let total = Number(input.substr(input.indexOf("/") + 1, input.length - 1));
    return [mark, total];
  } else return false;
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
        if (getRaw(data[z].value)) {
          marks[i][0].push(getMark(getRaw(data[z].value)));
        } else marks[i][0].push(Number(data[z].value));
      } else {
        if (getRaw(data[z].value)) {
          marks[i][1].push(getMark(getRaw(data[z].value)));
        } else marks[i][1].push(Number(data[z].value));
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
  return marks;
}

function getAverage(marks) {
  let secProd = [0, 0, 0, 0];
  let weightSum = [0, 0, 0, 0];
  let secAv = [0, 0, 0, 0];
  let avAcc = 0;
  let secWAcc = 0;
  let average = "none";
  for (let i = 0; i < 4; i++) {
    for (let z = 0; z < marks[i][0].length; z++) {
      secProd[i] += marks[i][0][z] * marks[i][1][z];
      weightSum[i] += marks[i][1][z];
    }
  }
  for (let i = 0; i < 4; i++) {
    if (weightSum[i] == 0) {
      secAv[i] = "none";
    } else secAv[i] = (secProd[i] / weightSum[i]).toFixed(5);
  }
  for (let i = 0; i < 4; i++) {
    if (secAv[i] != "none") {
      avAcc += secAv[i] * marks[i][2];
      secWAcc += marks[i][2];
    }
  }
  if (secWAcc != 0) {
    average = (avAcc / secWAcc).toFixed(5);
  }
  return [secAv, average];
}

function saveData() {
  let storage = window.localStorage;
  storage.setItem("marks", JSON.stringify(getData()));
}

function loadData() {
  let storage = window.localStorage;
  let marks = JSON.parse(storage["marks"]);

  clearTable();
  for (let i = 0; i < marks[0][0].length - 1; i++) {
    addRow();
  }

  for (let i = 0; i < 4; i++) {
    let inputRef = document
      .getElementById("allmarks")
      .getElementsByTagName("tbody")[0]
      .getElementsByTagName("tbody")
      [i].getElementsByTagName("input");
    for (let z = 0; z < marks[0][0].length; z++) {
      inputRef[z * 2].value = marks[i][0][z];
      inputRef[z * 2 + 1].value = marks[i][1][z];
    }
  }
  for (let i = 0; i < 4; i++) {
    let secWeight = document
      .getElementById("allmarks")
      .getElementsByTagName("thead")[0]
      .getElementsByTagName("tr")[1]
      .getElementsByTagName("th")
      [i].getElementsByTagName("input")[0];
    secWeight.value = marks[i][2];
  }
}

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
