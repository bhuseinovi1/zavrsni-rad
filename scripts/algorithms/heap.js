function POPRAVI_DOLJE(i, vel) {
    while (!(i >= Math.floor(vel / 2) && i < vel)) {
        animateHeap(novi_kontejneri[i], iznosi[i], sipke_div[i], sipke_visina[i], pivotBoja);
        let veci = 2 * i + 1;
        if (2 * i + 2 < vel) {
            animateHeap(novi_kontejneri[veci], iznosi[veci], sipke_div[veci], sipke_visina[veci], iteracijaBoja);
            let dd = 2 * i + 2;
            animateHeap(novi_kontejneri[dd], iznosi[dd], sipke_div[dd], sipke_visina[dd], iteracijaBoja);
            if (dd < vel && sipke_visina[dd] > sipke_visina[veci]) {
                animateHeap(novi_kontejneri[dd], iznosi[dd], sipke_div[dd], sipke_visina[dd], privremeniBoja);
                animateHeap(novi_kontejneri[veci], iznosi[veci], sipke_div[veci], sipke_visina[veci], resetirajBoja);
                veci = dd;
            }
            else {
                animateHeap(novi_kontejneri[veci], iznosi[veci], sipke_div[veci], sipke_visina[veci], privremeniBoja);
                animateHeap(novi_kontejneri[dd], iznosi[dd], sipke_div[dd], sipke_visina[dd], resetirajBoja);
            }
        }
        else {
            animateHeap(novi_kontejneri[veci], iznosi[veci], sipke_div[veci], sipke_visina[veci], privremeniBoja);
        }
        if (sipke_visina[i] > sipke_visina[veci]) {
            animateHeap(novi_kontejneri[i], iznosi[i], sipke_div[i], sipke_visina[i], resetirajBoja);
            animateHeap(novi_kontejneri[veci], iznosi[veci], sipke_div[veci], sipke_visina[veci], resetirajBoja);
            return;
        }
        [sipke_visina[i], sipke_visina[veci]] = [sipke_visina[veci], sipke_visina[i]];
        animateHeap(novi_kontejneri[i], iznosi[i], sipke_div[i], sipke_visina[i], zamijeniBoja);
        animateHeap(novi_kontejneri[veci], iznosi[veci], sipke_div[veci], sipke_visina[veci], zamijeniBoja);
        animateHeap(novi_kontejneri[i], iznosi[i], sipke_div[i], sipke_visina[i], resetirajBoja);
        animateHeap(novi_kontejneri[veci], iznosi[veci], sipke_div[veci], sipke_visina[veci], resetirajBoja);
        i = veci;
    }
    return;
}

function IZBACI_PRVI(zadnji) {
    [sipke_visina[0], sipke_visina[zadnji]] = [sipke_visina[zadnji], sipke_visina[0]];
    animateHeap(novi_kontejneri[0], iznosi[0], sipke_div[0], sipke_visina[0], helperBoja);
    animateHeap(novi_kontejneri[zadnji], iznosi[zadnji], sipke_div[zadnji], sipke_visina[zadnji], helperBoja);
    animateHeap(novi_kontejneri[0], iznosi[0], sipke_div[0], sipke_visina[0], resetirajBoja);
    animateHeap(novi_kontejneri[zadnji], iznosi[zadnji], sipke_div[zadnji], sipke_visina[zadnji], sortiranBoja);
    POPRAVI_DOLJE(0, zadnji);
}

function heapSort() {
    disable();

    // Novi kontejner za prikaz gomile
    let stabloKontejner = document.createElement("div");
    stabloKontejner.classList.add("stabloKontejner")
    sipkeKontejnerB.appendChild(stabloKontejner);

    let k = 0;
    for (let i = 1; i <= n; i *= 2) {
        for (let j = 0; j < i; j++) {
            novi_kontejneri[k] = document.createElement("div");
            novi_kontejneri[k].classList.add("kontejner");
            // Širina elemenata u jednom "nivou" je ista, a širina svakog elementa sljedećeg "nivoa" je duplo manja
            let sirina = 100 / i;
            novi_kontejneri[k].style.width = sirina + "%";
            novi_kontejneri[k].innerHTML = sipke_visina[k]
            stabloKontejner.appendChild(novi_kontejneri[k])
            k++;
            if (k == n) break;
        }
    }

    // Stvaranje gomile
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        POPRAVI_DOLJE(i, n);
    }

    // Sortiranje niza
    for (let odKraja = n - 1; odKraja >= 1; odKraja--) {
        IZBACI_PRVI(odKraja);
    }
    animateHeap(novi_kontejneri[0], iznosi[0], sipke_div[0], sipke_visina[0], sortiranBoja, 100);

    novi_kontejneri = [];
}