let sortiranjeUToku = 0;

function fullWidthSection(section) {
  if (section == "sortiranje") document.getElementsByClassName(section)[0].classList.remove("me-5");
  if (section == "opcije") document.getElementsByClassName(section)[0].classList.remove("ms-5");
  document.getElementsByClassName(section)[0].classList.add("col-12");
  document.getElementsByClassName(section)[0].style.borderRight = "none";
  document.getElementsByClassName(section)[0].style.borderLeft = "none";
  document.getElementsByClassName(section)[0].style.borderRadius = "0px"
}

function partialWidthSection(section) {
  if (section == "sortiranje") document.getElementsByClassName(section)[0].classList.add("me-5");
  if (section == "opcije") document.getElementsByClassName(section)[0].classList.add("ms-5");
  document.getElementsByClassName(section)[0].classList.remove("col-12");
  document.getElementsByClassName(section)[0].style.borderRight = "2px solid #737373";
  document.getElementsByClassName(section)[0].style.borderLeft = "2px solid #737373";
  document.getElementsByClassName(section)[0].style.borderRadius = "10px"
}

// Promjena dimenzija pretraživača
window.addEventListener("resize", function () {
  if (!Boolean(sortiranjeUToku)) {
    if (window.innerWidth <= 1200) {
      fullWidthSection("opcije");
      fullWidthSection("sortiranje");
    }
    else {
      partialWidthSection("opcije");
      partialWidthSection("sortiranje");
    }
  }
});

// Uklanjanje alerta
document.body.addEventListener('click', function (arg1, arg2) {
  ukloniAlert();
}, true);

// GENERIŠI NASUMIČNI NIZ
let generisiRandom = document.getElementById("generisiRandomNiz");

generisiRandom.addEventListener("click", generateNewArray);

// GENERIŠI NIZ
let generisiIzListe = document.getElementById("generisiNiz");

generisiIzListe.addEventListener("click", checkAndGenerateFromTheList);

function checkAndGenerateFromTheList() {
  // Provjeri da li je ulaz validan
  let nizString = document.getElementById("nizInput").value;
  var nizRegex = /^[0-9]+(,[0-9]+)*$/
  if (!nizRegex.test(nizString)) {
    prikaziAlert("Unesite niz u validnom obliku!")
    return
  }

  // Provjeri duzinu niza i najveći element kod Counting Sorta
  let matches = nizString.match(/\d+/g);
  let najveciBroj = Math.max(...matches)
  if (matches.length < 6) {
    prikaziAlert("Potrebno je minimalno 6 elemenata!")
    return
  }
  else if(trenutniAlgoritam == 'Counting Sort') {
    if (matches.length > 10) {
      prikaziAlert("Dozvoljeno je najviše 10 elemenata!")
      return
    }
    if (najveciBroj > 9) {
      prikaziAlert("Najveći element niza ne smije da bude veći od 9!")
      return
    }
  }
  else {
    if (matches.length > 20) {
      prikaziAlert("Dozvoljeno je najviše 20 elemenata!")
      return
    }
    if (najveciBroj > 500) {
      prikaziAlert("Najveći element niza ne smije da bude veći od 500!")
      return
    }
  }

  // Generiši niz
  generateFromTheList();
}

// Velicina niza
let n = 6;

let velicinaNiza = document.getElementById("velicinaNiza");

function promijeniBrojElemenata(changed) {
  n = changed;
  generateNewArray();
}

// Brzina sortiranja
let brzinaSortiranja = document.getElementById("brzinaSortiranja");

let speed = 16;
let c = 0;
let delay = 10000 / speed;

let mapiran = [4, 5, 6, 7, 8, 9, 10, 12, 14, 16, 18, 20, 25, 40, 80, 100, 150, 200, 500, 1000]

function promijeniBrzinu(changed) {
  speed = mapiran[changed];
  delay = 10000 / speed;
  console.log(delay);
}

// Faktor skaliranja
let faktorSkaliranja = 1;

let fktSkaliranja = document.getElementById("faktorSkaliranja");

function promijeniFaktorSkaliranja(changed) {
  faktorSkaliranja = changed;
  let preko500 = sipke_visina.some(function (item) {
    return item * faktorSkaliranja > 500
  })
  let ispod20 = sipke_visina.some(function (item) {
    return item * faktorSkaliranja < 20 && item * faktorSkaliranja != 0
  })

  for (let index = 0; index < n; index++) {
    sipke_div[index].style.height = sipke_visina[index] * faktorSkaliranja + "px";
  }

  if (Boolean(preko500)) {
    prikaziUpozorenje("Postoje elementi koji nakon skaliranja imaju visinu veću od 500px. Ovo može uzrokovati nepravilan prikaz elemenata!");
  }
  else {
    ukloniUpozorenje();
    if (Boolean(ispod20)) {
      prikaziUpozorenje("Postoje elementi koji nakon skaliranja imaju visinu manju od 20px. Ovo može uzrokovati nepravilan prikaz elemenata!");
    }
  }
}

// Stopiranje dugme
let resetBtn = document.getElementById("resetBtn");

resetBtn.addEventListener("click", () => {
  if (trenutniAlgoritam == 'Shell Sort') {
    document.getElementsByClassName("razmakDiv")[0].style.visibility = "visible";
    document.getElementsByClassName("razmakDiv")[0].style.position = "relative";
  }
  else if (trenutniAlgoritam == 'Counting Sort') {
    document.getElementsByClassName("countingDiv")[0].style.visibility = "visible";
    document.getElementsByClassName("countingDiv")[0].style.position = "relative";
  }
  else if (trenutniAlgoritam == 'Address Sort') {
    document.getElementsByClassName("funkcijaDiv")[0].style.visibility = "visible";
    document.getElementsByClassName("funkcijaDiv")[0].style.position = "relative";
  }
  
  // Sve su opcije ponovo vidljive
  document.getElementsByClassName("opcije")[0].style.position = "relative"
  document.getElementsByClassName("opcije")[0].style.visibility = "visible"  

  if (window.innerWidth <= 1200) {
    fullWidthSection("opcije");
    fullWidthSection("sortiranje");
  }
  else {
    partialWidthSection("opcije");
    partialWidthSection("sortiranje");
  }

  sortiranjeUToku = 0;

  // Pomocni nizovi inicijalno nevidljivi
  document.getElementsByClassName("pomocniKontejner")[0].style.visibility = "hidden";
  document.getElementsByClassName("pomocniKontejner")[0].style.position = "absolute";
  document.getElementsByClassName("sipkeCon3")[0].style.visibility = "hidden";
  document.getElementsByClassName("sipkeCon3")[0].style.position = "absolute";
  document.getElementsByClassName("sipkeCon")[0].style.width = "100%";

  // Nema potrebe da se bilo šta kontroliše jer ovdje sigurno znamo da će polje za upis članova niza biti validno
  generateFromTheList();
})

var nizKompleksnosti = [{ a: "Bubble Sort", tc: "n<sup>2</sup>" },
{ a: "Bubble Sort Modified", tc: "n<sup>2</sup>" },
{ a: "Insertion Sort", tc: "n<sup>2</sup>" },
{ a: "Shell Sort", tc: "n<sup>1.3</sup>" },
{ a: "Selection Sort", tc: "n<sup>2</sup>" },
{ a: "Radix Sort", tc: "nk" },
{ a: "Counting Sort", tc: "n+k" },
{ a: "Quick Sort", tc: "nlog(n)" },
{ a: "Heap Sort", tc: "nlog(n)" },
{ a: "Address Sort", tc: "n" },
{ a: "Merge Sort", tc: "nlog(n)" },
{ a: "Insertion Sort Modified", tc: "n<sup>2</sup>" }];

// Event listener za Navigation Bar
let algoritmi = document.getElementsByClassName("dropdown-item");
let trenutniAlgoritam = "Bubble Sort";
for (let i = 0; i < algoritmi.length; i++) {
  algoritmi[i].addEventListener("click", function () {
    trenutniAlgoritam = algoritmi[i].innerHTML;
    document.getElementById("naziv").innerHTML = trenutniAlgoritam.toUpperCase()

    // Ispitivanje kompleksnosti
    for (let i = 0; i < nizKompleksnosti.length; i++) {
      if (nizKompleksnosti[i].a == trenutniAlgoritam) {
        document.getElementById("naziv").innerHTML += (" - O(" + nizKompleksnosti[i].tc + ")");
        break;
      }
    }

    // Promjena maksimalne vrijednosti slidera za veličinu niza na 20, ukoliko nije u pitanju Counting Sort
    document.getElementById("velicinaNiza")["max"] = 20

    // Prilikom promjene vrste algoritma ukloniti opcije 
    document.getElementsByClassName("funkcijaDiv")[0].style.visibility = "hidden";
    document.getElementsByClassName("funkcijaDiv")[0].style.position = "absolute";
    document.getElementsByClassName("razmakDiv")[0].style.visibility = "hidden";
    document.getElementsByClassName("razmakDiv")[0].style.position = "absolute";
    document.getElementsByClassName("countingDiv")[0].style.visibility = "hidden";
    document.getElementsByClassName("countingDiv")[0].style.position = "absolute";

    if (trenutniAlgoritam == "Address Sort") {
      document.getElementsByClassName("funkcijaDiv")[0].style.visibility = "visible";
      document.getElementsByClassName("funkcijaDiv")[0].style.position = "relative";
    }
    else if (trenutniAlgoritam == "Shell Sort") {
      document.getElementsByClassName("razmakDiv")[0].style.visibility = "visible";
      document.getElementsByClassName("razmakDiv")[0].style.position = "relative";
    }
    else if (trenutniAlgoritam == "Counting Sort") {
      document.getElementsByClassName("countingDiv")[0].style.visibility = "visible";
      document.getElementsByClassName("countingDiv")[0].style.position = "relative";
      document.getElementById("velicinaNiza").value = 6
      n = 6
      document.getElementById("velicinaNiza")["max"] = 10
      document.getElementById("faktorSkaliranja").value = 50
      faktorSkaliranja = 50
      generateNewArray();
    }
    algoritmi[i].innerHTML = document.getElementById(
      "navbarDropdownMenuLink"
    ).innerHTML;
    document.getElementById("navbarDropdownMenuLink").innerHTML = trenutniAlgoritam;
  });
}

// Vrati u defaultno stanje
function enable() {
  document.querySelector(".dropdown-toggle").classList.remove("disabled");
  sortBtn.classList.remove("disabled");
  resetBtn.classList.add("disabled");
  brzinaSortiranja.removeAttribute("disabled");
  velicinaNiza.removeAttribute("disabled");
  fktSkaliranja.removeAttribute("disabled");
}

// Nije nužno potrebno da se disable-aju ovi elementi jer je sekcija koja ih prikazuje skrivena
function disable() {
  document.querySelector(".dropdown-toggle").classList.add("disabled");
  sortBtn.classList.add("disabled");
  resetBtn.classList.remove("disabled");
  brzinaSortiranja.setAttribute("disabled", "");
  velicinaNiza.setAttribute("disabled", "");
  fktSkaliranja.setAttribute("disabled", "");

  // Ovdje se ipak mora dodati da shell (i address, i counting) nije visible jer njegova vrijednost atributa position ima veci prioritet od atributa .opcije
  document.getElementsByClassName("funkcijaDiv")[0].style.visibility = "hidden";
  document.getElementsByClassName("funkcijaDiv")[0].style.position = "absolute";

  document.getElementsByClassName("razmakDiv")[0].style.visibility = "hidden";
  document.getElementsByClassName("razmakDiv")[0].style.position = "absolute";

  document.getElementsByClassName("countingDiv")[0].style.visibility = "hidden";
  document.getElementsByClassName("countingDiv")[0].style.position = "absolute";
}

// Barovi - Numeričke vrijednsoti
let sipke_visina = [];
let sipke_B_visina = [];
let sipke_C_visina = [];

// Div elementi
let sipke_div = [];
let sipke_B_div = [];
let sipke_C_div = [];
let iznosi = [];
let iznosi_B = [];
let iznosi_C = [];
let indeksi = [];
let indeksi_B = [];
let indeksi_C = [];

// Za Address, Merge i Heap
let novi_kontejneri = []

// Reference na kontejnere sipki
let sipkeKontejner = document.querySelector(".sipkeCon");
let sipkeKontejnerB = document.querySelector(".pomocniKontejner");
let sipkeKontejnerC = document.querySelector(".sipkeCon3");

// Generisanje iz liste
function generateFromTheList() {
  enable();

  // Regenerisanje nizova div-ova:
  sipke_visina = []
  sipke_B_visina = []
  sipke_C_visina = []
  iznosi = []
  iznosi_B = []
  iznosi_C = []
  indeksi = []
  indeksi_B = []
  indeksi_C = []

  sipkeKontejner.innerHTML = "";
  sipkeKontejnerB.innerHTML = "";
  sipkeKontejnerC.innerHTML = "";

  let nizString = document.getElementById("nizInput").value;
  let matches = nizString.match(/\d+/g);
  // Postavi n i slider za velicinu niza na broj elemenata unesen u polje za unos niza
  n = matches.length;
  document.getElementById("velicinaNiza").value = n

  let preko500 = 0;
  let ispod20 = 0;

  // Podesavanje širine jedne šipke
  if (n > 15) {
    document.documentElement.style.setProperty("--width", "20px");
  } else {
    document.documentElement.style.setProperty("--width", "30px");
  }

  for (let index = 0; index < n; index++) {
    sipke_visina[index] = parseInt(matches[index], 10);
    sipke_div[index] = document.createElement("div");
    sipke_div[index].classList.add("sipka");

    // Ako ima vise od 15 elemenata, napravi razmak
    if (n > 15) sipke_div[index].style.marginLeft = "14px"

    // Dodaj šipku 'index' u kontejner
    sipkeKontejner.appendChild(sipke_div[index]);
    sipke_div[index].style.height = sipke_visina[index] * faktorSkaliranja + "px"; // dodati neki faktor za height

    // Provjeri visinu šipki zbog eventualnog upozorenja
    if (sipke_visina[index] * faktorSkaliranja > 500) preko500 = 1;
    if (sipke_visina[index] * faktorSkaliranja < 20 && sipke_visina[index] * faktorSkaliranja != 0) ispod20 = 1;

    // Element unutar same šipke koji ukazuje na vrijednost
    iznosi[index] = document.createElement("p");
    iznosi[index].classList.add("iznosi");
    iznosi[index].innerHTML = sipke_visina[index];
    sipke_div[index].appendChild(iznosi[index]);

    // Indeksi elemenata
    indeksi[index] = document.createElement("p");
    indeksi[index].classList.add("indeksi")
    indeksi[index].innerHTML = index;
    sipke_div[index].appendChild(indeksi[index]);
  }

  if (Boolean(preko500)) {
    prikaziUpozorenje("Postoje elementi koji nakon skaliranja imaju visinu veću od 500px. Ovo može uzrokovati nepravilan prikaz elemenata!");
  }
  else {
    ukloniUpozorenje();
    if (Boolean(ispod20)) {
      prikaziUpozorenje("Postoje elementi koji nakon skaliranja imaju visinu manju od 20px. Ovo može uzrokovati nepravilan prikaz elemenata!");
    }
  }

  // Fiktivni element visine 500px, zbog ujednačenog prikaza bilo kakvog niza
  var fiktivni = document.createElement("div")
  fiktivni.classList.add("sipka")
  fiktivni.style.height = "500px"
  // Sakrivanje elementa
  fiktivni.style.visibility = "hidden"
  sipkeKontejner.appendChild(fiktivni)

  // Upis iznosa najvećeg elementa u polje K
  if (trenutniAlgoritam == 'Counting Sort') {
    document.getElementById("countingSpan").innerHTML = Math.max(...sipke_visina)
  }
}

// Generisanje nasumičnih elemenata
function generateNewArray() {
  enable();

  sipkeKontejner.innerHTML = "";
  sipkeKontejnerB.innerHTML = "";
  sipkeKontejnerC.innerHTML = "";

  // Regenerisanje nizova:
  sipke_visina = []
  sipke_B_visina = []
  sipke_C_visina = []
  iznosi = []
  iznosi_B = []
  iznosi_C = []
  indeksi = []
  indeksi_B = []
  indeksi_C = []

  if (n > 15) {
    document.documentElement.style.setProperty("--width", "20px");
  } else {
    document.documentElement.style.setProperty("--width", "30px");
  }

  // U sadrzajPolja se upisuje string koji predstavlja sve generisane nasumične elemente odvojene zarezom
  var sadrzajPolja = new String("")

  let preko500 = 0;
  let ispod20 = 0;

  if (trenutniAlgoritam != "Counting Sort") {
    document.getElementById("faktorSkaliranja").value = 1
    faktorSkaliranja = 1
  }

  for (let i = 0; i < n; i++) {
    sipke_visina[i] = Math.floor(Math.random() * (450 + 1) + 50);
    if (trenutniAlgoritam == "Counting Sort") {
      sipke_visina[i] = Math.floor(Math.random() * 10);
    }
    else {
      if (i == 3) sipke_visina[i] = 500
    }

    sipke_div[i] = document.createElement("div");
    sipke_div[i].classList.add("sipka");

    // Ako ima vise od 15 elemenata, napravi razmak
    if (n > 15) sipke_div[i].style.marginLeft = "14px"

    sipkeKontejner.appendChild(sipke_div[i]);
    sipke_div[i].style.height = sipke_visina[i] * faktorSkaliranja + "px";

    // Kontrola validnosti
    if (sipke_visina[i] * faktorSkaliranja > 500) preko500 = 1;
    if (sipke_visina[i] * faktorSkaliranja < 20 && sipke_visina[i] * faktorSkaliranja != 0) ispod20 = 1;

    // Element unutar same šipke - vrijednost šipke
    iznosi[i] = document.createElement("p");
    iznosi[i].classList.add("iznosi");
    iznosi[i].innerHTML = sipke_visina[i];
    sipke_div[i].appendChild(iznosi[i]);

    // Indeksi elemenata
    indeksi[i] = document.createElement("p");
    indeksi[i].classList.add("indeksi")
    indeksi[i].innerHTML = i;
    sipke_div[i].appendChild(indeksi[i]);

    // Popunjavanje stringa sadržaja
    sadrzajPolja += sipke_visina[i]
    if (i != n - 1) sadrzajPolja += ','
  }

  if (Boolean(preko500)) {
    prikaziUpozorenje("Postoje elementi koji nakon skaliranja imaju visinu veću od 500px. Ovo može uzrokovati nepravilan prikaz elemenata!");
  }
  else {
    ukloniUpozorenje();
    if (Boolean(ispod20)) {
      prikaziUpozorenje("Postoje elementi koji nakon skaliranja imaju visinu manju od 20px. Ovo može uzrokovati nepravilan prikaz elemenata!");
    }
  }

  // Fiktivni element visine 500px
  var fiktivni = document.createElement("div")
  fiktivni.classList.add("sipka")
  fiktivni.style.height = "500px"
  fiktivni.style.visibility = "hidden"
  sipkeKontejner.appendChild(fiktivni)

  // Upis u polje za unos niza
  document.getElementById('nizInput').value = sadrzajPolja;

  if (trenutniAlgoritam == 'Counting Sort') {
    document.getElementById("countingSpan").innerHTML = Math.max(...sipke_visina)
  }
}

// Boje
let zadnjiSortirani = "#f44336"
let helperBoja = "#D60060";
let parcijalnoSortiran = '#BFFF00'
let sortiranBoja = "#40FF00";
let privremeniBoja = "#FFD700";
let pivotBoja = "#0075FF";
let iteracijaBoja = "#5C5A59";
let resetirajBoja = "whitesmoke";
let zamijeniBoja = "#ff8ba0";

// Za opcije Shell, Counting i Address Sorta
document.getElementsByClassName("funkcijaDiv")[0].style.visibility = "hidden";
document.getElementsByClassName("funkcijaDiv")[0].style.position = "absolute";

document.getElementsByClassName("razmakDiv")[0].style.visibility = "hidden";
document.getElementsByClassName("razmakDiv")[0].style.position = "absolute";

document.getElementsByClassName("countingDiv")[0].style.visibility = "hidden";
document.getElementsByClassName("countingDiv")[0].style.position = "absolute";

// Za pomocne kontejnere
document.getElementsByClassName("pomocniKontejner")[0].style.visibility = "hidden";
document.getElementsByClassName("pomocniKontejner")[0].style.position = "absolute";
document.getElementsByClassName("sipkeCon3")[0].style.visibility = "hidden";
document.getElementsByClassName("sipkeCon3")[0].style.position = "absolute";
document.getElementsByClassName("sipkeCon")[0].style.width = "100%";

// Za alerte
for (let i = 0; i < document.getElementsByClassName("alert").length; i++) {
  document.getElementsByClassName("alert")[i].style.display = "none";
}

// Prvo ucitavanje
if (window.innerWidth <= 1200) {
  // Raširi Opcije sekciju na cijeli ekran
  fullWidthSection("opcije");
  fullWidthSection("sortiranje");
}

function isMobileDevice() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

if(isMobileDevice()) {
  prikaziUpozorenje("Pristupate ovoj stranici koristeći mobilni uređaj! Neke funkcionalnosti neće raditi u skladu sa očekivanjima!");
}

generateNewArray();
