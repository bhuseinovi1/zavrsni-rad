function bubbleSort() {
    for (let i = n - 1; i > 0; i--) {
        for (let j = 1; j <= i; j++) {
            anim(iznosi[j], sipke_div[j], sipke_visina[j], iteracijaBoja);
            anim(iznosi[j - 1], sipke_div[j - 1], sipke_visina[j - 1], iteracijaBoja);
            if (sipke_visina[j - 1] > sipke_visina[j]) {
                [sipke_visina[j - 1], sipke_visina[j]] = [sipke_visina[j], sipke_visina[j - 1]];
                anim(iznosi[j], sipke_div[j], sipke_visina[j], zamijeniBoja);
                anim(iznosi[j - 1], sipke_div[j - 1], sipke_visina[j - 1], zamijeniBoja);
            }
            anim(iznosi[j], sipke_div[j], sipke_visina[j], resetirajBoja);
            anim(iznosi[j - 1], sipke_div[j - 1], sipke_visina[j - 1], resetirajBoja);
        }
        anim(iznosi[i], sipke_div[i], sipke_visina[i], sortiranBoja);
    }
    anim(iznosi[0], sipke_div[0], sipke_visina[0], sortiranBoja);
}