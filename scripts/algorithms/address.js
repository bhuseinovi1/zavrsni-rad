/*
import { JPLista } from "./jplista.js";
*/

// Address sort 
function addressSort(funkcija) {
    disable();

    let nizElemenata = []

    let najveci = 0;
    for (let i = 0; i < n; i++) {
        let fija = funkcija.toString()
        let result = fija.replace(/x/g, "(" + sipke_visina[i] + ")")
        let brojKlasa = Math.floor(eval(result));
        //console.log(Math.floor(eval(result)));
        if (Math.floor(eval(result)) > najveci) najveci = Math.floor(eval(result));
    }

    let elementiListe = [];

    let listaKontejner = document.createElement("div");
    listaKontejner.classList.add("listaKontejner")
    sipkeKontejnerB.appendChild(listaKontejner);
    for (let i = 0; i <= najveci; i++) {
        novi_kontejneri[i] = document.createElement("div");
        novi_kontejneri[i].classList.add("lista");
        novi_kontejneri[i].innerHTML = i
        listaKontejner.appendChild(novi_kontejneri[i])

        elementiListe[i] = document.createElement("div");
        elementiListe[i].classList.add("elementiListe")
        novi_kontejneri[i].appendChild(elementiListe[i]);
    }

    // Kreiranje niza jednostruko povezanih lista
    for (let i = 0; i <= najveci; i++) {
        nizElemenata[i] = new JPLista()
    }

    // Animacije svega urađenog
    for (let i = 0; i < n; i++) {
        let kod = Math.floor(eval(funkcija.toString().replace(/x/g, "(" + sipke_visina[i] + ")")))

        // Popunjavanje svih jednostruko povezanih listi
        nizElemenata[kod].push(sipke_visina[i])

        let elementListe = document.createElement("div");
        elementListe.classList.add("elementListe");

        //elementListe.innerHTML = barsHeight[i]; // ovdje daj prvi element JPL sa odgovarajućim indeksom
        animateAddress(elementiListe[kod], elementListe, novi_kontejneri[kod], iznosi[i], sipke_div[i], sipke_visina[i], parcijalnoSortiran);
        animateAddress(elementiListe[kod], elementListe, novi_kontejneri[kod], iznosi[i], sipke_div[i], sipke_visina[i], resetirajBoja);
    }

    // Sortiranje jednostruko povezane liste metodom sortiranja umetanjem
    for (let i = 0; i < n; i++) {
        let kod = Math.floor(eval(funkcija.toString().replace(/x/g, "(" + sipke_visina[i] + ")")))
        nizElemenata[kod].insertionSort(nizElemenata[kod].pocetak)
    }

    // Brisi i upisi
    let napuniNiz = 0;
    for (let i = 0; i <= najveci; i++) {
        animateAddressRemove(elementiListe[i], novi_kontejneri[i], iteracijaBoja);
        while (nizElemenata[i].get(0) != null) {
            var ubaci = nizElemenata[i].shift().vrijednost
            //elementListe.innerHTML = ubaci;
            sipke_visina[napuniNiz] = ubaci;
            let elementListe = document.createElement("div");
            elementListe.classList.add("elementListe");
            animateAddress(elementiListe[i], elementListe, novi_kontejneri[i], iznosi[napuniNiz], sipke_div[napuniNiz], sipke_visina[napuniNiz], parcijalnoSortiran);
            napuniNiz++;
        }
    }
    novi_kontejneri = [];
}