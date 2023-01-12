function mergeSort(l, u) {
    disable();

    // Kontejner za Merge Sort
    let stabloKontejner = document.createElement("div");
    stabloKontejner.classList.add("stablo-kontejner");
    pomocniKontejner.appendChild(stabloKontejner);

    // Kontejneri za čuvanje podnizova
    let k = 0;
    for (let i = 1; ; i *= 2) {
        for (let j = 0; j < i; j++) {
            cvor_kontejneri[k] = document.createElement("div");
            cvor_kontejneri[k].classList.add("list-kontejner");
            // Računanje širine kontejnera
            let sirina = 100 / i;
            cvor_kontejneri[k].style.width = sirina + "%";
            cvor_kontejneri[k].innerHTML = "-";
            stabloKontejner.appendChild(cvor_kontejneri[k]);
            k++;
        }
        if (i >= n) break;
    }

    // Pokretanje Merge Sort
    let iteracija = 0;
    mergeSortStart(l, u, iteracija);
    cvor_kontejneri = [];
}

// FAZA 1 - DIJELJENJE
function mergeSortStart(l, u, iteracija) {
    let cvor = iteracija;
    if (u >= l) {
        animateMergeSplit(cvor_kontejneri[cvor], iznosi[l], iznosi[u], sipke_div[l], sipke_div[u], iteracijaBoja);
        animateMergeSplit(cvor_kontejneri[cvor], iznosi[l], iznosi[u], sipke_div[l], sipke_div[u], resetirajBoja);
        cvor_kontejneri[cvor].innerHTML = "";
        for (let brojac = l; brojac <= u; brojac++) {
            if (brojac != u) cvor_kontejneri[cvor].innerHTML += (sipke_visina[brojac]) + ",";
            else cvor_kontejneri[cvor].innerHTML += (sipke_visina[brojac]);
        }
        if (u > l) {
            let p = Math.floor((l + u - 1) / 2)
            let q = p + 1
            mergeSortStart(l, p, 2 * cvor + 1);
            mergeSortStart(q, u, 2 * cvor + 2);
            merge(l, p, q, u, cvor);
        }
        else {
            // FAZA 2 - SPAJANJE
            animateMerge(0, cvor_kontejneri[cvor], iznosi[u], sipke_div[u], sipke_visina[u], nijanse_zelene[Math.floor(Math.log2(cvor + 1))]);
            return;
        }
    }
    return;
}

// FAZA 2 - SPAJANJE
function merge(l, p, q, u, cvor) {
    let novaBoja = nijanse_zelene[Math.floor(Math.log2(cvor + 1))];
    let i = 0;
    let j = q - l;
    let k = l;
    let B = [];
    for (let m = 0; m <= u - l; m++) {
        B[m] = sipke_visina[l + m];
    }
    while (i <= p - l && j <= u - l) {
        if (B[i] < B[j]) {
            sipke_visina[k] = B[i];
            i++;
        }
        else {
            sipke_visina[k] = B[j];
            j++;
        }
        animateMerge(1, cvor_kontejneri[cvor], iznosi[k], sipke_div[k], sipke_visina[k], zamijeniBoja);
        animateMerge(1, cvor_kontejneri[cvor], iznosi[k], sipke_div[k], sipke_visina[k], novaBoja);
        k++;
    }
    while (i <= p - l) {
        sipke_visina[k] = B[i];
        animateMerge(1, cvor_kontejneri[cvor], iznosi[k], sipke_div[k], sipke_visina[k], zamijeniBoja);
        animateMerge(1, cvor_kontejneri[cvor], iznosi[k], sipke_div[k], sipke_visina[k], novaBoja);
        k++;
        i++;
    }
    while (j <= u - l) {
        sipke_visina[k] = B[j];
        animateMerge(1, cvor_kontejneri[cvor], iznosi[k], sipke_div[k], sipke_visina[k], zamijeniBoja);
        animateMerge(1, cvor_kontejneri[cvor], iznosi[k], sipke_div[k], sipke_visina[k], novaBoja);
        k++;
        j++;
    }
    return;
}