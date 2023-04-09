let currentPage;
let numOfTables;
let sheetList = JSON.parse(localStorage.getItem("sheetList")) || [];
let monday, tuesday, wednesday, thursday, friday, saturday, sunday;
let week = [, , , , , , ,];

const addTableBtn = document.querySelector("#addTableBtn");
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
const tableDataSet = [
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
const days = ["월", "화", "수", "목", "금", "", "토", "일"];
const rowSkipNum = [0, 21, 42, 63, 84, 105, 126];

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

function addTable() {
  if (localStorage.getItem("sheetList") === null || localStorage.getItem("currentPage") === null) {
    return;
  }
  localStorage.setItem(currentPage + "tableData" + NumofLSdata(currentPage), JSON.stringify(tableDataSet));
  printTable();
}

function newSheet() {
  alert("새로운 시트를 추가하시겠습니까?");
  sheetList.push("sheet" + sheetList.length);
  localStorage.setItem("sheetList", JSON.stringify(sheetList));
  printAll();
}

function sheetClicked() {
  // currentPage 변경
  currentPage = this.innerText.slice(-1);
  localStorage.setItem("currentPage", currentPage);
  // sheetBtn 클릭여부
  if (this.classList.contains("btnClicked")) {
    return;
  }
  printAll();
}

function deleteTable() {
  alert("테이블을 삭제하시겠습니까?");
  currentPage = localStorage.getItem("currentPage");
  const tableNum = Number(this.parentNode.id.slice(-1));
  for (let i = tableNum + 1; i < localStorage.getItem("numOfTables"); i++) {
    // 2>>1 , 3>>2, 4>>3
    localStorage.setItem(currentPage + "tableData" + (i - 1), localStorage.getItem(currentPage + "tableData" + i));
  }
  localStorage.removeItem(currentPage + "tableData" + (localStorage.getItem("numOfTables") - 1));

  const teachers = JSON.parse(localStorage.getItem("teachers" + currentPage));
  teachers.splice(tableNum, 1);
  localStorage.setItem("teachers" + currentPage, JSON.stringify(teachers));

  printTable();
}

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

function printTable() {
  if (localStorage.getItem("sheetList") === null) {
    return;
  }
  currentPage = localStorage.getItem("currentPage");
  // table그리기
  for (let k = 0; k < JSON.parse(localStorage.getItem("sheetList")).length; k++) {
    document.querySelector("#tableDiv" + k).innerHTML = "";
    numOfTables = NumofLSdata(`${k}`);
    for (let p = 0; p < numOfTables; p++) {
      let savedTableData = JSON.parse(localStorage.getItem(k + "tableData" + p));
      let tableElement = document.createElement("table");
      tableElement.setAttribute("style", "padding-bottom:9px");
      //테이블 첫째줄 그리기
      let trElement = document.createElement("tr");
      let thElement = document.createElement("th");
      let txtElement = document.createElement("textarea");
      tableElement.id = "table" + p;
      const timeDiv = document.createElement("div");
      timeDiv.id = "timeDiv" + p;
      const clearElement = document.createElement("button");
      clearElement.innerHTML = "비우기";
      clearElement.addEventListener("click", clearTable);
      const deleteElement = document.createElement("button");
      deleteElement.innerHTML = "삭제";
      deleteElement.addEventListener("click", deleteTable);
      tableElement.appendChild(clearElement);
      tableElement.appendChild(deleteElement);
      txtElement.classList.add("teacherNames");
      if (localStorage.getItem("teachers" + currentPage) === null) {
      } else {
        txtElement.innerHTML = JSON.parse(localStorage.getItem("teachers" + currentPage))[p];
      }
      thElement.appendChild(txtElement);
      trElement.appendChild(thElement);
      for (let j = 6; j < 27; j++) {
        let tdElement = document.createElement("td");
        tdElement.innerHTML = timeTable[j];
        trElement.appendChild(tdElement);
      }
      tableElement.appendChild(trElement);
      //나머지 줄 만들기
      for (let i = 0; i < 8; i++) {
        if (i === 5) {
          let trElement2 = document.createElement("tr");
          let thElement2 = document.createElement("th");
          trElement2.appendChild(thElement2);
          for (let j = 0; j < 21; j++) {
            let tdElement2 = document.createElement("td");
            tdElement2.innerHTML = timeTable[j];
            trElement2.appendChild(tdElement2);
          }
          tableElement.appendChild(trElement2);
        } else {
          let trElement2 = document.createElement("tr");
          let thElement2 = document.createElement("th");
          if (localStorage.getItem("days" + currentPage) === null) {
            thElement2.innerHTML = days[i];
          } else {
            thElement2.innerHTML = days[i] + " " + JSON.parse(localStorage.getItem("days" + currentPage))[i];
          }
          trElement2.appendChild(thElement2);
          for (let j = 0; j < 21; j++) {
            let tdElement2 = document.createElement("td");
            tdElement2.classList.add("cell");
            tdElement2.addEventListener("click", clicked);
            tdElement2.addEventListener("keydown", keyMove);
            let txtElement2 = document.createElement("textarea");
            if (j === 20) {
              tdElement2.classList.add("last");
            }
            if (i > 4) {
              txtElement2.innerHTML = savedTableData[i - 1][j][0];
              if (savedTableData[i - 1][j][0] === "") {
              } else {
                txtElement2.classList.add("contentTd");
              }
              tdElement2.setAttribute("rowSpan", savedTableData[i - 1][j][1]);
              tdElement2.setAttribute("style", `height:${savedTableData[i - 1][j][2]}`);
              if (savedTableData[i - 1][j][3] === true) {
                tdElement2.classList.add("hidden");
              }
            } else {
              txtElement2.innerHTML = savedTableData[i][j][0];
              if (savedTableData[i][j][0] === "") {
              } else {
                txtElement2.classList.add("contentTd");
              }
              tdElement2.setAttribute("rowspan", savedTableData[i][j][1]);
              tdElement2.setAttribute("style", `height:${savedTableData[i][j][2]}`);
              if (savedTableData[i][j][3] === true) {
                tdElement2.classList.add("hidden");
              }
            }
            tdElement2.appendChild(txtElement2);
            trElement2.appendChild(tdElement2);
          }
          tableElement.appendChild(trElement2);
        }
      }
      tableElement.appendChild(timeDiv);
      document.querySelector("#tableDiv" + k).appendChild(tableElement);
    }
  }
  // for(let i=0; i<document.querySelectorAll('td textarea'); i++){
  //   document.querySelectorAll('td textarea')[i].setAttribute('style', 'padding-top:')
  // }
  NumofLSdata(currentPage);
  // let deleteElement = document.createElement("button");
  // deleteElement.innerHTML = "X";
  // deleteElement.addEventListener("click", deleteTable);
  // if (NumofLSdata(currentPage) === 0) {
  //   return;
  // }
  // document
  //   .querySelector("#tableDiv" + currentPage)
  //   .querySelector("#table" + (NumofLSdata(currentPage) - 1))
  //   .appendChild(deleteElement);
}

function saveData() {
  numOfTables = Number(localStorage.getItem("numOfTables"));
  let teacherNames = [];
  for (let j = 0; j < numOfTables; j++) {
    let tableData = [];
    teacherNames.push(
      document
        .querySelector("#tableDiv" + currentPage)
        .querySelector("#table" + j)
        .querySelector("textarea").value
    );
    if (tableList.querySelector("#tableDiv" + currentPage).querySelector("#table" + j) === null) {
      j = j + 1;
    } else {
      let cell = tableList
        .querySelector("#tableDiv" + currentPage)
        .querySelector("#table" + j)
        .querySelectorAll("textarea");
      for (let p = 0; p < 7; p++) {
        let rowData = [];
        for (let i = 1; i < 22; i++) {
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
      localStorage.setItem(currentPage + "tableData" + j, JSON.stringify(tableData));
    }

    for (let o = 0; o < 147; o++) {
      if (document.querySelector("#table" + j).querySelectorAll("td textarea")[o].value === "") {
      } else {
        document
          .querySelector("#table" + j)
          .querySelectorAll("td textarea")
          [o].classList.add("contentTd");
      }
    }
    calClassTime(j);
  }
  localStorage.setItem("teachers" + currentPage, JSON.stringify(teacherNames));
  convertCell();
}

function printAll() {
  printSheet();
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

function calClassTime(tableNum) {
  let classes = 0;
  for (let i = 0; i < document.querySelector("#table" + tableNum).querySelectorAll(".contentTd").length; i++) {
    classes = classes + document.querySelector("#table" + tableNum).querySelectorAll(".contentTd")[i].parentNode.rowSpan;
  }
  document.querySelector("#timeDiv" + tableNum).innerText = "시수 : " + classes / 2;
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
    tds[currentTd].focus();
    tds[currentTd].classList.add("selected");
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
    tds[currentTd].classList.add("selected");
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
    nextTr.querySelectorAll("td textarea")[currentTd - 1].classList.add("selected");
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
    pastTr.querySelectorAll("td textarea")[currentTd - 1].classList.add("selected");
  } else if (event.keyCode === 9) {
    merOrSepa();
    event.preventDefault();
  }
  allWhite();
}

function bold() {
  const selectedCell = document.querySelectorAll(".selected");
  for (let i = 0; i < selectedCell.length; i++) {
    if (selectedCell[i].style.fontWeight === "") {
      selectedCell[i].setAttribute("style", "font-weight:bold");
    } else {
      selectedCell[i].setAttribute("style", "");
    }
  }
}

// function clearAll() {
//   currentPage = JSON.parse(localStorage.getItem("currentPage"));
//   numOfTables = JSON.parse(localStorage.getItem("numOfTables"));
//   for (let i = 0; i < numOfTables; i++) {
//     localStorage.setItem(currentPage + "tableData" + i, JSON.stringify(tableDataSet));
//   }
//   printTable();
// }

function clearTable() {
  currentPage = JSON.parse(localStorage.getItem("currentPage"));
  let tempTableNum = this.parentNode.id.slice(-1);
  localStorage.setItem(currentPage + "tableData" + tempTableNum, JSON.stringify(tableDataSet));
  printTable();
}

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
  printTable();
}

addTableBtn.addEventListener("click", addTable);
newSheetBtn.addEventListener("click", newSheet);
saveBtn.addEventListener("click", saveData);
// mergeBtn.addEventListener("click", merOrSepa);
boldBtn.addEventListener("click", bold);
// clearBtn.addEventListener("click", clearAll);
dateBtn.addEventListener("click", dateInput);
