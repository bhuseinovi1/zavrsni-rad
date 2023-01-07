function bubbleSortModificirani() {
    disable();
    let pom = n;
    let sortirani = n - 1;
    do {
        let i = pom - 1;
        pom = 0;
        for (let j = 1; j <= i; j++) {
            anim(iznosi[j], sipke_div[j], sipke_visina[j], iteracijaBoja);
            anim(iznosi[j - 1], sipke_div[j - 1], sipke_visina[j - 1], iteracijaBoja);
            if (sipke_visina[j - 1] > sipke_visina[j]) {
                [sipke_visina[j - 1], sipke_visina[j]] = [sipke_visina[j], sipke_visina[j - 1]];
                anim(iznosi[j], sipke_div[j], sipke_visina[j], zamijeniBoja);
                anim(iznosi[j - 1], sipke_div[j - 1], sipke_visina[j - 1], zamijeniBoja);
                pom = j;
            }
            anim(iznosi[j], sipke_div[j], sipke_visina[j], resetirajBoja);
            anim(iznosi[j - 1], sipke_div[j - 1], sipke_visina[j - 1], resetirajBoja);
            for (let h = 0; h < pom; h++) {
                anim(iznosi[h], sipke_div[h], sipke_visina[h], resetirajBoja, 10);
            }
            if (pom != 0) anim(iznosi[pom], sipke_div[pom], sipke_visina[pom], zadnjiSortirani);
        }
        for (let k = sortirani; k >= pom; k--) {
            anim(iznosi[k], sipke_div[k], sipke_visina[k], sortiranBoja);
        }
        sortirani = pom;
    } while (pom != 0);
}