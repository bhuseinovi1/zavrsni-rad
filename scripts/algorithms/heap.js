// 'i'-ti element stabla je zadnji element u stablu koji nije list
// 'vel' je broj elemenata niza od kojeg se pravi gomila
function popraviDolje(i, vel) {
    while (!(i >= Math.floor(vel / 2) && i < vel)) {
        animateHeap(cvor_kontejneri[i], iznosi[i], sipke_div[i], sipke_visina[i], pivotBoja);
        let veci = 2 * i + 1;
        if (2 * i + 2 < vel) {
            animateHeap(cvor_kontejneri[veci], iznosi[veci], sipke_div[veci], sipke_visina[veci], iteracijaBoja);
            let dd = 2 * i + 2;
            animateHeap(cvor_kontejneri[dd], iznosi[dd], sipke_div[dd], sipke_visina[dd], iteracijaBoja);
            if (dd < vel && sipke_visina[dd] > sipke_visina[veci]) {
                animateHeap(cvor_kontejneri[dd], iznosi[dd], sipke_div[dd], sipke_visina[dd], privremeniBoja);
                animateHeap(cvor_kontejneri[veci], iznosi[veci], sipke_div[veci], sipke_visina[veci], resetirajBoja);
                veci = dd;
            }
            else {
                animateHeap(cvor_kontejneri[veci], iznosi[veci], sipke_div[veci], sipke_visina[veci], privremeniBoja);
                animateHeap(cvor_kontejneri[dd], iznosi[dd], sipke_div[dd], sipke_visina[dd], resetirajBoja);
            }
        }
        else {
            animateHeap(cvor_kontejneri[veci], iznosi[veci], sipke_div[veci], sipke_visina[veci], privremeniBoja);
        }
        if (sipke_visina[i] > sipke_visina[veci]) {
            animateHeap(cvor_kontejneri[veci], iznosi[veci], sipke_div[veci], sipke_visina[veci], resetirajBoja);
            animateHeap(cvor_kontejneri[i], iznosi[i], sipke_div[i], sipke_visina[i], resetirajBoja);
            return;
        }
        [sipke_visina[i], sipke_visina[veci]] = [sipke_visina[veci], sipke_visina[i]];
        animateHeap(cvor_kontejneri[i], iznosi[i], sipke_div[i], sipke_visina[i], zamijeniBoja);
        animateHeap(cvor_kontejneri[veci], iznosi[veci], sipke_div[veci], sipke_visina[veci], zamijeniBoja);
        animateHeap(cvor_kontejneri[i], iznosi[i], sipke_div[i], sipke_visina[i], resetirajBoja);
        animateHeap(cvor_kontejneri[veci], iznosi[veci], sipke_div[veci], sipke_visina[veci], resetirajBoja);
        i = veci;
    }
    return;
}

// 'zadnji' je ažurirana vrijednost broja elemenata u gomili nakon izbacivanja prvog elementa - korijena
function izbaciPrvi(zadnji) {
    [sipke_visina[0], sipke_visina[zadnji]] = [sipke_visina[zadnji], sipke_visina[0]];
    animateHeap(cvor_kontejneri[0], iznosi[0], sipke_div[0], sipke_visina[0], helperBoja);
    animateHeap(cvor_kontejneri[zadnji], iznosi[zadnji], sipke_div[zadnji], sipke_visina[zadnji], helperBoja);
    animateHeap(cvor_kontejneri[0], iznosi[0], sipke_div[0], sipke_visina[0], resetirajBoja);
    animateHeap(cvor_kontejneri[zadnji], iznosi[zadnji], sipke_div[zadnji], sipke_visina[zadnji], sortiranBoja);
    popraviDolje(0, zadnji);
}

function heapSort() {
    // Novi kontejner za prikaz gomile
    let stabloKontejner = document.createElement("div");
    stabloKontejner.classList.add("stablo-kontejner")
    pomocniKontejner.appendChild(stabloKontejner);

    // Kreiranje kontejnera za prikaz elemenata gomile u obliku stabla
    let k = 0;
    for (let i = 1; i <= n; i *= 2) {
        for (let j = 0; j < i; j++) {
            cvor_kontejneri[k] = document.createElement("div");
            cvor_kontejneri[k].classList.add("list-kontejner");
            // Računanje širine elemenata
            let sirina = 100 / i;
            cvor_kontejneri[k].style.width = sirina + "%";
            cvor_kontejneri[k].innerHTML = sipke_visina[k];
            stabloKontejner.appendChild(cvor_kontejneri[k]);
            k++;
            if (k == n) break;
        }
    }

    // Stvaranje gomile
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        popraviDolje(i, n);
    }

    // Sortiranje niza
    for (let odKraja = n - 1; odKraja >= 1; odKraja--) {
        izbaciPrvi(odKraja);
    }

    animateHeap(cvor_kontejneri[0], iznosi[0], sipke_div[0], sipke_visina[0], sortiranBoja, 100);
    cvor_kontejneri = [];
}