function searchInputCheck() {
  document.querySelector("#repsearch-input").value =
    document.querySelector("#search-input").value;
  mainFilter();

  if (!document.querySelector("#search-input").value == "") {
    document.querySelector("#search-del").style.display = "block";
    document.querySelector("#repsearch-del").style.display = "block";
  } else {
    document.querySelector("#searchDel").style.display = "none";
    document.querySelector("#repsearch-del").style.display = "none";
  }
  if (document.querySelector("#repsearch-input").value != "") {
    document.querySelector("#ElemRepSearch").classList.add("selectedfiltr");
  } else {
    document.querySelector("#ElemRepSearch").classList.remove("selectedfiltr");
  }
}

function searchInputDel() {
  document.querySelector("#search-input").value = "";
  document.querySelector("#repsearch-input").value = "";
  document.querySelector("#search-input").focus();
  document.querySelector("#search-del").style.display = "none";
  document.querySelector("#repsearch-del").style.display = "none";
  mainFilter();
  document.querySelector("#ElemRepSearch").classList.remove("selectedfiltr");
}

// Klávesové zkratky
function KeyPress(e) {
  if (e.keyCode == "192") {
    document.querySelector("#search-input").focus();
  } else if (e.keyCode == "49") {
    searchInputDel();
    mainFilter();
  }
}

window.addEventListener("keyup", KeyPress, false);

// Změna Velikosti Horní Části
function changeHeight() {
  var scrollVal = window.pageYOffset;
  if (scrollVal == 0) {
    document.querySelector("#uvod").style.height = "8em";
    document.querySelector("#uvodcont").style.height = "3em";
    document.querySelector(":root").style.setProperty("--spacing", "0");
    document.querySelector(":root").style.setProperty("--spacingTop", "0.5em");
  } else {
    document.querySelector("#uvod").style.height = "5em";
    document.querySelector("#uvodcont").style.height = "1em";
    document.querySelector(":root").style.setProperty("--spacing", "-0.5em");
    document.querySelector(":root").style.setProperty("--spacingTop", "-0.3em");
  }
}

window.addEventListener(
  "scroll",
  function () {
    requestAnimationFrame(changeHeight);
  },
  false
);

// Hlavní Filtrovací Funkce
function mainFilter() {
  var input, filter, table, tr, td, i, txtValue;
  table = document.getElementById("mainTable");
  tr = table.getElementsByTagName("tr");

  // Zobrazí všechny řádky
  for (i = 0; i < tr.length; i++) {
    tr[i].style.display = "";
  }

  // Filtr dle Názvu Reportů
  for (i = 0; i < tr.length; i++) {
    if (
      tr[i]
        .getElementsByTagName("td")[0]
        .innerText.toUpperCase()
        .indexOf(document.getElementById("search-input").value.toUpperCase()) ==
      "-1"
    ) {
      tr[i].style.display = "none";
    }
  }

  // Filtr dle Vlastníků
  for (i = 0; i < tr.length; i++) {
    if (
      filtrvlastniku.length > 0 &&
      filtrvlastniku.indexOf(tr[i].getElementsByTagName("td")[1].innerText) ==
        "-1"
    ) {
      tr[i].style.display = "none";
    }
  }

  // Filtr dle Popisu
  for (i = 0; i < tr.length; i++) {
    if (
      tr[i]
        .getElementsByTagName("td")[2]
        .innerText.toUpperCase()
        .indexOf(
          document.getElementById("descrsearch-input").value.toUpperCase()
        ) == "-1"
    ) {
      tr[i].style.display = "none";
    }
  }

  // Filtr dle Složek
  for (i = 0; i < tr.length; i++) {
    if (
      filtrslozek.length > 0 &&
      filtrslozek.indexOf(tr[i].getElementsByTagName("td")[3].innerText) == "-1"
    ) {
      tr[i].style.display = "none";
    }
  }

  // Filtr Produktů, Report jich může mít více, proto dvojitý loop
  for (i = 0; i < tr.length; i++) {
    for (u = 0; u < filtrproduktu.length; u++) {
      var productcondition = true;
      if (
        tr[i].getElementsByTagName("td")[4].innerText.includes(filtrproduktu[u])
      ) {
        productcondition = false;
        break;
      }
    }
    if (productcondition) {
      tr[i].style.display = "none";
    }
  }

  // Filtr Metrik, také může být více
  for (i = 0; i < tr.length; i++) {
    for (u = 0; u < filtrmetrik.length; u++) {
      var metricondition = true;
      if (
        tr[i].getElementsByTagName("td")[5].innerText.includes(filtrmetrik[u])
      ) {
        metricondition = false;
        break;
      }
    }
    if (metricondition) {
      tr[i].style.display = "none";
    }
  }

  // Class pro Filtr Popisu
  if (document.querySelector("#descrsearch-input").value != "") {
    document.querySelector("#ElemDescrSearch").classList.add("selectedfiltr");
    document.querySelector("#descrsearch-del").style.display = "block";
  } else {
    document
      .querySelector("#ElemDescrSearch")
      .classList.remove("selectedfiltr");
    document.querySelector("#descrsearch-del").style.display = "none";
  }
}
// Konec Hlavní Filtrovací Funkce //

// Zavírání Filtrů kliknutím mimo //
function createDocumentMouseUpListener(searchId, elemId) {
  return function (e) {
    const container = document.getElementById(searchId);
    const scontainer = document.querySelector(elemId);
    const dcontainer = Array.from(document.querySelectorAll("#mainTable a"));

    if (container.style.display == "flex") {
      if (
        !container.contains(e.target) &&
        !scontainer.contains(e.target) &&
        !dcontainer.includes(e.target)
      ) {
        container.style.display = "none";
        scontainer.classList.remove("activefiltr");
        document
          .querySelector(":root")
          .style.setProperty("--spacingContent", "2em");
      }
    }
  };
}

document.addEventListener(
  "mouseup",
  createDocumentMouseUpListener("repsearch", "#ElemRepSearch")
);
document.addEventListener(
  "mouseup",
  createDocumentMouseUpListener("ownersearch", "#ElemOwnSearch")
);
document.addEventListener(
  "mouseup",
  createDocumentMouseUpListener("descrsearch", "#ElemDescrSearch")
);
document.addEventListener(
  "mouseup",
  createDocumentMouseUpListener("foldersearch", "#ElemFolderSearch")
);
document.addEventListener(
  "mouseup",
  createDocumentMouseUpListener("productsearch", "#ElemProductSearch")
);
document.addEventListener(
  "mouseup",
  createDocumentMouseUpListener("metricsearch", "#ElemMetricSearch")
);

// Otevírání Filtrů
function createToggleFunction(searchId, inputId, elemId) {
  return function () {
    const searchElement = document.querySelector(searchId);
    const inputElement = document.querySelector(inputId);
    const elem = document.querySelector(elemId);

    if (searchElement.style.display == "none") {
      searchElement.style.display = "flex";
      elem.classList.add("activefiltr");

      if (window.pageYOffset == 0) {
        const height =
          document.getElementById(searchElement.id).clientHeight + "px";
        document
          .querySelector(":root")
          .style.setProperty("--spacingContent", height);
      }

      if (inputElement) {
        inputElement.focus();
      }
    } else {
      searchElement.style.display = "none";
      elem.classList.remove("activefiltr");
      document
        .querySelector(":root")
        .style.setProperty("--spacingContent", "2em");
    }
  };
}

const toggleRepSearch = createToggleFunction(
  "#repsearch",
  "#repsearch-input",
  "#ElemRepSearch"
);
const toggleOwnerSearch = createToggleFunction(
  "#ownersearch",
  null,
  "#ElemOwnSearch"
);
const toggleDescrSearch = createToggleFunction(
  "#descrsearch",
  "#descrsearch-input",
  "#ElemDescrSearch"
);
const toggleFolderSearch = createToggleFunction(
  "#foldersearch",
  null,
  "#ElemFolderSearch"
);
const toggleProductSearch = createToggleFunction(
  "#productsearch",
  null,
  "#ElemProductSearch"
);
const toggleMetricSearch = createToggleFunction(
  "#metricsearch",
  null,
  "#ElemMetricSearch"
);

function repsearchInputPort() {
  document.querySelector("#search-input").value =
    document.querySelector("#repsearch-input").value;
  searchInputCheck();
}

// Přidání věcí do Filtrů

let filtrvlastniku = [];
let filtrslozek = [];
let filtrproduktu = [];
let filtrmetrik = [];

function createFilterFunction(
  columnIndex,
  searchElementId,
  filterArray,
  filterElementId
) {
  return function () {
    let values = [];
    const table = document.getElementById("mainTable");
    const tr = table.getElementsByTagName("tr");

    for (let i = 0; i < tr.length; i++) {
      const td = tr[i].getElementsByTagName("td")[columnIndex];
      const txtValue = td.textContent || td.innerText;
      values.push(txtValue);
    }

    const uniqueArr = new Set(
      values.flatMap((item) => item.split(",").map((entry) => entry.trim()))
    );

    for (const value of uniqueArr) {
      const newDiv = document.createElement("div");
      document.getElementById(searchElementId).appendChild(newDiv);

      const newInput = document.createElement("input");
      newInput.type = "checkbox";
      newInput.name = value;
      newInput.id = value;

      newInput.addEventListener("click", () => {
        if (filterArray.indexOf(value) === -1) {
          filterArray.push(value);
        } else {
          filterArray.splice(filterArray.indexOf(value), 1);
        }
        mainFilter();
        if (filterArray.length > 0) {
          document
            .querySelector(`#${filterElementId}`)
            .classList.add("selectedfiltr");
        } else {
          document
            .querySelector(`#${filterElementId}`)
            .classList.remove("selectedfiltr");
        }
      });

      const newLabel = document.createElement("label");
      newLabel.appendChild(document.createTextNode(value));
      newLabel.htmlFor = value;

      newDiv.appendChild(newInput);
      newDiv.appendChild(newLabel);
    }
  };
}

const pridani = createFilterFunction(
  1,
  "ownersearch",
  filtrvlastniku,
  "ElemOwnSearch"
);
const pridaniSlozek = createFilterFunction(
  3,
  "foldersearch",
  filtrslozek,
  "ElemFolderSearch"
);
const pridaniProduktu = createFilterFunction(
  4,
  "productsearch",
  filtrproduktu,
  "ElemProductSearch"
);
const pridaniMetrik = createFilterFunction(
  5,
  "metricsearch",
  filtrmetrik,
  "ElemMetricSearch"
);

pridani();
pridaniSlozek();
pridaniProduktu();
pridaniMetrik();

// Kontrola prázdného Inputu

function checkDescrInput() {
  if (!document.querySelector("#descrsearch-input").value == "") {
    document.querySelector("#descrsearch-del").style.display = "block";
  } else {
    document.querySelector("#descrsearch-del").style.display = "none";
  }
}

// Mazání Filtrů

function descrsearchDel() {
  document.querySelector("#descrsearch-input").value = "";
  document.querySelector("#ElemDescrSearch").classList.remove("selectedfiltr");
  mainFilter();
}

function ownersearchDel() {
  document
    .querySelectorAll("#ownersearch > div > input[type=checkbox]")
    .forEach((el) => (el.checked = false));
  filtrvlastniku.length = 0;
  mainFilter();
  document.querySelector("#ElemOwnSearch").classList.remove("selectedfiltr");
}

function foldersearchDel() {
  document
    .querySelectorAll("#foldersearch > div > input[type=checkbox]")
    .forEach((el) => (el.checked = false));
  filtrslozek.length = 0;
  mainFilter();
  document.querySelector("#ElemFolderSearch").classList.remove("selectedfiltr");
}

function productsearchDel() {
  document
    .querySelectorAll("#productsearch > div > input[type=checkbox]")
    .forEach((el) => (el.checked = false));
  filtrproduktu.length = 0;
  mainFilter();
  document
    .querySelector("#ElemProductSearch")
    .classList.remove("selectedfiltr");
}

function metricsearchDel() {
  document
    .querySelectorAll("#metricsearch > div > input[type=checkbox]")
    .forEach((el) => (el.checked = false));
  filtrmetrik.length = 0;
  mainFilter();
  document.querySelector("#ElemMetricSearch").classList.remove("selectedfiltr");
}

// Pravé Kliky na Tlačítka

function createRightClickListener(triggerFunction) {
  return function (e) {
    e.preventDefault();
    triggerFunction();
    mainFilter();
  };
}

ElemRepSearch.addEventListener(
  "contextmenu",
  createRightClickListener(searchInputDel)
);
document
  .querySelector("#search-input")
  .addEventListener("contextmenu", createRightClickListener(searchInputDel));
ElemOwnSearch.addEventListener(
  "contextmenu",
  createRightClickListener(ownersearchDel)
);
ElemDescrSearch.addEventListener(
  "contextmenu",
  createRightClickListener(descrsearchDel)
);
ElemFolderSearch.addEventListener(
  "contextmenu",
  createRightClickListener(foldersearchDel)
);
ElemProductSearch.addEventListener(
  "contextmenu",
  createRightClickListener(productsearchDel)
);
ElemMetricSearch.addEventListener(
  "contextmenu",
  createRightClickListener(metricsearchDel)
);

// Help

let helpInterval = "";
let helpState = 0;
let txt = document.querySelector("#help-text");

function help() {
  if (document.querySelector("#help").style.display == "flex") {
    helpClose();
  } else {
    setTimeout(function () {
      document.querySelector("#help").style.opacity = "1";
    }, 50);
    document.querySelector("#help").style.display = "flex";
    helpMain();
    helpInterval = setInterval(helpMain, 8000);
  }
}

function helpTimer() {
  document.querySelector("#help-timer").style.opacity = "1";
  setTimeout(function () {
    document.querySelector("#help-timer").style.transition = "6s linear";
    document.querySelector("#help-timer").style.width = "0";
  }, 500);

  setTimeout(function () {
    document.querySelector("#help-timer").style.opacity = "0";
    document.querySelector("#help-timer").style.transition = "0.5s";
  }, 6500);

  setTimeout(function () {
    document.querySelector("#help-timer").style.width = "100%";
  }, 7000);
}

function helpMain() {
  switch (helpState) {
    case 0: {
      typetext = "";
      txt.style.opacity = "1";
      typetext = "Tabulka níže obsahuje seznam používaných Reportů v SASu:";
      setTimeout(typeWriter, 1000);
      setTimeout(helpTimer, 1000);
      setTimeout(function () {
        document.querySelector("#mainTable").style.boxShadow =
          "inset 0px 0px 0px 2px #ED1C24";
      }, 3000);
      setTimeout(function () {
        document.querySelector("#mainTable").style.boxShadow =
          "inset 0px 0px 0px 0px #ED1C24";
        txt.style.opacity = "0";
      }, 7500);
      helpState++;

      break;
    }

    case 1: {
      helpStep();
      typetext = "Kliknutím na název Reportu se Report otevře v nové záložce:";
      const element = document.querySelectorAll(
        "#mainTable tr > td:first-of-type"
      );
      setTimeout(function () {
        for (let i = 0; i < element.length; i++) {
          element[i].style.boxShadow = "0px 0px 0px 2px #ED1C24";
        }
      }, 2000);
      setTimeout(function () {
        for (let i = 0; i < element.length; i++) {
          element[i].style.boxShadow = "0px 0px 0px 0px #ED1C24";
        }
      }, 7500);

      break;
    }

    case 2: {
      helpStep();
      typetext = "Reporty lze Filtrovat dle různých Kategorií:";
      const element = document.querySelectorAll(".table-filter-header > td");

      setTimeout(function () {
        for (let i = 0; i < element.length; i++) {
          element[i].style.boxShadow = "0px 0px 0px 2px #ED1C24";
        }
        document.querySelector("#search").style.boxShadow =
          "0px 0px 0px 5px white";
      }, 1000);

      setTimeout(toggleRepSearch, 3500);

      setTimeout(function () {
        toggleRepSearch();
        toggleOwnerSearch();
      }, 4500);

      setTimeout(function () {
        toggleOwnerSearch();
        toggleDescrSearch();
      }, 5500);

      setTimeout(function () {
        toggleDescrSearch();
        toggleFolderSearch();
        toggleOwnerSearch();
      }, 6500);

      break;
    }

    case 3: {
      helpStep();
      typetext = "Podbarvení značí aktivní Filtr:";

      const element = document.querySelectorAll(".table-filter-header > td");
      setTimeout(function () {
        for (let i = 0; i < element.length; i++) {
          element[i].style.boxShadow = "0px 0px 0px 0px #ED1C24";
        }
        document.querySelector("#search").style.boxShadow =
          "0px 0px 0px 0px white";
      }, 1000);

      setTimeout(function () {
        document.querySelector(
          "#ownersearch > div:nth-of-type(3) > input"
        ).checked = true;
        filtrvlastniku.push(
          document.querySelector("#ownersearch > div:nth-of-type(3) > label")
            .innerText
        );
        mainFilter();
        document.querySelector("#ElemOwnSearch").classList.add("selectedfiltr");
      }, 2000);

      setTimeout(function () {
        document.querySelector(
          "#ownersearch > div:nth-of-type(5) > input"
        ).checked = true;
        filtrvlastniku.push(
          document.querySelector("#ownersearch > div:nth-of-type(5) > label")
            .innerText
        );
        mainFilter();
      }, 3000);

      break;
    }

    case 4: {
      helpStep();
      typetext =
        "Filtry pro danou Kategorii lze hromadně zrušit pomocí Křížku:";

      setTimeout(function () {
        document.querySelector("#ownersearch-del").style.boxShadow =
          "0px 0px 0px 2px #ED1C24";
      }, 1500);
      setTimeout(function () {
        document.querySelector("#foldersearch-del").style.boxShadow =
          "0px 0px 0px 2px #ED1C24";
      }, 2500);

      setTimeout(function () {
        document.querySelector("#ownersearch-del").style.fontWeight = "bold";
        document.querySelector("#foldersearch-del").style.fontWeight = "bold";
        document.querySelector(
          "#ownersearch > div:nth-of-type(3) > input"
        ).checked = false;
        document.querySelector(
          "#ownersearch > div:nth-of-type(5) > input"
        ).checked = false;
        filtrvlastniku.length = 0;
        mainFilter();
        document
          .querySelector("#ElemOwnSearch")
          .classList.remove("selectedfiltr");
      }, 4000);

      setTimeout(function () {
        document.querySelector("#ownersearch-del").style.fontWeight = "normal";
        document.querySelector("#foldersearch-del").style.fontWeight = "normal";
      }, 4500);

      setTimeout(function () {
        document.querySelector("#ownersearch-del").style.fontWeight = "bold";
        document.querySelector("#foldersearch-del").style.fontWeight = "bold";
      }, 5000);

      setTimeout(function () {
        document.querySelector("#ownersearch-del").style.fontWeight = "normal";
        document.querySelector("#foldersearch-del").style.fontWeight = "normal";
      }, 5500);

      setTimeout(function () {
        document.querySelector("#ownersearch-del").style.boxShadow =
          "0px 0px 0px 0px #ED1C24";
        document.querySelector("#foldersearch-del").style.boxShadow =
          "0px 0px 0px 0px #ED1C24";
      }, 7000);

      break;
    }

    case 5: {
      helpStep();
      typetext =
        "Filtry lze rovněž zrušit prostřednictvím pravého kliku na Kategorii:";

      const element = document.querySelectorAll(".table-filter-header > td");

      setTimeout(function () {
        for (let i = 0; i < element.length; i++) {
          element[i].style.boxShadow = "0px 0px 0px 2px #ED1C24";
        }
        document.querySelector("#search").style.boxShadow =
          "0px 0px 0px 5px white";
      }, 1500);

      setTimeout(function () {
        toggleFolderSearch();
        toggleOwnerSearch();
        toggleOwnerSearch();
        document.querySelector(
          "#ownersearch > div:nth-of-type(3) > input"
        ).checked = false;
        document.querySelector(
          "#ownersearch > div:nth-of-type(5) > input"
        ).checked = false;
      }, 2000);

      setTimeout(function () {
        document.querySelector(
          "#ownersearch > div:nth-of-type(3) > input"
        ).checked = true;
        filtrvlastniku.push(
          document.querySelector("#ownersearch > div:nth-of-type(3) > label")
            .innerText
        );
        mainFilter();
        document.querySelector("#ElemOwnSearch").classList.add("selectedfiltr");
      }, 3000);

      setTimeout(function () {
        document.querySelector(
          "#ownersearch > div:nth-of-type(5) > input"
        ).checked = true;
        filtrvlastniku.push(
          document.querySelector("#ownersearch > div:nth-of-type(5) > label")
            .innerText
        );
        mainFilter();
      }, 4000);

      setTimeout(toggleOwnerSearch, 5000);

      setTimeout(function () {
        filtrvlastniku.length = 0;
        mainFilter();
        document
          .querySelector("#ElemOwnSearch")
          .classList.remove("selectedfiltr");
      }, 6500);

      setTimeout(function () {
        for (let i = 0; i < element.length; i++) {
          element[i].style.boxShadow = "0px 0px 0px 0px #ED1C24";
        }
        document.querySelector("#search").style.boxShadow =
          "0px 0px 0px 0px white";
      }, 8000);

      break;
    }

    case 6: {
      helpStep();
      typetext =
        "Po zmáčknutí ; lze přímo začít vyhledávat Report pomocí názvu.";

      setTimeout(function () {
        document.querySelector(
          "#ownersearch > div:nth-of-type(3) > input"
        ).checked = false;
        document.querySelector(
          "#ownersearch > div:nth-of-type(5) > input"
        ).checked = false;
      }, 2000);

      setTimeout(function () {
        document.querySelector("#search").style.boxShadow =
          "0px 0px 0px 0px white";
      }, 3000);

      setTimeout(typeWriterb, 4500);

      break;
    }

    case 7: {
      helpStep();
      typetext = "Zmáčknutí +(1) pak název smaže.";

      setTimeout(searchInputDel, 4000);

      setTimeout(function () {
        document.querySelector("#help").style.opacity = "0";
      }, 7300);
      setTimeout(function () {
        document.querySelector("#search").style.boxShadow =
          "0px 0px 0px 0px white";
        document.querySelector("#help").style.display = "none";
      }, 7500);

      break;
    }

    case 8: {
      txt.innerText = "";
      clearInterval(helpInterval);
      typecislo = 0;
      typecislob = 0;
      typetext = "";
      helpState = 0;

      break;
    }
  }
}

function helpStep() {
  setTimeout(typeWriter, 1000);
  setTimeout(helpTimer, 1000);
  txt.innerText = "";
  typecislo = 0;
  typetext = "";
  txt.style.opacity = "1";
  setTimeout(function () {
    txt.style.opacity = "0";
  }, 7500);
  helpState++;
}

// TypeWriter

var typecislo = 0;
var typetext = "Tabulka níže obsahuje seznam používaných Reportů v SASu:";
var typerychlost = 36;

function typeWriter() {
  if (typecislo < typetext.length) {
    document.getElementById("help-text").innerHTML +=
      typetext.charAt(typecislo);
    typecislo++;
    setTimeout(typeWriter, typerychlost);
  }
}

var typecislob = 0;
var typetextb = "Report 11";
var typerychlostb = 80;

function typeWriterb() {
  if (typecislob < typetextb.length) {
    document.getElementById("search-input").value +=
      typetextb.charAt(typecislob);
    searchInputCheck();
    typecislob++;
    setTimeout(typeWriterb, typerychlostb);
  }
}

function helpClose() {
  let txt = document.querySelector("#help-text");
  txt.innerText = "";
  clearInterval(helpInterval);
  typecislo = 0;
  typecislob = 0;
  typetext = "";
  helpState = 0;
  document.querySelector("#help").style.opacity = "0";
  const element = document.querySelectorAll(".table-filter-header > td");
  setTimeout(function () {
    document.querySelector("#help").style.display = "none";
  }, 500);
  for (let i = 0; i < element.length; i++) {
    element[i].style.boxShadow = "0px 0px 0px 0px #ED1C24";
  }
  document.querySelector("#search").style.boxShadow = "white 0px 0px 0px 0px";
  document.querySelector(
    "#ownersearch > div:nth-of-type(3) > input"
  ).checked = false;
  document.querySelector(
    "#ownersearch > div:nth-of-type(5) > input"
  ).checked = false;
  document.querySelector("#ElemOwnSearch").classList.remove("selectedfiltr");
  filtrvlastniku.length = 0;
  searchInputDel();
  mainFilter();
}
