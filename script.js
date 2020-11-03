let rootDiv = document.getElementById("root");
let gridsize = 16; //default
let clr = document.getElementById("clr");
let radioB1 = document.getElementById("radioBut1");
let radioB2 = document.getElementById("radioBut2");
let radioB3 = document.getElementById("radioBut3");
let randClr = "";
let clrS = document.getElementById("clrSelected");

function drawGrid(grdSize) {
  rootDiv.innerHTML = "";
  for (let i = 0; i < grdSize * grdSize; i++) {
    let divEl = document.createElement("div");
    divEl.setAttribute("class", "divElement");
    divEl.style.width = 960 / grdSize + "px";
    divEl.style.height = 960 / grdSize / 1.8 + "px";

    divEl.addEventListener("mouseover", function () {
      if (radioB1.checked) {
        //random colors
        divEl.style.backgroundColor =
          "#" + Math.random().toString(16).substr(-6);
      } else if (radioB2.checked) {
        //random color
        divEl.style.backgroundColor = randClr;
      } else if (radioB3.checked) {
        //picked color
        divEl.style.backgroundColor = clr.value;
      }
    });
    rootDiv.appendChild(divEl);
  } //end for
}

drawGrid(gridsize); //by default size

document.getElementById("newGridBut").addEventListener("click", function () {
  let ok = false,
    valu = 0;
  do {
    valu = Number(prompt("What size of the grid you want ?", 16));
    if (isNaN(valu)) {
      alert("Enter valid number");
    } else {
      ok = true;
    }
  } while (ok == false);

  gridsize = valu;

  drawGrid(gridsize);
});

clr.addEventListener("click", function () {
  radioB3.checked = true;
});

radioB2.addEventListener("click", function () {
  randClr = "#" + Math.random().toString(16).substr(-6);
  clrS.style.backgroundColor = randClr;
});

clrS.addEventListener("click", function () {
  randClr = "#" + Math.random().toString(16).substr(-6);
  clrS.style.backgroundColor = randClr;
  radioB2.checked = true;
});
