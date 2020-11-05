let rootDiv = document.getElementById("root");
let gridsize = 16; //default
let clr = document.getElementById("clr");
let radioB1RandColors = document.getElementById("radioBut1RandomColors");
let radioB2RandColor = document.getElementById("radioBut2RandomColor");
let radioB3PickColor = document.getElementById("radioBut3PickColor");
let randClr = "",
  erase = false;
let clrS = document.getElementById("clrSelected");
let makeBl = document.getElementById("makeBlack");

function darkenColor(color, percent) {
  //to darken perceent used in minus from 0 to -100
  var num = parseInt(color.replace("#", ""), 16),
    amt = Math.round(2.55 * percent),
    R = (num >> 16) + amt,
    B = ((num >> 8) & 0x00ff) + amt,
    G = (num & 0x0000ff) + amt;
  return (
    "#" +
    (
      0x1000000 +
      (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
      (B < 255 ? (B < 1 ? 0 : B) : 255) * 0x100 +
      (G < 255 ? (G < 1 ? 0 : G) : 255)
    )
      .toString(16)
      .slice(1)
  );
}

function rgbToHex(a) {
  a = a.replace(/[^\d,]/g, "").split(",");
  return (
    "#" +
    ((1 << 24) + (+a[0] << 16) + (+a[1] << 8) + +a[2]).toString(16).slice(1)
  );
}

function drawGrid(grdSize) {
  //draw grid function
  rootDiv.innerHTML = "";
  for (let i = 0; i < grdSize * grdSize; i++) {
    let divEl = document.createElement("div");
    divEl.setAttribute("class", "divElement");
    divEl.style.width = 960 / grdSize + "px";
    divEl.style.height = 960 / grdSize / 1.8 + "px";

    divEl.addEventListener("mouseover", function (e) {
      if (erase == true) {
        e.target.style.backgroundColor = "";
      } else {
        if (makeBl.checked == true && e.target.style.backgroundColor) {
          let prevClr = e.target.style.backgroundColor;
          let hexClr = rgbToHex(prevClr);
          e.target.style.backgroundColor = darkenColor(hexClr, -20);
        } else {
          if (radioB1RandColors.checked) {
            //random colors
            divEl.style.backgroundColor =
              "#" + Math.random().toString(16).substr(-6);
          } else if (radioB2RandColor.checked) {
            //random color
            divEl.style.backgroundColor = randClr;
          } else if (radioB3PickColor.checked) {
            //picked color
            divEl.style.backgroundColor = clr.value;
          }
        }
      }
    });
    rootDiv.appendChild(divEl);
  } //end for
}

drawGrid(gridsize); //grid by default size

document.getElementById("newGridBut").addEventListener("click", function () {
  //new grid listener
  let validNumber = false,
    newGridSize = 0;
  do {
    newGridSize = Number(prompt("What size of the grid you want ?", 16));
    if (isNaN(newGridSize)) {
      alert("Enter valid number");
    } else {
      validNumber = true;
    }
  } while (validNumber == false);
  if (newGridSize != 0) gridsize = newGridSize;

  drawGrid(gridsize);
});

clr.addEventListener("click", function () {
  //listener for color picker button
  radioB3RandColor.checked = true;
});

radioB2RandColor.addEventListener("click", function () {
  //listener for random color radio button
  randClr = "#" + Math.random().toString(16).substr(-6);
  clrS.style.backgroundColor = randClr;
});

clrS.addEventListener("click", function () {
  //listener for clicking on selected color div
  randClr = "#" + Math.random().toString(16).substr(-6);
  clrS.style.backgroundColor = randClr;
  radioB2RandColor.checked = true;
});

document.getElementById("clearBut").addEventListener("click", function () {
  //clear button listener
  drawGrid(gridsize);
});

let era = document.getElementById("erase"); // erase check box button , put in erase mode
era.addEventListener("click", function () {
  if (era.checked == true) erase = true;
  else erase = false;
});
