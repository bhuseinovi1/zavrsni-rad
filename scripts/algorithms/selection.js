function selectionSort() {
    disable();
    for (let i = 0; i < n - 1; i++) {
        anim(iznosi[i], sipke_div[i], sipke_visina[i], pivotBoja);
        let min = sipke_visina[i];
        let pmin = i;
        for (let j = i + 1; j < n; j++) {
            anim(iznosi[j], sipke_div[j], sipke_visina[j], iteracijaBoja);
            if (sipke_visina[j] < min) {
                if (pmin != i) {
                    anim(iznosi[pmin], sipke_div[pmin], sipke_visina[pmin], resetirajBoja);
                }
                min = sipke_visina[j];
                pmin = j;
                anim(iznosi[pmin], sipke_div[pmin], sipke_visina[pmin], privremeniBoja);
            } else {
                anim(iznosi[j], sipke_div[j], sipke_visina[j], resetirajBoja);
            }
        }
        if (i != pmin) {
            [sipke_visina[i], sipke_visina[pmin]] = [sipke_visina[pmin], sipke_visina[i]];
            anim(iznosi[pmin], sipke_div[pmin], sipke_visina[pmin], zamijeniBoja);
            anim(iznosi[i], sipke_div[i], sipke_visina[i], zamijeniBoja);
        }
        anim(iznosi[pmin], sipke_div[pmin], sipke_visina[pmin], resetirajBoja);
        anim(iznosi[i], sipke_div[i], sipke_visina[i], sortiranBoja);
    }
    anim(iznosi[n - 1], sipke_div[n - 1], sipke_visina[n - 1], sortiranBoja);
}