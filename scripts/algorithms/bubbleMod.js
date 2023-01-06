// Modificirano Bubble sortiranje
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
        }
        if (pom != 0) {
            anim(iznosi[sortirani], sipke_div[sortirani], sipke_visina[sortirani], sortiranBoja);
            sortirani = sortirani - 1;
        }
    } while (pom != 0);
}