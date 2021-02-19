import * as atom_file from "./mydata";

/***********************
 * Part 1
 ***********************/
let ol: HTMLElement = document.createElement("ol");
let li: HTMLElement;
let part1 = document.getElementById("part1");
let li_text = document.createTextNode("");

for (let i = 0; i < atom_file.atomNames.length; i++) {
  li_text = document.createTextNode(atom_file.atomNames[i]);
  li = document.createElement("li");
  li.appendChild(li_text);
  ol.appendChild(li);
}

part1?.appendChild(ol);

/********************
 * Part 2 - TODO: Pass the tests
 ********************/
let dataText: string;
let part2 = document.getElementById("part2");
ol = document.createElement("ol");

let span;
li_text = document.createTextNode("");

// atom_file.atomObjects.forEach((element) => {
//   dataText = "" + element.name + " (weight: " + element.weight + ")";
//   li_text = document.createTextNode(dataText);
//   li = document.createElement("li");
//   span = document.createElement("span");
//   span.setAttribute("id", "hidden");
//   span.appendChild(li_text);
//   li.appendChild(span);
//   ol.appendChild(li);
// });
// part2?.appendChild(ol);

/***********************
 * Part 2
 * Typewriter effect found at:
 * https://css-tricks.com/snippets/css/typewriter-effect/
 ***********************/

// ol = document.createElement("ol");
li_text = document.createTextNode("");

atom_file.atomObjects.forEach((element) => {
  dataText = "" + element.name + " (weight: " + element.weight + ")";
  li_text = document.createTextNode(dataText);

  li = document.createElement("li");
  span = document.createElement("span");
  li.appendChild(span);
  span.appendChild(li_text);
  if (element.weight > 150) {
    li.classList.add("heavy");
  } else {
    li.classList.add("light");
  }

  ol.appendChild(li);

  /**************************************************************
   * If you want to see the animation, but break the mocha tests,
   * uncomment this line.
   **************************************************************/
  // StartTextAnimation(0, li);
});

part2?.appendChild(ol);
ol.classList.add("css-typing");

/*****************************
 * TypeWriter Helper Functions
 *****************************/

// start a typewriter animation for a text in the dataText array
function StartTextAnimation(i: number, el: HTMLElement) {
  if (typeof dataText[i] == "undefined") {
    setTimeout(function () {
      StartTextAnimation(0, el);
    }, 20000);
  }
  // check if dataText[i] exists
  if (i < dataText.length) {
    // text exists! start typewriter animation
    typeWriter(dataText, 0, el, function () {
      // after callback (and whole text has been animated), start next text
      console.log("start next text");
      //   StartTextAnimation(i + 1, el);
    });
  }
}

// type one text in the typwriter
// keeps calling itself until the text is finished
function typeWriter(
  text: string,
  i: number,
  el: HTMLElement,
  fnCallback: Function
) {
  // chekc if text isn't finished yet
  if (i < text.length) {
    // add next character to li
    el.innerHTML =
      text.substring(0, i + 1) + '<span aria-hidden="true"></span>';

    // wait for a while and call this function again for next character
    setTimeout(function () {
      typeWriter(text, i + 1, el, fnCallback);
    }, 100);
  }
  // text finished, call callback if there is a callback function
  else if (typeof fnCallback == "function") {
    // call callback after timeout
    setTimeout(fnCallback, 700);
  }
}

/***********************
 * Part 3
 ***********************/

let table: HTMLElement;
let thead: HTMLElement;
let tbody: HTMLElement;
let th: HTMLElement;
let td: HTMLElement;
let tr: HTMLElement;

/* Header */
let th_text = document.createTextNode("Atom");
th = document.createElement("th");
th.appendChild(th_text);
tr = document.createElement("tr");
tr.appendChild(th);

th_text = document.createTextNode("Weight");
th = document.createElement("th");
th.appendChild(th_text);
tr.appendChild(th);

thead = document.createElement("thead");
thead.appendChild(tr);

/* Body */
tbody = document.createElement("tbody");
atom_file.atomObjects.forEach((element) => {
  tr = document.createElement("tr");

  let td_text = document.createTextNode(element.name);
  td = document.createElement("td");
  td.appendChild(td_text);
  tr.appendChild(td);

  td_text = document.createTextNode("" + element.weight);
  td = document.createElement("td");
  td.appendChild(td_text);
  tr.appendChild(td);

  if (element.weight > 150) {
    tr.classList.add("heavy");
  } else {
    tr.classList.add("light");
  }

  tbody.appendChild(tr);
});

let part3 = document.getElementById("part3");
table = document.createElement("table");
table.appendChild(thead);
table.appendChild(tbody);
part3?.appendChild(table);
