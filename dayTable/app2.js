let currentPage;
let numOfTables;
let sheetList = JSON.parse(localStorage.getItem("sheetList")) || [];

const addRowBtn = document.querySelector("#addRowBtn");
// const clearBtn = document.querySelector("#clearBtn");
const dateBtn = document.querySelector("#dateBtn");
const newSheetBtn = document.querySelector("#newSheet");
const saveBtn = document.querySelector("#saveBtn");
// const mergeBtn = document.querySelector("#mergeBtn");
const boldBtn = document.querySelector("#boldBtn");
const sheetBtnSpan = document.querySelector("#sheetBtnList");
const tableList = document.querySelector("#tableList");

const timeTable = [
  "10:30-11:00",
  "11:00-11:30",
  "11:30-12:00",
  "12:00-12:30",
  "12:30-1:00",
  "1:00-1:30",
  "1:30-2:00",
  "2:00-2:30",
  "2:30-3:00",
  "3:00-3:30",
  "3:30-4:00",
  "4:00-4:30",
  "4:30-5:00",
  "5:00-5:30",
  "5:30-6:00",
  "6:00-6:30",
  "6:30-7:00",
  "7:00-7:30",
  "7:30-8:00",
  "8:00-8:30",
  "8:30-9:00",
  "9:00-9:30",
  "9:30-10:00",
  "10:00-10:30",
  "10:30-11:00",
  "11:00-11:30",
  "11:30-12:00",
];
const rowDataSet = [
  [
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""],
  ],
  [
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""],
  ],
  [
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""],
  ],
  [
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""],
  ],
  [
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""],
  ],
  [
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""],
  ],
  [
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""],
  ],
];
const days = ["월", "화", "수", "목", "금", "토", "일"];
const rowSkipNum = [0, 21, 42, 63, 84, 105, 126, 147, 168, 189, 210, 231, 252, 273, 294, 315];

//현재 sheet의 테이블이 몇개인지 계산하는 함수
function NumofLSdata(a) {
  const arr = [];
  let tempNum = 0;
  for (let i = 0; i < localStorage.length; i++) {
    arr.push(localStorage.key(i).substring(0, 1));
  }
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === a) {
      tempNum++;
    }
  }
  localStorage.setItem("numOfTables", tempNum);
  return tempNum;
}

function allWhite() {
  const cells = document.querySelectorAll("td textarea");
  for (let i = 0; i < cells.length; i++) {
    cells[i].classList.remove("selected");
  }
}

function clicked(event) {
  if (document.querySelectorAll("td textarea").length === 0) {
    for (let i = 0; i < document.querySelectorAll(".cell").length; i++) {
      const txtElement = document.createElement("textarea");
      txtElement.innerHTML = document.querySelectorAll(".cell")[i].querySelector("div").innerHTML;
      document.querySelectorAll(".cell")[i].appendChild(txtElement);
      document.querySelectorAll(".cell")[i].querySelector("div").remove();
    }
  }

  if (event.target.getAttribute("rowspan") !== null) {
  } else {
    event.target.classList.toggle("selected");
  }
}

function merge() {
  const cells = document.querySelectorAll("td textarea");
  for (let i = 0; i < cells.length; i++) {
    if (cells[i].classList.contains("selected")) {
      //마지막줄과 첫번째줄 병합 막기
      if (cells[i].parentNode.classList.contains("last")) {
        allWhite();
        return;
      }
      //
      for (let j = 1; j < cells.length; j++) {
        if (cells[i + j] !== undefined && cells[i + j].classList.contains("selected")) {
          for (let k = 0; k < cells[i + j].parentNode.rowSpan; k++) {
            cells[i].parentNode.setAttribute("rowSpan", j + k + 1);
            let h = cells[i].parentNode.rowSpan * 24 - 4;
            cells[i].parentNode.setAttribute("style", `height: ${h}px`);
            cells[i + j + k].parentNode.classList.add("hidden");
            cells[i + j + k].value = "";
          }
        } else if (cells[i + j] !== undefined && cells[i + j].parentNode.classList.contains("hidden")) {
        } else {
          break;
        }
        cells[i].focus();
      }
    }
  }
  allWhite();
}

function separate() {
  const cells = document.querySelectorAll("td textarea");
  for (let i = 0; i < cells.length; i++) {
    if (cells[i].classList.contains("selected")) {
      let saveRowspan = cells[i].parentNode.getAttribute("rowspan");
      cells[i].parentNode.setAttribute("rowSpan", 1);
      cells[i].parentNode.setAttribute("style", "height:20px");
      for (let j = 1; j < saveRowspan; j++) {
        cells[i + j].parentNode.setAttribute("rowSpan", 1);
        cells[i + j].parentNode.setAttribute("style", "height:20px");
        cells[i + j].parentNode.classList.remove("hidden");
      }
    }
  }
  allWhite();
}

function merOrSepa() {
  let selectedCells = document.querySelectorAll(".selected");
  let checkCellRow = [];
  for (let i = 0; i < selectedCells.length; i++) {
    checkCellRow.push(Number(selectedCells[i].parentNode.getAttribute("rowspan")));
  }
  checkCellRow = checkCellRow.filter((v) => v > 1);
  if (checkCellRow.length > 0) {
    separate();
  } else {
    merge();
  }
}

function addColumn() {
  if (localStorage.getItem("sheetList") === null || localStorage.getItem("currentPage") === null) {
    return;
  }
  localStorage.setItem(currentPage + "tableData" + NumofLSdata(currentPage), JSON.stringify(rowDataSet));
  NumofLSdata(currentPage);
  printAll();
}

function newSheet() {
  alert("새로운 시트를 추가하시겠습니까?");
  sheetList.push("sheet" + sheetList.length);
  localStorage.setItem("sheetList", JSON.stringify(sheetList));
  printAll();
}

function sheetClicked() {
  currentPage = this.innerText.slice(-1);
  localStorage.setItem("currentPage", currentPage);
  printAll();
}

// function deleteTable() {
//   alert("열을 삭제하시겠습니까?");
//   numOfTables = Number(localStorage.getItem("numOfTables"));
//   for (let i = 0; i < 7; i++) {
//     document
//       .querySelector("#table" + i)
//       .querySelectorAll("tr")
//       [numOfTables].remove();
//   }
//   localStorage.removeItem(currentPage + "tableData" + (numOfTables - 1));
//   localStorage.setItem("numOfTables", numOfTables - 1);
// }

function printSheet() {
  currentPage = localStorage.getItem("currentPage");
  if (localStorage.getItem("sheetList") === null) {
    return;
  }
  sheetBtnSpan.innerHTML = "";
  tableList.innerHTML = "";
  for (let i = 0; i < JSON.parse(localStorage.getItem("sheetList")).length; i++) {
    // sheet 버튼 생성
    const sheetBtnElement = document.createElement("button");
    sheetBtnElement.innerText = JSON.parse(localStorage.getItem("sheetList"))[i];
    sheetBtnElement.id = "sheetBtn" + i;
    sheetBtnElement.classList.add("addedSheet");
    sheetBtnElement.addEventListener("click", sheetClicked);
    sheetBtnSpan.appendChild(sheetBtnElement);
    //tableDiv 생성
    const tableDiv = document.createElement("div");
    tableDiv.id = "tableDiv" + JSON.parse(localStorage.getItem("sheetList"))[i].slice(-1);
    tableList.appendChild(tableDiv);
    tableDiv.classList.add("addedDiv");
    tableDiv.classList.add("hidden");
  }
  if (document.querySelector("#sheetBtn" + currentPage) === null) {
  } else {
    document.querySelector("#sheetBtn" + currentPage).classList.add("btnClicked");
    document.querySelector("#tableDiv" + currentPage).classList.remove("hidden");
  }
}

function printFirstRow() {
  if (localStorage.getItem("sheetList") === null) {
    return;
  }
  currentPage = JSON.parse(localStorage.getItem("currentPage"));
  numOfTables = NumofLSdata(currentPage);

  document.querySelector("#tableDiv" + currentPage).innerHTML = "";

  for (let k = 0; k < 7; k++) {
    let tableElement = document.createElement("table");
    tableElement.setAttribute("style", "padding-bottom:9px");
    let trElement = document.createElement("tr");
    let thElement = document.createElement("th");
    tableElement.id = "table" + k;
    if (localStorage.getItem("days" + currentPage) === null) {
      thElement.innerHTML = days[k];
    } else {
      if (k >= 5) {
        thElement.innerHTML = days[k] + " " + JSON.parse(localStorage.getItem("days" + currentPage))[k + 1];
      } else {
        thElement.innerHTML = days[k] + " " + JSON.parse(localStorage.getItem("days" + currentPage))[k];
      }
    }
    trElement.appendChild(thElement);
    if (k > 4) {
      for (let j = 0; j < 21; j++) {
        let tdElement = document.createElement("td");
        tdElement.innerHTML = timeTable[j];
        trElement.appendChild(tdElement);
      }
    } else {
      for (let j = 6; j < 27; j++) {
        let tdElement = document.createElement("td");
        tdElement.innerHTML = timeTable[j];
        trElement.appendChild(tdElement);
      }
    }
    tableElement.appendChild(trElement);
    if (document.querySelector("#tableDiv" + currentPage) === null) {
      return;
    }
    document.querySelector("#tableDiv" + currentPage).appendChild(tableElement);
  }
}

function printTable() {
  if (localStorage.getItem("sheetList") === null || localStorage.length < 4) {
    return;
  }
  currentPage = localStorage.getItem("currentPage");
  numOfTables = NumofLSdata(currentPage);
  for (let k = 0; k < numOfTables; k++) {
    let savedTableData = JSON.parse(localStorage.getItem(currentPage + "tableData" + k));
    for (let i = 0; i < 7; i++) {
      let trElement2 = document.createElement("tr");
      let thElement2 = document.createElement("th");
      let txtElement = document.createElement("textarea");
      txtElement.classList.add("teacherNames");
      // thElement2.appendChild(txtElement);
      trElement2.appendChild(thElement2);
      if (localStorage.getItem("teachers" + currentPage) === null) {
      } else {
        if (JSON.parse(localStorage.getItem("teachers" + currentPage))[k] === "undefined" || JSON.parse(localStorage.getItem("teachers" + currentPage))[k] === "") {
        } else {
          thElement2.innerHTML = JSON.parse(localStorage.getItem("teachers" + currentPage))[k];
        }
      }
      for (let j = 0; j < 21; j++) {
        let tdElement = document.createElement("td");
        tdElement.classList.add("cell");
        tdElement.addEventListener("click", clicked);
        tdElement.addEventListener("keydown", keyMove);
        if (j === 20) {
          tdElement.classList.add("last");
        }
        let txtElement3 = document.createElement("textarea");
        txtElement3.innerHTML = savedTableData[i][j][0];
        if (savedTableData[i][j][0] === "") {
        } else {
          txtElement3.classList.add("contentTd");
        }
        tdElement.setAttribute("rowSpan", savedTableData[i][j][1]);
        tdElement.setAttribute("style", `height:${savedTableData[i][j][2]}`);
        if (savedTableData[i][j][3] === true) {
          tdElement.classList.add("hidden");
        }
        tdElement.appendChild(txtElement3);
        trElement2.appendChild(tdElement);
      }
      document
        .querySelector("#tableDiv" + currentPage)
        .querySelector("#table" + i)
        .appendChild(trElement2);
    }
  }
  NumofLSdata(currentPage);
  // let deleteElement = document.createElement("button");
  // deleteElement.innerHTML = "X";
  // deleteElement.addEventListener("click", deleteTable);
  // if (NumofLSdata(currentPage) === 0) {
  //   return;
  // }
  // document
  //   .querySelector("#tableDiv" + currentPage)
  //   .querySelector("#table0")
  //   .appendChild(deleteElement);
}

function saveData() {
  numOfTables = Number(localStorage.getItem("numOfTables"));
  for (let k = 0; k < numOfTables; k++) {
    if (tableList.querySelector("#tableDiv" + currentPage).querySelector("#table" + k) === null) {
      k = k + 1;
    } else {
      for (let p = 0; p < numOfTables; p++) {
        let tableData = [];
        for (let j = 0; j < 7; j++) {
          let cell = tableList
            .querySelector("#tableDiv" + currentPage)
            .querySelector("#table" + j)
            .querySelectorAll("textarea");
          let rowData = [];
          for (let i = 0; i < 21; i++) {
            let cellData = [];
            cellData.push(cell[i + rowSkipNum[p]].value);
            cellData.push(cell[i + rowSkipNum[p]].parentNode.rowSpan);
            cellData.push(cell[i + rowSkipNum[p]].parentNode.style.height);
            if (cell[i + rowSkipNum[p]].parentNode.classList.contains("hidden")) {
              cellData.push(true);
            } else {
              cellData.push(false);
            }
            rowData.push(cellData);
          }
          tableData.push(rowData);
        }
        localStorage.setItem(currentPage + "tableData" + p, JSON.stringify(tableData));
      }
    }
  }
  convertCell();
}

function printAll() {
  printSheet();
  printFirstRow();
  printTable();
}

function convertCell() {
  if (document.querySelectorAll("td div").length === 0) {
    for (let i = 0; i < document.querySelectorAll(".cell").length; i++) {
      const divElement = document.createElement("div");
      divElement.setAttribute("style", "vertical-align:middle");
      divElement.innerHTML = document.querySelectorAll(".cell")[i].querySelector("textarea").value;
      document.querySelectorAll(".cell")[i].appendChild(divElement);
      document.querySelectorAll(".cell")[i].querySelector("textarea").remove();
      if (document.querySelectorAll("td div")[i].innerHTML != "") {
        document.querySelectorAll("td div")[i].classList.add("contentTd");
      }
    }
  }
}

function keyMove(event) {
  let currentTable = event.target.parentNode.parentNode.parentNode;
  let trs = currentTable.querySelectorAll("tr");
  let currentTr = event.target.parentNode.parentNode;
  let tds = currentTr.querySelectorAll("td textarea");
  let currentTd = event.target.parentNode.cellIndex;

  if (event.keyCode === 40 && currentTd !== 21) {
    if (event.target.parentNode.getAttribute("rowSpan") >= 2) {
      currentTd = currentTd + Number(event.target.parentNode.getAttribute("rowSpan")) - 1;
    }
    // tds[currentTd].classList.add("selected");
    tds[currentTd].focus();
  } else if (event.keyCode === 38 && currentTd !== 1) {
    for (let i = 0; i < event.target.parentNode.cellIndex; i++) {
      if (tds[currentTd - 2].parentNode.classList.contains("hidden")) {
        currentTd = currentTd - 1;
      } else {
        break;
      }
    }
    currentTd = currentTd - 2;
    tds[currentTd].focus();
    // tds[currentTd].classList.add("selected");
  } else if (event.keyCode === 39 && currentTr.rowIndex !== 8) {
    if (currentTr.rowIndex === 5) {
      nextTr = trs[currentTr.rowIndex + 2];
    } else {
      nextTr = trs[currentTr.rowIndex + 1];
    }
    for (let i = 0; i < event.target.parentNode.cellIndex; i++) {
      if (nextTr.querySelectorAll("td textarea")[currentTd - 1].parentNode.classList.contains("hidden")) {
        currentTd = currentTd - 1;
      } else {
        break;
      }
    }
    nextTr.querySelectorAll("td textarea")[currentTd - 1].focus();
    // nextTr.querySelectorAll("td textarea")[currentTd - 1].classList.add("selected");
  } else if (event.keyCode === 37 && currentTr.rowIndex !== 1) {
    if (currentTr.rowIndex === 7) {
      pastTr = trs[currentTr.rowIndex - 2];
    } else {
      pastTr = trs[currentTr.rowIndex - 1];
    }
    for (let i = 0; i < event.target.parentNode.cellIndex; i++) {
      if (pastTr.querySelectorAll("td textarea")[currentTd - 1].parentNode.classList.contains("hidden")) {
        currentTd = currentTd - 1;
      } else {
        break;
      }
    }
    pastTr.querySelectorAll("td textarea")[currentTd - 1].focus();
    // pastTr.querySelectorAll("td textarea")[currentTd - 1].classList.add("selected");
  } else if (event.keyCode === 9) {
    merOrSepa();
    event.preventDefault();
  }
  // allWhite();
}

function bold() {
  for (let i = 0; i < document.querySelectorAll(".selected").length; i++) {
    if (document.querySelectorAll(".selected")[i].style.fontWeight === "") {
      document.querySelectorAll(".selected")[i].setAttribute("style", "font-weight:bold");
    } else {
      document.querySelectorAll(".selected")[i].setAttribute("style", "");
    }
  }
}

// function clearAll() {
//   currentPage = JSON.parse(localStorage.getItem("currentPage"));
//   numOfTables = JSON.parse(localStorage.getItem("numOfTables"));
//   for (let i = 0; i < numOfTables; i++) {
//     localStorage.setItem(currentPage + "tableData" + i, JSON.stringify(rowDataSet));
//   }
//   printAll();
// }

function dateInput() {
  currentPage = JSON.parse(localStorage.getItem("currentPage"));
  week = [];
  const tempInput = prompt("월요일 날짜 입력", "2023/03/27");

  if (tempInput === "") {
    for (let i = 0; i < 8; i++) {
      week.push("");
    }
  } else {
    monday = new Date(tempInput);
    week.push(monday.getMonth() + 1 + "/" + monday.getDate());

    tuesday = new Date(monday.setDate(monday.getDate() + 1));
    week.push(tuesday.getMonth() + 1 + "/" + tuesday.getDate());

    wednesday = new Date(tuesday.setDate(tuesday.getDate() + 1));
    week.push(wednesday.getMonth() + 1 + "/" + wednesday.getDate());

    thursday = new Date(tuesday.setDate(wednesday.getDate() + 1));
    week.push(thursday.getMonth() + 1 + "/" + thursday.getDate());

    friday = new Date(tuesday.setDate(thursday.getDate() + 1));
    week.push(friday.getMonth() + 1 + "/" + friday.getDate());

    week.push("");
    saturday = new Date(tuesday.setDate(friday.getDate() + 1));
    week.push(saturday.getMonth() + 1 + "/" + saturday.getDate());

    sunday = new Date(tuesday.setDate(saturday.getDate() + 1));
    week.push(sunday.getMonth() + 1 + "/" + sunday.getDate());
  }
  localStorage.setItem("days" + currentPage, JSON.stringify(week));
  printFirstRow();
  printTable();
}

addRowBtn.addEventListener("click", addColumn);
newSheetBtn.addEventListener("click", newSheet);
saveBtn.addEventListener("click", saveData);
// mergeBtn.addEventListener("click", merOrSepa);
boldBtn.addEventListener("click", bold);
// clearBtn.addEventListener("click", clearAll);
dateBtn.addEventListener("click", dateInput);
