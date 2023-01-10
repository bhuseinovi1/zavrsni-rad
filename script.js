// Zastava da sortiranje nije u toku
let sortiranjeUToku = 0;

// Podesi širinu sekcije na punu širinu
function fullWidthSection(section) {
  if (section == "sortiranje") {
    document.getElementsByClassName(section)[0].classList.remove("me-5");
  }
  else {
    document.getElementsByClassName(section)[0].classList.remove("ms-5");
  }
  document.getElementsByClassName(section)[0].classList.add("col-12");
  document.getElementsByClassName(section)[0].style.borderRight = "none";
  document.getElementsByClassName(section)[0].style.borderLeft = "none";
  document.getElementsByClassName(section)[0].style.borderRadius = "0px"
}

// Podesi širinu sekcije
function partialWidthSection(section) {
  if (section == "sortiranje") {
    document.getElementsByClassName(section)[0].classList.add("me-5");
  }
  else {
    document.getElementsByClassName(section)[0].classList.add("ms-5");
  }
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
  else {
    if (trenutniAlgoritam == "Counting Sort") {
      if (window.innerWidth <= 1600) document.documentElement.style.setProperty("--width", "20px");
      else document.documentElement.style.setProperty("--width", "28px");
    }
    else if (trenutniAlgoritam == "Radix Sort" || trenutniAlgoritam == "Address Sort") {
      if (window.innerWidth <= 1600) {
        if (n > 15) {
          document.documentElement.style.setProperty("--width", "14px");
        }
        else document.documentElement.style.setProperty("--width", "20px");
      }
      else {
        if (n > 15) {
          document.documentElement.style.setProperty("--width", "22px");
        }
        else document.documentElement.style.setProperty("--width", "28px");
      }
    }
    else if (trenutniAlgoritam == "Insertion Sort" || trenutniAlgoritam == "Insertion Sort Modificirani") {
      if (window.innerWidth <= 1200) {
        if (n > 15) {
          document.documentElement.style.setProperty("--width", "20px");
        }
        else document.documentElement.style.setProperty("--width", "28px");
      }
      else {
        if (n > 15) {
          document.documentElement.style.setProperty("--width", "22px");
        }
        else document.documentElement.style.setProperty("--width", "28px");
      }
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

// Validacija ulaza
function checkAndGenerateFromTheList() {
  // Provjera smislenosti ulaza
  let nizString = document.getElementById("nizInput").value;
  var nizRegex = /^[0-9]+(,[0-9]+)*$/
  if (!nizRegex.test(nizString)) {
    prikaziAlert("Unesite niz u validnom obliku!");
    return;
  }

  // Provjeri dužinu niza i najveći element
  let matches = nizString.match(/\d+/g);
  let najveciBroj = Math.max(...matches)
  if (isMobileDevice() && matches.length != 6) {
    prikaziAlert("Na mobilnim uređajima je dozvoljeno isključivo 6 elemenata!");
    return;
  }
  if (matches.length < 6) {
    prikaziAlert("Potrebno je minimalno 6 elemenata!");
    return;
  }
  else if (trenutniAlgoritam == 'Counting Sort') {
    if (matches.length > 10) {
      prikaziAlert("Dozvoljeno je najviše 10 elemenata!");
      return;
    }
    if (najveciBroj > 9) {
      prikaziAlert("Najveći element niza ne smije da bude veći od 9!");
      return;
    }
  }
  else {
    if (matches.length > 20) {
      prikaziAlert("Dozvoljeno je najviše 20 elemenata!");
      return;
    }
    if (najveciBroj > 500) {
      prikaziAlert("Najveći element niza ne smije da bude veći od 500!");
      return;
    }
  }

  // Generiši niz
  generateFromTheList();
}

// Veličina niza
let n = 10;

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

let mapiranaBrzina = [4, 5, 6, 7, 8, 9, 10, 12, 14, 16, 18, 20, 25, 40, 80, 100, 150, 200, 500, 1000]

function promijeniBrzinu(changed) {
  speed = mapiranaBrzina[changed];
  delay = 10000 / speed;
  console.log(delay);
}

// Faktor skaliranja
let scaleFactor = 1;

let faktorSkaliranja = document.getElementById("faktorSkaliranja");

function promijeniFaktorSkaliranja(changed) {
  scaleFactor = changed;

  for (let index = 0; index < n; index++) {
    sipke_div[index].style.height = sipke_visina[index] * scaleFactor + "px";
  }

  // Ispiši potencijalno upozorenje
  let preko500 = sipke_visina.some(function (item) {
    return item * scaleFactor > 500
  })
  let ispod20 = sipke_visina.some(function (item) {
    return item * scaleFactor < 20 && item * scaleFactor != 0
  })

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
    document.getElementsByClassName("razmaciDiv")[0].style.visibility = "visible";
    document.getElementsByClassName("razmaciDiv")[0].style.position = "relative";
  }
  else if (trenutniAlgoritam == 'Counting Sort') {
    document.getElementsByClassName("countingDiv")[0].style.visibility = "visible";
    document.getElementsByClassName("countingDiv")[0].style.position = "relative";
  }
  else if (trenutniAlgoritam == 'Address Sort') {
    document.getElementsByClassName("funkcijaDiv")[0].style.visibility = "visible";
    document.getElementsByClassName("funkcijaDiv")[0].style.position = "relative";
    nizLinija.forEach(linije => linije.forEach(linija => {
      try {
        linija.remove();
        console.log("Linija obrisana");
      }
      catch {
        console.log("Ne može se obrisati nedefinirana linija");
      }
    }));
  }

  // Sekcija Opcije je ponovo vidljiva
  document.getElementsByClassName("opcije")[0].style.position = "relative"
  document.getElementsByClassName("opcije")[0].style.visibility = "visible"

  // Podešavanje širina sekcija
  if (window.innerWidth <= 1200) {
    fullWidthSection("opcije");
    fullWidthSection("sortiranje");
  }
  else {
    partialWidthSection("opcije");
    partialWidthSection("sortiranje");
  }

  // Zastava se postavlja na 0 jer je sortiranje gotovo
  sortiranjeUToku = 0;

  // Pomoćni nizovi inicijalno nevidljivi
  document.getElementsByClassName("pomocniKontejner")[0].style.visibility = "hidden";
  document.getElementsByClassName("pomocniKontejner")[0].style.position = "absolute";
  document.getElementsByClassName("sipkeCon3")[0].style.visibility = "hidden";
  document.getElementsByClassName("sipkeCon3")[0].style.position = "absolute";
  document.getElementsByClassName("sipkeCon")[0].style.width = "100%";

  generateFromTheList();
})

// Mapiranje algoritama sortiranja sa respektivnim vremenskim složenostima
var nizKompleksnosti = [{ a: "Bubble Sort", tc: "n<sup>2</sup>" },
{ a: "Bubble Sort Modificirani", tc: "n<sup>2</sup>" },
{ a: "Insertion Sort", tc: "n<sup>2</sup>" },
{ a: "Shell Sort", tc: "n<sup>1.3</sup>" },
{ a: "Selection Sort", tc: "n<sup>2</sup>" },
{ a: "Radix Sort", tc: "nk" },
{ a: "Counting Sort", tc: "n+k" },
{ a: "Quick Sort", tc: "nlog(n)" },
{ a: "Heap Sort", tc: "nlog(n)" },
{ a: "Address Sort", tc: "n" },
{ a: "Merge Sort", tc: "nlog(n)" },
{ a: "Insertion Sort Modificirani", tc: "n<sup>2</sup>" }];

// Event listener za Navigation Bar
let algoritmi = document.getElementsByClassName("dropdown-item");
let trenutniAlgoritam = "Bubble Sort";
for (let i = 0; i < algoritmi.length; i++) {
  algoritmi[i].addEventListener("click", function () {
    trenutniAlgoritam = algoritmi[i].innerHTML;
    document.getElementById("naziv").innerHTML = trenutniAlgoritam.toUpperCase();

    // Dodavanje odgovarajuće kompleksnosti u naziv metode sortiranja
    let slozenost = nizKompleksnosti.filter(function (element) {
      return element.a == trenutniAlgoritam;
    })[0].tc;
    document.getElementById("naziv").innerHTML += (" - O(" + slozenost + ")");

    // Promjena maksimalne vrijednosti slider-aa za veličinu niza na 20, ukoliko nije u pitanju Counting Sort
    document.getElementById("velicinaNiza")["max"] = 20

    // Prilikom promjene vrste algoritma ukloniti opcije 
    document.getElementsByClassName("funkcijaDiv")[0].style.visibility = "hidden";
    document.getElementsByClassName("funkcijaDiv")[0].style.position = "absolute";
    document.getElementsByClassName("razmaciDiv")[0].style.visibility = "hidden";
    document.getElementsByClassName("razmaciDiv")[0].style.position = "absolute";
    document.getElementsByClassName("countingDiv")[0].style.visibility = "hidden";
    document.getElementsByClassName("countingDiv")[0].style.position = "absolute";

    // Vraćanje potrebnih opcija
    if (trenutniAlgoritam == "Address Sort") {
      document.getElementsByClassName("funkcijaDiv")[0].style.visibility = "visible";
      document.getElementsByClassName("funkcijaDiv")[0].style.position = "relative";
    }
    else if (trenutniAlgoritam == "Shell Sort") {
      document.getElementsByClassName("razmaciDiv")[0].style.visibility = "visible";
      document.getElementsByClassName("razmaciDiv")[0].style.position = "relative";
    }
    else if (trenutniAlgoritam == "Counting Sort") {
      document.getElementsByClassName("countingDiv")[0].style.visibility = "visible";
      document.getElementsByClassName("countingDiv")[0].style.position = "relative";
      if(isMobileDevice()) {
        document.getElementById("velicinaNiza").value = 6;
        n = 6;
      }
      else {
        document.getElementById("velicinaNiza").value = 10;
        n = 10;
      }
      document.getElementById("velicinaNiza")["max"] = 10;
      document.getElementById("faktorSkaliranja").value = 50;
      scaleFactor = 50;
      generateNewArray();
    }
    algoritmi[i].innerHTML = document.getElementById(
      "navbarDropdownMenuLink"
    ).innerHTML;
    document.getElementById("navbarDropdownMenuLink").innerHTML = trenutniAlgoritam;
  });
}

// Omogući opcije
function enable() {
  document.querySelector(".dropdown-toggle").classList.remove("disabled");
  sortBtn.classList.remove("disabled");
  resetBtn.classList.add("disabled");
  brzinaSortiranja.removeAttribute("disabled");
  if (!isMobileDevice()) velicinaNiza.removeAttribute("disabled");
  faktorSkaliranja.removeAttribute("disabled");
}

// Onemogući opcije
function disable() {
  document.querySelector(".dropdown-toggle").classList.add("disabled");
  sortBtn.classList.add("disabled");
  resetBtn.classList.remove("disabled");
  brzinaSortiranja.setAttribute("disabled", "");
  //velicinaNiza.setAttribute("disabled", "");
  faktorSkaliranja.setAttribute("disabled", "");

  // Posebno za specifične algoritme
  document.getElementsByClassName("funkcijaDiv")[0].style.visibility = "hidden";
  document.getElementsByClassName("funkcijaDiv")[0].style.position = "absolute";

  document.getElementsByClassName("razmaciDiv")[0].style.visibility = "hidden";
  document.getElementsByClassName("razmaciDiv")[0].style.position = "absolute";

  document.getElementsByClassName("countingDiv")[0].style.visibility = "hidden";
  document.getElementsByClassName("countingDiv")[0].style.position = "absolute";
}

// Šipke - Numeričke vrijednsoti
let sipke_visina = [];
let sipke_B_visina = [];
let sipke_C_visina = [];

// Kontejneri
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
let nizLinija = []

// Reference na kontejnere
let sipkeKontejner = document.querySelector(".sipkeCon");
let sipkeKontejnerB = document.querySelector(".pomocniKontejner");
let sipkeKontejnerC = document.querySelector(".sipkeCon3");

// Generisanje iz liste
function generateFromTheList() {
  enable();

  // Regenerisanje nizova kontejnera:
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

  // Uzmi podatke iu polja za unos niza
  let brojeviIzInputPolja = document.getElementById("nizInput").value;
  let matches = brojeviIzInputPolja.match(/\d+/g);
  // Postavi n i slider za veličinu niza na broj elemenata unesen u polje za unos niza
  n = matches.length;
  document.getElementById("velicinaNiza").value = n

  // Zastave za potencijalno upozorenje
  let preko500 = 0;
  let ispod20 = 0;

  // Podešavanje širine jedne šipke
  if (n > 15) {
    document.documentElement.style.setProperty("--width", "22px");
  } else {
    document.documentElement.style.setProperty("--width", "28px");
  }

  for (let index = 0; index < n; index++) {
    // Kreiraj šipku na indeksu 'index'
    sipke_visina[index] = parseInt(matches[index], 10);
    sipke_div[index] = document.createElement("div");
    sipke_div[index].classList.add("sipka");

    // Ako ima vise od 15 elemenata, dodaj margin
    if (n > 15) sipke_div[index].style.marginLeft = "14px"

    // Dodaj šipku na indeksu 'index' u kontejner
    sipkeKontejner.appendChild(sipke_div[index]);
    sipke_div[index].style.height = sipke_visina[index] * scaleFactor + "px";

    // Provjeri visinu šipki zbog eventualnog upozorenja
    if (sipke_visina[index] * scaleFactor > 500) preko500 = 1;
    if (sipke_visina[index] * scaleFactor < 20 && sipke_visina[index] * scaleFactor != 0) ispod20 = 1;

    // Vrijednosti elemenata
    iznosi[index] = document.createElement("p");
    iznosi[index].classList.add("iznosi");
    iznosi[index].innerHTML = sipke_visina[index];
    sipke_div[index].appendChild(iznosi[index]);

    // Indeksi elemenata
    indeksi[index] = document.createElement("p");
    indeksi[index].classList.add("indeksi");
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

  // Fiktivni element visine 500px
  var fiktivni = document.createElement("div");
  fiktivni.classList.add("sipka");
  fiktivni.style.height = "500px";
  fiktivni.style.visibility = "hidden";
  sipkeKontejner.appendChild(fiktivni);

  // Upis iznosa najvećeg elementa u polje K
  if (trenutniAlgoritam == 'Counting Sort') {
    document.getElementById("countingSpan").innerHTML = Math.max(...sipke_visina);
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

  // Podešavanje širine jedne šipke
  if (n > 15) {
    document.documentElement.style.setProperty("--width", "22px");
  } else {
    document.documentElement.style.setProperty("--width", "28px");
  }

  // U sadrzajPolja se upisuje string koji predstavlja sve generisane nasumične elemente odvojene zarezom
  var sadrzajPolja = new String("")

  // Zastave za potencijalno upozorenje
  let preko500 = 0;
  let ispod20 = 0;

  // Vrati faktor skaliranja na 1 ako trenutni algoritam nije Counting Sort
  if (trenutniAlgoritam != "Counting Sort") {
    document.getElementById("faktorSkaliranja").value = 1
    scaleFactor = 1
  }

  for (let i = 0; i < n; i++) {
    // Kreiraj šipku na indeksu 'index'
    if (trenutniAlgoritam == "Counting Sort") {
      sipke_visina[i] = Math.floor(Math.random() * 10);
    }
    else if (i == 3) {
      sipke_visina[i] = 500;
    }
    else {
      sipke_visina[i] = Math.floor(Math.random() * (450 + 1) + 50);
    }

    // Dodaj šipku na indeksu 'index' u kontejner
    sipke_div[i] = document.createElement("div");
    sipke_div[i].classList.add("sipka");

    // Ako ima vise od 15 elemenata, dodaj margin
    if (n > 15) sipke_div[i].style.marginLeft = "14px"

    sipkeKontejner.appendChild(sipke_div[i]);
    sipke_div[i].style.height = sipke_visina[i] * scaleFactor + "px";

    // Kontrola validnosti nakon skaliranja
    if (sipke_visina[i] * scaleFactor > 500) preko500 = 1;
    if (sipke_visina[i] * scaleFactor < 20 && sipke_visina[i] * scaleFactor != 0) ispod20 = 1;

    // Vrijednost elemenata
    iznosi[i] = document.createElement("p");
    iznosi[i].classList.add("iznosi");
    iznosi[i].innerHTML = sipke_visina[i];
    sipke_div[i].appendChild(iznosi[i]);

    // Indeksi elemenata
    indeksi[i] = document.createElement("p");
    indeksi[i].classList.add("indeksi");
    indeksi[i].innerHTML = i;
    sipke_div[i].appendChild(indeksi[i]);

    // Popunjavanje sadržaja input polja
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
let iteracijaBoja = '#5C5A59';
let zamijeniBoja = '#FF8BA0';
let resetirajBoja = 'whitesmoke';
let pivotBoja = '#0075FF';
let privremeniBoja = '#FFD700';
let zadnjiPromijenjeniBoja = '#F44336';
let helperBoja = '#D60060';
let parcijalnoSortiranBoja = '#BFFF00';
let sortiranBoja = '#40FF00';

// Za opcije Shell, Counting i Address Sorta
document.getElementsByClassName("funkcijaDiv")[0].style.visibility = "hidden";
document.getElementsByClassName("funkcijaDiv")[0].style.position = "absolute";

document.getElementsByClassName("razmaciDiv")[0].style.visibility = "hidden";
document.getElementsByClassName("razmaciDiv")[0].style.position = "absolute";

document.getElementsByClassName("countingDiv")[0].style.visibility = "hidden";
document.getElementsByClassName("countingDiv")[0].style.position = "absolute";

// Za pomoćne kontejnere
document.getElementsByClassName("pomocniKontejner")[0].style.visibility = "hidden";
document.getElementsByClassName("pomocniKontejner")[0].style.position = "absolute";
document.getElementsByClassName("sipkeCon3")[0].style.visibility = "hidden";
document.getElementsByClassName("sipkeCon3")[0].style.position = "absolute";
document.getElementsByClassName("sipkeCon")[0].style.width = "100%";

// Za alerte i upozorenja
for (let i = 0; i < document.getElementsByClassName("alert").length; i++) {
  document.getElementsByClassName("alert")[i].style.display = "none";
}

// Učitavanje iz datoteke
const fileInput = document.getElementById('fileInput');

fileInput.addEventListener('click', function () {
  this.value = null;
})

fileInput.addEventListener('change', async function () {
  try {
    const file = this.files[0];
    const text = await readFileAsync(file);
    document.getElementById("nizInput").value = text;
    document.getElementById('fileLabel').innerHTML = this.value.split('\\').pop();
    checkAndGenerateFromTheList();
  }
  catch {
    console.log("Niste odabrali fajl!");
  }
});

async function readFileAsync(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsText(file);
  });
}

// Prvo učitavanje
if (window.innerWidth <= 1200) {
  // Obje sekcije maksimalne širine, jedna ispod druge
  fullWidthSection("opcije");
  fullWidthSection("sortiranje");
}

// Da li je u pitanju mobilni uređaj
function isMobileDevice() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

function afterLoading() {
  if (isMobileDevice()) {
    document.getElementById("velicinaNiza").value = 6;
    n = 6;
    document.getElementById("velicinaNiza").disabled = true;
  }
  generateNewArray();
  if (isMobileDevice()) {
    prikaziUpozorenje("Pristupate ovoj stranici koristeći mobilni uređaj! Neke funkcionalnosti neće raditi u skladu sa očekivanjima!");
  }
}

let timeoutId;

function startTimer() {
  timeoutId = setTimeout(function () {
    window.stop();
    afterLoading();
  }, 2000);
}

function stopTimer() {
  clearTimeout(timeoutId);
}

window.addEventListener("load", function () {
  stopTimer();
  afterLoading();
});

startTimer();