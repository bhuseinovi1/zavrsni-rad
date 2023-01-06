// Merge sort
function mergeSort(l, u) {
    disable();
    let stabloKontejner = document.createElement("div");
    stabloKontejner.classList.add("stabloKontejner")
    sipkeKontejnerB.appendChild(stabloKontejner);
    let k = 0;
    for (let i = 1; ; i *= 2) {
        for (let j = 0; j < i; j++) {
            novi_kontejneri[k] = document.createElement("div");
            novi_kontejneri[k].classList.add("kontejner");
            let sirina = 100 / i;
            novi_kontejneri[k].style.width = sirina + "%";
            novi_kontejneri[k].innerHTML = "-"
            stabloKontejner.appendChild(novi_kontejneri[k])
            k++;
        }
        if (i >= n) break;
    }

    let iteracija = 0;
    let kraj = mergeSortStart(l, u, iteracija);
    novi_kontejneri = [];
}

function mergeSortStart(l, u, iteracija) {
    let counter = iteracija;
    if (u >= l) {
        /*
        animateMerge(0, novi_kontejneri[counter], iznosi[l], sipke_div[l], sipke_visina[l], iteracijaBoja);
        if (u != l) animateMerge(0, novi_kontejneri[counter], iznosi[u], sipke_div[u], sipke_visina[u], iteracijaBoja);

        animateMerge(0, novi_kontejneri[counter], iznosi[l], sipke_div[l], sipke_visina[l], resetirajBoja);
        if (u != l) animateMerge(0, novi_kontejneri[counter], iznosi[u], sipke_div[u], sipke_visina[u], resetirajBoja);
        */
        animateMergeSplit(novi_kontejneri[counter],sipke_div[l],sipke_div[u],iteracijaBoja);
        animateMergeSplit(novi_kontejneri[counter], sipke_div[l], sipke_div[u], resetirajBoja);

        novi_kontejneri[counter].innerHTML = ""
        for (let brojac = l; brojac <= u; brojac++) {
            if (brojac != u) novi_kontejneri[counter].innerHTML += (sipke_visina[brojac]) + ","
            else novi_kontejneri[counter].innerHTML += (sipke_visina[brojac])
        }

        if (u > l) {
            let p = Math.floor((l + u - 1) / 2)
            let q = p + 1
            let poziv1 = mergeSortStart(l, p, 2 * counter + 1);
            let poziv2 = mergeSortStart(q, u, 2 * counter + 2);
            let spoji = merge(l, p, q, u, counter);
        }
        else {
            animateMerge(0, novi_kontejneri[counter], iznosi[u], sipke_div[u], sipke_visina[u], parcijalnoSortiran);
            return 1
        }
    }
    return 1
}

function merge(l, p, q, u, counter) {
    let i = 0;
    let j = q - l;
    let k = l;
    let B = [];
    for (let m = 0; m <= u - l; m++) {
        B[m] = sipke_visina[l + m]
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
        animateMerge(1, novi_kontejneri[counter], iznosi[k], sipke_div[k], sipke_visina[k], zamijeniBoja)
        animateMerge(1, novi_kontejneri[counter], iznosi[k], sipke_div[k], sipke_visina[k], parcijalnoSortiran)
        k++;
    }
    while (i <= p - l) {
        sipke_visina[k] = B[i]
        animateMerge(1, novi_kontejneri[counter], iznosi[k], sipke_div[k], sipke_visina[k], zamijeniBoja)
        animateMerge(1, novi_kontejneri[counter], iznosi[k], sipke_div[k], sipke_visina[k], parcijalnoSortiran)
        k++;
        i++;
    }
    while (j <= u - l) {
        sipke_visina[k] = B[j]
        animateMerge(1, novi_kontejneri[counter], iznosi[k], sipke_div[k], sipke_visina[k], zamijeniBoja)
        animateMerge(1, novi_kontejneri[counter], iznosi[k], sipke_div[k], sipke_visina[k], parcijalnoSortiran)
        k++;
        j++;
    }
    return 1
}


