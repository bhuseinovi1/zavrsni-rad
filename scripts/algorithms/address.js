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
    // Kreiranje nizova linija
    for (let i = 0; i < brojKlasa; i++) {
        niz_linija[i] = [];
    }

    // Kontejner u kojem će biti smještene sve jednostruko povezane liste
    let listeKontejner = document.createElement("div");
    listeKontejner.classList.add("liste-kontejner");
    pomocniKontejner.appendChild(listeKontejner);

    // Kreiranje kontejnera za klase pojedinačnih jednostruko povezanih listi i kontejnera za same jednostruko povezane liste
    let elementiListe = [];
    for (let i = 0; i < brojKlasa; i++) {
        novi_kontejneri[i] = document.createElement("div");
        novi_kontejneri[i].classList.add("klasa-liste-kontejner");
        novi_kontejneri[i].innerHTML = i;
        listeKontejner.appendChild(novi_kontejneri[i]);

        elementiListe[i] = document.createElement("div");
        elementiListe[i].classList.add("elementi-liste-kontejner");
        novi_kontejneri[i].appendChild(elementiListe[i]);
    }

    // Kreiranje niza jednostruko povezanih listi
    let nizJPListi = [];
    for (let i = 0; i < brojKlasa; i++) {
        nizJPListi[i] = new JPLista();
    }

    for (let i = 0; i < n; i++) {
        // Računanje indeksa niza jednostruko povezanih listi za ubacivanje novog elementa
        let kod = Math.floor(eval(funkcija.toString().replace(/x/g, "(" + sipke_visina[i] + ")")));

        // Ubacivanje novog elementa u listu
        nizJPListi[kod].push(sipke_visina[i]);

        // Kontejner za prikaz elementa liste
        let elementListe = document.createElement("div");
        elementListe.classList.add("element-liste-kontejner");

        // Animiraj dodavanje elementa u listu
        animateAddress(elementiListe[kod], elementListe, novi_kontejneri[kod], iznosi[i], sipke_div[i], sipke_visina[i], niz_linija[kod], parcijalnoSortiranBoja);
        animateAddress(elementiListe[kod], elementListe, novi_kontejneri[kod], iznosi[i], sipke_div[i], sipke_visina[i], niz_linija[kod], resetirajBoja);
    }

    // Sortiranje jednostruko povezanih listi metodom sortiranja umetanjem
    for (let i = 0; i < n; i++) {
        let kod = Math.floor(eval(funkcija.toString().replace(/x/g, "(" + sipke_visina[i] + ")")));
        nizJPListi[kod].insertionSort(nizJPListi[kod].pocetak);
    }

    // Briši i upiši iz jednostruko povezane liste
    let k = 0;
    for (let i = 0; i < brojKlasa; i++) {
        // Animacija uklanjanja elemenata i linija
        animateAddressRemove(elementiListe[i], novi_kontejneri[i], niz_linija[i], iteracijaBoja);
        while (nizJPListi[i].get(0) != null) {
            // Uzmi element iz jednostruko povezane liste i ukloni ga iz iste
            var izbaceniElement = nizJPListi[i].shift().vrijednost;
            sipke_visina[k] = izbaceniElement;
            let elementListe = document.createElement("div");
            elementListe.classList.add("element-liste-kontejner");

            // Animiraj dodavanje elementa u listu
            animateAddress(elementiListe[i], elementListe, novi_kontejneri[i], iznosi[k], sipke_div[k], sipke_visina[k], niz_linija[i], parcijalnoSortiranBoja);
            k++;
        }
    }

    novi_kontejneri = [];
}