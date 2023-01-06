
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

                animateHeap(novi_kontejneri[veci], iznosi[veci], sipke_div[veci], sipke_visina[veci], resetirajBoja, 100);

                veci = dd;
            }
            else {
                animateHeap(novi_kontejneri[veci], iznosi[veci], sipke_div[veci], sipke_visina[veci], privremeniBoja);

                animateHeap(novi_kontejneri[dd], iznosi[dd], sipke_div[dd], sipke_visina[dd], resetirajBoja, 100);
            }
        }
        else {
            animateHeap(novi_kontejneri[veci], iznosi[veci], sipke_div[veci], sipke_visina[veci], privremeniBoja);
        }
        if (sipke_visina[i] > sipke_visina[veci]) {
            animateHeap(novi_kontejneri[i], iznosi[i], sipke_div[i], sipke_visina[i], resetirajBoja, 100);

            animateHeap(novi_kontejneri[veci], iznosi[veci], sipke_div[veci], sipke_visina[veci], resetirajBoja, 100);

            return
        }
        [sipke_visina[i], sipke_visina[veci]] = [sipke_visina[veci], sipke_visina[i]];
        animateHeap(novi_kontejneri[i], iznosi[i], sipke_div[i], sipke_visina[i], zamijeniBoja);
        animateHeap(novi_kontejneri[veci], iznosi[veci], sipke_div[veci], sipke_visina[veci], zamijeniBoja);
        //animHeapZamijeni(novi_kontejneri[i], novi_kontejneri[veci]);
        animateHeap(novi_kontejneri[i], iznosi[i], sipke_div[i], sipke_visina[i], resetirajBoja, 100);
        animateHeap(novi_kontejneri[veci], iznosi[veci], sipke_div[veci], sipke_visina[veci], resetirajBoja, 100);
        i = veci
    }
    return
}

function IZBACI_PRVI(zadnji) {
    [sipke_visina[0], sipke_visina[zadnji]] = [sipke_visina[zadnji], sipke_visina[0]];
    animateHeap(novi_kontejneri[0], iznosi[0], sipke_div[0], sipke_visina[0], helperBoja);
    animateHeap(novi_kontejneri[zadnji], iznosi[zadnji], sipke_div[zadnji], sipke_visina[zadnji], helperBoja);
    //animHeapZamijeni(novi_kontejneri[0], novi_kontejneri[zadnji]);
    animateHeap(novi_kontejneri[0], iznosi[0], sipke_div[0], sipke_visina[0], resetirajBoja, 100);
    animateHeap(novi_kontejneri[zadnji], iznosi[zadnji], sipke_div[zadnji], sipke_visina[zadnji], sortiranBoja, 100);
    POPRAVI_DOLJE(0, zadnji)
}

// Heap Sort
function heapSort() {
    disable();

    let stabloKontejner = document.createElement("div");
    stabloKontejner.classList.add("stabloKontejner")
    sipkeKontejnerB.appendChild(stabloKontejner);
    let brojac22 = 0;
    for (let i = 1; i <= n; i *= 2) {
        for (let j = 0; j < i; j++) {
            novi_kontejneri[brojac22] = document.createElement("div");
            novi_kontejneri[brojac22].classList.add("kontejner");
            let sirina = 100 / i;
            novi_kontejneri[brojac22].style.width = sirina + "%";
            novi_kontejneri[brojac22].innerHTML = sipke_visina[brojac22]
            stabloKontejner.appendChild(novi_kontejneri[brojac22])
            brojac22++;
            if (brojac22 == n) break;
        }
    }

    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        POPRAVI_DOLJE(i, n);
    }

    for (let odKraja = n - 1; odKraja >= 1; odKraja--) {
        IZBACI_PRVI(odKraja);
    }
    animateHeap(novi_kontejneri[0], iznosi[0], sipke_div[0], sipke_visina[0], sortiranBoja, 100);


    novi_kontejneri = [];

}