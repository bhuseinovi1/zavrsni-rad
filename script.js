// Signal da sortiranje nije u toku
let sortiranjeUToku = 0;

// Šipke - numeričke vrijednosti
let sipke_visina = [];
let sipke_B_visina = [];
let sipke_C_visina = [];

// Kontejneri za prikaz šipki
let sipke_div = [];
let sipke_B_div = [];
let sipke_C_div = [];
let iznosi = [];
let iznosi_B = [];
let iznosi_C = [];
let indeksi = [];
let indeksi_B = [];
let indeksi_C = [];

// Pomoćni kontejneri
let cvor_kontejneri = [];
let niz_linija = [];

// Reference na kontejnere
let sipkeKontejner = document.querySelector(".sipke-kontejner");
let pomocniKontejner = document.querySelector(".pomocni-kontejner");
let countingKontejner = document.querySelector(".counting-kontejner");

// Uklanjanje alerta
document.body.addEventListener('click', function (arg1, arg2) {
  ukloniAlert();
}, true);

// Podešavanje širine sekcije na širinu pretraživača
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
  document.getElementsByClassName(section)[0].style.borderRadius = "0px";
}

// Podešavanje širine sekcije
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
  document.getElementsByClassName(section)[0].style.borderRadius = "10px";
}

// Promjena dimenzija pretraživača
window.addEventListener('resize', function () {
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
      if (window.innerWidth <= 1600) document.documentElement.style.setProperty("--width", "18px");
      else document.documentElement.style.setProperty("--width", "28px");
    }
    else if (trenutniAlgoritam == "Radix Sort" || trenutniAlgoritam == "Address Sort" || trenutniAlgoritam == "Shell Sort") {
      if (window.innerWidth <= 1600) {
        if (n > 15) {
          document.documentElement.style.setProperty("--width", "14px");
        }
        else document.documentElement.style.setProperty("--width", "20px");
      }
      else {
        if (n > 15) {
          if (trenutniAlgoritam == "Shell Sort") document.documentElement.style.setProperty("--width", "20px");
          else document.documentElement.style.setProperty("--width", "22px");
        }
        else {
          document.documentElement.style.setProperty("--width", "28px");
        }
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

// Generisanje nasumičnog niza
let generisiRandom = document.getElementById("generisiRandomNiz");
generisiRandom.addEventListener('click', generisiRandomNiz);

// Generisanje niza
let generisiIzListe = document.getElementById("generisiNiz");
generisiIzListe.addEventListener('click', validirajIGenerisiIzListe);

// Validacija ulaza
function validirajIGenerisiIzListe() {
  // Provjera smislenosti ulaza
  let niz_str = document.getElementById("nizInput").value;
  var nizRegex = /^[0-9]+(,[0-9]+)*$/;
  if (!nizRegex.test(niz_str)) {
    prikaziAlert("Unesite niz u validnom obliku!");
    return;
  }

  // Provjera dužine niza i najvećeg elementa
  let niz = niz_str.match(/\d+/g);
  let najveciBroj = Math.max(...niz);
  if (isMobileDevice() && niz.length != 6) {
    prikaziAlert("Na mobilnim uređajima je dozvoljeno isključivo 6 elemenata!");
    return;
  }
  if (niz.length < 6) {
    prikaziAlert("Potrebno je minimalno 6 elemenata!");
    return;
  }
  else if (trenutniAlgoritam == "Counting Sort") {
    if (niz.length > 10) {
      prikaziAlert("Dozvoljeno je najviše 10 elemenata!");
      return;
    }
    if (najveciBroj > 9) {
      prikaziAlert("Najveći element niza ne smije da bude veći od 9!");
      return;
    }
  }
  else {
    if (niz.length > 20) {
      prikaziAlert("Dozvoljeno je najviše 20 elemenata!");
      return;
    }
    if (najveciBroj > 500) {
      prikaziAlert("Najveći element niza ne smije da bude veći od 500!");
      return;
    }
  }

  generateFromTheList();
}

// Veličina niza
let velicinaNiza = document.getElementById("velicinaNiza");
let n = 10;

function promijeniBrojElemenata(changed) {
  n = changed;
  generisiRandomNiz();
}

// Brzina sortiranja
let brzinaSortiranja = document.getElementById("brzinaSortiranja");
let pocetakAnimacije = 0;
let mapirane_brzine = [4, 5, 6, 7, 8, 9, 10, 12, 14, 16, 18, 20, 25, 40, 80, 100, 150, 200, 500, 1000];
let kasnjenjeAnimacije = 10000 / mapirane_brzine[9];

function promijeniBrzinu(changed) {
  kasnjenjeAnimacije = 10000 / mapirane_brzine[changed];
  console.log(kasnjenjeAnimacije);
}

// Faktor skaliranja
let faktorSkaliranjaRange = document.getElementById("faktorSkaliranja");
let faktorSkaliranja = 1;

function promijeniFaktorSkaliranja(changed) {
  faktorSkaliranja = changed;

  for (let index = 0; index < n; index++) {
    sipke_div[index].style.height = sipke_visina[index] * faktorSkaliranja + "px";
  }

  let preko500 = sipke_visina.some(function (item) {
    return item * faktorSkaliranja > 500;
  })
  let ispod20 = sipke_visina.some(function (item) {
    return item * faktorSkaliranja < 20 && item * faktorSkaliranja != 0;
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

// Stopiraj dugme
let stopBtn = document.getElementById("stopBtn");

stopBtn.addEventListener('click', () => {
  if (trenutniAlgoritam == "Shell Sort") {
    document.getElementsByClassName("razmaci-div")[0].style.visibility = "visible";
    document.getElementsByClassName("razmaci-div")[0].style.position = "relative";
  }
  else if (trenutniAlgoritam == "Counting Sort") {
    document.getElementsByClassName("counting-div")[0].style.visibility = "visible";
    document.getElementsByClassName("counting-div")[0].style.position = "relative";
  }
  else if (trenutniAlgoritam == "Address Sort") {
    document.getElementsByClassName("funkcija-div")[0].style.visibility = "visible";
    document.getElementsByClassName("funkcija-div")[0].style.position = "relative";
    niz_linija.forEach(linije => linije.forEach(linija => {
      try {
        linija.remove();
        console.log("Linija obrisana");
      }
      catch {
        console.log("Ne može se obrisati nedefinirana linija");
      }
    }));
  }

  // Sekcija 'Opcije' je ponovo vidljiva
  document.getElementsByClassName("opcije")[0].style.position = "relative";
  document.getElementsByClassName("opcije")[0].style.visibility = "visible";

  // Podešavanje širina sekcija
  if (window.innerWidth <= 1200) {
    fullWidthSection("opcije");
    fullWidthSection("sortiranje");
  }
  else {
    partialWidthSection("opcije");
    partialWidthSection("sortiranje");
  }

  // Vraćanje signala za sortiranje na 0
  sortiranjeUToku = 0;

  // Sakrivanje pomoćnih kontejnera
  document.getElementsByClassName("pomocni-kontejner")[0].style.visibility = "hidden";
  document.getElementsByClassName("pomocni-kontejner")[0].style.position = "absolute";
  document.getElementsByClassName("counting-kontejner")[0].style.visibility = "hidden";
  document.getElementsByClassName("counting-kontejner")[0].style.position = "absolute";
  document.getElementsByClassName("sipke-kontejner")[0].style.width = "100%";

  generateFromTheList();
});

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

let algoritmi = document.getElementsByClassName("dropdown-item");
let trenutniAlgoritam = "Bubble Sort";
for (let i = 0; i < algoritmi.length; i++) {
  algoritmi[i].addEventListener('click', function () {
    trenutniAlgoritam = algoritmi[i].innerHTML;
    document.getElementById("nazivMetode").innerHTML = trenutniAlgoritam.toUpperCase();

    // Dodavanje odgovarajuće kompleksnosti u naziv metode sortiranja
    let slozenost = nizKompleksnosti.filter(function (element) {
      return element.a == trenutniAlgoritam;
    })[0].tc;
    document.getElementById("nazivMetode").innerHTML += (" - O(" + slozenost + ")");

    // Maksimalna vrijednost veličine niza
    document.getElementById("velicinaNiza")["max"] = 20;

    // Uklanjanje opcija 
    document.getElementsByClassName("funkcija-div")[0].style.visibility = "hidden";
    document.getElementsByClassName("funkcija-div")[0].style.position = "absolute";
    document.getElementsByClassName("razmaci-div")[0].style.visibility = "hidden";
    document.getElementsByClassName("razmaci-div")[0].style.position = "absolute";
    document.getElementsByClassName("counting-div")[0].style.visibility = "hidden";
    document.getElementsByClassName("counting-div")[0].style.position = "absolute";

    // Opcije ponovo vidljive za određene metode
    if (trenutniAlgoritam == "Address Sort") {
      document.getElementsByClassName("funkcija-div")[0].style.visibility = "visible";
      document.getElementsByClassName("funkcija-div")[0].style.position = "relative";
    }
    else if (trenutniAlgoritam == "Shell Sort") {
      document.getElementsByClassName("razmaci-div")[0].style.visibility = "visible";
      document.getElementsByClassName("razmaci-div")[0].style.position = "relative";
    }
    else if (trenutniAlgoritam == "Counting Sort") {
      document.getElementsByClassName("counting-div")[0].style.visibility = "visible";
      document.getElementsByClassName("counting-div")[0].style.position = "relative";
      if (isMobileDevice()) {
        document.getElementById("velicinaNiza").value = 6;
        n = 6;
      }
      else {
        document.getElementById("velicinaNiza").value = 10;
        n = 10;
      }
      document.getElementById("velicinaNiza")["max"] = 10;
      document.getElementById("faktorSkaliranja").value = 50;
      faktorSkaliranja = 50;

      generisiRandomNiz();
    }
    algoritmi[i].innerHTML = document.getElementById(
      "navbarDropdownMenuLink"
    ).innerHTML;
    document.getElementById("navbarDropdownMenuLink").innerHTML = trenutniAlgoritam;
  });
}

// Omogući opcije, slider-e i dugmad
function omoguci() {
  document.querySelector(".dropdown-toggle").classList.remove("disabled");
  sortBtn.classList.remove("disabled");
  stopBtn.classList.add("disabled");
  if (!isMobileDevice()) velicinaNiza.removeAttribute("disabled");
  brzinaSortiranja.removeAttribute("disabled");
  faktorSkaliranjaRange.removeAttribute("disabled");
}

// Generisanje iz polja za unos elemenata
function generateFromTheList() {
  omoguci();

  sipke_visina = [];
  sipke_B_visina = [];
  sipke_C_visina = [];
  iznosi = [];
  iznosi_B = [];
  iznosi_C = [];
  indeksi = [];
  indeksi_B = [];
  indeksi_C = [];

  sipkeKontejner.innerHTML = "";
  pomocniKontejner.innerHTML = "";
  countingKontejner.innerHTML = "";

  let niz_str = document.getElementById("nizInput").value;
  let niz = niz_str.match(/\d+/g);

  n = niz.length;
  document.getElementById("velicinaNiza").value = n;

  let preko500 = 0;
  let ispod20 = 0;

  if (n > 15) {
    document.documentElement.style.setProperty("--width", "22px");
  } else {
    document.documentElement.style.setProperty("--width", "28px");
  }

  for (let index = 0; index < n; index++) {
    sipke_visina[index] = parseInt(niz[index], 10);
    sipke_div[index] = document.createElement("div");
    sipke_div[index].classList.add("sipka");
    if (n > 15) sipke_div[index].style.marginLeft = "14px";
    sipke_div[index].style.height = sipke_visina[index] * faktorSkaliranja + "px";
    sipkeKontejner.appendChild(sipke_div[index]);

    if (sipke_visina[index] * faktorSkaliranja > 500) preko500 = 1;
    if (sipke_visina[index] * faktorSkaliranja < 20 && sipke_visina[index] * faktorSkaliranja != 0) ispod20 = 1;

    iznosi[index] = document.createElement("p");
    iznosi[index].classList.add("iznosi");
    iznosi[index].innerHTML = sipke_visina[index];
    sipke_div[index].appendChild(iznosi[index]);

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

  var fiktivni = document.createElement("div");
  fiktivni.classList.add("sipka");
  fiktivni.style.height = "500px";
  fiktivni.style.visibility = "hidden";
  sipkeKontejner.appendChild(fiktivni);

  if (trenutniAlgoritam == "Counting Sort") {
    document.getElementById("countingSpan").innerHTML = Math.max(...sipke_visina);
  }
}

// Generisanje niza nasumičnih elemenata
function generisiRandomNiz() {
  omoguci();

  // Brisanje sadržaja nizova
  sipke_visina = [];
  sipke_B_visina = [];
  sipke_C_visina = [];
  iznosi = [];
  iznosi_B = [];
  iznosi_C = [];
  indeksi = [];
  indeksi_B = [];
  indeksi_C = [];

  // Brisanje sadržaja kontejnera
  sipkeKontejner.innerHTML = "";
  pomocniKontejner.innerHTML = "";
  countingKontejner.innerHTML = "";

  // Podešavanje širine jedne šipke
  if (n > 15) {
    document.documentElement.style.setProperty("--width", "22px");
  } else {
    document.documentElement.style.setProperty("--width", "28px");
  }

  // Nasumično generisani elementi
  var vrijednosti_visina = new String("");

  // Signali za validaciju elemenata
  let preko500 = 0;
  let ispod20 = 0;

  // Faktor skaliranja
  if (trenutniAlgoritam != "Counting Sort") {
    faktorSkaliranja = 1;
    document.getElementById("faktorSkaliranja").value = 1;
  }

  for (let i = 0; i < n; i++) {
    // Kreiranje šipki
    if (trenutniAlgoritam == "Counting Sort") {
      sipke_visina[i] = Math.floor(Math.random() * 10);
    }
    else if (i == 3) {
      sipke_visina[i] = 500;
    }
    else {
      sipke_visina[i] = Math.floor(Math.random() * (450 + 1) + 50);
    }
    sipke_div[i] = document.createElement("div");
    sipke_div[i].classList.add("sipka");

    // Udaljenost šipki za veliki broj elemenata
    if (n > 15) sipke_div[i].style.marginLeft = "14px";
    sipke_div[i].style.height = sipke_visina[i] * faktorSkaliranja + "px";
    sipkeKontejner.appendChild(sipke_div[i]);

    // Kontrola signala za validaciju
    if (sipke_visina[i] * faktorSkaliranja > 500) preko500 = 1;
    if (sipke_visina[i] * faktorSkaliranja < 20 && sipke_visina[i] * faktorSkaliranja != 0) ispod20 = 1;

    // Vrijednosti elemenata
    iznosi[i] = document.createElement("p");
    iznosi[i].classList.add("iznosi");
    iznosi[i].innerHTML = sipke_visina[i];
    sipke_div[i].appendChild(iznosi[i]);

    // Indeksi elemenata
    indeksi[i] = document.createElement("p");
    indeksi[i].classList.add("indeksi");
    indeksi[i].innerHTML = i;
    sipke_div[i].appendChild(indeksi[i]);

    // Popunjavanje sadržaja polja za unos niza
    vrijednosti_visina += sipke_visina[i];
    if (i != n - 1) vrijednosti_visina += ",";
  }

  // Validacija elemenata niza
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
  // Sakrivanje fiktivnog elementa
  fiktivni.style.visibility = "hidden";
  sipkeKontejner.appendChild(fiktivni);

  // Upis u polje za unos niza
  document.getElementById("nizInput").value = vrijednosti_visina;

  // Vrijednost K - Counting Sort
  if (trenutniAlgoritam == "Counting Sort") {
    document.getElementById("countingSpan").innerHTML = Math.max(...sipke_visina);
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
let dodajCelijuBoja = '#05E9C1';
let merge_sort_boje = ['#003600', '#AAFF00', '#108000', '#7CFC00', '#109E60', '#50C878'];

// Opcije za Shell, Counting i Address Sort inicijalno nevidljive
document.getElementsByClassName("funkcija-div")[0].style.visibility = "hidden";
document.getElementsByClassName("funkcija-div")[0].style.position = "absolute";
document.getElementsByClassName("razmaci-div")[0].style.visibility = "hidden";
document.getElementsByClassName("razmaci-div")[0].style.position = "absolute";
document.getElementsByClassName("counting-div")[0].style.visibility = "hidden";
document.getElementsByClassName("counting-div")[0].style.position = "absolute";

// Pomoćni kontejneri inicijalno nevidljivi
document.getElementsByClassName("pomocni-kontejner")[0].style.visibility = "hidden";
document.getElementsByClassName("pomocni-kontejner")[0].style.position = "absolute";
document.getElementsByClassName("counting-kontejner")[0].style.visibility = "hidden";
document.getElementsByClassName("counting-kontejner")[0].style.position = "absolute";
document.getElementsByClassName("sipke-kontejner")[0].style.width = "100%";

// Alerti i upozorenja inicijalno nevidljiva
for (let i = 0; i < document.getElementsByClassName("alert").length; i++) {
  document.getElementsByClassName("alert")[i].style.display = "none";
}

// Učitavanje iz datoteke
const fileInput = document.getElementById("fileInput");

fileInput.addEventListener('click', function () {
  this.value = null;
})

fileInput.addEventListener('change', async function () {
  try {
    const file = this.files[0];
    if (file.size > 65536) {
      prikaziAlert("Fajl je prevelik! Maksimalna veličina fajla je 64KB!");
      return;
    }
    const text = await readFileAsync(file);
    document.getElementById("nizInput").value = text;
    document.getElementById("fileLabel").innerHTML = this.value.split("\\").pop();
    validirajIGenerisiIzListe();
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
  fullWidthSection("opcije");
  fullWidthSection("sortiranje");
}

// Testiranje tipa uređaja sa kojeg se pristupa stranici
function isMobileDevice() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Nakon učitavanja stranice
function afterLoading() {
  if (isMobileDevice()) {
    n = 6;
    document.getElementById("velicinaNiza").value = 6;
    document.getElementById("velicinaNiza").disabled = true;
  }
  generisiRandomNiz();
  if (isMobileDevice()) {
    prikaziUpozorenje("Pristupate ovoj stranici koristeći mobilni uređaj! Neke funkcionalnosti neće raditi u skladu sa očekivanjima!");
  }
}

// Učitavanje stranice
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

window.addEventListener('load', function () {
  stopTimer();
  afterLoading();
});

startTimer();