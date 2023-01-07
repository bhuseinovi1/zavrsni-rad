function addressSort(funkcija) {
    disable();

    // Računanje ukupnog broja klasa
    let brojKlasa = 0;
    for (let i = 0; i < n; i++) {
        let izraz = funkcija.toString().replace(/x/g, "(" + sipke_visina[i] + ")");
        let rezultat = Math.floor(eval(izraz));
        if (rezultat > brojKlasa) brojKlasa = rezultat;
    }
    brojKlasa++;

    // Kontejner u kojem će biti smještene sve jednostruko povezane liste
    let listeKontejner = document.createElement("div");
    listeKontejner.classList.add("listeKontejner");
    sipkeKontejnerB.appendChild(listeKontejner);

    // Kreiranje kontejnera za klasa pojedinačnih jednostruko povezanih listi i kontejnera za same jednostruko povezane liste
    let elementiListe = [];
    for (let i = 0; i < brojKlasa; i++) {
        novi_kontejneri[i] = document.createElement("div");
        novi_kontejneri[i].classList.add("klasaListe");
        novi_kontejneri[i].innerHTML = i;
        listeKontejner.appendChild(novi_kontejneri[i]);

        elementiListe[i] = document.createElement("div");
        elementiListe[i].classList.add("elementiListe");
        novi_kontejneri[i].appendChild(elementiListe[i]);
    }

    // Kreiranje niza jednostruko povezanih lista
    let nizListi = [];
    for (let i = 0; i < brojKlasa; i++) {
        nizListi[i] = new JPLista();
    }

    for (let i = 0; i < n; i++) {
        // Računanje indeksa niza jednostruko povezanih listi za ubacivanje novog elementa
        let kod = Math.floor(eval(funkcija.toString().replace(/x/g, "(" + sipke_visina[i] + ")")));

        // Ubacivanje novog elementa u listu
        nizListi[kod].push(sipke_visina[i]);

        // Kontejner za prikaz elementa liste
        let elementListe = document.createElement("div");
        elementListe.classList.add("elementListe");

        animateAddress(elementiListe[kod], elementListe, novi_kontejneri[kod], iznosi[i], sipke_div[i], sipke_visina[i], parcijalnoSortiran);
        animateAddress(elementiListe[kod], elementListe, novi_kontejneri[kod], iznosi[i], sipke_div[i], sipke_visina[i], resetirajBoja);
    }

    // Sortiranje jednostruko povezanih listi metodom sortiranja umetanjem
    for (let i = 0; i < n; i++) {
        let kod = Math.floor(eval(funkcija.toString().replace(/x/g, "(" + sipke_visina[i] + ")")));
        nizListi[kod].insertionSort(nizListi[kod].pocetak);
    }

    // Brisi i upisi iz jednostruko povezane liste
    let k = 0;
    for (let i = 0; i < brojKlasa; i++) {
        animateAddressRemove(elementiListe[i], novi_kontejneri[i], iteracijaBoja);
        while (nizListi[i].get(0) != null) {
            // Uzmi element iz jednostruko povezane liste i ukloni ga iz iste
            var izbaceniElement = nizListi[i].shift().vrijednost;
            sipke_visina[k] = izbaceniElement;
            let elementListe = document.createElement("div");
            elementListe.classList.add("elementListe");
            // Animiraj dodavanje elementa u listu
            animateAddress(elementiListe[i], elementListe, novi_kontejneri[i], iznosi[k], sipke_div[k], sipke_visina[k], parcijalnoSortiran);
            k++;
        }
    }

    novi_kontejneri = [];
}